export const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/agentforce_logo.webp" alt="Agentforce Logo" className="h-10 w-10 object-contain" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Data Cloud Demo</h1>
              <p className="text-sm text-gray-500">Unstructured Data Harmonization</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
              Powered by Agentforce
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
