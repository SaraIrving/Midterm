
$(document).ready(function () {
  // Check if page is dashboard
  if ($('body').hasClass('dashboard-body')) {
    // Add relevant links to navbar
    $('.navbar div').append('<a href="/edit-menu" class="nav-menu-link">Edit Menu</a>');
    $('.navbar div').append('<a href="/" class="nav-menu-link logout-link">Logout</a>');
  }
  // Loop through each order article
  $('.dash-order-item').each(function() {
    // Check if order is completed or in progress, and if so, we'll hide the inputs to update order
    if ($(this).find('.order-item-status').text() === 'Completed' || $(this).find('.order-item-status').text() === 'In Progress') {
      $(this).find('.order-form-inputs').css('display','none');
    }
    // Check if order is completed, if it is, we add class for styling
    if ($(this).find('.order-item-status').text() === 'Completed') {
      $(this).addClass('order-completed');
    }
    // Check if order is in progress, if it is, we add class for styling
    if ($(this).find('.order-item-status').text() === 'In Progress') {
      $(this).addClass('order-in-progress');
    }
    // Check if order is pending, if it is, we add class for styling
    if ($(this).find('.order-item-status').text() === 'Pending') {
      $(this).addClass('order-pending');
    }
  })
});

