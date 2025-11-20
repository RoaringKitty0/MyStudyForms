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

function calculateRhombusArea() {
    // Получаем значения из полей ввода
    const diagonal1Input = document.getElementById('diagonal1Input');
    const diagonal2Input = document.getElementById('diagonal2Input');
    const diagonalUnit = document.getElementById('diagonalUnit').value;
    const diagonalUnit2 = document.getElementById('diagonalUnit2').value;
    const areaUnit = document.getElementById('areaUnit').value;
    const resultElement = document.getElementById('areaResult');
    
    const diagonal1 = parseFloat(diagonal1Input.value);
    const diagonal2 = parseFloat(diagonal2Input.value);
    
    // Проверяем введённые данные
    if (isNaN(diagonal1) || isNaN(diagonal2)) {
        resultElement.value = 'Введите числа';
        return;
    }
    
    if (diagonal1 <= 0 || diagonal2 <= 0) {
        resultElement.value = 'Значения должны быть > 0';
        return;
    }
    
    // Конвертируем всё в метры
    const diagonal1InM = diagonal1 * lengthUnits[diagonalUnit];
    const diagonal2InM = diagonal2 * lengthUnits[diagonalUnit2];
    
    // Вычисляем площадь в м² по формуле S = (d₁ * d₂) / 2
    const areaInM2 = (diagonal1InM * diagonal2InM) / 2;
    
    // Конвертируем в выбранные единицы площади
    const finalArea = areaInM2 / areaUnits[areaUnit];
    
    // Форматируем и выводим результат
    resultElement.value = finalArea.toFixed(6);
}

// Авторасчёт при изменении единиц измерения
document.getElementById('diagonalUnit').addEventListener('change', calculateRhombusArea);
document.getElementById('diagonalUnit2').addEventListener('change', calculateRhombusArea);
document.getElementById('areaUnit').addEventListener('change', calculateRhombusArea);

// Авторасчёт при вводе чисел
document.getElementById('diagonal1Input').addEventListener('input', calculateRhombusArea);
document.getElementById('diagonal2Input').addEventListener('input', calculateRhombusArea);