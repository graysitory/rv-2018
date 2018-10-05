// TODO: info panel?
// TODO: get data from JSON instead of HTML tag?

// GLOBAL VARIABLES

var imgPath = "https://s3-us-west-2.amazonaws.com/rv-test-img-src/";
var stageHeight = getStageHeight();

var projectTags = ['Show All', 'Streetcar', 'District Planning', 'Transit', 'Public Spaces', 'Light Rail', 'Streetscape', 'Innovations']

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

// function setStagePixelHeight() { // sets image carousel div to the height of the stage so the full image shows (without content in the div)
//    var stageHeight = $("div.stage").height();
//   alert(stageHeight)

//   $(".carousel-img").height(stageHeight)

// }

// function calcStageHeight() { // calculates stage height; sets carousel-img height to stage height
//   var navHeight = $("div.nav").height();
//   var footerHeight = $("div.footer").height();
//   var windowHeight = $(window).height();
//   var ipadBarPlaceholder = $("div.ipadHeaderPlaceholder").height();

//   var stageHeight = windowHeight - (navHeight + footerHeight + ipadBarPlaceholder)

//   $(".carousel-img").height(stageHeight)

// }

function getStageHeight() { // determines stage height to style .carousel-div to correct height.
  var stageHeight = $("div.stage").height();

  return stageHeight;
}

// function getThumbnails() {
//   var thumbnail = this.dataset.thumbnail;
  
//   var buildThumb = 'url("' + imgPath + thumbnail '");';
  
//   $(".project-button").css("background-image", buildThumb)
// }


function filterProjectGrid(tag) {
  
  //ref: https://jsfiddle.net/rronyy/vznjbx0t/
  var regex = new RegExp('\\b' + tag + '\\b');
  
  
  $(".project-button").addClass("project-button-filter-inactive").filter(function() {
    return regex.test($(this).data('tag'));
  }).removeClass("project-button-filter-inactive");
}


function getButtonProjectName() {
  $(".project-button").each(function() {
    var projectName = this.dataset.nameshort;
    return projectName;
  });
  return projectName;
}

function getButtonLocation() {
  $(".project-button").each(function() {
    var projectLocation = this.dataset.projlocation;
    return projectLocation;
  });
  return projectLocation;
}


function setAllButtonText() {
  $(".project-button").each(function() {
    $($(this)).html('<p class="button-text-location">' + this.dataset.projlocation + '</p><p class="button-text-project-name">' + this.dataset.nameshort + '</p>')
  })
}


$(document).ready(function() {
  setViewport(); // set viewport
  window.onresize = function() {
    // reset viewport on resize
    setViewport();
    getStageHeight();
  };
  
  setAllButtonText();
  

//   setAllButtonText();
  
  // getThumbnails();
  
  

  $("div.carousel").slick(); // initalize slick

  $("button#showgrid").click(function() {
    $("div.project-grid").toggleClass("hidden", "remove");
    $("div.project-grid").toggleClass("inline-flex", "add");
    $("div.project-grid").height(stageHeight)
    $("div.carousel").slick("unslick");
    $("div.carousel").html("");
    
    var projClient = "";
    var projName = "";
    var projLocation = "";
    
    changeProjectTitle(projClient, projName, projLocation);
    //$("div.carousel").replaceWith( $(".project-grid") );
  
  })
  
  
  
//   function changeStagedProject(changeSliderProject, changeProjectTitle) {
   
//     var imgLinks = this.dataset.img; // get the string of links specified in html tag data-img
//     var projClient = this.dataset.clientShort;
//     var projName = this.dataset.nameShort;
//     var projLocation = this.dataset.projLocation;
//     var projTags = this.dataset.tag;
//     var imgLinksArray = imgLinks.split("%");
    
//     alert("clicked");
    
//     changeSliderProject(imgLinksArray);
//     changeProjectTitle(projClient, projName, projLocation);
//   }
  
  $(".project-button").on("click", function(e) {
    
    console.log(this)
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
    
    changeSliderProject(imgLinksArray);
    changeProjectTitle(projClient, projName, projLocation);
    
  });
  
//   $(".project-grid").on("click", "div", function(e) {
//     e.preventDefault();
//     // Buttons for each project
//     var imgLinks = this.dataset.img; // get the string of links specified in html tag data-img
//     var projClient = this.dataset.client-short;
//     var projName = this.dataset.name-short;
//     var projLocation = this.dataset.location;
//     var projTags = this.dataset.tag;
//     var imgLinksArray = imgLinks.split("%");
    
//     alert("clicked")
    
// //     $("div.project-grid").toggleClass("hidden", "add");
// //     $("div.project-grid").toggleClass("inline-flex", "remove");
    

//     changeSliderProject(imgLinksArray);
//     changeProjectTitle(projClient, projName, projLocation);
//   });
  

  
  
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

  for (var i = 0; i < currentProject.length; i++) {
    // create div structure for each image
    //  carouselImages.push("<div class='"'carousel-img'"'><img src='" + imgPath + currentProject[i] + "'></div>")
    carouselImages.push(
      '<div class="carousel-img" style=" height: ' +
        stageHeight +
        "px; background-image: url(" +
        imgPath +
        currentProject[i] +
        '); background-size: cover; background-position: center;"> </div>'
    );
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
