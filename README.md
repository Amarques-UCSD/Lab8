# Lab8_Starter

## Partners
   - Alexandre Marques
   - Austin Choy

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)
   - Within a Github action that runs whenever code is pushed.

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.
   - No, this is not on a small scale and would involve many modules.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
   - Yes, this is a simple functionality test that that only involves one feature.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
   - The browser page will not pop up.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?
   - `var set = await page.$$('img');
     await set[0].click();
     page.waitForNavigation();
     await page.waitForTimeout(500);`
