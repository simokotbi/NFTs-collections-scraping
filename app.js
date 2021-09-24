
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
    await  driver.get("https://opensea.io/collections");
    /*await driver.findElement(By.xpath('//*[@id="hz-page"]/div[5]/div/div/div/button')).click();
  
    for(let page=1;page<3;page++){
        await  driver.get("https://www.houzz.co.uk/professionals/query/best-15-interior-designers-near-you?tid=1201&p="+`${page}`);
       
       
    const namestag= await driver.findElements(By.className('mlm'));
   
   const adress= await driver.findElements(By.className('hz-pro-search-result__contact-info'));
  
    const phone =await driver.findElements(By.className('hz-pro-search-result__contact-info'));
    for(let i=0;i<namestag.length;i++){
     adress[i].click();
   
     let phoneNumbers= await phone[i].getText();
     let usersnames=await namestag[i].getText();
  
    data.push({'usersnames':usersnames,'phoneNumbers':phoneNumbers});
     console.log( data);
}
}*/
//savefile(JSON.stringify(data));
  }catch(err){console.log(err)}
}

/*savefile =(data)=>{
  fs.writeFileSync('D:/helloworld.csv', data, function (err) {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
  });
}*/
//savefile();
extractData();
