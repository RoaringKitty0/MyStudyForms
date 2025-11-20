// Коэффициенты конвертации для информационных единиц (относительно бит)
const infoUnits = {
    'bit': 1,              // 1 бит = 1 бит
    'byte': 8,             // 1 байт = 8 бит
    'kb': 8192,            // 1 Кбайт = 1024 байта = 8192 бит
    'mb': 8388608,         // 1 Мбайт = 1024 Кбайта = 8388608 бит
    'gb': 8589934592       // 1 Гбайт = 1024 Мбайта = 8589934592 бит
};

function calculateEncodingDepth() {
    // Получаем значения из полей ввода
    const volumeInput = document.getElementById('volumeInput');
    const countInput = document.getElementById('countInput');
    const volumeUnit = document.getElementById('volumeUnit').value;
    const depthUnit = document.getElementById('depthUnit').value;
    const resultElement = document.getElementById('depthResult');
    
    const volume = parseFloat(volumeInput.value);
    const count = parseFloat(countInput.value);
    
    // Проверяем введённые данные
    if (isNaN(volume) || isNaN(count)) {
        resultElement.value = '';
        return;
    }
    
    if (volume <= 0 || count <= 0) {
        resultElement.value = 'Значения должны быть > 0';
        return;
    }
    
    if (count === 0) {
        resultElement.value = 'Количество символов не может быть 0';
        return;
    }
    
    // Конвертируем объём файла в биты
    const volumeInBits = volume * infoUnits[volumeUnit];
    
    // Вычисляем глубину кодирования в битах по формуле i = I / k
    const depthInBits = volumeInBits / count;
    
    // Конвертируем в выбранные единицы глубины
    const finalDepth = depthInBits / infoUnits[depthUnit];
    
    // Форматируем и выводим результат
    if (finalDepth < 0.001) {
        resultElement.value = finalDepth.toExponential(6);
    } else if (finalDepth < 1) {
        resultElement.value = finalDepth.toFixed(6);
    } else {
        resultElement.value = finalDepth.toFixed(3);
    }
}

// Авторасчёт при изменении единиц измерения
document.getElementById('volumeUnit').addEventListener('change', calculateEncodingDepth);
document.getElementById('depthUnit').addEventListener('change', calculateEncodingDepth);

// Авторасчёт при вводе чисел
document.getElementById('volumeInput').addEventListener('input', calculateEncodingDepth);
document.getElementById('countInput').addEventListener('input', calculateEncodingDepth);

// Функция для установки стандартных значений
function setEncodingPreset(presetName) {
    const presets = {
        'ascii': {
            volume: 1000,
            volumeUnit: 'byte',
            count: 1000
        },
        'unicode': {
            volume: 2000,
            volumeUnit: 'byte',
            count: 1000
        },
        'large-text': {
            volume: 1,
            volumeUnit: 'mb',
            count: 500000
        }
    };
    
    if (presets[presetName]) {
        const preset = presets[presetName];
        document.getElementById('volumeInput').value = preset.volume;
        document.getElementById('volumeUnit').value = preset.volumeUnit;
        document.getElementById('countInput').value = preset.count;
        
        calculateEncodingDepth();
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Очищаем поля ввода
    document.getElementById('volumeInput').value = '';
    document.getElementById('countInput').value = '';
    document.getElementById('depthResult').value = '';
});