export default function SearchiHistory ({$app, initialState, onClick}){
    this.state = initialState
    this.onclick = onClick

    this.$target = document.createElement('ul')
    this.$target.className = 'SearchiHistory'
    $app.appendChild(this.$target)

    this.setState = (nextState) =>{
        this.state = nextState
        this.render()
    }

    this.render = () =>{
        this.$target.innerHTML =
        this.state.map(history=>{
            return `
                <li>${history}</li>
            `
        }).join('')
    }

    this.$target.addEventListener('click', (e)=>{
        this.onclick(e.target.innerText)
    })

    this.render()
}