import React, {Component} from 'react';
import Header from "./Header";
import {Container} from "reactstrap";
import Footer from "./Footer";

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
            <Container fluid={true} className={'layout'}>
                <Header/>
                <div className={'content'}>
                    {this.props.children}
                </div>
                <Footer/>
            </Container>
        );
    }
}