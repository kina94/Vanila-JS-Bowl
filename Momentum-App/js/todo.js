const todoForm = document.querySelector('.todo-form')
const todoInput = todoForm.querySelector('input')
const todoList = document.querySelector('.todo-list')

const TODOS_KEY = 'toDos'

let toDos = []

//로컬 스트리지에 제이슨 형태로 투두 저장
function savetoDos() {
    localStorage.setItem('toDos', JSON.stringify(toDos))
}

//삭제
function deleteTodo(event) {
    const li = event.target.parentElement
    li.remove()
    toDos=toDos.filter(key=>key.id!==Number(li.id))
    savetoDos()
}


// 렌더링
function paintTodo(newToDo) {
    const li = document.createElement('li')
    const span = document.createElement('span')
    li.id=newToDo.id
    span.innerText = newToDo.value
    const button = document.createElement('button')
    button.innerText = '❌'
    button.addEventListener('click', deleteTodo)
    li.appendChild(button)
    li.appendChild(span)
    todoList.appendChild(li)
}

//투두 입력하고 렌더링하고 저장하기
function todoFormSubmit(event) {
    event.preventDefault()
    const newTodo = {id:Date.now(), value:todoInput.value}
    todoInput.value = '';
    toDos.push(newTodo);
    paintTodo(newTodo);
    savetoDos();
    location.reload()
}

todoForm.addEventListener('submit', todoFormSubmit)

// 투두 가져오기
const savedToDos = localStorage.getItem(TODOS_KEY)

if (savedToDos !== null) {
    const parsedtoDos = JSON.parse(savedToDos)
    toDos = parsedtoDos;
    toDos.map(newToDo=>{
        paintTodo(newToDo)
    })
}