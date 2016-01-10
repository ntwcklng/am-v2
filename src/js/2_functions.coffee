modalClose.on 'click', ->
	modal.fadeOut('100')

list.on 'click', ->
	modalCtx = $(this).data('desc')
	modalContent.html(modalCtx)
	modal.fadeIn('100')

	