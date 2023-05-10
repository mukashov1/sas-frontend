import React, { useState } from 'react'
import { BsFillXCircleFill, BsCheckCircleFill, BsHandIndexThumbFill, BsFillFileEarmarkPdfFill } from 'react-icons/bs'
import { FaAngleDown, FaParking } from 'react-icons/fa'

const subjects = [
  {
    name: 'History', present: 15, absent: 2,
    attendance: ['present', 'absent', 'present', 'present', 'absent', 'present', 'present', 'present', 'present', 'present', 'present', 'present', 'absent', 'present', 'present', 'absent',],
    dates: ['01.03', '02.03', '03.03', '04.03', '05.03', '06.03', '07.03', '08.03', '09.03', '10.03', '11.03', '12.03', '13.03', '14.03', '15.03', '16.03', '17.03']
  },
  {
    name: 'Math', present: 10, absent: 5, attendance: ['present', 'manual', 'present', 'present', 'absent', 'present', 'present', 'present', 'present', 'present'],
    dates: ['01.03', '02.03', '03.03', '04.03', '05.03', '06.03', '07.03', '08.03', '09.03', '10.03', '11.03', '12.03', '13.03', '14.03', '15.03', '16.03', '17.03'],
  },
  {
    name: 'Programming', present: 1, absent: 3, attendance: ['present', 'absent', 'present', 'present', 'absent', 'present', 'present', 'present', 'present', 'present'],
    dates: ['01.03', '02.03', '03.03', '04.03', '05.03', '06.03', '07.03', '08.03', '09.03', '10.03', '11.03', '12.03', '13.03', '14.03', '15.03', '16.03', '17.03'],
  },
  {
    name: 'Design Pattern', present: 4, absent: 1, attendance: ['present', 'absent', 'present', 'present', 'absent', 'present', 'present', 'present', 'present', 'present'],
    dates: ['01.03', '02.03', '03.03', '04.03', '05.03', '06.03', '07.03', '08.03', '09.03', '10.03', '11.03', '12.03', '13.03', '14.03', '15.03', '16.03', '17.03'],
  },
  {
    name: 'DBMS1', present: 9, absent: 2, attendance: ['reason', 'absent', 'present', 'present', 'absent', 'present', 'present', 'present', 'present', 'present'],
    dates: ['01.03', '02.03', '03.03', '04.03', '05.03', '06.03', '07.03', '08.03', '09.03', '10.03', '11.03', '12.03', '13.03', '14.03', '15.03', '16.03', '17.03'],
  },
  {
    name: 'DBMS2', present: 5, absent: 6, attendance: ['present', 'absent', 'present', 'present', 'absent', 'present', 'present', 'present', 'present', 'present'],
    dates: ['01.03', '02.03', '03.03', '04.03', '05.03', '06.03', '07.03', '08.03', '09.03', '10.03', '11.03', '12.03', '13.03', '14.03', '15.03', '16.03', '17.03'],
  },
]

// const subjects = JSON.parse(localStorage.getItem('subjects'))

function Dropdown({ subject }) {
  return (
    <div className='dropdown'>
      <ul>
        <li>
          <strong>Date</strong>
          {subject.dates.map((date, index) => (
            <span key={date}>{date}</span>
          ))}
        </li>
        <li>
          <strong>Attendance</strong>
          {subject.dates.map((date, index) => (
            <span key={date}>
              {subject.attendance[index] === 'manual' ? (
                <i style={{ color: 'green' }}><BsHandIndexThumbFill /></i>
              ) : subject.attendance[index] === 'present' ? (
                <i style={{ color: 'green' }}><BsCheckCircleFill /></i>
              ) : subject.attendance[index] === 'reason' ? (
                <i style={{ color: 'blue' }}><FaParking /></i>
              ) : (
                <i style={{ color: 'red' }}><BsFillXCircleFill /></i>
              )}
            </span>
          ))}
        </li>
      </ul>
    </div>
  );
}


export default function Statistics() {
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState([])

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
    <div className={`statistics${showDropdown ? " statistics-scrollable" : ""}`}>
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
                  <td colSpan={6} className='col-6'>
                    <Dropdown subject={subject} dates={['01.03', '02.03', '03.03', '04.03', '05.03', '06.03', '07.03', '08.03', '09.03', '10.03', '10.03', '10.03', '10.03', '10.03', '10.03', '10.03', '10.03']} />
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
