modalClose.on 'click', ->
  modal.fadeOut fadeTime
  overlay.hide 10

list.on 'click', ->
  modalCtx = $(this).data 'desc'
  modalContent.html modalCtx

  overlay.show 10 #disable the rest of the site
  modal.fadeIn fadeTime