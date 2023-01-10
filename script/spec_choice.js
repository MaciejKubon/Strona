$("#Rodzinny_card").slideUp(0);
$("#Pediatra").css('border-bottom', '3px solid  #def3fa');
$("#Rodzinny").click( () => {
  
  $("#Rodzinny_card").slideDown(0);
  $("#Pediatra_card").slideUp(0);
  $("#Rodzinny").css('border-bottom', '3px solid  #def3fa');
  $("#Pediatra").css('border-bottom', '0px solid  #def3fa');

});
$("#Pediatra").click( ()=>{
  $("#Rodzinny_card").slideUp(0);
  $("#Pediatra_card").slideDown(0);
  $("#Pediatra").css('border-bottom', '3px solid  #def3fa');
  $("#Rodzinny").css('border-bottom', '0px solid  #def3fa');
})