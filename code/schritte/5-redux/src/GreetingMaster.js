import React from 'react';

const GreetingRow = ({greeting, onRowClicked}) => (
    <tr onClick={() => onRowClicked(greeting)}><td>{greeting.name}</td><td>{greeting.greeting}</td></tr>
);

export default function GreetingMaster(props) {
    const {greetings, onAdd, onRowClicked} = props;
    const body = greetings.map(greeting => <GreetingRow key={greeting.id} greeting={greeting} onRowClicked={onRowClicked} />);
    return (
        <div>
            <table>
                <thead>
                    <tr><th>Name</th><th>Greeting</th></tr>
                </thead>
                <tbody>
                {body}
                </tbody>
            </table>
            <button
                onClick={onAdd}>
                Add
            </button>
        </div>
    );
}
