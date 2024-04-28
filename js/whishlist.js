const cards = document.querySelector('.cards')

let wishlist = JSON.parse(localStorage.getItem('wishlist'))

function mapProducts(products) {
    let card = ""

    products.forEach(product => {
        card += `
        <div class="card" data-id="${product.id}">
            <div class="card__img">
                <img class="card-img"  src=${product.thumbnail} alt="img">
                <div class="card__img__bottom">
                    <button class="card__img__bottom-btn">
                        <img src="../images/shopping 1.svg" alt="img">
                    </button>
                    <button class="card__img__bottom-btn card__img-heart-btn">
                        <img class="card__img__heart-img" src="../images/heart-solid.svg" alt="img">
                    </button>
                    <button class="card__img__bottom-btn">
                        <img src="../images/search.svg" alt="img">
                    </button>
                </div>
            </div>  
            <div class="card__info">
                <h3 class="card__title">${product.title}</h3>
                <p class="card__text">${product.price} USD</p>
            </div>
        </div>
        `
    })

    cards.innerHTML = card
}

mapProducts(wishlist)

const addWishlist = (id) => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist'))
    let wishlistUpdate = wishlist.filter(el => el.id !== +id)
    localStorage.setItem("wishlist", JSON.stringify(wishlistUpdate))
    mapProducts(wishlistUpdate)
}

cards.addEventListener('click', (e) => {
    if (e.target.className === "card-img") {
        let id = e.target.closest('.card').dataset.id
        window.open(`./pages/product.html?id=${id}`, "_self")
    } else if (e.target.className.includes("card__img-heart-btn") ||
        e.target.className.includes("card__img__heart-img")) {
        let id = e.target.closest('.card').dataset.id
        addWishlist(id)
    }
})