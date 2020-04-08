 /* eslint-disable no-unused-vars */
/* eslint-disable func-style */
/* eslint-disable require-jsdoc */

function createCarousel(slidesCount = 5) {
  let carousel = document.querySelector('#carousel');
  carousel.classList.add('carousel');
  let styleItems = '';
  let style = document.createElement('style')


  for (let i = 1; i <= slidesCount; i++) {
    styleItems +=`
    .slides__item:nth-child(${i}) {
        background-image: url('img/r${Math.round(1 + Math.random()* 4)}.jpg');
    }`;
  }
  style.innerHTML = styleItems;
  document.querySelector('head').appendChild(style);
 
  let outdoorSlide = document.createElement('ul');
  outdoorSlide.classList.add('slides');

  for (let i = 0; i < slidesCount; i++) {
    let slideElement = document.createElement('li');
    let slideLink = '<a href="#"></a>';
    slideElement.innerHTML = slideLink;
    slideElement.classList.add('slides__item');
    outdoorSlide.appendChild(slideElement);
  }
    carousel.appendChild(outdoorSlide);

    let slides = document.querySelectorAll('.slides__item');
    slides[0].classList.add('active');

    let indicatorsContainer = document.createElement('div');
    indicatorsContainer.classList.add('indicators');
    
    for (let i = 0; i < slidesCount; i++) {
        let indicatorsItem = document.createElement('span');
        indicatorsItem.classList.add('indicators__item');
        indicatorsItem.setAttribute('data-slide-to', i);
        indicatorsContainer.appendChild(indicatorsItem);
    }
    carousel.appendChild(indicatorsContainer)

    let indicatorsI = document.querySelectorAll('.indicators__item');
    indicatorsI[0].classList.add('active');

    let controls = document.createElement('div');
    controls.classList.add('controls');

    for (let i = 0; i < 3; i++) {
        let controlsItem = document.createElement('div');
        controlsItem.classList.add('controls__item');
        let fontawesome = document.createElement('i');
        fontawesome.classList.add('fas');
        controlsItem.appendChild(fontawesome);
        controls.appendChild(controlsItem);
    }

    carousel.appendChild(controls);

    let controlsI = document.querySelectorAll('.controls__item');
    controlsI[0].classList.add('controls__prev');
    controlsI[1].classList.add('controls__next');
    controlsI[2].classList.add('controls__pause');

    let fasItem = document.querySelectorAll('.fas');
    fasItem[0].classList.add('fa-chevron-left');
    fasItem[1].classList.add('fa-chevron-right');
    fasItem[2].classList.add('fa-play');

    fasItem[0].setAttribute('id', 'previous');
    fasItem[1].setAttribute('id', 'next');
    fasItem[2].setAttribute('id', 'pause');

    let currentSlide = 0;
    let slideInterval = setInterval(nextSlide, 1000);
  
    let isPlaying = true;
    let pauseButton = document.querySelector('#pause');
    let next = document.querySelector('#next');
    let previous = document.querySelector('#previous');
  
    let indicators = document.querySelector('.indicators');

    
  style.innerHTML += `
  .slides { 
    position: relative;
  }`;

  style.innerHTML += `
  .controls { 
    position: relative; 
  }`;

  style.innerHTML += `
  .indicators { 
    display: flex; 
  }`;
  indicatorsI[0].style.backgroundColor = 'red';

  function goToSlide(n) {
    slides[currentSlide].classList.toggle('active');
    indicatorsI[currentSlide].classList.toggle('active');
    indicatorsI[currentSlide].removeAttribute('style');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.toggle('active');
    indicatorsI[currentSlide].classList.toggle('active');
    indicatorsI[currentSlide].style.backgroundColor = 'red';
  }
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function previousSlide() {
    goToSlide(currentSlide - 1);
  }

  pauseButton.addEventListener('click', () => {
    if (isPlaying) pauseSlideShow();
    else playSlideShow();
  });

  function pauseSlideShow() {
    pauseButton.className = 'fas fa-pause';
    isPlaying = false;
    clearInterval(slideInterval);
  }

  function playSlideShow() {
    pauseButton.className = 'fas fa-play';
    isPlaying = true;
    slideInterval = setInterval(nextSlide, 1000);
  }

  next.addEventListener('click', () => {
    pauseSlideShow();
    nextSlide();
  });

  previous.addEventListener('click', () => {
    pauseSlideShow();
    previousSlide();
  });

  indicators.addEventListener('click', eventIndicators);

  function eventIndicators(event) {

    let target = event.target;

    if (target.classList.contains('indicators__item')) {
      pauseSlideShow();
      goToSlide(+target.getAttribute('data-slide-to'));
    }
  }
}
createCarousel(4);
