// Коэффициенты конвертации для массы (относительно кг)
const massUnits = {
    'kg': 1,           // 1 кг = 1 кг
    'g': 0.001,        // 1 г = 0.001 кг
    'mg': 0.000001     // 1 мг = 0.000001 кг
};

// Коэффициенты конвертации для силы (относительно Н)
const forceUnits = {
    'N': 1,            // 1 Н = 1 Н
    'kN': 1000         // 1 кН = 1000 Н
};

function calculateGravityForce() {
    // Получаем значения из полей ввода
    const massInput = document.getElementById('massInput');
    const gravityInput = document.getElementById('gravityInput');
    const massUnit = document.getElementById('massUnit').value;
    const forceUnit = document.getElementById('forceUnit').value;
    const resultElement = document.getElementById('forceResult');
    
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
    
    // Вычисляем силу тяжести в Н по формуле Fт = m * g
    const forceInN = massInKg * gravity;
    
    // Конвертируем в выбранные единицы силы
    const finalForce = forceInN / forceUnits[forceUnit];
    
    // Форматируем и выводим результат
    resultElement.value = finalForce.toFixed(6);
}

// Авторасчёт при изменении единиц измерения
document.getElementById('massUnit').addEventListener('change', calculateGravityForce);
document.getElementById('forceUnit').addEventListener('change', calculateGravityForce);
document.getElementById('gravityInput').addEventListener('input', calculateGravityForce);

// Авторасчёт при вводе массы
document.getElementById('massInput').addEventListener('input', calculateGravityForce);