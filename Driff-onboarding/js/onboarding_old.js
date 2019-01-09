// globals!
var input;
var step;
var interval;

//data to gather
var companyName;
var companyURL;
var gravatar;
var email;
var name;
var password;

//other
var gotGravatar = false;

$(document).ready(function() {
    init();
});

function init(){
  step = 1;
  doStep();
}

function stepInterval(){
  if(step == 1){
    interval = setInterval(checkCompanyName, 100);
  }
  else if(step == 2)
  {
    interval = setInterval(checkEmail, 100); //change to email n stuff
  }
  else if(step == 3)
  {
    interval = setInterval(checkName, 100);
  }
  else if(step == 4)
  {
    interval = setInterval(checkPassword, 100);
  }
  else if(step == 5)
  {
    alert('stap 5');
  }
}

function doStep(){
  switch(step) {
    case 1: //company name
      setGradientContent();
      moveProgressBar(0, 20);
      setTitle('uw bedrijfsnaam');
      setCopy('Om uw gepersonaliseerde Driff op te zetten hebben we uw bedrijfsnaam nodig. Deze moet uniek zijn en zal alleen voor u zichtbaar zijn in de adresbalk.')
      setInputPlaceholder('Uw bedrijfsnaam');
      stepInterval(); //use interval to check the input fields
      break;
    case 2: //email
      setGradientContent();
      moveProgressBar(20, 40);
      setTitle('uw emailadres');
      setCopy('Om te zorgen dat ie morgen door kunt gaan met groeien hebben wij uw e-mail nodig.')
      setInputPlaceholder('voorbeeld@bedrijf.nl');
      $(".c-company").html(companyName);
      stepInterval();
      break;
    case 3: //name
      setGradientContent();
      moveProgressBar(40, 60);
      setTitle('Wat is uw naam?');
      setCopy('U bent de eerste gebruiker in uw Driff! wij maken meteen een gebruiker voor u aan.');
      setInputPlaceholder('John Doe');
      $(".c-company").html(companyName);
      $(".c-email").html(email);
      setGravatar();
      stepInterval();
      break;
    case 4: //password
      $(".d-input").attr("type", "password");
      setGradientContent();
      moveProgressBar(60, 80);
      setTitle('Uw wachtwoord');
      setCopy('Uw gegevens zijn veilig bij ons, maar kies voor uw eigen veiligheid een sterk wachtwoord!');
      setInputPlaceholder('Tip: gebruik een zin');
      animate("left", "out"); //animating all pieces out except base
      animate("right", "out");
      animate("middle", "out");
      stepInterval();
      break;
    case 5: //inviting
      $(".d-input").hide();
      setGradientContent();
      moveProgressBar(80, 100);
      setTitle("Gefeliciteerd " + name);
      setCopy("Uw eigen Driff omgeving voor " + companyName +" staat helemaal klaar voor u. Groeien doe je samen, dus nodig alvast wat collega’s uit.");
      break;
  }
}

function moveProgressBar(from, to) {
  var elem = document.getElementById("barFill");   
  var width = from;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= to) {
      clearInterval(id);
    } else {
      width++; 
      elem.style.width = width + '%'; 
    }
  }
}

function nextStep(){
  alert('nextStep() + reset() + doStep()')
  reset();
  step++;
  doStep();
}

function reset(){
  $(".d-input").val('');
  $(".driff-button").removeClass("enabled");
  $(".d-input").removeClass("praise");
  $(".link").attr("onClick", "");
  $("#section-gradient").children().remove();
}

function setGradientContent()
{
  $("#section-gradient").append(content[step - 1]);
}

function setTitle(title)
{
  $(".title").html(title);
}

function setCopy(copy)
{
  $(".copy").html(copy);
}

function setInputPlaceholder(placeholder)
{
  $(".d-input").attr("placeholder", placeholder);
}

function setGravatar()
{
  if(gravatar != ''){
    $(".profile-img-src").attr("src", gravatar);
  }
  else
  {
    $(".profile-img-src").attr("src", 'https://www.americanaircraftsales.com/wp-content/uploads/2016/09/no-profile-img.jpg');
  }
}


function checkCompanyName(){
  if($(".d-input").val() == 0)
  { 
    $(".middle-url-bar").html("uw-bedrijfsnaam");
    $(".driff-button").removeClass("enabled");
    $(".d-input").removeClass("praise");
  }
  else
  {
    input = $(".d-input").val().replace(/\s+/g, '-').toLowerCase();
    if(input.length > 3)
    {
      $(".driff-button").addClass("enabled");
      $(".d-input").addClass("praise");
      $(".link").attr("onClick", "nextStep()");//next step/screen
    
      $('.driff-button').click(function(){
        companyName = $(".d-input").val();
        companyURL = input;
        clearInterval(interval);
      });
    }
    else
    {
      $(".driff-button").removeClass("enabled");
      $(".d-input").removeClass("praise");
    } 
    $(".middle-url-bar").html(input);
  }
}

