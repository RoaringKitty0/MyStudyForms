function calculateColorCount() {
    // Получаем значения из полей ввода
    const depthInput = document.getElementById('depthInput');
    const resultElement = document.getElementById('colorResult');
    
    const depth = parseInt(depthInput.value);
    
    // Проверяем введённые данные
    if (isNaN(depth)) {
        resultElement.value = '';
        return;
    }
    
    if (depth <= 0) {
        resultElement.value = 'Глубина цвета должна быть > 0';
        return;
    }
    
    if (depth > 64) {
        resultElement.value = 'Слишком большое значение';
        return;
    }
    
    // Вычисляем количество цветов по формуле N = 2^i
    const colorCount = Math.pow(2, depth);
    
    // Форматируем и выводим результат
    if (colorCount >= 1000000) {
        // Для больших чисел используем форматирование с разделителями
        resultElement.value = formatLargeNumber(colorCount);
    } else {
        resultElement.value = colorCount.toLocaleString();
    }
}

// Функция для форматирования больших чисел
function formatLargeNumber(number) {
    if (number >= 1e9) {
        return (number / 1e9).toFixed(2) + ' млрд';
    } else if (number >= 1e6) {
        return (number / 1e6).toFixed(2) + ' млн';
    } else if (number >= 1e3) {
        return number.toLocaleString();
    } else {
        return number.toString();
    }
}

// Авторасчёт при вводе чисел
document.getElementById('depthInput').addEventListener('input', calculateColorCount);

// Функция для быстрого выбора распространённых значений
function setCommonDepth(depth) {
    document.getElementById('depthInput').value = depth;
    calculateColorCount();
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Очищаем поля ввода
    document.getElementById('depthInput').value = '';
    document.getElementById('colorResult').value = '';
});