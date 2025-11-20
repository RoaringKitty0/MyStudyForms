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

function calculateSquareArea() {
    // Получаем значения из полей ввода
    const sideInput = document.getElementById('sideInput');
    const sideUnit = document.getElementById('sideUnit').value;
    const areaUnit = document.getElementById('areaUnit').value;
    const resultElement = document.getElementById('areaResult');
    
    const side = parseFloat(sideInput.value);
    
    // Проверяем введённые данные
    if (isNaN(side)) {
        resultElement.value = 'Введите число';
        return;
    }
    
    if (side <= 0) {
        resultElement.value = 'Значение должно быть > 0';
        return;
    }
    
    // Конвертируем сторону в метры
    const sideInM = side * lengthUnits[sideUnit];
    
    // Вычисляем площадь в м² по формуле S = a²
    const areaInM2 = sideInM * sideInM;
    
    // Конвертируем в выбранные единицы площади
    const finalArea = areaInM2 / areaUnits[areaUnit];
    
    // Форматируем и выводим результат
    resultElement.value = finalArea.toFixed(6);
}

// Авторасчёт при изменении единиц измерения
document.getElementById('sideUnit').addEventListener('change', calculateSquareArea);
document.getElementById('areaUnit').addEventListener('change', calculateSquareArea);

// Авторасчёт при вводе числа
document.getElementById('sideInput').addEventListener('input', calculateSquareArea);