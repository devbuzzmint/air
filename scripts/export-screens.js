const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const routes = [
  '/',
  '/business',
  '/business/jobs',
  '/business/guides',
  '/editor',
  '/editor/jobs',
  '/editor/earnings',
  '/editor/guides',
  '/create',
  '/search'
];

async function exportScreens() {
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: {
      width: 1920,
      height: 1080
    }
  });

  const page = await browser.newPage();
  const outputDir = path.join(process.cwd(), 'exports');

  // Create exports directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  for (const route of routes) {
    try {
      // Navigate to the page
      await page.goto(`http://localhost:3000${route}`, {
        waitUntil: 'networkidle0'
      });

      // Wait for any animations to complete
      await page.waitForTimeout(1000);

      // Take screenshot
      const fileName = route === '/' ? 'home' : route.replace(/\//g, '-').slice(1);
      await page.screenshot({
        path: path.join(outputDir, `${fileName}.png`),
        fullPage: true
      });

      console.log(`Exported: ${fileName}.png`);
    } catch (error) {
      console.error(`Failed to export ${route}:`, error);
    }
  }

  await browser.close();
  console.log('\nExport complete! Check the exports directory for the screenshots.');
}

// Start the export process
exportScreens().catch(console.error);