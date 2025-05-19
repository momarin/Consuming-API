// JS

/* -------------------------------------------------------------------- */
// Banner Carousel - materialize
  $(document).ready(function(){
    $('.carousel').carousel();
  });

/* -------------------------------------------------------------------- */
// Functions
function toggleVideo() {
    const trailer = document.querySelector('.trailer');
    const video = document.querySelector('video');
    
    trailer.classList.toggle('active');
    
    if (trailer.classList.contains('active')) {
        video.play();
    } else {
        video.pause();
    }
}

function changeBG(bg, title) {
    // console.log('Function called with:', bg, title);
    const banner = document.querySelector('.banner');
    const contents = document.querySelectorAll('.content');

    banner.style.background = `url("./images/${bg}")`;
    banner.style.backgroundSize = 'cover';
    banner.style.backgroundPosition = 'center';

    contents.forEach(content => {
        content.classList.remove('active');
        if(content.classList.contains(title)) {
            content.classList.add('active');
        }
    });
}
/* -------------------------------------------------------------------- */