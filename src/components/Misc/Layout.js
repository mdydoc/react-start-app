import React, {Component, Fragment} from 'react';
import Header from "./Header";
import Footer from "./Footer";

export default class Layout extends Component {
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