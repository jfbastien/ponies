(function() {
"use strict";

window.addEventListener("beforeunload", function (e) {
  var msg = "Leave?";
  (e || window.event).returnValue = msg;
  return msg;
});

var template = document.querySelector('#t');

template.pages = [
  {name: 'C++ on the Web',  hash: 'intro',   icon: 'info-outline'},
  {name: 'Life',            hash: 'life',    icon: 'picture-in-picture'},
  {name: 'Flock',           hash: 'flock',   icon: 'picture-in-picture'},
  {name: 'Voronoi',         hash: 'voronoi', icon: 'picture-in-picture'},
  {name: 'Randomization',   hash: 'random',  icon: 'label-outline'},
  {name: 'Fuzzing',         hash: 'fuzzing', icon: 'label-outline'},
  {name: 'The End',         hash: 'outro',   icon: 'info'},
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
