$(document).ready(function () {
  $('#searching-info-dialog').dialog({
    modal: true,
    autoOpen: false,
    width: 600,
    draggable: false,
    title: 'Search Methods'
  });
  $('#searching-info').click(function () { $('#searching-info-dialog').dialog('open'); });

$('#info').dialog({
    modal: true,
    autoOpen: false,
    width: 600,
    draggable: false,
    height: 400    
  });
  $('#info-button').click(function () { $('#info').dialog('open'); });
  
  $('#share-video').dialog({
    modal: true,
    autoOpen: false,
    width: 200,
    draggable: false,
    height: 170,
    title: "Share Video"
  });

  $('#about-tubalr').dialog({
    modal: true,
    autoOpen: false,
    width: 600,
    draggable: false,
    title: 'About Tubalr'
  });
  $('.about-tubalr').click(function () { $('#about-tubalr').dialog('open'); });
});