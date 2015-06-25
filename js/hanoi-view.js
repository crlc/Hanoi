(function () {
  if (typeof Hanoi === "undefined") {
    window.Hanoi = {};
  }

  var View = Hanoi.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupTowers();
    this.fromTower = null;
    this.clickTower();
  };

  View.prototype.setupTowers = function () {
    for (var i=0; i< 3; i++) {
      var $currentTower = $('<div>').data('position', i).addClass('tower').appendTo(this.$el);
      $currentTower.data('discs', this.game.towers[i]);
      for (var j = 1; j <= 3; j++) {
        $('<div>').addClass('disc').data('position', j).appendTo($currentTower);
      }
    }
    this.render();
  };


  View.prototype.clickTower = function () {
    var view = this;
    $('.tower').on("click", function (event) {
      var $currentTarget = $(event.currentTarget);
      if (view.fromTower === null) {
        view.fromTower = $currentTarget;
      } else {
        view.game.move(view.fromTower.data('position'), $currentTarget.data('position'));
        view.render();
        view.fromTower = null;
      }
    });
  }

  View.prototype.render = function () {
    var view = this;
    $('.disc').removeClass('disc-1 disc-2 disc-3');
    // $('.tower').data('discs', this.game.towers[$('.tower').data('position')]);
    $('.tower').each(function (index) {
      var currentDiscs = view.game.towers[index];
      for(var i = 0; i < currentDiscs.length; i++) {
        console.log($(this).find('.disc'));
        $(this).find('.disc').eq(-(i+1)).addClass('disc-' + currentDiscs[i].toString());
      }
    });
    if (this.game.isWon()) {
      alert("YOU WIN");
    }
  };
})();
