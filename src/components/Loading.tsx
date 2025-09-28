import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <DotLottieReact
        src="https://lottie.host/a5c5e544-5959-4705-bea8-4e1cc921e9c2/UEy1KOycka.lottie"
        loop
        autoplay
        className="w-64 h-64"
      />
      <div className="absolute bottom-8 text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Loading Legal Sangam
        </h2>
        <p className="text-sm text-gray-500">
          Please wait while we prepare your experience...
        </p>
      </div>
    </div>
  );
};

export default Loading;
