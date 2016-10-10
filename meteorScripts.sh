#!/usr/bin/env bash

meteor npm install
meteor npm install --save react react-dom react-addons-pure-render-mixin bcrypt classnames

meteor add react-meteor-data
meteor add accounts-ui accounts-password
meteor add practicalmeteor:mocha

meteor remove insecure
meteor remove autopublish
