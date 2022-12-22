/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";
import HandCashService from "../src/services/HandCashService";
import Layout from "../components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { Result } from "postcss";
import { BarLoader } from "react-spinners";

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

export default function HomePage({ user, balance }) {
  const [imageResult, setImageResult] = useState({ status: "none" });
  const [imageHistoryResult, setImageHistoryResult] = useState({ status: "none", images: [] });
  const [input, setInput] = useState("");

  const imgList = [
    "/examples/01.jpg",
    "/examples/02.jpg",
    "/examples/03.jpg",
    "/examples/04.jpg",
    "/examples/05.jpg",
    "/examples/06.jpg",
    "/examples/07.jpg",
    "/examples/08.jpg",
    "/examples/09.jpg",
    "/examples/10.jpg",
  ];

  const createImage = async (input) => {
    setImageResult({ status: "pending" });

    const response = await fetch(`/api/createImage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ input }),
    });
    setImageResult(await response.json());
  };

  const getImageHistory = async () => {
    const response = await fetch(`/api/getImages`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    setImageHistoryResult(await response.json());
  };

  function isInputTextValid(text) {
    if (text.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  function onChangeInputText(input) {
    console.log(input);
    if (isInputTextValid(input)) {
      setImageResult({ status: "ready" });
    } else {
      setImageResult({ status: "none" });
    }
    console.log(imageResult);
    setInput(input);
  }

  if (imageResult.status == "pending") {
    return (
      <>
        <Layout user={user} balance={balance}>
          <div className="flex flex-col justify-center items-start h-full max-w-xs">
            <BarLoader color="#f59e0b" width={320} />
            <p className="text-slate-400 uppercase tracking-wider text-xs pt-2 pb-8">
              Processing image...
            </p>
          </div>
        </Layout>
      </>
    );
  } else if (imageResult.status == "error") {
    return (
      <>
        <Layout user={user} balance={balance}>
          <div className="flex flex-col justify-center items-start h-full max-w-xs">
            <p className="text-slate-400 uppercase tracking-wider text-xs pt-2 pb-8">
              We could not process your request.
              <br />
              Please, try later.
            </p>
          </div>
        </Layout>
      </>
    );
  } else
    return (
      <>
        <ToastContainer />

        <Layout user={user} balance={balance}>
          <div className="p-6">
            <h5 className="text-slate-400 w-full mb-4 tracking-wide">
              Start with a detailed description
            </h5>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                createImage(input);
              }}
              className="rounded shadow-md shadow-slate-200 bg-white"
            >
              <textarea
                type="text"
                placeholder="Photorealistic picture of an android looking man flying over the lost city of Atlantis"
                onChange={(event) => onChangeInputText(event.target.value)}
                className="border-none focus:ring-0 w-full border-white rounded-t-md p-4 prose placeholder:text-slate-400 text-slate-900"
                rows={4}
                maxLength={280}
                resize={"none"}
              />
              <a>
                <button
                  type="submit"
                  disabled={imageResult.status != "ready"}
                  className="w-full h-full text-center px-6 py-4 border-t border-slate-200 hover:bg-slate-50 rounded-b"
                >
                  <div className="flex items-center justify-center space-x-2 ">
                    <Image src="/icon_usdc.png" height={20} width={20}></Image>
                    <h6 className="text-base font-semibold tracking-wide">
                      Generate $0.05
                    </h6>
                  </div>
                </button>
              </a>
            </form>

            {imageResult.status === "created" ? (
              <>
                <div className="flex items-center my-8">
                  <p className="text-slate-400 text-xs tracking-wider">
                    RESULT
                  </p>
                  <div className="h-0 border-t border-slate-200 w-full ml-4"></div>
                </div>
                <div className="aspect-square bg-slate-300 rounded relative">
                  <Image
                    src={imageResult.imageUrl}
                    layout="fill"
                    objectFit="contain"
                    className="absolute rounded"
                  ></Image>
                </div>
              </>
            ) : (
              <>
                <p className="text-slate-400 text-xs tracking-wide pt-2">
                  You will only be charged for successful generations
                </p>
                <div className="flex items-center my-8">
                  <p className="text-slate-400 text-xs tracking-wide">
                    EXAMPLES
                  </p>
                  <div className="h-0 border-t border-slate-200 w-full ml-4"></div>
                </div>
                <div className="grid grid-cols-2 gap-2 ">
                  {imgList.map((imageUrl) => (
                    <div
                      className="aspect-square bg-slate-300 rounded relative"
                      key={imageUrl}
                    >
                      <Image
                        src={imageUrl}
                        layout="fill"
                        objectFit="contain"
                        className="absolute rounded"
                      ></Image>
                    </div>
                  ))}
                </div>
                <a href="mailto:b.bryant@handcash.io">
                  <button className="text-center tracking-wide bg-slate-200 hover:bg-slate-300 w-full rounded py-4 mt-4 font-semibold">
                    Contact Us
                  </button>
                </a>
              </>
            )}
          </div>
        </Layout>
      </>
    );
}
