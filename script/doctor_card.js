// import data from '../data/data_doctor.json' assert { type: 'json' };
// import calender from '../data/data_calender.json' assert {type: 'json'};

const data = await fetch("data/data_doctor.json").then((data) => data.json());
const calender = await fetch("data/data_calender.json").then((data) => data.json());
// const responseData = await fetch('../data/data_doctor.json');
// const data = await JSON.parse(responseData);
// const responseCalender = await fetch('../data/data_doctor.json');
// const calender = await JSON.parse(responseCalender);
// console.log(calender);
// console.log(calender['zaq1']);

function NumberMonth(NumMonth)
{
  let tekst ='';
  if(NumMonth<10)
    tekst = '0'+NumMonth;
  else
    tekst = NumMonth;
  
  return tekst;
}

let today_data = new Date();
const doba = 86400000;
let day_name = [];
let day_data = [];
let time = today_data.getTime();
const day_of_the_week  = ["Pn", "Wt", "Śr","Czw","Pt"];
 
for (let i=0; i<5; i++)
{
    let dzien = new Date(time);
    
    if (dzien.getDay() != 0 && dzien.getDay() != 6) {
      day_data[i] = dzien.getDate() + "." + (NumberMonth(Number(dzien.getMonth()) + 1)+ "." + dzien.getFullYear());
      time = time + doba;
    } else if (dzien.getDay() == 0) {
      dzien = new Date(time + doba);
      day_data[i] = dzien.getDate() + "." + (NumberMonth(Number(dzien.getMonth()) + 1)+ "." + dzien.getFullYear());
      time = time + 2 * doba;
    } else {
      dzien = new Date(time + 2 * doba);
      day_data[i] = dzien.getDate() + "." + (NumberMonth(Number(dzien.getMonth()) + 1)+ "." + dzien.getFullYear());
      time = time + 3 * doba;
    }
    if(i==0)
    {
      if(today_data.getDay() == dzien.getDay())
        day_name[0] = "Dziś";
      else if(today_data.getDay() == dzien.getDay())
        day_name[0] = "Jutro";
      else
        day_name[0]=day_of_the_week[dzien.getDay()-1];
    }   
    else if(i==1)
    {
      if(today_data.getDay()==dzien.getDay()-1)
        day_name[1] = "Jutro";
      else
        day_name[1]=day_of_the_week[dzien.getDay()-1];
    }
    else
       day_name[i]= day_of_the_week[dzien.getDay()-1];
}


function creat_doctor_rating(rating, number_of_ratings)
{
  let tekst = ' <div class="doctor_rating"><div class="stars">'
  let i=0;
  while (i<rating) {
    tekst = tekst + '<div class="star"><img src="img/star.png" alt="gwiazdka" /></div>';
    i++;
  }
  while(i<5)
  {
    tekst = tekst + '<div class="star"><img src="img/star_white.png" alt="gwiazdka" /></div>';
    i++;
  }
  tekst = tekst + '</div>  <div class="number_of_ratings">'+number_of_ratings+' oceny</div></div>';
  return tekst;
}

function creat_5_day_calender(id)
{
  let id_calender = calender[id];
  let day_calender;
  let godzina;
  let tekst = '<div class="calender" id="'+id+'"><div class="next_5_days" >';
  for(let i=0; i<5; i++)
  {
    day_calender = id_calender[day_data[i]]
    let dayData = day_data[i].split(".", 2);
    tekst = tekst + '<div class="days"><div class="day"><p class="day_name">'+day_name[i]+'</p><p class="day_data">'+dayData[0]+'.'+dayData[1]+'</p></div>';
    tekst = tekst + '<div class="hours">';
    
    for(let i=0; i<4; i++)
    { 
      godzina = day_calender[i];
      if(godzina == '-')
        tekst = tekst +'<button class="empty_term">-</button>';
      else if(godzina.length >5)
        tekst = tekst +' <button class="term_booked">'+godzina.slice(0, -1) +'</button>';
      else
        tekst = tekst +'<button class="term_free">'+godzina+'</button>';
    }
    tekst = tekst + '</div></div>';
  }
    tekst = tekst + '</div><div class="more_term"><button>Więcej terminów</button></div></div>';
  return tekst;

}


function creat_doctor_card(id, type, name, img, rating, number_of_ratings)
{

  let tekst = '<div class="doctor_card" ><div class="doctor_photo"><img src="img/'+img+'" alt="zjecie" /></div><div class="doctor_data"><div class="doctor_name"><h2 id="'+id+'">'+name+'</h2>'+
  '</div>  <div class="doctor_specialty"><h3>' + type + '</h3></div>'+ creat_doctor_rating(rating, number_of_ratings)+ creat_5_day_calender(id)+'</div></div>';
  $("#"+type+"_card").append(tekst);
}

let id_tab = data.id_all_doctors;
for(let i in id_tab)
{
  let dane = data.id[id_tab[i]];
  creat_doctor_card(id_tab[i],dane.type,dane.name,dane.img,dane.rating,dane.number_of_ratings);
  
}
let url = "page/doctor_page.html";
$(".calender button").click(function(){ 
  url = url + "?id="+ $(this).parents(".calender").attr('id');
  $(location).attr("href", url);
});

$(".doctor_name h2").click(function(){
  url =url + "?id="+$(this).attr('id');
  $(location).attr("href", url);
});











































// function zmien(id, data)
// {
//   for(let j =0;j<5; j++)
//   {
//     let godziny = data[day_data[j]]
//     let miejsce = '#'+id+'_'+day_name[j];
//     let tekst = '';
//     for(let i=0; i<4; i++)
//     { 
//       if(godziny[i] == '-')
//         tekst = tekst +'<button class="empty_term">-</button>';
//       else if(godziny[i].length >5)
//         tekst = tekst +' <button class="term_booked">'+godziny[i].slice(0, -1) +'</button>';
//       else
//         tekst = tekst +'<button class="term_free">'+godziny[i]+'</button>';
//     }
//   $(miejsce).append(tekst);
//   }
// }

// $.getJSON('data/data_doctor.json', function(data) {
//   for (var i in data.Pediatra)
//   {
//     let dane = data.Pediatra[i];
//     creat_doctor_card(dane.id,dane.type,dane.name,dane.img,dane.rating,dane.number_of_ratings);
//     zmien(dane.id,dane.date);
//   }  
//   for (var i in data.Rodzinny)
//   {
//     let dane = data.Rodzinny[i];
//     creat_doctor_card(dane.id,dane.type,dane.name,dane.img,dane.rating,dane.number_of_ratings);
//     zmien(dane.id, dane.date);
//   }  
//     url = "page/doctor_page.html";
//     $(".calender button").click(function(){
//       $(location).attr("href", url);
//     })
// });
