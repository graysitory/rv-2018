// TODO: info panel?
// TODO: get data from JSON instead of HTML tag?




//DONE: 10/8: figure out how to prev/next through all projects
//TODO: then figure out how to filter those.

// GLOBAL VARIABLES

var imgPath = "images/";
var stageHeight = getStageHeight();
var stageWidth = getStageWidth();

var allProjects = [];


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


function getStageHeight() { // determines stage height to style .carousel-div to correct height.
  var stageHeight = $("div.stage").height();

  return stageHeight;
}

function getStageWidth() {
  var stageWidth = $("div.stage").width();
  return stageWidth
}


function recalcStageHeight() {
  var header = $("div.nav").height();
  var footer = $("div.footer").height();
  var winSize = $(window).height();
  var recalcHeight = winSize - ( header + footer );
  console.log(recalcHeight)

//  $("div.stage").height(recalcHeight);

  return recalcHeight;
}

function recalcStageWidth() {
  var recalcWidth = $(window).width();
  return recalcWidth
}



function filterProjectGrid(tag) {

  //ref: https://jsfiddle.net/rronyy/vznjbx0t/
  var regex = new RegExp('\\b' + tag + '\\b');


  $(".project-button").addClass("project-button-filter-inactive").filter(function() {
    return regex.test($(this).data('tag'));
  }).removeClass("project-button-filter-inactive");
}



function getAllProjects() { // cycle through all projects in the grid and push their ids to a global array.
  $("div.project-button").each(function() {
    var project = $(this).attr("id");
    allProjects.push(project);

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
    // reset viewport on resize
    setViewport();
    $(".carousel-img").height(recalcStageHeight());
    getStageWidth();
  };

  setAllButtonText();



  $("div.carousel").slick(); // initalize slick

  $("div.header-buttons-projects").click(function() {
    $("div.project-grid").toggleClass("hidden", "remove");
    $("div.project-grid").toggleClass("inline-flex", "add");
    $("div.project-grid").height(recalcStageHeight());
    $("div.project-grid").width(stageWidth);
    $("div.carousel").slick("unslick");
    $("div.carousel").html("");

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


    $(".carousel-img").height(recalcStageHeight());
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

    var carouselImg = '<div class="carousel-img" style="height: ' + stageHeight + 'px; width: ' + stageWidth + 'px; background-image: url(' + imgPath + currentProject[i] + '); background-size: cover; background-position: center;"> </div>'

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
