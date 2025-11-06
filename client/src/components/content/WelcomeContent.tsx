export const WelcomeContent = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="space-y-8">
        {/* Introduction */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to the Demo</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            This interactive demonstration showcases how Data 360 (formerly Data Cloud) combined with Agentforce can
            intelligently process, analyze, and harmonize unstructured data from various sources.
          </p>
        </section>

        {/* What is Data 360 */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Data 360?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Data 360 is Salesforce's powerful data platform that enables organizations to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Unify data from multiple sources into a single view</li>
            <li>Process and harmonize structured and unstructured data</li>
            <li>Create real-time customer profiles and insights</li>
            <li>Power AI-driven experiences and automation</li>
          </ul>
        </section>

        {/* How Agentforce Helps */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How Agentforce Enhances Data Harmonization</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Agentforce brings AI-powered intelligence to data processing:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Automatically extracts insights from unstructured documents</li>
            <li>Identifies patterns and relationships in complex data</li>
            <li>Provides intelligent recommendations for data mapping</li>
            <li>Ensures data quality and consistency across sources</li>
          </ul>
        </section>

        {/* Try It Out */}
        <section className="bg-linear-to-r from-blue-50 to-purple-50 rounded-lg shadow-md p-8 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Try It Out</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Click the chat widget in the bottom-right corner to start a conversation with Agentforce. Try asking
            questions like:
          </p>
          <div className="space-y-2 ml-4">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-gray-800 italic">"Analyze this customer data file"</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-gray-800 italic">"Help me harmonize these records"</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-gray-800 italic">"Show me data quality insights"</p>
            </div>
          </div>
          <p className="text-gray-600 mt-4 text-sm">
            💡 Click on any message response to view detailed properties and content
          </p>
        </section>
      </div>
    </div>
  );
};
