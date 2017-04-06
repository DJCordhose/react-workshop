beforeAll(() => {
    console.log('beforeAll')
});

afterAll(() => {
    console.log('afterAll')
});

beforeEach(() => {
    console.log('beforeEach')
});

afterEach(() => {
    console.log('afterEachaa')
});

test('a single test', () => {
    console.log('running a single test');
    expect(true).toBeTruthy();
});

describe('a test suite', () => {

    beforeAll(() => {
        console.log('testuite - beforeAll')
    });

    afterAll(() => {
        console.log('testuite - afterAll')
    });

    beforeEach(() => {
        console.log('testuite - beforeEach')
    });

    afterEach(() => {
        console.log('testuite - afterEacha')
    });


    test('a test in a suite', () => {
        console.log('running a test in a suite');
        expect(true).toBeTruthy();
    });

    test('another test in a suite', () => {
        console.log('running another test in a suite');
        expect(false).toBeFalsy();
    })
});