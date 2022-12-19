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
    <>
      <h1>Login page</h1>
      <a href={redirectionUrl}>
        <p>{redirectionUrl}</p>
        <button className="bg-black text-white px-4 py-3 hover:bg-black/90">
          Connect App
        </button>
      </a>
    </>
    // <head>
    //   <title>Pay Pistol | Login</title>
    //   <meta name="description" content="The mass tipping app by HandCash" />
    //   <link rel="icon" href="/favicon.ico" />
    // </head>
    // <body>
    //   <div className="flex min-h-screen justify-center items-center">
    //     <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    //       <div className="max-w-sm space-y-4">
    //         <div className="mb-10 flex flex-col items-center">
    //           <h1>Logo Here</h1>
    //           <h2 className="text-center text-3xl font-semibold text-white">
    //             Image Generator
    //           </h2>
    //           <p className="mt-2 text-center text-sm text-slate-400">
    //             AI Image generator with micropayments
    //           </p>
    //         </div>
    //         <div>
    //           <a href={redirectionUrl}>
    //             <button className="w-full flex items-center justify-center space-x-2 rounded-lg bg-white hover:bg-slate-100 py-3 pl-4 pr-6 text-sm font-medium tracking-wider text-brandBlueDark">
    //               <Image
    //                 src="/monogram_green.svg"
    //                 height={34}
    //                 width={34}
    //               ></Image>
    //               <div className="text-brandDarkBlue">
    //                 Connect with HandCash
    //               </div>
    //             </button>
    //           </a>
    //         </div>
    //         <div>
    //           <p className="text-center text-xs text-slate-400">
    //             By connecting your wallet you are acknowledging that you read
    //             and accepted our
    //             <span>
    //               {" "}
    //               <Link href="legal/terms">
    //                 <a
    //                   target="_blank"
    //                   rel="noopener noreferrer"
    //                   className="link-item"
    //                 >
    //                   Terms of Service
    //                 </a>
    //               </Link>
    //             </span>{" "}
    //             and{" "}
    //             <span>
    //               {" "}
    //               <Link href="legal/privacy">
    //                 <a
    //                   target="_blank"
    //                   rel="noopener noreferrer"
    //                   className="link-item"
    //                 >
    //                   Privacy Policy
    //                 </a>
    //               </Link>
    //             </span>
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </body>
  );
}
