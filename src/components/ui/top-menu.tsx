"use client";
import { titleFont } from "@/config/fonts";
import { useUIStore } from "@/store";
import Link from "next/link";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu);
  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* logo */}
      <div className="">
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            Telso
          </span>
          <span>| Shop</span>
        </Link>
      </div>
      {/* center menu */}
      <div className="hidden sm:block">
        <Link
          href="/gender/men"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Hombres
        </Link>
        <Link
          href="/gender/women"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Mujeres{" "}
        </Link>
        <Link
          href="/gender/kid"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Niños
        </Link>
      </div>
      {/* Search, Cart, Menu  */}
      <div className="flex items-center">
        <Link href="/search">
          <IoSearchOutline className="size-5" />
        </Link>
        <Link href="/cart">
          <div className="relative">
            <span className="absolute text-xs  rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
              3
            </span>
            <IoCartOutline className="size-5" />
          </div>
        </Link>
        <button
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          onClick={() => openSideMenu()}
        >
          Menú
        </button>
      </div>
    </nav>
  );
};
