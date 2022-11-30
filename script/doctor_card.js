let today_data = new Date();
const doba = 86400000;
let day_name = [];
let day_data = [];
let time = today_data.getTime();
const day_of_the_week  = ["Pn", "Wt", "Śr","Czw","Pt"];
 
for (let i=0; i<5; i++)
{
    let dzien = new Date(time);
    
    if(dzien.getDay() !=0 && dzien.getDay()!=6)
    {
        day_data[i] = dzien.getDate() + '.' + (Number(dzien.getMonth())+1);
        time = time + doba;
    }
    else if(dzien.getDay() == 0)
    {
        dzien = new Date(time + doba);
        day_data[i] = dzien.getDate() + '.' + (Number(dzien.getMonth())+1);
        time = time + 2*doba;
    }
    else
    {
        dzien = new Date(time + 2*doba);
        day_data[i] = dzien.getDate() + '.' + (Number(dzien.getMonth())+1);
        time = time + 3*doba;
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
    tekst = tekst + '<div class="star"><img src="star.png" alt="gwiazdka" /></div>';
    i++;
  }
  while(i<5)
  {
    tekst = tekst + '<div class="star"><img src="star_white.png" alt="gwiazdka" /></div>';
    i++;
  }
  tekst = tekst + '</div>  <div class="number_of_ratings">'+number_of_ratings+' oceny</div></div>';
  return tekst;
}

function creat_5_day_calender(id)
{
  tekst = '<div class="calender" id="'+id+'"><div class="next_5_days" >';
  for(let i=0; i<5; i++)
  {
    tekst = tekst + '<div class="days"><div class="day"><p class="day_name">'+day_name[i]+'</p><p class="day_data">'+day_data[i]+'</p></div>';
    tekst = tekst + '<div class="hours" id="'+id+'_'+day_name[i]+'"'+'></div></div>';
  }
    tekst = tekst + '</div><div class="more_term"><button>Więcej terminów</button></div></div>';
  return tekst;

}


function creat_doctor_card(id, type, name, img, rating, number_of_ratings)
{

  let tekst = '<div class="doctor_card"><div class="doctor_photo"><img src="'+img+'" alt="zjecie" /></div><div class="doctor_data"><div class="doctor_name"><h2>'+name+'</h2>'+
  '</div>  <div class="doctor_specialty"><h3>' + type + '</h3></div>'+ creat_doctor_rating(rating, number_of_ratings)+ creat_5_day_calender(id)+'</div></div>';
  $("#"+type+"_card").append(tekst);
}
function zmien(id, data)
{
  for(let j =0;j<5; j++)
  {
    let godziny = data[day_data[j]]
    let miejsce = '#'+id+'_'+day_name[j];
    tekst = '';
    for(let i=0; i<4; i++)
    { 
      if(godziny[i] == '-')
        tekst = tekst +'<button class="empty_term">-</button>';
      else if(godziny[i].length >5)
        tekst = tekst +' <button class="term_booked">'+godziny[i].slice(0, -1) +'</button>';
      else
        tekst = tekst +'<button class="term_free">'+godziny[i]+'</button>';
    }
  $(miejsce).append(tekst);
  }
}

$.getJSON('/data/data_doctor.json', function(data) {
  for (var i in data.Pediatra)
  {
    let dane = data.Pediatra[i];
    creat_doctor_card(dane.id,dane.type,dane.name,dane.img,dane.rating,dane.number_of_ratings);
    zmien(dane.id,dane.date);
  }  
  for (var i in data.Rodzinny)
  {
    let dane = data.Rodzinny[i];
    creat_doctor_card(dane.id,dane.type,dane.name,dane.img,dane.rating,dane.number_of_ratings);
    zmien(dane.id, dane.date);
  }  
});
