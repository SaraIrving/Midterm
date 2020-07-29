
$(document).ready(function () {

  $('.dash-order-item').each(function() {
    if ($(this).find('.order-item-status').text() === 'completed') {
      $(this).find('.order-form-inputs').css('display','none');
    }
  })

});
