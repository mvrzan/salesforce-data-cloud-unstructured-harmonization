import dataCloudLogo from "../../assets/data_cloud_logo.png";
import agentforceLogo from "../../assets/agentforce_logo.webp";

export const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <img src={dataCloudLogo} alt="Data Cloud Logo" className="h-6 sm:h-8 object-contain shrink-0" />
            <div className="border-l border-gray-300 h-6 sm:h-8 shrink-0"></div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-lg font-semibold text-gray-900 truncate">
                Unstructured Data Harmonization
              </h1>
              <p className="text-xs text-gray-500">Data 360</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">Powered by</p>
              <p className="text-xs text-gray-500">Agentforce</p>
            </div>
            <img src={agentforceLogo} alt="Agentforce" className="h-6 sm:h-7 object-contain" />
          </div>
        </div>
      </div>
    </header>
  );
};
