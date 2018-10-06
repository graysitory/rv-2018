// TODO: info panel?
// TODO: get data from JSON instead of HTML tag?

// GLOBAL VARIABLES

var imgPath = "images/";
var calculatedDimensions = [];

// var stageHeight = getStageHeight();
// var stageWidth = getStageWidth();


// Viewport Settings
var viewport_meta = document.getElementById("viewport-meta");
var viewports = {
  default: viewport_meta.getAttribute("content"),
  landscape: "width=990"
};

function setViewport() {
  // set viewport based on device--smaller than 960px
  if (screen.width > 768)
    viewport_meta.setAttribute("content", viewports.landscape);
  else viewport_meta.setAttribute("content", viewports.default);
}


//
// function calcBodyDimensions() {
//
//   var calculatedDimensions = []; // reset calc dimensions array
//
//   var winWidth = $(window).width();
//   var winHeight = $(window).height();
//
//   var navWidth = winWidth;
//   var navHeight = winHeight * 0.12; // 12% of window height
//
//   var footerWidth = winWidth;
//   var footerHeight = winHeight * 0.05; // 5% of window height
//
//   var stageWidth = winWidth;
//   var stageHeight = winHeight - (footerHeight + navHeight);
//
//   calculatedDimensions.push(navWidth, navHeight, footerWidth, footerHeight, stageWidth, stageHeight);
//
//   return calculatedDimensions;
//
// }



function calcStageWidth() {
    var winWidth = $(window).width();
    $("div.stage").width(winWidth);
}

function calcNavWidth() {
    var winWidth = $(window).width();
    $("div.nav").width(winWidth);
}

function calcFooterWidth() {
    var winWidth = $(window).width();
    $("div.footer").width(winWidth);
}

function calcNavHeight() {
  var winHeight = $(window).height();
  var navHeight = winHeight * 0.12; // 12% of window height
  $("div.nav").height(navHeight);
  return navHeight;
}

function calcFooterHeight() {
  var winHeight = $(window).height();
  var footerHeight = winHeight * 0.05;
  $("div.footer").height(footerHeight);
  return footerHeight;
}

function calcStageHeight() {
  var winHeight = $(window).height();

  var otherHeights = calcFooterHeight() + calcNavHeight();
  console.log(otherHeights)
  var stageHeight = winHeight - otherHeights;
  console.log(stageHeight)

  console.log(otherHeights + stageHeight)
  console.log(winHeight)

  $("div.stage").height(stageHeight)
  return stageHeight;
}

calcStageHeight()

// function calcWidth() {
//   var winWidth = $(window).width();
//   return winWidth;
// }
//
// function calcNavHeight() {
//   var winHeight = $(window).height();
//   var navHeight = winHeight * 0.12; // 12% of window height
//   return navHeight
// }
//
// function calcFooterHeight() {
//   var winHeight = $(window).height();
//   var footerHeight = winHeight * 0.05; // 5% of window height
//   return footerHeight;
// }
//
// function calcStageHeight(calcNavHeight, calcFooterHeight) {
//   var winHeight = $(window).height();
//   var stageHeight = winHeight - (calcNavHeight() + calcFooterHeight())
//   console.log(stageHeight);
//   return stageHeight;
// }
//
// function setBodyDimensions() {
//
//   $("div.nav").width(calculatedDimensions[0]);
//   $("div.nav").height(calculatedDimensions[1]);
//   $("div.footer").width(calculatedDimensions[2]);
//   $("div.footer").height(calculatedDimensions[3]);
//   $("div.stage").width(calculatedDimensions[4]);
//   $("div.stage").height(calculatedDimensions[5]);
//
//   console.log(calculatedDimensions)
// }



// function getStageHeight() { // determines stage height to style .carousel-div to correct height.
//   var stageHeight = $("div.stage").height();
//
//   return stageHeight;
// }
//
// function getStageWidth() {
//   var stageWidth = $("div.stage").width();
//   return stageWidth
// }
//
//
// function recalcStageHeight() {
//   var header = $("div.nav").height();
//   var footer = $("div.footer").height();
//   var winSize = $(window).height();
//   var recalcHeight = winSize - ( header + footer );
//   console.log(recalcHeight)
//
// //  $("div.stage").height(recalcHeight);
//
//   return recalcHeight;
// }
//
// function recalcStageWidth() {
//   var recalcWidth = $(window).width();
//   return recalcWidth
// }



