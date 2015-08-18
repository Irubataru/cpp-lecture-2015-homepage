(function(){
  $(document).ready(function() {
    setActiveTab(window.location.hash);

    $("#collapse-all").click(function () {
      $(".mdl-layout__tab-panel.is-active .content-card .mdl-card__title").click();
      $(this).toggleClass("rotated");
    });
    $(".collapse-card .expand-button").click(toggle_expand);
    $(".content-card .mdl-card__title").click(toggle_super_expand);
    $(".mdl-layout__tab-bar > a").click(reset_tab);
    $(".my-mail a").hover(function(){
      $(this).attr("href", "mailto:" + ["glesaaen", "th.physik.uni-frankfurt.de"].join('@'));
    });
  });

  jQuery.fn.extend({
    saveCSS: function (property) {
      if (typeof(property) === "string") {
        $(this).data(property, $(this).css(property));
      } else if ($.isArray(property)) {
        for (var i = 0; i < property.length; ++i)
          $(this).data(property[i], $(this).css(property[i]));
      }
      return $(this);
    },
    restoreCSS: function (property) {
      if (typeof(property) === "string") {
        $(this).css(property, $(this).data(property));
      } else if ($.isArray(property)) {
        for (var i = 0; i < property.length; ++i)
          $(this).css(property[i], $(this).data(property[i]));
      }
      return $(this);
    },
    animateSaved: function (property, animation_arguments, optional_function) {
      var styles = {};
      if (typeof(property) === "string") {
        styles[property] = $(this).data(property);
      } else if ($.isArray(property)) {
        for (var i = 0; i < property.length; ++i)
          styles[property[i]] = $(this).data(property[i]);
      }

      return $(this).animate(styles, animation_arguments, optional_function);
    },
    busy : function busy (new_state) {
      if (new_state === undefined) {
        return $(this).data("is-busy");
      } else {
        return $(this).data("is-busy", new_state);
      }
    }
  });

  function setActiveTab(hash_string) {
    if (!$(hash_string).length)
      return;

    $(".mdl-layout__tab-bar .is-active").removeClass("is-active")
      .siblings('a[href="' + hash_string + '"]').addClass("is-active");
    $(".mdl-layout__tab-panel.is-active").removeClass("is-active")
      .siblings(hash_string).addClass("is-active");
  }

  function reset_tab() {
    $(".content-card")
      .addClass("is-collapsed")
      .removeClass("super-collapsed")
      .children(".expand-button")
        .text("More")
        .removeAttr("style")
        .removeData()
      .siblings(".mdl-card__supporting-text")
        .removeAttr("style")
        .removeData()
      .siblings(".fade")
        .removeAttr("style")
        .removeData();
  }

  function toggle_expand()
  {
    if ($(this).busy() )
      return;

    var $this = $(this);
    $this.busy(true);

    var $card = $(this).parent(".collapse-card");
    var $support_text = $(this).siblings(".mdl-card__supporting-text");
    var $fade_box = $(this).siblings(".fade");

    var animate_time = 500;

    if ($card.hasClass("is-collapsed")) {
      var text_height = $support_text.prop("scrollHeight");
      $support_text.animate({
          "height": text_height
        }, animate_time, function(){
          $card.removeClass("is-collapsed");
          $this.text("Less");
          $this.busy(false);
        });
      $fade_box.animate({
          "opacity": 0
        }, animate_time);
    } else {
      $support_text.animate({
        "height": 200
        }, animate_time, function(){
            $card.addClass("is-collapsed");
            $this.text("More");
            $this.busy(false);
          });
      $fade_box.animate({
          "opacity": 1
        }, animate_time);
    }
  }

  function toggle_super_expand()
  {
    var $card = $(this).parent(".content-card");
    if ($card.busy())
      return;

    $card.busy(true);

    var $support_text = $(this).siblings(".mdl-card__supporting-text");
    var $fade_box = $(this).siblings(".fade");
    var $expand_button = $(this).siblings(".expand-button");

    var animate_time = 500;
    var animate_props = {
      duration: animate_time,
      queue: false
    };

    if ($card.hasClass("super-collapsed")) {
      $support_text.animateSaved(["height","padding-top","padding-bottom"], animate_time, function(){
          $card.removeClass("super-collapsed");
          $expand_button.restoreCSS("display");
          $card.busy(false);
      });
      $fade_box.animateSaved("height",animate_props);
    } else {
      $support_text.saveCSS(["height","padding-top","padding-bottom"]);
      $expand_button.saveCSS("display");
      $fade_box.saveCSS("height");

      $expand_button.css("display","none");
      $support_text.animate({
        "height": 0,
        "padding-top": 0,
        "padding-bottom": 0
      }, animate_time, function(){
          $card.addClass("super-collapsed");
          $card.busy(false);
      });

      $fade_box.animate({
        "height": 0}, animate_props);
    }
  }
})();
