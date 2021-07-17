var articleText = `India, officially the Republic of India is a country in South Asia. It is the second-most populous country, the seventh-largest country by land area, and the most populous democracy in the world. Bounded by the Indian Ocean on the south, the Arabian Sea on the southwest, and the Bay of Bengal on the southeast, it shares land borders with Pakistan to the west; China, Nepal, and Bhutan to the north; and Bangladesh and Myanmar to the east. In the Indian Ocean, India is in the vicinity of Sri Lanka and the Maldives; its Andaman and Nicobar Islands share a maritime border with Thailand, Myanmar and Indonesia.`;

var aText = articleText.split(' ');

var totalTime = 0, th = 0, tm = 0, totalSec = 0, started = false, position = 0, pastText = '', presentText = '', futureText = '', currentTypedWord = '', totalWords = 0, wrongWords = 0, tSec = 0, currrentASCII = 0;

function init() {
    totalTime = '01:00';

    $('#timer')[0].innerText = totalTime;

    th = parseInt(totalTime.substring(0, 2));
    tm = parseInt(totalTime.substring(3, 5));

    totalSec = th * 60 + tm;
    tSec = totalSec;
    started = false;

    position = 0;

    pastText = ''; presentText = ''; futureText = articleText;
    $('#past-text')[0].innerText = pastText;
    $('#present-text')[0].innerText = presentText;
    $('#future-text')[0].innerText = futureText;

}

init();

$("#typed-text").on('keydown', (e) => {
    currentASCII = e.which;
})

$("#typed-text").on('input', (e) => {
    if (!started) {
        started = true;
        timeObj = setInterval(countDown, 1000);
        presentText = aText[0];
        futureText = futureText.substring(futureText.indexOf(' ') + 1, futureText.length);

        $('#present-text')[0].innerText = presentText;
        $('#future-text')[0].innerText = futureText;
    }

    // main logic
    var typing = e.target.value;

    var currentArticleWord = aText[position];
    // backspace == 8
    if (currentASCII === 8) return;

    if (typing.charAt(typing.length - 1) === ' ' || typing.charAt(typing.length - 1) === '\n') {

        ++position;
        ++totalWords;
        currentTypedWord = currentTypedWord.replace(' ', '');

        if (currentArticleWord === currentTypedWord) {
            pastText += aText[position - 1] + ' ';
        }
        else {
            pastText += '<span style="color: red">' + aText[position - 1] + '</span> ';
            ++wrongWords;
        }

        if (position >= aText.length) {
            presentText = '';
            $('#past-text')[0].innerHTML = pastText;
            $('#present-text')[0].innerHTML = presentText;

            clearInterval(timeObj);
            $('#result').removeClass('none');
            $('#typed-text')[0].disabled = true;

            $('#wpm')[0].innerText = 60 * Math.max(0, (totalWords - wrongWords * 2) / (tSec - totalSec));

            return;
        }

        presentText = aText[position];

        if (position === aText.length - 1) {
            futureText = '';
        }

        else {
            futureText = futureText.substring(futureText.indexOf(' ') + 1, futureText.length);
        }

        $('#past-text')[0].innerHTML = pastText;
        $('#present-text')[0].innerHTML = presentText;
        $('#future-text')[0].innerHTML = futureText;
    }

    currentTypedWord = typing.substring(typing.lastIndexOf(' ') + 1);

})

$('#restart-btn').click(() => {
    $('#result').addClass('none');
    clearInterval(timeObj);
    $('#typed-text')[0].disabled = false;
    $('#typed-text')[0].value = '';
    init();
})

function countDown() {
    if (totalSec <= 0) {
        clearInterval(timeObj);
        $('#result').removeClass('none');
        $('#typed-text')[0].disabled = true;
        $('#wpm')[0].innerText = 60 * Math.max(0, (totalWords - wrongWords * 2) / (tSec - totalSec));
        return;
    }
    if (started) updateTimer(--totalSec);
}

function updateTimer(totalSec) {
    var nh = parseInt(totalSec / 60);
    var nm = totalSec % 60;

    var newTime = nh.toString().padStart(2, '0') + ':' + nm.toString().padStart(2, '0');

    $('#timer')[0].innerText = newTime;
}