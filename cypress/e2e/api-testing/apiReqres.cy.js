describe('Reqres API Automation', () => {

```
it('TC01 - GET List Users', () => {
    cy.request('GET', 'https://reqres.in/api/users?page=2')
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.page).to.eq(2)
        })
})

it('TC02 - GET Single User', () => {
    cy.request('GET', 'https://reqres.in/api/users/2')
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data.id).to.eq(2)
        })
})

it('TC03 - GET User Not Found', () => {
    cy.request({
        method: 'GET',
        url: 'https://reqres.in/api/users/23',
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(404)
    })
})

it('TC04 - GET List Resource', () => {
    cy.request('GET', 'https://reqres.in/api/unknown')
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data.length).to.be.greaterThan(0)
        })
})

it('TC05 - GET Single Resource', () => {
    cy.request('GET', 'https://reqres.in/api/unknown/2')
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data.id).to.eq(2)
        })
})

it('TC06 - POST Create User', () => {
    cy.request('POST', 'https://reqres.in/api/users', {
        name: 'Zhein',
        job: 'QA Engineer'
    }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body.name).to.eq('Zhein')
    })
})

it('TC07 - PUT Update User', () => {
    cy.request('PUT', 'https://reqres.in/api/users/2', {
        name: 'Zhein Updated',
        job: 'Senior QA'
    }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.name).to.eq('Zhein Updated')
    })
})

it('TC08 - PATCH Update User', () => {
    cy.request('PATCH', 'https://reqres.in/api/users/2', {
        job: 'Automation QA'
    }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.job).to.eq('Automation QA')
    })
})

it('TC09 - DELETE User', () => {
    cy.request('DELETE', 'https://reqres.in/api/users/2')
        .then((response) => {
            expect(response.status).to.eq(204)
        })
})

it('TC10 - Successful Login', () => {
    cy.request('POST', 'https://reqres.in/api/login', {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
    }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('token')
    })
})

it('TC11 - Unsuccessful Login', () => {
    cy.request({
        method: 'POST',
        url: 'https://reqres.in/api/login',
        failOnStatusCode: false,
        body: {
            email: 'peter@klaven'
        }
    }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body.error).to.eq('Missing password')
    })
})

it('TC12 - Delayed Response', () => {
    cy.request('GET', 'https://reqres.in/api/users?delay=3')
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data.length).to.be.greaterThan(0)
        })
})
```

})
