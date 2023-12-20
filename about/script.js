/* Intializing variables for image carousel
-------------------------------------------------*/
let currentImageNum = 0;
let previousImageNum = 0;
const images = document.getElementsByClassName('images');
const prevImage = document.querySelector('.previous');
const nextImage = document.querySelector('.next');

/* Event listener that goes to the next image of the carousel
----------------------------------------------------------------*/
nextImage.addEventListener('click', () => {
    previousImageNum = currentImageNum;
    currentImageNum++;

    if (currentImageNum >= images.length) {
        currentImageNum = 0;
    };
    
    images[previousImageNum].style.display = 'none';
    images[currentImageNum].style.display = 'block';
});

/* Event listener that goes to the previous image of the carousel
---------------------------------------------------------------------*/
prevImage.addEventListener('click', () => {
    previousImageNum = currentImageNum;
    currentImageNum--;

    if (currentImageNum < 0) {
        currentImageNum = images.length-1;
    }

    images[previousImageNum].style.display = 'none';
    images[currentImageNum].style.display = 'block';
});