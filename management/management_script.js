$(document).ready(function() {
    /* local Storage */
    $(window).on('load', function() {
        // attraction local storage
        if($(location).attr("href").includes("attraction")) {
            let localData = getLocalStorage("management", "attraction");
            if(localData["type"] !== undefined) $("input[type='radio'][name='type_'][value=" + localData["type"] + "]").click();
            if(localData["province"] !== undefined) $("input[type='radio'][name='province_'][value=" + localData["province"] +"]").click();
            if(localData["district"] !== undefined) $("input[type='radio'][name='district_'][value=" + localData["district"] +"]").click();
        }
        // accommodation local storage
        if($(location).attr("href").includes("accommodation")) {
            let localData = getLocalStorage("management", "accommodation");
            if(localData["type"] !== undefined) $("input[type='radio'][name='type_'][value=" + localData["type"] + "]").click();
            if(localData["province"] !== undefined) $("input[type='radio'][name='province_'][value=" + localData["province"] +"]").click();
            if(localData["district"] !== undefined) $("input[type='radio'][name='district_'][value=" + localData["district"] +"]").click();
        }
    });

    /* attraction */
    if($(location).attr("href").includes("attraction")) {
        $("#attraction-form").on("submit", function(e) {
            e.preventDefault();
        });

        $(".result-wrapper").on("submit", function(e) {
            e.preventDefault();
            showToast("미구현된 기능입니다. 구현 완료시, [여행관리-나의여행지]에 추가됩니다.", 5000);

            let formId = this.id;
            let idNum = formId.split("-").pop();
            
            $("#add-location-btn-" + idNum).prop("disabled", true);
        });

        $("#attraction-search-btn").click(function() {
            startLoad();
            let type_ = $("input[name='type_']:checked").val();
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
            * tourApi를 활용하여 선택한 타입과 지역에 맞는 검색 결과를 보여줍니다.
            */
            $.ajax({
                url: "../server.php",
                data: { target: "attraction", type: type_, province: province_, district: district_ },
                type: "GET",
                dataType: "json"
            })
            .done(function(json) {
                // 검색 결과 처리
                $("#attraction-result").empty();
                $("#attraction-result").append("<p class=\"unDeveloped\"'>* 미구현된 기능 (주요기능) *</p>",
                "<p class=\"unDeveloped\"'>tourApi를 활용하여 선택한 타입과 지역에 맞는 검색 결과를 보여줍니다.</p>",
                "<p class=\"unDeveloped\"'>이 경우, " + province_ + " value를 가진 광역시/도의 " + district_ + " 시/군/구 지역을 대상으로 하며, " + type_ + " value와 관련된 정보를 보여줍니다.</p>");
                endLoad();
            })
            .fail(function(xhr, status, errorThrown) {
                console.log("오류가 발생했습니다.\n"
                + "오류명: " + errorThrown + "\n"
                + "상태: " + status);
            })
            .always(function(xhr, status) {
                console.log("요청이 완료되었습니다!");
                console.log({ type: type_, province: province_, district: district_ });
                console.log({ return_data: xhr, status: status });
            });
        });
    }


    
    /* accommodation */
    if($(location).attr("href").includes("accommodation")) {
        $("#accommodation-form").on("submit", function(e) {
            e.preventDefault();
        });

        $(".result-wrapper").on("submit", function(e) {
            e.preventDefault();
            showToast("미구현된 기능입니다. 구현 완료시, [여행관리-나의여행지]에 추가됩니다.", 5000);

            let formId = this.id;
            let idNum = formId.split("-").pop();

            $("#add-acc-btn-" + idNum).prop("disabled", true);
        });

        $("#accommodation-search-btn").click(function() {
            startLoad();
            let type_ = $("input[name='type_']:checked").val();
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
            * tourApi를 활용하여 선택한 타입과 지역에 맞는 검색 결과를 보여줍니다.
            */
            $.ajax({
                url: "../server.php",
                data: { target: "accommodation", type: type_, province: province_, district: district_ },
                type: "GET",
                dataType: "json"
            })
            .done(function(json) {
                // 검색 결과 처리
                $("#accommodation-result").empty();
                $("#accommodation-result").append("<p class=\"unDeveloped\"'>* 미구현된 기능 (주요기능) *</p>",
                "<p class=\"unDeveloped\"'>tourApi를 활용하여 선택한 타입과 지역에 맞는 검색 결과를 보여줍니다.</p>",
                "<p class=\"unDeveloped\"'>이 경우, " + province_ + " value를 가진 광역시/도의 " + district_ + " 시/군/구 지역을 대상으로 하며, " + type_ + " value 타입의 숙소를 보여줍니다.</p>");
                endLoad();
            })
            .fail(function(xhr, status, errorThrown) {
                console.log("오류가 발생했습니다.\n"
                + "오류명: " + errorThrown + "\n"
                + "상태: " + status);
            })
            .always(function(xhr, status) {
                console.log("요청이 완료되었습니다!");
                console.log({ type: type_, province: province_, district: district_ });
                console.log({ return_data: xhr, status: status });
            });
        });
    }



    /* travel */
    if($(location).attr("href").includes("travel")) {
        $(".result-wrapper").on("submit", function(e) {
            e.preventDefault();

            if (confirm("삭제하시겠습니까? 삭제 후 취소할 수 없습니다.")) {
                showToast("미구현된 기능입니다. 구현 완료시, [여행관리-나의여행지]에서 삭제됩니다.", 5000);
                let formId = this.id;
                let idNum = formId.split("-").pop();
                
                $("#remove-result-btn-" + idNum).prop("disabled", true);
            }
        });
    }




    /* attraction & accommodation */
    if($(location).attr("href").includes("attraction") || $(location).attr("href").includes("accommodation")) {
        let tempDest = $(location).attr("href").includes("attraction") ? "attraction" : "accommodation";

        function updateLocation(dest_) {
            let province = $("input[name='province_']:checked").val();
            let district = $("input[name='district_']:checked").val();
            let resultPrefix = "검색 지역: ";
        
            if(province == null || district == null) return resultPrefix + "지역이 선택되지 않았습니다.";

            setLocalStorage("management", dest_, "province", province);
            setLocalStorage("management", dest_, "district", district);

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

        $("input:radio[name=type_]").change(function() {
            let tempContent = $("input[name='type_']:checked").val() ?? "none";
            setLocalStorage("management", tempDest, "type", tempContent);
        });
    }



    /* attraction & accommodation & travel */
    $("#location-btn").click(function() {
        $("#modal").css("opacity", "1");
        $("#modal").css("visibility", "visible");
    });

    $("#modal").click(function(event) {
        if (event.target.id === "modal") {
            $("#modal").css("opacity", "0");
            $("#modal").css("visibility", "hidden");
        }
    });
});
