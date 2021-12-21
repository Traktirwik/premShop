import {getCurrencyList} from "../request/currency.api.js"



export default async () => {
    const response = await getCurrencyList()
    const quotesList = response.data.quotes
    const curList = document.getElementById("currentCurrency")
    const savedCurrency = localStorage.getItem("currency")

    if(savedCurrency) Object.values(curList.children).forEach((option)=>{
        if(option.value === JSON.parse(savedCurrency).name) option.setAttribute("selected", "selected")
        else option.removeAttribute("selected")
    })

    curList.onchange = async function() {
        
        const selectedCurrencyName = curList.value
        const selectedCourse = quotesList[`USD${selectedCurrencyName}`]
        localStorage.setItem('currency',JSON.stringify({name:selectedCurrencyName, course:selectedCourse}) )
        window.location.reload()
    }
}