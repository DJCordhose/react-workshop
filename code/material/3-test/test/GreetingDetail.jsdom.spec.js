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
    	// 1. Schreibe hier einen dummy Callback Handler fuer das
    	// onAdd Event

		// 2. Hier mit renderIntoDocument die GreetingDetail-Komponente rendern
		// und das Beispiel Greeting-Objekt und deinen onAddHandler uebergeben


        // 3. Suche den Save-Button im gerenderten DOM 
        // (zweites button-Element im DOM)


        // 4. Simuliere einen Klick auf dem Save-Button


        // 5. Stelle sicher, dass durch das onClick dein onAdd Event-Handler
        // mit dem korrekten Parameter aufgerufen wurde.
        // Assert mit expect: expect(erwarteterWert).toEqual(tatsaechlicherWert);
    });
});