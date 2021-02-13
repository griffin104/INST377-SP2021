const list = document.querySelector('ul')

const totalImages = 7
const visibleImages = 3
const maxPage = Math.ceil(totalImages/visibleImages)

let position = 0
let currentPage = 1

function moveLeft() {
    if (currentPage > 1) {
        position += 304
        currentPage--
        list.style.marginLeft = position + 'px'
    }
}

function moveRight() {
    if (currentPage < maxPage) {
        position -= 304
        currentPage++
        list.style.marginLeft = position + 'px'
    }
}