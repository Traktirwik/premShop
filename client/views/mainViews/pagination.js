import { adminLogic } from "../../client_controller/admin.controller.js";
import {
  getTier,
  getFlag,
  getType,
  getPrice,
} from "../../items/itemsInfo/items.info.js";
import {
  checkFavorite,
  clickToFavFunction,
} from "../../client_controller/client.favorite.controller.js";
import {
  checkCart,
  clickToCartFunction,
  deleteAllItemsFromCart,
} from "../../client_controller/client.cart.controller.js";
import itemHoverHandler from "../../client_controller/item.handler.controller.js";
import { checkSales } from "../../client_controller/client.main.controller.js";
import itemLink from "./solo.item.js";
import currency from "./currency.js";

export default async (container, res, forCart) => {
  window.onhashchange = () => {
    const idItem = sessionStorage.itemHash.split("/");
    console.log(idItem[2]);
    itemLink(res, idItem[2]);
  };
  if (sessionStorage.itemHash) {
    console.log("hello");
    window.location.hash = "#";
    setTimeout(() => {
      window.location.hash = sessionStorage.itemHash;
    }, 300);
  }

  const allObjects = res.data.length;
  const elPerPage = 15;
  const count_page = Math.ceil(allObjects / elPerPage);
  const paginationDiv = document.getElementById("pagination_div");
  paginationDiv.innerHTML = ``;
  for (let i = 0; i < count_page; i++) {
    paginationDiv.insertAdjacentHTML(
      "beforeend",
      `
        <input class="pagination_button" type="button" value=${i + 1}>
        `
    );
  }

  const pagination_button = document.querySelectorAll(".pagination_button");
  container.innerHTML = ``;
  for (let i = 0; i < elPerPage; i++) {
    let elem = res.data[i];
    if (elem == undefined) {
      break;
    }

    container.insertAdjacentHTML(
      "beforeend",
      `<article  class="item pointer ${elem.premium ? "premium" : ""}" id="${
        elem.id
      }">
            <img src="${elem.image.image.big_icon}" alt=""
                class="item_img"></img>
                <div class="item_header">
                    ${await checkFavorite(elem.ItemId || elem.id)}
                    <div class="buttons">
                        <button class="edit admin_btn" style="display: none;"type="button">edit</button>
                        <button class="save admin_btn" id="save_but" style="display: none" type="button">save</button>
                        <button class="delete admin_btn" id="delete_but" style="display: none" type="button">delete</button>
                    </div>
                </div>    
                <div class="item_fullinfo ">
                    <img class="item_nation" src="${getFlag(elem.nation)}">
                    <img src="${getType(elem.type)}" class="item_type">
                    <div class="item_tier">${getTier(elem.tier)}</div>
                    <div class="fullinfo_title">${
                      elem.name
                    }<input type="text" class="item_input nameChange without-display" id="nameChange"></div>
                    
                    ${await checkSales(res, elem.ItemId || elem.id)}
                    <label for="sale">${
                      elem.sale ? elem.sale[0] + "%" : ""
                    }</label>
                    <span class="oldPrice" style="text-decoration: line-through">${
                      elem.sale ? elem.sale[1] : ""
                    }</span>
                    
                </div>
                <div class="item_info invisible">
                    <div class="info_title">${elem.name}</div>
                    <div class="info_price">${getPrice(elem.price).newValue} ${
        getPrice(elem.price).newName
      } <input type="text" class="item_input priceChange without-display" id="priceChange"></div></div>
                </div>   
            ${await checkCart(elem.ItemId || elem.id)}
            </article>
            
            `
    );
  }
  await adminLogic();
  await clickToFavFunction();
  await clickToCartFunction();
  await currency();
  itemLink(res);

  // await itemLink(res)
  itemHoverHandler();

  pagination_button.forEach((item) => {
    item.onclick = async () => {
      container.innerHTML = ``;

      if (item.value == 1) {
        for (let i = 0; i < elPerPage; i++) {
          let elem = res.data[i];
          container.insertAdjacentHTML(
            "beforeend",
            `<article  class="item pointer ${
              elem.premium ? "premium" : ""
            }" id="${elem.id}">
                    <img src="${elem.image.image.big_icon}" alt=""
                        class="item_img"></img>
                        <div class="item_header">
                            ${await checkFavorite(elem.ItemId || elem.id)}
                            <div class="buttons">
                                <button class="edit admin_btn" style="display: none;"type="button">edit</button>
                                <button class="save admin_btn" id="save_but" style="display: none" type="button">save</button>
                                <button class="delete admin_btn" id="delete_but" style="display: none" type="button">delete</button>
                            </div>
                        </div>    
                        <div class="item_fullinfo ">
                            <img class="item_nation" src="${getFlag(
                              elem.nation
                            )}">
                            <img src="${getType(elem.type)}" class="item_type">
                            <div class="item_tier">${getTier(elem.tier)}</div>
                            <div class="fullinfo_title">${
                              elem.name
                            }<input type="text" class="item_input nameChange without-display" id="nameChange"></div>
                            
                            ${await checkSales(res, elem.ItemId || elem.id)}
                            <label for="sale">${
                              elem.sale ? elem.sale[0] + "%" : ""
                            }</label>
                            <span class="oldPrice" style="text-decoration: line-through">${
                              elem.sale ? elem.sale[1] : ""
                            }</span>
                            
                        </div>
                        <div class="item_info invisible">
                            <div class="info_title">${elem.name}</div>
                            <div class="info_price">${
                              getPrice(elem.price).newValue
                            } ${
              getPrice(elem.price).newName
            } <input type="text" class="item_input priceChange without-display" id="priceChange"></div></div>
                        </div>   
                    ${await checkCart(elem.ItemId || elem.id)}
                    </article>
                    
                    `
          );
        }
        await adminLogic();
        await clickToFavFunction();
        await clickToCartFunction();
        await currency();
        itemHoverHandler();
      } else {
        const slicedArr = res.data.slice((item.value - 1) * elPerPage);
        console.log((item.value - 1) * (elPerPage - 1));
        for (let i = 0; i < elPerPage; i++) {
          const elem = slicedArr[i];
          if (elem === undefined) {
            break;
          }
          container.insertAdjacentHTML(
            "beforeend",
            `<article  class="item pointer ${
              elem.premium ? "premium" : ""
            }" id="${elem.id}">
            <img src="${elem.image.image.big_icon}" alt=""
                class="item_img"></img>
                <div class="item_header">
                    ${await checkFavorite(elem.ItemId || elem.id)}
                    <div class="buttons">
                        <button class="edit admin_btn" style="display: none;"type="button">edit</button>
                        <button class="save admin_btn" id="save_but" style="display: none" type="button">save</button>
                        <button class="delete admin_btn" id="delete_but" style="display: none" type="button">delete</button>
                    </div>
                </div>    
                <div class="item_fullinfo ">
                    <img class="item_nation" src="${getFlag(elem.nation)}">
                    <img src="${getType(elem.type)}" class="item_type">
                    <div class="item_tier">${getTier(elem.tier)}</div>
                    <div class="fullinfo_title">${
                      elem.name
                    }<input type="text" class="item_input nameChange without-display" id="nameChange"></div>
                    
                    ${await checkSales(res, elem.ItemId || elem.id)}
                    <label for="sale">${
                      elem.sale ? elem.sale[0] + "%" : ""
                    }</label>
                    <span class="oldPrice" style="text-decoration: line-through">${
                      elem.sale ? elem.sale[1] : ""
                    }</span>
                    
                </div>
                <div class="item_info invisible">
                    <div class="info_title">${elem.name}</div>
                    <div class="info_price">${getPrice(elem.price).newValue} ${
              getPrice(elem.price).newName
            } <input type="text" class="item_input priceChange without-display" id="priceChange"></div></div>
                </div>   
            ${await checkCart(elem.ItemId || elem.id)}
            </article>
            
            `
          );
          await adminLogic();
          await clickToFavFunction();
          await clickToCartFunction();
          await currency();
          itemHoverHandler();
        }
      }
    };
  });
};
