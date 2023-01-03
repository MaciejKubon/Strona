//import data from '../data/data_doctor.json' assert { type: 'json' };
const data = await fetch("../data/data_doctor.json").then((data) =>
  data.json()
);
const calender = await fetch("../data/data_calender.json").then((data) =>
  data.json()
);
// const response = await fetch('../data/data_doctor.json');
// const data = await response.json();

// const data = await import('../data/data_doctor.json', {
//   assert: { type: 'json' }
// });
// console.log(JSON.parse(data));
let today_data = new Date();
const doba = 86400000;
let day_name = [];
let day_data = [];
let time = today_data.getTime();
const day_of_the_week = ["Pn", "Wt", "Śr", "Czw", "Pt"];

function rating(mark, number_of_ratings) {
  let tekst = '<div class="stars">';
  let i = 0;
  while (i < mark) {
    tekst =
      tekst +
      '<div class="star"><img src="../img/star.png" alt="gwiazdka" /></div>';
    i++;
  }
  while (i < 5) {
    tekst =
      tekst +
      '<div class="star"><img src="../img/star_white.png" alt="gwiazdka" /></div>';
    i++;
  }
  tekst =
    tekst +
    '</div> <div class="number_of_ratings">' +
    number_of_ratings +
    " oceny</div>";
  return tekst;
}
//  CREAT CALENDER
function creat_calender(id, number_week) {
  let id_calender = calender[id];
  let number_day = 5*(number_week-1);
  let day_calender,
    godzina,
    tekst = '<div class="week" id="week'+number_week+'">';
    for(let i =0; i<5; i++)
    {
      day_calender=id_calender[day_data[i+number_day]];
      tekst = tekst + '<div class="days"><div class="day"><p class="day_name">'+day_name[i+number_day]+'</p><p class="day_data">'+day_data[i+number_day]+'</p></div>';
      tekst = tekst + '<div class="houers">'
      tekst = tekst + '<div class="constantly_visible'
      for(let j=0; j<6; j++)
      {
        godzina = day_calender[j];
        if (godzina == "-")
          tekst = tekst + '<button class="empty_term">-</button>';
        else if (godzina.length > 5)
          tekst = tekst + '<button class="term_booked">' + godzina.slice(0, -1) + "</button>";
        else tekst = tekst + '<button class="term_free">' + godzina + "</button>";
      }
      tekst = tekst + '</div><div class="more" hidden>'
      for(let j=6; j<day_calender.length; j++)
      {
        godzina = day_calender[j];
        if (godzina == "-")
          tekst = tekst + '<button class="empty_term">-</button>';
        else if (godzina.length > 5)
          tekst = tekst + '<button class="term_booked">' + godzina.slice(0, -1) + "</button>";
        else tekst = tekst + '<button class="term_free">' + godzina + "</button>";
      }
      tekst = tekst + '</div>'
      tekst = tekst + '</div>'
      tekst = tekst + '</div>';
    }
    tekst = tekst + '</div>'
  return tekst;
}

// Numer miesiąca

function NumberMonth(NumMonth)
{
  let tekst =''
  if(NumMonth<10)
    tekst = '0'+NumMonth;
  else
    tekst = NumMonth;
  
  return tekst;
}

