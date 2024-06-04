# Observables

- Observables are lazy Push collections of multiple values.
- Pull and Push are two different protocols that describe how a data Producer can communicate with a data Consumer.

- In Pull systems, the Consumer determines when it receives data from the data Producer. The Producer itself is unaware of when the data will be delivered to the Consumer. Eg: Function, Iterator

- In Push systems, the Producer determines when to send data to the Consumer. The Consumer is unaware of when it will receive that data.
Eg: Promise, Observable

A promise can emit only a single value at a time.
An observable can emit multiple values.

Promises are not lazy; they will execute immediately on creation.
Observables are lazy when we subscribe then only that will execute.

There is no facility to unsubscribe promises.
We can unsubscrible observables

Observable provides operators like `map`, `forEach`, `reduce`, ... similar to an array

`observable.subscribe()`
Subscribes to the observable with callback functions. Returns a subscription object that can be used to cancel the stream.

`observable.all()`
Returns a Promise for an array containing all of the values produced by the observable.

`observable.concat()`
Merges the current observable with additional observables.

`observable.reduce()`
Returns a new Observable that applies a function against an accumulator and each value of the stream to reduce it to a single value.

`observable.map()`
Returns a new Observable that emits the results of calling the callback argument for every value in the stream.

`observable.filter()`
Returns a new Observable that emits all values which pass the test implemented by the callback argument.

`observable.forEach()`
Subscribes to the observable and returns a Promise for the completion value of the stream. The callback argument is called once for each value in the stream.


