const loginForm = document.querySelector('.login-form')
const loginInput = loginForm.querySelector('input')
const greeting = document.querySelector('.greeting')
const link = document.querySelector('a')

const VISIBLE_CLASSNAME='visible'
const USERNAME_KEY = "username"

// 이름으로 로그인 submit
function onLoginSubmit(event) {
    event.preventDefault()
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username)
    loginForm.classList.toggle(VISIBLE_CLASSNAME);
    paintGreetings(username)
}

// 이름 입력 시 환영 메세지 출력
function paintGreetings (username){ 
    greeting.innerText=`Hello ${username}`
    greeting.classList.toggle(VISIBLE_CLASSNAME)
}


//local storage에 저장된 유저네임 불러오기
const savedUsername = localStorage.getItem(USERNAME_KEY)

if(savedUsername===null){
    loginForm.classList.toggle(VISIBLE_CLASSNAME);
    loginForm.addEventListener('submit', onLoginSubmit)
} else {
    paintGreetings(savedUsername)
}