require.config({
  shim: {
    'lib/underscore': {
      exports: '_'
    },
    'lib/backbone': {
      deps: ["lib/underscore", "lib/jquery"],
      exports: 'Backbone'
    }
  }
});

var items = [
  { title: "Macbook Air", price: 799 },
  { title: "Macbook Pro", price: 999 },
  { title: "The new iPad", price: 399 },
  { title: "Magic Mouse", price: 50 },
  { title: "Cinema Display", price: 799 }
];
require(
  ["lib/jquery",
    "lib/underscore",
    "lib/backbone",
    "views/cartcollectionview"
  ],
  function($, _, B, CartCollectionView) {
    var app = new CartCollectionView(items);
  }
);

