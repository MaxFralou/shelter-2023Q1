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


if (window.innerWidth < 769) {
  countPetCard = 2;
}
if (window.innerWidth === 320) {
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

if (backButton !== null) {
  backButton.addEventListener('click', () => {
    if (countPetCard === 3) {
      spinBackward()
      backward()
      addHtml()
      updatePetCards()
      overPetCards()
    }
    else if (countPetCard === 2) {
      spinBackward()
      backward()
      addHtml2()
      updatePetCards()
      overPetCards()
    } else if (countPetCard === 1) {
      spinBackward()
      backward()
      addHtml3()
      updatePetCards()
      overPetCards()
    }
  })
}
if (forwardButton !== null) {
  forwardButton.addEventListener('click', () => {
    if (countPetCard === 3) {
      spinForward()
      forward()
      addHtml()
      updatePetCards()
      overPetCards()
    }
    else if (countPetCard === 2) {
      spinForward()
      forward()
      addHtml2()
      updatePetCards()
      overPetCards()
    } else if (countPetCard === 1) {
      spinForward()
      forward()
      addHtml3()
      updatePetCards()
      overPetCards()
    }
  })
}


if (countPetCard === 3) {
  addHtml()
} else if (countPetCard === 2) {
  addHtml2()
} else if (countPetCard === 1) {
  addHtml3()
}

function addHtml() {
  if (slider !== null) { slider.innerHTML = '' }
  let html1 = `
<figure class="pets-card pic1" data-index="0">
<img src="${data[pastArr[0]].img}" alt="pet-pic" class="pet-pic img1">
<figcaption>
    <h3 class="pet-name">${data[pastArr[0]].name}</h3>
    <button class="button-friends button">Learn more</button>
</figcaption>
</figure>
<figure class="pets-card pic2" data-index="1">
<img src="${data[pastArr[1]].img}" alt="pet-pic" class="pet-pic img2">
<figcaption>
    <h3 class="pet-name">${data[pastArr[1]].name}</h3>
    <button class="button-friends button">Learn more</button>
</figcaption>
</figure>
<figure class="pets-card pic3" data-index="2">
<img src="${data[pastArr[2]].img}" alt="pet-pic" class="pet-pic img3">
<figcaption>
    <h3 class="pet-name">${data[pastArr[2]].name}</h3>
    <button class="button-friends button">Learn more</button>
</figcaption>
</figure>
<figure class="pets-card pic4" data-index="3">
<img src="${data[currArr[0]].img}" alt="pet-pic" class="pet-pic img4">
<figcaption>
    <h3 class="pet-name">${data[currArr[0]].name}</h3>
    <button class="button-friends button">Learn more</button>
</figcaption>
</figure>
<figure class="pets-card pic5" data-index="4">
<img src="${data[currArr[1]].img}" alt="pet-pic" class="pet-pic img5">
<figcaption>
    <h3 class="pet-name">${data[currArr[1]].name}</h3>
    <button class="button-friends button">Learn more</button>
</figcaption>
</figure>
<figure class="pets-card pic6" data-index="5">
<img src="${data[currArr[2]].img}" alt="pet-pic" class="pet-pic img6">
<figcaption>
    <h3 class="pet-name">${data[currArr[2]].name}</h3>
    <button class="button-friends button">Learn more</button>
</figcaption>
</figure>
<figure class="pets-card pic7" data-index="6">
<img src="${data[nextArr[0]].img}" alt="pet-pic" class="pet-pic img7">
<figcaption>
    <h3 class="pet-name">${data[nextArr[0]].name}</h3>
    <button class="button-friends button">Learn more</button>
</figcaption>
</figure>
<figure class="pets-card pic8" data-index="7">
<img src="${data[nextArr[1]].img}" alt="pet-pic" class="pet-pic img8">
<figcaption>
    <h3 class="pet-name">${data[nextArr[1]].name}</h3>
    <button class="button-friends button">Learn more</button>
</figcaption>
</figure>
<figure class="pets-card pic9" data-index="8">
<img src="${data[nextArr[2]].img}" alt="pet-pic" class="pet-pic img9">
<figcaption>
    <h3 class="pet-name">${data[nextArr[2]].name}</h3>
    <button class="button-friends button">Learn more</button>
</figcaption>
</figure>`;
  if (slider !== null) { slider.insertAdjacentHTML("afterbegin", html1) }

}

function addHtml2() {
  if (slider !== null) { slider.innerHTML = '' }
  let html2 = `
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
  if (slider !== null) { slider.insertAdjacentHTML("afterbegin", html2) }
}

function addHtml3() {
  if (slider !== null) { slider.innerHTML = '' }
  let html3 = `
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
  if (slider !== null) { slider.insertAdjacentHTML("afterbegin", html3); }

}

const spinForward = () => {
  slider.classList.add('transition-slider-forward')
}
const spinBackward = () => {
  slider.classList.add('transition-slider-backward')
}

if (slider !== null) {
  slider.addEventListener('animationend', () => {
    slider.classList.remove('transition-slider-forward')
    slider.classList.remove('transition-slider-backward')
  })
}


// POP-UP



let petCards = []

function updatePetCards() {
  petCards = document.querySelectorAll('.pets-card');

}

updatePetCards()


const popUp = document.querySelector('.pop-up-container')

function updateDataPet(index) {
  popUp.innerHTML = ''
  let generatePopUP = `<img src="${data[index].img}" alt="" class="pop-up-pet-pic">
  <div class="content-pop-up">
      <h2 class="name-pet">${data[index].name}</h2>
      <h3 class="breed-pet">${data[index].breed}</h3>
      <p class="description">${data[index].description}</p>
      <ul class="prop-pet">
          <li class="age-pet prop-item"><strong>Age: </strong><span class="age-pet-data">${data[index].age}</span></li>
          <li class="inoculations-pet prop-item"><strong>Inoculations: </strong><span class="inoculations-pet-data">${data[index].inoculations}</span></li>
          <li class="diseases-pet prop-item"><strong>Diseases: </strong><span class="diseases-pet-data">${data[index].diseases}</span></li>
          <li class="parasites-pet prop-item"><strong>Parasites: </strong><span class="parasites-pet-data">${data[index].parasites}</span></li>
      </ul>
      <div class="button-close"></div>`;
  popUp.insertAdjacentHTML("afterbegin", generatePopUP)
  const buttonClosePopUp = document.querySelector('.button-close')
  buttonClosePopUp.addEventListener('click', () => {
    hiddenPopUp()
  })

}

function overPetCards() {
  petCards.forEach((card, index) => {
    card.addEventListener('click', (event) => {
      if (document.title === "Cozy House") {
        const currIndex = index % currArr.length;
        updateDataPet(currArr[currIndex]);
        visiblePopUp()
      } else {
        updateDataPet(index);
        visiblePopUp()

      }
    });
  });
}
overPetCards()



let flagPopUp = false;

function visiblePopUp() {
  masterPopUp.style.visibility = 'visible'
  masterPopUp.style.opacity = 1
  BODY_DIMM.classList.add('popUpOverlay')
  flagPopUp = !flagPopUp

}

function hiddenPopUp() {
  masterPopUp.style.visibility = 'hidden'
  masterPopUp.style.opacity = 0
  BODY_DIMM.classList.remove('popUpOverlay')

}

const masterPopUp = document.querySelector('.pop-up-container')

if (document.title === "Cozy House -Pets") {
  popUp.style.top = '29em'
}

if (window.innerWidth < 769 && document.title === "Cozy House -Pets") {
  popUp.style.top = '45em'
}

if (window.innerWidth === 320 && document.title === "Cozy House -Pets") {
  popUp.style.top = '40em'
}

// PAGINATION

let subCore1 = []
let subCore2 = []
let subCore3 = []
function randomPagination() {
  let paginationCoreRandom = generateArray(8)
  subCore1 = paginationCoreRandom.slice(0, 3)
  subCore2 = paginationCoreRandom.slice(3, 6)
  subCore3 = paginationCoreRandom.slice(6)
  console.log(paginationCoreRandom)
}
randomPagination()


let finalPetPagination = []

function create48Arr() {
  let petsCardPagination48 = []
  let sortSubCore1 = subCore1.sort(() => Math.random() - 0.5)
  let sortSubCore2 = subCore2.sort(() => Math.random() - 0.5)
  let sortSubCore3 = subCore3.sort(() => Math.random() - 0.5)
  return petsCardPagination48.concat(sortSubCore1, sortSubCore2, sortSubCore3)
}

for (let i = 0; i < 6; i++) {
  let arr = create48Arr();
  finalPetPagination = finalPetPagination.concat(arr);
}
console.log(finalPetPagination)

const paginationCards = document.querySelector('.our-friends-cards')

let totalPages = 6;
let cardsPerPage = 8;
const screenWidth = window.innerWidth;

if (screenWidth >= 1280) {
  totalPages = 6;
  cardsPerPage = 8;
} else if (screenWidth >= 768) {
  totalPages = 8;
  cardsPerPage = 6;
} else if (screenWidth < 767) {
  totalPages = 16;
  cardsPerPage = 3;
}

let currentPage = 1;
const forwardBtn = document.querySelector('.forward')
const currCount = document.querySelector('.cur')
if (currCount !== null) { currCount.textContent = currentPage }
if (forwardBtn !== null) forwardBtn.addEventListener('click', () => {
  if (cardsPerPage === 8) {
    if (currentPage < 6) {
      currentPage++
      currCount.textContent = currentPage
    }
  } else if (cardsPerPage === 6) {
    if (currentPage < 8) {
      currentPage++
      currCount.textContent = currentPage
    }
  } else if (cardsPerPage === 3) {
    if (currentPage < 16) {
      currentPage++
      currCount.textContent = currentPage
    }
  }
  renderCards()
})

const backBtn = document.querySelector('.back')
if (backBtn !== null) backBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--
    currCount.textContent = currentPage
  }
  renderCards()
})

