// Коэффициенты конвертации для массы (относительно кг)
const massUnits = {
    'kg': 1,           // 1 кг = 1 кг
    'g': 0.001,        // 1 г = 0.001 кг
    'mg': 0.000001     // 1 мг = 0.000001 кг
};

// Коэффициенты конвертации для скорости (относительно м/с)
const velocityUnits = {
    'm_s': 1,          // 1 м/с = 1 м/с
    'km_h': 0.277778,  // 1 км/ч = 0.277778 м/с (1 / 3.6)
    'cm_s': 0.01       // 1 см/с = 0.01 м/с
};

// Коэффициенты конвертации для энергии (относительно Дж)
const energyUnits = {
    'J': 1,            // 1 Дж = 1 Дж
    'kJ': 1000,        // 1 кДж = 1000 Дж
    'MJ': 1000000      // 1 МДж = 1000000 Дж
};

function calculateKineticEnergy() {
    // Получаем значения из полей ввода
    const massInput = document.getElementById('massInput');
    const velocityInput = document.getElementById('velocityInput');
    const massUnit = document.getElementById('massUnit').value;
    const velocityUnit = document.getElementById('velocityUnit').value;
    const energyUnit = document.getElementById('energyUnit').value;
    const resultElement = document.getElementById('energyResult');
    
    const mass = parseFloat(massInput.value);
    const velocity = parseFloat(velocityInput.value);
    
    // Проверяем введённые данные
    if (isNaN(mass) || isNaN(velocity)) {
        resultElement.value = 'Введите числа';
        return;
    }
    
    if (mass <= 0 || velocity <= 0) {
        resultElement.value = 'Значения должны быть > 0';
        return;
    }
    
    // Конвертируем всё в базовые единицы (кг и м/с)
    const massInKg = mass * massUnits[massUnit];
    const velocityInMs = velocity * velocityUnits[velocityUnit];
    
    // Вычисляем кинетическую энергию в Дж по формуле Eк = (m * V²) / 2
    const energyInJ = (massInKg * velocityInMs * velocityInMs) / 2;
    
    // Конвертируем в выбранные единицы энергии
    const finalEnergy = energyInJ / energyUnits[energyUnit];
    
    // Форматируем и выводим результат
    resultElement.value = finalEnergy.toFixed(6);
}

// Авторасчёт при изменении единиц измерения
document.getElementById('massUnit').addEventListener('change', calculateKineticEnergy);
document.getElementById('velocityUnit').addEventListener('change', calculateKineticEnergy);
document.getElementById('energyUnit').addEventListener('change', calculateKineticEnergy);

// Авторасчёт при вводе чисел
document.getElementById('massInput').addEventListener('input', calculateKineticEnergy);
document.getElementById('velocityInput').addEventListener('input', calculateKineticEnergy);