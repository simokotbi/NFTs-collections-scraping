const puppeteer = require('puppeteer');
const fs = require("fs");
const domains_in_blacklist = [
    "api.opensea.io" //Block google.com, www.google.com is allowed
];
const connections = 4;

const requests_blocked = [];
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
const collections = JSON.parse(fs.readFileSync("./collections.json")).slice(20,80);

//const aSelector = "div.flex.flex-row.items-start.justify-between > div.flex > div > div > div.overflow-hidden.rounded-md > a";
//const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
(async function () {
    var final_result = [];
    const browser = await puppeteer.launch({ headless: false,executablePath:"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" });

    for (let i = 0; i < collections.length; i += connections) {
        let res = await Promise.all(Array(Math.min(connections, collections.length - i)).fill(0).map(async (e, index) => {
            let element = collections[index + i];
            await sleep(50 * index);
            const page = await browser.newPage();
            page.setDefaultNavigationTimeout(0);
            await page.setRequestInterception(true)
            page.on('request', interceptedRequest => {
                if (domains_in_blacklist.includes(new URL(interceptedRequest.url()).host) || interceptedRequest.url().includes(".png") || interceptedRequest.url().includes("larvalabs") && !interceptedRequest.url().includes("rarity.tools")) {
                    //requests_blocked.push(interceptedRequest.url())
                    interceptedRequest.abort()
                } else {
                    interceptedRequest.continue()
                }
            })
            await page.goto('https://rarity.tools/' + element.id, { waitUntil: 'domcontentloaded' });
            await page.waitForSelector('div.flex.flex-row.items-start.justify-between > div.flex > div:nth-child(47) > div > div.overflow-hidden.rounded-md > a', { timeout: 0 });
            await page.$('div.flex.flex-row.items-start.justify-between > div.flex > div:nth-child(47) > div > div.overflow-hidden.rounded-md > a');
            await page.click("div.flex.flex-row.items-start.justify-between > div.flex > div:nth-child(1) > div > div.overflow-hidden.rounded-md > a")
            await page.waitForSelector("div.absolute.top-0.z-10.w-screen.h-full", { timeout: 0 });
            Array.from(await browser.pages())[index].bringToFront();

            let collection = await page.evaluate(async () => {

                const aSelector = "div.flex.flex-row.items-start.justify-between > div.flex > div > div > div.overflow-hidden.rounded-md > a";
                const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
                async function scrapPage() {
                    let result = [];
                    let list = Array.from(document.querySelectorAll(aSelector));
                    //await sleep(5000);
                    for (let i in list) {
                        let ele = list[i];
                        ele.click();
                        await sleep(1);
                        let id = ele.getAttribute("href").split("/").slice(-1)[0];
                        let score = document.querySelector("div.absolute.top-0.z-10.w-screen.h-full > div > div > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(2)") ? document.querySelector("div.absolute.top-0.z-10.w-screen.h-full > div > div > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(2)").textContent.trim() : null;
                        let rank = document.querySelector("div.absolute.top-0.z-10.w-screen.h-full > div > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(1)") ? document.querySelector("div.absolute.top-0.z-10.w-screen.h-full > div > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(1)").textContent.trim() : null;
                        result.push({ id, score, rank })
                    }
                    return result
                }
                //await sleep(2000);
                // return await scrapPage();
                let next = "";
                result = await scrapPage();
                while (next != null && result.length<5000) {
                    console.log("next")
                    next = Array.from(document.querySelectorAll("div.select-none.smallBtn")).find(ele => ele.textContent.includes("Next"));
                    if (next != null) {
                        next.click();
                        await sleep(5);
                    }

                    result.push.apply(result,await scrapPage())
                    //result = result.concat(await scrapPage());
                }
                //element.result = result;
                return result;

                //console.log(document.querySelectorAll('div.flex.flex-row.items-start.justify-between > div.flex > div'));
            });
            console.log(`finished the the collection number ${index + i} named ${element.name}`)
            page.close();
            element.nfts = collection
            return element;

        }))
        final_result = res.concat(final_result);
        console.log("actuel final result length is " + final_result.length);
        fs.writeFileSync("final_result.json", JSON.stringify(final_result));

    }

    console.log(final_result.length);
    fs.writeFileSync("final_result.json", JSON.stringify(final_result));

    await browser.close();

})();
