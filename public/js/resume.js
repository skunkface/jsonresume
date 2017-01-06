function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
  xobj.open('GET', '../resume.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function init(callback) {
  loadJSON(function(response) {
   callback(JSON.parse(response));
  });
}

function buildSocialProfile(profile) {
  var tempProfile = document.createElement('div');
  var icon = document.createElement('i');
  icon.classList.add('fa');
  icon.classList.add(profile.iconClass);
  icon.setAttribute('aria-hidden', true);
  linkContent = elemBuilder('span', profile.url.slice(12));
  var link = linkBuilder(profile.url);
  link.appendChild(icon);
  link.appendChild(linkContent);
  return link;
}

function buildGeneral(general) {
  var docBody = document.getElementById('resume-holder');
  var generalHolder = document.createElement('section');
  generalHolder.classList.add('general');

  var emailHolder = document.createElement('a');
  emailHolder.innerHTML = general.email;
  emailHolder.href = 'mailto:' + general.email;

  var locationHolder = document.createElement('article');
  locationHolder.classList.add('location');
  var myLocation = general.location;
  elemBuilder('p', myLocation.address, locationHolder);
  elemBuilder('p', myLocation.city + ', ' + myLocation.postalCode, locationHolder);

  var contactHolder = document.createElement('article');
  contactHolder.classList.add('contact');
  contactHolder.appendChild(emailHolder);
  elemBuilder('p', general.phone, contactHolder);

  var profilesHolder = document.createElement('article');
  profilesHolder.classList.add('profiles');
  var myProfiles = general.profiles;
  for (var network in myProfiles) {
    profilesHolder.appendChild(buildSocialProfile(myProfiles[network]));
  }

  var descriptionHolder = document.createElement('article');
  descriptionHolder.classList.add('description');
  elemBuilder('p', general.summary, descriptionHolder);

  elemBuilder('h1', general.name, generalHolder);
  generalHolder.appendChild(locationHolder);
  generalHolder.appendChild(contactHolder);
  generalHolder.appendChild(profilesHolder);
  generalHolder.appendChild(descriptionHolder);
  docBody.appendChild(generalHolder);
}

function buildWork(work) {
  var docBody = document.getElementById('resume-holder');
  var workContainer = document.createElement('section');
  workContainer.classList.add('work');
  for (var job in work ) {
    var workHolder = document.createElement('article');
    workHolder.classList.add('job');

    elemBuilder('h2', work[job].company, workHolder);
    elemBuilder('h3', work[job].position, workHolder);
    elemBuilder('p', work[job].startDate + " -- " + work[job].endDate, workHolder);

    var workHighlights = work[job].highlights;
    var highlightHolder = document.createElement('div');
    for (var highlight in workHighlights) {
      elemBuilder('p', workHighlights[highlight], highlightHolder);
    }
    workHolder.appendChild(highlightHolder);

    workContainer.appendChild(workHolder);
  }
  docBody.appendChild(workContainer);
}

function buildEducation(education) {
  var docBody = document.getElementById('resume-holder');
  var educationContainer = document.createElement('section');
  educationContainer.classList.add('education');
  for (var school in education) {
    var educationHolder = document.createElement('article');
    educationHolder.classList.add('school');
    var extraCarriculars = document.createElement('ul');

    var extras = education[school].extraCarriculars;
    for (var activity in extras) {
      elemBuilder('li', extras[activity], extraCarriculars);
    }

    elemBuilder('h2', education[school].school, educationHolder);
    elemBuilder('h4', education[school].degreeType + ' ' + education[school].degree, educationHolder);
    elemBuilder('p', education[school].startDate + " -- " + education[school].endDate, educationHolder);
    educationHolder.appendChild(extraCarriculars);
    educationContainer.appendChild(educationHolder);
  }
  docBody.appendChild(educationContainer);
}
