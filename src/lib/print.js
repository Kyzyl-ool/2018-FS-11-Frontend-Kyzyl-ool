import set_background_color from "./test";

function print_message(text) {
    set_background_color("red");
    document.write(text);

}

export default print_message;