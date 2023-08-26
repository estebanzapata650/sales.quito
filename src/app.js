'use strict'

document.addEventListener('DOMContentLoaded', () => {
    
});

document.getElementById('category-all').addEventListener('click', () => {
    getJson('all');
});

document.getElementById('category-clothes').addEventListener('click', () => {
    getJson('Vehículo');
});

document.getElementById('category-kitchen').addEventListener('click', () => {
    getJson('Electrodoméstico');
});

const getJson = (category) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './src/products.json', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const jsonData = JSON.parse(xhr.responseText);
            showResult(jsonData, category);
        }
    };
    xhr.send();
}

const showResult = (jsonData, categorySelect) => {
    
    const elementsRemove = document.querySelectorAll('.container-article');
    elementsRemove.forEach(elemento => elemento.remove());

    for (let index in jsonData.Products)
    {
        let category = jsonData.Products[index].Category;
        if (categorySelect == "all" || categorySelect == category)
        {
            let id = jsonData.Products[index].Id;
            let productTitle = jsonData.Products[index].ProductTitle;
            let productSubtitle = jsonData.Products[index].ProductSubtitle;
            let value = jsonData.Products[index].Value;
            let commentOne = jsonData.Products[index].CommentOne;
            let commentTwo = jsonData.Products[index].CommentTwo;
            let commentThree = jsonData.Products[index].CommentThree;
            let commentFour = jsonData.Products[index].CommentFour;           
            let status = jsonData.Products[index].Status;
            let imgOne = jsonData.Products[index].ImgOne;
            let imgTwo = jsonData.Products[index].ImgTwo;
            let imgThree = jsonData.Products[index].ImgThree;
            let imgFour = jsonData.Products[index].ImgFour;

            let inputProduct = `
                <div class="header-article">
                    <div class="header-article-left">
                        <div class="title-article">${productTitle}</div>
                        <div class="sub-title-article">${productSubtitle}</div>
                    </div>
                    <div class="header-article-right">
                        <div class="price-article">
                            <div class="currency">USD$</div>
                            <div class="value">${value}</div>
                        </div>
                    </div>
                </div>        
                <div class="swiper carousel">
                    <div class="swiper-wrapper" id="swipwe-wrapper_${id}"></div>
                    <button type="button" class="swiper-button-next"></button>
                    <button type="button" class="swiper-button-prev"></button>
                    <div class="swiper-pagination"></div>
                </div>
                <div class="specifications-article">
                    <div class="specifications-article-left">
                        <ul>
                            <li>${commentOne}</li>
                            <li>${commentTwo}</li>
                            <li>${commentThree}</li>
                            <li>${commentFour}</li>
                        </ul>
                    </div>
                    <div class="specifications-article-right">
                        <div class="specifications-article-contact specifications-row">
                            <a href="https://wa.me/593999098717?text=Hola,%20estoy%20interesado%20en%20el%20artículo%20No.%20${id}" class="specifications-link whatsapp" target="_blank"></a>
                        </div>
                        <div class="specifications-article-category specifications-row">${category}</div>
                        <div class="specifications-article-state specifications-row">Estado ${status}</div>                    
                    </div>
                </div>`;

            const newContainerArticle = document.createElement('div');
            newContainerArticle.id = `product_${id}`;
            newContainerArticle.className = 'container-article';
            newContainerArticle.innerHTML = inputProduct;

            const contenedor = document.getElementById('article');
            contenedor.appendChild(newContainerArticle);

            if (imgOne != ""){
                addSwiper(imgOne, id)
            }
            if (imgTwo != ""){
                addSwiper(imgTwo, id)
            }
            if (imgThree != ""){
                addSwiper(imgThree, id)
            }
            if (imgFour != ""){
                addSwiper(imgFour, id)
            }
        }
    }

    const swiper = new Swiper('.carousel', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            el: '.swiper-pagination'
        }
    });

    const sectionView = document.getElementById('description-article');
    sectionView.scrollIntoView({ behavior: 'smooth'});
}

const addSwiper = (img, id) => {
    let inputSwiper = `<img src="./assets/${img}.jpg" alt="">`;
    const newContainerSwiper = document.createElement('div');
    newContainerSwiper.className = 'swiper-slide';
    newContainerSwiper.innerHTML = inputSwiper;

    const contenedorSwiper = document.getElementById(`swipwe-wrapper_${id}`);
    contenedorSwiper.appendChild(newContainerSwiper);
}