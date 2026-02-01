export function chunkText(text, chunkSize = 400, overlap = 80) {
  const words = text.split(/\s+/);
  const chunks = [];

  let start = 0;

  while (start < words.length) {
    const end = start + chunkSize;

    const chunkWords = words.slice(start, end);
    chunks.push(chunkWords.join(" "));

    start = end - overlap;
  }

  return chunks;
}
