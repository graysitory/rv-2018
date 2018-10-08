// TODO: info panel?
// TODO: get data from JSON instead of HTML tag?




//DONE: 10/8: figure out how to prev/next through all projects
//TODO: then figure out how to filter those.

// GLOBAL VARIABLES

var imgPath = "images/";
var calculatedDimensions = [];

// var stageHeight = getStageHeight();
// var stageWidth = getStageWidth();

var allProjects = [];
var currentTagProjects = [];


// Viewport Settings
var viewport_meta = document.getElementById("viewport-meta");
var viewports = {
  default: viewport_meta.getAttribute("content"),
  landscape: "width=1920"
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
  var stageHeight = winHeight - otherHeights;

  $("div.stage").height(stageHeight)
  return stageHeight;
}

function resetStageWidthAndHeight() {
  var stageWidth = calcStageWidth();
  var stageHeight = calcStageHeight();

  $("div.project-grid").height(stageHeight);
  $("div.project-grid").width(stageWidth);
  $("div.carousel-img").height(stageHeight);
  $("div.carousel-img").width(stageWidth);


}

function calcProjectGridDimensions() {
  var stageWidth = $("div.stage").width();
  var stageHeight = $("div.stage").height();

  var tagsWidth = stageWidth * .20;
  var gridWidth = stageWidth - tagsWidth;

  $("div.project-grid-buttons").width(gridWidth).height(stageHeight);

  $("div.project-grid-tags").width(tagsWidth)


}


function calcProjectButton() {
  var gridWidth = $("div.project-grid-buttons").width();

  var buttonSize = gridWidth * .15;

  $("div.project-button").width(buttonSize);
  $("div.project-button").height(buttonSize);


}





function filterProjectGrid(tag) {

  var currentTagProjects = []; // clear the active project type array
  //ref: https://jsfiddle.net/rronyy/vznjbx0t/
  var regex = new RegExp('\\b' + tag + '\\b');


  $(".project-button").addClass("project-button-filter-inactive").hide().filter(function() {
    return regex.test($(this).data('tag'));
  }).removeClass("project-button-filter-inactive");



// To Pull all currently filtered stuff...clumsy execution, and returns "undefined" for everything without the class .project-button-filter-inactive.
  $(".project-button").each(function() {
    var active = $(this).not(".project-button-filter-inactive").attr("id");

    if ( active !== undefined ) { // prevents pushing "undefined" to array for projects that are not filtered.
          currentTagProjects.push(active);
    }


    // var active = $(this).not(".project-button-filter-inactive");
    // currentTagProjects.push(active);
  });

  console.log(currentTagProjects);
}



function getAllProjects() { // cycle through all projects in the grid and push their ids to a global array.
  $("div.project-button").each(function() {
    var project = $(this).attr("id");
    allProjects.push(project);
    currentTagProjects.push(project);
  })
}



function setAllButtonText() {
  $(".project-button").each(function() {
    $($(this)).html('<p class="button-text-location">' + this.dataset.projlocation + '</p><p class="button-text-project-name">' + this.dataset.nameshort + '</p>')
  })
}


$(document).ready(function() {
  setViewport(); // set viewport
  getAllProjects(); // populate global array with projects

  console.log(allProjects)


  window.onresize = function() {

    setViewport();  // reset viewport on resize


    resetStageWidthAndHeight();
    calcNavWidth();
    calcStageWidth();
    calcFooterWidth();
    calcNavHeight();
    calcStageHeight();
    calcFooterHeight();
    calcProjectButton();




    // $(".carousel-img").height(recalcStageHeight());
    // getStageWidth();
  };
  setAllButtonText();



  $("div.carousel").slick(); // initalize slick

  $("div.header-buttons-projects").click(function() {
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
