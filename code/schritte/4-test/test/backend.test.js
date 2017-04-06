import {loadFromServer, saveToServer} from '../src/backend';

const someGreetings = [
    {id: 1, name: 'Klaus', greeting: 'Moin moin'},
    {id: 2, name: 'Susi', greeting: 'Hello!'}
];

let successMock, errorMock;

beforeEach(() => {
    successMock = jest.fn();
    errorMock = jest.fn();
});

describe('loadFromServer', () => {
    test('should invoke success callback function if response is successful', () => {
        fetch.mockResponse(JSON.stringify(someGreetings), {status: 200});

        return loadFromServer(successMock, errorMock)
            .then(() => {
                expect(errorMock).not.toHaveBeenCalled();
                expect(successMock).toHaveBeenCalledWith(someGreetings);
            });
    });

    test('should invoke failure callback function if server returns an error code', () => {
        fetch.mockResponse(
            JSON.stringify({error: 'Server is doomed'}),
            {status: 404}
        );

        return loadFromServer(successMock, errorMock)
            .then(() => {
                expect(errorMock).toHaveBeenCalledWith('Server is doomed');
                expect(successMock).not.toHaveBeenCalled();
            });
    })
});

describe('saveToServer', () => {
    test('should return an id for new greeting', () => {
        fetch.mockResponse(
            JSON.stringify({id: 1234}),
            {status: 201}
        );

        return saveToServer({}, successMock, errorMock)
            .then(() => {
                expect(successMock).toHaveBeenCalledWith({id: 1234});
                expect(errorMock).not.toHaveBeenCalled();
            });
    });

    test('should invoke failure callback when call fails', () => {
        fetch.mockResponse(
            JSON.stringify({error: 'hoe?'}),
            {status: 403}
        );

        return saveToServer({}, successMock, errorMock)
            .then(() => {
                expect(successMock).not.toHaveBeenCalled();
                expect(errorMock).toHaveBeenCalledWith('hoe?');
            });
    });
});

