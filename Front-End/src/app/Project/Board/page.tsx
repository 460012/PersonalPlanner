'use client'

import React, { useEffect, useState } from 'react';
import Layout from '@/app/Dashboard/layout';
import { useModal, ModalTypes } from '@/app/Components/Modal/ModalContext';
import { getCookie } from '@/app/utils/cookieUtils';
import { OwnApiConnection } from '@/app/utils/OwnApiConnection';
import { ModalContent } from '@/app/Components/Task/TaskModalShow/ModalContent';
import SprintFilters from '@/app/Components/Sprint/FilterList/FilterList';

type TaskData = {
  id: number;
  mainTask: number,
  name: string;
  code: string,
  description: string,
  worker: number,
  reporter: number,
  storyPointEstimate: number,
};

type BoardList = {
  id: number;
  name: string;
  number: number;
  standard: boolean;
};

type BoardItem = {
  id: number;
  boardID: number;
  name: string;
};

const ProjectID = getCookie("projectID");
const UserID = getCookie("UserID");

async function loadAllTasks(){
  const response = await fetch(OwnApiConnection + `/Project/getBoardTasks?ProjectID=${ProjectID}`);
  const tasks = await response.json();
  //console.log('Tasks: ', tasks);
  return tasks;
}

async function loadAllBoards(){
  const response = await fetch(OwnApiConnection + `/Project/GetAllProjectBoards?ProjectID=${ProjectID}`);
  const boards = await response.json();
  return boards;
}

async function getAvailableBoardID(){
  const response = await fetch(OwnApiConnection + `/Board/GetAvailableBoardNumber`);
  const boardID = await response.json();
  return boardID;
}

async function sendCreateBoard(id: number, name: string, number: number, standard: boolean){
  try {
    const apiCallstring = OwnApiConnection + `/Board/CreateBoard`;

    const sendData = {
      id: id, 
      name: name, 
      projectID: ProjectID ? parseInt(ProjectID) : -1,
      number: number, 
      standard: standard,
    }

    console.log('sending board data: ', sendData);

    const response = await fetch(apiCallstring, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendData)
    });

    if (!response.ok) {
      throw new Error('Failed to create board');
    }
    const data = await response.json();
    return data; // if you need to return any data from the response
  } catch (error) {
    console.error('Error creating board:', error);
    throw error; // propagate the error for handling at a higher level if needed
  }
}

async function addTaskToBoard(taskID: number, newBoardID: number){
  const response = await fetch(OwnApiConnection + `/Board/AddTaskToBoard?taskID=${taskID}&boardID=${newBoardID}`);
  const result = await response.json();
  return result;
}

async function changeBoardNumber(boardID: number, newNumber: number){
  const response = await fetch(OwnApiConnection + `/Board/ChangeBoardNumber?boardID=${boardID}&newNumber=${newNumber}`);
  const result = await response.json();
  return result;
}

async function changeBoardName(boardID: number, newName: string){
  const response = await fetch(OwnApiConnection + `/Board/ChangeBoardName?boardID=${boardID}&newName=${newName}`);
  const result = await response.json();
  return result;
}

async function getTaskOnID(TaskID: number){
  const response = await fetch(OwnApiConnection + `/Task/GetTaskOnID?TaskID=${TaskID}`);
  const result = await response.json();
  return result;
}

