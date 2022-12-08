// http://apis.data.go.kr/1320000/LosfundInfoInqireService/
// + getLosfundInfoAccToClAreaPd 분류별, 지역별, 기간별 습득물 정보 조회
//      PRDT_CL_CD_01   대분류
//      PRDT_CL_CD_02   중분류
// + getLosfundInfoAccTpNmCstdyPlace 습득물 명칭, 보관 장소별 습득물 정보 조회 
//      PRDT_NM     물품명 
//      DEP_PLACE   보관장소
//      pageNo      페이지 번호
//      numOfRows   목록 건수
// + getLosfundDetailInfo 습득물 상세정보 조회
//      ATC_ID      관리ID
//      FD_SN       습득순번
// + getLosfundInfoAccToLc 습득물 위치기반 조회

lostList("PRA000")

$(".tabtit li").on('click', function(){
    $(this).siblings().removeClass('on')
    $(this).addClass('on')
    $(".grid").remove()
    let filterValue = $(this).attr('data-filter')
    lostList(filterValue)
})

function lostList(filterValue) {
    $.ajax({
        url : "http://apis.data.go.kr/1320000/LosfundInfoInqireService"
        + "/getLosfundInfoAccToClAreaPd"
        + "?ServiceKey=6%2Fckm5CQeMVQV4YdHocP%2Bj03L1zv44oOC0BBf5Tv5uFqyagrWUG%2FHzNowESP1Te7qj5W3p2So8jA7rDWO9W%2BmA%3D%3D"
        + `&PRDT_CL_CD_01=${filterValue}`
        + "&numOfRows=50",
        
        beforeSend: function () { 

            let top = ( $(window).height() ) / 2 + $(window).scrollTop();
            let left = ( $(window).width() ) / 2 + $(window).scrollLeft();
            
            if($("#load_image").length != 0) {
                $("#load_image").css({
                    "top": top+"px",
                    "left": left+"px"
                });
                $("#load_image").show();
            }
            else {
                $('body').append('<div id="load_image" style="position:absolute; top:' + top + 'px; left:' + left + 'px; z-index:9999; filter:alpha(opacity=50); opacity:alpha*0.5; margin:auto; padding:0; "><img src="./images/loading.gif" style="width:50px; height:50px;"></div>');
            }
        },

        complete: function () {
            $("#load_image").hide();
        },

        success : function(data) {
            let list = `<div class='grid'>`;
            $(data).find('item').each(function(){
                let atcId = $(this).find('atcId').text()
                let fdPrdtNm = $(this).find('fdPrdtNm').text()
                let fdFilePathImg = $(this).find('fdFilePathImg').text()

                if(fdFilePathImg != "https://www.lost112.go.kr/lostnfs/images/sub/img02_no_img.gif"){
                    list += `<div class='item' id='${atcId}'><img src='${fdFilePathImg}' alt='${fdPrdtNm}'></div>`
                }
            });
            list += `</div>`

            $('#section').append(list);

            $(".item").css("height",$(".item").width())
            
            if($(".item").length == 0) {
                let msg = `<div>결과가 없습니다.</div>`
                $(".grid").append(msg)
            }
        }
    });   
}

$('body').on('click', '.item', function(){
    let atcId = $(this).attr('id');
    location.href = `info.html?atcId=${atcId}`
})