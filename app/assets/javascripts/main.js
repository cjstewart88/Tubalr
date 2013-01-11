$(document).ready(function () { 
  if (typeof FB !== "undefined") {
    FB.init({ 
      appId   : '239275546125436', 
      status  : true, 
      cookie  : true, 
      xfbml   : true 
    });
  }

  // About Tubalr Dialog
  $('#about-tubalr').dialog({
    modal:      true,
    autoOpen:   false,
    width:      600,
    draggable:  false,
    title:      'About Tubalr'
  });
  
  $('.about-tubalr').click(function () { 
    $('#about-tubalr').dialog('open'); 
  });

  // If there's rails invoked flash messages, fade them out.
  if ($('.flash-msg')) {
    setTimeout(function () {
      $('.flash-msg').slideUp(500, function () {
        $(this).remove();
      });
    }, 5000);
  }

  // focus the search input field.
  if ($('#q').val() == "") {
    $("#q").focus();
  }

  //popup search
  $('#popup-search').dialog({
    width:      '350px',
    close:       function() { $("#add-songs").show(); },
    show:        {effect: 'slide', direction: 'right'},
    hide:        {effect: 'slide', direction: 'right'},
    dialogClass: 'popup-search-dialog',
    autoOpen:    false,
    draggable:   true
  });
  
  $("#add-songs").hover(function() {
    //$('#add-songs').stop().attr('style', 'opacity: 1;');
  }).click(function(ev) {
    $('#popup-search').dialog('option', {
      position: {my: 'left top', of: ev} 
    }).dialog('open');
    $('#popup-search-query').focus();
    $('#popup-search-results').sortable({
      zIndex: 999999,
      connectWith: '#playlist'
    });
    $(this).stop().hide();
  });

  //show/hide the + (add to playlist) button
  $('#playlist').hover(
    //in
    function(){
      if($('#popup-search').dialog("isOpen")) {
        return;
      }
      $('#add-songs').show();
      $('#add-songs').stop().animate({opacity: 0.7});
    },
    //out
    function(ev){
      //check toElement to prevent trigger when leaving for add-songs
      if($('#popup-search').dialog("isOpen") || ev.toElement.id == 'add-songs') {
        return;
      }
      $('#add-songs').stop().animate({opacity: 0.2}, {
        complete: function() {
          $('#add-songs').removeAttr('style');
          $('#add-songs').hide();
        }
      });
    }
  );

  $('#popup-search-query').keyup(function(ev) {
    if ($(this).val() === '') {
      $('#search-popup-btn').attr('disabled', 'disabled');
    } else {
      $('#search-popup-btn').removeAttr('disabled');
      if(ev.which == '13') { //enter key pressed
        Playlist.popup_search();
      }
    }
  });

  $('#search-popup-btn').click(Playlist.popup_search);

  // Tooltips
  $('.tooltip').tipsy({
    gravity: 'n'
  });
  $('.tooltip-west').tipsy({
    gravity: 'w'
  });
  $('#drag-trashcan').droppable({
    accept: '#playlist li',
    hoverClass: 'drag-hover',
    tolerance: 'touch',
    activate: function(ev,ui) {
      $('#drag-trashcan').addClass('dragging');
      console.log('actives');
    },
    deactivate: function(ev,ui) {
      $('#drag-trashcan').removeClass('dragging');
      //$('#drag-trashcan').fadeOut('fast');
    },
    drop: function(ev,ui) {
      $(ui.draggable).remove();
      Playlist.sortVideos();
    }
  });
});
