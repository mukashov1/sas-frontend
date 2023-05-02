import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import { BsArrowLeft } from 'react-icons/bs'
import { CgFile } from 'react-icons/cg'


export default function SpecialReason() {
  const [selectedName, setSelectedName] = useState(null);
  const [reasons, setReasons] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("https://sasserver.software/api/reasons");
      setReasons(response.data);
      setSelectedName(response.data[0]);
      console.log("Reason   " + Object.values(reasons[0]))
    }

    fetchData();
  }, []);

  const handleDownload = (name, data) => {
    const base64String = Buffer.from(data, 'base64').toString('binary')
    const downloadLink = document.createElement("a");
    downloadLink.href = base64String;
    downloadLink.download = name;
    downloadLink.click();
  }

  const handleReturnClick = () => {
    setSelectedName(null);
  }

  if (selectedName) {
    const { firstName, lastName, studentId, reasonType, comment, fileName, document } = selectedName;
    return (
      <div className='admin_reason'>
        <h2 onClick={handleReturnClick}><BsArrowLeft /> Reasons</h2>
        <p><b>Full Name:</b>  {firstName} {lastName}</p>
        <p><b>ID:</b> {studentId}</p>
        <p><b>Reason:</b> {reasonType}</p>
        <p><b>Attached File:</b></p>
        <p className='reason_file' onClick={() => handleDownload(fileName, document)}><i><CgFile /></i>  {fileName}</p>
        <p><b>Comment:</b></p>
        <div className="admin_comment"><p>{comment ? comment : 'No comment'}</p></div>
        <div className="admin_decision">
          <button className='approve_btn'>Approve</button>
          <button className='deny_btn'>Deny</button>
        </div>
      </div>
    )
  }

  return (
    <div className='admin_reasons'>
      <h2>Absence Reason</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {reasons.map((reason, index) => (
            <tr key={index}>
              <td onClick={() => setSelectedName(reason)}>{reason.firstName} {reason.lastName}</td>
              <td>{reason.studentId}</td>
              <td>{reason.firstName}</td>
              <td>{reason.lastName}</td>
              <td>{reason.reasonType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
