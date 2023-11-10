const shareControls = document.querySelector('[data-share-controls]');
const shareMessage = document.querySelector('[data-share-message]');
const shareUrlElement = document.querySelector('[data-share-url]');
let shareUrl;
let liveRegion;

if (shareControls) {
  shareUrl = shareUrlElement.innerText.trim();
}

function addCopyButton() {
  const copyButton = document.createElement('button');
  copyButton.classList.add('copy-button');
  copyButton.innerText = 'Copy link';
  shareControls.appendChild(copyButton);
  shareControls.classList.add('share-controls--enhanced');
  copyButton.addEventListener('click', handleCopyButtonClick);
}

function handleCopyButtonClick(event) {
  console.log(shareUrl);
  window.navigator.clipboard.writeText(shareUrl)
    .then(() => {
      liveRegion.innerText = 'Link copied to clipboard!';
      setTimeout(function() {
        liveRegion.innerText = '';
      }, 3000);
    })
}

function createLiveRegion() {
  liveRegion = document.createElement('p');
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.classList.add('copy-notification-text');
  shareControls.appendChild(liveRegion);
}

if ('clipboard' in window.navigator && shareControls) {
  shareControls.innerHTML = '';
  addCopyButton();
  createLiveRegion();
}

