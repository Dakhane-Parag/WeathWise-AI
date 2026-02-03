import { MessageCircle, Send, Zap } from "lucide-react";
import { useState } from "react";

export default function FollowUpBox({ onSearch }) {
  const [followUpQuery, setFollowUpQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const suggestedQuestions = [
    "Can you explain this in simpler terms?",
    "What are the risks involved?",
    "How does this compare historically?",
    "What are the key takeaways?",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (followUpQuery.trim()) {
      setIsSubmitting(true);
      await onSearch(followUpQuery);
      setFollowUpQuery("");
      setIsSubmitting(false);
    }
  };

  const handleSuggestionClick = async (question) => {
    setIsSubmitting(true);
    await onSearch(question);
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 mb-16">
      <div className="relative group">
        {/* white glow on hover */}
        <div className="absolute -inset-1 bg-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>

        {/* panel shell */}
        <div className="relative bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">

          {/* ── Header ── */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-700 bg-zinc-800/60">
            <div className="p-2 bg-zinc-700 rounded-lg">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-white">Follow-up Questions</h2>
          </div>

          {/* ── Body ── */}
          <div className="p-6 space-y-4">

            {/* quick suggestions */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <Zap className="w-4 h-4" />
                <span>Quick suggestions:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(question)}
                    disabled={isSubmitting}
                    className="flex items-start gap-2 px-4 py-3 bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-lg text-left text-sm text-zinc-400 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                  >
                    {/* numbered circle – white bg, black text */}
                    <div className="w-5 h-5 flex-shrink-0 mt-0.5 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold group-hover/btn:scale-110 transition-transform">
                      {index + 1}
                    </div>
                    <span className="flex-1">{question}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Custom input ── */}
            <div className="pt-4 border-t border-zinc-700">
              <form onSubmit={handleSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    value={followUpQuery}
                    onChange={(e) => setFollowUpQuery(e.target.value)}
                    placeholder="Ask a follow-up question…"
                    disabled={isSubmitting}
                    className="w-full px-5 py-4 pr-14 bg-zinc-800/60 border border-zinc-700 rounded-xl text-white placeholder-zinc-600 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-white/10 transition-all duration-200 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !followUpQuery.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-white hover:bg-zinc-100 disabled:bg-zinc-800 disabled:text-zinc-600 text-black rounded-lg transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-white/10 disabled:shadow-none"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}