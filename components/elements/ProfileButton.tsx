/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Apr 17 2022 10:44:09 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
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

  return (
    <Link href="/profile" passHref>
      <a
        className="h-full p-3 flex items-center justify-evenly cursor-pointer 
        rounded-md font-nunito text-white bg-blue-600 shadow-md hover:bg-blue-500"
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
      </a>
    </Link>
  );
};

export default ProfileButton;
