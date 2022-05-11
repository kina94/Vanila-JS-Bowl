import BreadCrumb from './BreadCrumb.js'
import { request } from './api.js'
import Nodes from './Nodes.js'
import ImageView from './ImageView.js'
import Loading from './Loading.js'

const cache = {}

export default function App($app) {
    this.state = {
        isRoot: true,
        nodes: [],
        depth: [],
        isLoading: false,
        selectedFilePath:null,
    }

    //initializing
    const breadCrumb = new BreadCrumb({ $app, initialState: { depth: this.state.depth },
    onClickDepth : async(nodeId) =>{
        if(nodeId === 'root'){
            this.setState({
                ...this.state,
                isRoot:true,
                depth:[],
                nodes : cache.rootNodes,
            })
            return
        }
        
        if(nodeId===this.state.depth.length-1){
            return
        }

        const nextState = {...this.state}
        const nextDepth = this.state.depth.slice(0, this.state.depth.length-1)

        this.setState({
            ...nextState,
            depth : nextDepth,
            nodes: cache[nextDepth[nextDepth.length-1].id],
            isLoading: false,
        })

    }
    })
    const nodes = new Nodes({
        $app, initialState: { isRoot: this.state.isRoot, nodes: this.state.nodes },
        onClick: async(node) => { //Nodes.js에서 전달받은 selectedNode 받기
            this.setState({
                ...this.state,
                isLoading:true,
            })
            if (node.type === 'DIRECTORY') {
                if(cache[node.id]){
                    this.setState({
                        ...this.state,
                        isRoot: false,
                        isLoading:false,
                        nodes: cache[node.id],
                        depth: [...this.state.depth, node]
                    })
                } else{
                    const nextNodes = await request(node.id) //request에 node.id값을 받아서 고양이 파일들 불러오기
                    this.setState({
                        ...this.state,
                        isRoot: false,
                        isLoading:false,
                        nodes: nextNodes,
                        depth: [...this.state.depth, node]
                    })
                    cache[node.id] = nextNodes
                }

            } else if (node.type === 'FILE') {
                this.setState({
                    ...this.state,
                    isLoading: false,
                    selectedFilePath: node.filePath
                })
            } else {
                const nextState = {...this.state}
                nextState.depth.pop() // BreadCrumb에서 마지막 한 개 pop

                console.log(nextState.depth[nextState.depth.length-1].id)
                const prevNodeId = nextState.depth.length === 0 ? null : nextState.depth[nextState.depth.length-1].id

                if(prevNodeId===null){
                    this.setState({
                        ...nextState,
                        isLoading: false,
                        isRoot: true,
                        nodes: cache.rootNodes
                      })
                } else {
                    this.setState({
                        ...nextState,
                        isLoading:false,
                        isRoot: false,
                        nodes : cache[prevNodeId]
                    })
                }
            }
        }
    })
    const imageView = new ImageView({$app, initialState: this.state.selectedFilePath,
    modalClose: () => {this.setState({...this.state, selectedFilePath:null})}})

    const loading = new Loading({$app, initialState: this.state.isLoading})


    //state 전역 관리
    this.setState = (nextState) => {
        this.state = nextState
        breadCrumb.setState(this.state.depth)
        nodes.setState({ isRoot: this.state.isRoot, nodes: this.state.nodes })
        imageView.setState(this.state.selectedFilePath)
        loading.setState(this.state.isLoading)
    }

    const init = async () => {
        const rootNodes = await request()
        this.setState({
            ...this.state,
            isLoading: false,
            isRoot: true,
            nodes: rootNodes
        })
        cache.rootNodes = rootNodes;
    }

    init()
}