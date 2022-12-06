var list = document.querySelector(".navbar");
var burger = document.querySelector(".header__burger");
var body1 = document.body;
console.log(body1);

burger.addEventListener('click', () => {
    const result1 = list.classList.toggle("__active-list");
    const result2 = burger.classList.toggle("__active-icon");
    const result3 = body1.classList.toggle("lock");
})