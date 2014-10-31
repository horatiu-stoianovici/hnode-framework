// Creare's 'Implied Consent' EU Cookie Law Banner v:2.4
// Conceived by Robert Kent, James Bavington & Tom Foyster
 
var dropCookie = true;                      // false disables the Cookie, allowing you to style the banner
var cookieDuration = 180;                    // Number of days before the cookie expires, and the banner reappears
var cookieName = 'complianceCookie';        // Name of our cookie
var cookieValue = 'on';                     // Value of cookie
 
function createDiv(){
    var bodytag = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.setAttribute('id','cookie-law');
    div.innerHTML = '<p><b>Important message regarding cookies</b> <br />By using this website you consent to the use of cookies in accordance with our <a href="/terms-and-conditions" rel="nofollow" title="Privacy Policy">Terms and Conditions</a>. <a class="close-cookie-banner" href="javascript:void(0);" onclick="removeMe();"><span>Hide this message</span></a></p>';    
 // Be advised the Close Banner 'X' link requires jQuery
     

    var newstyles = document.createElement('style');
    newstyles.type = 'text/css';
    newstyles.innerHTML = '#cookie-law {width: 100%; background: #A09F9F; padding: 10px 0;} #cookie-law p { padding-top: 8px; font-size: 14px; background: none; color: white; padding-bottom: 5px; line-height: 18px; margin: 0px auto; max-width: 940px; position: relative;} #cookie-law a { color: #fff; font-weight: bold;} .close-cookie-banner { position: absolute; top: 5px; right: 5px;}';
    document.getElementsByTagName('head')[0].appendChild(newstyles);
    // bodytag.appendChild(div); // Adds the Cookie Law Banner just before the closing </body> tag
    // or
    bodytag.insertBefore(div,bodytag.firstChild); // Adds the Cookie Law Banner just after the opening <body> tag
     
    document.getElementsByTagName('body')[0].className+=' cookiebanner'; //Adds a class tothe <body> tag when the banner is visible
     
    createCookie(window.cookieName,window.cookieValue, window.cookieDuration); // Create the cookie
}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000)); 
        var expires = "; expires="+date.toGMTString(); 
    }
    else var expires = "";
    if(window.dropCookie) { 
        document.cookie = name+"="+value+expires+"; path=/"; 
    }
}
 
function checkCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
 
function eraseCookie(name) {
    createCookie(name,"",-1);
}
 
window.onload = function(){
    if(checkCookie(window.cookieName) != window.cookieValue){
        createDiv(); 
    }
}
 
function removeMe(){
	$('#cookie-law').slideToggle();
}
;
