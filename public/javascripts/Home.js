

// //Thông báo hộp
// window.alert("Welcome to the Book website  -Thiên Bảo-");

// var x = myFunction(4,3);
// function myFunction(a,b){
//     return a + b;
// }

// BackToTop
window.onscroll = function() {
    scrollFunction()
};
function scrollFunction() {
    if ( document.documentElement.scrollTop > 400) {
        // document.getElementById("content").style.top = "0";
        document.getElementById("BackToTop").style.opacity = "1";
        document.getElementById("BackToTop").style.transition = "0.5s";

    } else {
        // document.getElementById("content").style.top = "-70px";
        document.getElementById("BackToTop").style.opacity = "0";
    }
}

function topFunction() {

    // document.documentElement.scrollIntoView({block:'start', behavior: 'smooth'});
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
        window.requestAnimationFrame(topFunction);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
    }
    // document.body.scrollTop = '0';
    // document.documentElement.scrollTop = '0';
}