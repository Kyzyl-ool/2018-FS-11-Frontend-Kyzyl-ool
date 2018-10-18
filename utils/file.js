function getReadableSize(size) {
    if (size >= 2 ** 10) {
        if (size >= 2 ** 20) {
            if (size >= 2 ** 30) {
                if (size >= 2 ** 40) {
                    return `${(size / 2 ** 30).toFixed(2)} Гбайт`;
                }
            } else {
                return `${(size / 2 ** 20).toFixed(2)} Мбайт`;
            }
        } else {
            return `${(size / 2 ** 10).toFixed(2)} Кбайт`;
        }
    } else {
        return `${size} байт`;
    }
}

alert(getReadableSize(2 ** 10 + 315));
