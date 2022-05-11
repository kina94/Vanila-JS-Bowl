//재사용할 수 있어야 함.
//왜냐? 경로가 바뀔 때마다 경로가 렌더링 돼야하기 때문. => state가 필요함.

export default function BreadCrumb ({$app, initialState, onClickDepth}) {
    this.state = initialState // 스테이트에 json을 받아올 거임

    //생성
    this.$target = document.createElement('nav')
    this.$target.className = 'BreadCrumb'
    $app.appendChild(this.$target) // qureySelector('.app')에 해당

    this.onClickDepth = onClickDepth

    //state 관리
    this.setState = (nextState) =>{
        this.state = nextState
        this.render()
    }

    //render
    this.render = () =>{
        // className이 BreadCrumb인 nav안에 innerHTML 추가
        // 경로를 추가할 거임. (state에 담겨있는 json)
        this.$target.innerHTML =
        this.state!=null ? 
        `<div id='root'>root</div> ${
            this.state.map((node, index) => {
                return `<div id=${index}>${node.name}</div>`
            }).join('')
        }` : `<div>root</div>`
    }

    this.handleClickDepth = () =>{
        this.$target.addEventListener('click', e=>{
            this.onClickDepth(e.target.id)
        })
    }

    this.handleClickDepth()
}