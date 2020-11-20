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
};

load_hash();
