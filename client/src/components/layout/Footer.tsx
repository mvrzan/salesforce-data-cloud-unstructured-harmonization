import dataCloudLogo from "../../assets/data_cloud_logo.png";
import agentforceLogo from "../../assets/agentforce_logo.webp";
import herokuLogo from "../../assets/heroku.webp";

export const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Powered by section */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <span className="text-xs sm:text-sm text-gray-600">Powered by</span>
            <div className="flex items-center gap-3 sm:gap-4">
              <img
                src={dataCloudLogo}
                alt="Data Cloud"
                className="h-5 sm:h-6 object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
              <span className="text-gray-300">•</span>
              <img
                src={agentforceLogo}
                alt="Agentforce"
                className="h-5 sm:h-6 object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          {/* Built with Heroku */}
          <div className="flex items-center gap-2 sm:gap-3 bg-linear-to-r from-purple-50 to-indigo-50 px-3 sm:px-4 py-2 rounded-lg border border-purple-100">
            <span className="text-xs sm:text-sm font-medium text-gray-700">Built with</span>
            <img src={herokuLogo} alt="Heroku" className="h-4 sm:h-5 object-contain" />
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Salesforce. Demo application for unstructured data harmonization.
          </p>
        </div>
      </div>
    </footer>
  );
};
