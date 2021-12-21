import { reqAuthPut, reqAuthDelete } from "../views/request/axios.js";

const adminLogic = async () => {
  if (localStorage.role.includes("ADMIN")) {
    
    const edit = document.querySelectorAll(".edit");
    edit.forEach((item) => {
      item.style.display = "inherit";

      item.onclick = async () => {
        event.stopPropagation()
        await editItem(item);
      };
    });
  }
};

async function editItem(item) {
  while (item.tagName !== "ARTICLE") {
    if (item.tagName === "ARTICLE") {
      break;
    }
    item = item.parentElement;
  }

  let saveButton = [];
  let deleteButton = [];
  let inputName = [];
  let inputPrice = [];
  let full_info_title = [];
  let full_info_price = [];
  // let sale = [];

  function tree(node) {
    if (node == null) {
      return null;
    }
    if (node.id == "nameChange") {
      inputName.push(node);
    }
    if (node.id == "priceChange") {
      inputPrice.push(node);
    }
    if (node.id == "save_but") {
      saveButton.push(node);
    }
    if (node.id == "delete_but") {
      deleteButton.push(node);
    }
    if (node.className == "fullinfo_title") {
      full_info_title.push(node);
    }
    if (node.className == "info_price") {
      full_info_price.push(node);
    }
    
    let arr = [...node.children];
    arr.forEach((el) => {
      tree(el);
    });
  }
  tree(item);

  const itemId = item.getAttribute("id");

  inputName[0].classList.remove("without-display");
  inputName[0].value = full_info_title[0].innerText;

  inputPrice[0].classList.remove("without-display");
  inputPrice[0].value = full_info_price[0].innerText;

  const saleChange = document.querySelector(".sale");

  // console.log(saleChange.checked)

  saveButton[0].style.display = "inherit";

  saveButton[0].onclick = async () => {
    let objToPut = { location: window.location.pathname };
    if (inputName[0]) {
      console.log(inputName[0].value);
      Object.assign(objToPut, { name: inputName[0].value });
    }
    if (inputPrice[0]) {
      console.log(inputPrice[0].value);

      Object.assign(objToPut, { price: inputPrice[0].value.split(" ")[0] });
    }
    if (saleChange.checked) {
      Object.assign(objToPut, { sale: true });
    } else {
      Object.assign(objToPut, { sale: false });
    }
    const response = await reqAuthPut(
      `/items/${itemId}`,
      localStorage.token,
      objToPut
    );
    location.reload();
  };

  deleteButton[0].style.display = "inherit";

  deleteButton[0].onclick = async () => {
    const itemId = item.id;
    let objToDelete = { location: window.location.pathname };

    await reqAuthDelete(`/items/${itemId}`, localStorage.token, objToDelete);
    location.reload();
  };
}

export { editItem, adminLogic };
