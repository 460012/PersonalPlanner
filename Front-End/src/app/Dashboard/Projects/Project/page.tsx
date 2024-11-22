'use client'

import { useSearchParams  } from 'next/navigation';
import React, { useEffect, useState } from 'react';
//import Layout from '@/app/Dashboard/layout'
import { getCookie } from '@/app/utils/cookieUtils';

const Project = () => {
  // const searchParams = useSearchParams();
  // const name = searchParams.get('name');
  // const team = searchParams.get('team');
  // const projectID = searchParams.get('projectID');
  const projectID = getCookie("projectID");

  return (
    // <Layout useProjectSideNav={true}>
      <div>
        <h1>Project page</h1>
        {projectID && <p>Project ID: {projectID}</p>}
      </div>
    // </Layout>
  );
};

export default Project;
