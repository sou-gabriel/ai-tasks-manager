describe('tasks actions', () => {
  it('should be able to create a new task', () => {
    cy.visit('http://localhost:3000')

    cy.contains('button', /add task/i).click()

    cy.get('input[name="name"]').type('Task name')
    cy.get('textarea[name="description"]').type('Task description')
    cy.get('button[role="combobox"]').click()
    cy.get('div[role="option"]').first().click()

    cy.contains('button', /save task/i).click()

    cy.contains('p', 'Task name').should('exist')
  })

  it('should be able to edit a task', () => {
    cy.visit('http://localhost:3000')

    cy.contains('p', 'Task name').parent().find('button').click()
    cy.contains('div', /edit/i).click()

    cy.get('input[name="name"]').clear().type('Updated task name')
    cy.get('textarea[name="description"]')
      .clear()
      .type('Updated task description')
    cy.get('button[role="combobox"]').click()
    cy.get('div[role="option"]').last().click()

    cy.contains('button', /save task/i).click()

    cy.contains('p', 'Updated task name').should('exist')
  })

  it('should be able to delete a task', () => {
    cy.visit('http://localhost:3000')

    cy.contains('button', /add task/i).click()

    cy.get('input[name="name"]').type('Task to delete')
    cy.get('textarea[name="description"]').type('Task to delete')
    cy.get('button[role="combobox"]').click()
    cy.get('div[role="option"]').first().click()

    cy.contains('button', /save task/i).click()

    cy.contains('p', 'Task to delete').parent().find('button').click()
    cy.get('div[role="menuitem"]')
      .contains('div', /delete/i)
      .click()

    cy.contains('p', 'Task to delete').should('not.exist')
  })
})
