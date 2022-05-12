export default function RandomCatBanner ({$app, initialState, onClick}){
    this.state = initialState

    this.$target=document.createElement('section')
    this.$target.className = 'RandomCatBanner'
    $app.appendChild(this.$target)

    this.setState = (nextState) =>{
        this.state = nextState
        this.render()
    }

    this.render = () =>{
        this.$target.innerHTML = 
        `<button class='Left'><<</button>
        <ul>
        ${this.state.map(image => {
            return `<li>
                <img class='random-cat' src=${image.url}></img>
            </li>`
        }).join('')}
        </ul>
        <button class='Right'>>></button>`
    }

    // this.handleOnClick = (e) =>{
    //     const direction = e.target.className
    //     this.onClick(direction)
    // }
    
    this.render()
    // this.handleOnClick()
}