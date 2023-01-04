const data = await fetch("../data/data_doctor.json").then((data) =>
  data.json()
);

$(document).ready(function () {

    let adres = location.href;
    let information = (adres.split("?")[1]).split("#");
    let id = information[0];
    let dane = data.id[id];
    let visitTime = information[1].split("T");
    let typeOfVisit = information[2].replace("_", " ");
    let priceOfVisit = dane["price_of_visit"][typeOfVisit];
    typeOfVisit = typeOfVisit.slice(0,1).toUpperCase() + typeOfVisit.slice(1);
    console.log(id,visitTime,typeOfVisit);

    
    $(".doctor_photo img").attr("src", "../img/" + dane["img"]);
    $(".doctor_name").append(dane["name"]);
    $(".doctor_addres").append(dane["addres"]);
    $(".type_of_visit").append(typeOfVisit+": " + priceOfVisit + "zł");
    $(".visit_time").append(visitTime[1]+ " "+ visitTime[0]);



    $(".cancel_button button").click(function(){
        $('.window_content').addClass('opened');
        $('#window_overlay').addClass('opened');
    }); 
});