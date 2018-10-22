import "../../lib/components/form/-input";
import "../../lib/components/message-form";
import shadowBodystyle from './shadow.css';

window.document.body.innerHTML = `
<style>${shadowBodystyle.toString()}</style>

<message-form> </message-form>
<button class="SendButton">Отправить</button>
`;
window.document.body.className = 'flex';
