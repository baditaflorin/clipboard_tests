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

var copyBobBtn = document.querySelector('.js-copy-bob-btn')

copyBobBtn.addEventListener('click', function (event) {
  copyTextToClipboard('Bob');
});
var latest_clipboard_text;

function update_textarea_from_clipboard() {
  navigator.clipboard.readText().then((copiedText) => {
    document.getElementById('js-current-clipboard').value = copiedText
    return copiedText;
  });
}


function myTimer() {
  console.log(' each 1 second...');
  update_textarea_from_clipboard();
  
}

var myVar = setInterval(myTimer, 1000); //setting the loop with time interval



import './style.css';
import streamSaver from 'streamsaver'

  
    // Saving a blob is as simple as the fetch example, you just get the
    // readableStream from the blob by calling blob.stream() to get a
    // readableStream and then pipe it

    // One alternetive way of getting the stream is by doing:
    // const readableStream = new Response(blob).body

    $start.onclick = () => {
      const url = 'https://d8d913s460fub.cloudfront.net/videoserver/cat-test-video-320x240.mp4'
        const fileStream = streamSaver.createWriteStream('cat.mp4')

        fetch(url).then(res => {
          const readableStream = res.body

          // more optimized
          if (window.WritableStream && readableStream.pipeTo) {
            return readableStream.pipeTo(fileStream)
              .then(() => console.log('done writing'))
          }

          window.writer = fileStream.getWriter()

          const reader = res.body.getReader()
          const pump = () => reader.read()
            .then(res => res.done
              ? writer.close()
              : writer.write(res.value).then(pump))

          pump()
        })
}
latest_clipboard_text=update_textarea_from_clipboard();
    uInt8=new TextEncoder().encode(latest_clipboard_text)

      $saveClipboard.onclick = () => {
        const fileStream = streamSaver.createWriteStream('filename.txt', {
          size: uInt8.byteLength, // (optional filesize) Will show progress
          writableStrategy: undefined, // (optional)
          readableStrategy: undefined  // (optional)
        })
        const writer = fileStream.getWriter()
        writer.write(uInt8)
        writer.close()

      }