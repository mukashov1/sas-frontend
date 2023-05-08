import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import { BsArrowLeft } from 'react-icons/bs'
import { CgFile } from 'react-icons/cg'
import $api from '../../http/api';


export default function SpecialReason() {
  const [selectedName, setSelectedName] = useState(null);
  const [reasons, setReasons] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await $api.get("/reasons");
    setReasons(response.data);
  }

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

  const handleApprove = async () => {
    try {
      const updatedReason = { ...selectedName, status: 'APPROVED' };
      await $api.put(`/reasons/${selectedName.reasonId}`, updatedReason);
      setSelectedName(null);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeny = async () => {
    try {
      const updatedReason = { ...selectedName, status: 'DENIED' };
      await $api.put(`/reasons/${selectedName.reasonId}`, updatedReason);
      setSelectedName(null);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const isDisabled = selectedName && (selectedName.status === "APPROVED" || selectedName.status === "DENIED");

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
          <button className='approve_btn' onClick={handleApprove}>Approve</button>
          <button className='deny_btn' onClick={handleDeny}>Deny</button>
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
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reasons.map((reason, index) => ((
            <tr key={index}>
              <td onClick={() => setSelectedName(reason)}>{reason.firstName} {reason.lastName}</td>
              <td>{reason.studentId}</td>
              <td>{reason.reasonType}</td>
              <td>{reason.status}</td>
            </tr>
          )
          ))}
        </tbody>
      </table>
    </div>
  )
}