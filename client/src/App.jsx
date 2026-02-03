import { useState } from "react";
import { queryRagBackend } from "./api/queryApi";
import SearchBar from "./components/SearchBar";
import AnswerPanel from "./components/AnswerPanel";
import SourcesPanel from "./components/SourcesPanel";
import FollowUpBox from "./components/FollowUpBox";

export default function App() {
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    const data = await queryRagBackend(query);
    setAnswer(data.answer);
    setSources(data.sources || []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 relative overflow-hidden">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-neutral-950"></div>

        <div className="absolute top-20 left-10 w-72 h-72 bg-white/[.04] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/[.03] rounded-full blur-3xl animate-pulse" style={{ animationDelay: "700ms" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[.02] rounded-full blur-3xl"></div>

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)]"></div>

        <div className="absolute top-32   right-1/4 text-white/[.06] text-6xl font-bold select-none">$</div>
        <div className="absolute bottom-40 left-1/4  text-white/[.05] text-6xl font-bold select-none">₿</div>
        <div className="absolute top-1/3  right-1/3 text-white/[.04] text-5xl font-bold select-none">€</div>
      </div>

      <div className="relative z-10">
        <SearchBar onSearch={handleSearch} loading={loading} />

        {answer && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            <AnswerPanel  answer={answer} />
            <SourcesPanel sources={sources} />
          </div>
        )}

        {answer && <FollowUpBox onSearch={handleSearch} />}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        .animate-fadeIn { animation: fadeIn .6s ease-out; }
      `}</style>
    </div>
  );
}