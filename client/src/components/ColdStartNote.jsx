export default function ColdStartNote() {
  return (
    <div className="mt-4 flex justify-center">
      <div
        className="max-w-2xl text-sm text-zinc-400 bg-zinc-900/60
                   border border-zinc-700 rounded-lg px-4 py-3 text-center"
      >
        <span className="font-medium text-red-500">Note:</span>{" "}
        The first query may take a few seconds due to backend cold start on
        Hugging Face Spaces. Subsequent queries are faster.
        This demo also operates under limited free-tier API quotas.
      </div>
    </div>
  );
}