function checkEmail() {
  if($(".d-input").val() == 0)
    { 
      $(".c-email").html("voorbeeld@bedrijf.nl");
      $(".driff-button").removeClass("enabled");
      $(".d-input").removeClass("praise");
      }
      else
      {
      input = $(".d-input").val().replace(/\s+/g, '-').toLowerCase();
      if(input.length > 3 && input.indexOf("@") > 0 && input.indexOf(".") > 0) //check for valid email
      {
        $(".driff-button").addClass("enabled");
        $(".d-input").addClass("praise");
        $(".link").attr("onClick", "nextStep()");//next step/screen
        
        if(gotGravatar === false)
        {
          getGravatar(input);  
        }
        

        $('.driff-button').click(function(){
          email = $(".d-input").val();
          clearInterval(interval);
        });
      }
      else
      {
        $(".driff-button").removeClass("enabled");
        $(".d-input").removeClass("praise");
      } 
      $(".c-email").html(input);
    }
}

function checkName(){
  if($(".d-input").val() == 0)
  { 
    $(".middle-url-bar").html("uw-bedrijfsnaam");
    $(".driff-button").removeClass("enabled");
    $(".d-input").removeClass("praise");
  }
  else
  {
    input = $(".d-input").val();
    if(input.length > 3)
    {
      $(".driff-button").addClass("enabled");
      $(".d-input").addClass("praise");
      $(".link").attr("onClick", "nextStep()");//next step/screen
      
      $('.driff-button').click(function(){
        name = $(".d-input").val();
        clearInterval(interval);
      });
    }
    else
    {
      $(".driff-button").removeClass("enabled");
      $(".d-input").removeClass("praise");
    } 
    $(".c-name").html(input);
  }
}

function checkPassword(){
  var passLength = $(".d-input").val().length;
  $(".d-input").keyup(function(e){
    if(e.keyCode == 8){ //meaning backspace
      if(passLength < 5 ){
        animate("left", "out");
        $(".driff-button").removeClass("enabled");
      }
      if(passLength < 9 && passLength > 4 ){
        animate("right", "out");
      }
      if(passLength < 13 && passLength > 9){
          animate("middle", "out");
      }
    }
    if(passLength > 4 ){
      $(".driff-button").addClass("enabled");
      $(".link").attr("onClick", "nextStep()");
      animate("left", "in");
    }
    if(passLength > 8 ){
      animate("right", "in");
    }
    if(passLength > 12){
      animate("middle", "in");
    }
  });
  $('.driff-button').click(function(){
    password = $(".d-input").val();
    clearInterval(interval);
  });  
}

