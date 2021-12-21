

import { reqAuthDelete, reqAuthGet, reqAuthPost, reqAuthPut } from "../request/axios.js"
function confirmDialog(msg) {
    return new Promise(function (resolve, reject) {
      let confirmed = window.confirm(msg);
  
      return confirmed ? resolve(true) : reject(false);
    });
   }
function array_compare(a, b)
{
    // if lengths are different, arrays aren't equal
    if(a.length != b.length)
       return false;

    for(let i = 0; i < a.length; i++)
       if(a[i] != b[i])
          return false;

    return true;
}

const contolUsers = async () => {
    sessionStorage.setItem("usersConfig", true)
    const mainOffice = document.getElementById("mainOffice")

    const usersInfo = await reqAuthGet("/users", localStorage.token)
    mainOffice.innerHTML =
        `
    <table id="userTable" border="1">
        <tr id="tableElements">
            <th>id</th>
            <th>username</th>
            <th>email</th>
            <th>role</th>
            <th>config</th>
            <th>delete</th>
        </tr>
        <tr id="tableUser"></tr>
    </table>
    `
    let count = 0

    const userTable = document.getElementById("userTable")
    usersInfo.data.forEach(item => {
        userTable.insertAdjacentHTML("beforeend",
            `
        <tr><th>${item.id}</th><th>${item.username}</th><th>${item.email}</th><th><select class="selectField"></select></th><th><button class="config" type="button">изменить</button></th><th><button class="deleteUser" type="button">удалить пользователя</button><tr>
        `
        )
        

            const selectedField = document.querySelectorAll(".selectField")  
            console.log(selectedField[count], count)
            console.log(item.role.role)
            
            if (array_compare(item.role.role, ["ADMIN"]) == true) {
                selectedField[count].insertAdjacentHTML("beforeend", 
                `
                <option class="rolesList" value=${["ADMIN"]} selected>admin</option>
                <option class="rolesList" value=${["USER"]}>user</option> 
                <option class="rolesList" value=${["USER", "ADMIN"]}>user, admin</option>
                ` 
                )
            } else if (array_compare(item.role.role, ["USER"]) == true) {
                selectedField[count].insertAdjacentHTML("beforeend", 
                `
                <option class="rolesList" value=${["ADMIN"]}>admin</option>
                <option class="rolesList" value=${["USER"]} selected>user</option> 
                <option class="rolesList" value=${["USER", "ADMIN"]}>user, admin</option>
                ` 
                )
            } else {
                selectedField[count].insertAdjacentHTML("beforeend", 
                `
                <option class="rolesList" value=${["ADMIN"]}>admin</option>
                <option class="rolesList" value=${["USER"]}>user</option> 
                <option class="rolesList" value=${["USER", "ADMIN"]} selected>user, admin</option>
                ` 
                )
            }
            count++
        
    })

    const changeRole = document.querySelectorAll(".selectField")
    changeRole.forEach(item => {
        item.onchange = async () => {
            const targetUserId = item.parentElement.parentElement.firstElementChild.textContent
            const button = item.parentElement.nextElementSibling.firstElementChild
            
            button.onclick = async () => {
                const changeUserRole = await reqAuthPut(`/office/${Number(targetUserId)}`, localStorage.token, {role: item.value.split(",")})
            }
        }
    })

    const deleteUser = document.querySelectorAll(".deleteUser")
    deleteUser.forEach(item => {
        item.onclick = async () => {
            const targetUserId = item.parentElement.parentElement.firstElementChild.textContent
            console.log(targetUserId)
            confirmDialog(`Удалить пользователя с id: ${targetUserId}`)
            .then(async () => {
                await reqAuthDelete(`/office/${Number(targetUserId)}`, localStorage.token)
            })
            .catch(err => console.log("not deleted"))
            location.reload()
            
        }
    })

    

}




export default contolUsers;