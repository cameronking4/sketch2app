'use client'

import React, { Fragment } from 'react';
import { ArrowRightStartOnRectangleIcon, CurrencyDollarIcon } from "@heroicons/react/20/solid";
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react'
import { auth } from '../firebase/client';
import { signOut } from 'firebase/auth';
import { logout } from '../app/actions';

const Logout = ({ currentUser }) => {
  const onLogout = async () => {
    await signOut(auth);
    await logout();
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="focus:outline-none">
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full"
            src={currentUser.photoUrl}
            alt="Rounded avatar" />
          <div className="text-xs ms-2 text-left">
            <p>{currentUser.name}</p>
            <p>{currentUser.email}</p>
          </div>
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-2">
          <Menu.Item className='my-1'>
            <Link className="flex items-center" href="/subscribe">
              <CurrencyDollarIcon className="w-5 h-5 me-2" aria-label="true" />
              Subscribe
            </Link>
          </Menu.Item>
          <Menu.Item className='my-1'>
            <p className="flex items-center cursor-pointer" onClick={onLogout}>
              <ArrowRightStartOnRectangleIcon className="w-5 h-5 me-2" aria-hidden="true" />
              Log out
            </p>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default Logout;
