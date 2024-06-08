const { chromium} = require('@playwright/test');

let page;
let browser;

async function initializeBrowser() {
            browser = await chromium.launch();
            const contextC = await browser.newContext();
            page = await contextC.newPage();
    return page;
}

process.on('SIGINT', async () => {
    await browser.close();
    process.exit();
});

process.on('SIGTERM', async () => {
    await browser.close();
    process.exit();
});

process.on('exit', async () => {
    await browser.close();
});

module.exports = { initializeBrowser };