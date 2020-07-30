$(document).ready(function () {

  const buildListItem = function(listData) {
    let classes2 = listData.itemName.replace(/\s+/g, '-').toLowerCase();
    let listItem =
    `<li class="item-${classes2}"><span>${listData.itemName}</span> x <p class="order-item-qty">${listData.itemQty}</p><h6 class="order-item-price">${listData.itemPrice}</h6><a href="" class="remove-btn"><img src="/photos/trash.png" width="15" alt="garbage icon"></a></li>`
    return listItem;
  };


  $('.item-specifics .item-qty').on('blur', function(event) {
    let itemName = $(this).attr('name');
    let itemQty = $(this).val();
    let itemPrice = $(this).siblings('.item-price').text(); // used to be wrapped in Number()
    let classes = 'item-' + itemName.replace(/\s+/g, '-').toLowerCase();
    let listData = { itemName, itemQty, itemPrice }

    // hide item if below 1 (ideally)
    if (0 > Number($('.order-list li p').text())) {
      $('.order-list li').addClass('hide');
    } else {
      $('.order-list li').removeClass('hide');
    }

    if($('.order-list').children().length === 0) {
      $('.order-list').append(buildListItem(listData));

    } else if($('.order-list li').hasClass(classes)) {
      //conditional statement to add or delete to total
      $(`.${classes}`).find('p').text(itemQty);
    } else {
      $('.order-list').append(buildListItem(listData));
    }

    let total = 0;
    $('.item-wrapper').each(function(){

      total += $(this).find('.item-price').text() * $(this).find('.item-qty').val();
    })

    $('.order-total').text(parseFloat(total));

  })

  $('.order-list').on('click','.remove-btn', function(event) {
    event.preventDefault();
    let lineTotal = ($(this).siblings('.order-item-price').text() * $(this).siblings('.order-item-qty').text()).toFixed(2);
    let currentTotal = Number($('.order-total').text()).toFixed(2);
    let orderItemName = $(this).siblings('span').text()
    console.log("current = ", currentTotal);
    console.log('line = ', lineTotal);
    console.log("current - line", (currentTotal - lineTotal).toFixed(2));

    $('.order-total').text((currentTotal - lineTotal).toFixed(2));

    $('.item-wrapper').each(function(){
      if (orderItemName == $(this).find('.item-name').text()) {
        $(this).find('.item-qty').val('0');
      }
    });

    $(this).parent('li').remove();


  })

  $('.submit-order').on('mousedown',function(event){
    $('input.order-total').val($('.order-total-span').text());
    $('body').prepend('<div id="order-pending-banner">Please stay on the page while your order is being confirmed.. <img src="/photos/load.gif" class="loading-gif" alt="loading animation"/></div>');
  });

  $('.submit-order').on('mouseup',function(event){
    $('.order-summary').append('<div class="order-done"><h3>Thanks!</h3><p>Your order has been placed.</p></div>');
  });

  $('.order-toggle').on('click',function(event) {
    // $('section.menu-wrapper form > div:last-of-type').css('display','none');
    $('section.menu-wrapper form > div:last-of-type').toggle();
  });


})
