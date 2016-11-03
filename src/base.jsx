import React from 'react';
import ReactDOM from 'react-dom';

import jsonData from './assets/test.json';

var Activerow = React.createClass({
	render: function() {
    var activePerson = this.props.activePerson;
        return (
            <div>
                <table className="table">
                    <tbody>
                {
                    Object.keys(activePerson).map((version, i) => {
                        if(version != 'active') {
                            if(typeof activePerson[version] == 'object'){
                                activePerson[version] = activePerson[version].first+' '+activePerson[version].last;
                            }
                            return (
                                <tr key={i}>
                                    <td>
                                        {version}
                                    </td>
                                    <td>
                                        {activePerson[version]}
                                    </td>
                                </tr>
                            )
                        }
                    })
                }
                    </tbody>
                </table>
            </div>
        )
    }
});

var Person = React.createClass({
	setActive: function() {
		this.props.toggleActive(this.props.person._id);
	},
	render: function() {
        return (
        	<tr className={this.props.person.active} onClick={this.setActive}>
            	<td>{this.props.person._id}</td>
            	<td>{this.props.person.name.first} {this.props.person.name.last}</td>
            	<td>{this.props.person.createdAt}</td>
            	<td>{this.props.person.createdBy.first} {this.props.person.createdBy.last}</td>
            	<td>{this.props.person.shortDescription}</td>
            </tr>
        )
    }
});

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
            	<div className="person-detail">
            		{ this.state.activeRow ? <Activerow activePerson={this.state.activeRow} /> : null }
            	</div>
            	<table className="table">
            		<thead>
            			<tr>
	            			<th onClick={() => this.sortBy(['_id'])}>Id</th>
	            			<th onClick={() => this.sortBy(['name'])}>Name</th>
	            			<th onClick={() => this.sortBy(['timestamp'])}>Date</th>
	            			<th onClick={() => this.sortBy(['createdBy'])}>Owner</th>
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
        )
    }
});

ReactDOM.render(
    <Base />,
    document.getElementById('root')
);