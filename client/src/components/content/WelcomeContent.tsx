export const WelcomeContent = () => {
  return (
    <div className="w-full">
      {/* Hero Introduction - Full Width */}
      <section className="bg-linear-to-br from-blue-500 via-purple-500 to-indigo-600 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Unstructured Data Harmonization</h2>
          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto">
            See how Data Cloud transforms unstructured data (PDFs, text, videos, audio) into harmonized data model
            objects with HTML representations—making knowledge accessible in Salesforce CRM and Agentforce citations.
          </p>
        </div>
      </section>

      {/* How Agentforce Helps - Colored Background */}
      <section className="bg-linear-to-r from-slate-50 to-blue-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            How It Works: From Raw Data to Citations
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Ingest & Chunk</h3>
                  <p className="text-gray-600">
                    Data Cloud ingests unstructured data (PDFs, text, videos, audio) and breaks them into text chunks
                    for processing
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 rounded-lg p-3">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Vectorize for RAG</h3>
                  <p className="text-gray-600">
                    Text chunks are vectorized and used in Retrieval Augmented Generation (RAG) with Agentforce
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 rounded-lg p-3">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Create HTML Objects</h3>
                  <p className="text-gray-600">
                    Creates harmonized data model objects containing HTML representations of the unstructured data
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 rounded-lg p-3">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Citations in Agentforce</h3>
                  <p className="text-gray-600">
                    HTML objects are added as citations in Agentforce message responses, providing full source context
                    and traceability
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Try It Out - Call to Action */}
      <section className="bg-linear-to-r from-blue-600 to-purple-600 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">See It in Action</h2>
          <p className="text-xl text-blue-100 leading-relaxed mb-8 text-center">
            Chat with Agentforce using the widget in the bottom-right corner. When Agentforce responds with cited
            sources, click the message to view the harmonized HTML content from the citation object.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-90 backdrop-blur rounded-xl p-5 shadow-lg hover:bg-opacity-100 transition-all">
              <p className="text-gray-800 font-medium">"What's in the customer knowledge base?"</p>
            </div>
            <div className="bg-white bg-opacity-90 backdrop-blur rounded-xl p-5 shadow-lg hover:bg-opacity-100 transition-all">
              <p className="text-gray-800 font-medium">"Show me product documentation"</p>
            </div>
            <div className="bg-white bg-opacity-90 backdrop-blur rounded-xl p-5 shadow-lg hover:bg-opacity-100 transition-all">
              <p className="text-gray-800 font-medium">"Find service case solutions"</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-blue-100 text-lg">
              💡 <span className="font-semibold">Key Feature:</span> Click on bot responses to see the citation's HTML
              content and metadata—just like viewing an attached knowledge article in Salesforce CRM
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
