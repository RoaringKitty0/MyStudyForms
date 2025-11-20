// Коэффициенты конвертации для силы (относительно Н)
const forceUnits = {
    'N': 1,            // 1 Н = 1 Н
    'kN': 1000         // 1 кН = 1000 Н
};

// Коэффициенты конвертации для пути (относительно м)
const pathUnits = {
    'm': 1,            // 1 м = 1 м
    'cm': 0.01,        // 1 см = 0.01 м
    'km': 1000         // 1 км = 1000 м
};

// Коэффициенты конвертации для работы (относительно Дж)
const workUnits = {
    'J': 1,            // 1 Дж = 1 Дж
    'kJ': 1000,        // 1 кДж = 1000 Дж
    'MJ': 1000000      // 1 МДж = 1000000 Дж
};

function calculateWork() {
    // Получаем значения из полей ввода
    const forceInput = document.getElementById('forceInput');
    const pathInput = document.getElementById('pathInput');
    const forceUnit = document.getElementById('forceUnit').value;
    const pathUnit = document.getElementById('pathUnit').value;
    const workUnit = document.getElementById('workUnit').value;
    const resultElement = document.getElementById('workResult');
    
    const force = parseFloat(forceInput.value);
    const path = parseFloat(pathInput.value);
    
    // Проверяем введённые данные
    if (isNaN(force) || isNaN(path)) {
        resultElement.value = 'Введите числа';
        return;
    }
    
    if (force <= 0 || path <= 0) {
        resultElement.value = 'Значения должны быть > 0';
        return;
    }
    
    // Конвертируем всё в базовые единицы (Н и м)
    const forceInN = force * forceUnits[forceUnit];
    const pathInM = path * pathUnits[pathUnit];
    
    // Вычисляем работу в Дж по формуле A = F * S
    const workInJ = forceInN * pathInM;
    
    // Конвертируем в выбранные единицы работы
    const finalWork = workInJ / workUnits[workUnit];
    
    // Форматируем и выводим результат
    resultElement.value = finalWork.toFixed(6);
}

// Авторасчёт при изменении единиц измерения
document.getElementById('forceUnit').addEventListener('change', calculateWork);
document.getElementById('pathUnit').addEventListener('change', calculateWork);
document.getElementById('workUnit').addEventListener('change', calculateWork);

// Авторасчёт при вводе чисел
document.getElementById('forceInput').addEventListener('input', calculateWork);
document.getElementById('pathInput').addEventListener('input', calculateWork);