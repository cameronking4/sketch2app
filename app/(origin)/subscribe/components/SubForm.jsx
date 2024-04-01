'use client'

import React, { useState } from 'react';
import {
  saveAPIKey,
  createStripeCheckoutSession,
  cancelSubscripion
} from '../../../actions';

const SubForm = ({ uid, subData }) => {
  console.log(subData);
  const [key, setKey] = useState(subData.key.openAIKey || "");
  const [keyLoading, setKeyLoading] = useState(false);
  const [subLoading, setSubLoading] = useState(false);

  const handleKey = async (e) => {
    e.preventDefault();
    setKeyLoading(true);
    try {
      await saveAPIKey(uid, key);
    } catch (error) {
      console.log(error);
    }
    setKeyLoading(false);
  }

  const handleSubscribe = async () => {
    setSubLoading(true);
    try {
      await createStripeCheckoutSession(uid);
    } catch (error) {
      console.log(error);
    }
    setSubLoading(false); // Reset loading state
  }

  const handleUnsubscribe = async () => {
    setSubLoading(true);
    try {
      await cancelSubscripion(uid);
    } catch (error) {
      console.log(error);
    }
    setSubLoading(false); // Reset loading state
  }

  return (
    <div className="md:w-8/12 lg:ms-6 lg:w-5/12">
      <form onSubmit={handleKey}>
        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">{`OpenAI apiKey`}</label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
          placeholder="sk-1234567890"
          value={key}
          onChange={e => setKey(e.target.value)}
          required
        />
        <button
          type="submit"
          className="py-2 px-4 max-w-md flex justify-center items-center bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-[#4285F4]/50 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          disabled={keyLoading}
        >
          {!keyLoading ?
            <>
              Use your API Key
            </>
            :
            <div className="border-gray-300 h-6 w-6 animate-spin rounded-full border-2 border-t-blue-600" />
          }
        </button>
        {(subData.key.openAIKey && !subData.key.success) && <p className="my-1">{subData.key.message}</p>}
      </form>

      <div
        className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
        <p
          className="mx-4 mb-0 text-center font-semibold">
          OR
        </p>
      </div>

      <button
        type="button"
        className="py-2 px-4 max-w-md flex justify-center items-center bg-yellow-500 hover:bg-yellow-600 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
        onClick={subData.sub.success ? handleUnsubscribe : handleSubscribe}
        disabled={subLoading}
      >
        {!subLoading ?
          <>
            {subData.sub.success ? "Cancel Subscription" : "Subscribe (10USD / Monthly)"}
          </>
          :
          <div className="border-gray-300 h-6 w-6 animate-spin rounded-full border-2 border-t-blue-600" />
        }
      </button>
      <p className="my-1">{subData.sub.message}</p>
    </div>
  );
}

export default SubForm;
