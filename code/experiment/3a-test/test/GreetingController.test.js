import React from 'react';
import GreetingMaster from '../src/GreetingMaster';
import GreetingDetail from '../src/GreetingDetail';
import GreetingController from '../src/GreetingController';
import backend from '../src/backend';
import {shallow, mount} from 'enzyme';

jest.mock('../src/backend', () => ({
    loadFromServer: jest.fn((success, failure) => success([
        {id: 1, name: 'Klaus', greeting: 'Moin moin'},
        {id: 2, name: 'Susi', greeting: 'Hello!'}
    ]))
}));

test('it should render master view by default', () => {
    const component = shallow(<GreetingController/>);
    expect(component).toMatchSnapshot();
});

// TODO: Write more tests... but: is difficult due to
// the internal structure of the controller component

test('it should render greetings received from server', () => {
    const component = mount(<GreetingController  />);
    expect(backend.loadFromServer.mock.calls).toHaveLength(1);

    expect(component.find('button')).toHaveLength(1);
    expect(component.find('tbody > tr')).toHaveLength(2);
});

