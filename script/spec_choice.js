const expert_list = ["Rodzinny_card","Rodzinny_card"];

window.addEventListener('load', (event) => {
    let rodzinny_button = document.getElementById('Rodzinny');
    let pediatra_button = document.getElementById('Pediatra');
    rodzinny_button.addEventListener("click", function(){
    document.getElementById('Rodzinny_card').style.display="flex";
    document.getElementById('Pediatra_card').style.display="none";
    });
    pediatra_button.addEventListener("click", function(){
    document.getElementById('Rodzinny_card').style.display="none";
    document.getElementById('Pediatra_card').style.display="flex";
    });


    console.log(window.location.href);
  });
    
