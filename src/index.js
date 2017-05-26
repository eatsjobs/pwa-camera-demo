import 'babel-polyfill';
import './mediaDevices';
import React, { Component } from 'react';
import { render } from 'react-dom';

import VideoComponent from './components/VideoComponent';
import ScreenshotsList from './components/ScreenshotsList';

import './images/icons/icon-192x192.png';

if (module.hot) { module.hot.accept(); }

const containerStyle = {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto'
}

class App extends Component {
    constructor(props){
        super(props);
        this.state = {data:[]};
        this.addScreenshot = this.addScreenshot.bind(this);
    }

    addScreenshot(screenshot){
        console.log("addScreenshot");
        const newData = [...this.state.data, screenshot]
        this.setState({ data: newData });
    }

    render() {
        return (
            <div style={containerStyle}>
                <h1 style={{textAlign: 'center'}}>{this.props.title}</h1>
                <VideoComponent onPhotoTaken={this.addScreenshot} />
                <ScreenshotsList data={this.state.data} />
            </div>
        );
    }
}

render(<App title='Camera App' />, document.getElementById('root'));