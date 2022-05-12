export default function SearchInput ({$app, initialState, onSearch, addSearchHistory, onClickRandomBtn}){
  this.state = initialState
  this.onSearch = onSearch
  this.onClickRandomBtn = onClickRandomBtn
  this.addSearchHistory = addSearchHistory

  this.$target = document.createElement("input");
  this.$target.type='text'
  this.$target.className = "SearchInput";
  this.$target.placeholder = "고양이를 검색해보세요fff.|";
  this.$target.autofocus = true
  $app.appendChild(this.$target);
  this.$target.style.display = 'inline'
  this.$target.style.width = '80%'

  this.$button = document.createElement('button')
  this.$button.className = 'randomBtn'
  this.$button.innerText = '랜덤 고양이'
  $app.appendChild(this.$button)
  this.$button.style.display = 'inline'
  this.$button.style.width = '20%'

  this.setState = (nextState) => {
    this.state = nextState;
  }

  this.$target.addEventListener("keyup", e => {
    if (e.key === 'Enter') {
      this.onSearch(e.target.value);
      this.addSearchHistory(e.target.value)
    }
  });

  this.$target.addEventListener('click', (e) => {
    if(e.target.value){
      e.target.value = null
    }
  })

  this.$button.addEventListener('click', () =>{
    this.onClickRandomBtn()
  })
    
}