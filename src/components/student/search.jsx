import React, { useState } from 'react';
import SearchResult from './searchResult';
import { BsSearch, BsArrowLeft } from 'react-icons/bs'

const users = [
  { id: 1, name: 'John', surname: 'Doe', status: 'studen' },
  { id: 2, name: 'Jane', surname: 'Doe', status: 'teacher' },
  { id: 3, name: 'Bob', surname: 'Smith', status: 'admin' },
  { id: 4, name: 'Alice', surname: 'Johnson', status: 'student' },
];

const subjects = [
  {
    name: 'Design Pattern', code: 'CSS 200', students: [
      { id: 1, name: 'John', surname: 'Doe', present: 13, absent: 2 },
      { id: 2, name: 'Jane', surname: 'Doe', present: 10, absent: 2 },
      { id: 3, name: 'Bob', surname: 'Smith', present: 8, absent: 2 },
      { id: 4, name: 'Alice', surname: 'Johnson', present: 6, absent: 2 },
    ]
  },
  {
    name: 'DBMS2', code: 'CSS 201', students: [
      { id: 1, name: 'John', surname: 'Doe', present: 13, absent: 2 },
      { id: 2, name: 'Jane', surname: 'Doe', present: 10, absent: 2 },
      { id: 3, name: 'Bob', surname: 'Smith', present: 8, absent: 2 },
      { id: 4, name: 'Alice', surname: 'Johnson', present: 6, absent: 2 },
    ]
  },
  {
    name: 'Programming', code: 'CSS 202', students: [
      { id: 1, name: 'John', surname: 'Doe', present: 13, absent: 2 },
      { id: 2, name: 'Jane', surname: 'Doe', present: 10, absent: 2 },
      { id: 3, name: 'Bob', surname: 'Smith', present: 8, absent: 2 },
      { id: 4, name: 'Alice', surname: 'Johnson', present: 6, absent: 2 },
    ]
  },
  {
    name: 'Histoty', code: 'CSS 203', students: [
      { id: 1, name: 'John', surname: 'Doe', present: 13, absent: 2 },
      { id: 2, name: 'Jane', surname: 'Doe', present: 10, absent: 2 },
      { id: 3, name: 'Bob', surname: 'Smith', present: 8, absent: 2 },
      { id: 4, name: 'Alice', surname: 'Johnson', present: 6, absent: 2 },
    ]
  },
];

export default function Search({ onClose, handleUserRequest }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = event => {
    event.preventDefault();
    const filteredResults = users.filter(user =>
      Object.values(user).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setSearchResults(filteredResults);
  };

  const handleAddToPermitted = user => {
    handleUserRequest(user);
  };

  return (
    <div className='search'>
      <h2 onClick={onClose}><BsArrowLeft />  Settings / Authorize registration</h2>
      <h4>Authorized for Special Reasons</h4>
      <form onSubmit={handleSearchSubmit}>
        <BsSearch />
        <input type="text" placeholder='Samat' value={searchTerm} onChange={handleSearchChange} />
        <button type="submit">Search</button>
      </form>
      {searchResults.length > 0 ? (
        <div className='search_results'>
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>ID</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map(user => (
                <SearchResult
                  key={user.id}
                  user={user}
                  onRequest={() => { }}
                  onAddToPermitted={handleAddToPermitted}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};
