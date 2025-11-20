// Коэффициенты конвертации для плотности (относительно кг/м³)
const densityUnits = {
    'kg_m3': 1,        // 1 кг/м³ = 1 кг/м³
    'g_cm3': 1000,     // 1 г/см³ = 1000 кг/м³
    'g_l': 1           // 1 г/л = 1 кг/м³
};

// Коэффициенты конвертации для высоты (относительно м)
const heightUnits = {
    'm': 1,            // 1 м = 1 м
    'cm': 0.01,        // 1 см = 0.01 м
    'mm': 0.001        // 1 мм = 0.001 м
};

// Коэффициенты конвертации для давления (относительно Па)
const pressureUnits = {
    'Pa': 1,           // 1 Па = 1 Па
    'kPa': 1000,       // 1 кПа = 1000 Па
    'MPa': 1000000     // 1 МПа = 1000000 Па
};

function calculatePressure() {
    // Получаем значения из полей ввода
    const densityInput = document.getElementById('densityInput');
    const heightInput = document.getElementById('heightInput');
    const gravityInput = document.getElementById('gravityInput');
    const densityUnit = document.getElementById('densityUnit').value;
    const heightUnit = document.getElementById('heightUnit').value;
    const pressureUnit = document.getElementById('pressureUnit').value;
    const resultElement = document.getElementById('pressureResult');
    
    const density = parseFloat(densityInput.value);
    const height = parseFloat(heightInput.value);
    const gravity = parseFloat(gravityInput.value);
    
    // Проверяем введённые данные
    if (isNaN(density) || isNaN(height) || isNaN(gravity)) {
        resultElement.value = 'Введите числа';
        return;
    }
    
    if (density <= 0 || height <= 0 || gravity <= 0) {
        resultElement.value = 'Значения должны быть > 0';
        return;
    }
    
    // Конвертируем всё в базовые единицы (кг/м³ и м)
    const densityInKgM3 = density * densityUnits[densityUnit];
    const heightInM = height * heightUnits[heightUnit];
    
    // Вычисляем давление в Па по формуле p = ρ * g * h
    const pressureInPa = densityInKgM3 * gravity * heightInM;
    
    // Конвертируем в выбранные единицы давления
    const finalPressure = pressureInPa / pressureUnits[pressureUnit];
    
    // Форматируем и выводим результат
    resultElement.value = finalPressure.toFixed(6);
}

// Авторасчёт при изменении единиц измерения
document.getElementById('densityUnit').addEventListener('change', calculatePressure);
document.getElementById('heightUnit').addEventListener('change', calculatePressure);
document.getElementById('pressureUnit').addEventListener('change', calculatePressure);
document.getElementById('gravityInput').addEventListener('input', calculatePressure);

// Авторасчёт при вводе чисел
document.getElementById('densityInput').addEventListener('input', calculatePressure);
document.getElementById('heightInput').addEventListener('input', calculatePressure);