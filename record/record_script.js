$(document).ready(function() {
    /* board */
    if($(location).attr("href").includes("board")) {
        /* Summernote */
        $('#summernote').summernote({
            height: "500",
            minHeight: null,
            maxHeight: null,
            focus: true,
            lang: "ko-KR",
            placeholder: '내용을 입력하세요.',
            toolbar: [
                ['style', ['style']], // 글자 스타일 설정 옵션
                ['fontsize', ['fontsize']], // 글꼴 크기 설정 옵션
                ['font', ['bold', 'underline', 'clear']], // 글자 굵게, 밑줄, 포맷 제거 옵션
                ['color', ['color']], // 글자 색상 설정 옵션
                ['table', ['table']], // 테이블 삽입 옵션
                ['para', ['ul', 'ol', 'paragraph']], // 문단 스타일, 순서 없는 목록, 순서 있는 목록 옵션
                ['height', ['height']], // 에디터 높이 조절 옵션
                ['insert', ['picture', 'link', 'video']], // 이미지 삽입, 링크 삽입, 동영상 삽입 옵션
                ['view', ['codeview']], // 코드 보기, 전체 화면, 도움말 옵션
            ],
            fontSizes: [
                '8', '9', '10', '11', '12', '14', '16', '18',
                '20', '22', '24', '28', '30', '36', '50', '72',
            ], // 글꼴 크기 옵션

        });

        /**
         * @param {Boolean} previewDiv preview 표시 여부
         * @param {Boolean} writeDiv write 표시 여부
         * @param {Boolean} articleDiv alticle 표시 여부
         */
        function setLayout(previewDiv, writeDiv, articleDiv) {
            if(previewDiv) {
                $("#article-preview").show();
                $("#preview-button-wrapper").show();
                $("#article-write").hide();
                $("#write-button-wrapper").hide();
                $("#article-detail").hide();
                $("#article-button-wrapper").hide();
            } else if(writeDiv) {
                $("#article-preview").hide();
                $("#preview-button-wrapper").hide();
                $("#article-write").show();
                $("#write-button-wrapper").show();
                $("#article-detail").hide();
                $("#article-button-wrapper").hide();
            } else if(articleDiv) {
                $("#article-preview").hide();
                $("#preview-button-wrapper").hide();
                $("#article-write").hide();
                $("#write-button-wrapper").hide();
                $("#article-detail").show();
                $("#article-button-wrapper").show();
            } else {
                console.log("비정상 요청");
            }
        }
        /* 초기 화면 설정 */
        setLayout(true, false, false);

        /* 게시판 이동 */
        $("#to-preview-btn").click(function() {
            setLayout(true, false, false);
        });
        $("#to-preview-btn-2").click(function() {
            setLayout(true, false, false);
        });

        /* 새 글 작성 */
        $("#write-article-btn").click(function() {
            setLayout(false, true, false);
        });

        /* 글 자세히 보기 */
        $(".article-wrapper").click(function() {
            setLayout(false, false, true);
        });



        /* 코스 추가 */
        $(".course-wrapper").on("submit", function(e) {
            e.preventDefault();
            showToast("미구현된 기능입니다. 구현 완료시, 글 상단에 추가됩니다.", 5000);

            $("[id^='add-course-btn-']").prop('disabled', true);
        });

        $("#add-course-to-article-btn").click(function() {
            $("#modal").css("opacity", "1");
            $("#modal").css("visibility", "visible");
        }); 

        $("#modal").click(function(event) {
            if (event.target.id === "modal") {
                $("#modal").css("opacity", "0");
                $("#modal").css("visibility", "hidden");
            }
        });



        /* 새 글 작성 */
        $("#write-modal-button").click(function() {
            startLoad();
            let name_ = $("#writer-name").val()
            let password_ = $("#writer-password").val()
            let passwordCheck_ = $("#writer-password-check").val()

            if(name_ == "" || password_ == "" || passwordCheck_ == "") {
                alert("모든 항목은 필수 입력 항목입니다.");
                endLoad();
                return;
            }

            if(password_ !== passwordCheck_) {
                alert("비밀번호 입력을 확인해주세요.");
                endLoad();
                return;
            }

            /*
            * 미구현된 기능 (주요기능)
            * 서버와 통신하여 새로운 글을 등록합니다.
            */
            $.ajax({
                url: "../server.php",
                data: { target: "board", name: name_, password: password_ },
                type: "POST",
                dataType: "json"
            })
            .done(function(json) {
                alert("미구현된 기능입니다.");
                showToast("미구현된 기능입니다. 구현 완료시, 새로운 글이 등록됩니다.", 5000);
                endLoad();
            })
            .fail(function(xhr, status, errorThrown) {
                console.log("오류가 발생했습니다.\n"
                + "오류명: " + errorThrown + "\n"
                + "상태: " + status);
            })
            .always(function(xhr, status) {
                console.log("요청이 완료되었습니다!");
                console.log({ name: name_, password: password_ });
                console.log({ return_data: xhr, status: status });
            });
        });

        $("#save-article-btn").click(function() {
            $("#modal-2").css("opacity", "1");
            $("#modal-2").css("visibility", "visible");
        }); 

        $("#modal-2").click(function(event) {
            if (event.target.id === "modal-2") {
                $("#modal-2").css("opacity", "0");
                $("#modal-2").css("visibility", "hidden");
            }
        });



        /* 글 삭제 */
        $("#remove-modal-button").click(function() {
            startLoad();
            let name_ = $("#remover-name").val()
            let password_ = $("#remover-password").val()

            if(name_ == "" || password_ == "") {
                alert("모든 항목은 필수 입력 항목입니다.");
                endLoad();
                return;
            }

            /*
            * 미구현된 기능 (주요기능)
            * 서버와 통신하여 새로운 글을 등록합니다.
            */
            $.ajax({
                url: "../server.php",
                data: { target: "board", name: name_, password: password_ },
                type: "POST",
                dataType: "json"
            })
            .done(function(json) {
                alert("미구현된 기능입니다.");
                showToast("미구현된 기능입니다. 구현 완료시, 패스워드 비교 후 글이 삭제됩니다.", 5000);
                endLoad();
            })
            .fail(function(xhr, status, errorThrown) {
                console.log("오류가 발생했습니다.\n"
                + "오류명: " + errorThrown + "\n"
                + "상태: " + status);
            })
            .always(function(xhr, status) {
                console.log("요청이 완료되었습니다!");
                console.log({ name: name_, password: password_ });
                console.log({ return_data: xhr, status: status });
            });
        });

        $("#remove-article-btn").click(function() {
            $("#modal-3").css("opacity", "1");
            $("#modal-3").css("visibility", "visible");
        }); 

        $("#modal-3").click(function(event) {
            if (event.target.id === "modal-3") {
                $("#modal-3").css("opacity", "0");
                $("#modal-3").css("visibility", "hidden");
            }
        });

    }


    
    /* writing */
    if($(location).attr("href").includes("writing")) {
        /* 작성 글 검색 */
        $("#search-my-article-btn").click(function(e) {
            e.preventDefault();
            startLoad();
            let name_ = $("#writer-name").val()
            let password_ = $("#writer-password").val()

            if(name_ == "" || password_ == "") {
                alert("모든 항목은 필수 입력 항목입니다.");
                endLoad();
                return;
            }
            
            /*
            * 미구현된 기능 (주요기능)
            * 서버와 통신하여 새로운 글을 등록합니다.
            */
            $.ajax({
                url: "../server.php",
                data: { target: "board", name: name_, password: password_ },
                type: "POST",
                dataType: "json"
            })
            .done(function(json) {
                // 검색 결과 처리
                showToast("미구현된 기능입니다. 구현 완료시, 닉네임과 패스워드 비교 후 글이 출력됩니다.", 5000);
                $("#my-article-preview").empty();
                $("#my-article-preview").append("<p class=\"unDeveloped\"'>* 미구현된 기능 (주요기능) *</p>",
                "<p class=\"unDeveloped\"'>닉네임과 패스워드에 맞는 검색 결과를 보여줍니다.</p>",
                "<p class=\"unDeveloped\"'>이 경우, " + name_ + " 닉네임, " + password_ + " 패스워드와 일치하는 글을 보여줍니다.</p>");
                endLoad();
                endLoad();
            })
            .fail(function(xhr, status, errorThrown) {
                console.log("오류가 발생했습니다.\n"
                + "오류명: " + errorThrown + "\n"
                + "상태: " + status);
            })
            .always(function(xhr, status) {
                console.log("요청이 완료되었습니다!");
                console.log({ name: name_, password: password_ });
                console.log({ return_data: xhr, status: status });
            });
        });

        /* 글 삭제 */        
        $(".my-article-wrapper").on("submit", function(e) {
            e.preventDefault();
            showToast("미구현된 기능입니다. 구현 완료시, 글이 서버와 하단에서 삭제됩니다.", 5000);

            let formId = this.id;
            let idNum = formId.split("-").pop();
            
            $("#delete-my-article-btn-" + idNum).prop("disabled", true);
        });
    }
});
