


async function checkSales(res, elemId) {
    const solo = res.data.find(item => item.id == elemId)
    if(solo.sale) {
        return `<input type="checkbox" class="sale" checked name="sale" style="position:relative">`
    } else {
        return `<input type="checkbox" class="sale" name="sale" style="position:relative">`
    }
}


export {
    checkSales
}