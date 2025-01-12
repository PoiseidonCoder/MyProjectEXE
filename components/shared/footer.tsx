"use client";
import React from "react";
import { usePathname } from "next/navigation";
export const Footer = () => {
  const pathname = usePathname();

  if (
    pathname.includes("/admin")
  ) {
    return null;
  }
  return (
    <footer className="">

    </footer>
  );
};
