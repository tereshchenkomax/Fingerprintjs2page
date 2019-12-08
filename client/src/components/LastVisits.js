import React from 'react';
import shortid from 'shortid';

function LastVisits({timestamp}) {
    if (timestamp[0] === 'Loading'){
        return (
            <div className='tile is-child is-1'>
                <h5 className='subtitle is-5'>
                    Last 10 visits
                </h5>
                Loading...
            </div>
        )
    }
    return (
        <div className='tile is-child is-1'>
            <h5 className='subtitle is-5'>
                Last 10 visits
            </h5>
            <ul>
                {timestamp.map(timeframe => {
                    let dataframe = new Date(timeframe);
                    // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' , time: 'numeric' };
                    return <li key={shortid.generate()}>{dataframe.toLocaleString("en-US")}</li>
                })}
            </ul>
        </div>
    );
}

export default LastVisits;