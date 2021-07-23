import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import ListTab from '../components/ListTab';
import ChartTab from '../components/ChartTab';


const StatSection = (props) => {

    return (
        <div className="stat-tab">
            <h5>Playlist Stats</h5>
            <Tabs defaultActiveKey="stat" id="tabs" className="tabs">
                <Tab eventKey="stat" title="Superlatives" className="list-tab">
                    <ListTab stats={props.stats}/>
                </Tab>
                
                <Tab eventKey="chart" title="Charts" className="chart-tab">
                    <ChartTab {...props} />    
                </Tab>

            </Tabs>
        </div>
    );
}

export default StatSection;