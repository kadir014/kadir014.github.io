function scrollDown() {
    document.querySelector(".content").scrollIntoView({behavior: "smooth"});
}

function scrollEvent(event) {
    if (document.querySelector(".overlay").classList.contains("is-open")) {
        return;
    }
    
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

if (filename[0] != "index.html" && filename[0] != "") {
    var navbar = document.querySelector(".navbar");
    navbar.classList.add("active");
}

// https://codepen.io/nxworld/pen/MvJQQy
$(function() {
    var $overlay = $('.overlay'),
        $overlayTrigger = $('.overlay-trigger'),
        $overlayClose = $('.overlay-close'),
        openClass = 'is-open';
  
    $overlayTrigger.on('click', function(event) {
        $(".navbar").removeClass("active");
        $overlay.addClass(openClass);
        $overlayClose.addClass(openClass);

        document.querySelector("#overlay-image").src = event.target.src;

        let vh = window.innerHeight;
        let vw = window.innerWidth;
        let idiv = document.querySelector("#overlay-image-div");
        let width = document.querySelector("#overlay-image").width;
        let height = document.querySelector("#overlay-image").height;

        if (vw > vh) {
            let a = vh / height;
            let w = width * a;

            idiv.style.width = `${w}px`;
        }
        else {
            let a = vw / width;
            let h = height * a;

            idiv.style.height = `${h}px`;
        }

        document.body.style.overflow = 'hidden';
    });
  
    $overlayClose.on('click', function() {
        $overlayClose.removeClass(openClass);
        $overlay.removeClass(openClass);
        $(".navbar").addClass("active");

        let oimg = document.querySelector("#overlay-image");
        if (oimg.classList.contains("zoomed")) {
            oimg.classList.remove("zoomed");
            oimg.style.transform = "scale(1.0)";
            oimg.style.cursor = "zoom-in";
        }

        document.body.style.overflow = 'visible';
    });
});

document.querySelector("#overlay-image").addEventListener("click", function() {
    let oimg = document.querySelector("#overlay-image");

    if (oimg.classList.contains("zoomed")) {
        oimg.classList.remove("zoomed");

        oimg.style.transform = "scale(1.0)";
        oimg.style.cursor = "zoom-in";
    }
    else {
        oimg.classList.add("zoomed");

        oimg.style.transform = "scale(2.0)";
        oimg.style.cursor = "zoom-out";
    }
})

document.addEventListener("mousemove", function(event) {
    let oimg = document.querySelector("#overlay-image");

    if (oimg.classList.contains("zoomed")) {
        const x = (window.innerWidth - event.x - window.innerWidth/2) / 0.8;
        const y = (window.innerHeight - event.y - window.innerHeight/2) / 0.8;

        oimg.style.setProperty("transform", `translateX(${x}px) translateY(${y}px) scale(2.0)`, "");
    }
});