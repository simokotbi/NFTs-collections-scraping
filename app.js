
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
  let button = await driver.findElement(By.xpath('//*[@id="__layout"]/div/div[2]/div[2]/div[9]/div[3]/div[2]'));
for(let pages=0;pages<209;pages++){
  for(let i=0;i<48;i++){ 
    cards=await driver.wait(until.elementLocated(By.xpath('//*[@id="__layout"]/div/div[2]/div[2]/div[8]/div[1]/div/div/div[2]/a')), 10000);
    cards= await card[i].click();   
  let sc= await driver.wait(until.elementLocated(By.xpath('//*[@id="__layout"]/div/div[3]/div[2]/div/div[2]/div/div[1]/div[2]')));
  let raink=await driver.findElement(By.xpath('//*[@id="__layout"]/div/div[3]/div[2]/div/div[1]/div/div[1]/div[1]/span'));
  let Id=await driver.findElement(By.xpath('//*[@id="__layout"]/div/div[3]/div[2]/div/div[1]/div/div[3]/div[2]'));
 
 await scrap(sc,raink,Id);

  } 
  //await driver.wait(until.elementLocated(By.xpath('/html/body/div/div/div/div[2]/div[2]/div[7]/div[2]/div[6]/div/div[2]')),10000);
 await button.click();
 cards=await driver.wait(until.elementLocated(By.xpath('//*[@id="__layout"]/div/div[2]/div[2]/div[8]/div[1]/div/div/div[2]/a')), 10000);
 card=await driver.findElements(By.xpath('//*[@id="__layout"]/div/div[2]/div[2]/div[8]/div[1]/div/div/div[2]/a'));
 button = await driver.findElement(By.xpath('//*[@id="__layout"]/div/div[2]/div[2]/div[9]/div[3]/div[2]'));

}
savefile(JSON.stringify(data));
  }catch(err){console.log(err)}
}
async function scrap(sc,raink,Id){
  try{
   
      let score = await sc.getText();
      let rainking = await raink.getText();
      let id = await Id.getText();
      await console.log(score + "," + rainking + "," + id);
      await  data.push({ "Id": id, "Score": score, "Rainking": rainking });
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

savefile = (data) => {
  fs.writeFileSync('D:/data1.csv', data, function (err) {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
  });
}

extractData();
