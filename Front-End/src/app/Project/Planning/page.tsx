'use client'

import React, { ChangeEvent, useState, useEffect } from 'react';
//import { BoardItem } from '../Board/page';
import { getCookie } from '@/app/utils/cookieUtils';
import { OwnApiConnection } from '@/app/utils/OwnApiConnection';
import { useModal, ModalTypes } from '@/app/Components/Modal/ModalContext';
import { ModalContent } from '@/app/Components/Task/TaskModalShow/ModalContent';

interface Sprint {
  id: number;
  name: string;
  itemIDs: number[];
}

type BoardItem = {
  id: number;
  name: string;
};

const ProjectID = getCookie("projectID");
const UserID = getCookie("UserID");

// #region SprintApi's

async function fetchSprintNumberFromAPI() {
  try {
    const response = await fetch(OwnApiConnection + '/Sprint/getAvailableSprintNumber');
    if (!response.ok) {
      throw new Error('Failed to fetch number');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// #region InitialSprint loading

//Load all the sprint for this project and calls the one under this to load the itemIDs
async function loadSprints(): Promise<Sprint[]> {
  const response = await fetch(OwnApiConnection + `/Project/GetAllProjectSprints?ProjectID=${ProjectID}`);
  
  if (!response.ok) {
    throw new Error(`Error fetching sprints: ${response.statusText}`);
  }

  const sprints: Array<{ id: number; name: string }> = await response.json();

  const sprintsWithItems: Sprint[] = await Promise.all(
    sprints.map(async (sprint) => {
      const itemIDs = await loadAllTaskIDsFromSprint(sprint.id);
      return {
        ...sprint,
        itemIDs: itemIDs ?? [], // Default to an empty array if itemIDs is undefined
      };
    })
  );

  return sprintsWithItems;
}

//returns the itemIDs for a sprint as a number[]
async function loadAllTaskIDsFromSprint(sprintID: number): Promise<number[]> {
  const response = await fetch(OwnApiConnection + `/Sprint/getTasksConnectedToSprint?sprintID=${sprintID}`);
  
  if (!response.ok) {
    throw new Error(`Error fetching tasks for sprint ${sprintID}: ${response.statusText}`);
  }

  const itemIDs: number[] = await response.json();
  return itemIDs;
}


// #endregion

async function loadAllTasks(){
  const response = await fetch(OwnApiConnection + `/Project/GetAllProjectTasks?ProjectID=${ProjectID}`);
  const tasks = await response.json();
  console.log('Tasks: ', tasks);
  return tasks;
}


async function sendCreateSprint(id: number, name: string){
  try {
    const apiCallstring = OwnApiConnection + `/Sprint/CreateSprint`;
    console.log('ApiCall: ', apiCallstring);

    const sendData = {
      sprintID: id, 
      name: name, 
      projectID: ProjectID ? parseInt(ProjectID) : -1,
    }

    console.log('sending data: ', sendData);

    const response = await fetch(apiCallstring, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendData)
    });

    if (!response.ok) {
      throw new Error('Failed to create sprint');
    }
    const data = await response.json();
    return data; // if you need to return any data from the response
  } catch (error) {
    console.error('Error creating sprint:', error);
    throw error; // propagate the error for handling at a higher level if needed
  }
}

async function addTaskToSprintApi(sprintID: number, taskID: number){
  try {
    const apiCallstring = OwnApiConnection + `/Sprint/addTaskToGivenSprint?sprintID=${sprintID}&taskID=${taskID}`;
    //console.log('ApiCall: ', apiCallstring);
    const response = await fetch(apiCallstring);
    if (!response.ok) {
      throw new Error('Failed to add task to sprint');
    }
    const data = await response.json();
    return data; // if you need to return any data from the response
  } catch (error) {
    console.error('Error adding task to sprint:', error);
    throw error; // propagate the error for handling at a higher level if needed
  }
}

async function removeTasksFromSprint(sprintID: number, taskID: number){
  try {
    const apiCallstring = OwnApiConnection + `/Sprint/removeTaskFromGivenSprint?sprintID=${sprintID}&taskID=${taskID}`;
    //console.log('ApiCall: ', apiCallstring);
    const response = await fetch(apiCallstring);
    if (!response.ok) {
      throw new Error('Failed to remove task to sprint');
    }
    const data = await response.json();
    return data; // if you need to return any data from the response
  } catch (error) {
    console.error('Error removing task from sprint:', error);
    throw error; // propagate the error for handling at a higher level if needed
  }
}

// #endregion

async function getTaskOnID(TaskID: number){
  const response = await fetch(OwnApiConnection + `/Task/GetTaskOnID?TaskID=${TaskID}`);
  const result = await response.json();
  return result;
}

async function fetchTaskNumberFromAPI() {
  try {
    const response = await fetch(OwnApiConnection + '/Task/getAvailableTaskNumber');
    if (!response.ok) {
      throw new Error('Failed to fetch number');
    }
    const data = await response.json();
    //console.log("received data: ", data);
    return data;
  } catch (error) {
    console.error('Error fetching number:', error);
    return null;
  }
}

async function sendCreateTask(id: number, name: string){
  try {
    const apiCallstring = OwnApiConnection + `/Task/CreateTask`;

    const sendData = {
      id: id, 
      name: name, 
      projectID: ProjectID ? parseInt(ProjectID) : -1,
      reporterID: UserID ? parseInt(UserID) : -1,
      mainTask: -1
    }

    console.log('sending data: ', sendData);

    const response = await fetch(apiCallstring, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendData)
    });

    if (!response.ok) {
      throw new Error('Failed to create sprint');
    }
    const data = await response.json();
    return data; // if you need to return any data from the response
  } catch (error) {
    console.error('Error creating sprint:', error);
    throw error; // propagate the error for handling at a higher level if needed
  }
}


