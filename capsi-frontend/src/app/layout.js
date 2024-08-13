"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import Navbar from "../components/common/Navbar";
import { createContext, useEffect, useState } from "react";
import Button from "../components/common/Button";
import { RxCross1 } from "../components/common/Icons";
import { useRouter, usePathname } from "next/navigation";
// import UploadVideoButton from "../components/UploadVideoButton";
import Link from "next/link";
import logoMenu from "../assets/common/logo_menu.png";
import Image from "next/image";
import logoutArrow from "../assets/icon/logoutArrow.png";

const inter = Inter({ subsets: ["latin"] });

// Removed Export For Using State
const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export const sidebarContext = createContext();

export default function RootLayout({ children, pageProps }) {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState();

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <SessionProvider session={pageProps?.session}>
          <sidebarContext.Provider
            value={{ open, setOpen, loggedIn, setLoggedIn }}
          >
            <div
              className={`md:hidden fixed top-0 ${
                open ? " visible" : "-translate-x-[50rem] invisible"
              } flex flex-col gap-7 h-full border-r-2 border w-[75%] z-50 bg-gray-100 duration-300 p-10 pl-7 sm:pl-20`}
            >
              <div className="text-black flex justify-end items-center">
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 bg-tertiary rounded"
                >
                  <RxCross1 className="font-bold text-xl" />
                </button>
              </div>
              {loggedIn && (
                <Image className=" py-10 px-6" src={logoMenu} alt="Logo" />
              )}
              <Link href="/pricing" className="text-secondary w-fit">
                Pricing
              </Link>
              {/* <div
                onClick={() => router.push("/")}
                className="text-secondary w-fit"
              >
                <div className="text-black flex justify-end items-center">
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 bg-tertiary rounded"
                  >
                    <RxCross1 className="font-bold text-xl" />
                  </button>
                </div>
              </div> */}
              {/* <button className="w-fit">Pricing</button> */}
              {loggedIn ? (
                <Link href="/projects" className="text-secondary w-fit">
                  Projects
                </Link>
              ) : (
                <Link href="/#features" className="text-secondary w-fit">
                  Features
                </Link>
              )}

              {loggedIn ? (
                <div className=" space-y-2 h-full flex flex-col justify-end py-8">
                  <div className=" border border-stone-300 rounded-full p-2 flex items-center justify-between">
                    <div className="bg-[#AB47BC] text-white font-bold pt-1 px-2 rounded-full">
                      C
                    </div>
                    <div className=" space-x-1 flex items-center gap-1">
                      <p className=" text-stone-700 font-medium">Logout</p>
                      <Image src={logoutArrow} alt="Logout" />
                    </div>
                  </div>
                  <div className=" space-x-3">
                    <Link
                      href="/terms-conditions"
                      className=" text-[#72727] font-medium text-sm"
                    >
                      Terms & Conditions
                    </Link>
                    <Link
                      href="/privacy-policy"
                      className=" text-[#72727] font-medium text-sm"
                    >
                      Privacy policy
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <Button
                    name={"Login"}
                    buttonType={1}
                    onClick={() => router.push("/login")}
                  />
                  <Button
                    name={"Sign Up"}
                    onClick={() => router.push("/register")}
                  />
                </>
              )}
              {/* <UploadVideoButton /> */}
            </div>
            <Navbar />

            {children}
          </sidebarContext.Provider>
        </SessionProvider>
      </body>
    </html>
  );
}