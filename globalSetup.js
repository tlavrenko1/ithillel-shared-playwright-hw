
export default async config => {
    const { chromium } = require('@playwright/test');
  
    const browser = await chromium.launch();
    const context = await browser.newContext({
      storageState: 'storageState.json',
    });  
    await browser.close();
  };
  