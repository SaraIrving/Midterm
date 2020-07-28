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
  });


})








// Result {
//   command: 'INSERT',
//   rowCount: 1,
//   oid: 0,
//   rows:
//    [ anonymous {
//        id: 5,
//        user_name: 'foobar',
//        user_phone: '111',
//        total: 7,
//        status: 'pending',
//        created_at: 2020-07-28T18:36:30.804Z } ],
//   fields:
//    [ Field {
//        name: 'id',
//        tableID: 49221,
//        columnID: 1,
//        dataTypeID: 23,
//        dataTypeSize: 4,
//        dataTypeModifier: -1,
//        format: 'text' },
//      Field {
//        name: 'user_name',
//        tableID: 49221,
//        columnID: 2,
//        dataTypeID: 1043,
//        dataTypeSize: -1,
//        dataTypeModifier: 259,
//        format: 'text' },
//      Field {
//        name: 'user_phone',
//        tableID: 49221,
//        columnID: 3,
//        dataTypeID: 1043,
//        dataTypeSize: -1,
//        dataTypeModifier: 259,
//        format: 'text' },
//      Field {
//        name: 'total',
//        tableID: 49221,
//        columnID: 4,
//        dataTypeID: 23,
//        dataTypeSize: 4,
//        dataTypeModifier: -1,
//        format: 'text' },
//      Field {
//        name: 'status',
//        tableID: 49221,
//        columnID: 5,
//        dataTypeID: 1043,
//        dataTypeSize: -1,
//        dataTypeModifier: 36,
//        format: 'text' },
//      Field {
//        name: 'created_at',
//        tableID: 49221,
//        columnID: 6,
//        dataTypeID: 1114,
//        dataTypeSize: 8,
//        dataTypeModifier: -1,
//        format: 'text' } ],
//   _parsers:
//    [ [Function: parseInteger],
//      [Function: noParse],
//      [Function: noParse],
//      [Function: parseInteger],
//      [Function: noParse],
//      [Function: parseDate] ],
//   RowCtor: [Function: anonymous],
//   rowAsArray: false,
//   _getTypeParser: [Function: bound ] }


