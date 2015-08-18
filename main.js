$(document).ready(function() {
  $(".collapse-card .expand-button").click(toggle_expand);
  $(".collapse-card .mdl-card__media").click(toggle_super_expand);
  $(".mdl-layout__tab-bar > a").click(reset_tab);
  $(".my-mail a").hover(function(){
    $(this).attr("href", "mailto:" + ["glesaaen", "th.physik.uni-frankfurt.de"].join('@'));
  });
});

function reset_tab() {
  $(".collapse-card").addClass("is-collapsed");
  $(".collapse-card").removeClass("super-collapsed");
  $(".collapse-card .expand-button").text("More");
  $('.mdl-card__supporting-text').removeAttr('style');
  $('.fade').removeAttr('style');
  $('.collapse-card .expand-button').removeAttr('style');
  $('.mdl-card__supporting-text').removeAttr('data');
  $('.fade').removeAttr('data');
}

function toggle_expand() {
  var $card = $(this).parent(".collapse-card");
  var is_collapsed = $card.hasClass("is-collapsed");
  var $support_text = $(this).prev(".mdl-card__supporting-text");
  var $fade_box = $(this).siblings(".fade");
  var $this = $(this);
  var animate_time = 500;

  if (is_collapsed) {
    var text_height = $support_text.prop("scrollHeight");
    $support_text.animate({
      "height": text_height}, animate_time, function(){
        $card.removeClass("is-collapsed");
        $this.text("Less");
      });
    $fade_box.animate({
      "opacity": 0}, animate_time);
  } else {
    $support_text.animate({
      "height": 200}, animate_time, function(){
        $card.addClass("is-collapsed");
        $this.text("More");
      });
    $fade_box.animate({
      "opacity": 1}, animate_time);
  }
}

function toggle_super_expand() {
  var $card = $(this).parent(".collapse-card");
  var is_collapsed = $card.hasClass("super-collapsed");
  var $support_text = $(this).siblings(".mdl-card__supporting-text");
  var $fade_box = $(this).siblings(".fade");
  var $expand_button = $(this).siblings(".expand-button");
  var animate_time = 500;

  console.log("Click");

  if (is_collapsed) {
    $support_text.animate({
      "height": $support_text.data("prev-height")}, animate_time, function(){
        $card.removeClass("super-collapsed");
        $expand_button.css("display","inline-block");
        console.log("Stuff");
      });
    $support_text.animate({
      "padding-top": $support_text.data("prev-padding-top")},
      {queue: false, duration: animate_time});
    $support_text.animate({
      "padding-bottom": $support_text.data("prev-padding-bottom")},
      {queue: false, duration: animate_time});
    $fade_box.animate({
      "height": $fade_box.data("prev-height")}, {queue: false, duration: animate_time});
  } else {
    $support_text.data( "prev-height", $support_text.css("height") );
    $support_text.data( "prev-padding-top", $support_text.css("padding-top") );
    $support_text.data( "prev-padding-bottom", $support_text.css("padding-bottom") );
    $fade_box.data( "prev-height", $fade_box.css("height") );
    $expand_button.css("display","none");
    $support_text.animate({
      "height": 0}, animate_time, function(){
        $card.addClass("super-collapsed");
      });
    $support_text.animate({
      "padding-top": 0}, {queue: false, duration: animate_time});
    $support_text.animate({
      "padding-bottom": 0}, {queue: false, duration: animate_time});
    $fade_box.animate({
      "height": 0}, {queue: false, duration: animate_time});
  }
}
