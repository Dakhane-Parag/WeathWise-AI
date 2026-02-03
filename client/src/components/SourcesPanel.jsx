import { ExternalLink, FileText, Calendar, Globe } from "lucide-react";

export default function SourcesPanel({ sources }) {
  if (!sources || sources.length === 0) {
    return (
      <div className="md:col-span-1">
        <div className="relative">
          <div className="relative bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl shadow-black/50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-zinc-700 rounded-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Sources</h2>
            </div>
            <p className="text-zinc-500 text-sm">No sources available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:col-span-1">
      <div className="relative group">
        <div className="absolute -inset-1 bg-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>

        <div className="relative bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">

          <div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-700 bg-zinc-800/60">
            <div className="p-2 bg-zinc-700 rounded-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Sources</h2>
            <span className="ml-auto px-2.5 py-1 bg-zinc-800 text-zinc-300 text-xs font-semibold rounded-full border border-zinc-700">
              {sources.length}
            </span>
          </div>

          <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
            {sources.map((source, index) => (
              <div
                key={index}
                className="relative bg-zinc-800/60 hover:bg-zinc-800 rounded-xl p-4 border border-zinc-700 hover:border-zinc-600 transition-all duration-200 cursor-pointer"
              >
                <div className="absolute -top-2 -left-2 w-7 h-7 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold shadow-lg shadow-black/40">
                  {index + 1}
                </div>

                <div className="space-y-2">
                  <h3 className="text-white font-semibold text-sm line-clamp-2 pr-6">
                    {source.title || `Source ${index + 1}`}
                  </h3>

                  <div className="flex flex-wrap gap-2 text-xs text-zinc-500">
                    {source.date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {source.date}
                      </div>
                    )}
                    {source.type && (
                      <div className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {source.type}
                      </div>
                    )}
                  </div>

                  {source.url && (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-zinc-400 hover:text-white text-xs transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="truncate">View source</span>
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </a>
                  )}

                  {source.excerpt && (
                    <p className="text-zinc-500 text-xs line-clamp-2 pt-1 border-t border-zinc-700">
                      {source.excerpt}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar            { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track      { background: #18181b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb      { background: #3f3f46; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover{ background: #52525b; }
      `}</style>
    </div>
  );
}