import data from '../data/data_doctor.json' assert { type: 'json' };


function rating (mark, number_of_ratings)
{
  let tekst = '<div class="stars">'
  let i=0;
  while (i<mark) {
    tekst = tekst + '<div class="star"><img src="img/star.png" alt="gwiazdka" /></div>';
    i++;
  }
  while(i<5)
  {
    tekst = tekst + '<div class="star"><img src="img/star_white.png" alt="gwiazdka" /></div>';
    i++;
  }
  tekst = tekst + '</div> <div class="number_of_ratings">'+number_of_ratings+' oceny</div>';
  return tekst;
}


$(document).ready(function () {
  let adres = location.href;
  let id = adres.split("?")[1];
  id = id.split("=")[1];
  let dane = data.id[id];

  $(".doctor_photo img").attr("src","../img/"+dane['img']);
  $(".doctor_name h2").append(dane['name']);
  $(".doctor_specialty h3").append(dane['type'])
  $(".doctor_rating").append(rating(dane['rating'], dane['number_of_ratings']));
  $(".doctor_address h2").append(dane['addres']);
  $(".doctor_number h2").append(dane['phone_number']);
  $(".doctor_description p").append(dane['doctor_description']);
  for(let i in dane["type_of_visit"])
  {
    let type_of_visit = dane["type_of_visit"][i];
    let tekst = '<option value="'+type_of_visit.replace(' ', '_')+'">'+type_of_visit+'</option>'
    $("#purpose_of_visit").append(tekst);
  }
 





















  
  // ZMIANA CENY
  $("#purpose_of_visit").change(function(){
    let rodzaj_wizyty = $("select#purpose_of_visit option:checked").val();
    let cena = "-"
    if(rodzaj_wizyty == "-")
      cena = "-";
    else 
      cena = dane['price_of_visit'][rodzaj_wizyty.replace('_',' ')]+" zł";
    $(".price h5:last()").text(cena);
  });


  // ROZWIJANIE/ZWIJANIE KALENDARZA
  //$(".more").slideToggle(0);
  $(".more_term button").click(function () {
    $(".more").slideToggle(500);
  });

  let url = "confirmed_page.html";
  $(".houers button").click(function(){
    $(location).attr("href", url);
  })
});
