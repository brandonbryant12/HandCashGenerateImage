import Head from "next/head";
import AppBar from "./AppBar";

const Layout = ({ user, balance, children }) => {
  return (
    <div className=" min-h-screen">
      <Head>
        <title>AI Image Generator</title>
        <meta
          name="description"
          content="Getting started with HandCash Connect"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col h-screen">
        <header className="sticky top-0 w-full z-50 glass-appbar">
          <AppBar
            user={user}
            balance={balance}
          ></AppBar>
        </header>
        <div className="flex justify-center items-center flex-grow">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
