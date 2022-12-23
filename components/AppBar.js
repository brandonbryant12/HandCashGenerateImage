import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import Router from "next/router";

export default function AppBar({ user, balance }) {
  async function logout() {
    const response = await fetch(`/api/logout`, {
      method: "POST",
      headers: { "content-type": "application/json" },
    });
    if (response.status === 200) Router.push("/login");
  }

  return (
    <>
      <div className="mx-auto w-full p-6 border-b border-slate-200 bg-slate-100">
        <div className="flex items-center justify-between ">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <a>
                  <h1 className="text-slate-700 text-3xl font-bold text-center">
                    <span className="text-amber-500">ai</span>magination
                  </h1>
                </a>
              </Link>
            </div>
          </div>
          <div className="ml-4 flex items-center md:ml-6">
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="rounded-full"
                    width={40}
                    height={40}
                    src={user ? user.avatarUrl : ""}
                    alt={user ? user.handle : ""}
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-2 flex flex-col items-center">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {user.displayName.length == 0 ? '$' + user.handle : user.displayName}
                    </h3>
                    <h6 className="text-sm text-slate-500">Your balance</h6>
                    <h3 className="text-2xl font-bold">
                      ${balance[1].spendableBalance.toFixed(2)}
                    </h3>
                  </div>
                  <button
                    className="border-t border-slate-200 px-4 py-2 w-full text-red-500 font-semibold"
                    onClick={logout}
                  >
                    Sign out
                  </button>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
}