$(document).ready(function () {
  let adres = location.href;
  let id = adres.split("?")[1];
  id = "zaq1";
  //id = id.split("=")[1];
  let dane = data.id[id];

  // DOCTOR DATA
  $(".doctor_photo img").attr("src", "../img/" + dane["img"]);
  $(".doctor_name h2").append(dane["name"]);
  $(".doctor_specialty h3").append(dane["type"]);
  $(".doctor_rating").append(rating(dane["rating"], dane["number_of_ratings"]));
  $(".doctor_address h3").append(dane["addres"]);
  $(".doctor_number h3").append(dane["phone_number"]);
  $(".doctor_description p").append(dane["doctor_description"]);
  for (let i in dane["type_of_visit"]) {
    let type_of_visit = dane["type_of_visit"][i];
    let tekst =
      '<option value="' +
      type_of_visit.replace(" ", "_") +
      '">' +
      type_of_visit +
      "</option>";
    $("#purpose_of_visit").append(tekst);
  }

  // DOCTOR CALLENDER

  for (let i = 0; i < 20; i++) {
    let dzien = new Date(time);

    if (dzien.getDay() != 0 && dzien.getDay() != 6) {
      day_data[i] = dzien.getDate() + "." + (NumberMonth(Number(dzien.getMonth()) + 1));
      time = time + doba;
    } else if (dzien.getDay() == 0) {
      dzien = new Date(time + doba);
      day_data[i] = dzien.getDate() + "." + (NumberMonth(Number(dzien.getMonth()) + 1));
      time = time + 2 * doba;
    } else {
      dzien = new Date(time + 2 * doba);
      day_data[i] = dzien.getDate() + "." + (NumberMonth(Number(dzien.getMonth()) + 1));
      time = time + 3 * doba;
    }
    if (i == 0) {
      if (today_data.getDay() == dzien.getDay()) day_name[0] = "Dziś";
      else if (today_data.getDay() == dzien.getDay()) day_name[0] = "Jutro";
      else day_name[0] = day_of_the_week[dzien.getDay() - 1];
    } else if (i == 1) {
      if (today_data.getDay() == dzien.getDay() - 1) day_name[1] = "Jutro";
      else day_name[1] = day_of_the_week[dzien.getDay() - 1];
    } else day_name[i] = day_of_the_week[dzien.getDay() - 1];
  }
  for(let i=1; i<5; i++)
  {
    $('.calendar').append(creat_calender(id, i));
  }
  $('.calendar').append('<div class="more_term"><button>Więcej terminów</button></div> ');




  // ZMIANA CENY
  $("#purpose_of_visit").change(function () {
    let rodzaj_wizyty = $("select#purpose_of_visit option:checked").val();
    let cena = "-";
    if (rodzaj_wizyty == "-") cena = "-";
    else cena = dane["price_of_visit"][rodzaj_wizyty.replace("_", " ")] + " zł";
    $(".price h5:last()").text(cena);
  });
  

  // ROZWIJANIE/ZWIJANIE KALENDARZA
  $(".more_term button").click(function () {
    $(".more").slideToggle(500);
  });

  // PRZEJŚCIE NA STORNE POTWIEDZAJĄCĄ UMÓWIENIE WIZYTY
  let url = "confirmed_page.html";
  $(".houers button").click(function () {
    console.log($(this).val);
    //$(location).attr("href", url);
  });

  // Zmiana kalendarza
  let number_of_week = 1;
  $(".left_arrow button").css("opacity", "0.3");
  $(".right_arrow button").click(function () {
    if (number_of_week != $(".week").length){
    $("#week" + number_of_week).animate(
      {
        opacity: 0,
      },
      500,
      function () {
        $(this).css("display", "none");
        number_of_week = number_of_week + 1;
        $("#week" + number_of_week).css("display", "flex");
        $("#week" + number_of_week).animate(
          {
            opacity: 1,
          },
          500
        );
        $(".left_arrow button").css("opacity", "1");
        if (number_of_week == $(".week").length) {
          $(".right_arrow button").css("opacity", "0.3");
          $(".right_arrow button").css("cursor", "default");
        }
      }
    );
  }
  });
  $(".left_arrow button").click(function () {
    if (number_of_week != 1) {
      $("#week" + number_of_week).animate(
        {
          opacity: 0,
        },
        500,
        function () {
          $(this).css("display", "none");
          number_of_week = number_of_week - 1;
          $("#week" + number_of_week).css("display", "flex");
          $("#week" + number_of_week).animate(
            {
              opacity: 1,
            },
            500
          );
          $(".right_arrow button").css("opacity", "1");
          if (number_of_week == 1) {
            $(".left_arrow button").css("opacity", "0.3");
            $(".left_arrow button").css("cursor", "default");
          }
        }
      );
    }
  });

  // AKTYWACJA STRZAŁEK
  $('.left_arrow button').hover(function (){
    if(number_of_week != 1)
    $(".left_arrow button").css("cursor", "pointer");
    else
    $(".left_arrow button").css("cursor", "default");
  });
  $('.right_arrow button').hover(function (){
    if(number_of_week != $(".week").length)
    $(".right_arrow button").css("cursor", "pointer");
    else
    $(".right_arrow button").css("cursor", "default");
  });


  
});
