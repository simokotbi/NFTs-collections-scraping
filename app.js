
const { Builder, By, Key, util, promise, until } = require("selenium-webdriver");
 const fs = require('fs');
//var assert = require("assert");
//const { ableToSwitchToFrame } = require("selenium-webdriver/lib/until");

const { serialize } = require("v8");
const chrome = require('selenium-webdriver/chrome');
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

  // let button= await driver.findElement(By.xpath(''))
  let cards=await driver.wait(until.elementLocated(By.xpath('//*[@id="__layout"]/div/div[2]/div[2]/div[8]/div[1]/div/div/div[2]/a')), 10000);
 //let cards= await driver.wait(until.elementLocated(By.className('overflow-hidden rounded-md m-0.5')));
  let card=await driver.findElements(By.xpath('//*[@id="__layout"]/div/div[2]/div[2]/div[8]/div[1]/div/div/div[2]/a'));


  for(let i=0;i<=48;i++){ 
    cards=await driver.wait(until.elementLocated(By.xpath('//*[@id="__layout"]/div/div[2]/div[2]/div[8]/div[1]/div/div/div[2]/a')), 10000);
    cards= await card[i].click();   
  let sc= await driver.wait(until.elementLocated(By.xpath('//*[@id="__layout"]/div/div[3]/div[2]/div/div[2]/div/div[1]/div[2]')));
  let raink=await driver.findElement(By.xpath('//*[@id="__layout"]/div/div[3]/div[2]/div/div[1]/div/div[1]/div[1]/span'));
  let Id=await driver.findElement(By.xpath('//*[@id="__layout"]/div/div[3]/div[2]/div/div[1]/div/div[3]/div[2]'));
 
 await scrap(sc,raink,Id);
 
  }


  }catch(err){console.log(err)}
}
async function scrap(sc,raink,Id){
  try{
   
      let score = await sc.getText();
      let rainking = await raink.getText();
      let id = await Id.getText();
      await console.log(score + "," + rainking + "," + id);
      await  data.push({ "id": id, "score": score, "rainking": rainking });
       await clickoutofpopup();
  }catch(err){console.log(err)}
}
async function clickoutofpopup(){
  try{
    let actions = driver.actions();
await  actions.
    // mouseMove({x: 50, y: 0}).
    move({x: 150, y: 60}).
    doubleClick().
    perform();
  }catch(err){console.log(err)}
}
extractData();