const Project = () => {
  // const initialSprints: Sprint[] = [
  //   { sprintID: 1, name: "Sprint 1", itemIDs: [] },
  //   { sprintID: 2, name: "Sprint 2", itemIDs: [1, 2] },
  // ];

  // const initialBacklog: BoardItem[] = [
  //   { id: 1, name: 'Task1' },
  //   { id: 2, name: 'Task2' },
  //   { id: 3, name: 'Task3' },
  //   { id: 4, name: 'Task4' },
  //   { id: 5, name: 'Task5' },
  // ];

  const [initialBacklog, setInitialBacklog] = useState<BoardItem[]>([]);
  const [allItems, setAllItems] = useState<BoardItem[]>([]); //keep track of all the items
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [backlog, setBacklog] = useState<BoardItem[]>([]); //make it so that the backlog are items that are not yet in sprints
  const [taskContent, setTaskContent] = useState<string>('');
  const [sprintName, setSprintName] = useState<string>('');
  //const [taskId, setTaskId] = useState<number>(initialBacklog.length + 1);
  //const [sprintId, setSprintId] = useState<number>(initialSprints.length + 1);

  const { openModal } = useModal();

// #region Fetching Tasks and Sprints

  const [isFetchTasksLoaded, setIsFetchTasksLoaded] = useState(false);
  useEffect(() => {
    async function fetchTasks() {
      try {
        const tasks = await loadAllTasks();
        setInitialBacklog(tasks);
        setAllItems([...allItems, tasks]);
        //setBacklog([...backlog, tasks]);
        //console.log("All fetched Tasks: ", tasks);

        setIsFetchTasksLoaded(true);
      } catch (error) {
        console.error('Failed to load tasks', error);
      }
    }

    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchSprints = async () => {
      try {
        const fetchedSprints = await loadSprints();
        setSprints(fetchedSprints);
        setBacklog(initialBacklog.filter(item => !fetchedSprints.some(sprint => sprint.itemIDs.includes(item.id))));
      } catch (error) {
        console.error('Error loading sprints:', error);
      }
    };

    if(isFetchTasksLoaded){
      fetchSprints();
    }
  }, [isFetchTasksLoaded, initialBacklog]); // Dependencies on task load state and initial backlog

// #endregion

// #region Create Task

  const addTaskToBacklog = () => {
    if (taskContent) {
      setTriggerEffect(true);
    }
  };

  const [triggerEffect, setTriggerEffect] = useState(false);
  useEffect(() => {
    if(triggerEffect){
      const doThings = async () => {
        const fetchedNumber = await fetchTaskNumberFromAPI();

        //console.log("fetchedNumber: ", fetchedNumber);
  
        const newTask: BoardItem = { id: fetchedNumber, name: taskContent };
  
        //Create task in the db using the newTask data
        await sendCreateTask(newTask.id, newTask.name);
  
        //log it in the frontend
        setBacklog([...backlog, newTask]);
        setAllItems([...allItems, newTask]);
        setTaskContent(''); // Clear the task content immediately after adding the task
        setTriggerEffect(false); // Reset the trigger
      }
  
      doThings();
    }
  }, [triggerEffect])

// #endregion

  const createSprint = async () => {
    if (sprintName) {
      // useEffect(() => {
      //   const fetchData = async () => {
        const fetchedNumber = await fetchSprintNumberFromAPI();

        const newSprint: Sprint = { id: fetchedNumber, name: sprintName, itemIDs: [] };

        //Create task in the db using the newTask data
        await sendCreateSprint(newSprint.id, newSprint.name); //standard sprint has no items yet so for that is another function

        setSprints([...sprints, newSprint]);
        setSprintName('');
        //setSprintId(fetchedNumber + 1);
      //   }

      //   fetchData();
      // })
    }
  };

  // #region Important functions

  const addTaskToSprint = async (task: BoardItem, sprintID: number) => {
    try{
      const newSprints = sprints.map((sprint) => {
        if (sprint.id === sprintID) {
          return { ...sprint, itemIDs: [...sprint.itemIDs, task.id] };
        }
        return sprint;
      });
  
      //TODO: add task through api
      await addTaskToSprintApi(sprintID, task.id);
  
      //front end track
      setSprints(newSprints);
      setBacklog(backlog.filter((t) => t.id !== task.id));
    } catch(error){
            // Handle error if API call fails
            console.error('Error adding task to sprint:', error);
            // You might want to add UI feedback or other error handling here
    }
  };

  const moveTaskBetweenSprints = async (taskID: number, sourceSprintID: number, targetSprintID: number) => {
    const newSprints = sprints.map((sprint) => {
      if (sprint.id === sourceSprintID) {
        return { ...sprint, itemIDs: sprint.itemIDs.filter((id) => id !== taskID) };
      }
      if (sprint.id === targetSprintID) {
        return { ...sprint, itemIDs: [...sprint.itemIDs, taskID] };
      }
      return sprint;
    });

    //updates when already in the table
    await addTaskToSprintApi(targetSprintID, taskID);

    setSprints(newSprints);
  };

  const moveTaskToBacklog = async (taskID: number, sourceSprintID: number) => {
    const task = allItems.flat().find((item) => item.id === taskID); //allItems is a nested array of array, so flat() creates a new array with all sub-array elements
    //console.log("Task: ", task)
    if (!task) return;

    const newSprints = sprints.map((sprint) => {
      if (sprint.id === sourceSprintID) {
        return { ...sprint, itemIDs: sprint.itemIDs.filter((id) => id !== taskID) };
      }
      return sprint;
    });

    //TODO: make these functions work
    await removeTasksFromSprint(sourceSprintID, taskID);

    setBacklog([...backlog, task]);
    setSprints(newSprints);
  };
 
  // #endregion

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetSprintID?: number) => {
    e.preventDefault();
    const { itemID, sourceSprintID } = JSON.parse(e.dataTransfer.getData('text/plain'));

    //  console.log('ItemID:', itemID, '; SourceID: ', sourceSprintID);

    //TODO: maybe check here for the database related things, here are the source and target so maybe....

    if (sourceSprintID === undefined && targetSprintID !== undefined) {
      // From backlog to sprint
      const item = backlog.find((item) => item.id === itemID);
      if (item) {
        addTaskToSprint(item, targetSprintID);
      }
    } else if (sourceSprintID !== undefined && targetSprintID !== undefined) {
      // From sprint to sprint
      if(sourceSprintID !== targetSprintID){
        moveTaskBetweenSprints(itemID, sourceSprintID, targetSprintID);
      }
      else{
        console.log("Item was already in the target, so no need to change it to itself");
      }
    } else if (sourceSprintID !== undefined && targetSprintID === undefined) {
      // From sprint to backlog
      //console.log("Move to backlog selected");
      moveTaskToBacklog(itemID, sourceSprintID);
    }

    //console.log("Backlog: ", backlog);
  };