const fastForwardBtn = document.querySelector('.fast-forward')
if (fastForwardBtn !== null) fastForwardBtn.addEventListener('click', () => {
  currentPage = totalPages
  currCount.textContent = currentPage
  renderCards()
})

const fastBackBtn = document.querySelector('.fast-back')
if (fastBackBtn !== null) fastBackBtn.addEventListener('click', () => {
  currentPage = 1
  currCount.textContent = currentPage
  renderCards()
})


window.addEventListener('resize', () => {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 1280) {
    totalPages = 6;
    cardsPerPage = 8;
  } else if (screenWidth >= 768) {
    totalPages = 8;
    cardsPerPage = 6;
  } else if (screenWidth < 767) {
    totalPages = 16;
    cardsPerPage = 3;
  }
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  renderCards();

});



function renderCards() {

  if (currCount !== null) currCount.textContent = currentPage
  let startIndex;
  if (currentPage < 1) {
    startIndex = 0;
  } else {
    startIndex = (currentPage - 1) * cardsPerPage;
  }
  let endIndex = (currentPage * cardsPerPage) - 1

  if (paginationCards !== null) paginationCards.innerHTML = ''

  let cardsHtml = '';

  for (let i = startIndex; i <= endIndex; i++) {
    cardsHtml += `
   <figure class="pets-card pop-up-pets p${i + 1}">
      <img src="${data[finalPetPagination[i]].img}" alt="pet-pic" class="pet-pic">
        <figcaption>
          <h3 class="pet-name">${data[finalPetPagination[i]].name}</h3>
          <button class="button-friends button">Learn more</button>
        </figcaption>
     </figure>`;
  }

  if (paginationCards !== null) paginationCards.insertAdjacentHTML('afterbegin', cardsHtml)

}

renderCards();














