const quotes = [
    ['나에겐 철학이 있어. 어려운 일이 있다면, 언젠가는 좋은 일도 있다는 거야.'],
    ['바보 같은 소리 마. 자신감만 가지면 돼.'],
    ['처음부터 그렇게 나쁜 트리는 아닌 거 같았어. 사실 꽤 괜찮지. 사랑이 좀 필요할 뿐이야.'],
    ['행복이란 따뜻한 담요 같은 것.'],
    ['너무 심각할 것 없어. 잘 될 거야. 시간을 가져.'],
    ['내 인생도 그럴 것 같아. 모든 게 잘 될 것만 같아.'],
    ['모두가 거짓이래도, 난 당신을 믿어요.'],
    ['크기에 상관 없이 내 마음을 봐 줘.'],
    ['걱정하는 게 걱정이야.'],
    ['이를 악물면 뭐든 할 수 있어!'],
]

const quote = document.querySelector('.quote span')

function getRandomQuote () {
    const randomNumber = Math.floor(Math.random()*quotes.length)
    quote.innerHTML = quotes[randomNumber]
}

getRandomQuote()
setInterval(getRandomQuote, 3000)