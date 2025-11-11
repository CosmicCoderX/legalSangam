import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover brightness-50"
        autoPlay
        loop
        muted
        src="/1.mp4"
      ></video>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mb-4"></div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2 drop-shadow-lg">
            Loading Legal Sangam
          </h2>
          <p className="text-sm text-yellow-400 drop-shadow-md">
            Please wait while we prepare your experience...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
