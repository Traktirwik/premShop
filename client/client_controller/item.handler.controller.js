export default function itemHoverHandler(){
    const items = document.querySelectorAll(".item")
    items.forEach((item) => {
        item.addEventListener("mouseover", function () {
            this.lastElementChild.classList.remove("invisible")
            this.lastElementChild.classList.add("visible")
            this.children[3].classList.remove("invisible")
            this.children[3].classList.add("visible")
            
        })
        item.addEventListener("mouseout", function () {
            this.lastElementChild.classList.remove("visible")
            this.lastElementChild.classList.add("invisible")
            this.children[3].classList.remove("visible")
            this.children[3].classList.add("invisible")
        })
    })
}