import logo from './logo.svg';
import './App.css';

function App() {
  const calculator = (a, b, op) => {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        if (b == 0) return 'Not possible'
        return a / b;
      default:
        return NaN;
    }
  }

  function switch1(e) {
    setInterval(() => {
      e.target.style.backgroundColor =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
      }, 1000);
    let a = +prompt('Enter first number: ');
    let b = +prompt('Enter second number: ');
    let op = prompt('Enter operator: ');
    alert(calculator(a, b, op));
  }

  function switch2(e) {
    setInterval(() => {
      e.target.style.backgroundColor =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
      }, 1000);
    let a = +prompt('Enter a number: ');
    switch (a) {
      case 1:
        alert(1);
      case 2:
        alert(2);
      case 3:
        alert(3);
      case 4:
        alert(4);
      default:
        alert('I dont know such values');
    }
  };

  function switch3(e) {
    setInterval(() => {
      e.target.style.backgroundColor =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
      }, 1000);
    let a = +prompt('Enter a number: ');
    switch (a) {
      default:
        alert('I dont know such values');
      case 1:
        alert(1);
        break;
      case 2:
        alert(2);
        break;
      case 3:
        alert(3);
        break
      case '3':
        alert(33);
        break
      case 4:
        alert(4);
        break;
    }
  };

  function switch4(e) {
    setInterval(() => {
      e.target.style.backgroundColor =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
      }, 1000);
    let a = prompt('Enter a number: ');
    switch (a) {
      default:
        alert('I dont know such values');
      case 1:
        alert(1);
        break;
      case 2:
        alert(2);
        break;
      case 3:
        alert(3);
        break
      case '3':
        alert(33);
        break
      case 4:
        alert(4);
        break;
    }
  };

  function switch5(e) {
    setInterval(() => {
      e.target.style.backgroundColor =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
      }, 1000);
    let a = +prompt('Enter a number: ');
    switch (a) {
      case 1:
      case 2:
        alert("1 or 2");
        break;
      case 3:
      case 4:
        alert("3 or 4");
        break;
      default:
        alert('I dont know such values');
    }
  };

  return (
    <div className="App">
      <div id="switch">
        <h1>SWITCH</h1>
        <h2>Basic Switch Case</h2>
        <pre>
          <code>
            {` const calculator = (a,b,op) => {
    switch(op){
      case '+':
        return a+b;
      case '-':
        return a-b;
      case '*':
        return a*b;
      case '/':
        if(b == 0) return 'Not possible'
        return a/b;
      default:
        return NaN;
    }
  } `}
          </code>
        </pre>
        <button onClick={switch1}>Check how this works</button>
        <h2>Basic Switch Case without breaks</h2>
        <pre>
          <code>
            {`
          switch(a) {
          case 1:
            alert(1);
          case 2:
            alert(2);
          case 3:
            alert(3);
          case 4:
            alert(4);
          default:
            alert('I dont know such values');
        }`}
          </code>
        </pre>
        <button onClick={switch2}>Check how this works</button>

        <h2>Default shifted to the Top</h2>
        <pre>
          <code>
            {`
          let a = +prompt('Enter a number: ');
          switch(a) {
            default:
              alert('I dont know such values');
            case 1:
              alert(1);
              break;
            case 2:
              alert(2);
              break;
            case 3:
              alert(3);
              break
            case '3':
              alert(33);
              break
            case 4:
              alert(4);
              break;
          }`}
          </code>
        </pre>
        <button onClick={switch3}>Check how this works</button>



        <h2> Case based on Type</h2>
        <pre>
          <code>
            {`
          let a = prompt('Enter a number: ');
          switch(a) {
            default:
              alert('I dont know such values');
            case 1:
              alert(1);
              break;
            case 2:
              alert(2);
              break;
            case 3:
              alert(3);
              break
            case '3':
              alert(33);
              break
            case 4:
              alert(4);
              break;
          }`}
          </code>
        </pre>
        <button onClick={switch4}>Check how this works</button>




        <h2>Grouping of Case</h2>
        <pre>
          <code>
            {`
          switch(a) {
            case 1:
            case 2:
              alert("1 or 2");
              break;
            case 3:
            case 4:
              alert("3 or 4");
              break;
            default:
              alert('I dont know such values');
          }`}
          </code>
        </pre>
        <button onClick={switch5}>Check how this works</button>
      </div>
    </div>
  );
}

export default App;
