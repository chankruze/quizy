/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Apr 21 2022 17:08:40 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../../../components/modules/Layout";
import { fetcher } from "../../../utils/fetcher";

const Quiz = () => {
  const { id } = useRouter().query;
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      signIn();
    },
  });

  const { data, error } = useSWR(
    session
      ? `${process.env.NEXT_PUBLIC_API_URL}/student/email/${session?.user?.email}/verification`
      : null,
    fetcher,
    { errorRetryCount: 0 },
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // check if the student is verified
  if (data && data.verification !== "verified") {
    return (
      <Layout navbar>
        Your bio data is not verified. Please submit bio data for verification.
      </Layout>
    );
  }

  return (
    <Layout className="flex flex-col min-h-screen w-full" navbar>
      <main className="flex flex-col w-full max-w-6xl m-auto flex-1 py-2 px-2 sm:px-4">
        {id}
      </main>
    </Layout>
  );
};

export default Quiz;
