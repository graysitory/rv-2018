
//http://2ality.com/2011/12/nodejs-shell-scripting.html

var fs = require('fs');
var walk = require('walk');

//https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j


var inputFiles = [];
var inputFilesPath = [];

var getFilesToParse = walk.walk('./input', {followLinks: false});

getFilesToParse.on('file', function(root, stat, next) {
  inputFiles.push(stat.name); //just return the filename
  // var fileToParse = root + '/' + stat.name;
  // makeProjectButton(fileToParse)
  next();
});

getFilesToParse.on('end', function() {

  var fullPath = "/Users/Gray/Documents/Development/railvolution/codepen/text-parse/input/"

  for (var i = 0; i <= inputFiles.length; i++) {
    var newFile = inputFiles[i];
    var inputPath = fullPath + newFile
    console.log(inputPath.toString())

    inputPath = inputPath.toString();
    console.log(makeProjectButton(inputPath))
    //console.log(makeProjectButton(inputPath))
  }

})


// for (var e = 0; e <= inputFilesPath.length; e++) {
//   console.log(makeProjectButton(inputFilesPath[e]))
// }


function makeProjectButton(fileToParse) {

var fileToParse = fileToParse;
console.log(fileToParse)

var projID;
var projImages = [];
var projThumbnail;
var projLongName;
var projShortName;
var clientLongName;
var clientShortName;
var projLocation;
var projSize;
var projZGFRole;
var projStatus;
var projTags;

var imgPath = "blah";

var textToParse = fs.readFileSync(fileToParse, "utf8").split('\n');



for (var i = 0; i <= textToParse.length; i++) {

  if (textToParse[i] === "%01 PROJECT ID") {
    projID = textToParse[i + 1];
  } else if (textToParse[i] === "%02 PROJECT IMAGES") {
    for (var e = 1; e < textToParse.length; e++) { // now loop though indices until a "".
      if (textToParse[i + e] !== "") {
        projImages.push(textToParse[i + e]);
      } else if (textToParse[i + e] === "") {
        break;
      }
    }
  } else if (textToParse[i] === "%03 THUMBNAIL") {
    projThumbnail = textToParse[i + 1];
  } else if (textToParse[i] === "%04 PROJECT LONG NAME") {
    projLongName = textToParse[i + 1];
  } else if (textToParse[i] === "%05 PROJECT SHORT NAME") {
    projShortName = textToParse[i + 1];
  } else if (textToParse[i] === "%06 CLIENT LONG NAME") {
    clientLongName = textToParse[i + 1];
  } else if (textToParse[i] === "%07 CLIENT SHORT NAME") {
    clientShortName = textToParse[i + 1];
  } else if (textToParse[i] === "%08 LOCATION") {
    projLocation = textToParse[i + 1];
  } else if (textToParse[i] === "%09 SIZE") {
    projSize = textToParse[i + 1];
  } else if (textToParse[i] === "%10 ZGF ROLE") {
    projZGFRole = textToParse[i + 1];
  } else if (textToParse[i] === "%11 STATUS") {
    projStatus = textToParse[i + 1];

  } else if (textToParse[i] === "%12 TAGS") {
    projTags = textToParse[i + 1];

  }

}



 projImages = projImages.join('%')


 var output = '<div class="project-button" id="' + projID + '" data-img="' + projImages + '" data-thumbnail="' + projThumbnail + '" data-namelong="' + projLongName + '" data-nameshort="' + projShortName + '" data-clientlong="' + clientLongName + '" data-clientshort="' + clientShortName + '" data-projlocation="' + projLocation + '" data-projsize="' + projSize + '" data-zgfrole="' + projZGFRole + '" data-projstatus="' + projStatus + '" data-tag="all ' + projTags + '" style="background-image: url(' + imgPath + projThumbnail + '); background-position: center; background-size: cover;"> </div>';



  output = output.replace(/[']/g, '"')

  console.log(output)


  }
