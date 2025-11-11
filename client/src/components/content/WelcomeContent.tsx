export const WelcomeContent = () => {
  return (
    <div className="w-full bg-linear-to-b from-slate-50 to-white">
      {/* Hero Introduction - Clean & Modern */}
      <section className="py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-2 sm:space-y-3">
            <div className="inline-block">
              <span className="px-3 sm:px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                Data 360 + Agentforce
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Unstructured Data
              <br />
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Harmonization
              </span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto px-4">
              Transform unstructured data into actionable knowledge. Data 360 converts PDFs, text, videos, and audio
              into harmonized HTML objects—accessible in Salesforce CRM and Agentforce citations.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works - Card Layout */}
      <section className="py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">From Raw Data to Citations</h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto px-4">
              A seamless pipeline that turns unstructured content into intelligent, citable knowledge
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Card 1 */}
            <div className="group relative bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
              <div className="absolute top-2 right-2 text-2xl font-bold text-gray-100 group-hover:text-blue-100 transition-colors">
                01
              </div>
              <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center mb-2 group-hover:bg-blue-100 transition-colors">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-sm text-gray-900 mb-1">Ingest & Chunk</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Data 360 ingests unstructured files and breaks them into processable text chunks
              </p>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-lg hover:border-purple-200 transition-all duration-300">
              <div className="absolute top-2 right-2 text-2xl font-bold text-gray-100 group-hover:text-purple-100 transition-colors">
                02
              </div>
              <div className="bg-purple-50 w-10 h-10 rounded-lg flex items-center justify-center mb-2 group-hover:bg-purple-100 transition-colors">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-sm text-gray-900 mb-1">Vectorize for RAG</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Chunks are vectorized and used in Retrieval Augmented Generation with Agentforce
              </p>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-lg hover:border-indigo-200 transition-all duration-300">
              <div className="absolute top-2 right-2 text-2xl font-bold text-gray-100 group-hover:text-indigo-100 transition-colors">
                03
              </div>
              <div className="bg-indigo-50 w-10 h-10 rounded-lg flex items-center justify-center mb-2 group-hover:bg-indigo-100 transition-colors">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-sm text-gray-900 mb-1">Create HTML Objects</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                Harmonized data model objects are created with HTML representations of the data
              </p>
            </div>

            {/* Card 4 */}
            <div className="group relative bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all duration-300">
              <div className="absolute top-2 right-2 text-2xl font-bold text-gray-100 group-hover:text-green-100 transition-colors">
                04
              </div>
              <div className="bg-green-50 w-10 h-10 rounded-lg flex items-center justify-center mb-2 group-hover:bg-green-100 transition-colors">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-sm text-gray-900 mb-1">Citations in Agentforce</h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                HTML objects appear as citations in Agentforce responses with full source context
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Try It Out - Minimal CTA */}
      <section className="py-4 sm:py-6 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4 sm:mb-5">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">See It in Action</h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto px-4">
              Ask Agentforce questions, then{" "}
              <span className="font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                click on the responses
              </span>{" "}
              to view detailed metadata, citations, and HTML content
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            <div className="group bg-white rounded-lg p-3 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-start gap-2">
                <div className="bg-blue-50 rounded-lg p-2 group-hover:bg-blue-100 transition-colors">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 font-medium text-xs leading-relaxed">
                  "What's in the customer knowledge base?"
                </p>
              </div>
            </div>

            <div className="group bg-white rounded-lg p-3 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-start gap-2">
                <div className="bg-purple-50 rounded-lg p-2 group-hover:bg-purple-100 transition-colors">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 font-medium text-xs leading-relaxed">
                  "Show me product documentation details"
                </p>
              </div>
            </div>

            <div className="group bg-white rounded-lg p-3 border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-start gap-2">
                <div className="bg-green-50 rounded-lg p-2 group-hover:bg-green-100 transition-colors">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 font-medium text-xs leading-relaxed">"Find service case solutions"</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-linear-to-r from-blue-50 to-purple-50 rounded-xl px-3 sm:px-4 py-2 border border-blue-100">
              <div className="bg-white rounded-full p-1.5 shadow-sm shrink-0">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-gray-900">Quick Start</p>
                <p className="text-xs text-gray-600">Look for the chat widget in the bottom-right corner</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
