$(function () {
    /* 轮播图 swiper.jquery.js */
    var mySwiper = new Swiper('#banner-swiper', {
        direction: 'horizontal',
        autoplay: 2000,
        loop: true,
        // 如果需要分页器
        pagination: '.swiper-pagination',
        paginationClickable: true,
        autoplayDisableOnInteraction: false,
        lazyLoading: true,
        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
    })


    var phone = "",
        code = "",
        reg = /^1\d{10}$/,
        data = null,
        canGetCode = true,
        timer = null;
    function getCode() {
        canGetCode = false;
        var s = 60;
        $(".home-get-code").text(s).addClass("active");
        timer = setInterval(function () {
            $(".home-get-code").text(--s)
            s == 0 ? $(".home-get-code").text("再次发送").removeClass("active") && (canGetCode = true) && clearInterval(timer) : "";
        }, 1000)
    }
    function helpSubmit() {

    }
    function handleAjaxPostRequest(url, data, callback) {
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            success: callback
        })
    }
    $("input").on("focus", function () {
        $(this).addClass("focus").removeClass("err");
    })
    $("input").on("blur", function () {
        $(this).removeClass("focus");
    })
    $(".home-get-code").on("click", function () {
        if (canGetCode) {
            phone = $("#phone").val();
            if (phone == "") {
                $("#phone").addClass("err");
                $(".error-message").text("请输入手机号")
                $(".home-error-reminder").show();
            } else if (!reg.test(phone)) {
                $("#phone").addClass("err");
                $(".error-message").text("请输入正确的手机号")
                $(".home-error-reminder").show();
            } else {
                $(".home-error-reminder").hide();
                data = {
                    phone: phone
                }
                // handleAjaxPostRequest(url, data, getCode);
                getCode()
            }
        }
    })
    $(".home-help-btn").on("click", function () {
        var flag = true;
        phone = $("#phone").val();
        code = $("#code").val();

        if (reg.test(phone)) {
            $(".home-error-reminder").hide();
        } else if (phone == "") {
            flag = false;
            $("#phone").addClass("err");
            $(".error-message").text("请输入手机号")
            $(".home-error-reminder").show();
        } else {
            flag = false;
            $("#phone").addClass("err");
            $(".error-message").text("请输入正确的手机号")
            $(".home-error-reminder").show();
        }

        if (code == "" && flag) {
            flag = false;
            $("#code").addClass("err");
            $(".error-message").text("请输入验证码")
            $(".home-error-reminder").show();
        } else if (code == "" && !flag) {
            $("#code").addClass("err");
        }
        if (flag) {
            // handleAjaxPostRequest()
        }
    })
})