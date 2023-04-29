import React, { useState } from 'react';
import WeeklySchedule from '../student/weeklySchedule';

const statusClassNames = {
  "Entry": 'active',
  "Accepted": 'accepted',
  'Not active': 'not_active',
};

export default function Absence() {
  const [showSchedule, setShowSchedule] = useState(false);

  const toggleSchedule = () => {
    setShowSchedule(true);
  };

  const handleStatusClick = (subject) => {
    if (subject.status === "Entry") {
      setTimeout(() => {
        // Set the status to "Exit" after 1 minute
        const updatedSubjects = subjects.map(s => {
          if (s.name === subject.name) {
            return { ...s, status: "Exit" };
          }
          return s;
        });
        // Update the state with the new subjects array
        setSubjects(updatedSubjects);
      }, 0.3 * 60 * 1000); // 1 minute in milliseconds
    } else if (subject.status === "Exit") {
      // Set the status back to "Entry" if it was previously "Exit"
      const updatedSubjects = subjects.map(s => {
        if (s.name === subject.name) {
          return { ...s, status: "Entry" };
        }
        return s;
      });
      // Update the state with the new subjects array
      setSubjects(updatedSubjects);
    }
  };
  

  const [subjects, setSubjects] = useState([
    { name: 'History', absence: '13%', group: '05-N', room: 'F312', status: 'Accepted' },
    { name: 'Math', absence: '5%', group: '02-P', room: 'B125', status: 'Entry' },
    { name: 'Science', absence: '10%', group: '01-N', room: 'C301', status: 'Not active' },
    { name: 'English', absence: '8%', group: '03-N', room: 'A210', status: 'Not active' },
  ]);

  console.log("POST: before")
  // const response = await AttendanceService.lessons("200107119");
  console.log("POST: after")
  // console.log('ABSENCE  studentId  ' + JSON.parse(localStorage.getItem('user')).studentId + " responce: " + response)

  return (
    <div className="main">
      <h2>Dashboard</h2>
      {!showSchedule && (
        <>
          <table>
            <thead>
              <tr>
                <th>SUBJECT</th>
                <th>ABSENCE</th>
                <th>GROUP</th>
                <th>ROOM</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map(subject => (
                <tr key={subject.name} className={statusClassNames[subject.status]} onClick={() => handleStatusClick(subject)}>
                  <td>{subject.name}</td>
                  <td>{subject.absence}</td>
                  <td>{subject.group}</td>
                  <td>{subject.room}</td>
                  <td><a href="#">{subject.status}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={toggleSchedule}>Show Week Schedule</button>
        </>
      )}
      {showSchedule && (
        <div>
          <button onClick={() => setShowSchedule(false)}>Back to Subjects</button>
          <WeeklySchedule />
        </div>
      )}
    </div>
  );
}
