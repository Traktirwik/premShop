import {getCurrencyList} from "../request/currency.api.js"



export default async () => {
    const response = await getCurrencyList()
    const quotesList = Object.keys(response.data.quotes)
    const curList = document.getElementById("currentCurrency")
    quotesList.forEach(cur => {
        let oneCur = cur.slice(3)
        
        if(localStorage.currency == '' && oneCur =='USD') {
            curList.insertAdjacentHTML("afterbegin", 
            `
            <option value=${oneCur} selected>${oneCur}</options>
        `)
        } else if(oneCur == localStorage.currency){
            curList.insertAdjacentHTML("afterbegin", 
            `
            <option value=${oneCur} selected>${oneCur}</options>
            `)
        } else {
            curList.insertAdjacentHTML("afterbegin", 
            `
            <option value=${oneCur}>${oneCur}</options>
            `)
        }
    })

    const course = response.data.quotes[`USD${curList.value}`]
    const priceElement = document.querySelectorAll('.price')
    if(curList.value == 'USD') {

    } else {
        priceElement.forEach(item => {
            const currentValue = +item.textContent
            item.innerHTML = currentValue*course
        })
    }

    curList.onchange = async function() {
        localStorage.setItem('currency', `${curList.value}`)
        window.location.reload()
    }
}