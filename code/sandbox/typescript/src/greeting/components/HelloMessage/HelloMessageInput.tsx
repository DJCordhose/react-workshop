import * as React from 'react';

const HelloMessageInput = ({text, onChange, focus, onFocusSet} : {text:string, onChange : (string) => void, focus: boolean, onFocusSet: () => void}) => {
    return <div>
        <input ref={input => input && focus && input.focus() && onFocusSet()}
            onChange={(event: React.SyntheticEvent<HTMLInputElement>) => onChange(event.currentTarget.value)}
            value={text} />
    </div>
}

export default HelloMessageInput;