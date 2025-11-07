import type { Message } from "../../types/message";

interface MessageDisplayProps {
  message: Message;
  onBack: () => void;
}

export const MessageDisplay = ({ message, onBack }: MessageDisplayProps) => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Overview
      </button>

      {/* Message Metadata */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Details</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold text-gray-700">Message ID:</span>
            <p className="text-gray-600">{message.id}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Timestamp:</span>
            <p className="text-gray-600">{message.timestamp.toLocaleString()}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Sender:</span>
            <p className="text-gray-600 capitalize">{message.sender}</p>
          </div>
          {message.type && (
            <div>
              <span className="font-semibold text-gray-700">Type:</span>
              <p className="text-gray-600">{message.type}</p>
            </div>
          )}
          {message.isContentSafe !== undefined && (
            <div>
              <span className="font-semibold text-gray-700">Content Safe:</span>
              <p className="text-gray-600">{message.isContentSafe ? "✅ Yes" : "❌ No"}</p>
            </div>
          )}
          {message.planId && (
            <div>
              <span className="font-semibold text-gray-700">Plan ID:</span>
              <p className="text-gray-600">{message.planId}</p>
            </div>
          )}
          <div className="col-span-2">
            <span className="font-semibold text-gray-700">Content:</span>
            <p className="text-gray-600">{message.message || message.content}</p>
          </div>
        </div>
      </div>

      {/* Cited References */}
      {message.citedReferences && message.citedReferences.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📚 Cited References</h3>
          <div className="space-y-4">
            {message.citedReferences.map((ref) => (
              <div
                key={ref.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-blue-50 rounded-lg p-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{ref.name || ref.id}</p>
                    {ref.type && <p className="text-sm text-gray-500">Type: {ref.type}</p>}
                    {ref.url && (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        View Reference →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Metrics */}
      {message.metrics && Object.keys(message.metrics).length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Metrics</h3>
          <div className="space-y-2">
            {Object.entries(message.metrics).map(([key, value]) => (
              <div key={key} className="flex gap-2 border-b border-gray-200 pb-2">
                <span className="font-semibold text-gray-700 min-w-[200px]">{key}:</span>
                <span className="text-gray-600 break-all">
                  {typeof value === "object" ? JSON.stringify(value, null, 2) : String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Result Data */}
      {message.result && message.result.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🔍 Result Data</h3>
          <div className="bg-gray-50 rounded-lg p-4 overflow-auto">
            <pre className="text-sm text-gray-800">{JSON.stringify(message.result, null, 2)}</pre>
          </div>
        </div>
      )}

      {/* Custom Properties */}
      {message.properties && Object.keys(message.properties).length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Custom Properties</h3>
          <div className="space-y-2">
            {Object.entries(message.properties).map(([key, value]) => (
              <div key={key} className="flex gap-2 border-b border-gray-200 pb-2">
                <span className="font-semibold text-gray-700 min-w-[200px]">{key}:</span>
                <span className="text-gray-600 break-all">
                  {typeof value === "object" ? JSON.stringify(value, null, 2) : String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HTML Content */}
      {message.htmlContent && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Content Preview</h3>
          <div
            className="prose max-w-none border border-gray-200 rounded-lg p-4 bg-gray-50"
            dangerouslySetInnerHTML={{ __html: message.htmlContent }}
          />
        </div>
      )}
    </div>
  );
};
