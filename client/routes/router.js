import controller from "../controller/controller.js";


function getRouterInfo() {
    const hash = location.hash ? location.hash.slice(1) : '';
    const [name, id] = hash.split('/')

    return {name, params: { id }}
}

function handleHash() {
    const { name } = getRouterInfo();
    console.log('haha')
    if(name) {
        const routerName = name + 'Route'; 
        controller[routerName]();
    }
}

window.addEventListener("hashchange", f => handleHash(), {});


export {
    handleHash
}