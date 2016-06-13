import expect from 'expect';
import jsdom from 'mocha-jsdom';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import GreetingDetail from '../src/GreetingDetail';

const greeting = {
    name: 'Lemmy',
    greeting: 'Rock-n-Roll'
};

describe('GreetingDetail with JSDOM', () => {
    jsdom();

    it('onAdd callback is called with unchanged greeting', () => {
        let greetingAdded;
        function onAddHandler(newGreeting) {
            greetingAdded = newGreeting;
        }

		// 1. Hier mit renderIntoDocument die GreetingDetail-Komponente rendern
		// und das Beispiel Greeting-Objekt und deinen onAddHandler uebergeben


        // 2. Suche den Save-Button im gerenderten DOM
        // (zweites button-Element im DOM)


        // 3. Simuliere einen Klick auf dem Save-Button

        expect(greetingAdded).toEqual(greeting);
    });
});