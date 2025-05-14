import puppeteer from 'puppeteer';
import { uploadToSupabase } from './supabase.js';

export async function generatePDF(htmlContent, outputName) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent);
  const buffer = await page.pdf({ format: 'A4' });
  await browser.close();

  const url = await uploadToSupabase(buffer, `pdfs/${outputName}.pdf`);
  return url;
}
