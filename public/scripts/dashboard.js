
$(document).ready(function () {

  if ($('body').hasClass('dashboard-body')) {
    $('.navbar div').append('<a href="/edit-menu" class="nav-menu-link">Edit Menu</a>');
    $('.navbar div').append('<a href="/" class="nav-menu-link logout-link">Logout</a>');
  }

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

