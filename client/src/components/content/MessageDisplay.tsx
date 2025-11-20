import type { Message } from "../../types/message";
import { useState } from "react";
import { generateSignature } from "../../utils/requestSigner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface MessageDisplayProps {
  message: Message;
  onBack: () => void;
}

interface HudmoData {
  attributes?: {
    content?: string;
    title?: string;
    metadata?: {
      sourceUrl?: string;
    };
  };
}

export const MessageDisplay = ({ message, onBack }: MessageDisplayProps) => {
  const [isLoadingHudmo, setIsLoadingHudmo] = useState(false);
  const [hudmoData, setHudmoData] = useState<HudmoData | null>(null);
  const [hudmoError, setHudmoError] = useState<string | null>(null);

  const fetchHarmonizationData = async () => {
    if (!message.dccid || !message.hudmo) return;

    setIsLoadingHudmo(true);
    setHudmoError(null);

    try {
      const { timestamp, signature } = await generateSignature("POST", "/api/v1/get-hudmo");

      const response = await fetch(`${API_URL}/api/v1/get-hudmo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Timestamp": timestamp,
          "X-Signature": signature,
        },
        body: JSON.stringify({
          hudmoName: message.hudmo,
          dccid: message.dccid,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch harmonization data: ${response.statusText}`);
      }

      const result = await response.json();
      setHudmoData(result.data);
      console.log("Harmonization data:", result.data);
    } catch (error) {
      console.error("Error fetching harmonization data:", error);
      setHudmoError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoadingHudmo(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 bg-gray-50 min-h-screen">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md text-blue-600 hover:text-blue-800 transition-all border border-gray-200 hover:border-blue-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-semibold">Back to Overview</span>
      </button>

      {/* Message Metadata */}
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
          <div className="bg-linear-to-r from-blue-500 to-purple-600 rounded-lg p-2.5">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Message Details</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Message ID</span>
            <p className="text-gray-900 font-mono text-sm mt-1">{message.id}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Timestamp</span>
            <p className="text-gray-900 text-sm mt-1">{message.timestamp.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Sender</span>
            <p className="text-gray-900 capitalize text-sm mt-1 flex items-center justify-center gap-2">
              {message.sender === "bot" ? (
                <>
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                  Agentforce
                </>
              ) : (
                <>
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                  {message.sender}
                </>
              )}
            </p>
          </div>
          {message.type && (
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</span>
              <p className="text-gray-900 text-sm mt-1">{message.type}</p>
            </div>
          )}
          {message.isContentSafe !== undefined && (
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Content Safe</span>
              <p className="text-sm mt-1">
                {message.isContentSafe ? (
                  <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 px-2 py-1 rounded-md font-semibold">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Safe
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-red-700 bg-red-50 px-2 py-1 rounded-md font-semibold">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Unsafe
                  </span>
                )}
              </p>
            </div>
          )}
          {message.planId && (
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Plan ID</span>
              <p className="text-gray-900 font-mono text-sm mt-1 break-all">{message.planId}</p>
            </div>
          )}
          {message.dccid && (
            <div className="bg-linear-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-3">
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide block mb-1">
                Data Cloud Content ID
              </span>
              <p className="font-mono text-sm text-gray-900 break-all">{message.dccid}</p>
            </div>
          )}
          {message.hudmo && (
            <div className="bg-linear-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-3">
              <span className="text-xs font-semibold text-purple-700 uppercase tracking-wide block mb-1">
                Harmonized UDMO
              </span>
              <p className="font-mono text-sm text-gray-900 break-all">{message.hudmo}</p>
            </div>
          )}
          <div className="col-span-1 sm:col-span-2 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Content</span>
            <p className="text-gray-900 text-sm leading-relaxed">{message.message || message.content}</p>
          </div>
          {message.dccid && message.hudmo && (
            <div className="col-span-1 sm:col-span-2">
              <button
                onClick={fetchHarmonizationData}
                disabled={isLoadingHudmo}
                className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                {isLoadingHudmo ? "Loading..." : "Fetch Harmonization Data"}
              </button>
              {hudmoError && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  <strong>Error:</strong> {hudmoError}
                </div>
              )}
              {hudmoData && (
                <div className="mt-3">
                  {hudmoData.attributes?.content ? (
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                      <div className="flex items-start gap-3 mb-4 pb-3 border-b border-gray-200">
                        <div className="bg-linear-to-r from-teal-500 to-cyan-600 rounded-lg p-2 shrink-0">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-bold text-gray-900 mb-1">
                            {hudmoData.attributes.title || "Harmonized Content"}
                          </h4>
                          {hudmoData.attributes.metadata?.sourceUrl && (
                            <a
                              href={hudmoData.attributes.metadata.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1"
                            >
                              View Source
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                      <div
                        className="prose prose-lg max-w-none text-left prose-headings:font-bold prose-headings:text-gray-900 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6 prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6 prose-li:text-gray-700 prose-li:my-2 prose-li:marker:text-gray-500 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:text-gray-700 [&_li]:my-2 [&_li]:ml-0"
                        dangerouslySetInnerHTML={{ __html: hudmoData.attributes.content }}
                      />
                    </div>
                  ) : (
                    <div className="bg-gray-900 rounded-lg p-4 overflow-auto border border-gray-700">
                      <pre className="text-sm text-green-400 font-mono">{JSON.stringify(hudmoData, null, 2)}</pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Cited References */}
      {message.citedReferences && message.citedReferences.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <div className="bg-linear-to-r from-emerald-500 to-teal-600 rounded-lg p-2.5">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Cited References</h3>
          </div>
          <div className="space-y-3">
            {message.citedReferences.map((ref) => (
              <div
                key={ref.id}
                className="bg-linear-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-lg p-2.5 shrink-0">
                    <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-base mb-1">{ref.name || ref.id}</p>
                    {ref.type && (
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-gray-200">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                          </svg>
                          {ref.type}
                        </span>
                      </p>
                    )}
                    {ref.url && (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1 mt-1"
                      >
                        View Reference
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
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
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <div className="bg-linear-to-r from-orange-500 to-pink-600 rounded-lg p-2.5">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Metrics</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(message.metrics).map(([key, value]) => (
              <div
                key={key}
                className="bg-linear-to-br from-orange-50 to-pink-50 border border-orange-200 rounded-lg p-4"
              >
                <span className="text-xs font-semibold text-orange-700 uppercase tracking-wide block mb-1">{key}</span>
                <span className="text-gray-900 font-semibold text-lg">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Result Data */}
      {message.result && message.result.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <div className="bg-linear-to-r from-indigo-500 to-purple-600 rounded-lg p-2.5">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Result Data</h3>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 overflow-auto border border-gray-700">
            <pre className="text-sm text-green-400 font-mono">{JSON.stringify(message.result, null, 2)}</pre>
          </div>
        </div>
      )}

      {/* Custom Properties */}
      {message.properties && Object.keys(message.properties).length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <div className="bg-linear-to-r from-cyan-500 to-blue-600 rounded-lg p-2.5">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Custom Properties</h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {Object.entries(message.properties).map(([key, value]) => (
              <div key={key} className="bg-linear-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                  <span className="text-xs font-semibold text-cyan-700 uppercase tracking-wide sm:min-w-[200px]">
                    {key}
                  </span>
                  <span className="text-gray-900 text-sm font-mono break-all flex-1">
                    {typeof value === "object" ? JSON.stringify(value, null, 2) : String(value)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HTML Content */}
      {message.htmlContent && (
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <div className="bg-linear-to-r from-rose-500 to-red-600 rounded-lg p-2.5">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">HTML Content</h3>
          </div>
          <div
            className="prose max-w-none bg-linear-to-br from-gray-50 to-rose-50 rounded-lg p-6 border-2 border-rose-200 overflow-auto"
            dangerouslySetInnerHTML={{ __html: message.htmlContent }}
          />
        </div>
      )}
    </div>
  );
};
