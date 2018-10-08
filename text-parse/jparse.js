
//http://2ality.com/2011/12/nodejs-shell-scripting.html

var fs = require('fs');
var walk = require('walk');

//https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j




var input = process.argv[2];
var output = input + '.w'


// fs.readFile(input, 'utf-8', function(err, text) {
//   if (err) throw err;
//
//   var buttonText = makeProjectButton(text)
//   // console.log(buttonText)
//
//   // fs.writeFile(output, buttonText)
//
// })


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

var imgPath = "images/";

var textToParse = fs.readFileSync(input, "utf8").split('\n');


for (var i = 0; i <= textToParse.length; i++) {

  if (textToParse[i] === "#01 PROJECT ID") {
    projID = textToParse[i + 1];
  } else if (textToParse[i] === "#02 PROJECT IMAGES") {
    for (var e = 1; e < textToParse.length; e++) { // now loop though indices until a "".
      if (textToParse[i + e] !== "") {
        projImages.push(textToParse[i + e]);
      } else if (textToParse[i + e] === "") {
        break;
      }
    }
  } else if (textToParse[i] === "#03 PROJECT THUMBNAIL") {
    projThumbnail = textToParse[i + 1];
  } else if (textToParse[i] === "#04 PROJECT LONG NAME") {
    projLongName = textToParse[i + 1];
  } else if (textToParse[i] === "#05 PROJECT SHORT NAME") {
    projShortName = textToParse[i + 1];
  } else if (textToParse[i] === "#06 CLIENT LONG NAME") {
    clientLongName = textToParse[i + 1];
  } else if (textToParse[i] === "#07 CLIENT SHORT NAME") {
    clientShortName = textToParse[i + 1];
  } else if (textToParse[i] === "#08 LOCATION") {
    projLocation = textToParse[i + 1];
  } else if (textToParse[i] === "#09 SIZE") {
    projSize = textToParse[i + 1];
  } else if (textToParse[i] === "#10 ZGF ROLE") {
    projZGFRole = textToParse[i + 1];
  } else if (textToParse[i] === "#11 STATUS") {
    projStatus = textToParse[i + 1];

  } else if (textToParse[i] === "#12 TAGS") {
    projTags = textToParse[i + 1];

  }

}



 projImages = projImages.join('%')


 var output = '<div class="project-button" id="' + projID + '" data-img="' + projImages + '" data-thumbnail="' + projThumbnail + '" data-namelong="' + projLongName + '" data-nameshort="' + projShortName + '" data-clientlong="' + clientLongName + '" data-clientshort="' + clientShortName + '" data-projlocation="' + projLocation + '" data-projsize="' + projSize + '" data-zgfrole="' + projZGFRole + '" data-projstatus="' + projStatus + '" data-tag="all ' + projTags

var output2 = '" style="background-image: url(' + imgPath + projThumbnail + '); background-size: cover; background-position: center;"> </div>'



  output = output.replace(/[']/g, '"')
  output2 = output2.replace(/[']/g, '"')


console.log(output + output2)
