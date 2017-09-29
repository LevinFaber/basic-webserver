function hover(element){
    element.fadeOut
    element.setAttribute('src', '/assets/qrcode.png');
    element.classList.remove('bild');
    element.classList.add('qr');
}
function unhover(element){
    element.setAttribute('src', '/assets/dumbledumb.jpg');
    element.classList.remove('qr');
    element.classList.add('bild');
}
document.querySelector('a[href*="#"]').scrollIntoView({ 
    behavior: 'smooth' 
  });
