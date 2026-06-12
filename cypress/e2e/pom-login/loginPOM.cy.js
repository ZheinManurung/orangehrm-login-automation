import LoginPage from '../../pages/LoginPage'
import loginData from '../../fixtures/loginData.json'

describe('OrangeHRM Login POM', () => {

    beforeEach(() => {
        LoginPage.visit()
    })

    it('TC001 Login Success', () => {

        LoginPage.enterUsername(loginData.validUser.username)
        LoginPage.enterPassword(loginData.validUser.password)
        LoginPage.clickLogin()

        cy.url().should('include', '/dashboard')
    })

    it('TC002 Invalid Password', () => {

        LoginPage.enterUsername(loginData.invalidPassword.username)
        LoginPage.enterPassword(loginData.invalidPassword.password)
        LoginPage.clickLogin()

        cy.contains('Invalid credentials').should('be.visible')
    })

    it('TC003 Invalid Username', () => {

        LoginPage.enterUsername(loginData.invalidUsername.username)
        LoginPage.enterPassword(loginData.invalidUsername.password)
        LoginPage.clickLogin()

        cy.contains('Invalid credentials').should('be.visible')
    })

    it('TC004 Empty Username', () => {

        LoginPage.enterPassword('admin123')
        LoginPage.clickLogin()

        cy.contains('Required').should('be.visible')
    })

    it('TC005 Empty Password', () => {

        LoginPage.enterUsername('Admin')
        LoginPage.clickLogin()

        cy.contains('Required').should('be.visible')
    })

})