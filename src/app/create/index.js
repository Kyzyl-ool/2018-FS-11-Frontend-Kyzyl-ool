import "../../lib/components/form/-input";
import "../../lib/components/message-form";
import shadowBodystyle from './shadow.css';

window.document.body.innerHTML = `
<style>${shadowBodystyle.toString()}</style>

<form class="message-list"></form>

<div class="message-form">
<message-form> </message-form>
<button class="message-form-button">Отправить</button>
</div>
`;
