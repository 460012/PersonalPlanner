// app/project/layout.tsx
import React from 'react';
import DashboardLayout from '../Dashboard/layout';

const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout useProjectSideNav={true}>
      {children}
    </DashboardLayout>
  );
};

export default ProjectLayout;
