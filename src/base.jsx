import React from 'react';
import ReactDOM from 'react-dom';

import jsonData from './assets/test.json';

import Activerow from './components/activerow.jsx';
import Person from './components/person.jsx';

var Base = React.createClass({
	getInitialState: function() {
        for (var i = 0; i < jsonData.length; i++) {
            var dateToTimestap = jsonData[i].createdAt
            jsonData[i].timestamp = (new Date(dateToTimestap).getTime());
        }
        return { clients: jsonData, activeRow: false };
    },
    sortBy: function(parameter) {

        if(parameter == 'name' || parameter == 'createdBy') {
            function compare(a,b) {
                if (a[parameter].first+a[parameter].last < b[parameter].first+a[parameter].last)
                    return -1;
                if (a[parameter].first+a[parameter].last > b[parameter].first+a[parameter].last)
                    return 1;
                    return 0;
            }
            jsonData.sort(compare);
        } else {
            function compare(a,b) {
                if (a[parameter] < b[parameter])
                    return -1;
                if (a[parameter] > b[parameter])
                    return 1;
                    return 0;
            }
            jsonData.sort(compare);
        }


        this.setState({clients: jsonData});
    },
    toggleActive: function(activeRow) {
    	for (var i = 0; i < jsonData.length; i++) {
    		if(jsonData[i]._id == activeRow) {
                jsonData[i].active = 'active';
    			this.setState({activeRow: jsonData[i]});
    		}else {
                jsonData[i].active = false;
            }
    	}
    },
    render: function() {
        return (
            <div className="root-content">
                <div className="col-sm-8">
                    <h2>Person list</h2>
                	<table className="table">
                		<thead>
                			<tr>
    	            			<th className="sortable" onClick={() => this.sortBy(['_id'])}>Id</th>
    	            			<th className="sortable" onClick={() => this.sortBy(['name'])}>Name</th>
    	            			<th className="sortable" onClick={() => this.sortBy(['timestamp'])}>Date</th>
    	            			<th className="sortable" onClick={() => this.sortBy(['createdBy'])}>Owner</th>
    	            			<th>Description</th>
                			</tr>
                		</thead>
                		<tbody>
                			{
                                this.state.clients.map((person, i) => {
                                    return (
                                        <Person key={person._id} toggleActive={this.toggleActive} person={person} />
                                    )
                                })
                            }
                		</tbody>
                	</table>
                </div>
                <div className="col-sm-4">
                    <h2>Person detail</h2>
                    { this.state.activeRow ? <Activerow activePerson={this.state.activeRow} /> : null }
                </div>
            </div>
        )
    }
});

ReactDOM.render(
    <Base />,
    document.getElementById('root')
);