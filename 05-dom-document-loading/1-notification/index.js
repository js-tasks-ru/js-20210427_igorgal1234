export default class NotificationMessage {
  element = null;
  static currentNotification = null;

  constructor(message = '', settings = {
    duration: 0,
    type: 'error'
  }) {
    this.message = message;
    this.duration = settings.duration;
    this.type = settings.type;

    this.render();
    this.initEventListeners();
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = this.template;
    this.element = element.firstElementChild;
  }

  get template() {
    return `
      <div class="notification ${this.type === 'success' ? 'success' : 'error'}" style="--value:${this.duration / 1000}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>
    `;
  }

  show(parentElement = document.body) {
    if (NotificationMessage.currentNotification !== null) {
      NotificationMessage.currentNotification.remove();
    }
    NotificationMessage.currentNotification = this;

    parentElement.append(this.element);

    setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  initEventListeners () {
    // NOTE: в данном методе добавляем обработчики событий, если они есть
  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
    // NOTE: удаляем обработчики событий, если они есть
  }
}
