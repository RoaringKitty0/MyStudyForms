// Коэффициенты конвертации для информационных единиц (относительно бит)
const infoUnits = {
    'bit': 1,              // 1 бит = 1 бит
    'byte': 8,             // 1 байт = 8 бит
    'kb': 8192,            // 1 Кбайт = 1024 байта = 8192 бит
    'mb': 8388608,         // 1 Мбайт = 1024 Кбайта = 8388608 бит
    'gb': 8589934592       // 1 Гбайт = 1024 Мбайта = 8589934592 бит
};

// Коэффициенты для единиц частоты (относительно Гц)
const frequencyUnits = {
    'hz': 1,               // 1 Гц = 1 Гц
    'khz': 1000            // 1 кГц = 1000 Гц
};

// Коэффициенты для единиц времени (относительно секунд)
const timeUnits = {
    'sec': 1,              // 1 секунда = 1 секунда
    'min': 60              // 1 минута = 60 секунд
};

function calculateAudioDepth() {
    // Получаем значения из полей ввода
    const volumeInput = document.getElementById('volumeInput');
    const frequencyInput = document.getElementById('frequencyInput');
    const timeInput = document.getElementById('timeInput');
    const channelsInput = document.getElementById('channelsInput');
    
    const volumeUnit = document.getElementById('volumeUnit').value;
    const frequencyUnit = document.getElementById('frequencyUnit').value;
    const timeUnit = document.getElementById('timeUnit').value;
    const depthUnit = document.getElementById('depthUnit').value;
    
    const resultElement = document.getElementById('depthResult');
    
    const volume = parseFloat(volumeInput.value);
    const frequency = parseFloat(frequencyInput.value);
    const time = parseFloat(timeInput.value);
    const channels = parseInt(channelsInput.value);
    
    // Проверяем введённые данные
    if (isNaN(volume) || isNaN(frequency) || isNaN(time)) {
        resultElement.value = '';
        return;
    }
    
    if (volume <= 0 || frequency <= 0 || time <= 0) {
        resultElement.value = 'Значения должны быть > 0';
        return;
    }
    
    // Конвертируем объём файла в биты
    const volumeInBits = volume * infoUnits[volumeUnit];
    
    // Конвертируем частоту дискретизации в Гц
    const frequencyInHz = frequency * frequencyUnits[frequencyUnit];
    
    // Конвертируем время в секунды
    const timeInSeconds = time * timeUnits[timeUnit];
    
    // Проверяем, чтобы знаменатель не был нулевым
    const denominator = frequencyInHz * timeInSeconds * channels;
    if (denominator === 0) {
        resultElement.value = 'Ошибка в вычислениях';
        return;
    }
    
    // Вычисляем глубину кодирования в битах по формуле i = I / (f * t * k)
    const depthInBits = volumeInBits / denominator;
    
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
document.getElementById('volumeUnit').addEventListener('change', calculateAudioDepth);
document.getElementById('frequencyUnit').addEventListener('change', calculateAudioDepth);
document.getElementById('timeUnit').addEventListener('change', calculateAudioDepth);
document.getElementById('channelsInput').addEventListener('change', calculateAudioDepth);
document.getElementById('depthUnit').addEventListener('change', calculateAudioDepth);

// Авторасчёт при вводе чисел
document.getElementById('volumeInput').addEventListener('input', calculateAudioDepth);
document.getElementById('frequencyInput').addEventListener('input', calculateAudioDepth);
document.getElementById('timeInput').addEventListener('input', calculateAudioDepth);

// Функция для установки стандартных значений аудио
function setAudioPreset(presetName) {
    const presets = {
        'cd': {
            volume: 50,
            volumeUnit: 'mb',
            frequency: 44.1,
            frequencyUnit: 'khz',
            time: 60,
            timeUnit: 'sec',
            channels: 2
        },
        'dvd': {
            volume: 200,
            volumeUnit: 'mb',
            frequency: 96,
            frequencyUnit: 'khz',
            time: 60,
            timeUnit: 'sec',
            channels: 2
        },
        'telephone': {
            volume: 1,
            volumeUnit: 'mb',
            frequency: 8,
            frequencyUnit: 'khz',
            time: 60,
            timeUnit: 'sec',
            channels: 1
        }
    };
    
    if (presets[presetName]) {
        const preset = presets[presetName];
        document.getElementById('volumeInput').value = preset.volume;
        document.getElementById('volumeUnit').value = preset.volumeUnit;
        document.getElementById('frequencyInput').value = preset.frequency;
        document.getElementById('frequencyUnit').value = preset.frequencyUnit;
        document.getElementById('timeInput').value = preset.time;
        document.getElementById('timeUnit').value = preset.timeUnit;
        document.getElementById('channelsInput').value = preset.channels;
        
        calculateAudioDepth();
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Очищаем поля ввода
    document.getElementById('volumeInput').value = '';
    document.getElementById('frequencyInput').value = '';
    document.getElementById('timeInput').value = '';
    document.getElementById('depthResult').value = '';
});