(function() {
"use strict";


var template = document.querySelector('#t');

template.pages = [
    {name: 'Foo', hash: 'foo', icon: 'label'},
    {name: 'Bar', hash: 'bar', icon: 'label'},
    {name: 'Baz', hash: 'baz', icon: 'label'},
];

var DEFAULT_ROUTE = template.pages[0].hash;

template.addEventListener('template-bound', function(e) {
  var keys = document.querySelector('#keys');

  // Allow selecting pages by num keypad. Dynamically add
  // [1, template.pages.length] to key mappings.
  var keysToAdd = Array.apply(null, template.pages).map(function(x, i) {
    return i + 1;
  }).reduce(function(x, y) {
    return x + ' ' + y;
  });
  keys.keys += ' ' + keysToAdd;

  this.route = this.route || DEFAULT_ROUTE; // Select initial route.
});

template.keyHandler = function(e, detail, sender) {
  var pages = document.querySelector('#pages');

  // Select page by num key. 
  var num = parseInt(detail.key);
  if (!isNaN(num) && num <= this.pages.length) {
    pages.selectIndex(num - 1);
    return;
  }

  switch (detail.key) {
    case 'left':
    case 'up':
      pages.selectPrevious();
      break;
    case 'right':
    case 'down':
      pages.selectNext();
      break;
    case 'space':
      detail.shift ? pages.selectPrevious() : pages.selectNext();
      break;
  }
};

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

})();
