// components/Step2.js
import React, { ChangeEvent, FormEvent } from 'react';

interface Step2Props {
    formData: {
        team: string;
    };
    handleChange: (input: keyof Step2Props['formData']) => (e: ChangeEvent<HTMLSelectElement>) => void;
    prevStep: () => void;
    handleSubmit: (e: FormEvent) => void;
}

interface Option {
    value: string;
    name: string;
  }

const Step2: React.FC<Step2Props> = ({ formData, handleChange, prevStep, handleSubmit }) => {
    //get the list from the api!!!
    const options: Option[] = [
        { value: '0', name: 'Team1' },
        { value: '10', name: 'Team2' },
        // Add more options as needed
      ];

  return (
    <div>
      <h2>Step 2: Team</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Team selection (optional)</label>
          {/* <input
            type="text"
            name="extraDetails"
            className='outline-none outline-BTBlue px-4 py-2 rounded-md mt-4'
            style={{display: "block", width: '100%'}}
            value={formData.extraDetails}
            onChange={handleChange('extraDetails')}
          /> */}
          <select name='team' value={formData.team} id='team' className='outline-none outline-BTBlue px-4 py-2 rounded-md mt-4' style={{display: "block", width: '100%'}} onChange={handleChange('team')}>
            <option value="-1">None</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>{option.name}</option>
            ))}
          </select>
        </div>
        <button className='bg-BTBlue hover:bg-BTBlue-dark px-4 py-2 mt-4' type="button" onClick={prevStep}>
          Back
        </button>
        <button className='bg-BTBlue hover:bg-BTBlue-dark px-4 py-2 mt-4' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Step2;
