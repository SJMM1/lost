$(document).ready(function() {
    searchList(1)
});
let num = 1;
function searchList(num){
    $('.searchList').remove();
    $('.more').remove();

    var param = $("form").serialize()
    
    $.ajax({
        url : "http://apis.data.go.kr/1320000/LosfundInfoInqireService"
            + "/getLosfundInfoAccToClAreaPd"
            + "?ServiceKey=6%2Fckm5CQeMVQV4YdHocP%2Bj03L1zv44oOC0BBf5Tv5uFqyagrWUG%2FHzNowESP1Te7qj5W3p2So8jA7rDWO9W%2BmA%3D%3D"
            + `&pageNo=${num}`,

        data: param,
        
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
            let list = `<div class="searchList">`;
            $(data).find('item').each(function(){
                let atcId = $(this).find('atcId').text()
                let fdSbjt = $(this).find('fdSbjt').text()
                let fdYmd = $(this).find('fdYmd').text()

                list += `<div class='searchitem' id='${atcId}'>
                    <div class='title'>${fdSbjt}</div>
                    <div class='date'>${fdYmd}</div>
                </div>`
            });
            list += `</div>
            <div class='more'>
                <button class='prev'>이전</button>
                <button class='next'>다음</button>
            </div>`

            $('#section').append(list);

            if($(".searchitem").length == 0) {
                if($("#startymd").val() > $("#endymd").val()){
                    alert("시작일이 종료일보다 클 수 없습니다!")
                }
                else {
                    let msg = `<div>결과가 없습니다.</div>`
                    $(".searchList").append(msg)
                }
            }
            
            if(num > 1){                        
                $('.prev').attr("disabled", false)        
            } else {
                $('.prev').attr("disabled", true) 
            }
            if($(".searchitem").length == 10) {
                $('.next').attr("disabled", false)
            } else {
                $('.next').attr("disabled", true)
            }
        }
    });
}

$('body').on('click', '.searchitem', function(){
    let atcId = $(this).attr('id');
    location.href = `info.html?atcId=${atcId}`
})

$('body').on('click', '.next', function(){
    num += 1
    searchList(num)
})

$('body').on('click', '.prev', function(){
    num -= 1
    searchList(num)
})

// 분류 선택
$('#prdt1').on('change', function(){
    $('#prdt2').empty().append(`<option value="">선택</option>`);
    
    if($('#prdt1 option:selected').val() == "PRA000") {
        let prdt = `<option value="PRA100">여성용가방</option>
        <option value="PRA200">남성용가방</option>
        <option value="PRA300">기타가방</option>`
        $('#prdt2').append(prdt);
    }
    if($('#prdt1 option:selected').val() == "PRB000") {
        let prdt = `<option value="PRB100">학습서적</option>
        <option value="PRB200">소설</option>
        <option value="PRB300">컴퓨터서적</option>
        <option value="PRB400">만화책</option>
        <option value="PRB500">기타서적</option>`
        $('#prdt2').append(prdt);
    }
    if($('#prdt1 option:selected').val() == "PRC000") {
        let prdt = `<option value="PRC100">서류</option>
        <option value="PRC200">기타물품</option>`
        $('#prdt2').append(prdt);
    }
    if($('#prdt1 option:selected').val() == "PRD000") {
        let prdt = `<option value="PRD100">기타물품</option>`
        $('#prdt2').append(prdt);
    }
    if($('#prdt1 option:selected').val() == "PRE000") {
        let prdt = `<option value="PRE100">스포츠용품</option>`
        $('#prdt2').append(prdt);
    }
    if($('#prdt1 option:selected').val() == "PRF000") {
        let prdt = `<option value="PRF100">자동차열쇠</option>
        <option value="PRF200">네비게이션</option>
        <option value="PRF300">자동차번호판</option>
        <option value="PRF400">임시번호판</option>
        <option value="PRF500">기타용품</option>`
        $('#prdt2').append(prdt);
    }
    if($('#prdt1 option:selected').val() == "PRG000") {
        let prdt = `<option value="PRG100">태블릿</option>
        <option value="PRG200">스마트워치</option>
        <option value="PRG300">무선이어폰</option>
        <option value="PRG400">카메라</option>
        <option value="PRG500">기타용품</option>`
        $('#prdt2').append(prdt);
    }
    if($('#prdt1 option:selected').val() == "PRH000") {
        let prdt = `<option value="PRH100">여성용지갑</option>
        <option value="PRH200">남성용지갑</option>
        <option value="PRH300">기타지갑</option>`
        $('#prdt2').append(prdt);
    }
    if($('#prdt1 option:selected').val() == "PRI000") {
        let prdt = `<option value="PRI100">삼성노트북</option>
        <option value="PRI200">LG노트북</option>
        <option value="PRI300">애플노트북</option>
        <option value="PRI400">기타</option>`
        $('#prdt2').append(prdt);
    }
})

$("#startymd").datepicker({
    changeMonth:true,      // 월 선택
    changeYear:true,       // 연도 선택
    yearRange:'1900:2022',  // 연도 범위
    showAnim:'slideDown',
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat:'yymmdd',
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNamesMin : ['일', '월', '화', '수', '목', '금', '토'],
    yearSuffix:' 년',
    showMonthAfterYear: true,
    maxDate: "0D"
});
$("#endymd").datepicker({
    changeMonth:true,      // 월 선택
    changeYear:true,       // 연도 선택
    yearRange:'1900:2022',  // 연도 범위
    showAnim:'slideDown',
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat:'yymmdd',
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNamesMin : ['일', '월', '화', '수', '목', '금', '토'],
    yearSuffix:' 년',
    showMonthAfterYear: true,
    maxDate: "0D"
});

