//globals
var screen;
var confettiCount = 100;

//data to gather, safety could be an issue...
var companyName = "";
var companyURL;
var gravatar;
var email = "";
var name = "";
var password = "";

//useables
var gravatar;

//enter key for next screen, key 13 is the enter key
$(document).on("keypress", "input", function(key){
    if(key.which == 13){
        document.getElementById("driff-button").click();
    }
});


$(document).ready(function() {
    init();	
});

function init(){
	screen = 1;
	setScreen(screen);
}

//this function decides what screen to set
function setScreen(screen){
	hideshow(); //decide what elements to hide, or to show
  	switch(screen) {
	case 1: //company name
		setGradientContent(screen); 	//this function sets the layout for the content in the right (gradient) section based on what screen is currently shown
	    moveProgressBar(0, 20);  		//this moves the progressbar in the white section from 0% to 20%
	    setTitle('uw bedrijfsnaam');	//set the title element
	    setCopy('Om uw gepersonaliseerde Driff op te zetten hebben we uw bedrijfsnaam nodig. Deze moet uniek zijn en zal alleen voor u zichtbaar zijn in de adresbalk.'); //set the body text in the white section
	    setInputPlaceholder('Uw bedrijfsnaam');	//set the input placeholder
	    checkForPreviousInput(screen);	//if the back button is pressed this function checks to see if there was earlier input 
  		break;
  	case 2: //emailaddress
    	setGradientContent(screen);
  		moveProgressBar(20, 40);
      	setTitle('uw emailadres');
      	setCopy('Om te zorgen dat <b>'+ companyName +'</b> morgen door kan gaan met groeien hebben wij uw e-mail nodig.')
      	setInputPlaceholder('voorbeeld@bedrijf.nl');
  		$(".c-company").html(companyName);
  		if(email != "") {
  			getGravatar(email);
  		}
  		checkForPreviousInput(screen);
  		break;
  	case 3: //name
		setGradientContent(screen);
  		moveProgressBar(40, 60);
  		setTitle('Wat is uw naam?');
        setCopy('U bent de eerste gebruiker in uw Driff! wij maken meteen een gebruiker voor u aan.');
        setInputPlaceholder('John Doe');
        $(".c-company").html(companyName);
        $(".c-email").html(email);
        getGravatar(email);
        checkForPreviousInput(screen);
    	break;
    case 4: //password
    	setGradientContent(screen);
    	moveProgressBar(60, 80);
    	setTitle('Uw wachtwoord');
	    setCopy('Uw gegevens zijn veilig bij ons, maar kies voor uw eigen veiligheid een sterk wachtwoord!');
	    setInputPlaceholder('Tip: gebruik een zin');
	    animate("left", "out"); //animating all pieces out except base
	    animate("right", "out");
	    animate("middle", "out");
	    checkForPreviousInput(screen);
	    break;
	case 5: //inviting
    	setGradientContent(screen);
    	moveProgressBar(80, 100);
    	//partyPopper('.party-popper-placer');
   		for (var i = 0; i < confettiCount; i++) { //this is purely for the confetti at the last screen
		   create(i); //create confetti (100 times)
		}
  		setTitle("Gefeliciteerd " + name + "!"); //basic stuff like adding the given name to the title
    	setCopy("Uw eigen Driff omgeving voor <b>" + companyName +"</b> staat helemaal klaar voor u. Groeien doe je samen, dus nodig alvast wat collega&apos;s uit. </br></br> U kunt uw Driff omgeving altijd vinden op:</br> <b>https://" + companyURL + ".driff.io</b>");
    	checkForPreviousInput(screen);
    	break;
  }
}

function getInput(){ //on the input field is an onclickI() method which calls this function, based on the screen it will call a function to check
	switch(screen) {
		case 1:
		checkCompanyName($("#d-input").val());
		break;
		case 2:
		checkEmail($("#d-input").val());
		break;
		case 3:
		checkName($("#d-input").val());
		break;
		case 4:
		checkPassword($("#d-input").val());
		break;
	}
}

function checkForPreviousInput(screen){
	if(screen == 4) { //make the input field a password type if the current screen is the password screen
		$("#d-input").attr("type", "password");
	} else {
		$("#d-input").attr("type", "text");
	}

	switch(screen) {
		case 1:
			if(companyName === "") { //if company name not set yet
				checkCompanyName($("#d-input").val());
			} else { //if the companyName has been set before, get the data and insert it.
				$("#d-input").val(companyName);
				$(".middle-url-bar").html(companyURL);
				$("#driff-button").addClass("enabled");
				$("#d-input").addClass("praise");
				document.getElementById("driff-button").addEventListener("click", saveData);
			}
			break;
		case 2:
			if(name !== "")
			{
				$(".c-name").html(name);
			}	
			if(email === "") {
				checkEmail($("#d-input").val());	
			} else {
				$("#d-input").val(email);
				$(".c-email").html(email);
				$("#driff-button").addClass("enabled");
				$("#d-input").addClass("praise");
				document.getElementById("driff-button").addEventListener("click", saveData);
			}
			break;
		case 3:
			if(name === "") {
				checkName($("#d-input").val());
			} else {
				$("#d-input").val(name);
				$(".c-name").html(name);
				$("#driff-button").addClass("enabled");
				$("#d-input").addClass("praise");
				document.getElementById("driff-button").addEventListener("click", saveData);
			}
			break;
		case 4:
			if(password === "") {
				checkPassword($("#d-input").val());
			} else {
				checkPassword(password);
				$("#driff-button").addClass("enabled");
				$("#d-input").val(password);
				$(".closed-eye").show();
				document.getElementById("driff-button").addEventListener("click", saveData);
			}
			break;
	}
}

