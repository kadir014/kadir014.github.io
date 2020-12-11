function openVersionDiv(id) {
  var div = document.querySelector(`#${id}`);

  if (div.style.display === "inline-grid"){
    div.style.display = "none";
  }
  else {
    div.style.display = "inline-grid";
  }
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getBtn(btn) {
  var mousename = document.querySelector("#mousename");
  var mousepar = document.querySelector("#mousepar");

  if (btn=="left"){
    mousename.textContent = "Left mouse button";
    mousepar.textContent = "'left'";
  } else if (btn=="right"){
    mousename.textContent = "Right mouse button";
    mousepar.textContent = "'right'";
  } else if (btn=="middle"){
    mousename.textContent = "Mouse wheel button";
    mousepar.textContent = "'middle'";
  }
}

function getKey(key) {
  var keys = JSON.parse(keydata);

  var keyname = document.querySelector("#keyname");
  var keycode = document.querySelector("#keycode");
  var keyspecial = document.querySelector("#keyspecial");
  var keypar = document.querySelector("#keypar");

  keyname.textContent = capitalize(keys[key]["name"]);
  keycode.textContent = keys[key]["keycode"];
  keyspecial.textContent = keys[key]["special"];
  keypar.textContent = '"' + key + '"';

  var btnshow = document.querySelector(".btn-show-text");
  if (key=="escape"){
    btnshow.textContent = capitalize("ESC");
  } else if (key=="print") {
    btnshow.textContent = capitalize("PRT");
    btnshow.innerHTML += "<br><span style='font-size:23px;'>SCR</span>";
  } else if (key=="scrollock") {
    btnshow.textContent = capitalize("SCR");
    btnshow.innerHTML += "<br><span style='font-size:23px;'>LCK</span>";
  } else if (key=="break") {
    btnshow.textContent = capitalize("PAUS");
    btnshow.innerHTML += "<br><span style='font-size:23px;'>BRK</span>";
  } else if (key=="backspace") {
    btnshow.textContent = capitalize("←");
  }else if (key=="insert") {
    btnshow.textContent = capitalize("Ins");
  }else if (key=="delete") {
    btnshow.textContent = capitalize("Del");
  }else if (key=="quotedbl") {
    btnshow.textContent = capitalize('"');
    btnshow.innerHTML += "<br>é";
  }else if (key=="pageup") {
    btnshow.textContent = capitalize("PG");
    btnshow.innerHTML += "<br><span style='font-size:25px;'>UP</span>";
  }else if (key=="pagedown") {
    btnshow.textContent = capitalize("PG");
    btnshow.innerHTML += "<br><span style='font-size:23px;'>DWN</span>";
  }else if (key=="divide") {
    btnshow.textContent = capitalize("/");
  }else if (key=="multiply") {
    btnshow.textContent = capitalize("*");
  }else if (key=="nminus") {
    btnshow.textContent = capitalize("-");
  }else if (key=="asterisk") {
    btnshow.textContent = capitalize("-");
  }else if (key=="minus") {
    btnshow.textContent = capitalize("+");
    btnshow.innerHTML += "<br>=";
  }else if (key=="numlock") {
    btnshow.innerHTML = "<span style='font-size:30px;'>NUM</span>";
    btnshow.innerHTML += "<br><span style='font-size:23px;'>LCK</span>";
  }else if (key=="home") {
    btnshow.innerHTML = "<span style='font-size:30px;'>Home</span>";
  }else if (key=="return") {
    btnshow.textContent = capitalize("⏎");
  }else if (key=="nplus") {
    btnshow.textContent = capitalize("+");
  } else {
    btnshow.textContent = capitalize(key);
  }
}

function search(){
  var inp = document.querySelector("#searchbarinput");
  document.querySelector("#searchelement").innerHTML= inp.value;
  load_hash_manual("#search");

  var headers = new Map([["intro", "#introduction"],
                         ["introduction", "#introduction"],
                         ["install", "#installing"],
                         ["installing", "#installing"],
                         ["tutorial", "#tutorials"],
                         ["tutorials", "#tutorials"],
                         ["latest", "#latest"],
                         ["whats new", "#latest"],
                         ["what's new", "#latest"],
                         ["engine", "#engine"],
                         ["window", "#window"],
                         ["stage", "#stage"],
                         ["errors", "#errors"],
                         ["sprite", "#sprite"],
                         ["color", "#color"],
                         ["colour", "#color"],
                         ["palette", "#palette"],
                         ["render", "#renderer"],
                         ["renderer", "#renderer"]
                       ]);

  var found = "";

  for (const [key, value] of headers.entries()) {

    if (inp.value.toLowerCase() == key) {
      found = value;
      break;
    }
  }

  var st = document.querySelector("#searchstate");

  console.log(found);

  if (found == ""){
    st.innerHTML = "Nothing found.";
  } else {
    st.innerHTML = "1 results were found.";
  }
}

var dropdown = document.querySelectorAll('.dropdown-btn');
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    var img = this.previousElementSibling.getElementsByTagName("img")[0];
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
      img.src = "../../assets/icon-idle.png";
    } else {
      dropdownContent.style.display = "block";
      img.src = "../../assets/icon-open.png";
    }
  });
}

