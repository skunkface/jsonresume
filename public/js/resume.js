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
  var resumeHolder = document.createElement('section');
  resumeHolder.id = 'general';

  var emailHolder = document.createElement('a');
  emailHolder.innerHTML = general.email;
  emailHolder.href = 'mailto:' + general.email;

  var locationHolder = document.createElement('article');
  locationHolder.classList.add('location');
  var myLocation = general.location;

  var profilesHolder = document.createElement('article');
  profilesHolder.classList.add('profiles');
  var myProfiles = general.profiles;
  for (var network in myProfiles) {
    profilesHolder.appendChild(buildSocialProfile(myProfiles[network]));
  }

  elemBuilder('h1', general.name, resumeHolder);
  elemBuilder('p', myLocation.address, locationHolder);
  elemBuilder('p', myLocation.city + ', ' + myLocation.postalCode, locationHolder);
  resumeHolder.appendChild(locationHolder);
  resumeHolder.appendChild(emailHolder);
  elemBuilder('p', general.phone, resumeHolder);
  resumeHolder.appendChild(profilesHolder);
  elemBuilder('p', general.summary, resumeHolder);
  docBody.appendChild(resumeHolder);
}

function buildWork(work) {
  var docBody = document.getElementById('resume-holder');
  var workContainer = document.createElement('section');
  workContainer.id = 'work';
  for (var job in work ) {
    var workHolder = document.createElement('article');
    workHolder.classList = 'job';

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
  educationContainer.id = 'education';
  for (var school in education) {
    var educationHolder = document.createElement('article');
    educationHolder.classList.add('school');
    var extraCarriculars = document.createElement('ul');

    var extras = education[school].extraCarriculars;
    for (var activity in extras) {
      elemBuilder('li', extras[activity], extraCarriculars);
    }

    elemBuilder('h2', education[school].school, educationHolder);
    elemBuilder('h5', education[school].degreeType + ' ' + education[school].degree, educationHolder);
    elemBuilder('p', education[school].startDate + " -- " + education[school].endDate, educationHolder);
    educationHolder.appendChild(extraCarriculars);
    educationContainer.appendChild(educationHolder);
  }
  docBody.appendChild(educationContainer);
}
