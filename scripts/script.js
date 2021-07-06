// Меняем наш город
const headerCityButton = document.querySelector('.header__city-button');

// if (localStorage.getItem('lomoda-location')) { //Проверяем есть ли город в локальном хранилище
// 	headerCityButton.textContent = localStorage.getItem('lomoda-location'); //Меняем ДИВ
// }

headerCityButton.textContent = localStorage.getItem('lomoda-location') || 'Ваш город?'; //Упростили спомощью логического оператора ИЛИ

headerCityButton.addEventListener('click', () => {
  const city = prompt('Укажите ваш город: ');
  headerCityButton.textContent = city;
  localStorage.setItem('lomoda-location', city); //Закидываем наш город в локальное хранилище
});
// / Меняем наш город

// ----- Блокировка скрола
const disableScroll = () => {
  const widthScroll = window.innerWidth - document.body.offsetWidth;
  document.body.dbScrollY = window.scrollY;
  document.body.style.cssText = `
    position: fixed;
    top: ${-window.scrollY}px;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    padding-right: ${widthScroll}px;
    `;
};

const enableScroll = () => {
  document.body.style.cssText = '';
  window.scroll({
    top: document.body.dbScrollY
  });
};
// ----- / Блокировка скрола

// ----- Модальное окно
const subheaderCart = document.querySelector('.subheader__cart'),
  cartOverlay = document.querySelector('.cart-overlay');

const openModalCart = () => {
  cartOverlay.classList.add('cart-overlay-open');
  disableScroll();
};

const closeModalCart = () => {
  cartOverlay.classList.remove('cart-overlay-open');
  enableScroll();
};

subheaderCart.addEventListener('click', openModalCart);

cartOverlay.addEventListener('click', (event) => {
  const target = event.target;

  // if (target.classList.contains('cart__btn-close')) {
  //   closeModalCart();
  // }
  //Что и выше, только через matches
  if (target.matches('.cart__btn-close') || target.matches('.cart-overlay')) {
    closeModalCart();
  };
});

// ----- / Модальное окно