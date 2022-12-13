






$(document).ready(function () {
  // let adres = location.href;
  // let id = adres.split("?")[1];
  // id = id.split("=")[1];
let id = "zaq1";
  // $.getJSON('../data/'+id+'.json', function(data) {
  //   for (var i in data)
  //   {
      
  //   }
   
  // });







  // ZMIANA CENY
  $("#purpose_of_visit").change(function(){
    let rodzaj_wizyty = $("select#purpose_of_visit option:checked").val();
    let cena = "-"
    if(rodzaj_wizyty == "konsultacje")
      cena = "100 zł";
    else if(rodzaj_wizyty == "wizyta_kontrolna")
      cena = "80 zł";
    else if(rodzaj_wizyty == "-")
      cena = "-";
    else if(rodzaj_wizyty == "choroba")
      cena = "130 zł";
    else if(rodzaj_wizyty == "szczepienie")
      cena = "150 zł";
    else 
      cena = "40 zł";
    $(".price h5:last()").text(cena);
  });


  // ROZWIJANIE/ZWIJANIE KALENDARZA
  //$(".more").slideToggle(0);
  $(".more_term button").click(function () {
    $(".more").slideToggle(500);
  });

  url = "confirmed_page.html";
  $(".houers button").click(function(){
    $(location).attr("href", url);
  })
});
