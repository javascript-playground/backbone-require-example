var items = [
  { title: "Macbook Air", price: 799 },
  { title: "Macbook Pro", price: 999 },
  { title: "The new iPad", price: 399 },
  { title: "Magic Mouse", price: 50 },
  { title: "Cinema Display", price: 799 }
];

var cartCollection = new Cart(items);

var CartCollectionView = Backbone.View.extend({
  el: "body",
  events: {
    "submit #add": "addItem",
    "submit #filter": "filterItems",
    "click #clear-filter": "clearFilter"
  },
  initialize: function() {
    this.itemView = new ItemCollectionView();
  },
  addItem: function(e) {
    e.preventDefault();
    this.itemView.addItem();
  },
  filterItems: function(e) {
    e.preventDefault();
    this.itemView.filterByPrice();
  },
  clearFilter: function(e) {
    e.preventDefault();
    this.itemView.clearFilter();
  }

});


$(function() {
  var app = new CartCollectionView();
});
