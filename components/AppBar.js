import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
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
      {" "}
      <Disclosure as="nav" className="bg-brandDarkBlue/90 backdrop-blur-xl">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link href="/">
                      <a>
                      <Image
                          className="rounded-full"
                          width={38}
                          height={40}
                          src="/pewpew-wide.png"
                          alt='Pay Pistol Logo'
                        />
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
                          <h3 className="text-xl font-bold text-slate-900">
                            {user ? user.alias : user.displayName}
                          </h3>
                          <h6 className="text-sm text-slate-500">
                            Your balance
                          </h6>
                          <h3 className="text-2xl font-bold">
                            ${balance.toFixed(2)}
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
        )}
      </Disclosure>
    </>
  );
}
