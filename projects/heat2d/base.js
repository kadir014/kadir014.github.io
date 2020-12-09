function openVersionDiv(id) {
  var div = document.querySelector(`#${id}`);

  if (div.style.display === "inline-grid"){
    div.style.display = "none";
  }
  else {
    div.style.display = "inline-grid";
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
};

load_hash();

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');

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
