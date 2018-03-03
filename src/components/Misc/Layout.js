import React, {Component} from 'react';

export default class Layout extends Component {
    render() {
        return (
            <div className="container-fluid">
                {this.props.children}
            </div>
        );
    }
}