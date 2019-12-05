import React, {useState} from 'react';
import './App.css';
import IdentifyScreen from "./IdentifyScreen";
import MainPage from "./MainPage";

function MainScreen() {

	const [identified, setIdentified] = useState(false);

	const renderInfo = () => {
		return (!identified) ? setIdentified(true) : null
	};


	if (!identified) {
		return (
			<IdentifyScreen renderInfo={renderInfo}/>
		)
	} else {
		return (
			<MainPage/>
		)
	}
}

export default MainScreen;
