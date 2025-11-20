// Коэффициенты конвертации для работы (относительно Дж)
const workUnits = {
    'J': 1,            // 1 Дж = 1 Дж
    'kJ': 1000,        // 1 кДж = 1000 Дж
    'MJ': 1000000      // 1 МДж = 1000000 Дж
};

// Коэффициенты конвертации для времени (относительно с)
const timeUnits = {
    's': 1,            // 1 с = 1 с
    'min': 60,         // 1 мин = 60 с
    'h': 3600          // 1 ч = 3600 с
};

// Коэффициенты конвертации для мощности (относительно Вт)
const powerUnits = {
    'W': 1,            // 1 Вт = 1 Вт
    'kW': 1000,        // 1 кВт = 1000 Вт
    'MW': 1000000      // 1 МВт = 1000000 Вт
};

function calculatePower() {
    // Получаем значения из полей ввода
    const workInput = document.getElementById('workInput');
    const timeInput = document.getElementById('timeInput');
    const workUnit = document.getElementById('workUnit').value;
    const timeUnit = document.getElementById('timeUnit').value;
    const powerUnit = document.getElementById('powerUnit').value;
    const resultElement = document.getElementById('powerResult');
    
    const work = parseFloat(workInput.value);
    const time = parseFloat(timeInput.value);
    
    // Проверяем введённые данные
    if (isNaN(work) || isNaN(time)) {
        resultElement.value = 'Введите числа';
        return;
    }
    
    if (work <= 0 || time <= 0) {
        resultElement.value = 'Значения должны быть > 0';
        return;
    }
    
    // Конвертируем всё в базовые единицы (Дж и с)
    const workInJ = work * workUnits[workUnit];
    const timeInS = time * timeUnits[timeUnit];
    
    // Вычисляем мощность в Вт по формуле N = A / t
    const powerInW = workInJ / timeInS;
    
    // Конвертируем в выбранные единицы мощности
    const finalPower = powerInW / powerUnits[powerUnit];
    
    // Форматируем и выводим результат
    resultElement.value = finalPower.toFixed(6);
}

// Авторасчёт при изменении единиц измерения
document.getElementById('workUnit').addEventListener('change', calculatePower);
document.getElementById('timeUnit').addEventListener('change', calculatePower);
document.getElementById('powerUnit').addEventListener('change', calculatePower);

// Авторасчёт при вводе чисел
document.getElementById('workInput').addEventListener('input', calculatePower);
document.getElementById('timeInput').addEventListener('input', calculatePower);