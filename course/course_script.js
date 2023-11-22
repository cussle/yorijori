$(document).ready(function() {
    /* local Storage */
    $(window).on('load', function() {
        // attraction local storage
        if($(location).attr("href").includes("recommendation")) {
            let localData = getLocalStorage("course", "recommendation");
            if(localData["province"] !== undefined) $("input[type='radio'][name='province_'][value=" + localData["province"] +"]").click();
            if(localData["district"] !== undefined) $("input[type='radio'][name='district_'][value=" + localData["district"] +"]").click();
        }
    });

    /* optimum */
    if($(location).attr("href").includes("optimum")) {
        function getOptimum() {
            startLoad();
            /*
            * 미구현된 기능 (주요기능)
            * 카카오모빌리티 Api를 활용하여 최적 동선을 계산합니다..
            */
            $.ajax({
                url: "../server.php",
                data: { },
                type: "POST",
                dataType: "json"
            })
            .done(function(json) {
                alert("미구현된 기능입니다.");
                showToast("미구현된 기능입니다. 구현 완료시, 지도에 경로가 추가됩니다.", 5000);
                endLoad();
            })
            .fail(function(xhr, status, errorThrown) {
                console.log("오류가 발생했습니다.\n"
                + "오류명: " + errorThrown + "\n"
                + "상태: " + status);
            })
            .always(function(xhr, status) {
                console.log("요청이 완료되었습니다!");
                console.log({ return_data: xhr, status: status });
            });
        }

        $("#cacultate-button").click(getOptimum);
        
        $(".result-wrapper").on("submit", function(e) {
            e.preventDefault();
            showToast("미구현된 기능입니다. 구현 완료시, div.location-wrapper에 추가됩니다.", 5000);

            let formId = this.id;
            let idNum = formId.split("-").pop();
            
            $("#add-location-btn-" + idNum).prop("disabled", true);
        });
        
        $("#add-location-btn").click(function() {
            $("#modal").css("opacity", "1");
            $("#modal").css("visibility", "visible");
        }); 

        $("#modal").click(function(event) {
            if (event.target.id === "modal") {
                $("#modal").css("opacity", "0");
                $("#modal").css("visibility", "hidden");
            }
        });
        
        $("#search-location-btn").click(function() {
            $("#modal-2").css("opacity", "1");
            $("#modal-2").css("visibility", "visible");
        }); 

        $("#modal-2").click(function(event) {
            if (event.target.id === "modal-2") {
                $("#modal-2").css("opacity", "0");
                $("#modal-2").css("visibility", "hidden");
            }
        });

        $("#search-btn").click(function(e) {
            e.preventDefault();
            startLoad();
            let value = $("#search-input").val().replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]/g, "");

            if(value == null || value == "") {
                alert("키워드는 필수 입력 항목입니다.");
                $("#search-input").focus();
                endLoad();
                return;
            }
            $("#search-input").val("");
            /*
            * 미구현된 기능 (주요기능)
            * tourApi를 활용하여 입력한 키워드에 맞는 검색 결과를 보여줍니다.
            */
            $.ajax({
                url: "../server.php",
                data: { target: "optimum", value: value },
                type: "POST",
                dataType: "json"
            })
            .done(function(json) {
                // 검색 결과 처리
                $("#search-result").empty();
                $("#search-result").append("<p class=\"unDeveloped\"'>* 미구현된 기능 (주요기능) *</p>",
                "<p class=\"unDeveloped\"'>tourApi를 활용하여 입력한 키워드에 맞는 검색 결과를 보여줍니다.</p>",
                "<p class=\"unDeveloped\"'>이 경우, '" + value + "' 키워드와 관련된 정보를 보여줍니다.</p>");
                endLoad();
            })
            .fail(function(xhr, status, errorThrown) {
                console.log("오류가 발생했습니다.\n"
                + "오류명: " + errorThrown + "\n"
                + "상태: " + status);
            })
            .always(function(xhr, status) {
                console.log("요청이 완료되었습니다!");
                console.log({ value: value });
                console.log({ return_data: xhr, status: status });
            });
        });

        $(".search-result-wrapper").on("submit", function(e) {
            e.preventDefault();
            showToast("미구현된 기능입니다. 구현 완료시, div.location-wrapper에 추가됩니다.", 5000);

            let formId = this.id;
            let idNum = formId.split("-").pop();
            
            $("#add-searched-location-btn-" + idNum).prop("disabled", true);
        });
    }


    
    /* recommendation */
    if($(location).attr("href").includes("recommendation")) {
        let tempDest = "recommendation";

        function updateLocation(dest_) {
            let province = $("input[name='province_']:checked").val();
            let district = $("input[name='district_']:checked").val();
            let resultPrefix = "검색 지역: ";
        
            if(province == null || district == null) return resultPrefix + "지역이 선택되지 않았습니다.";

            setLocalStorage("course", dest_, "province", province);
            setLocalStorage("course", dest_, "district", district);

            return resultPrefix + province + " > " + district;
        }

        $(".province-wrapper .radio-button > input").change(function() {
            $(".province-wrapper .radio-button").removeClass("radio-button-checked");
        
            if ($(this).is(":checked")) {
                $(this).parent(".radio-button").addClass("radio-button-checked");
                $("#location-btn > button").text(updateLocation(tempDest));
            }
        });

        $(".district-wrapper .radio-button > input").change(function() {
            $(".district-wrapper .radio-button").removeClass("radio-button-checked");
        
            if ($(this).is(":checked")) {
                $(this).parent(".radio-button").addClass("radio-button-checked");
                $("#location-btn > button").text(updateLocation(tempDest));
            }
        });

        $("#ai-calculate-btn").click(function(e) {
            startLoad();
            let province_ = $("input[name='province_']:checked").val();
            let district_ = $("input[name='district_']:checked").val();

            if(province_ == null || district_ == null) {
                alert("지역은 필수 입력 항목입니다.");
                $("#location-btn").click();
                endLoad();
                return;
            }

            /*
            * 미구현된 기능 (주요기능)
            * Chat GPT Api를 활용하여 추천 동선을 출력합니다.
            */
            $.ajax({
                url: "../server.php",
                data: { target: "recommendation", province: province_, district: district_ },
                type: "POST",
                dataType: "json"
            })
            .done(function(json) {
                alert("미구현된 기능입니다.");
                showToast("미구현된 기능입니다. 구현 완료시, 지도엔 경로가, 좌측엔 위치 정보가 추가됩니다.", 5000);
                endLoad();
            })
            .fail(function(xhr, status, errorThrown) {
                console.log("오류가 발생했습니다.\n"
                + "오류명: " + errorThrown + "\n"
                + "상태: " + status);
            })
            .always(function(xhr, status) {
                console.log("요청이 완료되었습니다!");
                console.log({ province: province_, district: district_ });
                console.log({ return_data: xhr, status: status });
            });
        })

        $("#set-location-btn").click(function() {
            $("#modal").css("opacity", "1");
            $("#modal").css("visibility", "visible");
        }); 

        $("#modal").click(function(event) {
            if (event.target.id === "modal") {
                $("#modal").css("opacity", "0");
                $("#modal").css("visibility", "hidden");
            }
        });
    }


    
    /* cursor */
    if($(location).attr("href").includes("course")) {
        $(".result-wrapper").on("submit", function(e) {
            e.preventDefault();
        });
        $("[id^='edit-course-btn-']").click(function() {
            showToast("미구현된 기능입니다. 구현 완료시, [여행코스-최적동선]으로 이동되어 동선을 수정할 수 있습니다.", 5000);
        });
        $("[id^='remove-course-btn-']").click(function() {
            showToast("미구현된 기능입니다. 구현 완료시, 추가된 동선을 삭제할 수 있습니다.", 5000);
        });
    }
});
