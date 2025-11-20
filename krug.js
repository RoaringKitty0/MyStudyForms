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

function calculateCircleArea() {
    // Получаем значения из полей ввода
    const radiusInput = document.getElementById('radiusInput');
    const piInput = document.getElementById('piInput');
    const radiusUnit = document.getElementById('radiusUnit').value;
    const areaUnit = document.getElementById('areaUnit').value;
    const resultElement = document.getElementById('areaResult');
    
    const radius = parseFloat(radiusInput.value);
    const pi = parseFloat(piInput.value);
    
    // Проверяем введённые данные
    if (isNaN(radius) || isNaN(pi)) {
        resultElement.value = 'Введите числа';
        return;
    }
    
    if (radius <= 0 || pi <= 0) {
        resultElement.value = 'Значения должны быть > 0';
        return;
    }
    
    // Конвертируем радиус в метры
    const radiusInM = radius * lengthUnits[radiusUnit];
    
    // Вычисляем площадь в м² по формуле S = π * r²
    const areaInM2 = pi * radiusInM * radiusInM;
    
    // Конвертируем в выбранные единицы площади
    const finalArea = areaInM2 / areaUnits[areaUnit];
    
    // Форматируем и выводим результат
    resultElement.value = finalArea.toFixed(6);
}

// Авторасчёт при изменении единиц измерения
document.getElementById('radiusUnit').addEventListener('change', calculateCircleArea);
document.getElementById('areaUnit').addEventListener('change', calculateCircleArea);
document.getElementById('piInput').addEventListener('input', calculateCircleArea);

// Авторасчёт при вводе числа
document.getElementById('radiusInput').addEventListener('input', calculateCircleArea);