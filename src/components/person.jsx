import React from 'react';
import ReactDOM from 'react-dom';

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

module.exports = Person;