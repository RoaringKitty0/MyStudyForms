// Коэффициенты конвертации для массы (относительно кг)
const massUnits = {
    'kg': 1,           // 1 кг = 1 кг
    'g': 0.001,        // 1 г = 0.001 кг
    'mg': 0.000001     // 1 мг = 0.000001 кг
};

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
    'g_cm3': 0.001,    // 1 кг/м³ = 0.001 г/см³
    'g_l': 1           // 1 кг/м³ = 1 г/л
};

function calculateDensity() {
    // Получаем значения из полей ввода
    const massInput = document.getElementById('massInput');
    const volumeInput = document.getElementById('volumeInput');
    const massUnit = document.getElementById('massUnit').value;
    const volumeUnit = document.getElementById('volumeUnit').value;
    const densityUnit = document.getElementById('densityUnit').value;
    const resultElement = document.getElementById('densityResult');
    
    const mass = parseFloat(massInput.value);
    const volume = parseFloat(volumeInput.value);
    
    // Проверяем введённые данные
    if (isNaN(mass) || isNaN(volume)) {
        resultElement.value = 'Введите числа';
        return;
    }
    
    if (mass <= 0 || volume <= 0) {
        resultElement.value = 'Значения должны быть > 0';
        return;
    }
    
    // Конвертируем всё в базовые единицы (кг и м³)
    const massInKg = mass * massUnits[massUnit];
    const volumeInM3 = volume * volumeUnits[volumeUnit];
    
    // Вычисляем плотность в кг/м³ по формуле ρ = m / V
    const densityInKgM3 = massInKg / volumeInM3;
    
    // Конвертируем в выбранные единицы плотности
    const finalDensity = densityInKgM3 / densityUnits[densityUnit];
    
    // Форматируем и выводим результат
    resultElement.value = finalDensity.toFixed(6);
}

// Авторасчёт при изменении единиц измерения
document.getElementById('massUnit').addEventListener('change', calculateDensity);
document.getElementById('volumeUnit').addEventListener('change', calculateDensity);
document.getElementById('densityUnit').addEventListener('change', calculateDensity);

// Авторасчёт при вводе чисел
document.getElementById('massInput').addEventListener('input', calculateDensity);
document.getElementById('volumeInput').addEventListener('input', calculateDensity);