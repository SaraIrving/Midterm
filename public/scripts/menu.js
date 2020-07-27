$(document).ready(function () {

  $('.item-specifics .item-qty').on('blur', function(event) {
    let itemName = $(this).attr('name');
    let itemQty = $(this).val();

    console.log('itemName = ', itemName);
    console.log('itemQty = ', itemQty);
    // $('.order-list').append('<li></li>');
    // $('.order-list li').text(`${itemName} x ${itemQty}`);
    let listData = {
      itemName,
      itemQty
    }

    //put itemName and itemQty in an object? --> listData
    //function that builds the list item
    //then append to list element

    const buildListItem = function(listData) {
      let listItem =
      `<li><span>${listData.itemName}</span> x ${listData.itemQty}</li>`

      return listItem;
    };
    $('.order-list').append(buildListItem(listData));
    let orderLi = $('.order-list').find('span');
    let spanMap = $('.order-list span').toArray();
    for (let item of spanMap) {
      console.log('item.text() = ', item.text());
      if (item.text() === (`<span>${itemName}</span>`)) {
        console.log('hello?')
        if ($('order-list span').text() === itemName) {

          $('.order-list').append(buildListItem(listData));
        }
      }
    }



  })








})