function previousScreen(){ //this function is called on the back-button's onclick() event
	unsetGradientContent(); //remove all elements inside #section-gradient
	screen--; 
	setScreen(screen);
}

function unsetGradientContent() //intended for the backbutton functionality
{
	$("#section-gradient").children().remove(); //remove all elements inside #section-gradient
}

function setGradientContent(screen)
{
	$("#section-gradient").append(content[screen - 1]); //add content to the gradient section based on the screen, content is one big array of HTML elements found down this file.
}

function setTitle(title) //self explenatory
{
	$(".title").html(title);
}

function setCopy(copy) //self explenatory
{
	$(".copy").html(copy);
}

function setInputPlaceholder(placeholder) //self explenatory
{
	$("#d-input").attr("placeholder", placeholder);
}

function resetScreens(){ //clear everythig and make it move on to the next screen
	$("#d-input").val('');
	$("#driff-button").removeClass("enabled");
	$("#d-input").removeClass("praise");
	$("#section-gradient").children().remove();
	screen++;
	setScreen(screen);
}

function moveProgressBar(from, to) { //functionality for setting the progressbar
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

function togglePassword(){ //switch input type
	var x = document.getElementById("d-input");
	if (x.type === "password") {
    	x.type = "text";
    	$("#passToggle").removeClass("closed-eye");
    	$("#passToggle").addClass("open-eye");
  	} else {
   	 	x.type = "password";
   	 	$("#passToggle").removeClass("open-eye");
    	$("#passToggle").addClass("closed-eye");
  	}
}

function saveData(){ //saving input data to variables... kind of self explenatory
	switch(screen) {
		case 1:
			companyName = $("#d-input").val();
			companyURL = $("#d-input").val().replace(/\s+/g, '-').toLowerCase();
		break;
		case 2:
			email = $("#d-input").val();
		break;
		case 3:
			name = $("#d-input").val();
		break;
		case 4:
			password = $("#d-input").val();
			break;
	}
	resetScreens(); //clear the screens again
}

function checkCompanyName(cName)
{
	var cSlug;
	cSlug = cName.replace(/\s+/g, '-').toLowerCase(); //this should be the functionality which checks if the slug is correct (no spaces, weird characters etc. which you already have code for)
	if(cName.length == 0) //empty
	{ 
		$(".middle-url-bar").html("uw-bedrijfsnaam");
		$("#driff-button").removeClass("enabled");
		$("#d-input").removeClass("praise");
		document.getElementById("driff-button").removeEventListener("click", saveData);
	}
	else
	{		
		if(cName.length)
		{ //usable company name
			$("#driff-button").addClass("enabled");
	      	$("#d-input").addClass("praise");
	      	document.getElementById("driff-button").addEventListener("click", saveData);
		}
		else
	    { //unusable company name
	      $("#driff-button").removeClass("enabled");
	      $("#d-input").removeClass("praise");
	      document.getElementById("driff-button").removeEventListener("click", saveData);
    	}
	$(".middle-url-bar").html(cSlug); //set the content in the gradient section for the client to see
    }
}

function checkEmail(cEmail) {
  if(cEmail.length == 0) // empty
    { 
	  $(".c-email").html("voorbeeld@bedrijf.nl");
	  $("#driff-button").removeClass("enabled");
	  $("#d-input").removeClass("praise");
	  document.getElementById("driff-button").removeEventListener("click", saveData);
    }
    else
    {
	    if(cEmail.length && cEmail.indexOf("@") > 0 && cEmail.indexOf(".") > 0) //check for valid email (maybe add more for security)
	    {
	        $("#driff-button").addClass("enabled");
	        $("#d-input").addClass("praise");
	        getGravatar(cEmail); //check if there's a gravatar set by the user
 	      	document.getElementById("driff-button").addEventListener("click", saveData);
	    }
	    else
	    {
	        $("#driff-button").removeClass("enabled");
	        $("#d-input").removeClass("praise");
	        document.getElementById("driff-button").removeEventListener("click", saveData);
	    } 
	    $(".c-email").html(cEmail);
    }
}

function checkName(cName) { //same functionality as email and companyName
	if(cName.length == 0) //empty
  	{ 
	    $(".c-name").html("NAAM");
	    $(".driff-button").removeClass("enabled");
	    $(".d-input").removeClass("praise");
	    document.getElementById("driff-button").removeEventListener("click", saveData);
  	}
  	else
  	{
    	if(cName.length > 1)
	    {
	      $("#driff-button").addClass("enabled");
	      $("#d-input").addClass("praise");
	      document.getElementById("driff-button").addEventListener("click", saveData);
	    }
	    else
	    {
	      $("#driff-button").removeClass("enabled");
	      $("#d-input").removeClass("praise");
	      document.getElementById("driff-button").removeEventListener("click", saveData);
	    } 
    	$(".c-name").html(cName);
    }
}

function checkPassword(cPassword) {
	var passLength = cPassword.length;
	if(passLength < 5 ){
		animate("left", "out"); //animating everything away from the castle except the base
		animate("right", "out");
		animate("middle", "out");
		$("#driff-button").removeClass("enabled");
		document.getElementById("driff-button").removeEventListener("click", saveData);
	}
	if(passLength < 9 && passLength > 4 ){
		animate("right", "out");
	}
	if(passLength < 13 && passLength > 9){
		animate("middle", "out");
	}
	if(passLength > 3 ){
  		$("#driff-button").addClass("enabled");
	    document.getElementById("driff-button").addEventListener("click", saveData);
  		animate("left", "in");
	}
	if(passLength > 8 ){
		$("#driff-button").addClass("enabled");
		document.getElementById("driff-button").addEventListener("click", saveData);
  		animate("right", "in");
    }
    if(passLength > 12){
    	$("#driff-button").addClass("enabled");
    	document.getElementById("driff-button").addEventListener("click", saveData);
  		animate("middle", "in");
    }
}

function getGravatar(cemail){ //trying gravatar with the user's email, if not then generate one using the identicon (jQuery AJAX request)
  var gemail = cemail;
    if(gemail != ''){
      var md5 = $.md5(gemail);
      gravatar = 'https://gravatar.com/avatar/'+md5+'?&d=404';
        $.ajax({
            url:gravatar,
            type:"HEAD",
            crossDomain:true,
            error:function(){
              $(".profile-img-src").attr("src", "http://www.gravatar.com/avatar/"+ md5 +"?d=identicon"); //no gravatar found, set identicon
              //$(".profile-img-src").attr("src", "http://www.gravatar.com/avatar")
              return;
            },
            success:function(){
              $(".profile-img-src").attr("src", gravatar); //gravatar found, set it
              return;
            }
        });
    }
}

function hideshow(){ //deciding what to show or hide based on the screen
	$("#d-input").show();
	$("#driff-button").show();
	$(".closed-eye").hide();
	$(".open-eye").hide();
	$(".open-eye").hide();
	$(".goToDriff").hide();
	$("#google-button").hide();
	$("#inviteButton").hide();
	switch(screen) {
		case 1:
			$("#backButton").hide();
		break;
		case 2:
  			$("#backButton").show();
			$("#google-button").show();
		break;
		case 4:
        	$("#d-input").attr("type", "password");
        	$(".closed-eye").show();
		break;
		case 5:
	    	$("#d-input").hide();
    		$("#driff-button").hide();
    		$("#inviteButton").show();
    		$(".goToDriff").show();
		break;
	}
}

//one big array of content to be set in the gradient section
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
                    <img class='profile-img-src' src='http://www.gravatar.com/avatar'/>\
                  </div>\
                  <div class='profile-info'>\
                    <h2 class='c-name'>Naam</h2>\
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
                    <span class='c-company'>ZUID Creatives</span> \
                    <span class='c-email purple-text'>ruud@zuid.com</span> \
                  </div>\
                </div>\
              </div>",//2 | name
              "<div class='gradient-container '>\
                <svg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' width='75vh' height='75vh' viewBox='0 0 1000 1000'>\
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
                  <img class='driff-logo' src='#' />\
                </object>\
                <div style='float: left; bottom: 0px; height: 10px; width:10px' class='party-popper-placer'></div>\
              </div>"//4 | inviting
];

