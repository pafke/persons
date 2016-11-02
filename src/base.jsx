import React from 'react';
import ReactDOM from 'react-dom';

import jsonData from './assets/test.json';

var Base = React.createClass({
	getInitialState: function() {
        return { clients: jsonData };
    },
    sortBy: function(parameter) {
    	function compare(a,b) {
			if (a[parameter] < b[parameter])
				return -1;
			if (a[parameter] > b[parameter])
				return 1;
				return 0;
		}
		jsonData.sort(compare);
        this.setState({clients: jsonData});
    },
    render: function() {
        return (
            <div className="root-container">
            	<table className="table">
            		<thead>
            			<tr>
	            			<th onClick={() => this.sortBy('_id')}>Id</th>
	            			<th onClick={() => this.sortBy('name','first','last')}>Name</th>
	            			<th onClick={() => this.sortBy('createdAt')}>Date</th>
	            			<th onClick={() => this.sortBy('createdBy','first','last')}>Owner</th>
	            			<th>Description</th>
            			</tr>
            		</thead>
            		<tbody>
            			{
                            this.state.clients.map((person, i) => {
                                return (
                                    <tr key={person._id}>
                                    	<td>{person._id}</td>
                                    	<td>{person.name.first} {person.name.last}</td>
                                    	<td>{person.createdAt}</td>
                                    	<td>{person.createdBy.first} {person.createdBy.last}</td>
                                    	<td>{person.shortDescription}</td>
                                    </tr>
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