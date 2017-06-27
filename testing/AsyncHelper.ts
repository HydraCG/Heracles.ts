export function run(test)
{
    return function(done)
    {
        test.call(this).then(done, e => done.fail(e));
    }
};
