let cartJson = localStorage.getItem('cart');
let cart = cartJson ? JSON.parse(cartJson) : {};

function loadCart() {
  $.getJSON('/products/all.json', function (data) {
    let goods = data; //все товары в массиве
    //console.log(goods);
    checkCart();
    showCart(); //Вывожу товары на страницу

    function showCart() {
      if ($.isEmptyObject(cart)) {
        let out = '<h1>Корзина пуста. Перейдите в <a href="../pages/cameras.html">Магазин</a><h1>';
        $('#my-cart').html(out);
      }
      else {
        let out = '';
        for (let key in cart) {
          out += '<div class="cart-container-item">';
          out += '<div class="cart-btn"><button class="delete" data-art="' + key + '">x</button></div>';
          out += '<div class="cart-img"><img src="' + goods[key].image + '"></div>';
          out += '<div class="cart-item-name"><p>';
          out += goods[key].name;
          out += '</p></div>';
          out += '<div class="cart-btn"><button class="minus" data-art="' + key + '">-</button></div>';
          out += '<div class="cart-item-value"><p>';
          out += cart[key];
          out += '</p></div>';
          out += '<div class="cart-btn"><button class="plus" data-art="' + key + '">+</button></div>';
          out += '<div class="cart-common-value"><p>';
          out += cart[key] * goods[key].cost;
          out += '</p></div>';
          out += '</div>';
        }
        $('#my-cart').html(out);
        $('.plus').on('click', plusGoods);
        $('.minus').on('click', minusGoods);
        $('.delete').on('click', deleteGoods);
      }
    }

    function plusGoods() {
      let articul = $(this).attr('data-art');
      cart[articul]++;
      saveCartToLS(); //сохраняю корзину в LocalStorage
      showCart();
    }

    function minusGoods() {
      let articul = $(this).attr('data-art');
      if(cart[articul]>1){
        cart[articul]--;
      }
      else {
        delete cart[articul];
      }
      saveCartToLS();
      showCart();
    }

    function deleteGoods() {
      let articul = $(this).attr('data-art');
      delete cart[articul];
      saveCartToLS();
      showCart();
    }
  });
}

function addToCart() {
  //добавляем товар в корзину
  let articul = $(this).attr('data-art');
  if (cart[articul]!=undefined){
    cart[articul]++;
  }
  else{
    cart[articul] = 1;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log(cart);
}

function checkCart() {
  //Проверяю наличие корзины в localStorage;
  if(localStorage.getItem('cart')!= null) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }
}

function saveCartToLS() {
  localStorage.setItem('cart', JSON.stringify(cart));
}