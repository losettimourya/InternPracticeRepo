import { Observable, interval, map } from "rxjs";

class ABC {
    private number: number;
  
    constructor() {
      this.number = 0;
    }
  
    public getNumber(): Observable<number> {
      return interval(1000) 
        .pipe(
          map(() => Math.random())
        );
    }
  }

  const abc = new ABC();
const subscription = abc.getNumber().subscribe((number) => {
  console.log("New random number:", number);
});