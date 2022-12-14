import Head from "next/head";
import Image from "next/image";

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>AI Image Generator</title>
        <meta
          name="description"
          content="Getting started with HandCash Connect"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col h-screen w-full">
        <div className="flex-grow flex flex-col justify-center items-center bg-gradient-to-b from-darkBackground-900 to-darkBackground-900">
          <div className="flex-grow flex justify-center items-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
