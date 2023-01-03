$("#Rodzinny_card").slideUp(0);
$("#Rodzinny").click( () => {
  
  $("#Rodzinny_card").slideDown(0);
  $("#Pediatra_card").slideUp(0);
});
$("#Pediatra").click( ()=>{
  $("#Rodzinny_card").slideUp(0);
  $("#Pediatra_card").slideDown(0);
})
