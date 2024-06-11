import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';

// Simulated cache data
let cacheData: any = { value: 0 };

// Subject for data change notifications
const dataChangeSubject = new Subject<void>();

// Observable to monitor data changes
const observeDataChanges = (): Observable<any> => {
  return dataChangeSubject.asObservable().pipe(
    startWith(cacheData), // Emit initial data
    distinctUntilChanged(), // Ensure only distinct changes are emitted
    map(() => cacheData) // Map to the latest data
  );
};

// Subscribe to data changes
const dataChangesSubscription = observeDataChanges().subscribe((data) => {
  console.log('Data change:', data);
});

// Function to update cache data
const updateCacheData = (newValue: any) => {
  cacheData = newValue;
  dataChangeSubject.next(); // Notify observers of the data change
};

// Simulate data changes
setTimeout(() => updateCacheData({ value: 1 }), 1000);
setTimeout(() => updateCacheData({ value: 2 }), 2000);
setTimeout(() => updateCacheData({ value: 3 }), 3000);

// To stop observing data changes
// dataChangesSubscription.unsubscribe();
