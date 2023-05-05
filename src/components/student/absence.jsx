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
    if (subject.status === "Entry" && !subject.timerRunning) {
      const updatedSubjects = subjects.map(s => {
        if (s.name === subject.name) {
          return { ...s, timerRunning: true, status: "In Class" };
        }
        return s;
      });
      setSubjects(updatedSubjects);

      setTimeout(() => {
        setSubjects(prevSubjects => {
          const updatedSubjects = prevSubjects.map(s => {
            if (s.name === subject.name) {
              return { ...s, status: "Exit", timerRunning: false };
            }
            return s;
          });
          const exitTimer = setTimeout(() => {
            setSubjects(prevSubjects => {
              const updatedSubjects = prevSubjects.map(s => {
                if (s.name === subject.name) {
                  return { ...s, status: "Absent" };
                }
                return s;
              });
              return updatedSubjects;
            });
          }, 10 * 1000);
          const subjectsWithTimer = updatedSubjects.map(s => {
            if (s.name === subject.name) {
              return { ...s, exitTimer };
            }
            return s;
          });
          return subjectsWithTimer;
        });
      }, 10 * 1000);
    } else if (subject.status === "Exit") {
      clearTimeout(subject.exitTimer);

      const updatedSubjects = subjects.map(s => {
        if (s.name === subject.name) {
          return { ...s, status: "Accepted" };
        }
        return s;
      });
      setSubjects(updatedSubjects);
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
