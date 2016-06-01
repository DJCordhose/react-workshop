import expect from 'expect';
import React from 'react';

import ReactTestUtils from 'react-addons-test-utils';

class MostInnerComponent extends React.Component {
    render() {
        return <div className='mostInner'>Most Inner</div>;
    }
}

class InnerComponent extends React.Component {
    render() {
        return <div className='inner'>{this.props.children}</div>
    }
}

class OuterComponent extends React.Component {
    render() {
        return <div className='outer'>
            <span className='eins'><span className='zwei'><span className='drei'>Ganz weit unten</span></span></span>
            <InnerComponent><div><MostInnerComponent /></div></InnerComponent>
        </div>;
    }
}



describe('SHALLOW RENDERING', () => {
    it('properly renders', () => {
        const renderer = ReactTestUtils.createRenderer();

        renderer.render(
            <OuterComponent />
        );
        
        const tree = renderer.getRenderOutput();
        expect(tree.type).toBe('div');
        expect(tree.props.className).toBe('outer');
        expect(tree.props.children.length).toEqual(2); // span ~ InnerComponent
        
        expect(tree.props.children).toEqual([
            <span className='eins'><span className='zwei'><span className='drei'>Ganz weit unten</span></span></span>,
            // Components are rendered only one level:
            <InnerComponent><div><MostInnerComponent /></div></InnerComponent>
        ]);

        const spanEins = tree.props.children[0];
        expect(spanEins.type).toBe('span');
        expect(spanEins.props.className).toBe('eins');
        
        const spanZwei = spanEins.props.children;
        expect(spanZwei.type).toBe('span');
        expect(spanZwei.props.className).toBe('zwei');
        
        expect(spanEins.props.children).toEqual(
            <span className='zwei'><span className='drei'>Ganz weit unten</span></span>
        );
        
        const inner = tree.props.children[1];
        expect(inner.type).toBe(InnerComponent);
        // expect(inner.props.children).toEqual(
        //     <div className='inner'><MostInnerComponent /></div>
        // );
    });

  
});
