import React, { useState } from 'react';

export default function SearchResult({ user, onRequest, onAddToPermitted }) {

    const [requested, setRequested] = useState(false);

    const handleRequestClick = () => {
        setRequested(true);
        onRequest();
        onAddToPermitted(user);
    };

    return (
        <tr>
            <td>{user.name} {user.surname}</td>
            <td>{user.id}</td>
            <td>{user.status}</td>
            <td>
                <button onClick={handleRequestClick} disabled={requested}>
                    {requested ? 'Requested' : 'Request'}
                </button>
            </td>
        </tr>
    )
}