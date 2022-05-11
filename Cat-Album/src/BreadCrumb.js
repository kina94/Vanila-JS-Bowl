//재사용할 수 있어야 함.
//왜냐? 경로가 바뀔 때마다 경로가 렌더링 돼야하기 때문.
//따라서 경로를 관리해 줄 state가 필요함. (depth)

export default function BreadCrumb ({$app, initialState, onClickDepth}) {
    this.state = initialState // state 초기화

    //생성
    this.$target = document.createElement('nav')
    this.$target.className = 'BreadCrumb'
    $app.appendChild(this.$target) // qureySelector('.app')에 해당

    this.onClickDepth = onClickDepth // BreadCrumb 클릭해서 경로를 이동할 때 사용됨

    //state 관리
    this.setState = (nextState) =>{
        this.state = nextState
        this.render()
    }

    //render
    this.render = () =>{
        // className이 BreadCrumb인 nav안에 innerHTML 추가
        // 경로를 추가할 거임. (state에 담겨있는 node.name을 depth로 받아오기.)
        this.$target.innerHTML =
        this.state!=null ? 
        `<div id='root'>root</div> ${
            this.state.map((node, index) => {
                return `<div id=${index}>${node.name}</div>`
            }).join('')
        }` : `<div>root</div>`
    }

    // BreadCrumb 클릭해서 경로 이동 시 필요한 해당 depth의 index값 가져오기
    this.handleClickDepth = () =>{
        this.$target.addEventListener('click', e=>{
            this.onClickDepth(e.target.id)
        })
    }

    this.handleClickDepth()
}