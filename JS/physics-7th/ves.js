// Коэффициенты конвертации для массы (относительно кг)
const massUnits = {
    'kg': 1,           // 1 кг = 1 кг
    'g': 0.001,        // 1 г = 0.001 кг
    'mg': 0.000001     // 1 мг = 0.000001 кг
};

// Коэффициенты конвертации для веса (относительно Н)
const weightUnits = {
    'N': 1,            // 1 Н = 1 Н
    'kN': 1000         // 1 кН = 1000 Н
};

function calculateWeight() {
    // Получаем значения из полей ввода
    const massInput = document.getElementById('massInput');
    const gravityInput = document.getElementById('gravityInput');
    const massUnit = document.getElementById('massUnit').value;
    const weightUnit = document.getElementById('weightUnit').value;
    const resultElement = document.getElementById('weightResult');
    
    const mass = parseFloat(massInput.value);
    const gravity = parseFloat(gravityInput.value);
    
    // Проверяем введённые данные
    if (isNaN(mass) || isNaN(gravity)) {
        resultElement.value = 'Введите числа';
        return;
    }
    
    if (mass <= 0 || gravity <= 0) {
        resultElement.value = 'Значения должны быть > 0';
        return;
    }
    
    // Конвертируем массу в кг
    const massInKg = mass * massUnits[massUnit];
    
    // Вычисляем вес в Н по формуле P = m * g
    const weightInN = massInKg * gravity;
    
    // Конвертируем в выбранные единицы веса
    const finalWeight = weightInN / weightUnits[weightUnit];
    
    // Форматируем и выводим результат
    resultElement.value = finalWeight.toFixed(6);
}

// Авторасчёт при изменении единиц измерения
document.getElementById('massUnit').addEventListener('change', calculateWeight);
document.getElementById('weightUnit').addEventListener('change', calculateWeight);
document.getElementById('gravityInput').addEventListener('input', calculateWeight);

// Авторасчёт при вводе массы
document.getElementById('massInput').addEventListener('input', calculateWeight);