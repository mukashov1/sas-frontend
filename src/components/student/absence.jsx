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
  const [subjects, setSubjects] = useState(JSON.parse(localStorage.getItem('lessons')))

  const today = new Date().toString().split(" ")[0]
  let todayLessons = []
  for (let index = 0; index < subjects.length; index++) {
    const subject = subjects[index];
    if (subject.time.split(' ')[0] === today)
      todayLessons.push(subject)
  }

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
              localStorage.setItem('lessons', JSON.stringify(updatedSubjects.map(({ timerRunning, ...rest }) => rest)));
              return updatedSubjects;
            });
          }, 5 * 1000);
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
      localStorage.setItem('lessons', JSON.stringify(updatedSubjects.map(({ timerRunning, ...rest }) => rest)));
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

  return (
    <div className="main">
      <h2>Dashboard</h2>
      {!showSchedule && (
        <>
          <table>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>SUBJECT</th>
                <th>GROUP</th>
                <th>ROOM</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {todayLessons.map(lesson => (
                <tr key={lesson.lessonName} className={statusClassNames[lesson.status]}>
                  <td>{lesson.courseId}</td>
                  <td>{lesson.lessonName}</td>
                  <td>{lesson.group}</td>
                  <td>{lesson.room}</td>
                  <td><button onClick={() => handleStatusClick(lesson)}>{lesson.status}</button></td>
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
