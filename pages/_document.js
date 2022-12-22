import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>AImagination</title>
          <meta
            name="description"
            content="Transform your imagination into reality with AI"
          />
          <link rel="icon" href="/favicon.ico" />
          <meta name="theme-color" content="#fff" />
        </Head>
        <body className="bg-slate-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
