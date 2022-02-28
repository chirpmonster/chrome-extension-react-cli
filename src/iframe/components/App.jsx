import React, { Component } from 'react';

import HelloWorld from './HelloWorld'

import './index.less'

export default class App extends Component{
    render() {
        return (
            <div className='chrome-box'>
                <HelloWorld/>
                <div className='technical-support'>v0.1.0</div>
            </div>
        )
    }
}
