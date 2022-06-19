// Import stylesheets
import './style.css';

// Write Javascript code!
function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log('Async: Copying to clipboard was successful!');
    },
    function (err) {
      console.error('Async: Could not copy text: ', err);
    }
  );
}

var copyBobBtn = document.querySelector('.js-copy-bob-btn'),
  copyJaneBtn = document.querySelector('.js-copy-jane-btn');

copyBobBtn.addEventListener('click', function (event) {
  copyTextToClipboard('Bob');
});

copyJaneBtn.addEventListener('click', function (event) {
  copyTextToClipboard('Jane');
});

function update_textarea() {
  navigator.clipboard.readText().then((copiedText) => {
    console.log(copiedText);
    document.getElementById('js-current-clipboard').value = copiedText
  });
}


function myTimer() {
  console.log(' each 1 second...');
  update_textarea();

}

var myVar = setInterval(myTimer, 1000); //setting the loop with time interval
