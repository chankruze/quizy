/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Apr 07 2022 10:53:39 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import Link from "next/link";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
// components
import IconButton from "../elements/IconButton";
import ProfileButton from "../elements/ProfileButton";
import NavLink from "../elements/NavLink";
// config
import { config } from "../../config";
import { navbarLinks } from "../../config/navbarLinks";
// icons
import { GoSignIn } from "react-icons/go";
import { SiVercel } from "react-icons/si";

const NavBar = () => {
  const { data: session, status } = useSession();
  let image: string | null | undefined;
  let name: string | null | undefined;
  let email: string | null | undefined;

  if (session) {
    image = session.user?.image;
    name = session.user?.name;
    email = session.user?.email;
  }

  return (
    <div className="w-full flex justify-between items-center p-2 sm:px-4">
      <div className="flex gap-1">
        <Link href="/" passHref>
          <p className="flex items-center font-bold font-poppins text-3xl text-blue-500 cursor-pointer">
            <SiVercel size={32} />
            <a className="ml-1">{config.APP_NAME}</a>
          </p>
        </Link>
        {/* <p className="self-end text-xs text-yellow-500 font-nunito italic hidden sm:block">
          <span>v</span>
          {config.APP_VERSION}
        </p> */}
      </div>

      {/* navbar links */}
      <div className="hidden sm:flex flex-wrap gap-10 justify-center items-center">
        {navbarLinks.map((link) => (
          <NavLink key={link.name} link={link} showText />
        ))}
      </div>

      {/* mobile layout */}
      <div className="flex sm:hidden gap-6 justify-center items-center">
        {status === "authenticated" ? (
          <>
            <div className="flex justify-center items-center gap-4">
              {navbarLinks
                .filter((it) => it.url !== "/profile")
                .map((link) => (
                  <NavLink key={link.name} link={link} showIcon />
                ))}
            </div>
            <Link href="/profile" passHref>
              <div className="h-8 w-8 relative flex justify-center items-center">
                {/* if user has image */}
                {image && (
                  <Image
                    src={image as string}
                    layout="fill"
                    className="rounded-[100%]"
                    alt="profile"
                  />
                )}
                {/* if image not found */}
                {!image && name && (
                  <p className="bg-gray-200 py-1 px-3 rounded-md font-bold font-montserrat text-xl">
                    {name.split(" ")[0][0].toUpperCase()}
                  </p>
                )}
                {/* if image not found */}
                {!image && !name && (
                  <p className="bg-white py-1 px-3 rounded-md font-bold font-montserrat text-xl border-2 border-blue-200">
                    {email?.charAt(0).toUpperCase()}
                  </p>
                )}
              </div>
            </Link>
          </>
        ) : (
          <IconButton btnType="secondary" onClick={signIn}>
            <span className="ml-1 font-nunito">sign in</span>
          </IconButton>
        )}
        {/* TODO: open a popup menu  */}
        {/* <GoThreeBars size={32} className="ml-4" /> */}
      </div>

      {/* non-mobile layout */}
      <div className="hidden sm:flex gap-1 sm:gap-3 flex-wrap">
        {/* profile button */}
        <div>
          {status === "authenticated" ? (
            <div className="flex items-center">
              <ProfileButton />
            </div>
          ) : (
            <IconButton btnType="primary" onClick={signIn}>
              <GoSignIn size={24} />
              <span className="ml-1 capitalize">sign in</span>
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
