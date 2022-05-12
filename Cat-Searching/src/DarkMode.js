export default function DarkMode({$app, onClick}) {
    this.$target = document.createElement('input')
    this.$target.type = 'checkbox'
    this.$target.className = 'DarkMode'
    $app.appendChild(this.$target)

    this.$target.addEventListener('click', (e)=>{
        document.querySelector('body').classList.toggle('dark')
    })
}