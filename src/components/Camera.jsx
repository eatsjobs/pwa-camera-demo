import React, { Component } from 'react';
import style from './cameraStyle.css';

export class Camera extends Component {

    constructor(props) {
        super(props);
        this.handleStream = this.handleStream.bind(this);
        this.handleError = this.handleError.bind(this);
        this.takePhoto = this.takePhoto.bind(this);
        this.stopStream = this.stopStream.bind(this);
        this.startStream = this.startStream.bind(this);
        this.toggleStream = this.toggleStream.bind(this);
        this.changeCamera = this.changeCamera.bind(this);
        this.handleFullScreen = this.handleFullScreen.bind(this);
        this.onFullScreenChange = this.onFullScreenChange.bind(this);
        this.state = {
            isFullScreen: false,
            constraints: { 
                audio: false, 
                video: {
                    width: 1280,
                    height: 720,
                    frameRate: { ideal: 10, max: 15 },
                    facingMode: { exact: "environment" }
                }
            },
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
        return navigator.mediaDevices.getUserMedia(this.state.constraints)
        .then(this.handleStream)
        .catch(this.handleError);
    }

    componentDidMount() {
        document.addEventListener('fullscreenchange', this.onFullScreenChange);
        if(this.props.autoStart) {
            this.startStream();
        }
    }

    componentWillUnmount() {
        this.stopStream();
        document.removeEventListener('fullscreenchange', this.onFullScreenChange);
    }
    
    changeCamera() {
        let rearOrFront =  {
            front: 'user',
            rear: { exact: "environment" }
        };

        let facingMode = (this.state.constraints.video.facingMode === 'user') ? rearOrFront.rear : rearOrFront.front; 

        const newConstraints = {
            ...this.state.constraints, 
            video: {
                ...this.state.constraints.video, 
                facingMode: facingMode 
            }
        };
        
        const newState = {...this.state, constraints: newConstraints };
        this.setState(newState, () => {
            this.stopStream();
            this.startStream();
        });
        /**/
    }

    handleFullScreen(e) {
        
        try {
            if(!this.state.isFullScreen) {
                this.refs.container.requestFullscreen();
                screen.orientation.lock('landscape');
            } else {
                //this.refs.container.exitFullscreen();
                document.exitFullscreen();
                screen.orientation.unlock();
            }
        } catch(e) {
            console.warn("cannot go fullscreen", e);
        }
        
    }

    onFullScreenChange(e) {
        this.setState({...this.state, isFullScreen: !!document.fullscreenElement });
    }

    render() {
        const fullClasses = ['glyphicon'];
        this.state.isFullScreen ? fullClasses.push('glyphicon-resize-small') : fullClasses.push('glyphicon-resize-full');
        return (
            <div ref='container' className={style.container}>
                <video ref="videoElement" className={style.videoElement} onClick={this.takePhoto} src={this.state.objUrl}></video>
                <ul className={style.controlsContainer}>
                    <li className={style.controlItem} onClick={this.handleFullScreen}><i className={fullClasses.join(' ')}></i></li>
                    <li className={style.controlItem} onClick={this.changeCamera}><i className='glyphicon glyphicon-camera'></i></li>
                </ul>
            </div>
        )
    }
}

export default Camera;
