const BURGER_BTN = document.querySelector(".burger-btn")
const MENU = document.querySelector(".header-nav")
const LINKS = document.querySelectorAll(".list-item-link")
const BODY_DIMM = document.querySelector('.body-wrapper')


// IMPLEMENTATION BURGER MENU

let menuOpen = false;

function toggleMenu() {
  MENU.classList.toggle("active-nav");
  BURGER_BTN.classList.toggle("active-burger-btn");
  BODY_DIMM.classList.toggle("show-menu");
  menuOpen = !menuOpen;

  if (menuOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

function closeMenu() {
  MENU.classList.remove("active-nav");
  BURGER_BTN.classList.remove("active-burger-btn");
  BODY_DIMM.classList.remove("show-menu");
  menuOpen = false;
  document.body.style.overflow = "";
}

BURGER_BTN.addEventListener("click", toggleMenu);

document.addEventListener("click", (event) => {
  if (!MENU.contains(event.target) && !BURGER_BTN.contains(event.target)) {
    closeMenu();
  }
});

LINKS.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// INFINITY SLIDER

const forwardButton = document.querySelector('.navigation-forward');
const backButton = document.querySelector('.navigation-back');
const slider = document.querySelector('.slider-our-friends');


const request = new XMLHttpRequest();
request.open("GET", "pets.json", false);
request.send(null);
const data = JSON.parse(request.responseText);


function getRandomNumber() {
  return Math.floor(Math.random() * 8);
}


function generateArray(length) {
  const arr = [];
  while (arr.length < length) {
    const num = getRandomNumber();
    if (!arr.includes(num)) {
      arr.push(num);
    }
  }
  return arr;
}


let pastArr = []
let currArr = []
let nextArr = []
let countPetCard = 3;


if (window.innerWidth === 768) {
  countPetCard = 2;
} else if (window.innerWidth === 320) {
  countPetCard = 1;
}


function init() {

  pastArr = generateArray(countPetCard);
  currArr = generateArray(countPetCard).filter(num => !pastArr.includes(num));
  while (currArr.length < countPetCard) {
    const num = getRandomNumber();
    if (!currArr.includes(num) && !pastArr.includes(num)) {
      currArr.push(num);
    }
  }

  nextArr = generateArray(countPetCard).filter(num => !currArr.includes(num));
  while (nextArr.length < countPetCard) {
    const num = getRandomNumber();
    if (!currArr.includes(num) && !nextArr.includes(num)) {
      nextArr.push(num);
    }
  }
}

init();


function forward() {
  pastArr.length = 0;
  pastArr = [...currArr];
  currArr.length = 0;
  currArr = [...nextArr];
  nextArr.length = 0;

  nextArr = generateArray(countPetCard).filter(num => !currArr.includes(num));
  while (nextArr.length < countPetCard) {
    const num = getRandomNumber();
    if (!currArr.includes(num) && !nextArr.includes(num)) {
      nextArr.push(num);
    }
  }
}


function backward() {
  nextArr.length = 0
  nextArr = [...currArr]
  currArr.length = 0
  currArr = [...pastArr]
  pastArr.length = 0

  pastArr = generateArray(countPetCard).filter(num => !currArr.includes(num));
  while (pastArr.length < countPetCard) {
    const num = getRandomNumber();
    if (!currArr.includes(num) && !pastArr.includes(num)) {
      pastArr.push(num);
    }
  }
}

backButton.addEventListener('click', () => {
  if (countPetCard === 3) {
    spinBackward()
    backward()
    addHtml()
  }
  else if (countPetCard === 2) {
    spinBackward()
    backward()
    addHtml2()
  } else if (countPetCard === 1) {
    spinBackward()
    backward()
    addHtml3()
  }
})

forwardButton.addEventListener('click', () => {
  if (countPetCard === 3) {
    spinForward()
    forward()
    addHtml()
  }
  else if (countPetCard === 2) {
    spinForward()
    forward()
    addHtml2()
  } else if (countPetCard === 1) {
    spinForward()
    forward()
    addHtml3()
  }
})

let html3 = ``
let html2 = ``
let html1 = ``

if (countPetCard === 3) {
  addHtml()
} else if (countPetCard === 2) {
  addHtml2()
} else if (countPetCard === 1) {
  addHtml3()
}

function addHtml() {
  slider.innerHTML = ''
  html3 = `
<figure class="pets-card pic1">
<img src="${data[pastArr[0]].img}" alt="pet-pic" class="pet-pic img1">
<figcaption>
    <h3 class="pet-name">${data[pastArr[0]].name}</h3>
    <button class="button-friends button">Learn more</button>
</figcaption>
</figure>
<figure class="pets-card pic2">
<img src="${data[pastArr[1]].img}" alt="pet-pic" class="pet-pic img2">
<figcaption>
    <h3 class="pet-name">${data[pastArr[1]].name}</h3>
    <button class="button-friends button">Learn more</button>
</figcaption>
</figure>
<figure class="pets-card pic3">
<img src="${data[pastArr[2]].img}" alt="pet-pic" class="pet-pic img3">
<figcaption>
    <h3 class="pet-name">${data[pastArr[2]].name}</h3>
    <button class="button-friends button">Learn more</button>
</figcaption>
</figure>
<figure class="pets-card pic4">
<img src="${data[currArr[0]].img}" alt="pet-pic" class="pet-pic img4">
<figcaption>
    <h3 class="pet-name">${data[currArr[0]].name}</h3>
    <button class="button-friends button">Learn more</button>
</figcaption>
</figure>
<figure class="pets-card pic5">
<img src="${data[currArr[1]].img}" alt="pet-pic" class="pet-pic img5">
<figcaption>
    <h3 class="pet-name">${data[currArr[1]].name}</h3>
    <button class="button-friends button">Learn more</button>
</figcaption>
</figure>
<figure class="pets-card pic6">
<img src="${data[currArr[2]].img}" alt="pet-pic" class="pet-pic img6">
<figcaption>
    <h3 class="pet-name">${data[currArr[2]].name}</h3>
    <button class="button-friends button">Learn more</button>
</figcaption>
</figure>
<figure class="pets-card pic7">
<img src="${data[nextArr[0]].img}" alt="pet-pic" class="pet-pic img7">
<figcaption>
    <h3 class="pet-name">${data[nextArr[0]].name}</h3>
    <button class="button-friends button">Learn more</button>
</figcaption>
</figure>
<figure class="pets-card pic8">
<img src="${data[nextArr[1]].img}" alt="pet-pic" class="pet-pic img8">
<figcaption>
    <h3 class="pet-name">${data[nextArr[1]].name}</h3>
    <button class="button-friends button">Learn more</button>
</figcaption>
</figure>
<figure class="pets-card pic9">
<img src="${data[nextArr[2]].img}" alt="pet-pic" class="pet-pic img9">
<figcaption>
    <h3 class="pet-name">${data[nextArr[2]].name}</h3>
    <button class="button-friends button">Learn more</button>
</figcaption>
</figure>`;
  slider.insertAdjacentHTML("afterbegin", html3)
}

function addHtml2() {
  slider.innerHTML = ''
  html2 = `
<figure class="pets-card pic1">
<img src="${data[pastArr[0]].img}" alt="pet-pic" class="pet-pic img1">
<figcaption>
    <h3 class="pet-name">${data[pastArr[0]].name}</h3>
    <button class="button-friends button">Learn more</button>
</figcaption>
</figure>
<figure class="pets-card pic2">
<img src="${data[pastArr[1]].img}" alt="pet-pic" class="pet-pic img2">
<figcaption>
    <h3 class="pet-name">${data[pastArr[1]].name}</h3>
    <button class="button-friends button">Learn more</button>
</figcaption>
</figure>
<figure class="pets-card pic3">
<img src="${data[currArr[0]].img}" alt="pet-pic" class="pet-pic img3">
<figcaption>
    <h3 class="pet-name">${data[currArr[0]].name}</h3>
    <button class="button-friends button">Learn more</button>
</figcaption>
</figure>
<figure class="pets-card pic4">
<img src="${data[currArr[1]].img}" alt="pet-pic" class="pet-pic img4">
<figcaption>
    <h3 class="pet-name">${data[currArr[1]].name}</h3>
    <button class="button-friends button">Learn more</button>
</figcaption>
</figure>
<figure class="pets-card pic5">
<img src="${data[nextArr[0]].img}" alt="pet-pic" class="pet-pic img5">
<figcaption>
    <h3 class="pet-name">${data[nextArr[0]].name}</h3>
    <button class="button-friends button">Learn more</button>
</figcaption>
</figure>
<figure class="pets-card pic6">
<img src="${data[nextArr[1]].img}" alt="pet-pic" class="pet-pic img6">
<figcaption>
    <h3 class="pet-name">${data[nextArr[1]].name}</h3>
    <button class="button-friends button">Learn more</button>
</figcaption>
</figure>`;
  slider.insertAdjacentHTML("afterbegin", html2)
}

function addHtml3() {
  slider.innerHTML = ''
  html3 = `
<figure class="pets-card pic1">
<img src="${data[pastArr[0]].img}" alt="pet-pic" class="pet-pic img1">
<figcaption>
    <h3 class="pet-name">${data[pastArr[0]].name}</h3>
    <button class="button-friends button">Learn more</button>
</figcaption>
</figure>
<figure class="pets-card pic2">
<img src="${data[currArr[0]].img}" alt="pet-pic" class="pet-pic img2">
<figcaption>
    <h3 class="pet-name">${data[currArr[0]].name}</h3>
    <button class="button-friends button">Learn more</button>
</figcaption>
</figure>
<figure class="pets-card pic3">
<img src="${data[nextArr[0]].img}" alt="pet-pic" class="pet-pic img3">
<figcaption>
    <h3 class="pet-name">${data[nextArr[0]].name}</h3>
    <button class="button-friends button">Learn more</button>
</figcaption>`;
  slider.insertAdjacentHTML("afterbegin", html3);

}

const spinForward = () => {
  slider.classList.add('transition-slider-forward')
}
const spinBackward = () => {
  slider.classList.add('transition-slider-backward')
}

slider.addEventListener('animationend', () => {
  slider.classList.remove('transition-slider-forward')
  slider.classList.remove('transition-slider-backward')
})

































