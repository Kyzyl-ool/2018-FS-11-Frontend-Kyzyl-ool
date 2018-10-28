// import styles from './index.css';
import shadowStyles from './shadow.css';

const slotName = 'message-input';

const template = `
	<style>${shadowStyles.toString()}</style>
	<form>
		<!--<div class="message"></div> -->
		<form-input name="message_text" placeholder="Введите сообщение" slot="message-input">
			<!--<span slot="icon"></span>-->
		</form-input>
	</form>
`;

class MessageForm extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = template;
        this._initElements();
        this._addHandlers();
    }

    static get observedAttributes() {
        return [
            'action',
            'method',
        ];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        this._elements.form[attrName] = newVal;
    }

    _initElements() {
        const form = this.shadowRoot.querySelector('form');
        const sendButton = document.body.querySelector('.message-form-button');
        //const message = this.shadowRoot.querySelector('.message');
        this._elements = {
            form,
            sendButton
        };
    }

    _addHandlers() {
        this._elements.form.addEventListener('submit', this._onSubmit.bind(this));
        this._elements.form.addEventListener('keypress', this._onKeyPress.bind(this));
        this._elements.sendButton.addEventListener('click', this._onSubmit.bind(this));
        // this._elements.inputSlot.addEventListener('slotchange', this._onSlotChange.bind(this));
    }

    _onSubmit(event) {
        var messageList = document.body.querySelector('.message-list');
        messageList.scrollTop = messageList.scrollHeight;

        const newMessage = document.createElement('div');
        newMessage.innerText = Array.from(this._elements.form.elements).map(
          el => el.value,
        ).join(', ');

        if (newMessage.innerText == '') {
          event.preventDefault();
          return false;
        }
        if (newMessage.innerText.startsWith('#')) {
          this._onSubmitFromFriend(newMessage.innerText.substring(1));
        }
        else {
          newMessage.className = 'message-test';
          messageList.appendChild(newMessage);
        }



        var form_input = this._elements.form.querySelector('form-input');
        form_input._elements.input.value = '';

        this._elements.form.reset();

        event.preventDefault();
        return false;
    }

    _onSubmitFromFriend(text) {
      var messageList = document.body.querySelector('.message-list');

      const newMessage = document.createElement('div');
      newMessage.innerText = text;

      if (newMessage.innerText == '') {
        event.preventDefault();
        return 0;
      }

      newMessage.className = 'message-test';
      newMessage.style.color = 'brown';
      newMessage.style.alignSelf = 'flex-start';

      messageList.appendChild(newMessage);
      return 0;
    }

    _onKeyPress(event) {
        if (event.keyCode == 13) {
            this._elements.form.dispatchEvent(new Event('submit'));
        }
    }
}

customElements.define('message-form', MessageForm);
