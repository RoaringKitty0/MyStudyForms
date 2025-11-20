// Коэффициенты конвертации для работы (относительно Дж)
const workUnits = {
    'J': 1,            // 1 Дж = 1 Дж
    'kJ': 1000,        // 1 кДж = 1000 Дж
    'MJ': 1000000      // 1 МДж = 1000000 Дж
};

function calculateEfficiency() {
    // Получаем значения из полей ввода
    const usefulWorkInput = document.getElementById('usefulWorkInput');
    const totalWorkInput = document.getElementById('totalWorkInput');
    const workUnit = document.getElementById('workUnit').value;
    const workUnit2 = document.getElementById('workUnit2').value;
    const resultElement = document.getElementById('efficiencyResult');
    
    const usefulWork = parseFloat(usefulWorkInput.value);
    const totalWork = parseFloat(totalWorkInput.value);
    
    // Проверяем введённые данные
    if (isNaN(usefulWork) || isNaN(totalWork)) {
        resultElement.value = 'Введите числа';
        return;
    }
    
    if (usefulWork <= 0 || totalWork <= 0) {
        resultElement.value = 'Значения должны быть > 0';
        return;
    }
    
    if (usefulWork > totalWork) {
        resultElement.value = 'Полезная работа не может быть больше затраченной';
        return;
    }
    
    // Конвертируем всё в базовые единицы (Дж)
    const usefulWorkInJ = usefulWork * workUnits[workUnit];
    const totalWorkInJ = totalWork * workUnits[workUnit2];
    
    // Вычисляем КПД в процентах по формуле η = (A_полезная / A_затраченная) * 100%
    const efficiency = (usefulWorkInJ / totalWorkInJ) * 100;
    
    // Форматируем и выводим результат
    if (efficiency > 100) {
        resultElement.value = 'Ошибка: КПД > 100%';
    } else {
        resultElement.value = efficiency.toFixed(2);
    }
}

// Авторасчёт при изменении единиц измерения
document.getElementById('workUnit').addEventListener('change', calculateEfficiency);
document.getElementById('workUnit2').addEventListener('change', calculateEfficiency);

// Авторасчёт при вводе чисел
document.getElementById('usefulWorkInput').addEventListener('input', calculateEfficiency);
document.getElementById('totalWorkInput').addEventListener('input', calculateEfficiency);