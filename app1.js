
const { Builder, By, Key, util, promise, until } = require("selenium-webdriver");
const fs = require('fs');
//var assert = require("assert");
//const { ableToSwitchToFrame } = require("selenium-webdriver/lib/until");

const { serialize } = require("v8");
const chrome = require('selenium-webdriver/chrome');
const { threadId } = require("worker_threads");
let opts = new chrome.Options();

const data=[];
 let driver = new Builder()
   .forBrowser('chrome')
 // .setChromeOptions(opts.headless())
   .build();
async function extractData() {
 try{
   //goin to opensea collections:
   await  driver.get("https://rarity.tools/rumble-kong-league");
//let input =await driver.wait(until.elementLocated(By.xpath('//*[@id="__layout"]/div/div[2]/div[2]/div[7]/div[2]/div[6]/div/div[1]/input')),10000);
let name=await driver.wait(until.elementLocated(By.xpath('//*[@id="__layout"]/div/div[2]/div[2]/div[8]/div[1]/div/div/div[3]/a')),20000);
  name= await driver.findElements(By.xpath('//*[@id="__layout"]/div/div[2]/div[2]/div[8]/div[1]/div/div/div[3]/a'));
  
  
  //await driver.executeScript("for(let i=0;i<=48;i++){console.log(document.getElementsByClassName('block w-full px-1 overflow-hidden text-sm dark:text-gray-300 link whitespace-nowrap overflow-ellipsis')[i].innerText);}");
  await driver.executeScript(" for(let i=0;i<=48;i++){return Array.from(document.getElementsByClassName('block w-full px-1 overflow-hidden text-sm dark:text-gray-300 link whitespace-nowrap overflow-ellipsis')[i].innerText) ;}").then((returnded)=>{
    returnded.map((el)=>{
        console.log(el);
    })
 });
   
         
       

   
 }catch(err){console.log(err)}
}

extractData();
