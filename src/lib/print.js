import set_background_color from "./test";

function print_message(text) {
    var div = document.createElement("div");
    div.innerHTML = text;
    div.style.height = "20px";
    div.style.width = "200px";
    div.style.border = "5px double black";
    div.style.backgroundColor = "red";
    div.align = "center";


    document.body.appendChild(div);

}

export default print_message;