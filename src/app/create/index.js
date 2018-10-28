import "../../lib/components/form/-input";
import "../../lib/components/message-form";
import shadowBodystyle from './shadow.css';

window.document.body.innerHTML = `
<style>${shadowBodystyle.toString()}</style>
<footer class="messaging-window">
<form class="message-list"></form>
<div class="message-form">
<message-form> </message-form>

    <label for="file_input"> <img class="pin-file-icon" src="/www/meowbook.org/frontend/public/icons/clip.png"/> </label>
        <input type="file" formmethod="post" id="file_input" class="message-file"/> 

<button class="message-form-button">Отправить</button>
</div>
</footer>
`;

window.onload = function () {

}
