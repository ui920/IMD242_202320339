let slider = document.querySelector('#slider-1');
console.log(slider);
console.log(slider.value);
let aNEWDIV = document.createElement('div');
let textContents = document.createTextNode(slider.value);
aNEWDIV.appendChild(textContents);
document.body.appendChild(aNEWDIV);
