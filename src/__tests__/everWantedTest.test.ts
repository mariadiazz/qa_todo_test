import { Builder, Capabilities } from "selenium-webdriver"

import {EnterWantedPage} from "../enterWantedPage"

const chromedriver = require('chromedriver')
const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

const myTest = new EnterWantedPage(driver, 'https://devmountain-qa.github.io/enter-wanted/1.4_Assignment/index.html')

test("Testing valid Header Input", async () => {
    await myTest.navigate()
    await myTest.setInput(myTest.hrdInput, "0123456789")
    await myTest.click(myTest.submit)
    let response = await myTest.getText(myTest.results)
    expect(response).not.toContain('The "Header" field should be between 9 and 19 characters long')
})

test("Testing invalid Header Input", async () => {
    await myTest.navigate()
    await myTest.setInput(myTest.hrdInput, "01234")
    await myTest.click(myTest.submit)
    let response = await myTest.getText(myTest.results)
    expect(response).toContain('The "Header" field should be between 9 and 19 characters long')
})