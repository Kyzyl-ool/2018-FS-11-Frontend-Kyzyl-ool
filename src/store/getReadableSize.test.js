import getReadableSize from './getReadableSize.js';

describe('Функция хоть что-то возвращает', () => {
  it('Должно вернуть хоть что-то', () => {
    expect.anything(getReadableSize(1));
    expect.anything(getReadableSize(0));
    expect.anything(getReadableSize(3123123123));
  })
});

describe('Функция возвращает строку', function () {
  it('should be string', function () {
    expect(typeof getReadableSize(12321)).toBe('string');
    expect(typeof getReadableSize(0)).toBe('string');
    expect(typeof getReadableSize(12321761253482354)).toBe('string');
  });
});

describe('Функция правильно реагирует на не Number', function () {
  it('should return false for non-Number argument', function () {
    expect(getReadableSize("Hello world")).toBe(false);
    expect(getReadableSize({})).toBe(false);
    expect(getReadableSize([1, 2, 3])).toBe(false);
  });
});

describe('Функция правильно конвертирует число байтов в человекочитаемый размер', () => {
  it('Из 1024 должно вернуть 1.00 Кбайт', () => {
    expect(getReadableSize(1024)).toBe('1.00 Кбайт');
    expect(getReadableSize(2048)).toBe('2.00 Кбайт');
    expect(getReadableSize(10)).toBe('10 байт');
    expect(getReadableSize(1048576)).toBe('1.00 Мбайт');
    expect(getReadableSize(1234)).toBe('1.21 Кбайт');
    expect(getReadableSize(0)).toBe('0 байт');
  });
});

describe('Ошибка при пустом аргументе', () => {
  it('should throw error at empty argument', function () {
    expect(() => getReadableSize()).toThrow();
  });
});

