import puppeteer from "puppeteer";

const desktopResolution = {
    width: 1366,
    height: 768
};

const mobileResolution = {
    width: 375,
    height: 812
};

export const BrowserFactory = {
    setupDesktopBrowser: async () => {
        const browser = await puppeteer.launch({
            headless: false,
            //args: [`--start-maximized`, `--window-size=${desktopResolution.width},${desktopResolution.height}`, '--no-sandbox']
            args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox']
        });
        return browser;
    },

    setupMobileBrowser: async () => {
        const browser = await puppeteer.launch({
            headless: false,
            args: [`--window-size=${mobileResolution.width},${mobileResolution.height}`]
        });
        return browser;
    },

    newDesktopPage: async (browser) => {
        const page = await browser.newPage();
        await page.setViewport({
            width: desktopResolution.width,
            height: desktopResolution.height
        });
        return page
    },

    newMobilePage: async (browser) => {
        const page = await browser.newPage();
        await page.setViewport({
            width: mobileResolution.width,
            height: mobileResolution.height,
            isMobile: true,
            hasTouch: true
        });
        return page
    }
};

module.exports = BrowserFactory;
