import { editItem } from "../../client_controller/admin.controller.js";
import { getTier, getFlag, getType, getPrice } from "../../items/itemsInfo/items.info.js";

export default async (res, idItem) => {
  if (idItem) {
    const findItemInfo = res.data.find((el) => el.id == idItem);
    console.log(findItemInfo.image.image);
    const main = document.querySelector(".main");
    window.onhashchange = async () => {
      if (window.location.hash == `#/items/${idItem}`) {
        sessionStorage.setItem("itemHash", window.location.hash);
        main.innerHTML = ``;
        console.log("good");
        main.insertAdjacentHTML(
          "beforeend",
          `
          <div class="wrapper">
            <div class="main_sub-header">
                <div class="sub-header_logo">
                    <img src="https://catoolwebdav-net-cdn.gcdn.co/catool/24c03af21d7aa4f14d9e845c0b0f04d0.png" alt="">
                </div>
                <div class="sub-header_title"> <img class="item_nation" src="${getFlag(findItemInfo.nation)}"><img src="${getType(findItemInfo.type)}" class="item_type"> ${getTier(findItemInfo.tier)}  ${findItemInfo.name}
                ${findItemInfo.premium ? "<div class='premium'>Премиум</div>" : ""} 
                
            </div>
          </div>
          <div class="solo-item_container">
            <div class="solo-item_info">
              <div>${findItemInfo.description}</div>
              <div class="info_price">${getPrice(findItemInfo.price).newValue} ${getPrice(findItemInfo.price).newName}</div>
              <button class="orange_btn">Добавить в корзину</button>
            </div> 
            <div class="solo-item_img">
              <img src="${findItemInfo.image.image.big_icon}">
            </div>
          </div>
            `
        );
      }
    };
  } else {
    let links = document.querySelectorAll(".nav_link");
    links.forEach((el) => {
      el.addEventListener("click", async () => {
        sessionStorage.itemHash = ``;
      });
    });
    const items = document.querySelectorAll(".item");

    items.forEach((item) => {
      item.addEventListener("click", () => {
        window.location.href = `#/items/${item.id}`;
        const findItemInfo = res.data.find((el) => el.id == item.id);
        console.log(findItemInfo.image.image);
        const main = document.querySelector(".main");
        window.onhashchange = async () => {
          if (window.location.hash == `#/items/${item.id}`) {
            sessionStorage.setItem("itemHash", window.location.hash);
            main.innerHTML = ``;
            console.log("good");
            main.insertAdjacentHTML(
              "beforeend",
              `
          <div class="wrapper">
            <div class="main_sub-header">
                <div class="sub-header_logo">
                    <img src="https://catoolwebdav-net-cdn.gcdn.co/catool/24c03af21d7aa4f14d9e845c0b0f04d0.png" alt="">
                </div>
                <div class="sub-header_title"> <img class="item_nation" src="${getFlag(findItemInfo.nation)}"><img src="${getType(findItemInfo.type)}" class="item_type"> ${getTier(findItemInfo.tier)}  ${findItemInfo.name}
                ${findItemInfo.premium ? "<div class='premium'>Премиум</div>" : ""} 
                
            </div>
          </div>
          <div class="solo-item_container">
            <div class="solo-item_info">
              <div>${findItemInfo.description}</div>
              <div class="info_price">${getPrice(findItemInfo.price).newValue} ${getPrice(findItemInfo.price).newName}</div>
              <button class="orange_btn">Добавить в корзину</button>
            </div> 
            <div class="solo-item_img">
              <img src="${findItemInfo.image.image.big_icon}">
            </div>
          </div>
            `
            );
          }
        };
      });
    });
  }
};