// #region Changes, Clicks and drag/drop events

  const handleTaskContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskContent(e.target.value);
  };

  const handleSprintNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSprintName(e.target.value);
  };

  const handleItemDragStart = (e: React.DragEvent<HTMLElement>, item: BoardItem, sourceSprintID?: number) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ itemID: item.id, sourceSprintID }));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleItemClick = async (item: BoardItem) => {
    //TODO: Show info
    //console.log(`Clicked on item:`, item);

    const taskData = await getTaskOnID(item.id);
    //console.log("Task data: ", taskData);

    openModal(() => (
      <ModalContent taskData={taskData} />
    ), ModalTypes.SMALLBOXMINIMUM);
  };

// #endregion

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flex: 1 }}>
        <div
          style={{
            flex: 1,
            margin: '0 8px',
            padding: '8px',
            border: '1px solid lightgrey',
            borderRadius: '4px',
            minWidth: '200px',
            height: '90%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
          onDrop={(e) => handleDrop(e, undefined)}
          onDragOver={handleDragOver}
        >
          <h1>Backlog</h1>
          <div>
            <input
              type="text"
              value={taskContent}
              onChange={handleTaskContentChange}
              placeholder="New Task"
            />
            <button onClick={addTaskToBacklog}>Add Task</button>
          </div>
          <ul>
            {backlog.map((task) => (
              <li
                key={task.id}
                draggable
                onDragStart={(e) => handleItemDragStart(e, task)}
                onClick={() => handleItemClick(task)}
                style={{
                  padding: '8px',
                  margin: '1px 1px 8px 1px',
                  background: 'white',
                  borderRadius: '4px',
                  cursor: 'grab',
                  outline: '1px solid gray',
                }}
              >
              {task.name}
            </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            flex: 1,
            margin: '0 8px',
            padding: '8px',
            border: '1px solid lightgrey',
            borderRadius: '4px',
            minWidth: '200px',
            height: '90%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div>
            <h2>Sprints</h2>
            <button onClick={createSprint}>Create Sprint</button>
          </div>
          <div>
            <input
              type="text"
              value={sprintName}
              onChange={handleSprintNameChange}
              placeholder="Sprint Name"
            />
          </div>
          {sprints.map((sprint) => (
            <div className='outline-none outline-BTBlue' style={{ marginTop: 10 }} key={sprint.id}
              onDrop={(e) => handleDrop(e, sprint.id)}
              onDragOver={handleDragOver}>
              <h3>{sprint.name}</h3>
              <div
                style={{ flex: 1, overflowY: 'auto', minHeight: '150px', marginTop: 10, outline: 'solid', outlineWidth: 'thin', outlineColor: 'BTBlue' }}
              >
                {sprint.itemIDs.map((itemID) => {
                  //const item = backlog.concat(allItems).find((t) => t.id === itemID); // Find the item in both current backlog and initial backlog //
                  const allItemsFlattened = allItems.flat(); // Ensure allItems is flattened
                  const combinedItems = backlog.concat(allItemsFlattened); // Combine backlog and flattened allItems
                  const item = combinedItems.find((t) => t.id === itemID);
                  
                  //When an item has error shows that there is something wrong
                  if (!item) {
                    console.error(`Item with ID ${itemID} not found.`);
                    return (
                      <div
                        key={itemID}
                        style={{
                          padding: '8px',
                          margin: '1px',
                          background: 'red',
                          borderRadius: '4px',
                          cursor: 'not-allowed',
                          outline: '1px solid gray',
                        }}
                      >
                        Item not found
                      </div>
                    );
                  }

                  return (
                    <div
                      key={itemID}
                      draggable
                      onDragStart={(e) => handleItemDragStart(e as unknown as React.DragEvent<HTMLLIElement>, item!, sprint.id)}
                      onClick={() => handleItemClick(item!)}
                      style={{
                        padding: '8px',
                        margin: '5px 5px 8px 5px',
                        background: 'white',
                        borderRadius: '4px',
                        cursor: 'grab',
                        outline: '1px solid gray',
                      }}
                    >
                      {item?.name}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
