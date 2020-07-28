$(document).ready(function () {

  const buildListItem = function(listData) {
    let classes2 = listData.itemName.replace(/\s+/g, '-').toLowerCase();
    let listItem =
    `<li class="item-${classes2}"><span>${listData.itemName}</span> x <p class="order-item-qty">${listData.itemQty}</p><h6 class="order-item-price">${listData.itemPrice}</h6></li>`
    return listItem;
  };


  $('.item-specifics .item-qty').on('blur', function(event) {
    let itemName = $(this).attr('name');
    let itemQty = $(this).val();
    let itemPrice = Number($(this).siblings('.item-price').text());
    let classes = 'item-' + itemName.replace(/\s+/g, '-').toLowerCase();
    let listData = { itemName, itemQty, itemPrice }

    // hide item if below 1 (ideally)
    if (1 > Number($('.order-list li p').text())) {
      $('.order-list li').toggleClass('hide');
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

    $('.order-total').text(total);

  })

})
