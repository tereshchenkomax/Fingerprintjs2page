import React from 'react';


const UserName = ({name}) => {
	return (
		<div className="tile is-child box notification is-primary">
			Friendly name: {name}
		</div>
	)
};

const UserInfo = ({fingerprintArray, name}) => {
	return (
		<div className="tile is-parent is-vertical">
			<UserName name={name}/>
			<div className="tile is-child box notification is-success">
				<ul>
					{fingerprintArray ? fingerprintArray.map(item => <li key={item.key}>{item.value}</li>) : null}
				</ul>
			</div>
		</div>
	);
};

export default UserInfo;