dropdown[0].previousElementSibling.getElementsByTagName("img")[0].src = "../../assets/icon-open.png";
dropdown[0].nextElementSibling.style.display = "block";

var dropdown = document.querySelectorAll('.dropdown-btn-icon');
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling.nextElementSibling;
    var img = this.getElementsByTagName("img")[0];
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
      img.src = "../../assets/icon-idle.png";
    } else {
      dropdownContent.style.display = "block";
      img.src = "../../assets/icon-open.png";
    }
  });
}

function load_hash_manual(hash){
  if (hash.includes("-")) {
    var h = hash.split("-");
    var hash = h[0];
    var elem = document.getElementById(h[1]);
    elem.scrollIntoView();
  }
  var content = document.querySelector("#content");

  var dropdown = document.querySelectorAll('.dropdown-btn');
  var i;

  for (i = 0; i < dropdown.length; i++) {
    cont = dropdown[i].nextElementSibling;
  }

  content.innerHTML = document.querySelector(hash).innerHTML;

  document.querySelectorAll('.img-comp-slider').forEach(function(a){
    a.remove()
  })

  initComparisons();
}

function load_hash(){
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

  var hash = window.location.hash;
  if (hash==="") {
    hash = "#introduction"
  }

  if (hash.includes("-")) {
    var h = hash.split("-");
    var hash = h[0];
    var elem = document.getElementById(h[1]);
    elem.scrollIntoView();
  }
  var content = document.querySelector("#content");

  var dropdown = document.querySelectorAll('.dropdown-btn');
  var i;

  for (i = 0; i < dropdown.length; i++) {
    cont = dropdown[i].nextElementSibling;
  }

  content.innerHTML = document.querySelector(hash).innerHTML;

  document.querySelectorAll('.img-comp-slider').forEach(function(a){
    a.remove()
  })

  initComparisons();

  if (hash=="#postprocess"){
    if (document.querySelector("#hashvar").text == "true") {
      location.reload();
      document.querySelector("#hashvar").text = "false";
    }
  } else {
    document.querySelector("#hashvar").text = "true";
  }
};

load_hash();


const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        document.querySelector("#githublogoimg").src = "../../assets/github-icon-white.png"
        var cssId = 'myCss';  // you could encode the css path itself to generate id..

            var head  = document.getElementsByTagName('head')[0];
            var link  = document.createElement('link');
            link.id   = cssId;
            link.rel  = 'stylesheet';
            link.href = '../../packages/highlightjs/styles/atelier-forest-dark.css';
            head.appendChild(link);
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); //add this

        document.querySelector("#githublogoimg").src = "../../assets/github-icon-white.png"

        var cssId = 'myCss';  // you could encode the css path itself to generate id..

            var head  = document.getElementsByTagName('head')[0];
            var link  = document.createElement('link');
            link.id   = cssId;
            link.rel  = 'stylesheet';
            link.href = '../../packages/highlightjs/styles/atelier-forest-dark.css';
            head.appendChild(link);
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); //add this

        document.querySelector("#githublogoimg").src = "../../assets/github-icon.jpg"

        var cssId = 'myCss';  // you could encode the css path itself to generate id..

            var head  = document.getElementsByTagName('head')[0];
            var link  = document.createElement('link');
            link.id   = cssId;
            link.rel  = 'stylesheet';
            link.href = '../../packages/highlightjs/styles/atelier-forest-light.css';
            head.appendChild(link);
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);

