function scrollDown() {
    document.querySelector(".content").scrollIntoView({behavior: "smooth"});
}

function scrollEvent(event) {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }

    var filename = location.href.split("/").slice(-1);
    var navbar = document.querySelector(".navbar");

    if (filename[0] == "index.html" || filename[0] == "") {
        var navbar = document.querySelector(".navbar");
        var banner = document.querySelector(".banner");
        var bannerBottom = banner.getBoundingClientRect().bottom + window.innerHeight/2 + 460;

        if (window.scrollY > bannerBottom) {
            navbar.classList.add("active");
        } else {
            navbar.classList.remove("active");
        }
    }
}

addEventListener("scroll", scrollEvent);

var filename = location.href.split("/").slice(-1);
var navbar = document.querySelector(".navbar");

if (filename[0] != "index.html" || filename[0] == "") {
    var navbar = document.querySelector(".navbar");
    navbar.classList.add("active");
}