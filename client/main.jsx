import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

Meteor.startup(() =>
{
    ReactDOM.render(<App />, document.getElementById('render-target'));
});
