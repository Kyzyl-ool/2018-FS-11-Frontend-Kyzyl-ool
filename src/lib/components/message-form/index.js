// import styles from './index.css';
import shadowStyles from './shadow.css';
import getReadableSize from '../../../../utils/file';

const slotName = 'message-input';
var amount_of_files = 0;

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
        const sendFile = document.body.querySelector('#file_input');
        //const message = this.shadowRoot.querySelector('.message');
        this._elements = {
            form,
            sendButton,
            sendFile
        };
    }

    _addHandlers() {
        this._elements.form.addEventListener('submit', this._onSubmit.bind(this));
        this._elements.form.addEventListener('keypress', this._onKeyPress.bind(this));
        this._elements.sendButton.addEventListener('click', this._onSubmit.bind(this));
        this._elements.sendFile.addEventListener('change', this._onNewFile.bind(this));

        // this._elements.inputSlot.addEventListener('slotchange', this._onSlotChange.bind(this));
    }

    _onNewFile(event) {
        const file = document.querySelector('#file_input').files[0];

        if (file.type.startsWith('image')) {
          this._newImageMessage();

          event.preventDefault();
          return false;
        }


        this._newMessage(file.name + '\n' + file.type + '\n' + getReadableSize(file.size));

        event.preventDefault();
        return false;
    }

    _newImageMessage() {
        const messageList = document.querySelector('.message-list');

        alert(image);
    }

    _onSubmit(event) {
        const text = Array.from(this._elements.form.elements).map(
          el => el.value,
        ).join(', ');

        if (text == '') {
          event.preventDefault();
          return false;
        }
        if (text.startsWith('#')) {
          this._newMessageFromFriend(text.substring(1));
        }
        else {
          this._newMessage(text);
        }


        var form_input = this._elements.form.querySelector('form-input');
        form_input._elements.input.value = '';
        this._elements.form.reset();

        event.preventDefault();
        return false;
    }

    _newMessage(text) {
      var messageList = document.body.querySelector('.message-list');
      messageList.scrollTop = messageList.scrollHeight;

      const newMessage = document.createElement('div');
      newMessage.className = 'message-test';
      newMessage.innerText = text;

      if (newMessage.innerText == '') {
        event.preventDefault();
        return 0;
      }
      messageList.appendChild(newMessage);
      return 0;
    }

    _newMessageFromFriend(text) {
      var messageList = document.body.querySelector('.message-list');
      messageList.scrollTop = messageList.scrollHeight;

      const newMessage = document.createElement('div');
      newMessage.innerText = text;

      if (newMessage.innerText == '') {
        event.preventDefault();
        return 0;
      }

      newMessage.className = 'message-test';
      newMessage.style.color = 'brown';
      newMessage.style.alignSelf = 'flex-start';
      newMessage.style.textAlign = 'left';

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
