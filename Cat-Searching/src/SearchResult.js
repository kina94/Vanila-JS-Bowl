
export default function SearchResult({ $app, initialState, onClick }) {
  this.state = initialState
  this.onClick = onClick

  this.$target = document.createElement("section");
  this.$target.className = "SearchResult";
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    this.$target.innerHTML =
      this.state.length != 0 ?
        this.state.map(cat => `
        <div class="item">
          <img src=${cat.url} alt=${cat.name} title=${cat.name} />
        </div>`).join("") : '검색 결과가 없습니다.'

    this.$target.querySelectorAll(".item").forEach(($item, index) => {
            $item.addEventListener("click", () => {
              this.onClick(this.state[index]);
            });
          });
  }

  this.render();

}

