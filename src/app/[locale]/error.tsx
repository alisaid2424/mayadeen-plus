"use client";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center flex-col">
      <div className="text-3xl text-red-600 font-bold">
        Something Went Wrong
      </div>

      <h2 className="text-gray-700 mt-6 text-xl">
        Error Message : {error.message}
      </h2>

      <button
        onClick={reset}
        className="text-white bg-primary py-2 px-4 rounded-full mt-7"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorPage;
