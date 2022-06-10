/*
Author: chankruze (chankruze@gmail.com)
Created: Fri Jun 10 2022 10:50:07 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { NextPageContext } from "next";
import { Provider } from "next-auth/providers";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import Link from "next/link";
import Layout from "../components/modules/Layout";
import ProviderLoginButton from "../components/modules/ProviderLoginButton";

interface SignInProps {
  csrfToken?: string;
  providers: Provider[];
}

const SignIn: React.FC<SignInProps> = ({ csrfToken, providers }) => {
  return (
    <Layout
      title="Login"
      className="flex flex-col w-full flex-1 bg-gray-50 min-h-screen items-center user-select-none"
    >
      <main
        className="bg-white w-[400px] flex flex-col
            p-4 rounded drop-shadow-md my-auto"
      >
        <div>
          <img
            src="https://www.svgrepo.com/show/327408/logo-vercel.svg"
            className="h-32 w-32 mx-auto -mt-20"
            alt="Postman"
          />
        </div>
        {/* signin / signup */}
        {/* render provider login buttons */}
        {providers &&
          Object.values(providers).map((provider) => {
            // if the provider is email render this
            if (provider.id === "email") {
              return (
                <form
                  method="post"
                  action="/api/auth/signin/email"
                  className="py-2 px-4"
                >
                  <p className="font-medium text-sm">Email</p>
                  <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                  />
                  <input
                    className="w-full p-2 my-2 rounded border bg-gray-50hover:border-blue-300 
                    focus:outline-none focus:border-blue-600"
                    type="email"
                    id="email"
                    name="email"
                  />
                  <button
                    type="submit"
                    className={`w-full py-3 px-4 text-white capitalize bg-blue-600 hover:bg-blue-700 rounded`}
                  >
                    Sign in with Email
                  </button>
                </form>
              );
            }

            return (
              <div className="py-2 px-4" key={provider.id}>
                <ProviderLoginButton provider={provider} bgColor="bg-black" />
              </div>
            );
          })}
      </main>
    </Layout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();

  return {
    props: {
      csrfToken,
      providers,
    },
  };
}

export default SignIn;
