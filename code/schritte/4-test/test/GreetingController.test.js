import React from 'react';
import GreetingDetail from '../src/GreetingDetail';
import GreetingController from '../src/GreetingController';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';


// Test data
const someGreetings  = [
    {id: 1, name: 'Klaus', greeting: 'Moin moin'},
    {id: 2, name: 'Susi', greeting: 'Hello!'}
];

// https://github.com/facebook/jest/issues/2157#issuecomment-279171856
function flushPromises() {
    return new Promise(resolve => setImmediate(resolve));
}

test('it should render greetings received from backend', () => {
    fetch.mockResponse(JSON.stringify(someGreetings), {status: 200});
    // render the component we want to test
    const tree = mount(
        <GreetingController/>
    );

    flushPromises().then(() => {
        // make sure the json matches the last stored snapshot
        // (saved on the filesystem in __snapshots__)
        expect(tree.toJSON()).toMatchSnapshot();
    });

});

test('it should open detail view on button click', () => {
    fetch.mockResponse(JSON.stringify(someGreetings), {status: 200});

    // mount the component into a real dom (implemented by JSDom)
    const component = mount(<GreetingController  />);

    flushPromises().then(() => {
        // on initial render the list with greetings (GreetingMaster)
        // is visible but no GreetingDetail
        expect(component.find(GreetingDetail)).toHaveLength(0);

        // find the "add" Button...
        const addButton = component.find('button');

        // click on the button
        addButton.simulate('click');

        // now the GreetingDetail should be visible
        expect(component.find(GreetingDetail)).toHaveLength(1);

    });
});