var content = ["<div class='driff-screen-image'>\
                <div class='url-container'>\
                  <div class='pre-url-bar'>\
                    <span>https://</span>\
                  </div>\
                  <div class='middle-url-bar'>\
                    <span>uw-bedrijfsnaam</span>\
                  </div>\
                  <div class='after-url-bar'>\
                    <span>.driff.io</span>\
                  </div>\
                </div>\
              </div>", //0 | Company name

              "<div class='usercard-container'>\
                <div class='usercard'>\
                  <div class='profile-image'>\
                    <img class='profile-img-src' src='https://www.americanaircraftsales.com/wp-content/uploads/2016/09/no-profile-img.jpg' />\
                  </div>\
                  <div class='profile-info'>\
                    <h2 class='c-name'>Naam</h2>\
                    <h4 class='c-function'>Functie</h4>\
                    <span class='c-company'></span>\
                    <span class='c-email purple-text'>voorbeeld@bedrijf.nl</span>\
                  </div>\
                </div>\
              </div>",//1 | email

              "<div class='usercard-container'>\
                <div class='usercard'>\
                  <div class='profile-image'>\
                    <img class='profile-img-src' src='' />\
                  </div>\
                  <div class='profile-info'>\
                    <h2 class='c-name'>naam</h2>\
                    <h4 class='c-function'>functie</h4>\
                    <span class='c-company'>ZUID Creatives</span> \
                    <span class='c-email purple-text'>ruud@zuid.com</span> \
                  </div>\
                </div>\
              </div>",//2 | name
              "<div class='gradient-container '>\
                <svg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' width='1000' height='1000' viewBox='0 0 1000 1000'>\
                  <polygon id='middle_tower_top' points='436.44 285.7 436.44 305.87 436.44 326.72 449.61 326.72 449.61 305.87 449.61 285.7 469.77 285.7 531.61 285.7 551.77 285.7 551.77 305.87 551.77 326.72 564.94 326.72 564.94 305.87 564.94 285.7 585.1 285.7 598.91 285.7 509.69 117.81 509.69 74.57 599.66 74.57 567.93 37.29 599.66 0 491.69 0 491.69 117.81 402.47 285.7 416.28 285.7 436.44 285.7' fill='#fff'/>\
                  <path id='middle_tower_base' d='M465.42,645.41h20.16V699.5H515.8V645.41H629.12l-28.9-212.1H401.16l-28.9,212.1h93.16Zm13.63-111.84a21.64,21.64,0,0,1,43.28,0v50.71H479.05Z' fill='#fff'/>\
                  <path id='base' d='M413.3,886.63a87.39,87.39,0,0,1,174.78,0V1000H769.57V665.58H688v54.09H617.49V665.58H536v54.09H465.42V665.58H383.89v54.09H313.34V665.58H231.81V1000H413.3Z' fill='#fff'/>\
                  <polygon id='middle_tower_crooks' points='646.93 305.87 585.1 305.87 585.1 346.88 531.61 346.88 531.61 305.87 469.77 305.87 469.77 346.88 416.28 346.88 416.28 305.87 354.45 305.87 354.45 413.15 646.93 413.15 646.93 305.87' fill='#fff'/>\
                  <path id='left_tower' d='M210.38,573.15h-168V1000H210.38ZM148,870.38H104.72V819.67a21.64,21.64,0,1,1,43.28,0Zm0-150.71H104.72V669A21.64,21.64,0,1,1,148,669Z' fill='#fff'/>\
                  <polygon id='left_tower_top' points='134.08 380.06 134.08 342.96 211.28 342.96 184.05 310.97 211.28 278.98 118.64 278.98 118.64 380.06 22.9 560.21 229.81 560.21 134.08 380.06' fill='#fff'/>\
                  <path id='right_tower' d='M959.05,573.15H791V1000h168ZM896.66,870.38H853.38V819.67a21.64,21.64,0,1,1,43.28,0Zm0-150.71H853.38V669a21.64,21.64,0,1,1,43.28,0Z' fill='#fff'/>\
                  <polygon id='right_tower_top' points='882.74 380.06 882.74 342.96 959.94 342.96 932.71 310.97 959.94 278.98 867.3 278.98 867.3 380.06 771.57 560.21 978.48 560.21 882.74 380.06' fill='#fff'/>\
                </svg>\
              </div>",//3 | password
              "<div class='gradient-container '>\
                <object data='../logo.svg' type='image/svg+xml'>\
                  <img src='yourfallback.jpg' />\
                </object>\
              </div>"//4 | inviting

];

function getGravatar(cemail){
  var email = cemail
    if(email != ''){
      var md5 = $.md5(email);
      gravatar = 'https://gravatar.com/avatar/'+md5+'?&d=404';
        $.ajax({
            url:gravatar,
            type:"HEAD",
            crossDomain:true,
            error:function(){
              gotGravatar = true;
              gravatar = '';
            },
            success:function(){
              gotGravatar = true;
              $(".profile-img-src").attr("src", gravatar);
            }
        });
    }
}

function animate(side, direction) {
    if(side != "middle"){
      if(direction == "in"){
        $("#" + side + "_tower, #" + side + "_tower_top").removeClass("slide-out-" + side);
        return $("#" + side + "_tower," + "#" + side + "_tower_top").addClass("slide-" + direction + "-" + side);
      }
      else if (direction == "out"){
        $("#" + side + "_tower, #" + side + "_tower_top").removeClass("slide-out-" + side);
        return $("#" + side + "_tower," + "#" + side + "_tower_top").addClass("slide-" + direction + "-" + side);
      }
    }
    else if(side == "middle"){
      if(direction == "in"){
        $("#" + side + "_tower_top," + "#" + side + "_tower_base," + "#" + side + "_tower_crooks").removeClass("fallout");
        return $("#" + side + "_tower_top," + "#" + side + "_tower_base," + "#" + side + "_tower_crooks").addClass("fall" + direction);
      }
      else if(direction == "out"){
        $("#" + side + "_tower_top," + "#" + side + "_tower_base," + "#" + side + "_tower_crooks").removeClass("fallin");
        return $("#" + side + "_tower_top," + "#" + side + "_tower_base," + "#" + side + "_tower_crooks").addClass("fall" + direction);
      }
    }
}