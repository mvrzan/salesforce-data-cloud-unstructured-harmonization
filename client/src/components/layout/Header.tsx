export const Header = () => {
  return (
    <header className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-4">
          <img src="/agentforce_logo.webp" alt="Agentforce Logo" className="h-16 w-16 object-contain" />
          <h1 className="text-4xl md:text-5xl font-bold">Data 360 Unstructured Data Harmonization</h1>
        </div>
        <p className="text-center text-xl text-blue-100 max-w-3xl mx-auto">
          Experience how Agentforce intelligently processes and harmonizes unstructured data using Data Cloud's powerful
          AI capabilities
        </p>
      </div>
    </header>
  );
};
