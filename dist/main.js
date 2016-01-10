(function() {
  var body, content, list, modal, modalClose, modalContent, modalCtx;

  modalCtx = '';

  list = $('.list');

  content = $('.content');

  modalContent = $('.modal-ctx');

  modal = $('.modal');

  modalClose = $('.modal-close');

  body = $('body');

  modalClose.on('click', function() {
    return modal.fadeOut('100');
  });

  list.on('click', function() {
    modalCtx = $(this).data('desc');
    modalContent.html(modalCtx);
    return modal.fadeIn('100');
  });

}).call(this);