function initComparisons() {
  var x, i;
  /* Find all elements with an "overlay" class: */
  x = document.getElementsByClassName("img-comp-overlay");
  for (i = 0; i < x.length; i++) {
    /* Once for each "overlay" element:
    pass the "overlay" element as a parameter when executing the compareImages function: */
    compareImages(x[i]);
  }
  function compareImages(img) {
    var slider, img, clicked = 0, w, h;
    /* Get the width and height of the img element */
    w = img.offsetWidth;
    h = img.offsetHeight;
    /* Set the width of the img element to 50%: */
    img.style.width = (w / 2) + "px";
    /* Create slider: */
    slider = document.createElement("DIV");
    slider.setAttribute("class", "img-comp-slider");
    /* Insert slider */
    img.parentElement.insertBefore(slider, img);
    /* Position the slider in the middle: */
    slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
    slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
    /* Execute a function when the mouse button is pressed: */
    slider.addEventListener("mousedown", slideReady);
    /* And another function when the mouse button is released: */
    window.addEventListener("mouseup", slideFinish);
    /* Or touched (for touch screens: */
    slider.addEventListener("touchstart", slideReady);
     /* And released (for touch screens: */
    window.addEventListener("touchend", slideFinish);
    function slideReady(e) {
      /* Prevent any other actions that may occur when moving over the image: */
      e.preventDefault();
      /* The slider is now clicked and ready to move: */
      clicked = 1;
      /* Execute a function when the slider is moved: */
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }
    function slideFinish() {
      /* The slider is no longer clicked: */
      clicked = 0;
    }
    function slideMove(e) {
      var pos;
      /* If the slider is no longer clicked, exit this function: */
      if (clicked == 0) return false;
      /* Get the cursor's x position: */
      pos = getCursorPos(e)
      /* Prevent the slider from being positioned outside the image: */
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      /* Execute a function that will resize the overlay image according to the cursor: */
      slide(pos);
    }
    function getCursorPos(e) {
      var a, x = 0;
      e = e || window.event;
      /* Get the x positions of the image: */
      a = img.getBoundingClientRect();
      /* Calculate the cursor's x coordinate, relative to the image: */
      x = e.pageX - a.left;
      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      return x;
    }
    function slide(x) {
      /* Resize the image: */
      img.style.width = x + "px";
      /* Position the slider: */
      slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
    }
  }
}

