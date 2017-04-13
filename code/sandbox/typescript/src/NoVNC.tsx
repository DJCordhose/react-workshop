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

        rfb.connect('192.168.0.67', 6010);
    }

    render() {
        return (<div>
            <canvas ref={canvas => this.canvas = canvas}></canvas>
        </div>);
    }
}