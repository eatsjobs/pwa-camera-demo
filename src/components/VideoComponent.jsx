import React, { Component } from 'react';

export class VideoComponent extends Component {

    constructor(props) {
        super(props);
        this.handleStream = this.handleStream.bind(this);
        this.handleError = this.handleError.bind(this);
        this.takePhoto = this.takePhoto.bind(this);        
    }

    handleStream(stream) {
        console.log("handle stream", stream);
        this.refs.videoElement.src = window.URL.createObjectURL(stream);        
        this.refs.videoElement.onloadedmetadata = (e) => this.refs.videoElement.play();
    }

    handleError(err) {
        console.log("handle error");
    }

    takePhoto() {
        console.log("takePhoto start");
        const canvas = document.createElement("canvas");
        canvas.width = this.refs.videoElement.videoWidth;
        canvas.height = this.refs.videoElement.videoHeight;
        canvas.getContext('2d')
              .drawImage(this.refs.videoElement, 0, 0, canvas.width, canvas.height);
        const dataPhoto = canvas.toDataURL();
        console.log("takePhoto end");
        this.props.onPhotoTaken(dataPhoto);
    }

    componentDidMount(){
        
        const constraints = { audio: false, video: { width: 1280, height: 720, frameRate: { ideal: 10, max: 15 } } }; 
        navigator.mediaDevices.getUserMedia(constraints)
        .then(this.handleStream).catch(this.handleError);
    }

    render(){
        return (<video ref="videoElement" style={{width:'100%'}} onClick={this.takePhoto}></video>)
    }
}

export default VideoComponent;
