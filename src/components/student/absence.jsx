import React, { useState } from 'react';
import WeeklySchedule from '../student/weeklySchedule';

const statusClassNames = {
  "Entry": 'active',
  "Exit": 'active',
  "Accepted": 'accepted',
  "Absent": 'absent',
  'Not active': 'not_active',
  "In Class": 'active',
};

export default function Absence() {
  const [showSchedule, setShowSchedule] = useState(false);
  const [timers, setTimers] = useState({});
  const [buttonClicked, setButtonClicked] = useState(false);

  const toggleSchedule = () => {
    setShowSchedule(true);
  };

  const handleStatusClick = (subject) => {
    if (subject.status === "Entry") {
      const updatedSubjects = subjects.map(s => {
        if (s.name === subject.name) {
          return { ...s, status: "In Class" };
        }
        return s;
      });
      setSubjects(updatedSubjects);
  
      const exitTimer = setTimeout(() => {
        const updatedSubjects = subjects.map(s => {
          if (s.name === subject.name) {
            return { ...s, status: "Exit" };
          }
          return s;
        });
        setSubjects(updatedSubjects);
      }, 10 * 1000); // 10 seconds in milliseconds
  
      // Store the exitTimer in the subject's object
      const subjectsWithTimer = subjects.map(s => {
        if (s.name === subject.name) {
          return { ...s, exitTimer };
        }
        return s;
      });
      setSubjects(subjectsWithTimer);
    } else if (subject.status === "Exit") {
      setButtonClicked(false);
  
      const absentTimer = setTimeout(() => {
        if (!buttonClicked) {
          const updatedSubjects = subjects.map(s => {
            if (s.name === subject.name) {
              return { ...s, status: "Absent" };
            }
            return s;
          });
          setSubjects(updatedSubjects);
        }
      }, 6 * 1000); // 6 seconds in milliseconds
  
      // Clear the exitTimer when the button is clicked during the 10 seconds
      clearTimeout(subject.exitTimer);
    }
  };  

  const handleButtonClick = (subject) => {
    setButtonClicked(true);
  
    clearTimeout(timers[subject.name]);
  
    const updatedSubjects = subjects.map(s => {
      if (s.name === subject.name) {
        return { ...s, status: "Accepted" };
      }
      return s;
    });
    setSubjects(updatedSubjects);
  };

  const [subjects, setSubjects] = useState([
    { name: 'History', absence: '13%', group: '05-N', room: 'F312', status: 'Accepted' },
    { name: 'Math', absence: '5%', group: '02-P', room: 'B125', status: 'Entry' },
    { name: 'Science', absence: '10%', group: '01-N', room: 'C301', status: 'Not active' },
    { name: 'English', absence: '8%', group: '03-N', room: 'A210', status: 'Not active' },
  ]);

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
                <tr key={subject.name} className={statusClassNames[subject.status]}>
                  <td>{subject.name}</td>
                  <td>{subject.absence}</td>
                  <td>{subject.group}</td>
                  <td>{subject.room}</td>
                  <td><button onClick={() => handleStatusClick(subject)}>{subject.status}</button></td>
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
