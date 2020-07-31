$(document).ready(function () {


  $('.item-specifics .edit-menu-item').on('click', function(event) {
    event.preventDefault();
    let itemName = $(this).attr('name');
    $('.order-list').append(`<li><input type="hidden" name="menu_item" val="${itemName}"></input>${itemName}</li>`)
  });

  $('.new-item-button').on('click', function(event) {
    event.preventDefault();
    let newItemName = $(this).attr('name');
    $('.order-list').append(`<li><input type="hidden" name="new_menu_item" val="newItem"></input>New Item</li>`)
  });

  $('.submit-order').on('mouseup',function(event){
    $('.order-summary').append('<div class="order-done"><h3>Thanks!</h3><p>Your menu has been updated!</p></div>');
  });

  $('.order-toggle').on('click',function(event) {
    $('section.menu-wrapper form > div:last-of-type').toggle();
  });


})
