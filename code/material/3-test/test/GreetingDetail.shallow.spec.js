import expect from 'expect';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import GreetingDetail from '../src/GreetingDetail';

/* Greeting Objekt zum Testen */
const greeting = {
    name: 'Lemmy',
    greeting: 'Rock-n-Roll'
};

describe('GreetingDetail with SHALLOW RENDERING', () => {
    it('invokes onAdd callback when save button is clicked', () => {
    	// 1. Schreibe hier einen dummy Callback Handler fuer das
    	// onAdd Event


		// 2. Hier mit Shallow Renderer die GreetingDetail-Komponente rendern
		// und das Beispiel Greeting-Objekt und deinen onAddHandler uebergeben


        // 3. Suche den Save-Button im gerenderten virtual DOM Tree
        // (steht dort an vierter Stelle)


        // 4. Rufe auf den Properties des saveButtons die onClick-Funktion auf


        // 5. Stelle sicher, dass durch das onClick dein onAdd Event-Handler
        // mit dem korrekten Parameter aufgerufen wurde.
        // Assert mit expect: expect(erwarteterWert).toEqual(tatsaechlicherWert);
    });
});
