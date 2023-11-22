// Oepn Source #2. Rotating Text / License: (src/opensource_2.css) 1 lines
$(document).ready(function() {
    let sloganWords = $(".slogan-word");
    let sloganWordArray = [];
    let sloganCurrentWord = 0;

    sloganWords[sloganCurrentWord].style.opacity = 1;
    for (var i = 0; i < sloganWords.length; i++) {
        splitLetters(sloganWords[i]);
    }

    function changeWord() {
        let currentWord_ = sloganWordArray[sloganCurrentWord];
        let newWord_ = sloganCurrentWord == sloganWords.length-1 ? sloganWordArray[0] : sloganWordArray[sloganCurrentWord+1];
        for (var i = 0; i < currentWord_.length; i++) {
            animateLetterOut(currentWord_, i);
        }

        for (var i = 0; i < newWord_.length; i++) {
        newWord_[i].className = 'slogan-letter slogan-letter-animation-behind';
        newWord_[0].parentElement.style.opacity = 1;
            animateLetterIn(newWord_, i);
        }

        sloganCurrentWord = (sloganCurrentWord == sloganWordArray.length-1) ? 0 : sloganCurrentWord+1;
    }

    function animateLetterOut(currentWord_, i) {
        setTimeout(function() {
                currentWord_[i].className = 'slogan-letter slogan-letter-animation-out';
        }, i*80);
    }

    function animateLetterIn(newWord_, i) {
        setTimeout(function() {
                newWord_[i].className = 'slogan-letter slogan-letter-animation-in';
        }, 340+(i*80));
    }

    function splitLetters(word_) {
    var content = word_.innerHTML;
    word_.innerHTML = '';
    var letters = [];
    for (var i = 0; i < content.length; i++) {
        var letter = document.createElement('span');
        letter.className = 'slogan-letter';
        letter.innerHTML = content.charAt(i);
        word_.appendChild(letter);
        letters.push(letter);
    }
    
    sloganWordArray.push(letters);
    }

    setInterval(changeWord, 1500);
});
