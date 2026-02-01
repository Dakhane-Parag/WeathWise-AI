import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

import { loadPDF } from "./pdfLoader.js";
import { chunkText } from "./textChunker.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_DIR = path.join(__dirname, "../data/pdfs");
const OUTPUT_DIR = path.join(__dirname, "../data/processed");

async function processAllPDFs() {
  await fs.ensureDir(OUTPUT_DIR);

  const files = await fs.readdir(PDF_DIR);
  const allChunks = [];

  for (const file of files) {
    if (!file.endsWith(".pdf")) continue;

    console.log(`📄 Processing ${file}`);
    const pdfPath = path.join(PDF_DIR, file);

    const pages = await loadPDF(pdfPath, file);

    pages.forEach(page => {
      const chunks = chunkText(page.text);

      chunks.forEach((chunk, index) => {
        allChunks.push({
          id: `${file}_p${page.page}_c${index}`,
          text: chunk,
          metadata: {
            pdf: file,
            page: page.page
          }
        });
      });
    });
  }

  await fs.writeJson(
    path.join(OUTPUT_DIR, "chunks.json"),
    allChunks,
    { spaces: 2 }
  );

  console.log(`✅ Generated ${allChunks.length} chunks`);
}

processAllPDFs().catch(console.error);
