const {Builder, By} = require('selenium-webdriver');

const FORM_URL = 'https://app.bluealert.pl/ba/form/formularz-testowy';
const personalData = {
    firstName: 'Marzena',
    lastName: 'Kowalska',
    email: 'marzena.kowalska@mktest.pl',
    phone: '123456789',
    pesel: '75070187942',
    idNumber: 'CUM273268',
    dateOfBirth: '1975-07-01',
};

describe('Form test', () => {
    let driver;

    beforeAll(async () => {
        driver = new Builder()
        .forBrowser('chrome')
        .build();

        await driver.get(FORM_URL);
    });

    afterAll(async () => {
        await driver.quit();
    }, 15000);
    
    it('Fill test form', async () => {
        await driver.findElement(By.name('first_name')).sendKeys(personalData.firstName);
        await driver.findElement(By.name('last_name')).sendKeys(personalData.lastName);
        await driver.findElement(By.name('email')).sendKeys(personalData.email);
        await driver.findElement(By.name('phone')).sendKeys(personalData.phone);
        await driver.findElement(By.name('pesel')).sendKeys(personalData.pesel);
        await driver.findElement(By.name('id_numer')).sendKeys(personalData.idNumber);
        await driver.findElement(By.name('date')).sendKeys(personalData.dateOfBirth);
        await driver.findElement(By.css('[name="date"] + .input-group-append')).click();
        await driver.findElement(By.id('form_button_next')).click();

        const activeStep = await driver.findElement(By.css('.step-progress__item.active .step-progress__item-name'));
        const activeStepTitle = await activeStep.getText();

        expect(activeStepTitle).toBe('Zgody użykownika');
    });

});