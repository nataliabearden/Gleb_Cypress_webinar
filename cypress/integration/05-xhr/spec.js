/// <reference types="cypress" />
//
// note, we are not resetting the server before each test
// and we want to confirm that IF the application has items already
// (for example add them manually using the browser localhost:3000)
// then these tests fail!
//
// see https://on.cypress.io/intercept

/* eslint-disable no-unused-vars */

it('starts with zero items (waits)', () => { // expected to fail if todo's present
  cy.request('POST', './reset', {todos: []})
  cy.intercept('GET', '/todos') // intercept the network call that GETs todo's
    .as('loading') // use alias (~variable) to reference later
  
  // .visit only AFTER .intercept is set up to avoid a race condition
  cy.visit('/')
  // wait 1 second
  // cy.wait(1000)
  cy.wait('@loading') // wait ONLY until the GET is completed
    .its('response.body').should('deep.equal', '') // asserting on the Response body
  // then check the number of items
  cy.get('li.todo').should('have.length', 0)
})

it('starts with zero items', () => {
  // start Cypress network proxy with cy.server()
  // spy on route `GET /todos`
  //  with cy.intercept(...).as(<alias name>)
  // THEN visit the page
  cy.visit('/')
  // wait for `GET /todos` route
  //  using "@<alias name>" string
  // then check the DOM
  cy.get('li.todo').should('have.length', 0)
})

it.only('starts with zero items (stubbed response)', () => {
  cy.request('POST', './reset', {todos: []}) // clean up
  
  // cy.intercept('GET', '/todos', []) // intercept GET /todos and stub with empty todo's
  cy.intercept('GET', '/todos', {// intercept GET /todos
      fixture: 'two-items.json' // and stub with fixture file
    }).as('loading') // save the stub as an alias

  cy.visit('/') // THEN visit the page
  cy.wait('@loading') // wait for the route alias
  .its('response.body') // grab its response body
  // .should('deep.equal', '') // and make sure the body is an empty list
  cy.get('li.todo').should('have.length', 2)

  cy.intercept('POST', '/todos').as('newTodo')
  cy.get('.new-todo').type('one more{enter}')
  cy.wait('@newTodo')
    .its('request.body')
    .should( $body => {
      expect($body).to.deep.include({
        title: 'one more',
        completed: false,
      })
      expect($body).to.have.property('id')
    })
  // cy.get('li.todo').should('have.length', 2)
})

it('starts with zero items (fixture)', () => {
  // start Cypress network server
  // stub `GET /todos` with fixture "empty-list"

  // visit the page
  cy.visit('/')

  // then check the DOM
  cy.get('li.todo').should('have.length', 0)
})

it('loads several items from a fixture', () => {
  // stub route `GET /todos` with data from a fixture file "two-items.json"
  // THEN visit the page
  cy.visit('/')
  // then check the DOM: some items should be marked completed
  // we can do this in a variety of ways
})

it('posts new item to the server', () => {
  // spy on "POST /todos", save as alias
  cy.visit('/')
  cy.get('.new-todo').type('test api{enter}')

  // wait on XHR call using the alias, grab its request or response body
  // and make sure it contains
  // {title: 'test api', completed: false}
  // hint: use cy.wait(...).its(...).should('have.contain', ...)
})

it('handles 404 when loading todos', () => {
  // when the app tries to load items
  // set it up to fail with 404 to GET /todos
  // after delay of 2 seconds
  cy.visit('/', {
    // spy on console.error because we expect app would
    // print the error message there
    onBeforeLoad: (win) => {
      // spy
    }
  })
  // observe external effect from the app - console.error(...)
  // cy.get('@console-error')
  //   .should(...)
})

it('shows loading element', () => {
  // delay XHR to "/todos" by a few seconds
  // and respond with an empty list
  // shows Loading element
  // wait for the network call to complete
  // now the Loading element should go away
})

it('handles todos with blank title', () => {
  // return a list of todos with one todo object
  // having blank spaces or null
  // confirm the todo item is shown correctly
})

it('waits for network to be idle for 1 second', () => {
  // intercept all requests
  // on every intercept set the timestamp
  // retry using should(cb) checking the time
  // that has passed since the network timestamp
})
