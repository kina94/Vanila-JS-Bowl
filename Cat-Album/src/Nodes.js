//재사용 할 수 있어야 함.
//왜냐? 경로가 바뀔 때마다 Nodes 의 Node가 렌더링 되기 때문 => state 필요.

export default function Nodes({ $app, initialState, onClick }) {
    this.state = initialState;
    this.onClick = onClick

    this.$target = document.createElement('div')
    this.$target.className = 'Nodes'
    $app.appendChild(this.$target)

    this.setState = (nextState) => {
        this.state = nextState
        this.render() // state가 업데이트 될 때마다 렌더링 될거임
    }

    this.render = () => { // 어떤게 렌더링 될건데?
        //state로 받아온 node들을 렌더링 할거임. 근데 루트경로일 때랑 루트경로 아닐때랑 구분해서 렌더링 해야함.
        const showNode = this.state.nodes.map(node => {
            return `<div class='Node' id=${node.id}> 
                <div>${node.name}</div></div>`
        }).join('')


        this.$target.innerHTML =
            !this.state.isRoot ? `<div class='Node' id='back'>이전화면</div>${showNode}` : showNode
    }

    this.render()

    this.$target.addEventListener('click', (e)=>{
        // 가장 가까운 부모 요소의 id 가져오기
        const nodeId = e.target.closest('.Node').id 
        // 현재 노드에서 클릭된 id인 노드만 찾기 
        const selectedNode = this.state.nodes.find(node=>node.id===nodeId) 

        if(selectedNode){
            this.onClick(selectedNode) //onClick 함수에 selectedNode 전달
        } else {
            this.onClick('back')
        }
    })
}