$(document).ready(function () {
  // loop over all items and place all items in an array

let arr = [];

  $('.item-specifics .item-qty').on('blur', function(event) {
    let itemName = $(this).attr('name');
    let itemQty = $(this).val();
    let classes = 'item-' + itemName.replace(/\s+/g, '-').toLowerCase();

    // console.log('itemName = ', itemName);
    // console.log('itemQty = ', itemQty);
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
      let classes2 = listData.itemName.replace(/\s+/g, '-').toLowerCase();
      let listItem =
      `<li class="item-${classes2}"><span>${listData.itemName}</span> x <p>${listData.itemQty}</p></li>`
      arr.push(`item-${classes2}`);

      return listItem;
    };



    // if($('.order-list').children().length === 0) {
    //   console.log("fired")
    //   $('.order-list').append(buildListItem(listData));
    //   } else if($('.item-chicken-drums')) {
    //     $('.item-chicken-drums p').text(itemQty)
    //   } else {
    //     console.log("not fired")
    //   }

    // console.log(arr, "Array")

    if($('.order-list').children().length === 0) {
      $('.order-list').append(buildListItem(listData));
    } else if($('.order-list li').hasClass(classes)) {
      return $(`.${classes}`).find('p').text(itemQty);
    } else {
      return $('.order-list').append(buildListItem(listData));
    }




    // if($('.order-list').children().length === 0) {
    //   $('.order-list').append(buildListItem(listData));
    //   console.log("Zero Checker")
    // }  else {
    //   $('.order-list li').each(function(i) {
    //     console.log('$(this).find(\'span\').text() = ' + $(this).find('span').text())

    //     console.log("this = ", this)
    //     if ($(this).find('span').text() === itemName && $(this).find('p').text() !== itemQty) {
    //       return $(this).find('p').text(itemQty);
    //       console.log("checking for name")
    //     } else {
    //       return $('.order-list').append(buildListItem(listData));
    //       console.log("added name")
    //     }
    //   })
    // }




    // let orderLi = $('.order-list').find('span');




  })








})
