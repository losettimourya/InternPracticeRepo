"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var cache = {
    data: {},
    diff: function (oldData, newData) {
        var changes = {};
        for (var key in newData) {
            if (!oldData.hasOwnProperty(key) || newData[key] !== oldData[key]) {
                changes[key] = newData[key];
            }
        }
        return changes || null;
    },
};
// Simulate some initial data
var initialState = {
    item1: "value1",
    item2: "value2",
};
cache.data = initialState;
var observeCacheChanges = function (currentCache) {
    return new rxjs_1.Observable(function (subscriber) {
        var unsubscribeStoreChange = function () { }; // Simulate unsubscribe
        // Simulate cache update
        setTimeout(function () {
            var newData = __assign(__assign({}, initialState), { item3: "value3" });
            var changes = currentCache.diff(cache.data, newData);
            cache.data = newData;
            if (changes) {
                subscriber.next(changes);
            }
        }, 1000); // Simulate delay
        return unsubscribeStoreChange;
    });
};
// Usage
var currentState = cache.data;
var cacheChangesObservable = observeCacheChanges(currentState);
cacheChangesObservable.subscribe({
    next: function (changes) {
        console.log("Cache updated:", changes);
    },
    error: function (err) {
        console.error("Error observing cache changes:", err);
    },
});
