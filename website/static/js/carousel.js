window.onload = () => {
    let arrowRight = document.querySelector('.LBRight');
    let arrowLeft = document.querySelector('.LBLeft');
    let carousel = document.querySelector('.LCarousel');
    let circles = document.querySelectorAll('.seekerCircle');

    let counter = 0;
    const max = 5;

    arrowRight.addEventListener('click', onRightClick);
    arrowLeft.addEventListener('click', onLeftClick);
    for (let i = 0; i < circles.length; i++)
    {
        circles[i].addEventListener('click', () => onCircleClick(i));
    }

    function onRightClick() {
        if (counter === 0) return;
        setCounter(counter-1);
    }
    
    function onLeftClick() {
        if (counter === max-1) return;
        setCounter(counter+1);
    }

    function onCircleClick(i) {
        setCounter(i);
    }

    function setCounter(c) {
        circles[counter].classList.remove('seekerCircleActive');
        counter = c;
        carousel.style.transform = `translate(${counter*100}%)`;
        circles[counter].classList.add('seekerCircleActive');
    }
}