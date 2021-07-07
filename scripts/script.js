// Меняем наш город
const headerCityButton = document.querySelector('.header__city-button');

// if (localStorage.getItem('lomoda-location')) { //Проверяем есть ли город в локальном хранилище
// 	headerCityButton.textContent = localStorage.getItem('lomoda-location'); //Меняем ДИВ
// }

let hash = location.hash;

headerCityButton.textContent = localStorage.getItem('lomoda-location') || 'Ваш город?'; //Упростили спомощью логического оператора ИЛИ

headerCityButton.addEventListener('click', () => {
  const city = prompt('Укажите ваш город: ');
  if (city && (city.length > 1)) {
    headerCityButton.textContent = city;
    localStorage.setItem('lomoda-location', city); //Закидываем наш город в локальное хранилище
  } else {
    headerCityButton.textContent = 'Вы не выбрали город';
  }
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

// ----- / Модальное окно

// ----- Запрос базы данных
const getData = async () => {
  const data = await fetch('../db.json');

  if (data.ok) {
    return data.json();
  } else {
    throw new Error(`Данные небыли получены, ошибка ${data.status} ${data.statusText}`);
  }
};

const getGoods = (callback, value) => {
  getData()
    .then(data => {
      if (value) {
        callback(data.filter(item => item.category === value))
      } else {
        callback(data);
      }
    })
    .catch(err => {
      callback(err);
    });
};
// ----- / Запрос базы данных

// Вызов eventListener для модального окна
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
// /Вызов eventListener для модального окна

// ---- обрабатываем данные
try {

  const goodsList = document.querySelector('.goods__list');

  if (!goodsList) {
      throw 'This is not a goods page!'
  }

  const createCard = ({ id, preview, cost, brand, name, sizes }) => {

      const li = document.createElement('li');

      li.classList.add('goods__item');

      li.innerHTML = `
          <article class="good">
              <a class="good__link-img" href="card-good.html#${id}">
                  <img class="good__img" src="goods-image/${preview}" alt="">
              </a>
              <div class="good__description">
                  <p class="good__price">${cost} &#8381;</p>
                  <h3 class="good__title">${brand} <span class="good__title__grey">/ ${name}</span></h3>
                  ${sizes ? 
                      `<p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes.join(' ')}</span></p>` : 
                      ''}
                  <a class="good__link" href="card-good.html#${id}">Подробнее</a>
              </div>
          </article>
      `;

      return li;
  };

  const renderGoodsList = data => {
      goodsList.textContent = '';

      data.forEach((item) => {
          const card = createCard(item);
          goodsList.append(card);
      })
  };

  window.addEventListener('hashchange', () => {
      hash = location.hash.substring(1);
      getGoods(renderGoodsList, hash);
  })

  getGoods(renderGoodsList, hash);
  
} catch (error) {
  
}

// ---- / обрабатываем данные