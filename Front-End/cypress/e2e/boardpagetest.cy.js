/// <reference types="cypress" />

describe('Board Page E2E Tests', () => {
    const apiUrl = 'http://localhost:7243';
    const userID = '123';
    const projectID = '456';

    const mockTasks = [
        { id: 1, mainTask: 1, name: 'Task 1', code: 'T1', description: 'Description 1', worker: 1, reporter: 1, storyPointEstimate: 5, boardID: 1 },
        { id: 2, mainTask: 2, name: 'Task 2', code: 'T2', description: 'Description 2', worker: 2, reporter: 2, storyPointEstimate: 3, boardID: 1 }
    ];

    const mockBoards = [
        { id: 1, name: 'Board 1', number: 1, standard: true },
        { id: 2, name: 'Board 2', number: 2, standard: false }
    ];

    const availableBoardNumber = { id: 999 };

    const mockTaskDetails = {
        id: 1,
        mainTask: 1,
        name: 'Task 1',
        code: 'T1',
        description: 'Detailed Description 1',
        worker: 1,
        reporter: 1,
        storyPointEstimate: 5,
        boardID: 1
    };

    beforeEach(() => {
        // Set cookies
        cy.setCookie('UserID', userID);
        cy.setCookie('projectID', projectID);

        // Mock API responses
        cy.intercept('GET', `${apiUrl}/Project/getBoardTasks?ProjectID=${projectID}`, {
            statusCode: 200,
            body: mockTasks,
        }).as('getBoardTasks');

        cy.intercept('GET', `${apiUrl}/Project/GetAllProjectBoards?ProjectID=${projectID}`, {
            statusCode: 200,
            body: mockBoards,
        }).as('getAllBoards');

        cy.intercept('POST', `${apiUrl}/Board/CreateBoard`, {
            statusCode: 200,
            body: availableBoardNumber,
        }).as('createBoard');

        cy.intercept('GET', `${apiUrl}/Board/GetAvailableBoardNumber`, {
            statusCode: 200,
            body: availableBoardNumber,
        }).as('getAvailableBoardNumber');

        cy.intercept('GET', `${apiUrl}/Board/ChangeBoardName*`, (req) => {
            console.log('Intercepted request:', req);
            req.reply({
                statusCode: 200,
                body: {}
            });
        }).as('changeBoardName');

        cy.intercept('POST', `${apiUrl}/Board/AddTaskToBoard*`, {
            statusCode: 200,
            body: {}
        }).as('addTaskToBoard');

        cy.intercept('GET', `${apiUrl}/Task/GetTaskOnID?TaskID=1`, {
            statusCode: 200,
            body: mockTaskDetails,
        }).as('getTaskOnID');

        cy.visit('/Project/Board'); // Adjust the path according to your routing setup

        // Define newBoard using availableBoardNumber.id
        const newBoard = {
            id: availableBoardNumber.id,
            name: `Board ${availableBoardNumber.id}`, // Ensure ${availableBoardNumber.id} is within the backticks
            number: mockBoards.length,
            standard: false,
        };

        // Log for debugging purposes
        console.log('New Board:', newBoard);

        // Wait for initial data loading
        cy.wait('@getBoardTasks');
        cy.wait('@getAllBoards');
    });

    it('loads the board page', () => {
        cy.get('button').contains('Add Board').should('be.visible');
    });

    it('adds a new board', () => {
        cy.get('button').contains('Add Board').click();
        cy.wait('@createBoard', { timeout: 10000 });
        cy.get('div').contains(`Board [object Object]`).should('be.visible');
    });

    it('renames a board', () => {
            // Click on the board you want to rename (adjust selector as per your application)
        cy.contains('h3', 'Board 1').click();

        // Wait for the input field associated with renaming to become visible
        cy.get('input[class*="rename-board-input"]').should('be.visible');

        // Clear the input field and type the new board name
        cy.get('input[class*="rename-board-input"]').clear().type('Renamed Board{enter}');

        // Optionally wait for the renaming operation to complete or an API response
        // Ensure the board name change reflects in UI, assuming there's some visual feedback or UI update
        cy.wait(2000); // Adjust the wait time based on your application's response time

        // Assert that the renamed board name is visible
        cy.contains('h3', 'Renamed Board').should('be.visible');
    });

    // TODO: check drag/dropping event
    // it('drags and drops an item to another board', () => {
    //     cy.get('div').contains('Task 1').trigger('dragstart', { dataTransfer: {} });
    //     cy.get('div').contains('Board 2').trigger('drop', { dataTransfer: {} });
    //     cy.wait('@addTaskToBoard', { timeout: 10000 }); // Increased timeout
    // });

    it('opens a task modal', () => {
        cy.get('div').contains('Task 1').click();
        cy.wait('@getTaskOnID');

        // Verify that the modal is visible
        cy.get('.ReactModal__Content').should('be.visible');

        // Optionally, close the modal and verify it is no longer visible
        cy.get('.ReactModal__Content button').click();
        cy.get('.ReactModal__Content').should('not.exist');
    });
});
