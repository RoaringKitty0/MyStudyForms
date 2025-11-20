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

function calculateAudioVolume() {
    // Получаем значения из полей ввода
    const depthInput = document.getElementById('depthInput');
    const frequencyInput = document.getElementById('frequencyInput');
    const timeInput = document.getElementById('timeInput');
    const channelsInput = document.getElementById('channelsInput');
    
    const depthUnit = document.getElementById('depthUnit').value;
    const frequencyUnit = document.getElementById('frequencyUnit').value;
    const timeUnit = document.getElementById('timeUnit').value;
    const volumeUnit = document.getElementById('volumeUnit').value;
    
    const resultElement = document.getElementById('volumeResult');
    
    const depth = parseFloat(depthInput.value);
    const frequency = parseFloat(frequencyInput.value);
    const time = parseFloat(timeInput.value);
    const channels = parseInt(channelsInput.value);
    
    // Проверяем введённые данные
    if (isNaN(depth) || isNaN(frequency) || isNaN(time)) {
        resultElement.value = '';
        return;
    }
    
    if (depth <= 0 || frequency <= 0 || time <= 0) {
        resultElement.value = 'Значения должны быть > 0';
        return;
    }
    
    // Конвертируем глубину кодирования в биты
    const depthInBits = depth * infoUnits[depthUnit];
    
    // Конвертируем частоту дискретизации в Гц
    const frequencyInHz = frequency * frequencyUnits[frequencyUnit];
    
    // Конвертируем время в секунды
    const timeInSeconds = time * timeUnits[timeUnit];
    
    // Вычисляем объём в битах по формуле I = i * f * t * k
    const volumeInBits = depthInBits * frequencyInHz * timeInSeconds * channels;
    
    // Конвертируем в выбранные единицы объёма
    const finalVolume = volumeInBits / infoUnits[volumeUnit];
    
    // Форматируем и выводим результат
    if (finalVolume >= 1000000) {
        resultElement.value = finalVolume.toExponential(4);
    } else {
        resultElement.value = finalVolume.toFixed(2);
    }
}

// Авторасчёт при изменении единиц измерения
document.getElementById('depthUnit').addEventListener('change', calculateAudioVolume);
document.getElementById('frequencyUnit').addEventListener('change', calculateAudioVolume);
document.getElementById('timeUnit').addEventListener('change', calculateAudioVolume);
document.getElementById('channelsInput').addEventListener('change', calculateAudioVolume);
document.getElementById('volumeUnit').addEventListener('change', calculateAudioVolume);

// Авторасчёт при вводе чисел
document.getElementById('depthInput').addEventListener('input', calculateAudioVolume);
document.getElementById('frequencyInput').addEventListener('input', calculateAudioVolume);
document.getElementById('timeInput').addEventListener('input', calculateAudioVolume);

// Функция для установки стандартных значений аудио
function setAudioPreset(presetName) {
    const presets = {
        'cd': {
            depth: 16,
            depthUnit: 'bit',
            frequency: 44.1,
            frequencyUnit: 'khz',
            channels: 2
        },
        'dvd': {
            depth: 24,
            depthUnit: 'bit',
            frequency: 96,
            frequencyUnit: 'khz',
            channels: 2
        },
        'telephone': {
            depth: 8,
            depthUnit: 'bit',
            frequency: 8,
            frequencyUnit: 'khz',
            channels: 1
        }
    };
    
    if (presets[presetName]) {
        const preset = presets[presetName];
        document.getElementById('depthInput').value = preset.depth;
        document.getElementById('depthUnit').value = preset.depthUnit;
        document.getElementById('frequencyInput').value = preset.frequency;
        document.getElementById('frequencyUnit').value = preset.frequencyUnit;
        document.getElementById('channelsInput').value = preset.channels;
        
        calculateAudioVolume();
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Очищаем поля ввода
    document.getElementById('depthInput').value = '';
    document.getElementById('frequencyInput').value = '';
    document.getElementById('timeInput').value = '';
    document.getElementById('volumeResult').value = '';
});