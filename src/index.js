import 'babel-polyfill';
import './mediaDevices';
import './swRegistration';
import 'fullscreen-api-polyfill';

import React, { Component } from 'react';
import { render } from 'react-dom';

import Camera from './components/Camera';
import ScreenshotsList from './components/ScreenshotsList';

if (module.hot) { module.hot.accept(); }


import indexStyle from './index.css'

class App extends Component {
    constructor(props){
        super(props);
        this.addScreenshot = this.addScreenshot.bind(this);
        this.state = {
            data:[]
        };
    }

    addScreenshot(screenshot){
        console.log("addScreenshot");
        const newData = [...this.state.data, screenshot]
        this.setState({ ...this.state, data: newData });
    }

    render() {
        return (
            <div className={indexStyle.container}>
                <Camera onPhotoTaken={this.addScreenshot} autoStart={true} />
                <ScreenshotsList data={this.state.data} />
            </div>
        );
    }
}

render(<App title='Camera App' />, document.getElementById('root'));