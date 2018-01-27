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

function skillBuilder(skill) {
  var tempSkill = document.createElement('article');
  var skillLevel = document.createElement('div');
  skillLevel.classList.add('skillLevel');
  elemBuilder('p', skill.name, tempSkill);
  for (var i = 0; i < skill.level; i++) {
    var tempStar = document.createElement('i');
    tempStar.classList.add('fa');
    tempStar.classList.add('fa-star');
    skillLevel.appendChild(tempStar);
  }
  var blankStars = 5 - skill.level;
  for (var j = 0; j < blankStars; j++) {
    var tempBlankStar = document.createElement('i');
    tempBlankStar.classList.add('fa');
    tempBlankStar.classList.add('fa-star-o');
    skillLevel.appendChild(tempBlankStar);
  }
  tempSkill.appendChild(skillLevel);
  return tempSkill;
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

  var skillsHolder = document.createElement('article');
  skillsHolder.classList.add('skills');
  var skillsList = general.skills;
  for (var skill in skillsList) {
    skillsHolder.appendChild(skillBuilder(skillsList[skill]));
  }

  elemBuilder('h1', general.name, generalHolder);
  generalHolder.appendChild(locationHolder);
  generalHolder.appendChild(contactHolder);
  generalHolder.appendChild(profilesHolder);
  generalHolder.appendChild(descriptionHolder);
  generalHolder.appendChild(skillsHolder);
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
    elemBuilder('h6', work[job].startDate + " -- " + work[job].endDate, workHolder);

    elemBuilder('p', work[job].summary, workHolder);

    if (work[job].highlights.length != 0) {
      var workHighlights = work[job].highlights;
      var highlightHolder = document.createElement('ul');
      for (var highlight in workHighlights) {
        elemBuilder('li', workHighlights[highlight], highlightHolder);
      }
      workHolder.appendChild(highlightHolder);
    }
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
