import React, { useState } from 'react';

export default function SpecialReason() {
  const [selectedName, setSelectedName] = useState(null);

  const handleDownload = (name, data) => {
    const base64String = Buffer.from(data, 'base64').toString('binary')
    const downloadLink = document.createElement("a");
    downloadLink.href = base64String;
    downloadLink.download = name + ".pdf";
    downloadLink.click();
  }

  const handleReturnClick = () => {
    setSelectedName(null);
  }

  if (selectedName) {
    const { name, data } = selectedName;
    return (
      <div>
        <button onClick={handleReturnClick}>Return</button>
        <h2>Absence Reason</h2>
        <div>
          <p>Name: {name}</p>
          <button onClick={() => handleDownload(name, data)}>Download PDF</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>Absence Reason</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Reason</th>
            <th>Checkbox</th>
          </tr>
        </thead>
        <tbody>
          {reasons.map((reason, index) => (
            <tr key={index} onClick={() => setSelectedName({ name: reason.studentId, data: reason.document })}>
              <td>{reason.studentId}</td>
              <td>{reason.reasonType}</td>
              <td>{reason.fromDate}</td>
              <td><input type="checkbox" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
