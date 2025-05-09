"use server";

import { Address } from "@/interface";
import { prisma } from "@/lib/prisma";

export const SetUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);

    return {
      ok: true,
      message: "Direccion guardada",
      address: newAddress,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo grabar la direccion",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });

    const addressToSave = {
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      address2: address.address2,
      countryId: address.country,
      postalCode: address.postalCode,
      phone: address.phone,
      userId: userId,
      city: address.city,
    };

    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });

      return newAddress;
    }
    const updatedAddress = await prisma.userAddress.update({
      where: {
        userId,
      },
      data: addressToSave,
    });
    return updatedAddress;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo grabar la direccion");
  }
};
