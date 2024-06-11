import { Observable } from "rxjs";

const cache = {
  data: {},
  diff: (oldData, newData) => {
    const changes = {};
    for (const key in newData) {
      if (!oldData.hasOwnProperty(key) || newData[key] !== oldData[key]) {
        changes[key] = newData[key];
      }
    }
    return changes || null;
  },
};

// Simulate some initial data
const initialState = {
  item1: "value1",
  item2: "value2",
};
cache.data = initialState;

const observeCacheChanges = (currentCache) => {
  return new Observable(subscriber => {
    const unsubscribeStoreChange = () => {}; // Simulate unsubscribe

    // Simulate cache update
    setTimeout(() => {
      const newData = { ...initialState, item3: "value3" };
      const changes = currentCache.diff(cache.data, newData);
      cache.data = newData;
      if (changes) {
        subscriber.next(changes);
      }
    }, 1000); // Simulate delay

    return unsubscribeStoreChange;
  });
};

// Usage
const currentState = cache.data;
const cacheChangesObservable = observeCacheChanges(currentState);

cacheChangesObservable.subscribe({
  next(changes) {
    console.log("Cache updated:", changes);
  },
  error(err) {
    console.error("Error observing cache changes:", err);
  },
});