import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../actions';
import {filterGreetings} from '../../selectors';
import {MODE_DETAIL} from '../../actions';


const GreetingRow = ({greeting, onRowClicked}) => (
    <tr onClick={() => onRowClicked(greeting)}>
        <td>{greeting.name}</td>
        <td>{greeting.greeting}</td>
    </tr>
);

const FilterPanel = ({filter, setFilter}) => {
    if (!filter) {
        return <div className="FilterPanel">(All greetings are shown. Click a row to filter)</div>;
    }

    return <div className="FilterPanel">(Shown are greetings for <b>{filter}</b>. <a
        onClick={() => setFilter(null)}>Reset Filter</a>)</div>
};


function GreetingMaster(props) {
    const {greetings, setMode, filter, setFilter} = props;
    const body = greetings.map(greeting => <GreetingRow key={greeting.id} greeting={greeting}
                                                        onRowClicked={greeting => setFilter(greeting.name)}/>);
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Greeting</th>
                </tr>
                </thead>
                <tbody>
                {body}
                </tbody>
            </table>
            <FilterPanel filter={filter} setFilter={setFilter}/>
            <button
                onClick={()=>setMode(MODE_DETAIL)}>
                Add
            </button>
        </div>
    );
}

export default connect(
    state => ({
        greetings: filterGreetings(state.greetings, state.filter),
        filter: state.filter
    }),
    dispatch => bindActionCreators(actions, dispatch)
)(GreetingMaster);
