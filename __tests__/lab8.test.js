import { TimeoutSettings } from "puppeteer";

describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
    //const rect = getBoundingClientRect();
    //await page.mouse.click(rect.x - 20, rect.y - 25);
    //await page.waitForTimeout(500);
    //await settings.click();
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    let entries = await page.$$('journal-entry');
    //page.click('entry');
    await entries[0].click();
    page.waitForNavigation()
    await page.waitForTimeout(500);
    await expect(page.url()).toBe("http://127.0.0.1:5500/#entry1");
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    let textContent = await page.evaluate(() => document.querySelector('h1').textContent);
    await expect(textContent).toBe("Entry 1");

  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
    const entry = await page.$$('entry-page');
    let data = await entry[0].getProperty('entry');
    let plainData = await data.jsonValue();
    await expect(plainData.title).toBe('You like jazz?');
    await expect(plainData.date).toBe('4/25/2021');
    await expect(plainData.content).toBe("According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.");
    await expect(plainData.image.src).toBe('https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455');
    await expect(plainData.image.alt).toBe('bee with sunglasses');
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    var body = await page.$('body');
    await expect(body._remoteObject.description).toBe('body.single-entry');
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    var set = await page.$$('img');
    await set[0].click();
    page.waitForNavigation();
    await page.waitForTimeout(500);
    await expect(page.url()).toBe("http://127.0.0.1:5500/#settings");
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    await page.waitForTimeout(500);
    var textContent = await page.evaluate(() => document.querySelector('h1').textContent);
    await expect(textContent).toBe("Settings");
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    var body = await page.$('body');
    await expect(body._remoteObject.description).toBe('body.settings');
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    page.waitForNavigation();
    await page.waitForTimeout(500);
    await expect(page.url()).toBe("http://127.0.0.1:5500/#entry1");
  });

  it('Test11: Clicking the back button once should bring the user back to the home page', async() => {
    // define and implement test11: Clicking the back button once should bring the user back to the home page
    await page.goBack();
    page.waitForNavigation();
    await page.waitForTimeout(500);
    await expect(page.url()).toBe("http://127.0.0.1:5500/");
  });


  it('Test12: When the user if on the homepage, the header title should be “Journal Entries”', async () => {
    // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
    let textContent = await page.evaluate(() => document.querySelector('h1').textContent);
    await expect(textContent).toBe("Journal Entries");
  });

  it('Test13: On the home page the <body> element should not have any class attribute', async () => {
    // define and implement test13: On the home page the <body> element should not have any class attribute 
    var body = await page.$('body');
    await expect(body._remoteObject.description).toBe('body');
  });
  
  it('Test14: Verify the url is correct when clicking on the second entry', async() => {
    // define and implement test14: Verify the url is correct when clicking on the second entry
    var entries = await page.$$('journal-entry');
    await entries[1].click();
    page.waitForNavigation()
    await page.waitForTimeout(500);
    await expect(page.url()).toBe("http://127.0.0.1:5500/#entry2");
  });

  it('Test15: Verify the title is current when clicking on the second entry', async() => {
    // define and implement test15: Verify the title is current when clicking on the second entry
    await page.waitForTimeout(500);
    var textContent = await page.evaluate(() => document.querySelector('h1').textContent);
    await expect(textContent).toBe("Entry 2");
  });

  it('Test16: Verify the entry page contents is correct when clicking on the second entry', async () => {
    // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
    const entry = await page.$$('entry-page');
    let data = await entry[0].getProperty('entry');
    let plainData = await data.jsonValue();
    await expect(plainData.title).toBe('Run, Forrest! Run!');
    await expect(plainData.date).toBe('4/26/2021');
    await expect(plainData.content).toBe("Mama always said life was like a box of chocolates. You never know what you're gonna get.");
    await expect(plainData.image.src).toBe('https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg');
    await expect(plainData.image.alt).toBe('forrest running');
  }, 10000);

  it('Test17: Move back to main page again', async() => {
    // create your own test 17
    await page.goBack();
    page.waitForNavigation();
    await page.waitForTimeout(500);
    await expect(page.url()).toBe("http://127.0.0.1:5500/");
  });

  it('Test18: Click on entry 10 and confirm url', async() => {
    // create your own test 18
    var entries = await page.$$('journal-entry');
    await entries[9].click();
    page.waitForNavigation()
    await page.waitForTimeout(500);
    await expect(page.url()).toBe("http://127.0.0.1:5500/#entry10");
  });

  it('Test19: Verify audio is correct', async() => {
    // create your own test 18
    const entry = await page.$$('entry-page');
    let data = await entry[0].getProperty('entry');
    let plainData = await data.jsonValue();
    await expect(plainData.audio).toBe('https://drive.google.com/uc?export=download&id=1luYh909US7ZBFe6uo440Vv_LNnRdnErT');
  }, 10000);

  it('Test20: Return to main', async() => {
    // create your own test 20
    await page.goBack();
    page.waitForNavigation();
    await page.waitForTimeout(500);
    await expect(page.url()).toBe("http://127.0.0.1:5500/");
  });
  
});
