// Коэффициенты конвертации для информационных единиц (относительно бит)
const infoUnits = {
    'bit': 1,              // 1 бит = 1 бит
    'byte': 8,             // 1 байт = 8 бит
    'kb': 8192,            // 1 Кбайт = 1024 байта = 8192 бит
    'mb': 8388608,         // 1 Мбайт = 1024 Кбайта = 8388608 бит
    'gb': 8589934592       // 1 Гбайт = 1024 Мбайта = 8589934592 бит
};

function calculatePixelCount() {
    // Получаем значения из полей ввода
    const volumeInput = document.getElementById('volumeInput');
    const depthInput = document.getElementById('depthInput');
    const volumeUnit = document.getElementById('volumeUnit').value;
    const resultElement = document.getElementById('pixelResult');
    
    const volume = parseFloat(volumeInput.value);
    const depth = parseInt(depthInput.value);
    
    // Проверяем введённые данные
    if (isNaN(volume) || isNaN(depth)) {
        resultElement.value = '';
        return;
    }
    
    if (volume <= 0 || depth <= 0) {
        resultElement.value = 'Значения должны быть > 0';
        return;
    }
    
    if (depth === 0) {
        resultElement.value = 'Глубина цвета не может быть 0';
        return;
    }
    
    // Конвертируем объём файла в биты
    const volumeInBits = volume * infoUnits[volumeUnit];
    
    // Вычисляем количество пикселей по формуле k = I / i
    const pixelCount = volumeInBits / depth;
    
    
    // Форматируем и выводим результат
    if (pixelCount >= 1000000) {
        resultElement.value = formatLargeNumber(pixelCount);
    } else {
        resultElement.value = pixelCount.toLocaleString();
    }
}

// Функция для форматирования больших чисел
function formatLargeNumber(number) {
    if (number >= 1e9) {
        return (number / 1e9).toFixed(2) + ' млрд';
    } else if (number >= 1e6) {
        return (number / 1e6).toFixed(2) + ' млн';
    } else if (number >= 1e3) {
        return number.toLocaleString();
    } else {
        return number.toString();
    }
}

// Авторасчёт при изменении единиц измерения
document.getElementById('volumeUnit').addEventListener('change', calculatePixelCount);

// Авторасчёт при вводе чисел
document.getElementById('volumeInput').addEventListener('input', calculatePixelCount);
document.getElementById('depthInput').addEventListener('input', calculatePixelCount);

// Функция для быстрого выбора распространённых значений глубины цвета
function setCommonDepth(depth) {
    document.getElementById('depthInput').value = depth;
    calculatePixelCount();
}

// Добавляем обработчики для быстрого выбора глубины цвета из таблицы
document.addEventListener('DOMContentLoaded', function() {
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach(item => {
        item.addEventListener('click', function() {
            const depthText = this.querySelector('.depth').textContent;
            const depthValue = parseInt(depthText);
            if (!isNaN(depthValue)) {
                setCommonDepth(depthValue);
            }
        });
    });
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Очищаем поля ввода
    document.getElementById('volumeInput').value = '';
    document.getElementById('depthInput').value = '';
    document.getElementById('pixelResult').value = '';
});
