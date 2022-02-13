//@ts-check

/**
 * Add new todo item
 * @param {string} text 
 */
 export const addItem = (newTodo) => {
    cy.get('input.new-todo')
      // .type(text + '{enter}') // concatenating
      .type(`${newTodo}{enter}`) // using template literals
      // .type('{enter}')
  }

  export const addNItems = (N) => {
    for (let k = 0; k < N; k += 1) { // interpretation k=k+1
      // add an item
      // probably want to have a reusable function to add an item!
      // addItem(k+1) // !need to troubleshoot, adds 'todo $k'
      addItem('todo' + (k+1))
      // if using ${k+1} - error 'k is not a modifier'
    }
  }


