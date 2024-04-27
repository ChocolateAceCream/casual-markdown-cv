const puppeteer = require('puppeteer');

async function generatePDF() {
    // Launch a new browser session.
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
    // Open a new page.
    const page = await browser.newPage();
    // Navigate to the URL.
  await page.goto('http://localhost:5500/resume-web.html', { waitUntil: 'networkidle0' });
    // Generate PDF and save it.
    await page.pdf({
        path: 'resume.pdf', // The file path to save the PDF to.
        format: 'A4',       // Specify the format of the PDF.
        printBackground: true // Ensures that the background styles are also printed.
    });
    // Close the browser session.
    await browser.close();
    console.log('PDF Generated!');
}

generatePDF();