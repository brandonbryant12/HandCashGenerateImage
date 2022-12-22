import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import HandCashService from "../../src/services/HandCashService";
import Image from "next/image";
import Link from "next/link";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ query, req }) {
    if (req.session?.user) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    } else {
      const redirectionUrl = new HandCashService().getRedirectionUrl();
      return {
        props: {
          redirectionUrl,
        },
      };
    }
  },
  sessionOptions
);

export default function LoginPage({ redirectionUrl }) {
  return (
    <div className="bg-white sm:bg-transparent flex flex-col justify-center items-center h-screen">
      <div className="sm:bg-white sm:shadow-md sm:max-w-sm p-6 sm:p-10 rounded">
        <div className="h-full w-full flex flex-col justify-center items-center">
          <Image
            src="/dreamer_icon.jpeg"
            height={72}
            width={72}
            className="rounded-2xl"
          />
          <h1 className="text-slate-700 text-3xl font-bold text-center mt-4">
            <span className="text-amber-500">ai</span>magination
          </h1>
          <p className="prose mb-6 mt-2 text-center text-sm">
            Transform your imagination into reality with AI.
            <br />
            No subscriptions, no ads, no sign ups.
          </p>
          <a href={redirectionUrl}>
            <div className="bg-black text-white px-6 py-3 hover:bg-black/80 w-full tracking-wide rounded shadow flex items-center justify-center">
              <Image src="/monogram_green.svg" height={32} width={32} />
              <p className="ml-2">Connect with HandCash</p>
            </div>
          </a>
          <p className="text-center text-xs text-slate-400 mt-2 prose">
            By connecting your wallet you are accepting our<br/>
            <span>
              {" "}
              <Link href="legal/terms">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" text-slate-900 underline hover:text-amber-500"
                >
                  Terms of Service
                </a>
              </Link>
            </span>{" "}
            and{" "}
            <span>
              <Link href="legal/privacy">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" text-slate-900 underline hover:text-amber-500"
                >
                  Privacy Policy
                </a>
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
