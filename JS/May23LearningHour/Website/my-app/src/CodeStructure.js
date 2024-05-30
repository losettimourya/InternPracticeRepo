import './App.css';

function CodeStructure() {
    function sturct1(e) {
        setInterval(() => {
            e.target.style.backgroundColor =
            "#" + Math.floor(Math.random() * 16777215).toString(16);
            }, 1000);
        alert('Hello World!');
        [1, 2].forEach(alert);
        alert(3 +
            2 +
            1
        );
        try {
            alert('Hello World!')
            [1, 2].forEach(alert);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div className="App">
            <div id="codestructure">
                <h1>CODE STRUCTURE</h1>
                <h2>Semicolons and comments</h2>
                <pre>
                    <code>
                        {`
                        try{
                        alert('Hello World!');
                        [1, 2].forEach(alert);
                        } catch(e){
                        console.log(e);
                        }
                        
                        alert(3+
                            2+
                            1
                        ); // Works properly without semicolon because the code doesn't assume a semicolon after incomplete expression
                        
                        try{
                        alert('Hello World!') 
                        [1, 2].forEach(alert); // Doesn't work properly without semicolon because the code doesn't assume a semicolon before square brackets
                        } catch(e){
                        console.log(e);
                        }
                        `}
                    </code>
                </pre>
                <button id="struct1" onClick={sturct1}>Click me</button>
            </div>
        </div>
    );
}

export default CodeStructure;