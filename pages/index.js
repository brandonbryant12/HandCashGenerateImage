/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";
import HandCashService from "../src/services/HandCashService";
import Layout from "../components/Layout";
import ImageDialog from "../components/ImageDialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { Result } from "postcss";

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
      console.log(balance);
      return {
        props: {
          user: req.session.user,
          balance: balance,
        },
      };
    }
  },
  sessionOptions
);

export default function HomePage({ sessionToken, user, balance }) {
  const [paymentResult, setPaymentResult] = useState({ status: "none" });
  const [imageResult, setImageResult] = useState({ status: "none" });
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  console.log("User");
  console.log(user);
  console.log("Balance");
  console.log(balance);

  const pay = async () => {
    setPaymentResult({ status: "pending" });
    const response = await fetch(`/api/pay`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
    if (response.status === 200) {
      toast.success("Payment success!");
    }
    // setIsOpen(true);
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

  return (
    <>
      <ToastContainer />
      <ImageDialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        imageResult={imageResult}
      />
      <Layout user={user} balance={balance}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            // createImage(input);
          }}
          className="glass-card"
        >
          <div className="flex flex-col p-10 items-start justify-center mx-auto ">
            <h1 className="text-4xl text-white font-semibold mb-2 w-80">
              Pay to Generate
            </h1>
            <h5 className="text-sm text-white mb-6 w-80">
              No subscriptions, no emails, no registration.
            </h5>
            <textarea
              type="text"
              placeholder="Photorealistic picture of an android looking man flying over the lost city of Atlantis"
              onChange={(event) => setInput(event.target.value)}
              className="text-base rounded mb-2 w-full bg-black/80 backdrop-blur-xl font-mono text-green-500"
              rows={6}
              maxLength={400}
              resize={"none"}
            />
            <a>
              <button
                type="submit"
                disabled={imageResult?.status === "pending"}
                className="bg-slate-900 px-6 py-3 hover:bg-slate-800 rounded transition-all duration-150"
                onClick={pay}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Image src="/icon_usdc.png" height={24} width={24}></Image>
                  <h6 className="text-white tracking-wider">Pay $0.05</h6>
                </div>
              </button>
            </a>
          </div>
        </form>
      </Layout>
    </>
  );
}
