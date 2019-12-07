import React from 'react';
import ShowMoreText from 'react-show-more-text';

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
				<ShowMoreText lines={5}>
					<ul>
						{fingerprintArray ? fingerprintArray.map(item => <li key={item.key}>{item.key} : {item.value.toString()}</li>) : null}
					</ul>
				</ShowMoreText>
			</div>
		</div>
	);
};

export default UserInfo;
