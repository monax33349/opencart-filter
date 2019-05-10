$(document).ready(function(){
    if (jQuery(window).width() < 992) {   
        jQuery('.label-wrap').click(function(){      
            jQuery(this).next('.filter-attribute-container .list-group-item').toggle(300);
        });    
    }
    var urlParsNow = location.pathname.split('/').filter(function(item, i, mas){if(i==mas.length-1) return true;});
    var urlCategoryStorage = localStorage.getItem('category');
    if (urlParsNow !== urlCategoryStorage) {
        localStorage.removeItem('filter');
        localStorage.removeItem('category');
        localStorage.removeItem('price-from');
        localStorage.removeItem('price-to');
    }
}); 


function urlFilter() {
    var urlPars = location.pathname.split('/').filter(function(item, i, mas){if(i==mas.length-1) return true;});
    localStorage.setItem('category', urlPars);
}   

var filter_url = '';
if(localStorage.getItem('filter') !== null) {
    var arrStr = localStorage.getItem('filter');
    var ids = arrStr.split(',');	
}
else {
    var ids = [];	
}

var max_price = parseFloat('135184');
var current_max_price = parseFloat($('#price-to').val());
var min_price = parseFloat('7344');
var current_min_price = parseFloat($('#price-from').val());


// $('#slider-price').slider({
//     range   : true,
//     min     : min_price,
//     max     : max_price,
//     values  : [ current_min_price, current_max_price ],
//     slide   : function (event, ui) {
//         $('#price-from').val(ui.values[0]);
//         $('#price-to').val(ui.values[1]);
//         current_min_price = ui.values[0];
//         current_max_price = ui.values[1];
//         localStorage.setItem('price-from', current_min_price);
//         localStorage.setItem('price-to', current_max_price);		
//     },
//     stop    : function (event, ui) {
//         filter_url = $('.price-url').val();
//         filter_url += '&price=' + current_min_price + ',' + current_max_price;
//         ocfilter.filter(filter_url);
//     }
// });

$(document).ajaxComplete(function () {
    var current_min_price = parseFloat($('#price-from').val());
    var current_max_price = parseFloat($('#price-to').val());

    $('#slider-price').slider({
        range   : true,
        min     : min_price,
        max     : max_price,
        values  : [ current_min_price, current_max_price ],
        slide   : function (event, ui) {
            $('#price-from').val(ui.values[0]);
            $('#price-to').val(ui.values[1]);
            current_min_price = ui.values[0];
            current_max_price = ui.values[1];
        localStorage.setItem('price-from', current_min_price);
        localStorage.setItem('price-to', current_max_price);
        },
        stop    : function (event, ui) {
            filter_url = $('.price-url').val();
            filter_url += '&price=' + current_min_price + ',' + current_max_price;
            ocfilter.filter(filter_url);
        }
    });

});

$(document).on('click', '.a-filter', function() { 
    var id = $(this).attr('name');
    var filter_ids = '';
    var filterIds = localStorage.getItem('filter','');
    filter_url = $('.filter-url').val();

    if($(this).hasClass('add-filter') == true) {
        ids.push(id);
        localStorage.setItem('filter', ids);
        urlFilter();
        
    } else if($(this).hasClass('remove-filter') == true) {
        ids = $.grep(ids, function (value) {
            return value != id;
        });
    }
    localStorage.setItem('filter', ids);
    filter_ids = ids.join(',');
    filter_url += '&filter=' + filter_ids;
    ocfilter.filter(filter_url);
    urlFilter();
});

$(document).on('click', '.clear-filter', function() {
    ids = [];
    localStorage.removeItem('filter');
    localStorage.removeItem('price-from');
    localStorage.removeItem('price-to');
 });