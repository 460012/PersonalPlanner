import { OwnApiConnection } from "@/app/utils/OwnApiConnection";
import { useState } from "react";

async function changeDescriptionApi(taskID: number, newDescription: string){
  const response = await fetch(OwnApiConnection + `/Task/ChangeDescription?taskID=${taskID}&newDescription=${newDescription}`);
  const result = await response.json();
  return result;
}

async function changeNameApi(taskID: number, newName: string){
  const response = await fetch(OwnApiConnection + `/Task/ChangeName?taskID=${taskID}&newName=${newName}`);
  const result = await response.json();
  return result;
}

export function ModalContent({ taskData } : any){
    // #region ModalEvents and stuff

    const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
    const [description, setDescription] = useState(taskData.description);  

    const handleDescriptionClick = () => {
      setIsDescriptionEditing(true);
    };
  
    const handleDescriptionChange = (e: any) => {
      setDescription(e.target.value);
    };
  
    const handleDescriptionBlur = async () => {
      setIsDescriptionEditing(false);
      
      //update the description in the backend
      //updateDescription(taskData.id, description);
      await changeDescriptionApi(taskData.id, description);
    };

    const [isNameEditing, setIsNameEditing] = useState(false);
    const [name, setName] = useState(taskData.name);

    const handleNameClick = () => {
      setIsNameEditing(true);
    };
  
    const handleNameChange = (e: any) => {
      setName(e.target.value);
    };
  
    const handleNameBlur = async () => {
      setIsNameEditing(false);
      
      //update the description in the backend
      //updateDescription(taskData.id, description);
      await changeNameApi(taskData.id, name);
    };
  
    // #endregion
  
  
    //setDescription(taskData.description);
    //console.log("Task data: ", taskData);
    return (
      <div style={{ flex: 1 }}>
        {isNameEditing ? (
          <input type="text"
                 value={name}
                 onBlur={handleNameBlur}
                 onChange={handleNameChange}
                 autoFocus
                 style={{ fontSize: '2rem', fontWeight: 'bold' }}
          />
        ) : (
          <p onClick={handleNameClick} style={{fontSize: '2rem', fontWeight: 'bold'}}>{name}</p>
        )}
        <div style={{ display: "flex", height: "85%" }}>
          <div onClick={handleDescriptionClick} style={{ flex: 1 }}>
            {isDescriptionEditing ? (
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                onBlur={handleDescriptionBlur}
                autoFocus
                style={{ width: '100%', height: '100%', resize: 'none' }}
              />
            ) : (
              <p>{description}</p>
            )}
          </div>
          <div style={{ flex: 1, outline: 'solid', outlineColor: 'green', outlineWidth: 'thin' }}>
            <p style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Details:</p>
            <p>Code: {taskData.code}</p>
            <p>Main Task: {taskData.mainTask}</p>
            <p>Reporter ID: {taskData.reporter}</p>
            <p>Worker ID: {taskData.worker}</p>
            <p>Story Point Estimate: {taskData.storyPointEstimate}</p>
          </div>
        </div>
      </div>
    );
}