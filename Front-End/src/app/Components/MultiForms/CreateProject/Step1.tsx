// components/Step1.js
import React, { ChangeEvent } from 'react';

interface Step1Props {
    formData: {
      name: string;
      description: string;
    };
    handleChange: (input: keyof Step1Props['formData']) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    nextStep: () => void;
  }

const Step1: React.FC<Step1Props> = ({ formData, handleChange, nextStep }) => {
  return (
    <div>
      <h2>Step 1: Name and Description</h2>
      <form>
        <br />
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            className='outline-none outline-BTBlue px-4 py-2 rounded-md mt-4'
            value={formData.name}
            onChange={handleChange('name')}
            style={{display: "block", width: '100%'}}
            required
          />
        </div>
        <br />
        <div>
          <label>Description (optional)</label>
          <textarea
            name="description"
            className='outline-none outline-BTBlue px-4 py-2 rounded-md mt-4'
            value={formData.description}
            style={{display: "block", width: '100%'}}
            onChange={handleChange('description')}
          />
        </div>
        <button className='bg-BTBlue hover:bg-BTBlue-dark px-4 py-2 mt-4' type="button" onClick={nextStep}>
          Next
        </button>
      </form>
    </div>
  );
};

export default Step1;
