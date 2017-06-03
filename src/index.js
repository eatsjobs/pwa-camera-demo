import 'babel-polyfill';
import './mediaDevices';
import './swRegistration';
import requestFullscreen from './requestFullscreen';

import React, { Component } from 'react';
import { render } from 'react-dom';

import Camera from './components/Camera';
import ScreenshotsList from './components/ScreenshotsList';

if (module.hot) { module.hot.accept(); }

const containerStyle = {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto'
}

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            constraints: { 
                audio: false, 
                video: { 
                    width: 1280, 
                    height: 720, 
                    frameRate: { ideal: 10, max: 15 },
                    facingMode: { exact: "environment" }
                }
            },
            data:[]
        };
        this.addScreenshot = this.addScreenshot.bind(this);
    }

    addScreenshot(screenshot){
        console.log("addScreenshot");
        const newData = [...this.state.data, screenshot]
        this.setState({ ...this.state, data: newData });
    }

    render() {
        return (
            <div className='container'>                
                <Camera onPhotoTaken={this.addScreenshot} autoStart={true} />
                <ScreenshotsList data={this.state.data} />
            </div>
        );
    }
}

try {
    requestFullscreen(document.documentElement);
    screen.orientation.lock('landscape');
} catch(e) {}

render(<App title='Camera App' />, document.getElementById('root'));