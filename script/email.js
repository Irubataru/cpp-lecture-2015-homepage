(function(){
  $(document).ready(function() {
    $(".my-mail").hover(function(){
      $(this).attr("href", "mailto:" + ["glesaaen", "th.physik.uni-frankfurt.de"].join('@'));
    });
  });
})();
