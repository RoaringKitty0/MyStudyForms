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
const durationUnits = {
    'sec': 1,              // 1 секунда = 1 секунда
    'min': 60,             // 1 минута = 60 секунд
    'hour': 3600           // 1 час = 3600 секунд
};

function calculateAudioDuration() {
    // Получаем значения из полей ввода
    const volumeInput = document.getElementById('volumeInput');
    const depthInput = document.getElementById('depthInput');
    const frequencyInput = document.getElementById('frequencyInput');
    const channelsInput = document.getElementById('channelsInput');
    
    const volumeUnit = document.getElementById('volumeUnit').value;
    const depthUnit = document.getElementById('depthUnit').value;
    const frequencyUnit = document.getElementById('frequencyUnit').value;
    const durationUnit = document.getElementById('durationUnit').value;
    
    const resultElement = document.getElementById('durationResult');
    
    const volume = parseFloat(volumeInput.value);
    const depth = parseFloat(depthInput.value);
    const frequency = parseFloat(frequencyInput.value);
    const channels = parseInt(channelsInput.value);
    
    // Проверяем введённые данные
    if (isNaN(volume) || isNaN(depth) || isNaN(frequency)) {
        resultElement.value = '';
        return;
    }
    
    if (volume <= 0 || depth <= 0 || frequency <= 0) {
        resultElement.value = 'Значения должны быть > 0';
        return;
    }
    
    // Конвертируем объём файла в биты
    const volumeInBits = volume * infoUnits[volumeUnit];
    
    // Конвертируем глубину кодирования в биты
    const depthInBits = depth * infoUnits[depthUnit];
    
    // Конвертируем частоту дискретизации в Гц
    const frequencyInHz = frequency * frequencyUnits[frequencyUnit];
    
    // Проверяем, чтобы знаменатель не был нулевым
    const denominator = depthInBits * frequencyInHz * channels;
    if (denominator === 0) {
        resultElement.value = 'Ошибка в вычислениях';
        return;
    }
    
    // Вычисляем время звучания в секундах по формуле t = I / (i * f * k)
    const durationInSeconds = volumeInBits / denominator;
    
    // Конвертируем в выбранные единицы времени
    const finalDuration = durationInSeconds / durationUnits[durationUnit];
    
    // Форматируем и выводим результат
    if (finalDuration < 0.001) {
        resultElement.value = finalDuration.toExponential(6);
    } else if (finalDuration < 1) {
        resultElement.value = finalDuration.toFixed(6);
    } else if (finalDuration < 1000) {
        resultElement.value = finalDuration.toFixed(2);
    } else {
        resultElement.value = finalDuration.toFixed(0);
    }
}

// Авторасчёт при изменении единиц измерения
document.getElementById('volumeUnit').addEventListener('change', calculateAudioDuration);
document.getElementById('depthUnit').addEventListener('change', calculateAudioDuration);
document.getElementById('frequencyUnit').addEventListener('change', calculateAudioDuration);
document.getElementById('channelsInput').addEventListener('change', calculateAudioDuration);
document.getElementById('durationUnit').addEventListener('change', calculateAudioDuration);

// Авторасчёт при вводе чисел
document.getElementById('volumeInput').addEventListener('input', calculateAudioDuration);
document.getElementById('depthInput').addEventListener('input', calculateAudioDuration);
document.getElementById('frequencyInput').addEventListener('input', calculateAudioDuration);

// Функция для форматирования времени в читаемый вид
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
        return `${hours}ч ${minutes}м ${secs}с`;
    } else if (minutes > 0) {
        return `${minutes}м ${secs}с`;
    } else {
        return `${secs}с`;
    }
}

// Функция для установки стандартных значений
function setAudioPreset(presetName) {
    const presets = {
        'cd': {
            volume: 700,
            volumeUnit: 'mb',
            depth: 16,
            depthUnit: 'bit',
            frequency: 44.1,
            frequencyUnit: 'khz',
            channels: 2
        },
        'mp3': {
            volume: 50,
            volumeUnit: 'mb',
            depth: 16,
            depthUnit: 'bit',
            frequency: 44.1,
            frequencyUnit: 'khz',
            channels: 2
        },
        'telephone': {
            volume: 5,
            volumeUnit: 'mb',
            depth: 8,
            depthUnit: 'bit',
            frequency: 8,
            frequencyUnit: 'khz',
            channels: 1
        }
    };
    
    if (presets[presetName]) {
        const preset = presets[presetName];
        document.getElementById('volumeInput').value = preset.volume;
        document.getElementById('volumeUnit').value = preset.volumeUnit;
        document.getElementById('depthInput').value = preset.depth;
        document.getElementById('depthUnit').value = preset.depthUnit;
        document.getElementById('frequencyInput').value = preset.frequency;
        document.getElementById('frequencyUnit').value = preset.frequencyUnit;
        document.getElementById('channelsInput').value = preset.channels;
        
        calculateAudioDuration();
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Очищаем поля ввода
    document.getElementById('volumeInput').value = '';
    document.getElementById('depthInput').value = '';
    document.getElementById('frequencyInput').value = '';
    document.getElementById('durationResult').value = '';
});