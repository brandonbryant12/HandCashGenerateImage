/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
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
      // const balance = await new HandCashService(
      //   req.session.authToken
      // ).getBalance();
      return {
        props: {
          user: req.session.user,
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

  console.log(paymentResult);
  const pay = async () => {
    setPaymentResult({ status: "pending" });
    const response = await fetch(`/api/pay`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
    setPaymentResult(await response.json());
    console.log(paymentResult);
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
    <div className="flex flex-col mx-auto items-center justify-center min-h-screen space-y-6">
      <h1 className="text-3xl font-bold">AI Image generator</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          createImage(input);
        }}
      >
        <div className="flex flex-col justify-center items-center max-w-md space-y-4">
          <input
            type="text"
            placeholder="Give a suggestion"
            onChange={(event) => setInput(event.target.value)}
            className="w-full"
          />
          <a>
            <button
              type="submit"
              disabled={imageResult?.status === "pending"}
              className="bg-black text-white px-4 py-3 hover:bg-black/70 w-full"
              onClick={pay}
            >
              Generate Image $0.04
            </button>
          </a>
        </div>
      </form>
      {imageResult.status === "created" && (
        <div
          className="w-full flex m-6 border border-brandLight p-4 rounded-xl bg-brandLight/5 gap-x-6 items-center"
          style={{ width: "50%", height: "auto" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 text-brandLight"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <img
              src={imageResult.imageUrl}
              alt="Stylized image"
              className="w-full"
            />
          </div>
        </div>
      )}
      {imageResult.status === "error" && (
        <div className="flex w-full  m-6 border border-red-400 p-4 rounded-xl bg-red-500/3 gap-x-6 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 text-red-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <div>
            <p className="text-lg text-white font-bold">
              Image creation failed
            </p>
            <p className="text-white/70">{imageResult.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
