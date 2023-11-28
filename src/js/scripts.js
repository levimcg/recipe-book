class ShareControls extends HTMLElement {
  liveRegion;
  copyLinkButtonElement;
  shareButtonElement;
  clipboardSupport = 'clipboard' in window.navigator;
  shareSupport = 'share' in window.navigator;

  static settings = {
    tagName: 'share-controls'
  }

  get url() {
    return this.getAttribute('url') || window.location.href;
  }

  get copyButton() {
    return this.getAttribute('copy-button') || 'Copy link';
  }

  get shareButton() {
    return this.getAttribute('share-button') || 'Share';
  }

  get shareText() {
    return this.getAttribute('share-text') || 'Share this page!';
  }

  template() {
    return `
      <div class="sc-wrapper">
        ${this.clipboardSupport ? `<button class="sc-copy-button">${this.copyButton}</button>` : ''}
        ${this.shareSupport ? `<button class="sc-share-button">${this.shareButton}</button>`: ''}
        <p aria-live="polite" class="sc-notification-text"></p>
      </div>
    `;
  }

  connectedCallback() {
    if (this.shareSupport || this.clipboardSupport) {
      this.innerHTML = this.template();
      this.listen();
    }
  }

  listen() {
    this.copyLinkButtonElement = this.querySelector('.sc-copy-button');
    this.shareButtonElement = this.querySelector('.sc-share-button');
    this.liveRegion = this.querySelector('.sc-notification-text');

    // Bind event listeners to this instance
    this.handleCopyClick = this.handleCopyClick.bind(this);
    this.handleShareClick = this.handleShareClick.bind(this);

    // Listen for clicks if button exists
    this.copyLinkButtonElement?.addEventListener('click', this.handleCopyClick);
    this.shareButtonElement?.addEventListener('click', this.handleShareClick);
  }

  handleCopyClick() {
    window.navigator.clipboard.writeText(this.url)
      .then(() => {
        this.showNotification('Link copied to clipboard');
      })
      .catch(error => console.log(error));
  }

  handleShareClick() {
    window.navigator.share({
      title: this.shareText,
      text: this.shareText,
      url: this.url
    })
    .then(() => {
      this.showNotification('Thanks for sharing!');
    })
    .catch(error => console.log(error));
  }

  /**
   * Shows a notification inside of an aria-live region
   * @param {String} text
   * @param {Number} duration
   */
  showNotification(text, duration = 3000) {
    this.liveRegion.innerText = text;
    setTimeout(() => {
      this.liveRegion.innerText = '';
    }, duration);
  }
}

if ('customElements' in window) {
  window.customElements.define(ShareControls.settings.tagName, ShareControls)
}