// Створення і рендер розмітки на підставі масиву даних galleryItems
//  і наданого шаблону елемента галереї.
// Реалізація делегування на div.gallery і отримання url великого зображення.
// Підключення скрипту і стилів бібліотеки модального вікна basicLightbox.
//  Використовуй CDN сервіс jsdelivr і додай у проект
//   посилання на мініфіковані (.min) файли бібліотеки.
// Відкриття модального вікна по кліку на елементі галереї.
//  Для цього ознайомся з документацією і прикладами.
// Заміна значення атрибута src елемента <img> 
// в модальному вікні перед відкриттям. 
// Використовуй готову розмітку модального вікна із зображенням
//  з прикладів бібліотеки basicLightbox.

// Додай закриття модального вікна після натискання клавіші Escape.
//  Зроби так, щоб прослуховування клавіатури було тільки доти, 
//  доки відкрите модальне вікно. Бібліотекаи basicLightbox містить
//   метод для програмного закриття модального вікна.



import { galleryItems } from './gallery-items.js';
// Change code below this line

const imageContainer = document.querySelector('.gallery');

const imagesMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `
    <div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
  })
  .join('');

imageContainer.insertAdjacentHTML('beforeend', imagesMarkup);
imageContainer.addEventListener('click', onImageContainerClick);

function onImageContainerClick(e) {
  e.preventDefault();

  
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  let instance = '';
  const getUrlbyDataSet = e.target.dataset.source;

  const options = {
    once: true,
    // open Modal
    onShow: (instance) => {
      window.addEventListener('keydown', eventHandler);
    },
    // cloze Modal
    onClose: (instance) => {
      window.removeEventListener('keydown', eventHandler);
    },
  };
  function eventHandler(e) {
    if (e.key === 'Escape') {
      instance.close();
      return;
    }
  }
  instance = basicLightbox.create(
    `<img src="${getUrlbyDataSet}" width="800" height="600">`,
    options
  );
  instance.show();
}