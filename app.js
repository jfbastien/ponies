(function() {
"use strict";

window.addEventListener("beforeunload", function (e) {
  var msg = "Leave?";
  (e || window.event).returnValue = msg;
  return msg;
});

var template = document.querySelector('#t');

template.pages = [
  {name: 'C++ on the Web',  hash: 'intro',    icon: 'info-outline'},
  {name: 'PNaCl',           hash: 'pnacl',    icon: 'label-outline'},
  {name: 'Coming Soon',     hash: 'coming',   icon: 'label-outline'},
  {name: 'Life',            hash: 'life',     icon: 'picture-in-picture'},
  {name: 'Flock',           hash: 'flock',    icon: 'picture-in-picture'},
  {name: 'Voronoi',         hash: 'voronoi',  icon: 'picture-in-picture'},
  {name: 'DevEnv',          hash: 'devenv',   icon: 'cloud-queue'},
  {name: 'Security',        hash: 'security', icon: 'label'},
  {name: 'Randomization',   hash: 'random',   icon: 'label'},
  {name: 'Fuzzing',         hash: 'fuzzing',  icon: 'label'},
  {name: 'Hack Me',         hash: 'hack',     icon: 'label'},
  {name: 'JavaScript?',     hash: 'js',       icon: 'label'},
  {name: 'The End',         hash: 'outro',    icon: 'info'},
];

template.menuItemSelected = function(e, detail, sender) {
  if (detail.isSelected) {
    document.querySelector('#scaffold').closeDrawer();
  }
};

template.onResponse = function(e, detail, sender) {
  var article = detail.response.querySelector('#content');
  var pages = document.querySelector('#pages');
  this.injectBoundHTML(article.innerHTML,
                       pages.selectedItem.firstElementChild);
};

template.toggleCmd = function(e, detail, sender) {
  document.querySelector('#cmd').toggle();
};

})();
