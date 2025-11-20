// Коэффициенты конвертации для информационных единиц (относительно бит)
const infoUnits = {
    'bit': 1,              // 1 бит = 1 бит
    'byte': 8,             // 1 байт = 8 бит
    'kb': 8192,            // 1 Кбайт = 1024 байта = 8192 бит
    'mb': 8388608,         // 1 Мбайт = 1024 Кбайта = 8388608 бит
    'gb': 8589934592       // 1 Гбайт = 1024 Мбайта = 8589934592 бит
};

// Коэффициенты для единиц времени (относительно секунд)
const timeUnits = {
    'sec': 1,              // 1 секунда = 1 секунда
    'min': 60              // 1 минута = 60 секунд
};

// Коэффициенты для единиц частоты (относительно Гц)
const frequencyUnits = {
    'hz': 1,               // 1 Гц = 1 Гц
    'khz': 1000            // 1 кГц = 1000 Гц
};

function calculateAudioFrequency() {
    // Получаем значения из полей ввода
    const volumeInput = document.getElementById('volumeInput');
    const depthInput = document.getElementById('depthInput');
    const timeInput = document.getElementById('timeInput');
    const channelsInput = document.getElementById('channelsInput');
    
    const volumeUnit = document.getElementById('volumeUnit').value;
    const depthUnit = document.getElementById('depthUnit').value;
    const timeUnit = document.getElementById('timeUnit').value;
    const frequencyUnit = document.getElementById('frequencyUnit').value;
    
    const resultElement = document.getElementById('frequencyResult');
    
    const volume = parseFloat(volumeInput.value);
    const depth = parseFloat(depthInput.value);
    const time = parseFloat(timeInput.value);
    const channels = parseInt(channelsInput.value);
    
    // Проверяем введённые данные
    if (isNaN(volume) || isNaN(depth) || isNaN(time)) {
        resultElement.value = '';
        return;
    }
    
    if (volume <= 0 || depth <= 0 || time <= 0) {
        resultElement.value = 'Значения должны быть > 0';
        return;
    }
    
    // Конвертируем объём файла в биты
    const volumeInBits = volume * infoUnits[volumeUnit];
    
    // Конвертируем глубину кодирования в биты
    const depthInBits = depth * infoUnits[depthUnit];
    
    // Конвертируем время в секунды
    const timeInSeconds = time * timeUnits[timeUnit];
    
    // Проверяем, чтобы знаменатель не был нулевым
    const denominator = depthInBits * timeInSeconds * channels;
    if (denominator === 0) {
        resultElement.value = 'Ошибка в вычислениях';
        return;
    }
    
    // Вычисляем частоту дискретизации в Гц по формуле f = I / (i * t * k)
    const frequencyInHz = volumeInBits / denominator;
    
    // Конвертируем в выбранные единицы частоты
    const finalFrequency = frequencyInHz / frequencyUnits[frequencyUnit];
    
    // Форматируем и выводим результат
    if (finalFrequency < 0.001) {
        resultElement.value = finalFrequency.toExponential(6);
    } else if (finalFrequency < 1) {
        resultElement.value = finalFrequency.toFixed(6);
    } else {
        resultElement.value = finalFrequency.toFixed(2);
    }
}

// Авторасчёт при изменении единиц измерения
document.getElementById('volumeUnit').addEventListener('change', calculateAudioFrequency);
document.getElementById('depthUnit').addEventListener('change', calculateAudioFrequency);
document.getElementById('timeUnit').addEventListener('change', calculateAudioFrequency);
document.getElementById('channelsInput').addEventListener('change', calculateAudioFrequency);
document.getElementById('frequencyUnit').addEventListener('change', calculateAudioFrequency);

// Авторасчёт при вводе чисел
document.getElementById('volumeInput').addEventListener('input', calculateAudioFrequency);
document.getElementById('depthInput').addEventListener('input', calculateAudioFrequency);
document.getElementById('timeInput').addEventListener('input', calculateAudioFrequency);

// Функция для установки стандартных значений
function setAudioPreset(presetName) {
    const presets = {
        'cd': {
            volume: 50,
            volumeUnit: 'mb',
            depth: 16,
            depthUnit: 'bit',
            time: 60,
            timeUnit: 'sec',
            channels: 2
        },
        'telephone': {
            volume: 1,
            volumeUnit: 'mb',
            depth: 8,
            depthUnit: 'bit',
            time: 60,
            timeUnit: 'sec',
            channels: 1
        },
        'studio': {
            volume: 200,
            volumeUnit: 'mb',
            depth: 24,
            depthUnit: 'bit',
            time: 60,
            timeUnit: 'sec',
            channels: 2
        }
    };
    
    if (presets[presetName]) {
        const preset = presets[presetName];
        document.getElementById('volumeInput').value = preset.volume;
        document.getElementById('volumeUnit').value = preset.volumeUnit;
        document.getElementById('depthInput').value = preset.depth;
        document.getElementById('depthUnit').value = preset.depthUnit;
        document.getElementById('timeInput').value = preset.time;
        document.getElementById('timeUnit').value = preset.timeUnit;
        document.getElementById('channelsInput').value = preset.channels;
        
        calculateAudioFrequency();
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Очищаем поля ввода
    document.getElementById('volumeInput').value = '';
    document.getElementById('depthInput').value = '';
    document.getElementById('timeInput').value = '';
    document.getElementById('frequencyResult').value = '';
});