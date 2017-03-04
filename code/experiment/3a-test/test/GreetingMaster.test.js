import React from 'react';
import GreetingMaster from '../src/GreetingMaster';
import {shallow} from 'enzyme';

const someGreetings = [
    {id: 1, name: 'Klaus', greeting: 'Moin moin'},
    {id: 2, name: 'Susi', greeting: 'Hello!'}
];

test('it should render table with all greetings', () => {
    const onAddMock = jest.fn();
    const component = shallow(<GreetingMaster greetings={someGreetings} onAdd={onAddMock}/> );
    expect(component).toMatchSnapshot();
    component.find('button').simulate('click');
    expect(onAddMock.mock.calls.length).toBe(1);
});


