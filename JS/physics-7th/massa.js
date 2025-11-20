// Коэффициенты конвертации для объёма (относительно м³)
const volumeUnits = {
    'm3': 1,           // 1 м³ = 1 м³
    'cm3': 0.000001,   // 1 см³ = 0.000001 м³
    'l': 0.001,        // 1 л = 0.001 м³
    'ml': 0.000001     // 1 мл = 0.000001 м³
};

// Коэффициенты конвертации для плотности (относительно кг/м³)
const densityUnits = {
    'kg_m3': 1,        // 1 кг/м³ = 1 кг/м³
    'g_cm3': 1000,     // 1 г/см³ = 1000 кг/м³
    'g_l': 1           // 1 г/л = 1 кг/м³
};

// Коэффициенты конвертации для массы (относительно кг)
const massUnits = {
    'kg': 1,           // 1 кг = 1 кг
    'g': 0.001,        // 1 г = 0.001 кг
    'mg': 0.000001     // 1 мг = 0.000001 кг
};

function calculateMass() {
    // Получаем значения из полей ввода
    const volumeInput = document.getElementById('volumeInput');
    const densityInput = document.getElementById('densityInput');
    const volumeUnit = document.getElementById('volumeUnit').value;
    const densityUnit = document.getElementById('densityUnit').value;
    const massUnit = document.getElementById('massUnit').value;
    const resultElement = document.getElementById('massResult');
    
    const volume = parseFloat(volumeInput.value);
    const density = parseFloat(densityInput.value);
    
    // Проверяем введённые данные
    if (isNaN(volume) || isNaN(density)) {
        resultElement.value = 'Введите числа';
        return;
    }
    
    if (volume <= 0 || density <= 0) {
        resultElement.value = 'Значения должны быть > 0';
        return;
    }
    
    // Конвертируем всё в базовые единицы (м³ и кг/м³)
    const volumeInM3 = volume * volumeUnits[volumeUnit];
    const densityInKgM3 = density * densityUnits[densityUnit];
    
    // Вычисляем массу в кг
    const massInKg = densityInKgM3 * volumeInM3;
    
    // Конвертируем в выбранные единицы массы
    const finalMass = massInKg / massUnits[massUnit];
    
    // Форматируем и выводим результат
    resultElement.value = finalMass.toFixed(6);
}

// Авторасчёт при изменении единиц измерения
document.getElementById('volumeUnit').addEventListener('change', calculateMass);
document.getElementById('densityUnit').addEventListener('change', calculateMass);
document.getElementById('massUnit').addEventListener('change', calculateMass);

// Авторасчёт при вводе чисел (опционально)
document.getElementById('volumeInput').addEventListener('input', calculateMass);
document.getElementById('densityInput').addEventListener('input', calculateMass);