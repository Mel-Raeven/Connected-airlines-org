describe('feature: see bookings', () => {
  it('Rule: If you dont login you cant see your bookings', () => {
    cy.log("Given: I go to the my booking tab")
    cy.visit('/')
    cy.contains('My Trips').click()
    cy.log("When: I want to see my bookings")
    cy.log("Then: I should be able to login")
    cy.location().should((loc) => {
      expect(loc.pathname).to.satisfy((pathname) => pathname === '/login')
    })
  })
})
describe('feature: book flight', () => {
  it('Rule: User login is optional', () => {
    cy.log("Given: A list of flights")
    cy.visit('/')
    cy.contains('Flights').click()
    cy.log("When: : I want to book a flight from Miami to Amsterdam Airport Schiphol")
    cy.log("Then: I should be able to select a flight ")
    cy.contains('MIA -> AMS').click()
    cy.contains('Departure Airport: Miami Airport')
    cy.contains('Arrival Airport: Amsterdam Airport Schiphol')
    cy.log("Then: I should be able to make a booking")
    cy.contains('Book').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.satisfy((pathname) => pathname === '/createbooking')
    })
    cy.get('input[placeholder="Passenger 1 Name"]').type('John')
    cy.get('input[placeholder="Passenger 1 Last Name"]').type('Doe')
    cy.get('input[placeholder="Passenger 1 Email"]').type('johndoe@example.com')
    cy.get('input[placeholder="Passenger 1 Phone number"]').type('0600000000')
    cy.get('[aria-label="Passenger 1 Birthday"]').click()
    cy.get('[class*="mantine-DatePickerInput-calendarHeaderLevel"]').click()
    Cypress._.times(19, () => {cy.get('button[data-direction="previous"]').click()})
    cy.get('button:contains("Jan")').click()
    cy.get('button[aria-label^="1 January"]').click()
    cy.get('a:contains("Book")').click()
    cy.get('button:contains("Confirm")').click()

    
})
    
})





