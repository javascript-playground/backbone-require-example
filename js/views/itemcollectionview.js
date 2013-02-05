define(["lib/backbone", "models/item", "views/itemview"], function(Backbone, Item, ItemView) {
  var ItemCollectionView = Backbone.View.extend({
    el: '#yourcart',
    initialize: function(collection) {
      this.collection = collection;
      this.render();
      this.collection.on("reset", this.render, this);
    },
    render: function() {
      this.$el.html("");
      this.collection.each(function(item) {
        this.renderItem(item);
      }, this);
    },
    renderItem: function(item) {
      var itemView = new ItemView({model: item});
      this.$el.append(itemView.render().el);
    },
    addItem: function() {
      var data = {};
      $("#add").children("input[type='text']").each(function(i, el) {
        data[el.id] = $(el).val();
      });
      var newItem = new Item(data);
      this.collection.add(newItem);
      this.renderItem(newItem);
    },
    filterByPrice: function() {
      // first reset the collection
      // but do it silently so the event doesn't trigger
      this.collection.reset(items, { silent: true });
      var max = parseFloat($("#less-than").val(), 10);
      var filtered = _.filter(this.collection.models, function(item) {
        return item.get("price") < max;
      });
      // trigger reset again
      // but this time trigger the event so the collection view is rerendered
      this.collection.reset(filtered);
    },
    clearFilter: function() {
      $("#less-than").val("");
      this.collection.reset(items);
    }
  });
  return ItemCollectionView;
});
