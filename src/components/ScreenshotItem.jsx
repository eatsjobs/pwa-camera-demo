import React, { Component } from 'react';

const styles = {
    item: {
        display:'block',
        float: 'left',
        margin:'2px'
    },
    img: {
        width: '150px',
        height: 'auto'
    }
}

export class ScreenshotItem extends Component {
    render(){
        return (
            <li style={styles.item}>
                <img style={styles.img} src={this.props.src} />
            </li>
        )
    }
}

export default ScreenshotItem;
