var orderbutton = document.getElementById("button2");
orderbutton.onclick = order;

function order() {
 
var inputsize = document.getElementById ("inputsize");
var inputsizevalue = inputsize.value;

var inputoccasion = document.getElementById ("inputoccasion");
var inputoccasionvalue = inputoccasion.value;

var inputcolors = document.getElementById ("inputcolors");
var inputcolorsvalue = inputcolors.value;

var inputcolortwo = document.getElementById ("inputcolortwo");
var inputcolortwovalue = inputcolortwo.value;

var inputname = document.getElementById ("inputname");
var inputnamevalue = inputname.value;

var inputemail = document.getElementById ("inputemail");
var inputemailvalue = inputemail.value;

var isValid = validateorder();

  if(isValid === true){
    // emailjs account settings
    var service_id = "default_service";
    var template_id = "order";
    
    // send emailjs email template
    // parameters: service_id, template_id, template_parameters
    emailjs.send(service_id, template_id, {size: inputsizevalue, occasion: inputoccasionvalue, color: inputcolorsvalue, shapes: inputcolortwovalue, name: inputnamevalue, email: inputemailvalue})
    .then(function(response) {
       console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
    }, function(err) {
       console.log("FAILED. error=", err);
    });
    
    
    clearorder();
  }
}

function clearorder(){
  
inputsize.value = "large";

inputcolors.value = "blue";

inputoccasion.value = "";

inputcolortwo.value ="";

inputname.value ="";

inputemail.value = "";

alert ("Thank you for shopping with us");

}


function validateorder(){
  
  var isvalid = true;
  
  if(inputoccasion.value ==""){
    isvalid = false;
    alert("Please enter an occasion");
    
    
  }
  
   if(inputcolortwo.value ==""){
    isvalid = false;
    alert("Please enter if you want shapes or stripes");
    
     if(inputemail.value ==""){
    isvalid = false;
    alert("Please enter an Email");
    
     if(inputname.value ==""){
    isvalid = false;
    alert("Please enter your name");
    
  }
    
  }
  }
  
  
  return isvalid;
}