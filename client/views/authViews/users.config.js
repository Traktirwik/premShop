

import { reqAuthGet } from "../request/axios.js"

const contolUsers = async () => {
    sessionStorage.setItem("usersConfig", true)
    const mainOffice = document.getElementById("mainOffice")
    
    const usersInfo = await reqAuthGet("/users", localStorage.token)
    mainOffice.innerHTML=
    `
    <table id="userTable" border="1">
        <tr id="tableElements">
            <th>id</th>
            <th>username</th>
            <th>email</th>
            <th>role</th>
            <th>config</th>
        </tr>
    </table>
    `
    console.log(usersInfo)
    const userTable = document.getElementById("tableElements")
    usersInfo.data.forEach(item => {
        userTable.insertAdjacentHTML("afterend", 
        `
        <tr><th>${item.id}</th><th>${item.username}</th><th>${item.email}</th><th>${item.role.role}</th><th><button class="config" type="button">изменить</button></th><tr>
        `
        )
    })
    
    
}




export default contolUsers;