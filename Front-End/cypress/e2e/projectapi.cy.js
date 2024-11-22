// cypress/e2e/projectList.spec.js

describe('ProjectList Component', () => {
  const apiUrl = 'http://localhost:7243';
  const mockData = [
    { id: 101, name: 'ProjectExample1' },
    { id: 202, name: 'ProjectExample2' },
    { id: 404, name: 'ProjectExample3' },
  ];

  beforeEach(() => {
    // Intercept the API call and return mock data
    cy.intercept('GET', `${apiUrl}/Project/GetAllYourRelatedProjects?UserID=*`, {
      statusCode: 200,
      body: mockData,
    }).as('getProjects');
  });

  it('should display the list of projects', () => {
    // Set a cookie for UserID
    cy.setCookie('UserID', '123');

    // Visit the page containing the ProjectList component
    cy.visit('/Dashboard/Projects');

    // Wait for the API call to complete
    cy.wait('@getProjects');

    // Check that the loading message is not visible
    cy.contains('Loading...').should('not.exist');

    // Check that the projects are displayed
    cy.get('ul').children().should('have.length', mockData.length);
    mockData.forEach((project) => {
      cy.contains(project.name).should('be.visible');
    });
  });

  it('should navigate to project page on click', () => {
    // Set a cookie for UserID
    cy.setCookie('UserID', '123');

    // Visit the page containing the ProjectList component
    cy.visit('/Dashboard/Projects');

    // Wait for the API call to complete
    cy.wait('@getProjects');

    // Click on the first project link
    cy.contains(mockData[0].name).click();

    // Check that the projectID cookie is set
    cy.getCookie('projectID').should('have.property', 'value', mockData[0].id.toString());

    // Check that the navigation occurred (assuming the Project page has some identifiable content)
    cy.url().should('include', '/Project');
  });
});
