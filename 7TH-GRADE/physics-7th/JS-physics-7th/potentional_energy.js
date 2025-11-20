// Коэффициенты конвертации для массы (относительно кг)
const massUnits = {
    'kg': 1,           // 1 кг = 1 кг
    'g': 0.001,        // 1 г = 0.001 кг
    'mg': 0.000001     // 1 мг = 0.000001 кг
};

// Коэффициенты конвертации для высоты (относительно м)
const heightUnits = {
    'm': 1,            // 1 м = 1 м
    'cm': 0.01,        // 1 см = 0.01 м
    'mm': 0.001        // 1 мм = 0.001 м
};

// Коэффициенты конвертации для энергии (относительно Дж)
const energyUnits = {
    'J': 1,            // 1 Дж = 1 Дж
    'kJ': 1000,        // 1 кДж = 1000 Дж
    'MJ': 1000000      // 1 МДж = 1000000 Дж
};

function calculatePotentialEnergy() {
    // Получаем значения из полей ввода
    const massInput = document.getElementById('massInput');
    const heightInput = document.getElementById('heightInput');
    const gravityInput = document.getElementById('gravityInput');
    const massUnit = document.getElementById('massUnit').value;
    const heightUnit = document.getElementById('heightUnit').value;
    const energyUnit = document.getElementById('energyUnit').value;
    const resultElement = document.getElementById('energyResult');
    
    const mass = parseFloat(massInput.value);
    const height = parseFloat(heightInput.value);
    const gravity = parseFloat(gravityInput.value);
    
    // Проверяем введённые данные
    if (isNaN(mass) || isNaN(height) || isNaN(gravity)) {
        resultElement.value = 'Введите числа';
        return;
    }
    
    if (mass <= 0 || height <= 0 || gravity <= 0) {
        resultElement.value = 'Значения должны быть > 0';
        return;
    }
    
    // Конвертируем всё в базовые единицы (кг и м)
    const massInKg = mass * massUnits[massUnit];
    const heightInM = height * heightUnits[heightUnit];
    
    // Вычисляем потенциальную энергию в Дж по формуле Eп = m * g * h
    const energyInJ = massInKg * gravity * heightInM;
    
    // Конвертируем в выбранные единицы энергии
    const finalEnergy = energyInJ / energyUnits[energyUnit];
    
    // Форматируем и выводим результат
    resultElement.value = finalEnergy.toFixed(6);
}

// Авторасчёт при изменении единиц измерения
document.getElementById('massUnit').addEventListener('change', calculatePotentialEnergy);
document.getElementById('heightUnit').addEventListener('change', calculatePotentialEnergy);
document.getElementById('energyUnit').addEventListener('change', calculatePotentialEnergy);
document.getElementById('gravityInput').addEventListener('input', calculatePotentialEnergy);

// Авторасчёт при вводе чисел
document.getElementById('massInput').addEventListener('input', calculatePotentialEnergy);
document.getElementById('heightInput').addEventListener('input', calculatePotentialEnergy);