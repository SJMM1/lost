$(document).ready(function() {
    let atcId = location.href.substring(location.href.indexOf("atcId")+6);
    lostInfo(atcId)
});

function lostInfo(atcId) {
    $.ajax({
        url : "http://apis.data.go.kr/1320000/LosfundInfoInqireService"
            + "/getLosfundDetailInfo"
            + "?ServiceKey=6%2Fckm5CQeMVQV4YdHocP%2Bj03L1zv44oOC0BBf5Tv5uFqyagrWUG%2FHzNowESP1Te7qj5W3p2So8jA7rDWO9W%2BmA%3D%3D"
            + `&ATC_ID=${atcId}`
            + "&FD_SN=1",
        
        success : function(data) {
            let fdFilePathImg = $(data).find('fdFilePathImg').text()

            if(fdFilePathImg == "https://www.lost112.go.kr/lostnfs/images/sub/img04_no_img.gif"){
                fdFilePathImg = "./images/no_img.png"
            }
            let fdPrdtNm = $(data).find('fdPrdtNm').text()
            let fdYmd = $(data).find('fdYmd').text()
            let fdPlace = $(data).find('fdPlace').text()
            let prdtClNm = $(data).find('prdtClNm').text()
            let depPlace = $(data).find('depPlace').text()
            let tel = $(data).find('tel').text()
            let uniq = $(data).find('uniq').text().replace('내용','').replaceAll('다.','다.<br>')

            let info = 
            `<div class="info_img">
                <img src="${fdFilePathImg}" alt="">
            </div>
            <div class="info">
                <table>
                    <tr>
                        <th>습득물명</th>
                        <td>${fdPrdtNm}</td>
                    </tr>
                    <tr>
                        <th>습득일</th>
                        <td>${fdYmd}</td>
                    </tr>
                    <tr>
                        <th>습득장소</th>
                        <td>${fdPlace}</td>
                    </tr>
                    <tr>
                        <th>물품분류</th>
                        <td>${prdtClNm}</td>
                    </tr>
                    <tr>
                        <th>보관장소</th>
                        <td>${depPlace}</td>
                    </tr>
                    <tr>
                        <th>연락처</th>
                        <td><a href='tel:${tel}'>${tel}</a></td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td>${uniq}</td>
                    </tr>
                </table>
                <div>
                    <a href='javascript:history.back();'>목록</a>
                </div>
            </div>
            
            `

            $('#section').append(info);
        }
    });
}