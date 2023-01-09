const webdriver = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const { By } = require('selenium-webdriver');

function wait(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}
const test = async () => {
    const driver = new webdriver.Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(new firefox.Options().headless())
        .build();
    console.log('Loading Webpage');
    await driver.get(`http://localhost:3000`);

    console.log('1) Testing If app loads');
    const title = await driver.getTitle();
    // console.log(title == "Node To Do Application");
    console.log(title == 'Todo');

    console.log('2) Checking no pending task');
    let initial_task = await driver.findElements(By.css('.taskrows'));
    console.log(initial_task.length == 0);

    console.log('3) Add new tasks');
    let added_tasksUpdated1 = await driver.findElements(By.css('.taskrows'));
    await driver.findElement(By.css('#input')).sendKeys('Input added');
    await driver.findElement(By.css('#addbtn')).click();
    await wait(2000);
    let added_tasksUpdated2 = await driver.findElements(By.css('.taskrows'));
    // console.log(added_tasksUpdated1.length);
    // console.log(added_tasksUpdated2.length);
    console.log(added_tasksUpdated2.length == added_tasksUpdated1.length + 1);

    console.log('4) Delete new tasks');
    let deletebuttons = await driver.findElements(By.css('.delete-button'));
    await deletebuttons[deletebuttons.length - 1].click();
    // await driver.findElement(By.css('#input')).sendKeys('Input added');
    // await driver.findElement(By.css()).click();
    await wait(2000);
    let deleted_tasksUpdated3 = await driver.findElements(By.css('.taskrows'));
    // console.log(added_tasksUpdated1.length);
    // console.log(added_tasksUpdated2.length);
    console.log(deleted_tasksUpdated3.length == added_tasksUpdated2.length - 1);

    console.log('5) Checking deleting tasks');
    let final_task_delete = await driver.findElements(By.css('.taskrows'));
    console.log(final_task_delete.length == 0);
};
test();
