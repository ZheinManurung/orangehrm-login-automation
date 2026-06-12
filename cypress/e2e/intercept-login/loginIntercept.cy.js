describe('OrangeHRM Login Intercept Testing', () => {

    beforeEach(() => {

        cy.intercept('GET', '**/auth/login').as('loginPage')

        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

        cy.wait('@loginPage')

    })

    it('TC001 - Successful Login', () => {

        cy.intercept('POST', '**/auth/validate').as('validLogin')

        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.wait('@validLogin')
            .its('response.statusCode')
            .should('eq', 302)

        cy.url().should('include', '/dashboard')

    })

    it('TC002 - Invalid Password', () => {

        cy.intercept('POST', '**/auth/validate').as('invalidPassword')

        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('wrong123')
        cy.get('button[type="submit"]').click()

        cy.wait('@invalidPassword')

        cy.contains('Invalid credentials').should('be.visible')

    })

    it('TC003 - Invalid Username', () => {

        cy.intercept('GET', '**/core/i18n/messages').as('messages')

        cy.get('input[name="username"]').type('WrongUser')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.wait('@messages')

        cy.contains('Invalid credentials').should('be.visible')

    })

    it('TC004 - Empty Username', () => {

        cy.intercept('GET', '**/pim/viewEmployeeList').as('employeePage')

        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.contains('Required').should('be.visible')

    })

    it('TC005 - Empty Password', () => {

        cy.intercept('GET', '**/*.svg').as('logo')

        cy.wait('@logo')

        cy.get('input[name="username"]').type('Admin')
        cy.get('button[type="submit"]').click()

        cy.contains('Required').should('be.visible')

    })

})