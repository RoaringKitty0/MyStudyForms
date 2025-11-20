// Коэффициенты конвертации для массы (относительно кг)
const massUnits = {
    'kg': 1,           // 1 кг = 1 кг
    'g': 0.001,        // 1 г = 0.001 кг
    'mg': 0.000001     // 1 мг = 0.000001 кг
};

// Коэффициенты конвертации для плотности (относительно кг/м³)
const densityUnits = {
    'kg_m3': 1,        // 1 кг/м³ = 1 кг/м³
    'g_cm3': 1000,     // 1 г/см³ = 1000 кг/м³
    'g_l': 1           // 1 г/л = 1 кг/м³
};

// Коэффициенты конвертации для объёма (относительно м³)
const volumeUnits = {
    'm3': 1,           // 1 м³ = 1 м³
    'cm3': 0.000001,   // 1 см³ = 0.000001 м³
    'l': 0.001,        // 1 л = 0.001 м³
    'ml': 0.000001     // 1 мл = 0.000001 м³
};

function calculateVolume() {
    // Получаем значения из полей ввода
    const massInput = document.getElementById('massInput');
    const densityInput = document.getElementById('densityInput');
    const massUnit = document.getElementById('massUnit').value;
    const densityUnit = document.getElementById('densityUnit').value;
    const volumeUnit = document.getElementById('volumeUnit').value;
    const resultElement = document.getElementById('volumeResult');
    
    const mass = parseFloat(massInput.value);
    const density = parseFloat(densityInput.value);
    
    // Проверяем введённые данные
    if (isNaN(mass) || isNaN(density)) {
        resultElement.value = 'Введите числа';
        return;
    }
    
    if (mass <= 0 || density <= 0) {
        resultElement.value = 'Значения должны быть > 0';
        return;
    }
    
    // Конвертируем всё в базовые единицы (кг и кг/м³)
    const massInKg = mass * massUnits[massUnit];
    const densityInKgM3 = density * densityUnits[densityUnit];
    
    // Вычисляем объём в м³ по формуле V = m / ρ
    const volumeInM3 = massInKg / densityInKgM3;
    
    // Конвертируем в выбранные единицы объёма
    const finalVolume = volumeInM3 / volumeUnits[volumeUnit];
    
    // Форматируем и выводим результат
    resultElement.value = finalVolume.toFixed(6);
}

// Авторасчёт при изменении единиц измерения
document.getElementById('massUnit').addEventListener('change', calculateVolume);
document.getElementById('densityUnit').addEventListener('change', calculateVolume);
document.getElementById('volumeUnit').addEventListener('change', calculateVolume);

// Авторасчёт при вводе чисел
document.getElementById('massInput').addEventListener('input', calculateVolume);
document.getElementById('densityInput').addEventListener('input', calculateVolume);