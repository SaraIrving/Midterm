$(document).ready(function () {
  if ($('body').hasClass('edit-menu-body')) {
    $('.navbar div').append('<a href="/dashboard" class="nav-menu-link">Dashboard</a>');
    $('.navbar div').append('<a href="/" class="nav-menu-link logout-link">Logout</a>');
  }


  $('.item-specifics .edit-menu-item').on('click', function(event) {
    event.preventDefault();
    let itemName = $(this).attr('name');
    $('.order-list').append(`<li><input type="hidden" name="menu_item" value="${itemName}"></input>${itemName}</li>`)
  });

  $('.new-item-button').on('click', function(event) {
    event.preventDefault();
    $('.order-list').append(`<li><input type="hidden" name="new_menu_item" value="newItem"></input>New Item</li>`)
  });

  $('.submit-order').on('mouseup',function(event){
    $('.order-summary').append('<div class="order-done"><h3>Thanks!</h3><p>Your menu has been updated!</p></div>');
  });

  $('.order-toggle').on('click',function(event) {
    $('section.menu-wrapper form > div:last-of-type').toggle();
  });

  $('.delete-menu-item').on('click', function(event) {
    event.preventDefault()
    let itemName = $(this).attr('value');
    $('body').append(`<form style="display:none;" id="deleteItem" action="/delete-item" method="post">
    <input type="hidden" name="item_name" value="${itemName}"/>
    </form>`);
    $('#deleteItem').submit();
  });


})
