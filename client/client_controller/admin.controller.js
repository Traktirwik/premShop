import {reqAuthPut, reqAuthDelete} from "../views/request/axios.js"

const adminLogic = async () => {
    if (localStorage.role.includes("ADMIN")) {
    const edit = document.querySelectorAll(".edit");

    edit.forEach((item) => {
      item.style.display = "inherit";
      item.addEventListener("click", async () => {
        await editItem(item);
      });
    });
  }
}

async function editItem(node) {
    const item = node.previousElementSibling
    const arr = [...item.children]
    arr.forEach(item => {
        item.innerHTML = `<input class="editItem" type="text"></input>` 
    })
    
    const save = node.nextElementSibling
    save.style.display="inherit"
    save.onclick = async () => {
        const itemId = item.id
        console.log(item)
        let objToPut = {location: window.location.pathname}
        if(arr[0].firstElementChild.value != '') Object.assign(objToPut, {name: arr[0].firstElementChild.value});
        if(arr[1].firstElementChild.value != '') Object.assign(objToPut, {price: arr[1].firstElementChild.value});
        await reqAuthPut(`/items/${itemId}`,localStorage.token, objToPut)
        location.reload()
    }
    const deleteItem = node.nextElementSibling.nextElementSibling
    deleteItem.style.display = "inherit"
    deleteItem.onclick = async() => {
        const itemId = item.id
        let objToDelete = {location: window.location.pathname}

        await reqAuthDelete(`/items/${itemId}`, localStorage.token, objToDelete)
        location.reload()
    }
}

export {
    editItem,
    adminLogic
}