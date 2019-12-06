import React, {Fragment, useState, useEffect} from 'react';
import Chat from './Chat';
import UserInfo from './UserInfo';
import {Loading} from './Loading'
import {fakeFingerprintArray, fingerprint} from '../helpers/fingerprint';
import request from '../helpers/request';

let fingerprintArray;

const MainPage = () => {
	const [name, setName] = useState(null);
	const [id, setId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		async function getUserName() {
			setIsError(false);
			setLoading(true);

			try {
				fingerprintArray = await fingerprint();
				let response = await request('/users', 'POST', fingerprintArray);
				const json = await response.json();
				setName(json.name);
				setId(json.id);
				setLoading(false)
			} catch (e) {
				setIsError(true);
			}
		}

		getUserName();
		return function cleanup() {
			controller.abort();
		}
	}, [name]);
	return (
		<Fragment>
			{isError && <div className='is-danger'>Something went wrong ...</div>}
			{loading ? (
				<Loading/>
			) : (
				<div className='tile is-ancestor '>
					<Chat name={name} id={id}/>
					<UserInfo fingerprintArray={fingerprintArray} name={name}/>
				</div>
			)}
		</Fragment>
	)
};

export default MainPage;
