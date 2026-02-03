import fs from "fs/promises";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export async function loadPDF(pdfPath, pdfName) {
  const data = new Uint8Array(await fs.readFile(pdfPath));

  const pdf = await pdfjsLib.getDocument({ data }).promise;

  const pages = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();

    const text = content.items.map(item => item.str).join(" ").trim();

    if (text.length > 50) {
      pages.push({
        pdf: pdfName,
        page: pageNum,
        text
      });
    }
  }

  return pages;
}
