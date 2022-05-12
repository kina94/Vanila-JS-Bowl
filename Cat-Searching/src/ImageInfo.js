export default function ImageInfo({ $app, initialState, modalClose }) {
  this.state = initialState
  this.modalClose = modalClose

  this.$target = document.createElement("div");
  this.$target.className = "ImageInfo";
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    if (this.state.visible) {
      const { name, url, temperament, origin } = this.state.image;

      this.$target.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <button class="close">x</button>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <p>성격: ${temperament}</p>
            <p>태생: ${origin}</p>
          </div>
        </div>`;
      this.$target.style.display = "block";
    } else {
      this.$target.style.display = "none";
    }
  }

  this.modalCloseEvent = () =>{
    this.$target.addEventListener('click', (e) =>{
      if(e.target.className === 'close') {
        this.modalClose()
      }
      if(e.target.className === 'ImageInfo'){
        this.modalClose()
      }
    })
    window.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape'){
        this.modalClose()
      }
    })
  }

  this.render()
  this.modalCloseEvent()
}

