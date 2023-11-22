/* loading */
function startLoad() { $('.loading-page').addClass('show'); } // fade-in (로딩 시작시)
function endLoad() { $('.loading-page').removeClass('show'); } // fade-out (로딩 종료시)
$(document).ready(function() {
    startLoad();
    $(window).on('load', function() {
        endLoad();
    });
});

/* get Navigation Dom only using JS */
function getNavDom() {
    // div#nav-wrapper
    let navWrapper = document.createElement('div');
    navWrapper.id = 'nav-wrapper';

    // div#nav-wrapper > h2#nav-logo
    let navLogo = document.createElement('h2');
    navLogo.id = 'nav-logo';
    let navLogoA = document.createElement('a');
    navLogoA.href = '../index.html';
    let navLogoAImg = document.createElement('img');
    navLogoAImg.src = '../src/logo_with_text_crop.png';
    navLogoAImg.alt = '요리조리';
    navLogoA.appendChild(navLogoAImg);
    navLogo.appendChild(navLogoA);

    // div#nav-wrapper > ul
    let navUl = document.createElement('ul');

    let menuItems = [
        {
            href: "../management/attraction.html",
            text: "여행관리",
            dropDown: [
                { href: "../management/attraction.html", text: "관광지 정보" },
                { href: "../management/accommodation.html", text: "숙박시설 정보" },
                { href: "../management/travel.html", text: "나의 여행지" }
            ]
        },
        {
            href: "../course/optimum.html",
            text: "여행코스",
            dropDown: [
                { href: "../course/optimum.html", text: "최적 동선" },
                { href: "../course/recommendation.html", text: "AI 추천 동선" },
                { href: "../course/course.html", text: "나의 여행코스" }
            ]
        },
        {
            href: "../record/board.html",
            text: "여행기록",
            dropDown: [
                { href: "../record/board.html", text: "게시판" },
                { href: "../record/writing.html", text: "나의 작성글" }
            ]
        }
    ];

    // 각 메뉴 항목에 대한 li 생성
    menuItems.forEach(item => {
        let navLi = document.createElement('li');
        let navLiA = document.createElement('a');
        navLiA.href = item.href;
        navLiA.classList.add('nav-item');
        navLiA.textContent = item.text + ' ';
        let navLiASpan = document.createElement('span');
        navLiASpan.classList.add('material-symbols-outlined');
        navLiASpan.textContent = 'expand_more';
        navLiA.appendChild(navLiASpan);

        let navLiSpan = document.createElement('span');
        navLiSpan.classList.add('nav-accent');

        let dropDownUl = document.createElement('ul');
        dropDownUl.classList.add('drop-down');
        item.dropDown.forEach(subItem => {
            let dropDownLi = document.createElement('li');
            let dropDownA = document.createElement('a');
            dropDownA.href = subItem.href;
            dropDownA.textContent = subItem.text;
            dropDownLi.appendChild(dropDownA);
            dropDownUl.appendChild(dropDownLi);
        });

        navLi.appendChild(navLiA);
        navLi.appendChild(navLiSpan);
        navLi.appendChild(dropDownUl);
        navUl.appendChild(navLi);
    });

    // navWrapper에 navLogo와 navUl 추가
    navWrapper.appendChild(navLogo);
    navWrapper.appendChild(navUl);

    return navWrapper;
}

/* make Web Component - navigation */
class makeNav extends HTMLElement {
    connectedCallback() {
        this.appendChild(getNavDom());
    }
}
customElements.define("custom-nav", makeNav);



/* Local Storage */
let initJSON = {
    management : {
        attraction : {
            type : undefined,
            province : undefined,
            district : undefined
        },
        accommodation : {
            type : undefined,
            province : undefined,
            district : undefined
        },
        travel : {}
    },
    course : {
        optimum : {},
        recommendation : {
            province : undefined,
            district : undefined
        },
        course : {}
    },
    record : {
        board : {},
        writing : {}
    }
};
/**  Set Local Storage 
 * @param {string} dest1_ content_를 저장할 목적지 대분류
 * @param {string} dest2_ content_를 저장할 목적지 중분류
 * @param {string} dest3_ content_를 저장할 목적지 소분류
 * @param {object} content_ dest_에 저장할 내용
 * content_는 YORIJORI[dest1_][dest2_][dest_3]에 저장됩니다.
*/
function setLocalStorage(dest1_, dest2_, dest3_, content_) {
    // 사이트의 local storage가 존재할 경우 JSON.parse, 존재하지 않을 경우 새로운 object 생성
    let localJSON = JSON.parse(localStorage.getItem("YORIJORI")) ?? initJSON;

    localJSON[dest1_][dest2_][dest3_] = content_;
    localStorage.setItem("YORIJORI", JSON.stringify(localJSON));
}

/**  Get Local Storage 
 * @param {string} dest1_ content_를 가져올 목적지 대분류
 * @param {string} dest2_ content_를 저장할 목적지 중분류
 * @returns object 형태의 내용을 가져옴
 * content_를 YORIJORI[dest1_][dest2_]에서 가져옵니다.
*/
function getLocalStorage(dest1_, dest2_) {
    // 사이트의 local storage가 존재할 경우 JSON.parse, 존재하지 않을 경우 새로운 object 생성
    let localJSON = JSON.parse(localStorage.getItem("YORIJORI")) ?? initJSON;

    return localJSON[dest1_][dest2_];
}



/* Toast Notification */
function showToast(message, duration = 3000) {
    const toastContainer = document.getElementById('toast-container');
    const existingToasts = toastContainer.getElementsByClassName('custom-toast');

    // Move existing toasts upwards
    Array.from(existingToasts).forEach(toast => {
        toast.style.bottom = parseInt(toast.style.bottom) + 60 + 'px';
    });

    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.textContent = message;
    toast.style.bottom = '20px'; // New toast appears at the bottom

    toastContainer.appendChild(toast);

    // Show toast
    setTimeout(() => {
        toast.classList.add('custom-toast-show');
    }, 100);

    // Remove toast after duration
    setTimeout(() => {
        toast.classList.remove('custom-toast-show');
        setTimeout(() => toast.remove(), 500); // Match with animation time
    }, duration);
}
