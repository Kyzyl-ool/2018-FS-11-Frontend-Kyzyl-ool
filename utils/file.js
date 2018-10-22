const KB = 2 ** 10;
const MB = 2 ** 20;
const GB = 2 ** 30;

function getReadableSize(size) {
    if (size >= KB) {
        if (size >= MB) {
            if (size >= GB) {
                return `${(size / 2 ** 30).toFixed(2)} Гбайт`;
            }
            return `${(size / 2 ** 20).toFixed(2)} Мбайт`;
        }
        return `${(size / 2 ** 10).toFixed(2)} Кбайт`;
    }
    return `${size} байт`;
}
