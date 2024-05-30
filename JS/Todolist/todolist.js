
let heading = document.createElement('h1');
heading.innerHTML = 'Todo List';
document.body.appendChild(heading);

let input = document.createElement('input');
document.body.appendChild(input);

let button = document.createElement('button');
button.innerHTML = 'Add Todo';
document.body.appendChild(button);

let clearbutton = document.createElement('button');
clearbutton.innerHTML = 'Clear Todos';
document.body.appendChild(clearbutton);

let ul = document.createElement('ul');

function render() {
    ul.innerHTML = '';
    todos.forEach(todo => {
        let li = document.createElement('li');
        let input = document.createElement('input');
        input.type = 'checkbox';
        li.appendChild(input);
        li.appendChild(document.createTextNode(todo));
        let newbutton = document.createElement('button');
        newbutton.innerHTML = 'Delete';
        newbutton.addEventListener('click', function () {
            todos = todos.filter(t => t !== todo);
            render();
        })
        let editbutton = document.createElement('button');
        editbutton.innerHTML = 'Edit';
        editbutton.addEventListener('click', function () {
            let newtodo = prompt('Enter new todo');
            todos = todos.map((t) => {
                if(t == todo) {
                    return newtodo;
                }
                console.log(t);
                return t;
            });
            render();
        })
        li.appendChild(editbutton);
        li.appendChild(newbutton);
        ul.appendChild(li);
    })
}

let todos = [];
button.addEventListener('click', function () {
    let todo = input.value;
    console.log(todo);
    todos.push(todo);
    render();
})

clearbutton.addEventListener('click', function () {
    todos = [];
    render();
});

document.body.appendChild(ul);