"use client"; // This is a client component 👈🏽

import { ModalTypes, useModal } from "@/app/Components/Modal/ModalContext";
import DataComponent from "./ApiCall";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MultiStepForm from "@/app/Components/MultiForms/CreateProject/MultiStepForm";
import ProjectList from "@/app/Components/Listers/ProjectList";

export default function Page() {
  const { openModal } = useModal();


  const handleOpenModal = () => {
    openModal(() => (
      // <ModalContent />
      <ModalContent2 />
    ), ModalTypes.SMALLBOX);
  };

return (
    <main>
      <div>
        {/* <p>
          Project page&nbsp;
        </p> */}

        <p style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0' }}>Project page</p>
        
        <button style={{float: 'right'}} className='outline-none outline-BTBlue hover:bg-BTBlue-dark px-4 py-2 rounded-md mt-4' onClick={handleOpenModal}>Create Project</button>
      </div>

      <br />

      <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0' }}>Projects:</p>

      <ProjectList />
    </main>
  );
}

// Define ModalContent as a separate component, and keep track of the variables within this component so that 
// The modal itself is tracking the changes instead of a parent component that does not share it.
function ModalContent() {
  const router = useRouter(); // Ensure this hook is used correctly
  const [name, setName] = useState('');
  const [isChecked, setIsChecked] = useState(false); 

  const handleClick = () => {
    router.push(`/Project?name=${name}`); //you should use backticks (`) instead of single quotes (') to interpolate the variable.
  }

  return (
    <div>
      <h2 style={{ color: 'green' }}>Modal Content</h2>
      <p>This is the content of the modal.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update the name state
          />
        </label>
        
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          Include additional information
        </label>
        <button
          type="submit"
          className='outline-none outline-BTBlue hover:bg-BTBlue-dark px-4 py-2 rounded-md mt-4'
        >
          Go to project Page
        </button>
      </form>
    </div>
  );
}

function ModalContent2() {
  return (
    <div style={{width: '100%'}}>
      <h1>Multi-Step Form</h1>
      <MultiStepForm />
    </div>
  );
}