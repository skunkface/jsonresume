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
}

function elemBuilder(tag, content, dest="none") {
  var tempElem = document.createElement(tag);
  tempElem.innerHTML = content;
  if (dest != "none") {
    dest.appendChild(tempElem);
  } else {
    return tempElem;
  }
}

function linkBuilder(href, content='0', dest='0') {
  var tempLink = document.createElement('a');
  if (!content) {
    tempLink.innerHTML = content;
  }
  tempLink.href = href;
  if (!dest) {
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
