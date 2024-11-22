// components/MultiStepForm.js
import React, { ChangeEvent, FormEvent, useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import { useRouter } from 'next/navigation';
import { OwnApiConnection } from '@/app/utils/OwnApiConnection';
import { getCookie, setCookie } from '@/app/utils/cookieUtils';

interface FormData {
    name: string;
    description: string;
    team: string;
}

async function fetchProjecttNumberFromAPI() {
  try {
    const constring = OwnApiConnection + '/Project/GetAvailableProjectID';
    //console.log('ConString: ', constring);
    
    const response = await fetch(constring);
    if (!response.ok) {
      throw new Error('Failed to fetch number');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching number:', error);
    return null;
  }
}

async function sendProjectToAPI(id: any, projectInfo: FormData) {
  try {
    const ownerIDCookie = getCookie("UserID");

    const sendData = {
      id: parseInt(id),
      name: projectInfo.name,
      teamID: parseInt(projectInfo.team),
      ownerID: ownerIDCookie ? parseInt(ownerIDCookie) : -1,
      description: projectInfo.description
    }

    //console.log('senders data: ', sendData);

    const response = await fetch(OwnApiConnection + '/Project/CreateProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      //console.log('Response:', result);
      return result;
  } catch (error) {
    console.error('Error Project creation:', error);
    return null;
  }
}

const MultiStepForm = () => {
  const router = useRouter(); // Ensure this hook is used correctly

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    team: '-1'
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (input: keyof FormData) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [input]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    //console.log(formData);

    try{
      //get available id
      const id = await fetchProjecttNumberFromAPI();
      console.log('id: ', id);
      if(id === null)
      {
        throw new Error('Failed to get project number');
      }

      //send this data to the api
      const result = await sendProjectToAPI(id, formData);
      if(!result){
        throw new Error('Failed to create project');
      }

      //after result reroute the page to the project pages
      //supposed to be link: `/Project?projectID=${projectID}`;
      //router.push(`/Project?name=${formData.name}&team=${formData.team}`);
      
      setCookie("projectID", id);
      router.push("/Project");
    } catch(error){
      console.error('Error in handleSubmit:', error);
    }
  };

  switch (step) {
    case 1:
      return (
        <Step1
          formData={formData}
          handleChange={handleChange}
          nextStep={nextStep}
        />
      );
    case 2:
      return (
        <Step2
          formData={formData}
          handleChange={handleChange}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      );
    default:
      return <div>Multi-Step Form</div>;
  }
};

export default MultiStepForm;
