import React from "react";
import {Button} from 'react-bulma-components';

export const Loading = () => {
    return (
        <div className='box notification'>
            <div className="level-item has-text-centered">
                <h3 className='subtitle is-3'>The objective of this application is to prove that your device is
                    individually distinguishable from any
                    other device in the world</h3>
            </div>
            <div className="level-item has-text-centered">
                <Button className='is-large is-primary is-outlined is-loading'>IDENTIFY ME NOW</Button>
            </div>
        </div>
    )
};
