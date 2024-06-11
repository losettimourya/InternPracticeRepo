"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var ABC = /** @class */ (function () {
    function ABC() {
        this.number = 0;
    }
    ABC.prototype.getNumber = function () {
        return (0, rxjs_1.interval)(1000) // Emit every 1 second
            .pipe((0, rxjs_1.map)(function () { return Math.random(); }) // Generate random number on each emission
        );
    };
    return ABC;
}());
var abc = new ABC();
var subscription = abc.getNumber().subscribe(function (number) {
    console.log("New random number:", number);
});
