$(document).ready(function() {
  $(".collapse-card .expand-button").click(toggle_expand);
  $(".mdl-layout__tab-bar > a").click(reset_tab);
  $(".my-mail a").hover(function(){
    $(this).attr("href", "mailto:" + ["glesaaen", "th.physik.uni-frankfurt.de"].join('@'));
  });
});

function reset_tab() {
  $(".collapse-card").addClass("is-collapsed");
  $(".collapse-card .expand-button").text("More");
  $('.mdl-card__supporting-text').removeAttr('style');
  $('.fade').removeAttr('style');
}

function toggle_expand() {
  var $card = $(this).parent(".collapse-card");
  var is_collapsed = $card.hasClass("is-collapsed");
  var $support_text = $(this).prev(".mdl-card__supporting-text");
  var $fade_box = $(this).siblings(".fade");
  var $this = $(this);
  var animate_time = 500;

  if (is_collapsed) {
    var text_height = $support_text.prop("scrollHeight") - 32;
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
