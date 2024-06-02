import AssignmentForm from "./AssignmentForm.jsx";
import TodoContainer from "./TodoContainer.jsx";
import InProgressContainer from "./InProgressContainer.jsx";
import DoneContainer from "./DoneContainer.jsx";
import { assignmentsRef } from "../utils/firebaseConfig.js";
import { onValue } from "firebase/database";
import { useState, useEffect } from "react";

export function App() {
  const [assignmentsList, setAssignmentsList] = useState([]);

  // Get data and update state when database updates
  useEffect(() => {
    const handleData = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const assignmentsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setAssignmentsList(assignmentsArray);
      } else {
        alert('No assignments found');
      }
    };

    onValue(assignmentsRef, handleData);
  }, []);

  //colours for buttons and cards
  const categoryColors = {
    frontend: 'aqua',
    backend: 'lightcoral',
    ux: 'lightgreen'
  };

  return (
    <>
      <head>
        <h1>Scrum Board</h1>
        <AssignmentForm />
        <div>
          <button style={{ backgroundColor: categoryColors.frontend }}>Frontend</button>
          <button style={{ backgroundColor: categoryColors.backend }}>Backend</button>
          <button style={{ backgroundColor: categoryColors.ux }}>UX</button>
        </div>
      </head>
      <body>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '30%' }}>
            <h2>To do</h2>
            {assignmentsList.filter(assignment => assignment.status === 'To do').map(assignmentPostIt => (
              <div key={assignmentPostIt.id} style={{ backgroundColor: categoryColors[assignmentPostIt.category] }}>
                <TodoContainer assignmentPostIt={assignmentPostIt} />
              </div>
            ))}
          </div>
          <div style={{ width: '30%' }}>
            <h2>In Progress</h2>
            {assignmentsList.filter(assignment => assignment.status === 'In progress').map(assignmentPostIt => (
              <div key={assignmentPostIt.id} style={{ backgroundColor: categoryColors[assignmentPostIt.category] }}>
                <InProgressContainer assignmentPostIt={assignmentPostIt} />
              </div>
            ))}
          </div>
          <div style={{ width: '30%' }}>
            <h2>Done</h2>
            {assignmentsList.filter(assignment => assignment.status === 'Done').map(assignmentPostIt => (
              <div key={assignmentPostIt.id} style={{ backgroundColor: categoryColors[assignmentPostIt.category] }}>
                <DoneContainer assignmentPostIt={assignmentPostIt} />
              </div>
            ))}
          </div>
        </div>
      </body>
    </>
  );
}