/// <reference types="cypress" />
// @ts-check

beforeEach( () => {
  cy.visit('/')
})

import {addItem} from "./utils"
import {addNItems} from "./utils"


it('loads', () => {
  // application should be running at port 3000
  cy.contains('h1', 'todos')
})

// IMPORTANT ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
// remember to manually delete all items before running the test
// IMPORTANT ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️

it('adds two items', () => {
  // repeat twice
    addItem('First todo')
    addItem('Second todo')
  //    assert that the new Todo item
  //    has been added added to the list
        cy.get('li.todo').should('have.length', 2)
  // cy.get(...).should('have.length', 2)
})

it('can mark an item as completed', () => {
  // adds a few items
  addItem('First todo')
  addItem('Second todo')
  // marks first todo completed
  cy.get('li.todo')
    .first().find('.toggle').click()
  // confirms the first item has the expected completed class
  cy.get('li.todo')
    .first().should('have.class', 'todo completed')
  // confirms the other items are still incomplete
  cy.get('li.todo')
  .eq(1).should('not.have.class', 'todo completed')
})

it('can delete an item', () => {
  addItem('First todo')
  addItem('Second todo')
  cy.get('li.todo').should('have.length', 2)
  // use force: true because we don't want to hover
  cy.get('li.todo').first().find('button.destroy').click({force: true})
  // confirm the deleted item is gone from the dom
  cy.contains('li.todo', 'first todo').should('not.exist')
  // confirm the other item still exists
  cy.contains('li.todo', 'Second todo')
  cy.get('li.todo').should('have.length', 1)
  // single todo persists on page reload
  cy.reload()
  cy.get('li.todo').should('have.length', 1)
})

it('can add many items', () => {
  const N = 5
  for (let k = 0; k < N; k += 1) {
    // add an item
    // probably want to have a reusable function to add an item!
    addItem((k+1)) // !need to troubleshoot, adds 'todo $k'
    // if using ${k+1} - error 'k is not a modifier'

  }
  // check number of items
  cy.get('li.todo').should('have.length', N)
})

it.only('uses util.js file to add N items', () => {
  cy.pause()
  addNItems(3)
  cy.viewport('samsung-note9')
})

it('uses experimentalStudio to record and playback', () => {
/* ==== Generated with Cypress Studio ==== */
cy.get('.new-todo').clear();
cy.get('.new-todo').type('1{enter}2{enter}3{enter}');
/* ==== End Cypress Studio ==== */
cy.get('li.todo').should('have.length', 3)

})

it('adds item with random text', () => {
  // use a helper function with Math.random()
  // or Cypress._.random() to generate unique text label
  // add such item
  // and make sure it is visible and does not have class "completed"
})

it('starts with zero items', () => {
  // check if the list is empty initially
  //   find the selector for the individual TODO items
  //   in the list
  //   use cy.get(...) and it should have length of 0
  //   https://on.cypress.io/get
})

it('does not allow adding blank todos', () => {
  // https://on.cypress.io/catalog-of-events#App-Events
  cy.on('uncaught:exception', () => {
    // check e.message to match expected error text
    // return false if you want to ignore the error
  })

  // try adding an item with just spaces
})

// what a challenge?
// test more UI at http://todomvc.com/examples/vue/
