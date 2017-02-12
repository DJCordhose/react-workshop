import {Greeting, ChartData} from './types'

export function aggregateGreetings(greetings: Array<Greeting>): Array<ChartData> {

    // first create an object as map as it is easier to access
    const dataAsObjectMap: { [key: string]: number } = greetings.reduce((data: { [key: string]: number }, greeting) => {
        const {name} = greeting;
        if (data[name]) {
            data[name] = data[name] + 1;
        } else {
            data[name] = 1;
        }
        return data;
    }, {});

    // then concert to data structure Chart expects

    const chartData = Object.entries(dataAsObjectMap).map(entry => ({label: entry[0], value: entry[1]}));
    return chartData;
}
