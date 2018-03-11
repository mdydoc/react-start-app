import React, {Component, Fragment} from 'react';
import Header from "./Header";
import Footer from "./Footer";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import userActions from "../../actions/Auth/user";

@connect(
    store => ({
        user: store.user.user
    }),
    dispatch => ({
        ...bindActionCreators(userActions, dispatch)
    })
)
export default class Layout extends Component {
    constructor(props) {
        super(props);

        const rememberToken = localStorage.getItem('rememberToken');

        if (rememberToken && !this.props.user) {
            const {loginUser} = this.props;

            let credentials = {
                rememberToken
            };

            loginUser(credentials);
        }
    }

    render() {
        return (
            <Fragment>
                <Header/>
                <div className="container">
                    <div className="content">{this.props.children}</div>
                </div>
                <Footer/>
            </Fragment>

        );
    }
}