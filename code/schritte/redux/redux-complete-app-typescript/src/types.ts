export type GreetingChartData = { label: string, value: number }[];

export type GreetingId = string | number;

export type NewGreeting = {
	greeting: string;
	name: string;
}

export interface Greeting extends NewGreeting {
	id: GreetingId;
}

export type Greetings = Greeting[];
export type GreetingFilter = string;

/** The overall application state */
export type AppState = {
    greeting: string;
}
