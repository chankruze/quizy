/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Apr 07 2022 10:53:39 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
// components
import IconButton from "../elements/IconButton";
import ProfileButton from "./ProfileButton";
// config
import { config } from "../../config";
// icons
import { MdLogin } from "react-icons/md";
import { RiMenu3Line } from "react-icons/ri";
import { IoLogoVercel } from "react-icons/io5";

const NavBar = () => {
  const { status } = useSession();

  return (
    <div className="w-full flex justify-between p-2 sm:px-4 border-b border-gray-200">
      <div className="flex gap-1">
        <Link href="/">
          <p className="font-bold text-3xl flex items-center">
            <IoLogoVercel size={32} />
            <a className="ml-1">{config.APP_NAME}</a>
          </p>
        </Link>
        <p className="self-end text-xs italic text-blue-500">
          <span>v</span>
          {config.APP_VERSION}
        </p>
      </div>
      <div className="flex sm:hidden justify-center items-center">
        <RiMenu3Line size={32} />
      </div>
      <div className="hidden sm:flex gap-1 sm:gap-2 flex-wrap">
        {/* profile button */}
        {status === "authenticated" ? (
          <div className="flex gap-2 items-center">
            {/* <IconButton btnType="danger" onClick={signOut}>
                            <MdLogout size={24} />
                            <span className="ml-1 capitalize">sign out</span>
                        </IconButton> */}
            <ProfileButton />
          </div>
        ) : (
          <IconButton btnType="primary" onClick={signIn}>
            <MdLogin size={24} />
            <span className="ml-1 capitalize">sign in</span>
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default NavBar;
