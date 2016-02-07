#=include ./config.coffee

modalClose.on 'click', ->
  # modal.fadeOut fadeTime
  overlay.fadeOut fadeTime
  modal.removeClass 'showModal'
  modal.addClass 'hideModal'

list.on 'click', ->
  modalCtx = $(this).data 'desc'
  modalContent.html modalCtx

  overlay.fadeIn fadeTime #disable the rest of the site
  # modal.fadeIn fadeTime
  modal.removeClass 'hideModal'
  modal.addClass 'showModal'