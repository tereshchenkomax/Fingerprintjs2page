import React from 'react';
import { Button } from 'react-bulma-components';

const IdentifyScreen = ({renderInfo}) => {
	return (
		<div className="level-item has-text-centered">
			<Button
				className="is-large is-primary is-outlined"
				onClick={renderInfo}>IDENTIFY ME NOW</Button>
		</div>
	);
};

export default IdentifyScreen;
