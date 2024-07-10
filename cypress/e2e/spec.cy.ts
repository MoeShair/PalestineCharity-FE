describe('Shop Component', () => {
  beforeEach(() => {
    // Mock the API responses for getting shop items
    cy.intercept('GET', 'http://localhost:3000/posts/fonts', {
      statusCode: 200,
      body: [
        { id: 'font1', name: 'Font1', type: 'font', price: 100 },
        { id: 'font2', name: 'Font2', type: 'font', price: 150 }
      ],
    }).as('getFonts');

    cy.intercept('GET', 'http://localhost:3000/posts/profile-pictures', {
      statusCode: 200,
      body: [
        { id: 'pic1', name: 'ProfilePic1', type: 'profile-pic', url: 'http://example.com/pic1.jpg', price: 200 },
        { id: 'pic2', name: 'ProfilePic2', type: 'profile-pic', url: 'http://example.com/pic2.jpg', price: 250 }
      ],
    }).as('getProfilePics');

    cy.intercept('GET', 'http://localhost:3000/posts/background', {
      statusCode: 200,
      body: [
        { id: 'bg1', name: 'BackgroundPic1', type: 'background-pic', url: 'http://example.com/bg1.jpg', price: 300 },
        { id: 'bg2', name: 'BackgroundPic2', type: 'background-pic', url: 'http://example.com/bg2.jpg', price: 350 }
      ],
    }).as('getBackgroundPics');

    // Visit the Shop page
    cy.visit('/shop');

    // Wait for API responses
    cy.wait(['@getFonts', '@getProfilePics', '@getBackgroundPics']);
  });

  it('should display the shop items', () => {
    // Check if the Fonts section is displayed
    cy.get('h2').contains('Fonts').should('exist');

    // Check if at least one font item is displayed
    cy.get('nz-card').should('have.length.greaterThan', 0);

    // Check if the Profile Pictures section is displayed
    cy.get('h2').contains('Profile Pictures').should('exist');

    // Check if at least one profile picture item is displayed
    cy.get('nz-card').should('have.length.greaterThan', 0);

    // Check if the Background Pictures section is displayed
    cy.get('h2').contains('Background Pictures').should('exist');

    // Check if at least one background picture item is displayed
    cy.get('nz-card').should('have.length.greaterThan', 0);
  });

  it('should buy an item', () => {
    // Mock the API response for buying an item
    cy.intercept('POST', 'http://localhost:3000/posts/buyItem', {
      statusCode: 200,
      body: { message: 'Item purchased successfully!' },
    }).as('buyItem');

    // Click the first "Get Item" button
    cy.get('button').contains('Get Item').first().click();

    // Wait for the buyItem API call
    cy.wait('@buyItem');

    // Check if the success message is displayed
    cy.get('.ant-message').contains('Item purchased successfully!').should('exist');
  });

  it('should handle buying an item error', () => {
    // Mock the API response for buying an item error
    cy.intercept('POST', 'http://localhost:3000/posts/buyItem', {
      statusCode: 400,
      body: { message: 'You already have this item!' },
    }).as('buyItemError');

    // Click the first "Get Item" button
    cy.get('button').contains('Get Item').first().click();

    // Wait for the buyItemError API call
    cy.wait('@buyItemError');

    // Check if the error message is displayed
    cy.get('.ant-message').contains('You already have this item!').should('exist');
  });
});
