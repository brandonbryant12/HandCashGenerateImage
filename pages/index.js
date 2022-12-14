/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import HandCashService from "../src/services/HandCashService";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ query, req }) {
    console.log(sessionOptions);
    if (!req.session?.user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    } else {
      const balance = await new HandCashService(
        req.session.authToken
      ).getBalance();
      return {
        props: {
          user: req.session.user,
          balance,
        },
      };
    }
  },
  sessionOptions
);

export default function HomePage({ redirectionUrl, sessionToken, user }) {
  const [paymentResult, setPaymentResult] = useState({ status: "none" });
  const [imageResult, setImageResult] = useState({ status: "none" });
  const [input, setInput] = useState(""); // define input state variable

  const pay = async () => {
    setPaymentResult({ status: "pending" });
    const response = await fetch(`/api/pay`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
    setPaymentResult(await response.json());
  };

  const createImage = async (input) => {
    setImageResult({ status: "pending" });
    const response = await fetch(`/api/createImage`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });
    setImageResult(await response.json());
  };

  const onDisconnect = async () => {
    window.location.href = "/";
  };

  return (
    <>
      <div>Hello world</div>
    </>
  );
}

//   return (
//     <div className="flex flex-grow flex-col items-center justify-end self-start p-6">
//       <div className="w-full mb-4 flex justify-between items-end">
//         <div
//           className="flex items-center gap-x-1 group"
//           style={{
//             position: "fixed", // positions the element fixed in the viewport
//             top: 20, // sets the top edge of the element at the top edge of the viewport
//             left: 20, // sets the left edge of the element at the left edge of the viewport
//           }}
//         >
//           <div className="bg-darkBackground-900 rounded-full border m-0 hover:bg-white/5">
//             <div className="flex gap-x-3 pr-6">
//               <img
//                 src={user.avatarUrl}
//                 className="inline-block w-8 h-8 border-white/50 rounded-full border-r border-t border-b"
//               />
//               <div className="flex flex-col justify-center items-start gap-y-0.5">
//                 <span className="font-bold text-white/90 leading-4">
//                   ${user.handle}
//                 </span>
//               </div>
//             </div>
//           </div>
//           <button
//             className="rounded-lg px-3 py-1.5 text-xs bg-white/20 shadow-sm shadow-white/20 invisible group-hover:visible font-semibold text-red-400 hover:text-red-500 border border-transparent hover:border-red-500/30"
//             onClick={onDisconnect}
//           >
//             Disconnect
//           </button>
//         </div>
//         <form
//           className={
//             "flex px-4 h-8 items-center rounded-full border bg-gradient-to-r from-brandNormal to-brandDark hover:opacity-90 text-sm font-semibold hover:cursor-pointer" +
//             (imageResult?.status === "pending" ? " animate-pulse" : "")
//           }
//           style={{
//             width: "80%", // sets the width to 80% of the container
//             margin: "0 auto", // centers the element horizontally
//             position: "absolute", // positions the element absolutely
//             top: "15%", // moves the element down by 50% of its height
//             left: "50%", // moves the element left by 50% of its width
//             transform: "translate(-50%, -50%)", // centers the element vertically and horizontally
//           }}
//           onSubmit={(event) => {
//             event.preventDefault();
//             createImage(input);
//           }}
//         >
//           <input
//             type="text"
//             className="form-input"
//             style={{ width: "60%", color: "black" }}
//             placeholder="Give a suggestion"
//             onChange={(event) => setInput(event.target.value)}
//           />
//           <button
//             type="submit"
//             className="ml-3"
//             disabled={imageResult?.status === "pending"}
//           >
//             Generate Image ($0.04)
//           </button>
//         </form>
//       </div>

//       {imageResult.status === "created" && (
//         <div
//           className="w-full flex m-6 border border-brandLight p-4 rounded-xl bg-brandLight/5 gap-x-6 items-center"
//           style={{ width: "50%", height: "auto" }}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="w-10 h-10 text-brandLight"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//           <div>
//             <img
//               src={imageResult.imageUrl}
//               alt="Stylized image"
//               className="w-full"
//             />
//           </div>
//         </div>
//       )}
//       {imageResult.status === "error" && (
//         <div className="flex w-full  m-6 border border-red-400 p-4 rounded-xl bg-red-500/3 gap-x-6 items-center">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="w-10 h-10 text-red-400"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>

//           <div>
//             <p className="text-lg text-white font-bold">
//               Image creation failed
//             </p>
//             <p className="text-white/70">{imageResult.message}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
