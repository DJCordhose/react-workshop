export type NewGreeting = {
    greeting: string;
    name: string;
}

export interface Greeting extends NewGreeting {
    id: number;
}