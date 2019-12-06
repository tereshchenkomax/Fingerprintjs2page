import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import AdminMain from "./Admin/AdminMain";
import MainScreen from "./MainScreen";

const App = () => (
	<Router>
		<div className="container is-fluid">
			<Switch>
				<Route exact path='/' component={MainScreen}/>
				<Route exact path='/admin' component={AdminMain}/>
			</Switch>
		</div>
	</Router>
);

export default App;
