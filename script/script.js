let navbar = document.querySelector('.header .navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');    

}

window.onscroll = () =>{

    navbar.classList.remove('active');

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

    /*let rodzinny_button = document.getElementById('Rodzinny');
    let pediatra_button = document.getElementById('Pediatra');
    rodzinny_button.addEventListener("click", function(){
    document.getElementById('Rodzinny_card').style.display="flex";
    document.getElementById('Pediatra_card').style.display="none";
    });
    pediatra_button.addEventListener("click", function(){
    document.getElementById('Rodzinny_card').style.display="none";
    document.getElementById('Pediatra_card').style.display="flex";
    });*/
}