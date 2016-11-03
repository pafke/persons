import React from 'react';
import ReactDOM from 'react-dom';

var Activerow = React.createClass({
	render: function() {
    var activePerson = this.props.activePerson;
        return (
            <div className="person-detail ">
                <table className="table">
                    <tbody>
                {
                    Object.keys(activePerson).map((version, i) => {
                        if(version != 'active' && version != 'timestamp') {
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

module.exports = Activerow;