
const { Builder, By, Key, util, promise, until } = require("selenium-webdriver");
 const fs = require('fs');
//var assert = require("assert");
//const { ableToSwitchToFrame } = require("selenium-webdriver/lib/until");

const { serialize } = require("v8");
const chrome = require('selenium-webdriver/chrome');
let opts = new chrome.Options();
async function extractData() {
  try{
    let driver = new Builder()
    .forBrowser('chrome')
  // .setChromeOptions(opts.headless())
    .build();
  
  
     const data=[];
    
    //goin to opensea collections:
  
   await  driver.get("https://rarity.tools/rumble-kong-league");
   let cards= await driver.findElements(By.xpath('/html/body/div/div/div/div[2]/div[2]/div[8]/div[1]/div[1]'))
   then(elements => console.log("length is ::::::::::::::::::::::::::::"+elements.length));
   //scrapitem();
  }catch(err){console.log(err)}
}
async function scrapitem(){
  try{

}catch(err){console.log(err)}}

extractData();
