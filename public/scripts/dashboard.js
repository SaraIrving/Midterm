
$(document).ready(function () {

  $('.dash-order-item').each(function() {
    if ($(this).find('.order-item-status').text() === 'Completed' || $(this).find('.order-item-status').text() === 'In Progress') {
      $(this).find('.order-form-inputs').css('display','none');
    }

    if ($(this).find('.order-item-status').text() === 'Completed') {
      $(this).addClass('order-completed');
    }
    if ($(this).find('.order-item-status').text() === 'In Progress') {
      $(this).addClass('order-in-progress');
    }
    if ($(this).find('.order-item-status').text() === 'Pending') {
      $(this).addClass('order-pending');
    }

  })






});

