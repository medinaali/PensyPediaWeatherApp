$(function() {   // when document is ready
  $('#f3').hide(); // query 1 - .hide()
	$("#f1").submit(getWeather); // Interaction - 1
  $("#f2").click(getSearch); // Interaction - 2
  $('#message').text("WELCOME").slideUp(3500); // query 2 - .slideUp()
  $('#test').mouseover(function(){ // query3 (CHAIN;footer) - .mouseover().css()
    $(this).css("background-color", "#F2F2F2");
    });
  $("h1").css("background-color", "black")
  $("h1").mouseenter(function(){  // query 4 (CHAIN) - .mouseenter().fadeTo()
     $(this).fadeTo("slow",0.4);
  });
 } );


function getSearch() {
  if($("#playLetter2").val().length>1){
    alert("Please enter only one alphabet"); // query 5 - .alert()
  }
  else
  {
  var letter = $("#playLetter2").val();
  var city = searchMap[letter];
  $("#pictureArea2").html(city).css({'font-weight':'bold','color':'#CC0052'});
  $("#playLetter2").val("");
  return false;
}
}

function getWeather() {
  var letter = $("#playLetter").val();
  var city = weatherMap[letter];
  $("#result").html(city);
  $("#inputArea").html("Type the city name below:");
  $("#playLetter").val("");
  try {
  $.ajax({
    url:"http://api.worldweatheronline.com/free/v2/weather.ashx",
    data: {
      key : "ebf399aa4a92321c524170aa2f286",
      q: city,
      format : "json",
      num_of_days:'1',
      callback : "displayWeather"
      },
    jsonp: false,           
    dataType: "jsonp",      
    crossDomain: true
    } );

  return false;
  alert('This is not a valid city. Please use the search box above to browse');
  } catch (e) {console.log(e.description);}
} 


jQuery(function ($) {
  var body = $("#container");
  var imgB = ["./img/background1.jpg", "./img/background2.jpg", "./img/background3.jpg"];
     for (var i=0; i<imgB.length; i++) {
         (new Image()).src = imgB[i];
     }
  var current = 0;
  function nextBackground() {
    body.css(
      'background',
      "url("+imgB[current = ++current % imgB.length]+")"
    );
    setTimeout(nextBackground, 5000);
  }
  setTimeout(nextBackground, 1000);
  body.css('background', imgB[0]);
});



function displayWeather(response) {
  $('#f3').show(); // query 6 - .show()
	result= "Temperature: "+response.data.current_condition[0].temp_C+" degrees Celcius";
	$('#picture').prepend($('<img>',{id:'theImg',src:'./img/weather.png'}));        // query 7 - .prepend()
  $('#pictureArea').html(result).css({'font-weight':'bold','color':'#FFFF75','font-style':'bold'});
  $('#f3').click(function(){ // Interaction - 3 //query 8 - .click()
  result2= "Maximum Temperature: "+response.data.weather[0].maxtempC+" degrees Celcius";
  result2+= "<br/>Minimum Temperature: "+response.data.weather[0].mintempC+" degrees Celcius";
  result2+= "<br/>Cloud Cover: "+response.data.weather[0].hourly[0].cloudcover;
  $('#newArea').slideToggle();                                                   // query 9 - .slideToggle()
  
  $('#newArea').html(result2).css({'font-weight':'bold','color':'#FFFF75','font-style':'bold'}); //query10 - .css()
  });
  }

