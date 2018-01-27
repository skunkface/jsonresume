/*jshint esversion: 6 */
function build () {
  var docBody = document.getElementsByTagName('body');
  var resumeContainer = document.createElement('section');
  resumeContainer.id = "resume-holder";
  resumeContainer.classList.add('resume-holder');
  docBody[0].appendChild(resumeContainer);
  init(function(resume) {
    buildGeneral(resume.general);
    buildWork(resume.work);
    buildEducation(resume.education);
    buildStyleChange();
  });
  return resumeContainer;
  console.log(resumeContainer);
}

function printToPdf() {
    var resumeContent = build();
    console.log(resumeContent);
}

function elemBuilder(tag, content, dest) {
  var tempElem = document.createElement(tag);
  tempElem.innerHTML = content;
  if (typeof dest !== 'undefined') {
    dest.appendChild(tempElem);
  } else {
    return tempElem;
  }
}

function linkBuilder(href, content, dest) {
  var tempLink = document.createElement('a');
  if (typeof content !== 'undefined') {
    tempLink.innerHTML = content;
  }
  tempLink.href = href;
  if (typeof dest !== 'undefined') {
    dest.appendChild(tempLink);
  } else {
    return tempLink;
  }
}

function buttonBuilder(value, content, dest) {
  var tempBttn = document.createElement('button');
  tempBttn.innerHTML = content;
  tempBttn.value = value;
  dest.appendChild(tempBttn);
}

printToPdf();
