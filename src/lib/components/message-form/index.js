// import styles from './index.css';
import shadowStyles from './shadow.css';
import getReadableSize from '../../../../utils/file';

const slotName = 'message-input';
const USERNAME = 'Cat';

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
        document.addEventListener('dragover', function (event) {event.preventDefault();});
        document.addEventListener('drop', this._onNewFile.bind(this), false);
        // this._elements.inputSlot.addEventListener('slotchange', this._onSlotChange.bind(this));
    }


    _onNewFile(event) {
      if (event.type === 'drop') {
        event.preventDefault();

        const files = event.dataTransfer.files;

        for (var i = 0; i < files.length; i++) {
            this._newFileMessage(files[i]);
        }


        return false;

      }
        const file = this._elements.sendFile.files[0];

        if (file.type.startsWith('image')) {
          this._newImageMessage(file);

          event.preventDefault();
          return false;
        }

        this._newNonImageFileMessage(file);

        // this._newMessage(file.name + '\n' + file.type + '\n' + getReadableSize(file.size));

        event.preventDefault();
        return false;
    }

    _newFileMessage(file) {
      if (file.type.startsWith('image')) {
        this._newImageMessage(file);
      }
      else {
        this._newNonImageFileMessage(file);
      }
    }

    _newNonImageFileMessage(file) {
      var messageList = document.body.querySelector('.message-list');
      messageList.scrollTop = messageList.scrollHeight;

      const newMessage = document.createElement('div');
      newMessage.className = 'message-test';

      let filehref = document.createElement('a');
      filehref.innerText = file.name;
      filehref.href = URL.createObjectURL(file);
      const size = document.createElement('span');
      size.innerText = getReadableSize(file.size);

      // newMessage.classList.add('image');
      newMessage.appendChild(filehref);
      newMessage.appendChild(document.createElement('br'));

      newMessage.appendChild(size);


      messageList.appendChild(newMessage);
      return 0;
    }

    _newImageMessage(image) {
      var messageList = document.body.querySelector('.message-list');
      messageList.scrollTop = messageList.scrollHeight;

      const newMessage = document.createElement('div');
      newMessage.className = 'message-test';
      let imageElem = document.createElement('img');
      imageElem.style.maxWidth = '30vw';
      imageElem.src = URL.createObjectURL(image);
      imageElem.onload = () => URL.revokeObjectURL(image.src);
      newMessage.classList.add('image');
      newMessage.appendChild(imageElem);

      const size = document.createElement('span');
      size.innerText = getReadableSize(image.size);
      newMessage.appendChild(document.createElement('br'));
      newMessage.appendChild(size);


      messageList.appendChild(newMessage);
      return 0;
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

      newMessage.appendChild(document.createElement('br'));
      const this_time = new Date();
      const timeElem = document.createElement('time');
      timeElem.innerText = ((this_time.getHours() < 10) ? ('0'+this_time.getHours()) : (this_time.getHours())) + ':' + ((this_time.getMinutes() < 10) ? ('0' + this_time.getMinutes()) : (this_time.getMinutes()));
      timeElem.style.fontSize = '60%';
      newMessage.appendChild(timeElem);

      const messageFormData = new FormData();
      messageFormData.append('author', USERNAME);
      messageFormData.append('time', timeElem.innerText);
      messageFormData.append('text', newMessage.innerText);

      const littleLabel = document.createElement('span');
      littleLabel.style.fontSize = '40%';
      littleLabel.id = 'little_label';
      littleLabel.innerText = 'Отправка...';
      newMessage.appendChild(littleLabel);

      var request = new XMLHttpRequest();
      request.open("POST", 'http://meowbook.org:8081/message');
      request.send(messageFormData);
      request.addEventListener('loadend', this._setLittleText.bind(this, newMessage, 'Доставлено'));
      return 0;
    }

    _setLittleText(messageElem, text) {
      const LL = messageElem.querySelector('#little_label');
      LL.innerText = text;
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
