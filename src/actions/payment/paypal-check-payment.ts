"use server";

import { PaypalOrderStatusResponse } from "@/interface";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const authToken = await getPaypalBearerToken();
  console.log(authToken);

  if (!authToken) {
    return {
      ok: false,
      message: "No se pudo obtner token de verificación",
    };
  }
  const resp = await verifyPaypalPayment(paypalTransactionId, authToken);
  if (!resp) return { ok: false, message: "Error al verifivar el pago" };
  const { status, purchase_units } = resp;
  const { invoice_id: orderId } = purchase_units[0];
  if (status !== "COMPLETED")
    return { ok: false, message: "Aun no se ha pagado en Paypal" };

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { isPaid: true, paidAt: new Date() },
    });
    revalidatePath(`/orders/${orderId}`);

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "500 - El pago no se pudo realizar",
    };
  }
};

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

  const oaut2URL = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: urlencoded,
  };

  try {
    const result = await fetch(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      requestOptions
    ).then((res) => res.json());
    return result.access_token;
  } catch (error) {
    console.log(error);

    return null;
  }
};

const verifyPaypalPayment = async (
  transactionId: string,
  bearerToken: string
): Promise<PaypalOrderStatusResponse | null> => {
  const orderUrl = process.env.PAYPAL_ORDERS_URL ?? "";
  const options = {
    method: "GET",
    headers: {
      "User-Agent": "insomnia/11.0.2",
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  try {
    const response = await fetch(`${orderUrl}/${transactionId}`, options).then(
      (rest) => rest.json()
    );
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
