function buildStyleChange() {
  var docBody = document.getElementsByTagName('body');
  var styleChange = document.createElement('section');
  buttonBuilder('default.css', 'default', styleChange);
  buttonBuilder('compact.css', 'compact', styleChange);
  styleChange.id = 'style-change';
  docBody[0].appendChild(styleChange);
  styleChange.addEventListener('click', buttonEL, false);
}

function buttonEL(e) {
  if (e.target !== e.currentTarget) {
    switchCss(e.target.value, 1);
  }
}

function switchCss(cssFile, cssFileIndex) {
  var styleLink = document.getElementsByTagName('link').item(cssFileIndex);
  styleLink.href = "css/" + cssFile;
}
