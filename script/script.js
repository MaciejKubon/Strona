let navbar = document.querySelector('.header');
window.onscroll = () =>{

    if(window.scrollY >=0){
        document.querySelector('.header').classList.add('active');
    }else{
        document.querySelector('.header').classList.remove('active');
    }
}

window.onload = () =>{
    window.scrollTo(0,0);
    if(window.scrollY >=0){
        document.querySelector('.header').classList.add('active');
    }else{
        document.querySelector('.header').classList.remove('active');
    }
}