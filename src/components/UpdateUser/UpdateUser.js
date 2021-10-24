import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UpdateUser = () => {
    const { id } = useParams()
    const [user, setUser] = useState({})

    useEffect(() => {
        fetch(`http://localhost:5000/users/${id}`)
            .then(res => res.json())
            .then(data => setUser(data))
    }, [])

    const handleUserName = (e) => {
        const name = e.target.value
        const updateUser = { name: name, email: user.email }
        setUser(updateUser)
    }
    const handleUserEmail = (e) => {
        const email = e.target.value
        const updateUser = { name: user.name, email: email }
        setUser(updateUser)
    }

    const handleUpdateForm = (e) => {
        e.preventDefault()

        fetch(`http://localhost:5000/users/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Update Success')
                }
            })
    }


    return (
        <div>
            <h2>{user.name} - {user.email}</h2>

            <form onSubmit={handleUpdateForm}>
                <input type="text" value={user.name} onChange={handleUserName} placeholder='name' />
                <input type="email" value={user.email} onChange={handleUserEmail} placeholder='email' />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdateUser;