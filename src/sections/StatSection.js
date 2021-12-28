import React from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';

import ListTab from '../components/ListTab';
import ChartTab from '../components/ChartTab';


const StatSection = (props) => {

    return (
        <div className="stat-tab">
            <div className="stats-header-row">
                <h5 className="stats-header-title"><b>Playlist Stats</b></h5>
                {
                    props.showLyricsFunc ? 
                        <Button onClick={props.showLyricsFunc} size="sm" variant="outline-primary" className="stats-header-lyrics">
                            Show Lyrics Tab
                        </Button>
                        : null
                }
            </div>

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