function getData () {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(46)
        }, 1);
    });
}

// Method with Async/Await
async function start () {
    const result = await getData();
    console.log(result);
}

// Method with Then
function start2 () {
    getData()
        .then(result => {
            console.log(result);
        });
}

start();

start2();