import React from 'react';

export default function GreetingDisplay(props) {
    const {name, greeting} = props || {};
    return <h1>{greeting}, {name}</h1>;
}