const Board = () => {

  const [boards, setBoards] = useState<BoardList[]>([]);
  const [items, setItems] = useState<BoardItem[]>([]);
  const [draggedBoard, setDraggedBoard] = useState<BoardList | null>(null);
  const [draggedItem, setDraggedItem] = useState<BoardItem | null>(null);
  const [editingBoardId, setEditingBoardId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');

  const { openModal } = useModal();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const boards = await loadAllBoards();
        //console.log("Boards: ", boards);
        setBoards(boards);
        const tasks = await loadAllTasks();
        //console.log("Tasks: ", tasks);
        setItems(tasks);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  }, []);

  //Item drag/drop events
  const handleItemDragStart = (e: React.DragEvent<HTMLDivElement>, item: BoardItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleItemDrop = (e: React.DragEvent<HTMLDivElement>, boardId: number) => {
    e.preventDefault();
    if(draggedItem){
      setItems(items.map(item => {
        if (item.id === draggedItem.id) {
          addTaskToBoard(item.id, boardId);
          return { ...item, boardID: boardId }; //boardID must be named after the number of connection in items array
        }
        return item;
      }));
      setDraggedItem(null);
    }
  };

  //Board drag/drop events
  const handleBoardDragStart = (e: React.DragEvent<HTMLDivElement>, board: BoardList) => {
    setDraggedBoard(board);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleBoardDrop = (e: React.DragEvent<HTMLDivElement>, targetBoard: BoardList) => {
    e.preventDefault();
    if (draggedBoard) {
      //console.log("AllBoards: ", boards);
      const updatedBoards = boards.map(board => {
        if (board.id === draggedBoard.id) {
          changeBoardNumber(board.id, targetBoard.number);
          return { ...board, number: targetBoard.number };
        }
        if (board.id === targetBoard.id) {
          changeBoardNumber(board.id, draggedBoard.number);
          return { ...board, number: draggedBoard.number };
        }
        return board;
      });

      console.log("board's number: ", draggedBoard.number);

      setBoards(updatedBoards);
      setDraggedBoard(null);
    }
  };

  //general dragover 
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };



  const handleItemClick = async (item: BoardItem) => {
    //console.log(`Clicked on item:`, item);
    //retrieve the item data from api on item.id
    const taskData = await getTaskOnID(item.id);
    //console.log("Task data: ", taskData);

    openModal(() => (
      <ModalContent taskData={taskData} />
    ), ModalTypes.SMALLBOXMINIMUM);
  };

  const handleBoardNameClick = (board: BoardList) => {
    setDropdownVisibleId(null); //remove the dropdown
    setEditingBoardId(board.id);
    setNewTitle(board.name);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, board: BoardList) => {
    if (e.key === 'Enter') {
      handleSaveTitle(board);
    }
  };

  const handleSaveTitle = (board: BoardList) => {
    setBoards(boards.map(item => {
      if (item.id === board.id) {
        //console.log("New Title: ", newTitle);
        changeBoardName(board.id, newTitle);
        return { ...item, name: newTitle };
      }
      return item;
    }));
    setEditingBoardId(null);
  }

  const handleCancelTitle = () => {
    setEditingBoardId(null);
  }

  const createBoard = async () => {  
    try {
      const newBoardId = await getAvailableBoardID();
      const newBoard: BoardList = { id: newBoardId, name: `Board ${newBoardId}`, number: boards.length, standard: false  };
  
      await sendCreateBoard(newBoardId, newBoard.name, newBoard.number, newBoard.standard);

      setBoards([...boards, newBoard]);
    } catch (error) {
      console.error('Failed to create board:', error);
    }
  };

  //#region Sorting boards and items

  const getItemsByBoard = (boardId: number) => items.filter(item => item.boardID === boardId);
  const sortedBoards = [...boards].sort((a, b) => a.number - b.number);

  //#endregion

  // #region DropDown event for board options

  const [dropdownVisibleId, setDropdownVisibleId] = useState(null);
  const toggleDropdown = (boardId: any) => {
    setDropdownVisibleId(dropdownVisibleId === boardId ? null : boardId);
  };

  // #endregion

  const sprints = [
    { name: 'Backlog', id: -1 },
    { name: 'Sprint 1', id: 1 },
    { name: 'Sprint 2', id: 2 },
    { name: 'Sprint 3', id: 3 },
    // Add more sprints as needed
  ];

  type Sprint = {
    name: string;
    id: number;
  };

  const handleCheckChange = (sprint: Sprint, isChecked: boolean) => {
    console.log(`Sprint ${sprint.name} ID: ${sprint.id} is now ${isChecked ? 'checked' : 'unchecked'}`);
  }

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <div style={{display: 'flex', marginBottom: 10}}>
        <div style={{minWidth: '25%', maxWidth: '25%', outline: 'solid', outlineWidth: 'thin', outlineColor: 'blue'}}>
          <SprintFilters sprints={sprints} handleCheckChange={handleCheckChange} />
        </div>
        <div style={{minWidth: '75%', maxWidth: '75%'}}>
          <button className='outline-none outline-BTBlue hover:bg-BTBlue-dark px-4 py-2 rounded-md'  onClick={createBoard} style={{ margin: '16px', padding: '8px', maxWidth: '100%', minWidth: '100%' }}>
            Add Board
          </button>
        </div>
      </div>
      <div style={{display: 'flex', flex: 1}}>
      {sortedBoards.map(board => (
        <div
          key={board.id}
          onDragOver={handleDragOver}
          onDrop={(e) => handleBoardDrop(e, board)}
          style={{
            flex: 1,
            margin: '0 8px',
            padding: '8px',
            border: '1px solid lightgrey',
            borderRadius: '4px',
            minWidth: '200px', // Set minimum width here
            height: '90%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
            {editingBoardId === board.id ? (
              <div style={{marginBottom: 10}}>
                <input
                  type="text"
                  value={newTitle}
                  onChange={handleTitleChange}
                  onKeyDown={(e) => handleTitleKeyDown(e, board)}
                  className='rename-board-input outline-none outline-BTBlue px-4 py-2'
                  autoFocus
                  style={{
                    // cursor: 'grab',
                    marginBottom: '10px',
                    width: '85%',
                    height: '100%'
                  }}
                />
                <button onClick={() => handleSaveTitle(board)} style={{ marginLeft: '8px', cursor: 'pointer', outline: 'solid', outlineColor: 'gray', height: '100%' }}>✔️</button>
                <button onClick={handleCancelTitle} style={{ marginLeft: '8px', cursor: 'pointer', outline: 'solid', outlineColor: 'gray', height: '100%' }}>❌</button>
              </div>
            ) : (
            <div className='bg-BTBlue px-4 py-2' style={{ display: 'flex', alignItems: 'center', position: 'relative', marginBottom: 10 }}>
              <div
                draggable
                onDragStart={(e) => handleBoardDragStart(e, board)}
                style={{
                  cursor: 'grab',
                  marginBottom: '8px',
                  flexGrow: 1
                }}
                onClick={() => handleBoardNameClick(board)}
              >
                <h3 style={{ margin: 0 }}>{board.name}</h3>
              </div>
              <button onClick={() => toggleDropdown(board.id)} style={{ marginLeft: '10px', position: 'relative' }}>⋮</button>
              {dropdownVisibleId === board.id && (
                <div style={{
                  position: 'absolute',
                  top: '83%',
                  right: '0',
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  marginTop: '8px',
                  zIndex: 1
                }}>
                  <div onClick={() => handleBoardNameClick(board)}>Rename</div>
                  {/* <div onClick={() => handleRemove(board.id)}>Remove</div> */}
                </div>
              )}
            </div>
            )}
          <div className='DropZone' onDragOver={handleDragOver} onDrop={(e) => handleItemDrop(e, board.id)} style={{ flex: 1, overflowY: 'auto', outline: 'solid', outlineColor: 'black', outlineWidth: 'thin' }}>
          {getItemsByBoard(board.id).map(item => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleItemDragStart(e, item)}
              onClick={() => handleItemClick(item)}
              style={{
                padding: '8px',
                margin: '5px 5px 8px 5px',
                maxWidth: '99%',
                background: 'white',
                borderRadius: '4px',
                cursor: 'grab',
                outline: 1,
                outlineStyle: 'solid',
                outlineColor: 'gray'
              }}
            >
              {item.name}
            </div>
          ))}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Board;