"use strict";

let headerActivClass = document.getElementById('header-nav');

document.getElementById('jsBurger').addEventListener('click', function () {

  headerActivClass.classList.toggle('header__mobile');
});

window.addEventListener('resize', function(){
  if(window.innerWidth >= 750){
    headerActivClass.classList.remove('header__mobile');
  }
});

$('.slider1').slick({

  infinite: true,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: '<img src="../images/arrow_to_left1.png">',
  nextArrow: '<img src="../images/arrow_to_right1.png">',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      }
    },
    {
      breakpoint: 750,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 520,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});

$('.slider2').slick({

  infinite: true,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: '<img src="../images/arrow_to_left1.png">',
  nextArrow: '<img src="../images/arrow_to_right1.png">',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      }
    },
    {
      breakpoint: 750,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 520,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});


async function loadProduct(id) {
  let data = await fetch('/products/' + id + '.json');
  if (data.status !== 200) {
    const productBody = document.getElementById('product-body');
    productBody.innerHTML = '<h1>Ошибка 404 - страница не найдена</h1>';

    return;
  }

  let product = await data.json();

  const title = document.getElementById('product-title');
  const article = document.getElementById('product-article');
  const price = document.getElementById('product-price');
  const desc = document.getElementById('product-desc');
  const imgBlock = document.getElementById('product-img');

  title.innerHTML = product.name;
  article.innerHTML = 'Артикль: ' + product.article;
  price.innerHTML = '$' + product.cost;
  desc.innerHTML = product.description;

  const img = document.createElement('img');
  img.src = product.image;

  imgBlock.appendChild(img);
}

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const addToCartButton = document.getElementById('add-to-cart');
addToCartButton.setAttribute('data-art', id);

addToCartButton.addEventListener('click', addToCart);
loadProduct(id);



