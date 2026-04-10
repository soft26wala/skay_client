import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const PaymentResultClient = () => {
  const [searchParams] = useSearchParams();

  const status = searchParams.get("status") ?? "unknown";
  const tid = searchParams.get("tid") ?? "";

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-gray-50 dark:bg-[#111] p-10 rounded-[2rem] border border-gray-200 dark:border-white/5 shadow-2xl text-center mt-16">
        
        {status === "SUCCESS" && (
          <>
            <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon icon="solar:check-circle-bold" className="text-5xl" />
            </div>
            <h1 className="text-3xl font-black dark:text-white mb-3 tracking-tight">
              Success!
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              Your payment has been processed successfully. Your course has been added to your classroom. Happy learning!
            </p>
          </>
        )}

        {status === "PENDING" && (
          <>
            <div className="w-20 h-20 bg-orange-500/10 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Icon icon="solar:clock-circle-bold" className="text-5xl" />
            </div>
            <h1 className="text-3xl font-black dark:text-white mb-3 tracking-tight">
              Processing...
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              Your payment is currently being processed. Please wait while we confirm your transaction.
            </p>
          </>
        )}

        {/* Default fallback */}
        {status !== "SUCCESS" && status !== "PENDING" && (
          <>
            <h1 className="text-2xl font-bold text-gray-600 dark:text-white mb-4">
              Unknown Status
            </h1>
          </>
        )}

        <div className="bg-white dark:bg-white/5 rounded-2xl p-4 mb-8 text-left border dark:border-white/5">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Transaction ID</span>
            <span className="dark:text-white font-mono">
              {tid || "N/A"}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            to="/classroom"
            className="bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-bold transition-all"
          >
            Go to Classroom
          </Link>

          <Link
            to="/"
            className="text-gray-500 dark:text-gray-400 font-semibold hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentResultClient;