import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      <video
        className="video-background"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/5636967-uhd_3840_2160_24fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="home-content min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-4 py-12 w-full">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4 text-white">India’s most trusted legal platform</h1>
              <p className="text-lg mb-6 text-white">Find advocates, get instant guidance, upload documents for quick review, and book consultations — all in one place.</p>
              <div className="flex gap-3">
                <Link to="/find" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">Find Lawyers</Link>
                <Link to="/community" className="px-6 py-3 border border-white text-white rounded hover:bg-white hover:text-black">Community</Link>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-white/90 backdrop-blur-sm rounded shadow">
                <h3 className="font-semibold">For Citizens</h3>
                <p className="text-sm">Affordable packages, first consultation discount, secure payments.</p>
              </div>
              <div className="p-4 bg-white/90 backdrop-blur-sm rounded shadow">
                <h3 className="font-semibold">For Lawyers</h3>
                <p className="text-sm">Onboarding bonus, referral rewards, performance visibility.</p>
              </div>
              <div className="p-4 bg-white/90 backdrop-blur-sm rounded shadow">
                <h3 className="font-semibold">Quick Tools</h3>
                <div className="flex gap-2 mt-2">
                  <Link to="/document-review" className="text-sm px-3 py-1 border rounded hover:bg-gray-100">Document Review</Link>
                  <Link to="/map" className="text-sm px-3 py-1 border rounded hover:bg-gray-100">Find Nearby</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
