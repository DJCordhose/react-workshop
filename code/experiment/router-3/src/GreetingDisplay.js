import React from 'react';

export default function GreetingDisplay(props) {
    const {name, greeting} = props && props.location && props.location.query || {};
    return <h1>{greeting}, {name}</h1>;
}
