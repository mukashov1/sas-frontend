import React, { useState } from 'react'
import { BsFillXCircleFill, BsCheckCircleFill } from 'react-icons/bs'
import SubjectStat from './subjectStatistics'

const subjects = [
  { name: 'History', present: 15, absent: 2 },
  { name: 'Math', present: 10, absent: 5 },
  { name: 'Programming', present: 1, absent: 3 },
  { name: 'Design Pattern', present: 4, absent: 1 },
  { name: 'DBMS1', present: 9, absent: 2 },
  { name: 'DBMS2', present: 5, absent: 6 },
]

export default function Statistics() {
  const [subjectData, setSubjectData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  function handleButtonClick() {
    setShowDropdown(!showDropdown);
  }

  return (
    <div className="statistics">
      <h2>Statistics</h2>
      <table>
        <thead>
          <tr>
            <th>SUBJECT</th>
            <th><i style={{ color: 'green' }}><BsCheckCircleFill /></i></th>
            <th><i style={{ color: 'red' }}><BsFillXCircleFill /></i></th>
            <th>%</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={index}>
              <td>{subject.name}</td>
              <td>{subject.present}</td>
              <td>{subject.absent}</td>
              <td>{`${(subject.absent / 15 * 100).toFixed(0)}%`}</td>
              <td><input type="radio" name="subject" id={index} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="dropdown-container">
        <button onClick={handleButtonClick}>Add Data</button>
        {showDropdown && (
          <div className="dropdown">
            <table>
              <thead>
                <tr>
                  {[...Array(10)].map((_, index) => (
                    <th key={index}>Date {index + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {[...Array(10)].map((_, index) => (
                    <td key={index}>
                      <input type="radio" name={`date-${index}`} value="attended" /> Attended
                      <br />
                      <input type="radio" name={`date-${index}`} value="absent" /> Absent
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
