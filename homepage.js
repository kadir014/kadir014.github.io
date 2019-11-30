function open_sidebar() {
  document.getElementById("sidebar").style.left = "0px";
  document.getElementById("closer").style.display = "block";
  document.getElementById("opener").style.display = "none";
}

function close_sidebar() {
  document.getElementById("sidebar").style.left = "-177px";
  document.getElementById("opener").style.display = "block";
  document.getElementById("closer").style.display = "none";
  document.getElementById("theme-dialog").style.display = "none";
}

function show_themedialog() {
  document.getElementById("theme-dialog").style.display = "block";
}

function show_themedialog() {
  document.getElementById("theme-dialog").style.display = "block";
}

function set_themes() {
  var elements = document.getElementsByClassName("theme-btn")
  for (i = 0; i < elements.length; i++) {
  elements[i].style.backgroundColor = elements[i].id;
  }
}

function change_theme(theme, theme_light) {
  document.documentElement.style.setProperty('--theme', theme);
  document.documentElement.style.setProperty('--theme-light', theme_light);
}
