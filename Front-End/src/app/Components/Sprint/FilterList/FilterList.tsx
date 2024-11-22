import React, { useState, ChangeEvent } from 'react';

interface Sprint {
  id: number;
  name: string;
}

interface SprintFiltersProps {
  sprints: Sprint[];
  handleCheckChange: (sprint: Sprint, checked: boolean) => void;
}

const SprintFilters: React.FC<SprintFiltersProps> = ({ sprints, handleCheckChange }) => {
  const [checkedSprints, setCheckedSprints] = useState<number[]>([]);

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    const sprintId = parseInt(id, 10);

    if (checked) {
      setCheckedSprints([...checkedSprints, sprintId]);
    } else {
      setCheckedSprints(checkedSprints.filter(sprintId => sprintId !== sprintId));
    }

    const sprint = sprints.find(sprint => sprint.id === sprintId);
    if (sprint) {
      handleCheckChange(sprint, checked);
    }
  };

  return (
    <div>
      {sprints.map((sprint) => (
        <div key={sprint.id}>
          <input
            type="checkbox"
            id={sprint.id.toString()}
            checked={checkedSprints.includes(sprint.id)}
            onChange={handleCheck}
          />
          <label htmlFor={sprint.id.toString()}>{" " + sprint.name}</label>
        </div>
      ))}
    </div>
  );
};

export default SprintFilters;
