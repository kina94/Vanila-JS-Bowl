import BreadCrumb from './BreadCrumb.js'
import { request } from './api.js'
import Nodes from './Nodes.js'
import ImageView from './ImageView.js'
import Loading from './Loading.js'

const cache = {} // api를 계속해서 불러올 필요 없이 캐싱하기 위한 obj

export default function App($app) {
    this.state = { // 사용할 state
        isRoot: true, // 루트 경로인지 판별
        nodes: [], // 현재 노드의 파일과 디렉토리
        depth: [], // 현재 경로
        isLoading: false, // 로딩창
        selectedFilePath: null, // 이미지 파일
    }

    //initializing
    const breadCrumb = new BreadCrumb({
        $app, initialState: { depth: this.state.depth },
        //BreadCrumb를 통한 경로 이동 (이미 모두 한 번 거쳐왔기 때문에 캐싱으로만 이동 가능)
        onClickDepth: async (nodeId) => {
            if (nodeId === 'root') { // 이동 대상이 루트 노드일 경우
                this.setState({
                    ...this.state,
                    isRoot: true,
                    depth: [],
                    nodes: cache.rootNodes,
                })
                return
            }
            else if (Number(nodeId) === this.state.depth.length - 1) { // 이동 대상이 본인일 경우
                return
            } else {
                const nextState = { ...this.state }
                const nextDepth = this.state.depth.slice(0, Number(nodeId) + 1)
                // 타겟 노드까지 자르기

                this.setState({
                    ...nextState,
                    depth: nextDepth,
                    nodes: cache[nextDepth[nextDepth.length - 1].id],
                    isLoading: false,
                })
            }

        }
    })

    const nodes = new Nodes({
        $app, initialState: { isRoot: this.state.isRoot, nodes: this.state.nodes },
        onClick: async (node) => { //Nodes.js에서 전달받은 selectedNode 받기
            this.setState({ //이동할 때마다 로딩 띄우기
                ...this.state,
                isLoading: true,
            })
            if (node.type === 'DIRECTORY') { // 클릭한 노드가 폴더면
                if (cache[node.id]) { // 캐시에 데이터가 있다면 캐시를 통해 불러오고
                    this.setState({
                        ...this.state,
                        isRoot: false,
                        isLoading: false,
                        nodes: cache[node.id],
                        depth: [...this.state.depth, node]
                    })
                } else {
                    const nextNodes = await request(node.id) //캐시가 없으면 API로 불러오기
                    this.setState({
                        ...this.state,
                        isRoot: false,
                        isLoading: false,
                        nodes: nextNodes,
                        depth: [...this.state.depth, node]
                    })
                    cache[node.id] = nextNodes
                }

            } else if (node.type === 'FILE') { // 파일이면
                this.setState({
                    ...this.state,
                    isLoading: false,
                    selectedFilePath: node.filePath
                })
            } else { // 이전으로 돌아가기면
                const nextState = { ...this.state }
                nextState.depth.pop() // BreadCrumb에서 마지막 한 개 pop

                //돌아갈 경로가 없으면 null, 돌아갈 경로가 있으면 마지막 요소의 id값 가져오기
                const prevNodeId = nextState.depth.length === 0 ? null : nextState.depth[nextState.depth.length - 1].id
                if (prevNodeId === null) { // 돌아갈 경로가 없으면 root노드로
                    this.setState({
                        ...nextState,
                        isLoading: false,
                        isRoot: true,
                        nodes: cache.rootNodes
                    })
                } else { // 돌아갈 경로가 있으면 해당 경로로
                    this.setState({
                        ...nextState,
                        isLoading: false,
                        isRoot: false,
                        nodes: cache[prevNodeId]
                    })
                }
            }
        }
    })
    const imageView = new ImageView({
        $app, initialState: this.state.selectedFilePath,
        modalClose: () => { this.setState({ ...this.state, selectedFilePath: null }) }
    })

    const loading = new Loading({ $app, initialState: this.state.isLoading })


    //state 전역 관리
    this.setState = (nextState) => {
        this.state = nextState
        breadCrumb.setState(this.state.depth)
        nodes.setState({ isRoot: this.state.isRoot, nodes: this.state.nodes })
        imageView.setState(this.state.selectedFilePath)
        loading.setState(this.state.isLoading)
    }

    //API initializing
    const init = async () => {
        const rootNodes = await request()
        this.setState({
            ...this.state,
            isLoading: false,
            isRoot: true,
            nodes: rootNodes
        })
        cache.rootNodes = rootNodes; // 루트 노드를 캐싱
    }

    init()
}