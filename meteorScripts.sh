#!/usr/bin/env bash

meteor npm install
meteor npm install --save react react-dom
meteor npm install --save react-addons-pure-render-mixin
meteor remove insecure
meteor add react-meteor-data