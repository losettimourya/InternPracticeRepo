import './App.css';
import React from 'react';

function Functions() {
    function functions1(e) {
        setInterval(() => {
            e.target.style.backgroundColor =
            "#" + Math.floor(Math.random() * 16777215).toString(16);
            }, 1000);
        function showMessage() {
            alert('Hello everyone!');
        };
        showMessage();
        let message = 'Bye everyone!';
        function showMessage2() {
            // alert(message);
            let message = 'Hello everyone!';
            alert(message);
        };
        showMessage2();

        function showMessage3(from, text) {
            alert(from + ': ' + text);
        }
        showMessage3('Ann', 'Hello!');

        function showMessage4(from, text) {
            from = '*' + from + '*';
            alert(from + ': ' + text);
        }
        let from = 'Ann';
        showMessage4(from, 'Hello!'); // *Ann*: Hello!

        alert(from); // Ann

        function sum(a, b) {
            return a + b;
        }
        let result = sum(1, 2);
        alert(result);

        function checkAge(age) {
            if (age >= 18) {
                return true;
            } else {
                return window.confirm('Do you have permission from your parents?');
            }
        }
        let age = prompt('How old are you?', 18);
        if (checkAge(age)) {
            alert('Access granted');
        } else {
            alert('Access denied');
        }
    };

    function functions2(e) {
        setInterval(() => {
            e.target.style.backgroundColor =
            "#" + Math.floor(Math.random() * 16777215).toString(16);
            }, 1000);
        let sum = (a, b) => a + b;
        let square = n => n * n;
        let sayHi = () => alert('Hello!');
        let age = prompt('What is your age?', 18);
        let welcome = (age < 18) ?
            () => alert('Age below 18') :
            () => alert('Age >= 18');
        welcome();
        let func = (a, b) => {
            let result = a + b;
            return result;
        }
        alert(sum(1, 2));
        alert(square(2));
        sayHi();
        alert(func(1, 2));
    }

    function function3(e) {
        setInterval(() => {
            e.target.style.backgroundColor =
            "#" + Math.floor(Math.random() * 16777215).toString(16);
            }, 1000);
        try {
            sayHi('John'); // Hello, John
        } catch (e) {
            alert(e);
        }
        try {
            sayHi2('John'); // Error: sayHi2 is not defined
        } catch (e) {
            alert(e);
        }
        function sayHi(name) {
            alert(`Hello, ${name}`);
        }

        let sayHi2 = function (name) {
            alert(`Hello2, ${name}`);
        }
        alert(sayHi2); // Function is a value

        let age = +prompt('What is your age?', 18);
        if (age < 18) {
            function sayHello() {
                alert('Hello!');
            }
        }
        else {
            function sayHello() {
                alert('Greetings!');
            }
        }
        // try{
        //     sayHello();
        // } catch(e) {
        //     alert(e);
        // }
        let sayHello2;
        if (age < 18) {
            sayHello2 = function () {
                alert('Hello!');
            }
        }
        else {
            sayHello2 = function () {
                alert('Greetings!');
            }
        }
        try {
            sayHello2();
        } catch (e) {
            alert(e);
        }


        // Callback functions
        let ask = (question, yes, no) => {
            if (window.confirm(question)) yes();
            else no();
        }
        let sayyes = () => alert('You said yes');
        let sayno = () => alert('You said no');
        ask('Do you agree?', sayyes, sayno);
    }

    return (
        <div className="App">
            <div id="functions">
                <h1>FUNCTIONS</h1>
                <h2>Function basics</h2>
                <pre>
                    <code>
                        {`
                        function showMessage() {
                            alert('Hello everyone!');
                        };

                        showMessage();


                        let message = 'Bye everyone!';

                        function showMessage2() {
                            let message = 'Hello everyone!';
                            alert(message);
                        };

                        showMessage2();
                    

                        function showMessage3(from, text) {
                            alert(from + ': ' + text);
                        }

                        showMessage3('Ann', 'Hello!');
                    

                        function showMessage4(from, text) {
                            from = '*' + from + '*';
                            alert(from + ': ' + text);
                        }
                        let from = 'Ann';
                        showMessage4(from, 'Hello!'); // *Ann*: Hello!
                    
                        alert(from); // Ann
                    

                        function sum(a, b) {
                            return a + b;
                        }
                        let result = sum(1, 2);
                        alert(result);
                    
                        function checkAge(age) {
                            if (age >= 18) {
                                return true;
                            } else {
                                return confirm('Do you have permission from your parents?');
                            }
                        }
                        let age = prompt('How old are you?', 18);
                        if (checkAge(age)) {
                            alert('Access granted');
                        } else {
                            alert('Access denied');
                        }
                        `}
                    </code>
                </pre>
                <button onClick={functions1}>Check how this works</button>
                <h2>Arrow Functions</h2>
                <pre>
                    <code>
                        {` let sum = (a,b)=> a + b;
    let square = n => n * n;
    let sayHi = () => alert('Hello!');
    let age = prompt('What is your age?', 18);
    let welcome = (age < 18) ?
        () => alert('Age below 18') :
        () => alert('Age >= 18');
    welcome();
    let func = (a,b) => {
        let result = a + b;
        return result;
    }
    alert(sum(1,2));
    alert(square(2));
    sayHi();
    alert(func(1,2));`}
                    </code>
                </pre>
                <button onClick={functions2}>Check how this works</button>
                <h2>Function Expressions</h2>
                <pre>
                    <code>
                        {` 
                try{
                    sayHi('John'); // Hello, John
                } catch(e) {
                    alert(e);
                }
                try{
                    sayHi2('John'); // Error: sayHi2 is not defined
                } catch(e) {
                    alert(e);
                }
                function sayHi(name) {
                    alert(\`Hello, \${name}\`);
                }
            
                let sayHi2 = function(name) {
                    alert(\`Hello2, \${name}\`);
                }
                alert(sayHi2); // Function is a value
            
                let age = +prompt('What is your age?', 18);
                if(age < 18)
                {
                    function sayHello() {
                        alert('Hello!');
                    }
                }
                else
                {
                    function sayHello() {
                        alert('Greetings!');
                    }
                }
                try{
                    sayHello();
                } catch(e) {
                    alert(e);
                }
                let sayHello2;
                if(age < 18)
                {
                    sayHello2 = function() {
                        alert('Hello!');
                    }
                }
                else
                {
                    sayHello2 = function() {
                        alert('Greetings!');
                    }
                }
                try{
                    sayHello2();
                } catch(e) {
                    alert(e);
                }
                    
                    
                // Callback functions
                let ask = (question, yes, no) => {
                    if(confirm(question)) yes();
                    else no();
                }
                let sayyes = () => alert('You said yes');
                let sayno = () => alert('You said no');
                ask('Do you agree?', sayyes, sayno);
                    `}
                    </code>
                </pre>
                <button onClick={function3}>Check how this works</button>

            </div>
        </div>

    );
};

export default Functions;