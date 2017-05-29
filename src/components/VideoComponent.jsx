import React, { Component } from 'react';

export class VideoComponent extends Component {

    constructor(props) {
        super(props);
        this.handleStream = this.handleStream.bind(this);
        this.handleError = this.handleError.bind(this);
        this.takePhoto = this.takePhoto.bind(this);
        this.stopStream = this.stopStream.bind(this);
        this.startStream = this.startStream.bind(this);
        this.toggleStream = this.toggleStream.bind(this);
        this.state = {
            stream: null,
        }
    }

    handleStream(stream) {
        console.log("handle stream", stream);
        this.setState({...this.state, 
            objUrl: window.URL.createObjectURL(stream),
            stream
        });
        this.refs.videoElement.onloadedmetadata = (e) => this.refs.videoElement.play();
    }

    handleError(err) {
        console.log("handle error", err);
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

    toggleStream() {
        this.state.stream ? this.stopStream() : this.startStream();
    }

    stopStream() {
        window.URL.revokeObjectURL(this.state.objUrl);
        this.state.stream.getTracks().map(track => track.stop());
        this.setState({...this.state, stream: null });
    }

    startStream() {
        navigator.mediaDevices.getUserMedia(this.props.constraints)
        .then(this.handleStream).catch(this.handleError);
    }

    componentDidMount() {
        if(this.props.autoStart) {
            this.startStream();
        }
    }

    componentWillUnmount() {
        this.stopStream();
    }

    render(){
        const btnStyle = { width: '100%', minHeight:'50px'}
        return (
            <div className='row'>
                <div className='row'>
                    <div className='col-xs-12'>
                        <video ref="videoElement" style={{width: '100%'}} onClick={this.takePhoto} src={this.state.objUrl}></video>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-xs-6'>
                        <button type="button" style={btnStyle} onClick={this.takePhoto}>Take Screenshot</button>
                    </div>
                    <div className='col-xs-6'>
                        <button type="button" style={btnStyle} onClick={this.toggleStream}>{this.state.stream ? 'Stop' : 'Start'}</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default VideoComponent;
