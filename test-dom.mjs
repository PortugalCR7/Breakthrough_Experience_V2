import puppeteer from 'puppeteer';
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('http://localhost:3000/');
const html = await page.$eval('#vision', el => el.outerHTML);
console.log(html);
await browser.close();
