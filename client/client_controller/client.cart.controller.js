import {
  reqAuthGet,
  reqAuthPost,
  reqAuthDelete,
} from "../views/request/axios.js";

async function checkCart(elemId) {
  const response = await reqAuthGet(
    `/cart?id=${localStorage.id}`,
    localStorage.token
  );
  const qwe = response.data.map((el) => el.id);

  if (qwe.includes(elemId)) {
    return `<button class="item_btn cart orange_btn invisible" cart="true" name="id" value=${elemId}>Убрать из корзины</button>`;
  } else {
    return `<button class="item_btn cart orange_btn invisible" cart="false" name="id" value=${elemId}>Добавить в корзину</button>`;
  }
}

async function clickToCartFunction() {
  const cartIcon = document.querySelectorAll(".cart");

  cartIcon.forEach((item) => {
    item.onclick = async () => {
      event.stopPropagation();
      if (item.innerHTML === "Добавить в корзину")
        item.innerHTML = "Убрать из корзины";
      else item.innerHTML = "Добавить в корзину";
      const data = {
        userId: localStorage.id,
        cart: item.attributes.value.value,
        location: window.location.pathname,
      };
      await reqAuthPost("/cart", localStorage.token, data);
    };
  });
}

async function deleteAllItemsFromCart(allProd) {
  allProd.onclick = async () => {
    console.log(localStorage.id);

    await reqAuthDelete(`/allCart?id=${localStorage.id}`, localStorage.token);
    location.reload();
  };
}

export { checkCart, clickToCartFunction, deleteAllItemsFromCart };
