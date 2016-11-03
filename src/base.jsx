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
        return { clients: jsonData, activeRow: false };
    },
    sortBy: function(parameter) {
    	var sortParam;
    	if(parameter.length  === 1) {
    		sortParam = parameter[0];
    	}
    	function compare(a,b) {
			if (a[sortParam] < b[sortParam])
				return -1;
			if (a[sortParam] > b[sortParam])
				return 1;
				return 0;
		}
		jsonData.sort(compare);
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
	            			<th onClick={() => this.sortBy(['name','first','last'])}>Name</th>
	            			<th onClick={() => this.sortBy(['createdAt'])}>Date</th>
	            			<th onClick={() => this.sortBy(['createdBy','first','last'])}>Owner</th>
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