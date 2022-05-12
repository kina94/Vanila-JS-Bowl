export default function Loading ({$app, initialState}){
    this.state=initialState;
    this.$target = document.createElement('div')
    this.$target.className = 'ImageInfo'

    $app.appendChild(this.$target)

    this.setState = (nextState) =>{
        this.state = nextState
        this.render()
    }

    this.render = () => {
        this.$target.innerText = '로딩중입니다.'
        this.$target.style.fontSize = '60px'
        this.$target.style.fontWeight = 'bold'
        this.$target.style.textAlign = 'center'
        this.$target.style.color = 'red'
        this.$target.style.display = this.state ? 'block' : 'none'
    }
    
    this.render()
}