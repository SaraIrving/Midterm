$(document).ready(function () {
  // Check if we're on the edit-menu page
  if ($('body').hasClass('edit-menu-body')) {
    // Add relevant links to navbar
    $('.navbar div').append('<a href="/dashboard" class="nav-menu-link">Dashboard</a>');
    $('.navbar div').append('<a href="/" class="nav-menu-link logout-link">Logout</a>');
  }
  // When admin clicks edit-menu button, add item input and li to order to send through form
  $('.item-specifics .edit-menu-item').on('click', function(event) {
    event.preventDefault();
    let itemName = $(this).attr('name');
    $('.order-list').append(`<li><input type="hidden" name="menu_item" value="${itemName}"></input>${itemName}</li>`)
  });
  // When admin clicks new-item button, add new item input and li to order to send through form
  $('.new-item-button').on('click', function(event) {
    event.preventDefault();
    $('.order-list').append(`<li><input type="hidden" name="new_menu_item" value="newItem"></input>New Item</li>`)
  });
  // When admin clicks on update menu, the order form changes to thank you message
  $('.submit-order').on('mouseup',function(event){
    $('.order-summary').append('<div class="order-done"><h3>Thanks!</h3><p>Your menu has been updated!</p></div>');
  });
  // On mobile, our toggle button toggles the form info for optimal user experience
  $('.order-toggle').on('click',function(event) {
    $('section.menu-wrapper form > div:last-of-type').toggle();
  });
  // When admin clicks Delete Item, we submit a form posting to /delete-item which will update the DB and delete item
  $('.delete-menu-item').on('click', function(event) {
    event.preventDefault()
    let itemName = $(this).attr('value');
    $('body').append(`<form style="display:none;" id="deleteItem" action="/delete-item" method="post">
    <input type="hidden" name="item_name" value="${itemName}"/>
    </form>`);
    $('#deleteItem').submit();
  });
})
