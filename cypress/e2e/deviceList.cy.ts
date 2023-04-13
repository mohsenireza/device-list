describe('device list', () => {
  it('add 1 button should work', () => {
    cy.visit('/');
    cy.findByTestId('tableRow').should('not.exist');
    cy.contains(/add 1/i).click();
    cy.findByTestId('tableRow');
  })

  it('add 10 button should work', () => {
    cy.visit('/');
    cy.findByTestId('tableRow').should('not.exist');
    cy.contains(/add 10/i).click();
    cy.findByTestId('tableRow');
  })

  it('add 100 button should work', () => {
    cy.visit('/');
    cy.findByTestId('tableRow').should('not.exist');
    cy.contains(/add 100/i).click();
    cy.findByTestId('tableRow');
  })

  it('add 1000 button should work', () => {
    cy.visit('/');
    cy.findByTestId('tableRow').should('not.exist');
    cy.contains(/add 1000/i).click();
    cy.findByTestId('tableRow');
  })

  it('should update label', () => {
    cy.visit('/');
    cy.contains(/add 1/i).click();
    cy.get('input[value="Device 1"]').clear().type('new value').blur();
    cy.contains('label has been updated to new value');
  })

  it('should update mode', () => {
    cy.visit('/');
    cy.contains(/add 1/i).click();
    cy.contains('Mode #1').click();
    cy.contains('Mode #2').click();
    cy.contains('mode_index has been updated to 2');
  })

  it('should update address', () => {
    cy.visit('/');
    cy.contains(/add 1/i).click();
    cy.get('input[value="1"]').clear().type('2').blur();
    cy.contains('address has been updated to 2');
  })

  it('should validate address value', () => {
    cy.visit('/');
    cy.contains(/add 1/i).click();
    cy.get('input[value="1"]').clear().type('513').blur();
    cy.contains('Please use integers from 1 to 512');
  })
})
