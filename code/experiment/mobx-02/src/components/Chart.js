import React, {PropTypes} from 'react';
import d3 from 'd3';
import nv from 'nvd3';
import {inject} from 'mobx-react';

// state => ({
//     data: aggregateGreetings(state.greetings),
// }),
//     dispatch => ({
//         onSegmentSelected: filter => dispatch(actions.setFilter(filter))
//     })


@inject( ({store}) => ({
    data: store.aggregatedGreetings,
    onSegmentSelected: store.setFilter
}))
export default class Chart extends React.Component {

    static propTypes = {
        data: PropTypes.array.isRequired,
        onSegmentSelected: PropTypes.func
    };

    shouldComponentUpdate() {
        return false;
    }

    // will be called even when shouldComponentUpdate returns false
    componentWillReceiveProps(nextProps) {
        const {data} = nextProps;
        this._d3selection
            .datum(data)
            .call(this._nvd3chart);
    }

    componentDidMount() {
        const {data, onSegmentSelected} = this.props;

        // http://nvd3.org/examples/pie.html
        nv.addGraph(() => {
            const chart = nv.models.pieChart()
                .x(function(d) { return d.label })
                .y(function(d) { return d.value })
                .showLabels(true);
            chart.legend.updateState(false);

            this._d3selection = d3.select(this._chart);
            this._d3selection
                .datum(data)
                .call(chart);

            this._nvd3chart = chart;
            if (onSegmentSelected) {
                chart.pie.dispatch.on("elementClick", e => onSegmentSelected(e.data.label));
            }
            return chart;
        });
    }

    render() {
        const svgStyle = {
            height: '500px',
            width: '600px'
        };
        return <svg style={svgStyle} className="with-3d-shadow with-transitions" ref={c => this._chart = c}></svg>
    }
}