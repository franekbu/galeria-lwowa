// zmienne i stały przydatne w kazdej sekcji
const BODY = document.querySelector('body') 


// zmienianie na dark/light mode
const BUTTON_CHANGE_LIGHT_MODE = document.querySelector('button.change__light__mode')

let theme = localStorage.getItem('theme')

function addLightMode() {
    BODY.classList.remove('dark__mode')
    BODY.classList.add('light__mode')
}

function addDarkMode() {
    BODY.classList.remove('light__mode')
    BODY.classList.add('dark__mode')
}

BUTTON_CHANGE_LIGHT_MODE.addEventListener( 'click', () => {
    if (BODY.classList.contains('light__mode')) {
        addDarkMode()
        theme = 'dark'
    } else {
        addLightMode()
        theme = 'light'
    }
    localStorage.setItem('theme', theme)
})

if( theme === 'light' )  {
    addLightMode()
}

if( theme === 'dark' )  {
    addDarkMode()
}


// poruszanie sie po galeri i image__zoomie
const IMAGE_ZOOM = document.querySelector('.image__zoom')
const IMAGE_ZOOM_IMG = document.querySelector('.image__zoom--img')

const BUTTON_CLOSE_IMAGE_ZOOM = document.querySelector('.image__zoom--close')
const BUTTON_PREVIOUS_IMG = document.querySelector('.image__zoom--previous_img')
const BUTTON_NEXT_IMG = document.querySelector('.image__zoom--next_img')

const GALLERY_IMGS = document.querySelectorAll('.gallery__li--img')
let currentImageIndex

// nie wiem czemu tak nie działa 
// function noScrollingScreen() {
//     if ( !IMAGE_ZOOM.classList.contains('hidden') ) {
//         BODY.style.overflow = 'hidden'
//     }
// }
// noScrollingScreen()


GALLERY_IMGS.forEach( (image, index) => {

    image.addEventListener('click', showImageZoom)
    image.addEventListener('keydown', (e) => {
        console.log(e)
        if( e.code === 'Enter' || e.keyCode === 13 ) {
            console.log(e)
            showImageZoom(e)
        }
    })

    function showImageZoom(e) {
        IMAGE_ZOOM.classList.remove('hidden')
        IMAGE_ZOOM_IMG.src = e.target.src //naszemu zdjeciu nadajemy src rowne src targetu na ktorym nacisnelismy klawisz
        currentImageIndex = index // miejsce w tablicy 

        GALLERY_IMGS.forEach( (eachImage) => {
            eachImage.setAttribute('tabindex', -1)//kazdemu zdjeciu w tle ustawiamy ujemny tabindex -1 by nie przeszkadały w chodzeniu tabem 
        })
        BODY.classList.add('overflow__hidden')
    }
})
// e to poprostu własciwosci naszego klikniecia (równie dobrze mozna nazwac coKlikam ) nastepnie z tego pobieramy targeta czyli to na czym ncisnelismy dany klawisz (którego własciwosc to e) a z targeta jego src

function closeImageZoom() {
    IMAGE_ZOOM.classList.add('closing')
    setTimeout( () => {
        IMAGE_ZOOM.classList.add('hidden')
        IMAGE_ZOOM.classList.remove('closing')
        GALLERY_IMGS.forEach( (eachImage) => {
            eachImage.setAttribute('tabindex', 1)// i na odwrót kazdemu zdjeciu w tle ustawiamy ujemny tabindex 1 by umozliwic hcodzenie tabem
        })
    }, 300)
    BODY.classList.remove('overflow__hidden')
}

BUTTON_CLOSE_IMAGE_ZOOM.addEventListener('click', closeImageZoom)

function showNextImage() {
    if ( currentImageIndex === GALLERY_IMGS.length -1) { //inaczej jesli index jest ostatnim numerem w tablicy zdjęć
        currentImageIndex = 0
    } else {
        currentImageIndex ++
    }
    IMAGE_ZOOM_IMG.src = GALLERY_IMGS[currentImageIndex].src // src naszego zdjecia zmianiany na src zdjecia danego z tabeli galerii 
}

function showPreviousImg() {
    if ( currentImageIndex === 0) {
        currentImageIndex = GALLERY_IMGS.length -1
    } else {
        currentImageIndex --
    }
    IMAGE_ZOOM_IMG.src = GALLERY_IMGS[currentImageIndex].src 
}

BUTTON_NEXT_IMG.addEventListener('click', showNextImage)
BUTTON_PREVIOUS_IMG.addEventListener('click', showPreviousImg)

document.addEventListener('keydown', (e)=> {
    if ( !IMAGE_ZOOM.classList.contains('hidden') ) {
        if ( e.key === 'ArrowRight' || e.keyCode === 39 ) {
            showNextImage()
        }
        if ( e.key === 'ArrowLeft' || e.keyCode === 37 ) {
            showPreviousImg()
        }
        if ( e.key === 'Escape' || e.keyCode === 27 ) {
            closeImageZoom()
        }
    }
})

// jeśli klikniesz w tło zooma zdjecia a nie w zdjecie lub buttony 
IMAGE_ZOOM.addEventListener('click', (e) => {
    if (e.target === IMAGE_ZOOM ) {
        closeImageZoom()
    }
})


// animacja ładowania kółeczek 

//   const GALLERY_IMGS = document.querySelectorAll('.gallery__li--img')  //kopiuje bo che miec blosko wtrakcie pisania 
// const LOADING_CIRCLE = document.querySelectorAll('.gallery__li::after')

// GALLERY_IMGS.forEach( (image) => {
//     image.addEventListener('loadstart', () => {
//         LOADING_CIRCLE.forEach( (circle) => {
//             circle.style.display = 'block'
//         })
//     })
//     image.addEventListener('loadend', () => {
//         LOADING_CIRCLE.forEach( (circle) => {
//             circle.style.display = 'none'
//         })
//     })
// })
// nie wiem czemu nie działa 











