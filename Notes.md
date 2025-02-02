# Notes

- When JavaScript prevents form submission, the `<input>` RegEx pattern does not appear to work



No matter what, whether `then` / `catch` or `async` / `await`, there is still a *promise* under the hood!


A *promise*, in JavaScript, is similar to promises in real life. You promise to do X and either the promise resolves **or** rejects.

```javascript
let p = new Promise((resolve, reject) => {
    // define the actual promise
    let a = 1 + 1;
    if (a == 2) {
        resolve("Success");
    } else {
        reject("Failed");
    }
});
```

Anything inside of a `.then` will run due to a `resolve`

Promises were intended to replace *callbacks* because, instead of nesting callbacks, you will simply add multiple `then` statements



`then` syntax:

```javascript
doSomething()
    .then((url) => fetch(url))
    .then((res) => res.json())
    .then((data) => {
        listOfIngredients.push(data);
    })
    .then(() => {
        console.log(listOfIngredients);
    });
```

`async` / `await` syntax that handles the same set of tasks:

```javascript
async function logIngredients() {
    const url = await doSomething();
    const res = await fetch(url);
    const data = await res.json();
    listOfIngredients.push(data);
    console.log(listOfIngredients);
}
```


> You should, almost never, need to use `try` / `catch` without using `async` / `await`

Using `then` typically comes with `catch` because you need to handle errors, however `async` / `await` does **not** have a `catch` phrase so nested `try` / `catch` blocks become necessary:

With `then` / `catch`:
```javascript
doSomethingCritical()
    .then((result) =>
        doSomethingOptional(result)
            .then((optionalResult) => doSomethingExtraNice(optionalResult))
            .catch((e) => {}),
    ) // Ignore if optional stuff fails; proceed.
    .then(() => moreCriticalStuff())
    .catch((e) => console.error(`Critical failure: ${e.message}`));
```

With `async` / `await`:
```javascript
async function main() {
    try {
        const result = await doSomethingCritical();
        try {
            const optionalResult = await doSomethingOptional(result);
            await doSomethingExtraNice(optionalResult);
        } catch (e) {
            // Ignore failures in optional steps and proceed.
        }
        await moreCriticalStuff();
    } catch (e) {
        console.error(`Critical failure: ${e.message}`);
    }
}
```


A *promise* is in one of three states:
- *pending* - initial state, neither fulfilled nor rejected
- *fulfilled* - meaning that the operation was completed successfully
- *rejected* - meaning that the operation failed


```javascript
// Example Promise syntax
const whereIsMyCoffeeOrder = function (orderId) {
    return new Promise((resolve, reject) => {
        coffeeApi.checkStatus(orderId, (error, coffeeStatus) => {
            if (error) {
                reject(error);
            } else {
                resolve(coffeeStatus);
            }
        });
    });
};


// response.data.activity
// where 'activity' is a key in the data object
```



`promise.then((result) => {})` will handle fulfilled (resolved) promises
`promise.catch((error) => {})` will handle failed (rejected) promises


```javascript
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

// Method using Then
function start2 () {
    getData()
        .then(result => {
            console.log(result);
        });
}
```

`fetch()` is a native browser feature (it **always** returns a *promise*):

```javascript
async function start () {
    // grab the data
    const data = await fetch ("www.someURL.com/data");

    // json-ify the data
    const result = await data.json();
    console.log(result.properties);
}

start();
```

**Notes:**
- The `return` of any *asychronous* code will **always** be a *promise* **not** the value because the *promise* indicates that the value may/not be available



```javascript
// Using the 'returned' value
const address = fetch("https://jsonplaceholder.typicode.com/users/1")
  .then((response) => response.json())
  .then((user) => {
    return user.address;
  });

const printAddress = async () => {
  const a = await address;
  console.log(a);
};

printAddress();
```


Is `finally` necessary if `try` runs sucessfully?


An IIFE can be asynchronous!

```javascript
(async () => {
    console.log("Hello, world!");
})();
```