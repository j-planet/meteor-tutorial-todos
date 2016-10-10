import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';


class AccountsUIWrapper extends Component {

    constructor(props) {
        super(props);
    }


    // use meteor blaze to render login buttons
    componentDidMount() {
        console.log('AccountsUIWrapper DidMount.');

        this.view = Blaze.render(Template.loginButtons, ReactDOM.findDOMNode(this.refs.container));
    }

    // clean up Blaze view
    componentWillUnMount() {
        console.log('AccountsUIWrapper WillUnMount.');

        Blaze.remove(this.view);
    }

    // just render a placeholder container that will be filled in
    render() {
        return <span ref="container" />;
    }
}

export default AccountsUIWrapper;