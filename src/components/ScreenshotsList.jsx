import React, { Component } from 'react';
import ScreenshotItem from './ScreenshotItem';

const style = { 
    width: '100%',
    overflowX: 'scroll',
    overflowY: 'hidden',
    backgroundColor: 'lightgrey',
    minHeight: '100px'
};

const thumbContainer = {
    width: window.innerWidth + 'px'
}

export class ScreenshotsList extends Component {
    
    constructor(props){
        super(props);
    }

    calculateLength(style){
        const len = this.props.data.length * 155;
        return {...thumbContainer, width:`${len}px`}        
    }

    render() {
        const computedStyle = this.calculateLength(thumbContainer);
        return (
            <ul style={style}>
                <div style={computedStyle}>
                    {this.props.data.map((src) => <ScreenshotItem key={src.toString().length} src={src}/>)}
                </div>                
            </ul>
        )
    }
}

export default ScreenshotsList;
