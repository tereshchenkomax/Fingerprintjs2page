import React from 'react'
import './Users.css'

const User = ({users}) => {
	if (users ) {
		return (
			<div>
				<h3>Online users</h3>
				<div className='conversation-list list'>
					{users.map(user => <div className='conversation-list-item' key={user.id}>{user.name}</div>)}
				</div>
			</div>
		)
	}
	return (
		<div>No users</div>
	)
};

export default User
