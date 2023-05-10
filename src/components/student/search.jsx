import React, { useState } from 'react';
import SearchResult from './searchResult';
import { BsSearch, BsArrowLeft } from 'react-icons/bs'

export default function Search({ onClose, handleUserRequest }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const users = JSON.parse(localStorage.getItem('users'))

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async event => {
    event.preventDefault();

    try {
      const response = await fetch('https://sasserver.software/api/searchStudents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: searchTerm
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        setSearchResults([]);
        console.error('Error fetching search results:', response.statusText);
      }
    } catch (error) {
      setSearchResults([]);
      console.error('Error fetching search results:', error);
    }
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
        <input type="text" placeholder='ID, name, surname' value={searchTerm} onChange={handleSearchChange} />
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
              ) )}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};
