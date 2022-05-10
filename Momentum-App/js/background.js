const images = [
    '0.png',
    '1.png',
    '2.png',
    '3.png',
    '4.png'
]

const chosenImage = images[Math.floor(Math.random()*images.length)];

const bgImage = document.querySelector('body');
bgImage.style.backgroundImage=`url(img/${chosenImage})`