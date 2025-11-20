// Коэффициенты конвертации для информационных единиц (относительно бит)
const infoUnits = {
    'bit': 1,              // 1 бит = 1 бит
    'byte': 8,             // 1 байт = 8 бит
    'kb': 8192,            // 1 Кбайт = 1024 байта = 8192 бит
    'mb': 8388608,         // 1 Мбайт = 1024 Кбайта = 8388608 бит
    'gb': 8589934592       // 1 Гбайт = 1024 Мбайта = 8589934592 бит
};

function calculateFileVolume() {
    // Получаем значения из полей ввода
    const weightInput = document.getElementById('weightInput');
    const countInput = document.getElementById('countInput');
    const weightUnit = document.getElementById('weightUnit').value;
    const volumeUnit = document.getElementById('volumeUnit').value;
    const resultElement = document.getElementById('volumeResult');
    
    const weight = parseFloat(weightInput.value);
    const count = parseFloat(countInput.value);
    
    // Проверяем введённые данные
    if (isNaN(weight) || isNaN(count)) {
        resultElement.value = 'Введите числа';
        return;
    }
    
    if (weight <= 0 || count <= 0) {
        resultElement.value = 'Значения должны быть > 0';
        return;
    }
    
    // Конвертируем вес символа в биты
    const weightInBits = weight * infoUnits[weightUnit];
    
    // Вычисляем объём в битах по формуле I = i * k
    const volumeInBits = weightInBits * count;
    
    // Конвертируем в выбранные единицы объёма
    const finalVolume = volumeInBits / infoUnits[volumeUnit];
    
    // Форматируем и выводим результат
    resultElement.value = finalVolume.toFixed(6);
}

// Авторасчёт при изменении единиц измерения
document.getElementById('weightUnit').addEventListener('change', calculateFileVolume);
document.getElementById('volumeUnit').addEventListener('change', calculateFileVolume);

// Авторасчёт при вводе чисел
document.getElementById('weightInput').addEventListener('input', calculateFileVolume);
document.getElementById('countInput').addEventListener('input', calculateFileVolume);

// Дополнительная функция для быстрых расчётов
function setCommonValues() {
    // Можно добавить кнопки для быстрого выбора распространённых значений
    const commonWeights = {
        'ascii': 8,        // ASCII символ
        'unicode': 16,     // Unicode символ
        'cyrillic': 16     // Кириллический символ в Unicode
    };
    
    // В будущем можно добавить кнопки для быстрого выбора
}