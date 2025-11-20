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

// Коэффициенты конвертации для силы (относительно Н)
const forceUnits = {
    'N': 1,            // 1 Н = 1 Н
    'kN': 1000         // 1 кН = 1000 Н
};

function calculateArchimedesForce() {
    // Получаем значения из полей ввода
    const volumeInput = document.getElementById('volumeInput');
    const densityInput = document.getElementById('densityInput');
    const gravityInput = document.getElementById('gravityInput');
    const volumeUnit = document.getElementById('volumeUnit').value;
    const densityUnit = document.getElementById('densityUnit').value;
    const forceUnit = document.getElementById('forceUnit').value;
    const resultElement = document.getElementById('forceResult');
    
    const volume = parseFloat(volumeInput.value);
    const density = parseFloat(densityInput.value);
    const gravity = parseFloat(gravityInput.value);
    
    // Проверяем введённые данные
    if (isNaN(volume) || isNaN(density) || isNaN(gravity)) {
        resultElement.value = 'Введите числа';
        return;
    }
    
    if (volume <= 0 || density <= 0 || gravity <= 0) {
        resultElement.value = 'Значения должны быть > 0';
        return;
    }
    
    // Конвертируем всё в базовые единицы (м³ и кг/м³)
    const volumeInM3 = volume * volumeUnits[volumeUnit];
    const densityInKgM3 = density * densityUnits[densityUnit];
    
    // Вычисляем архимедову силу в Н по формуле Fа = V * ρ * g
    const forceInN = volumeInM3 * densityInKgM3 * gravity;
    
    // Конвертируем в выбранные единицы силы
    const finalForce = forceInN / forceUnits[forceUnit];
    
    // Форматируем и выводим результат
    resultElement.value = finalForce.toFixed(6);
}

// Авторасчёт при изменении единиц измерения
document.getElementById('volumeUnit').addEventListener('change', calculateArchimedesForce);
document.getElementById('densityUnit').addEventListener('change', calculateArchimedesForce);
document.getElementById('forceUnit').addEventListener('change', calculateArchimedesForce);

// Авторасчёт при вводе чисел
document.getElementById('volumeInput').addEventListener('input', calculateArchimedesForce);
document.getElementById('densityInput').addEventListener('input', calculateArchimedesForce);