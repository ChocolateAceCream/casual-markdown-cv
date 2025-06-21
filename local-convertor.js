const puppeteer = require('puppeteer');

async function generatePDF() {
    // Launch a new browser session.
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
    // Open a new page.
    const page = await browser.newPage();
    // Navigate to the URL.
  await page.goto('http://127.0.0.1:5501/resume-web.html', { waitUntil: 'networkidle0' });
  // Generate PDF and save it.
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
  const day = String(currentDate.getDate()).padStart(2, '0');

  const filename = `resume-${year}-${month}-${day}.pdf`;
  await page.pdf({
    path: filename, // The file path to save the PDF to.
    format: 'A4',       // Specify the format of the PDF.
    printBackground: true, // Ensures that the background styles are also printed.
    margin: {
      top: '40px',    // 为页眉留出空间
      bottom: '40px', // 为页脚留出空间
      left: '40px',
      right: '40px'
    }
  });
  // Close the browser session.
  await browser.close();
  console.log('PDF Generated!');
}

generatePDF();