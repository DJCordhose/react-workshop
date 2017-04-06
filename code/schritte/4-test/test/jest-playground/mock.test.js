const execFunction = (fn, times) => {
    for (let i = 0;i < times; i++) {
        fn(i);
    }
};

test('should be called x times', () => {
    const callback = jest.fn();

    execFunction(callback, 3);

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(0);
    expect(callback).toHaveBeenCalledWith(1);
    expect(callback).toHaveBeenLastCalledWith(2);
    expect(callback).not.toHaveBeenCalledWith(3);
    expect(callback).not.toHaveBeenLastCalledWith(4);
});