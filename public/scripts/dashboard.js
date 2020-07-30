
$(document).ready(function () {

  $('.dash-order-item').each(function() {
    if ($(this).find('.order-item-status').text() === 'Completed' || $(this).find('.order-item-status').text() === 'In Progress') {
      $(this).find('.order-form-inputs').css('display','none');
    }
  })

});

