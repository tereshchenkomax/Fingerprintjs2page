import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import AdminMain from "./Admin/AdminMain";
import DefaultScreen from "./DefaultScreen";

const App = () => (
	<Router>
		<div className="container is-fluid">
			<Switch>
				<Route exact path='/' component={DefaultScreen}/>
				<Route exact path='/admin' component={AdminMain}/>
			</Switch>
		</div>
	</Router>
);

export default App;
