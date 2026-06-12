class LoginPage {

    usernameField = 'input[name="username"]'
    passwordField = 'input[name="password"]'
    loginButton = 'button[type="submit"]'

    visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }

    enterUsername(username) {
        cy.get(this.usernameField).type(username)
    }

    enterPassword(password) {
        cy.get(this.passwordField).type(password)
    }

    clickLogin() {
        cy.get(this.loginButton).click()
    }

}

export default new LoginPage()