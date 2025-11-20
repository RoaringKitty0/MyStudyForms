// Коэффициенты конвертации для длины (относительно м)
const lengthUnits = {
    'm': 1,            // 1 м = 1 м
    'cm': 0.01,        // 1 см = 0.01 м
    'mm': 0.001,       // 1 мм = 0.001 м
    'km': 1000         // 1 км = 1000 м
};

// Коэффициенты конвертации для площади (относительно м²)
const areaUnits = {
    'm2': 1,           // 1 м² = 1 м²
    'cm2': 0.0001,     // 1 см² = 0.0001 м²
    'mm2': 0.000001,   // 1 мм² = 0.000001 м²
    'km2': 1000000     // 1 км² = 1000000 м²
};

function calculateRectangleArea() {
    // Получаем значения из полей ввода
    const lengthInput = document.getElementById('lengthInput');
    const widthInput = document.getElementById('widthInput');
    const lengthUnit = document.getElementById('lengthUnit').value;
    const widthUnit = document.getElementById('widthUnit').value;
    const areaUnit = document.getElementById('areaUnit').value;
    const resultElement = document.getElementById('areaResult');
    
    const length = parseFloat(lengthInput.value);
    const width = parseFloat(widthInput.value);
    
    // Проверяем введённые данные
    if (isNaN(length) || isNaN(width)) {
        resultElement.value = 'Введите числа';
        return;
    }
    
    if (length <= 0 || width <= 0) {
        resultElement.value = 'Значения должны быть > 0';
        return;
    }
    
    // Конвертируем всё в метры
    const lengthInM = length * lengthUnits[lengthUnit];
    const widthInM = width * lengthUnits[widthUnit];
    
    // Вычисляем площадь в м² по формуле S = a * b
    const areaInM2 = lengthInM * widthInM;
    
    // Конвертируем в выбранные единицы площади
    const finalArea = areaInM2 / areaUnits[areaUnit];
    
    // Форматируем и выводим результат
    resultElement.value = finalArea.toFixed(6);
}

// Авторасчёт при изменении единиц измерения
document.getElementById('lengthUnit').addEventListener('change', calculateRectangleArea);
document.getElementById('widthUnit').addEventListener('change', calculateRectangleArea);
document.getElementById('areaUnit').addEventListener('change', calculateRectangleArea);

// Авторасчёт при вводе чисел
document.getElementById('lengthInput').addEventListener('input', calculateRectangleArea);
document.getElementById('widthInput').addEventListener('input', calculateRectangleArea);