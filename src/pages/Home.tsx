import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">India’s most trusted legal platform</h1>
          <p className="text-lg mb-6">Find advocates, get instant guidance, upload documents for quick review, and book consultations — all in one place.</p>
          <div className="flex gap-3">
            <Link to="/find" className="px-6 py-3 bg-blue-600 text-white rounded">Find Lawyers</Link>
            <Link to="/community" className="px-6 py-3 border rounded">Community</Link>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-white rounded shadow">
            <h3 className="font-semibold">For Citizens</h3>
            <p className="text-sm">Affordable packages, first consultation discount, secure payments.</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h3 className="font-semibold">For Lawyers</h3>
            <p className="text-sm">Onboarding bonus, referral rewards, performance visibility.</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h3 className="font-semibold">Quick Tools</h3>
            <div className="flex gap-2 mt-2">
              <Link to="/document-review" className="text-sm px-3 py-1 border rounded">Document Review</Link>
              <Link to="/map" className="text-sm px-3 py-1 border rounded">Find Nearby</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
