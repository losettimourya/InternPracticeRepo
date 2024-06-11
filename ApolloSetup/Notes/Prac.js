"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
// Simulated cache data
var cacheData = { value: 0 };
// Subject for data change notifications
var dataChangeSubject = new rxjs_1.Subject();
// Observable to monitor data changes
var observeDataChanges = function () {
    return dataChangeSubject.asObservable().pipe((0, operators_1.startWith)(cacheData), // Emit initial data
    (0, operators_1.distinctUntilChanged)(), // Ensure only distinct changes are emitted
    (0, operators_1.map)(function () { return cacheData; }) // Map to the latest data
    );
};
// Subscribe to data changes
var dataChangesSubscription = observeDataChanges().subscribe(function (data) {
    console.log('Data change:', data);
});
// Function to update cache data
var updateCacheData = function (newValue) {
    cacheData = newValue;
    dataChangeSubject.next(); // Notify observers of the data change
};
// Simulate data changes
setTimeout(function () { return updateCacheData({ value: 1 }); }, 1000);
setTimeout(function () { return updateCacheData({ value: 2 }); }, 2000);
setTimeout(function () { return updateCacheData({ value: 3 }); }, 3000);
// To stop observing data changes
// dataChangesSubscription.unsubscribe();
