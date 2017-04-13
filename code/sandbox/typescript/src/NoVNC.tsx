import * as React from 'react';

import RFB from './novnc/core/rfb';

export default class NoVNC extends React.Component<void, any> {
    canvas: HTMLCanvasElement;

    componentDidMount() {
        let rfb;
        try {
            rfb = new RFB({'target': this.canvas});
        } catch (exc) {
            console.error(exc);
            return;
        }

        rfb.connect('172.16.11.252', 6010);
    }

    render() {
        return (<div style={{width: '100vh'}}>
            <canvas ref={canvas => this.canvas = canvas}></canvas>
        </div>);
    }
}