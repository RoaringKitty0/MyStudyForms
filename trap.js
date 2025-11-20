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

function calculateTrapezoidArea() {
    // Получаем значения из полей ввода
    const base1Input = document.getElementById('base1Input');
    const base2Input = document.getElementById('base2Input');
    const heightInput = document.getElementById('heightInput');
    const baseUnit = document.getElementById('baseUnit').value;
    const baseUnit2 = document.getElementById('baseUnit2').value;
    const heightUnit = document.getElementById('heightUnit').value;
    const areaUnit = document.getElementById('areaUnit').value;
    const resultElement = document.getElementById('areaResult');
    
    const base1 = parseFloat(base1Input.value);
    const base2 = parseFloat(base2Input.value);
    const height = parseFloat(heightInput.value);
    
    // Проверяем введённые данные
    if (isNaN(base1) || isNaN(base2) || isNaN(height)) {
        resultElement.value = 'Введите числа';
        return;
    }
    
    if (base1 <= 0 || base2 <= 0 || height <= 0) {
        resultElement.value = 'Значения должны быть > 0';
        return;
    }
    
    // Конвертируем всё в метры
    const base1InM = base1 * lengthUnits[baseUnit];
    const base2InM = base2 * lengthUnits[baseUnit2];
    const heightInM = height * lengthUnits[heightUnit];
    
    // Вычисляем площадь в м² по формуле S = (a + b) * h / 2
    const areaInM2 = ((base1InM + base2InM) * heightInM) / 2;
    
    // Конвертируем в выбранные единицы площади
    const finalArea = areaInM2 / areaUnits[areaUnit];
    
    // Форматируем и выводим результат
    resultElement.value = finalArea.toFixed(6);
}

// Авторасчёт при изменении единиц измерения
document.getElementById('baseUnit').addEventListener('change', calculateTrapezoidArea);
document.getElementById('baseUnit2').addEventListener('change', calculateTrapezoidArea);
document.getElementById('heightUnit').addEventListener('change', calculateTrapezoidArea);
document.getElementById('areaUnit').addEventListener('change', calculateTrapezoidArea);

// Авторасчёт при вводе чисел
document.getElementById('base1Input').addEventListener('input', calculateTrapezoidArea);
document.getElementById('base2Input').addEventListener('input', calculateTrapezoidArea);
document.getElementById('heightInput').addEventListener('input', calculateTrapezoidArea);