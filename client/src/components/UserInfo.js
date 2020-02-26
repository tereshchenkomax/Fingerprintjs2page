import React from 'react';
import ReactTooltip from 'react-tooltip'
import {truncate} from '../helpers/truncate'

const UserName = ({name}) => {
    return (
        <div className="tile is-child box notification is-primary">
            Friendly name: {name}
        </div>
    )
};

const UserInfo = ({fingerprintArray, name}) => {
    return (
        <div className="tile is-parent is-vertical is-6">
            <ReactTooltip aria-haspopup='true' multiline={true}  />
            <UserName name={name}/>
            <div className="userinfo tile is-child box notification is-success">
                    <ul style={{textOverflow:'ellipsis'}} >
                        {fingerprintArray ?
                            fingerprintArray.map(item => <li key={item.key} data-tip={item.value.toString()}>{item.key} : {item.value.toString()}</li>) : null}
                    </ul>
            </div>
        </div>
    );
};

export default UserInfo;
