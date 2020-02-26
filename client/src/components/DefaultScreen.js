import React, {Fragment, useState} from 'react';
import './App.css';
import IdentifyScreen from "./IdentifyScreen";
import MainPage from "./MainPage";

function DefaultScreen() {

	const [identified, setIdentified] = useState(false);

	const renderInfo = () => (!identified) ? setIdentified(true) : null;

	if (!identified) {
		return (
			<Fragment>
				<IdentifyScreen renderInfo={renderInfo}/>
			</Fragment>
		)
	} else {
		return (
			<MainPage/>
		)
	}
}

export default DefaultScreen;