keydata =
'{"backspace": {"keycode": 8, "special": false, "name": "backspace"}, "tab": {"keycode": 9, "special": false, "name": "tab"}, "clear": {"keycode": 1073741980, "special": false, "name": "clear"}, "return": {"keycode": 13, "special": false, "name": "return"}, "pause": {"keycode": 1073741896, "special": false, "name": "pause"}, "escape": {"keycode": 27, "special": false, "name": "escape"}, "space": {"keycode": 32, "special": false, "name": "space"}, "exclaim": {"keycode": 33, "special": false, "name": "exclaim"}, "quotedbl": {"keycode": 34, "special": false, "name": "quotedbl"}, "hash": {"keycode": 35, "special": false, "name": "hash"}, "dollar": {"keycode": 36, "special": false, "name": "dollar"}, "ampersand": {"keycode": 38, "special": false, "name": "ampersand"}, "quote": {"keycode": 39, "special": false, "name": "quote"}, "lparen": {"keycode": 40, "special": false, "name": "lparen"}, "rparen": {"keycode": 41, "special": false, "name": "rparen"}, "asterisk": {"keycode": 42, "special": false, "name": "asterisk"}, "plus": {"keycode": 43, "special": false, "name": "plus"}, "comma": {"keycode": 44, "special": false, "name": "comma"}, "minus": {"keycode": 45, "special": false, "name": "minus"}, "period": {"keycode": 46, "special": false, "name": "period"}, "slash": {"keycode": 47, "special": false, "name": "slash"}, "0": {"keycode": 48, "special": false, "name": "0"}, "1": {"keycode": 49, "special": false, "name": "1"}, "2": {"keycode": 50, "special": false, "name": "2"}, "3": {"keycode": 51, "special": false, "name": "3"}, "4": {"keycode": 52, "special": false, "name": "4"}, "5": {"keycode": 53, "special": false, "name": "5"}, "6": {"keycode": 54, "special": false, "name": "6"}, "7": {"keycode": 55, "special": false, "name": "7"}, "8": {"keycode": 56, "special": false, "name": "8"}, "9": {"keycode": 57, "special": false, "name": "9"}, "colon": {"keycode": 58, "special": false, "name": "colon"}, "semicolon": {"keycode": 59, "special": false, "name": "semicolon"}, "less": {"keycode": 60, "special": false, "name": "less"}, "equals": {"keycode": 61, "special": false, "name": "equals"}, "greater": {"keycode": 62, "special": false, "name": "greater"}, "question": {"keycode": 63, "special": false, "name": "question"}, "at": {"keycode": 64, "special": false, "name": "at"}, "leftbracket": {"keycode": 91, "special": false, "name": "leftbracket"}, "backslash": {"keycode": 92, "special": false, "name": "backslash"}, "rightbracet": {"keycode": 93, "special": false, "name": "rightbracet"}, "caret": {"keycode": 94, "special": false, "name": "caret"}, "underscore": {"keycode": 95, "special": false, "name": "underscore"}, "backquote": {"keycode": 96, "special": false, "name": "backquote"}, "a": {"keycode": 97, "special": false, "name": "a"}, "b": {"keycode": 98, "special": false, "name": "b"}, "c": {"keycode": 99, "special": false, "name": "c"}, "d": {"keycode": 100, "special": false, "name": "d"}, "e": {"keycode": 101, "special": false, "name": "e"}, "f": {"keycode": 102, "special": false, "name": "f"}, "g": {"keycode": 103, "special": false, "name": "g"}, "h": {"keycode": 104, "special": false, "name": "h"}, "i": {"keycode": 105, "special": false, "name": "i"}, "j": {"keycode": 106, "special": false, "name": "j"}, "k": {"keycode": 107, "special": false, "name": "k"}, "l": {"keycode": 108, "special": false, "name": "l"}, "m": {"keycode": 109, "special": false, "name": "m"}, "n": {"keycode": 110, "special": false, "name": "n"}, "o": {"keycode": 111, "special": false, "name": "o"}, "p": {"keycode": 112, "special": false, "name": "p"}, "q": {"keycode": 113, "special": false, "name": "q"}, "r": {"keycode": 114, "special": false, "name": "r"}, "s": {"keycode": 115, "special": false, "name": "s"}, "t": {"keycode": 116, "special": false, "name": "t"}, "u": {"keycode": 117, "special": false, "name": "u"}, "v": {"keycode": 118, "special": false, "name": "v"}, "w": {"keycode": 119, "special": false, "name": "w"}, "x": {"keycode": 120, "special": false, "name": "x"}, "y": {"keycode": 121, "special": false, "name": "y"}, "z": {"keycode": 122, "special": false, "name": "z"}, "delete": {"keycode": 127, "special": false, "name": "delete"}, "n0": {"keycode": 1073741922, "special": false, "name": "n0"}, "n1": {"keycode": 1073741913, "special": false, "name": "n1"}, "n2": {"keycode": 1073741914, "special": false, "name": "n2"}, "n3": {"keycode": 1073741915, "special": false, "name": "n3"}, "n4": {"keycode": 1073741916, "special": false, "name": "n4"}, "n5": {"keycode": 1073741917, "special": false, "name": "n5"}, "n6": {"keycode": 1073741918, "special": false, "name": "n6"}, "n7": {"keycode": 1073741919, "special": false, "name": "n7"}, "n8": {"keycode": 1073741920, "special": false, "name": "n8"}, "n9": {"keycode": 1073741921, "special": false, "name": "n9"}, "nperiod": {"keycode": 1073741923, "special": false, "name": "nperiod"}, "divide": {"keycode": 1073741908, "special": false, "name": "divide"}, "multiply": {"keycode": 1073741909, "special": false, "name": "multiply"}, "nminus": {"keycode": 1073741910, "special": false, "name": "nminus"}, "nplus": {"keycode": 1073741911, "special": false, "name": "nplus"}, "enter": {"keycode": 1073741912, "special": false, "name": "enter"}, "nequals": {"keycode": 1073741927, "special": false, "name": "nequals"}, "up": {"keycode": 1073741906, "special": false, "name": "up"}, "down": {"keycode": 1073741905, "special": false, "name": "down"}, "right": {"keycode": 1073741903, "special": false, "name": "right"}, "left": {"keycode": 1073741904, "special": false, "name": "left"}, "insert": {"keycode": 1073741897, "special": false, "name": "insert"}, "home": {"keycode": 1073741898, "special": false, "name": "home"}, "end": {"keycode": 1073741901, "special": false, "name": "end"}, "pageup": {"keycode": 1073741899, "special": false, "name": "pageup"}, "pagedown": {"keycode": 1073741902, "special": false, "name": "pagedown"}, "f1": {"keycode": 1073741882, "special": false, "name": "f1"}, "f2": {"keycode": 1073741883, "special": false, "name": "f2"}, "f3": {"keycode": 1073741884, "special": false, "name": "f3"}, "f4": {"keycode": 1073741885, "special": false, "name": "f4"}, "f5": {"keycode": 1073741886, "special": false, "name": "f5"}, "f6": {"keycode": 1073741887, "special": false, "name": "f6"}, "f7": {"keycode": 1073741888, "special": false, "name": "f7"}, "f8": {"keycode": 1073741889, "special": false, "name": "f8"}, "f9": {"keycode": 1073741890, "special": false, "name": "f9"}, "f10": {"keycode": 1073741891, "special": false, "name": "f10"}, "f11": {"keycode": 1073741892, "special": false, "name": "f11"}, "f12": {"keycode": 1073741893, "special": false, "name": "f12"}, "f13": {"keycode": 1073741928, "special": false, "name": "f13"}, "f14": {"keycode": 1073741929, "special": false, "name": "f14"}, "f15": {"keycode": 1073741930, "special": false, "name": "f15"}, "numlock": {"keycode": 1073741907, "special": true, "name": "numlock"}, "capslock": {"keycode": 1073741881, "special": true, "name": "capslock"}, "scrollock": {"keycode": 1073741895, "special": true, "name": "scrollock"}, "rshift": {"keycode": 1073742053, "special": true, "name": "rshift"}, "lshift": {"keycode": 1073742049, "special": true, "name": "lshift"}, "rctrl": {"keycode": 1073742052, "special": true, "name": "rctrl"}, "lctrl": {"keycode": 1073742048, "special": true, "name": "lctrl"}, "ralt": {"keycode": 1073742054, "special": true, "name": "ralt"}, "lalt": {"keycode": 1073742050, "special": true, "name": "lalt"}, "rmeta": {"keycode": 1073742055, "special": true, "name": "rmeta"}, "lmeta": {"keycode": 1073742051, "special": true, "name": "lmeta"}, "lsuper": {"keycode": 1073742051, "special": false, "name": "lsuper"}, "rsuper": {"keycode": 1073742055, "special": false, "name": "rsuper"}, "altgr": {"keycode": 1073742081, "special": true, "name": "altgr"}, "help": {"keycode": 1073741941, "special": false, "name": "help"}, "print": {"keycode": 1073741894, "special": false, "name": "print"}, "sysreq": {"keycode": 1073741978, "special": false, "name": "sysreq"}, "break": {"keycode": 1073741896, "special": false, "name": "pause break"}, "menu": {"keycode": 1073741942, "special": false, "name": "menu"}, "power": {"keycode": 1073741926, "special": false, "name": "power"}, "euro": {"keycode": 1073742004, "special": false, "name": "euro"}}';
