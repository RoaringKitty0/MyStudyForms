// Коэффициенты конвертации для силы (относительно Н)
const forceUnits = {
    'N': 1,            // 1 Н = 1 Н
    'kN': 1000         // 1 кН = 1000 Н
};

// Коэффициенты конвертации для площади (относительно м²)
const areaUnits = {
    'm2': 1,           // 1 м² = 1 м²
    'cm2': 0.0001,     // 1 см² = 0.0001 м²
    'mm2': 0.000001    // 1 мм² = 0.000001 м²
};

// Коэффициенты конвертации для давления (относительно Па)
const pressureUnits = {
    'Pa': 1,           // 1 Па = 1 Па
    'kPa': 1000,       // 1 кПа = 1000 Па
    'MPa': 1000000     // 1 МПа = 1000000 Па
};

function calculateSolidPressure() {
    // Получаем значения из полей ввода
    const forceInput = document.getElementById('forceInput');
    const areaInput = document.getElementById('areaInput');
    const forceUnit = document.getElementById('forceUnit').value;
    const areaUnit = document.getElementById('areaUnit').value;
    const pressureUnit = document.getElementById('pressureUnit').value;
    const resultElement = document.getElementById('pressureResult');
    
    const force = parseFloat(forceInput.value);
    const area = parseFloat(areaInput.value);
    
    // Проверяем введённые данные
    if (isNaN(force) || isNaN(area)) {
        resultElement.value = 'Введите числа';
        return;
    }
    
    if (force <= 0 || area <= 0) {
        resultElement.value = 'Значения должны быть > 0';
        return;
    }
    
    // Конвертируем всё в базовые единицы (Н и м²)
    const forceInN = force * forceUnits[forceUnit];
    const areaInM2 = area * areaUnits[areaUnit];
    
    // Вычисляем давление в Па по формуле p = F / S
    const pressureInPa = forceInN / areaInM2;
    
    // Конвертируем в выбранные единицы давления
    const finalPressure = pressureInPa / pressureUnits[pressureUnit];
    
    // Форматируем и выводим результат
    resultElement.value = finalPressure.toFixed(6);
}

// Авторасчёт при изменении единиц измерения
document.getElementById('forceUnit').addEventListener('change', calculateSolidPressure);
document.getElementById('areaUnit').addEventListener('change', calculateSolidPressure);
document.getElementById('pressureUnit').addEventListener('change', calculateSolidPressure);

// Авторасчёт при вводе чисел
document.getElementById('forceInput').addEventListener('input', calculateSolidPressure);
document.getElementById('areaInput').addEventListener('input', calculateSolidPressure);