// components/NameList.js

import { OwnApiConnection } from "@/app/utils/OwnApiConnection";
import { getCookie, setCookie } from "@/app/utils/cookieUtils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



const NameList = () => {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  //retrieve the list 
  // const projects = [
  //   { id: 101, name: 'ProjectExample1' },
  //   { id: 202, name: 'ProjectExample2' },
  //   { id: 404, name: 'ProjectExample3' },
  // ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const ownerIDCookie = getCookie("UserID");

        // const UserDTO = {
        //   id: ownerIDCookie ? parseInt(ownerIDCookie) : -1,
        //   email: ""
        // }
        // console.log('Sendit: ', UserDTO);

        const response = await fetch(OwnApiConnection + '/Project/GetAllYourRelatedProjects?UserID=' + ownerIDCookie);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
        setLoading(false); // Set loading to false after projects are fetched
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);


  const handleClick = (id: any) => {
    setCookie("projectID", id);

    router.push("/Project");
  }

  return (
    <div>
      {loading ? ( // Display loading message while projects are being fetched
        <p>Loading...</p>
      ) : (
        <ul>
          {projects.map(({ id, name }) => (
            <li key={id}>
              <a className="outline-none outline-BTBlue hover:bg-BTSecondary px-4 py-2 rounded-md mt-4" style={{ display: 'block' }} onClick={() => handleClick(id)}>{name}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NameList;
