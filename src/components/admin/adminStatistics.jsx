import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs'
import Statistics from '../admin/adminAttendance';

const users = [
  { id: 1, name: 'John', surname: 'Doe', degree: 'Bachelor' },
  { id: 2, name: 'Jane', surname: 'Doe', degree: 'Bachelor' },
  { id: 3, name: 'Bob', surname: 'Smith', degree: 'Bachelor' },
  { id: 4, name: 'Alice', surname: 'Johnson', degree: 'Bachelor' },
];


export default function AdminStatistics() {
  const [individualSearchTerm, setIndividualSearchTerm] = useState('');
  const [matchingUser, setMatchingUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleIndividualSearchTermChange = (event) => {
    setIndividualSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch('https://sasserver.software/api/searchStudents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: individualSearchTerm,
        }),
      });
      const data = await response.json();

      if (data && data.length > 0) {
        setMatchingUser(data);
      } else {
        setMatchingUser(null);
      }
      console.log("Matching user: " + Object.values(matchingUser))
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className='admin_statistics'>
      {!selectedUser && (<>
        <h2>Statistics</h2>
        <div className="filter">
          <BsSearch />
          <input type="text" placeholder='search by name, surname, ID' value={individualSearchTerm} onChange={handleIndividualSearchTermChange} />
          <button onClick={handleSearch}>Search</button>
        </div>
        {matchingUser && (
          <table className='searchTable'>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>ID</th>
                <th>Degree</th>
              </tr>
            </thead>
            <tbody>
              {matchingUser.map((user) => (
                <tr key={user.studentId}>
                  <td onClick={() => handleUserClick(user)}>
                    {user.user.firstName} {user.user.lastName}
                  </td>
                  <td>{user.studentId}</td>
                  <td>Bachelor</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>)}
      {selectedUser && <Statistics handleBack={() => setSelectedUser(null)} />}
    </div>
  );
};