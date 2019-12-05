import React, {Fragment, useState, useEffect} from 'react';
import Chat from './Chat';
import UserInfo from './UserInfo';
import {Loading} from './Loading'
import {fakeFingerprintArray, fingerprint} from '../helpers/fingerprint';
import request from '../helpers/request';

let fingerprintArray;

// if (process.env.NODE_ENV === 'development') { //todo remove before pushing
// 	fingerprintArray = fakeFingerprintArray;
// }

const MainPage = () => {
	const [name, setName] = useState(null);
	const [loading, setLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		async function getUserName() {
			setIsError(false);
			setLoading(true);
			try {
				fingerprintArray = await fingerprint(); //todo remove before final
				let response = await request('/users', 'POST', fingerprintArray);
				const json = await response.json();
				setName(json.name);
				setLoading(false)
			} catch (e) {
				setIsError(true);
			}
		}

		getUserName()
	}, [name]);
	return (
		<Fragment>
			{isError && <div className='is-danger'>Something went wrong ...</div>}
			{loading ? (
				<Loading/>
			) : (
				<div className='tile is-ancestor '>
					<Chat name={name}/>
					<UserInfo fingerprintArray={fingerprintArray} name={name}/>
				</div>
			)}
		</Fragment>
	)
};

export default MainPage;
