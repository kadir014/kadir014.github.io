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
