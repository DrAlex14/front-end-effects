let li_list = document.querySelectorAll('.navigation li');

li_list.forEach(item => {
    item.addEventListener('click', activeLink);
})



function activeLink() {
    li_list.forEach(li => {
        li.classList.remove('active');
    })
    this.classList.add('active');
}