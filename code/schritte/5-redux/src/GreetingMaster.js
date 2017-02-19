import React from 'react';

const GreetingRow = ({greeting, onRowClicked}) => (
    <tr onClick={() => onRowClicked(greeting)}>
        <td>{greeting.name}</td>
        <td>{greeting.greeting}</td>
    </tr>
);

const FilterPanel = ({currentFilter,setFilter}) => {
    if (!currentFilter) {
        return null;
    }

    return <div className="FilterPanel">(Shown are greetings for <b>{currentFilter}</b>. <a onClick={()=>setFilter(null)}>Reset Filter</a>)</div>
};

export default function GreetingMaster(props) {
    const {greetings, onAdd, onRowClicked, currentFilter,setFilter} = props;
    const body = greetings.map(greeting => <GreetingRow key={greeting.id} greeting={greeting}
                                                        onRowClicked={onRowClicked}/>);
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
            <FilterPanel currentFilter={currentFilter} setFilter={setFilter}/>
            <button
                onClick={onAdd}>
                Add
            </button>

        </div>
    );
}
