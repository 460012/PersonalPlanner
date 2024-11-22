describe('Project Planning Page', () => {
  beforeEach(() => {
    // Intercept the GET request to fetch task number
    cy.intercept('GET', '**/Task/getAvailableTaskNumber', {
      statusCode: 200,
      body: { number: 123 }, // Mocked response with the fetched number
    }).as('fetchTaskNumber');

    // Intercept the GET request to fetch task number
    cy.intercept('GET', '**/Sprint/getAvailableSprintNumber', {
      statusCode: 200,
      body: { number: 123 }, // Mocked response with the fetched number
    }).as('fetchSprintNumber');

    // Intercept the POST request to create a task
    cy.intercept('POST', '**/Task/CreateTask', (req) => {
      //cy.log("Intercepted CreateTask: ", req.body);
      req.reply({
        statusCode: 200,
        body: { id: 1, name: 'Test Task' }, // Mocked response
      })
    }).as('createTask');

    // Intercept the POST request to create a sprint
    cy.intercept('POST', '**/Sprint/CreateSprint', {
      statusCode: 200,
      body: { id: 1, name: 'New Sprint' }, // Mocked response
    }).as('createSprint');

    // Intercept the GET request to fetch task details
    cy.intercept('GET', '**/Task/GetTaskOnID*', {
      statusCode: 200,
      body: { id: 1, mainTask: 1, name: 'Test Task', code: 'T1', description: 'Description 1', worker: 1, reporter: 1, storyPointEstimate: 5, boardID: 1 }, // Mocked response
    }).as('fetchTaskDetails');

    // Visit the planning page
    cy.visit('/Project/Planning');
    // Wait for all intercepts to be set up
    //cy.wait(['@fetchTaskNumber', '@createTask', '@createSprint', '@fetchTaskDetails']);
  });

  it('adds a task to backlog', () => {
    // Find the input field for new task and add a task
    cy.get('input[placeholder="New Task"]').type('Test Task');
    cy.contains('button', 'Add Task').click();

    //wait for available id
    cy.wait('@fetchTaskNumber');
  
    // Wait for the task to appear in the backlog
    cy.contains('li', 'Test Task').should('exist');
  
    // Verify the API call was made
    cy.wait('@createTask').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      // Additional assertions on the intercepted request/response can be added here
    });
  });

  it('creates a sprint', () => {
    // Enter sprint name and create sprint
    cy.get('input[placeholder="Sprint Name"]').type('New Sprint');
    cy.contains('button', 'Create Sprint').click();
  
    cy.wait('@fetchSprintNumber');

    // Wait for the sprint to appear in the list
    cy.contains('.outline-none', 'New Sprint').should('exist');
  
    // Verify the API call was made
    cy.wait('@createSprint').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      // Additional assertions on the intercepted request/response can be added here
    });
  });

  it('opens modal on task click', () => {
    // Add a new task
    cy.get('input[placeholder="New Task"]').type('Test Task');
    cy.contains('button', 'Add Task').click();//wait for available id
    cy.wait('@fetchTaskNumber');
    cy.wait('@createTask'); // Wait for the task creation API call
  
    // Click on the newly created task to open modal
    cy.get('li[draggable="true"]').first().click();
  
    // Verify that the modal is visible
    cy.get('.ReactModal__Content').should('be.visible');
  
    // Verify the API call was made to fetch task details
    cy.wait('@fetchTaskDetails').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      // Additional assertions on the intercepted request/response can be added here
    });
  });
});