//animating the castle, I wouldn't mess around with this too much
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

// confetti 
function create(i) {
  var width = Math.random() * 8;
  var height = width * 0.4;
  var colourIdx = Math.ceil(Math.random() * 3);
  var colour = "red";
  switch(colourIdx) {
    case 1:
      colour = "yellow";
      break;
    case 2:
      colour = "blue";
      break;
    default:
      colour = "red";
  }
  $('<div class="confetti-'+i+' '+colour+'"></div>').css({
    "width" : width+"px",
    "height" : height+"px",
    "top" : -Math.random()*20+"%",
    "left" : Math.random()*100+"%",
    "opacity" : Math.random()+0.5,
    "transform" : "rotate("+Math.random()*360+"deg)"
  }).appendTo('#section-gradient');  //choose where to append the confetti here
  drop(i);
}

//drop animation
function drop(x) {
  $('.confetti-'+x).animate({
    top: "100%",
    left: "+="+Math.random()*15+"%"
  }, Math.random()*3000 + 3000, function() {
    //reset(x); //disable this for only making it rain one time //enable this to make it rain constantly
  });
}

//it never ends
function reset(x) {
  $('.confetti-'+x).animate({
    "top" : -Math.random()*20+"%",
    "left" : "-="+Math.random()*15+"%"
  }, 0, function() {
    drop(x);             
  });
}