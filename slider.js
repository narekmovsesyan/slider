$( document ).ready(function() {
//sliders images arrays
    var smallImages = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg','10.jpg'];
    var bigImages = ['11.jpg','22.jpg','33.jpg','44.jpg','55.jpg','66.jpg','77.jpg','88.jpg','99.jpg','101.jpg'];

  var sliderImageAppend =  function sliderImage(bigImages){
//big slider

        $.each(bigImages, function( k, v ) {

            $("#bigImageDiv").append(
                '<div class="image_position swiper-slide">' +
                '<img src="image/' + v + '" alt="">' +
                '</div>'
            );
        });
//down slider
       var count = 0;

       $.each(smallImages, function( k, v ) {
           count++;

           $(".down_div").append(
                '<div class="small_image_position swiper-slide">'+
                     '<img class="plus_hover" src="image/'+v+'">'+

                     '<div class="plus_image">'+
                        '<div class="circle_icon_plus" >'+'</div>'+
                     '</div>'+
                '</div>'
            );
       });

   }

    sliderImageAppend(bigImages);

    $('.image_position').first().addClass('active');
    $('.image_position').hide();
    $('.active').show();

//big slider right icon
    $('.circle_icon2').click(function(){

        if ( $('.active').is(':last-child')) {

            $('.active').removeClass('active').fadeOut(50, function(){
                $('.image_position').first().addClass('active').fadeIn();
            });

        } else {

            $('.active').removeClass('active').fadeOut(50, function(){
                $(this).next().addClass('active').fadeIn();
            })
        }

        var slick_div2 = $('.down_div_head').find('div');

        if(slick_div2.hasClass('activediv')) {
            var  findActiveDiv = slick_div2.find('.activediv');
            find_active_div.removeClass('activediv');
            find_active_div.next().addClass('activediv');
        }
    });

//big slider left icon
    $('.circle_icon').click(function () {

        if ( $('.active').is(':first-child')) {
            $('.active').removeClass('active').fadeOut(200, function(){

                $('.image_position').last().addClass('active').fadeIn();
            });
        } else {
            $('.active').removeClass('active').fadeOut(200, function(){

                $(this).prev().addClass('active').fadeIn()
            });
        }

        var slick_div = $('.down_div_head').find('div');

        if(slick_div.hasClass('activediv')) {
            var  activediv_div = slick_div.find('.activediv');
            activediv_div.removeClass('activediv');
            activediv_div.prev().addClass('activediv');
        }
    });


// when click on button
// next and prev div tabindex fix 0
// add class activediv(for plus hoverdiv)
// compare big image = down_slider image name
    $('body').on('click', '.circle_icon_plus', function(){
        var slick_div = $(this).parents('.down_div_head').find('div');

        if(slick_div.hasClass('activediv')) {
            slick_div.removeClass('activediv');
        }
        $(this).parent().parent().addClass('activediv');

        var down_click_image = $(this).parent().prev().attr('src');

        $('#bigImageDiv .image_position img').each(function(){
            var big_img_name_substr = $(this).attr('src').substring(0, $(this).attr('src').length - 5);
            var big_img_name = big_img_name_substr +'.jpg';

            if(big_img_name == down_click_image){
                var big_image_div = $(this).parents('#bigImageDiv').find('div');
                if(big_image_div.hasClass('active')) {
                    big_image_div.removeClass('active').fadeOut(200);
                }
                $(this).parent().addClass('active').fadeIn();
            }
        });
    });

    src_path = 'undefined';
    var myswiper = new Swiper({
        el: '.swiper-container',
        initialSlide: 0,
        slidesPerView: 5,
        loop: true,
        stopPropagation: true,
        speed: 1000,
        autoplay: {
            delay: 1000
        },

        on: {
            slideChange: function (myswiper)
            {
                var slick_div = $('.down_div').find('div');

                slick_div.removeClass('activediv');

                $('.swiper-slide-next').next().next().addClass('activediv');

                var down_slider_active_image_src = $(".activediv").find('img').attr('src');

                if(typeof down_slider_active_image_src != 'undefined' && down_slider_active_image_src != src_path ){
                    src_path = down_slider_active_image_src;
                    slidersSinchron(down_slider_active_image_src);
                }
            },
            touchStart : function() {
                slideTouched();
            }
        }
    });

    function slideTouched(){
        myswiper.params.autoplay = 10000;
        myswiper.params.speed = 2500;
        myswiper.autoplay.start();
    }

    function slidersSinchron(down_slider_active_image_src){
        var  image_number = down_slider_active_image_src.substring(6, down_slider_active_image_src.length - 4);

        if(image_number > 9){
            var  image_src = down_slider_active_image_src.substring(6, down_slider_active_image_src.length - 5);
            var result =  'image/'+image_number + image_src +'.jpg';
            //console.log(result);
        } else {
            image_src = down_slider_active_image_src.substring(0, down_slider_active_image_src.length - 4);
            result = image_src + image_number +'.jpg';
            //console.log(result);
        }

        $('#bigImageDiv .image_position img').each(function(){
            var big_image_src = $(this).attr('src');
            if(big_image_src == result){
                var big_image_div = $(this).parents('#bigImageDiv').find('div');
                if(big_image_div.hasClass('active')) {
                    big_image_div.removeClass('active').fadeOut(200);
                }
                $(this).parent().addClass('active').fadeIn();
            }
        });
    }
});








