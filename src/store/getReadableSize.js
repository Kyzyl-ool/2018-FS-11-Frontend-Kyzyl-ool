function getReadableSize(size) {
  if (size >= 10 ** 3) {
    if (size >= 10 ** 6) {
      if (size >= 10 ** 9) {
        if (size >= 10 ** 12) {
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

export default getReadableSize;