function filterProjectGrid(tag) {

  //ref: https://jsfiddle.net/rronyy/vznjbx0t/
  var regex = new RegExp('\\b' + tag + '\\b');


  $(".project-button").addClass("project-button-filter-inactive").filter(function() {
    return regex.test($(this).data('tag'));
  }).removeClass("project-button-filter-inactive");
}



function setAllButtonText() {
  $(".project-button").each(function() {
    $($(this)).html('<p class="button-text-location">' + this.dataset.projlocation + '</p><p class="button-text-project-name">' + this.dataset.nameshort + '</p>')
  })
}


$(document).ready(function() {
  setViewport(); // set viewport
  calcNavWidth();
  calcStageWidth();
  calcFooterWidth();
  calcNavHeight();
  calcStageHeight();
  calcFooterHeight();
  $("div.project-grid").height(calcStageHeight());
  $("div.project-grid").width(calcStageWidth());

  window.onresize = function() {

    setViewport();  // reset viewport on resize
    calcNavWidth();
    calcStageWidth();
    calcFooterWidth();
    calcNavHeight();
    calcStageHeight();
    calcFooterHeight();
    $("div.project-grid").height(calcStageHeight());
    $("div.project-grid").width(calcStageWidth());



    // $(".carousel-img").height(recalcStageHeight());
    // getStageWidth();
  };
  setAllButtonText();



  $("div.carousel").slick(); // initalize slick

  $("button#showgrid").click(function() {
    $("div.project-grid").toggleClass("hidden", "remove");
    $("div.project-grid").toggleClass("inline-flex", "add");
    $("div.carousel").slick("unslick");
    $("div.carousel").html("");
    $("div.carousel-img").toggleClass("hidden", "add");
    $("div.carousel").toggleClass("hidden", "add");

    var projClient = "";
    var projName = "";
    var projLocation = "";

    changeProjectTitle(projClient, projName, projLocation);
    //$("div.carousel").replaceWith( $(".project-grid") );

  })


  $(".project-button").on("click", function(e) {


    var imgLinks = this.dataset.img; // get the string of links specified in html tag data-img
    var projClient = this.dataset.clientshort;
    var projName = this.dataset.nameshort;
    var projLocation = this.dataset.projlocation;
    var projTags = this.dataset.tag;
    var imgLinksArray = imgLinks.split("%");

    console.log(imgLinks);
    console.log(imgLinksArray);

    $("div.project-grid").toggleClass("hidden", "add");
    $("div.project-grid").toggleClass("inline-flex", "remove");
    $("div.carousel").toggleClass("hidden", "remove");
    $("div.carousel-img").toggleClass("hidden", "remove")


    $(".carousel-img").height(calcStageHeight());
    changeSliderProject(imgLinksArray);
    changeProjectTitle(projClient, projName, projLocation);

  });





$(".project-tags").click(function() {
  var tag = $(this).data("tag");
  filterProjectGrid(tag);
})

});




function changeProjectTitle(projClient, projName, projLocation) {
  var newTitle =
    '<p class="project-client">' +
    projClient +
    '</p><span class="project-name">' +
    projName +
    '</span><span class="project-location">' +
    projLocation +
    "</span>";

  $("div.project-title").html(newTitle);
}

function changeSliderProject(currentProject) {
  var carouselImages = [];
  $("div.carousel").slick("unslick"); // destroy previous

  console.log(currentProject)
  console.log(imgPath)

  for (var i = 0; i < currentProject.length; i++) {

    var carouselImg = '<div class="carousel-img" style="height: ' + calcStageHeight() + 'px; width: ' + calcStageWidth() + 'px; background-image: url(' + imgPath + currentProject[i] + '); background-size: cover; background-position: center;"> </div>'

    carouselImages.push(carouselImg);

    console.log(carouselImages)
  }
  var builtCarousel = carouselImages.join(""); // join each index without a separator

  $("div.carousel").html(builtCarousel);

  $("div.carousel").slick({
    autoplay: true,
    autoplaySpeed: 4000, //speed in ms
    arrows: false,
    fade: true
  });
}

// $(document).ready(function() {
//   $("div.stage").prepend('<div class="info-panel">x</div>');
// });
