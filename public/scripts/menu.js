$(document).ready(function () {
  // Helper function to build order list items
  const buildListItem = function(listData) {
    let classes2 = listData.itemName.replace(/\s+/g, '-').toLowerCase();
    let listItem =
    `<li class="item-${classes2}"><span>${listData.itemName}</span> x <p class="order-item-qty">${listData.itemQty}</p><h6 class="order-item-price">${listData.itemPrice}</h6><a href="" class="remove-btn"><img src="/photos/trash.png" width="15" alt="garbage icon"></a></li>`
    return listItem;
  };
  // Handle on qty inputs which will update order with new / updated items when blurring input
  $('.item-specifics .item-qty').on('blur', function(e) {
    // Assign variables to item information
    let itemName = $(this).attr('name');
    let itemQty = $(this).val();
    let itemPrice = $(this).siblings('.item-price').text();
    let classes = 'item-' + itemName.replace(/\s+/g, '-').toLowerCase();
    let listData = { itemName, itemQty, itemPrice } // Passed into buildListItem function to inject information

    // Hide item if qty is below 1
    if (0 > Number($('.order-list li p').text())) {
      $('.order-list li').addClass('hide');
    } else {
      $('.order-list li').removeClass('hide');
    }
    // Checks if menu item is already in the order list, if it isn't it adds it, otherwise it will update the qty
    if($('.order-list').children().length === 0) {
       // There are no items in the list, so add the item
      $('.order-list').append(buildListItem(listData));
    } else if($('.order-list li').hasClass(classes)) {
      // Item is in the list already, so update it's quantity
      $(`.${classes}`).find('p').text(itemQty);
    } else {
      // This item isn't in list(but other items are in the list), so add it
      $('.order-list').append(buildListItem(listData));
    }
    // Define total as 0 base
    let total = 0;
    // Loop through items to find the qty and price of each item, to calculate total for each line item
    $('.item-wrapper').each(function(){
      // Sum each line item to get final total
      total += $(this).find('.item-price').text() * $(this).find('.item-qty').val();
    })
    // Display the updated total
    $('.order-total').text(parseFloat(total));
  })
  // When user clicks garbage icon, remove the item from the order list
  $('.order-list').on('click','.remove-btn', function(e) {
    e.preventDefault();
    let lineTotal = ($(this).siblings('.order-item-price').text() * $(this).siblings('.order-item-qty').text()).toFixed(2);
    let currentTotal = Number($('.order-total').text()).toFixed(2);
    let orderItemName = $(this).siblings('span').text()
    // Update total to reflect deleted order item
    $('.order-total').text((currentTotal - lineTotal).toFixed(2));
    // Once item is deleted, we reset the menu item input value to 0
    $('.item-wrapper').each(function(){
      if (orderItemName == $(this).find('.item-name').text()) {
        $(this).find('.item-qty').val('0');
      }
    });
    // Remove the line item from order list
    $(this).parent('li').remove();
  })
  // When user clicks Place Order register total and display pending banner
  $('.submit-order').on('mousedown',function(e){
    // Assign total to input value to send through form
    $('input.order-total').val($('.order-total-span').text());
     // Display pending banner
    $('body').prepend('<div id="order-pending-banner">Please stay on the page while your order is being confirmed.. <img src="/photos/load.gif" class="loading-gif" alt="loading animation"/></div>');
  });
  // After user clicks Place Order, change order form to thank you message
  $('.submit-order').on('mouseup',function(e){
    $('.order-summary').append('<div class="order-done"><h3>Thanks!</h3><p>Your order has been placed.</p></div>');
  });
  // On mobile, our toggle button toggles the form info for optimal user experience
  $('.order-toggle').on('click',function(e) {
    $('section.menu-wrapper form > div:last-of-type').toggle();
  });
})
