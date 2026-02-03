import { useState } from "react";
import { Search, TrendingUp, DollarSign, LineChart } from "lucide-react";

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <div className="pt-16 pb-8">

      {/* ── Header ── */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          {/* logo pill – solid dark grey with a white icon */}
          <div className="p-3 bg-zinc-800 border border-zinc-700 rounded-2xl shadow-lg shadow-black/60">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          {/* title – white‑to‑grey gradient for subtle depth */}
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
            WealthWise 
          </h1>
        </div>
        <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
          A Semantic Search Agent for Personal Finance Knowledge
        </p>
      </div>

      {/* ── Search form ── */}
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative group">
          {/* border-glow – white at low opacity */}
          <div className="absolute -inset-1 bg-gradient-to-r from-zinc-700 via-white/20 to-zinc-700 rounded-2xl blur opacity-0 group-hover:opacity-50 transition duration-300"></div>

          {/* input container */}
          <div className="relative bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
            <div className="flex items-center">
              <div className="pl-6 pr-4 py-5">
                <Search className="w-6 h-6 text-zinc-500" />
              </div>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about stocks, crypto, market trends, financial analysis..."
                disabled={loading}
                className="flex-1 bg-transparent text-white placeholder-zinc-600 text-lg outline-none py-5 pr-4 disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="mr-3 px-8 py-3 bg-white hover:bg-zinc-100 disabled:bg-zinc-800 disabled:text-zinc-600 text-black font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-white/10 disabled:cursor-not-allowed disabled:shadow-none flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    Searching…
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Search
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Quick-action chips ── */}
        <div className="flex flex-wrap gap-3 mt-6 justify-center">
          {[
            { icon: DollarSign, label: "Stock Analysis",  query: "Analyze tech stock performance"    },
            { icon: LineChart,  label: "Market Trends",   query: "Current market trends"             },
            { icon: TrendingUp, label: "Investment Tips", query: "Investment strategies for 2025"    },
          ].map((chip, idx) => (
            <button
              key={idx}
              onClick={() => { setQuery(chip.query); onSearch(chip.query); }}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-lg text-sm text-zinc-400 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <chip.icon className="w-4 h-4" />
              {chip.label}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}