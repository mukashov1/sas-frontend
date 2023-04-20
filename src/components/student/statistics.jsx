import React, { useState } from 'react'
import { BsFillXCircleFill, BsCheckCircleFill } from 'react-icons/bs'
import SubjectStat from './subjectStatistics'
import { FaAngleDown } from 'react-icons/fa'

const subjects = [
  { name: 'History', present: 15, absent: 2 , attendance: ['present', 'absent', 'present', 'present', 'absent', 'present', 'present', 'present', 'present', 'present']},
  { name: 'Math', present: 10, absent: 5 , attendance: ['present', 'absent', 'present', 'present', 'absent', 'present', 'present', 'present', 'present', 'present']},
  { name: 'Programming', present: 1, absent: 3 , attendance: ['present', 'absent', 'present', 'present', 'absent', 'present', 'present', 'present', 'present', 'present']},
  { name: 'Design Pattern', present: 4, absent: 1 , attendance: ['present', 'absent', 'present', 'present', 'absent', 'present', 'present', 'present', 'present', 'present']},
  { name: 'DBMS1', present: 9, absent: 2 , attendance: ['present', 'absent', 'present', 'present', 'absent', 'present', 'present', 'present', 'present', 'present']},
  { name: 'DBMS2', present: 5, absent: 6 , attendance: ['present', 'absent', 'present', 'present', 'absent', 'present', 'present', 'present', 'present', 'present']},
]

function Dropdown({ subject, dates }) {
  return (
    <div style={{ maxWidth: "80%", overflowX: "auto" }}>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            {dates.map((date) => (
              <td key={date}>{date}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Attendance</th>
            {dates.map((date, index) => (
              <td key={date}>{subject.attendance[index] === 'present' ? <i style={{ color: 'green' }}><BsCheckCircleFill /></i> : <i style={{ color: 'red' }}><BsFillXCircleFill /></i>}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}




export default function Statistics() {
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState(null)

  const handleDropdownClick = (subject) => {
    if (selectedSubject === subject) {
      setSelectedSubject(null)
      setShowDropdown(false)
    } else {
      setSelectedSubject(subject)
      setShowDropdown(true)
    }
  }

  const handleDropdownClose = () => {
    setSelectedSubject(null)
    setShowDropdown(false)
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
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{subject.name}</td>
                <td>{subject.present}</td>
                <td>{subject.absent}</td>
                <td>{`${(subject.absent / 15 * 100).toFixed(0)}%`}</td>
                <td><FaAngleDown onClick={() => handleDropdownClick(subject)} /></td>
              </tr>
              {showDropdown && selectedSubject === subject && (
                <tr>
                  <td colSpan={6}>
                    <Dropdown subject={subject} dates={['01.03', '02.03', '03.03', '04.03', '05.03', '06.03', '07.03', '08.03', '09.03', '10.03']}/>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {showDropdown && (
        <div className="dropdown-overlay" onClick={handleDropdownClose}>
        </div>
      )}
    </div>
  )
}
