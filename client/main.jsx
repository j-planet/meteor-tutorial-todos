import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './startup/accounts-config';    // user accounts config
import App from './components/app';

Meteor.startup(() =>
{
    ReactDOM.render(<App />, document.getElementById('render-target'));
});
