(function() {
"use strict";


var template = document.querySelector('#t');

template.pages = [
    {name: 'Foo', hash: 'foo', icon: 'label'},
    {name: 'Bar', hash: 'bar', icon: 'label'},
    {name: 'Baz', hash: 'baz', icon: 'label'},
];

template.cyclePages = function(e, detail, sender) {
  // Click clicks should navigate and not cycle pages.
  if (e.path[0].localName == 'a') {
    return;
  }

  e.shiftKey ? sender.selectPrevious(true) : sender.selectNext(true);
};

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
