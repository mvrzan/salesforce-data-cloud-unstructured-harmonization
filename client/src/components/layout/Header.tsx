import dataCloudLogo from "../../assets/data_cloud_logo.png";
import agentforceLogo from "../../assets/agentforce_logo.webp";

export const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={dataCloudLogo} alt="Data Cloud Logo" className="h-8 object-contain" />
            <div className="border-l border-gray-300 h-8"></div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Unstructured Data Harmonization</h1>
              <p className="text-xs text-gray-500">Data 360</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">Powered by</p>
              <p className="text-xs text-gray-500">Agentforce</p>
            </div>
            <img src={agentforceLogo} alt="Agentforce" className="h-7 object-contain" />
          </div>
        </div>
      </div>
    </header>
  );
};
