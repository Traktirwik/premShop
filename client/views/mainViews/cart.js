import { getPrice } from "../../items/itemsInfo/items.info.js";
import { reqAuthPost } from "../request/axios.js";
function addRow(table, name, price, id) {
  const tableBody = table.tBodies[0];
  tableBody.insertAdjacentHTML(
    "beforeend",
    `   
        <tr class="cart_item">
            <td>${name}</td>
            <td class="table_price">${getPrice(price).newValue}</td>
            <td class="remove_col">
                <div id="kostil" style="display: none;" itemId=${id}></div>
                <div class="remove_btn pointer">+</div>
            </td>
        </tr>`
  );
}

function countTotal() {
  const totalPrice = document.querySelector(".total_price");
  const itemPrices = document.querySelectorAll(".table_price");
  totalPrice.innerHTML = "";
  itemPrices.forEach((itemPrice) => {
    totalPrice.innerHTML = +totalPrice.innerHTML + +itemPrice.innerHTML;
  });
  totalPrice.innerHTML =
    totalPrice.innerHTML + " " + getPrice(totalPrice.innerHTML).newName;
}

export default async function cartView(container, response) {
  const mainSubHeader = document.querySelector(".main_sub-header");

  mainSubHeader.removeChild(mainSubHeader.lastElementChild);
  mainSubHeader.insertAdjacentHTML(
    "beforeend",
    `
        <div class="sub-header_title">Корзина
        </div>`
  );

  container.innerHTML = `
    <table class="cart_table">
        <thead>
            <tr class="table_title">
                <th>Наименование</th>
                <th>Цена</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        </tbody>
        <tfoot class="table_total">
            <tr>
                <td>Итого</td>
                <td class="total_price"></td>
                
            </tr>
        </tfoot>
    </table>
    <button class="table_btn orange_btn">Оплатить</button>`;

  const tableRef = document.querySelector(".cart_table");
  await response.data.forEach((itemObject) => {
    addRow(tableRef, itemObject.name, itemObject.price, itemObject.id);
  });

  countTotal();
  const remove_cart_button = document.querySelectorAll(".remove_btn");
  remove_cart_button.forEach((elem) => {
    elem.addEventListener("click", async () => {
      console.log(elem.attributes);
      const data = {
        userId: localStorage.id,
        cart: elem.previousElementSibling.getAttribute("itemId"),
        location: window.location.pathname,
      };
      await reqAuthPost("/cart", localStorage.token, data);
      location.reload();
    });
  });
}
