
const list = document.querySelector('ul')
const images = document.querySelectorAll('li')

const totalImages = 7
const visibleImages = 3
const maxPage = Math.ceil(totalImages/visibleImages)

let i = 1
let position = 0
let currentPage = 1


    images.forEach(li => {
      li.style.position = 'relative';
      li.insertAdjacentHTML('beforeend', `<span style="position:absolute;left:0;top:0">${i}</span>`);
      i++;
    })


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

