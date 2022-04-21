/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Apr 17 2022 10:44:09 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
// types
import { User } from "../../types/user";

const ProfileButton = () => {
  const { data } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      signIn();
    },
  });

  const { email, name, image } = data?.user as User;

  const [isExpanded, setExpanded] = useState(false);

  return (
    <div className="relative">
      <div
        className="h-full px-3 py-2 flex items-center justify-evenly cursor-pointer 
        rounded-md font-nunito text-black shadow hover:shadow-md"
        onClick={() => setExpanded(!isExpanded)}
      >
        {image && (
          <div className="h-8 w-8 relative mr-2">
            <Image
              src={image as string}
              layout="fill"
              className="rounded-[100%]"
              alt="profile"
            />
          </div>
        )}
        {name ? <p>{name}</p> : <p>{email}</p>}
      </div>
      {isExpanded && (
        <div className="absolute min-w-full mt-1 bg-white text-gray-700 shadow-md rounded-md capitalize ">
          <Link href="/profile">
            <a>
              <p className="py-2 px-3 hover:bg-gray-100">edit profile</p>
            </a>
          </Link>
          <Link href="/bio-data">
            <a>
              <p className="py-2 px-3 hover:bg-gray-100">bio data</p>
            </a>
          </Link>
          <p
            className="py-2 px-3 hover:bg-red-100 cursor-pointer"
            onClick={() => signOut()}
          >
            sign out
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
