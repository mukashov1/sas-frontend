import React, { useState } from 'react';
import Search from './search';
import { RiDeleteBinLine } from 'react-icons/ri'

export default function Settings() {
  const [showSettings, setShowSettings] = useState(true);
  const [permittedUsers, setPermittedUsers] = useState([]);

  const handleRegisterClick = () => {
    setShowSettings(false);
  };

  const handleUserRequest = (user) => {
    setPermittedUsers([...permittedUsers, { ...user, status: 'requested' }]);
  };

  const handleUserDelete = (userId) => {
    setPermittedUsers(permittedUsers.filter(user => user.id !== userId));
  };

  return (
    <div className='settings_container'>
      {showSettings ? (
        <div className='setting'>
          <h2>Settings</h2>
          <h4>Authorized for Special Reasons</h4>
          {permittedUsers.length > 0 ? (
            <div className='permitted_users'>
              <table>
                {permittedUsers.map(user => (
                  <tr>
                    <td>{user.name}  {user.surname}</td>
                    <td>{user.id}</td>
                    <td>
                      <button>requested</button>
                    </td>
                    <td>
                      <i onClick={() => handleUserDelete(user.id)}><RiDeleteBinLine/></i>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          ) : (
            <div className='no_permitted'>
              <p>No one is registered.</p>
              <button onClick={handleRegisterClick}>Register</button>
            </div>
          )}
        </div>
      ) : (
        <Search handleUserRequest={handleUserRequest} onClose={() => setShowSettings(true)} />
      )}
    </div>
  )
}