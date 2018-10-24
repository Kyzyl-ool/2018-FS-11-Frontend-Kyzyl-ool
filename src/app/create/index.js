import "../../lib/components/form/-input";
import "../../lib/components/message-form";
import shadowBodystyle from './shadow.css';

window.document.body.innerHTML = `
<style>${shadowBodystyle.toString()}</style>

<form class="message-list">
    <div class="message-test">DIV FIRST</div>
    <div class="message-test">DIV SECOND</div>
    <div class="message-test">AND THIS IS THE THIRD DIV!</div>
    <div class="message-test">DIV THE 4th</div>
</form>

<div class="message-form">
<message-form> </message-form>
<button class="message-form-button">Отправить</button>
</div>
`;
//window.document.body.className = 'flex';
