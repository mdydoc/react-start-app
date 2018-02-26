import React, {Component} from 'react';
import Layout from '../Misc/Layout';
import {Link} from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
            <Layout>
                <div>Home</div>
                <Link to="/logout">Logout</Link>
            </Layout>
        );
    }
}