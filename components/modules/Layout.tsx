/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Apr 07 2022 10:47:55 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import Head from "next/head";
import { useRouter } from "next/router";
import { config } from "../../config";
import { capitalize } from "../../utils";
import NavBar from "./NavBar";

interface Props {
  title?: string;
  navbar?: true | undefined;
  // footer?: true | undefined;
  className?: string;
}

const Layout: React.FC<Props> = ({
  title,
  navbar,
  // footer,
  className,
  children,
}) => {
  const currentRoute = useRouter().route.split("/").pop();

  return (
    <div className={`${className} select-none overflow-hidden`}>
      {/* head */}
      <Head>
        {title ? (
          <title>
            {title || (currentRoute && capitalize(currentRoute))} |{" "}
            {config.APP_NAME}
          </title>
        ) : (
          <title>{config.APP_NAME}</title>
        )}
        {/* TODO: update favicon.ico */}
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={config.APP_DESCRIPTION} />
        <meta name="author" content={config.APP_AUTHOR} />
        <meta name="email" content={config.APP_AUTHOR_EMAIL} />
        <meta name="github" content={config.APP_AUTHOR_GITHUB} />
        <meta name="instagram" content={config.APP_AUTHOR_INSTAGRAM} />
        <meta name="linkedin" content={config.APP_AUTHOR_LINKEDIN} />
        <meta name="twitter" content={config.APP_AUTHOR_TWITTER} />
        <meta name="youtube" content={config.APP_AUTHOR_YOUTUBE} />
      </Head>
      {navbar && <NavBar />}
      {/* header/nav */}
      {/* render children */}
      {children}
      {/* footer */}
      {/* {footer && <Footer />} */}
    </div>
  );
};

export default Layout;
