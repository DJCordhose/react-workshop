/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function createBoxes(number) {
    const boxes = [];
    for (let i=0; i < number; i++) {
        const id = i;
        const x = getRandomInt(0, 500);
        const y = getRandomInt(0, 500);
        const box = {
            id,
            x,
            y
        };
        boxes.push(box);
    }
    return boxes;
}

const boxes = createBoxes(5000);

const mountNode: HTMLElement = document.getElementById('mount');
ReactDOM.render(<App boxes={boxes} />, mountNode);