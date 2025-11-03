// AI Helper System
class AIHelper {
    constructor() {
        this.chatHistory = [];
        this.isTyping = false;
        this.recentTopics = [];
        this.init();
    }

    init() {
        this.loadChatHistory();
        this.setupEventListeners();
        this.renderRecentTopics();
        this.setupQuickActions();
    }

    loadChatHistory() {
        // Загружаем историю чата из localStorage
        const savedHistory = localStorage.getItem('aiChatHistory');
        if (savedHistory) {
            this.chatHistory = JSON.parse(savedHistory);
            this.renderChatHistory();
        }

        // Загружаем недавние темы
        const savedTopics = localStorage.getItem('aiRecentTopics');
        if (savedTopics) {
            this.recentTopics = JSON.parse(savedTopics);
        }
    }

    setupEventListeners() {
        // Отправка сообщения по Enter
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        // Авто-сохранение кода
        const codeInput = document.getElementById('aiCodeInput');
        if (codeInput) {
            codeInput.addEventListener('input', this.debounce(() => {
                this.saveCode();
            }, 1000));
        }
    }

    setupQuickActions() {
        // Статистика AI помощника
        this.updateAIStats();
    }

    updateAIStats() {
        // В реальном приложении эти данные приходили бы с бэкенда
        document.getElementById('questionsAnswered').textContent = '1,247';
        document.getElementById('responseTime').textContent = '2.3с';
        document.getElementById('satisfactionRate').textContent = '94%';
    }

    renderRecentTopics() {
        const container = document.getElementById('recentTopics');
        if (!container) return;

        if (this.recentTopics.length === 0) {
            container.innerHTML = '<div class="recent-topic">Нет recent topics</div>';
            return;
        }

        container.innerHTML = this.recentTopics.slice(0, 5).map(topic => `
            <div class="recent-topic" onclick="aiHelper.loadTopic('${topic.id}')">
                ${topic.title}
            </div>
        `).join('');
    }

    renderChatHistory() {
        const container = document.getElementById('chatMessages');
        if (!container) return;

        container.innerHTML = this.chatHistory.map(message => `
            <div class="message ${message.type}-message">
                <div class="message-avatar">
                    <i class="fas fa-${message.type === 'user' ? 'user' : 'robot'}"></i>
                </div>
                <div class="message-content">
                    <div class="message-text">${this.formatMessage(message.content)}</div>
                    <div class="message-time">${this.formatTime(message.timestamp)}</div>
                </div>
            </div>
        `).join('');

        // Прокручиваем вниз
        this.scrollToBottom();
    }

    async sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();

        if (!message) return;

        // Добавляем сообщение пользователя
        this.addMessage('user', message);
        input.value = '';

        // Показываем индикатор набора
        this.showTypingIndicator();

        // Имитируем ответ AI
        setTimeout(() => {
            this.hideTypingIndicator();
            this.generateAIResponse(message);
        }, 2000);
    }

    addMessage(type, content) {
        const message = {
            type,
            content,
            timestamp: new Date().toISOString()
        };

        this.chatHistory.push(message);
        this.renderChatHistory();
        this.saveChatHistory();

        // Добавляем в recent topics если это вопрос
        if (type === 'user') {
            this.addToRecentTopics(content);
        }
    }

    showTypingIndicator() {
        this.isTyping = true;
        const container = document.getElementById('chatMessages');
        
        const typingElement = document.createElement('div');
        typingElement.className = 'message ai-message';
        typingElement.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <span>AI помощник печатает</span>
                    <div class="typing-dots">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(typingElement);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const container = document.getElementById('chatMessages');
        const typingElement = container.querySelector('.typing-indicator');
        if (typingElement) {
            typingElement.closest('.message').remove();
        }
    }

    async generateAIResponse(userMessage) {
        // В реальном приложении здесь был бы вызов к AI API
        let response = '';

        // Простой AI для демонстрации
        if (userMessage.toLowerCase().includes('привет') || userMessage.toLowerCase().includes('hello')) {
            response = 'Привет! Рад вас видеть. Чем могу помочь с программированием сегодня?';
        } else if (userMessage.toLowerCase().includes('цикл') || userMessage.toLowerCase().includes('loop')) {
            response = this.getLoopExplanation();
        } else if (userMessage.toLowerCase().includes('функция') || userMessage.toLowerCase().includes('function')) {
            response = this.getFunctionExplanation();
        } else if (userMessage.toLowerCase().includes('ошибка') || userMessage.toLowerCase().includes('error')) {
            response = this.getErrorHelp();
        } else if (userMessage.toLowerCase().includes('оптимизировать') || userMessage.toLowerCase().includes('optimize')) {
            response = this.getOptimizationTips();
        } else {
            response = this.getGeneralResponse();
        }

        this.addMessage('ai', response);
    }

    getLoopExplanation() {
        return `
            <h4>Циклы в программировании</h4>
            <p>Циклы позволяют повторять блок кода несколько раз. Основные типы циклов:</p>
            
            <h5>1. Цикл for (для)</h5>
            <pre><code class="python"># Python
for i in range(5):
    print(i)  # Выведет 0, 1, 2, 3, 4

# JavaScript
for (let i = 0; i < 5; i++) {
    console.log(i);
}</code></pre>

            <h5>2. Цикл while (пока)</h5>
            <pre><code class="python"># Python
count = 0
while count < 5:
    print(count)
    count += 1</code></pre>

            <p><strong>Когда использовать:</strong></p>
            <ul>
                <li><code>for</code> - когда известно количество итераций</li>
                <li><code>while</code> - когда условие зависит от изменяющихся данных</li>
            </ul>
        `;
    }

    getFunctionExplanation() {
        return `
            <h4>Функции в программировании</h4>
            <p>Функции - это блоки кода, которые выполняют определенную задачу и могут быть переиспользованы.</p>
            
            <h5>Пример функции в Python:</h5>
            <pre><code class="python">def calculate_sum(a, b):
    \"\"\"
    Эта функция возвращает сумму двух чисел
    \"\"\"
    return a + b

# Использование
result = calculate_sum(5, 3)
print(result)  # Выведет 8</code></pre>

            <h5>Ключевые преимущества функций:</h5>
            <ul>
                <li>🚀 <strong>Переиспользование кода</strong> - одна функция может вызываться много раз</li>
                <li>🧩 <strong>Модульность</strong> - разбиваем сложные задачи на простые части</li>
                <li>🔧 <strong>Обслуживаемость</strong> - легче находить и исправлять ошибки</li>
                <li>📚 <strong>Читаемость</strong> - код становится более понятным</li>
            </ul>

            <h5>Параметры и аргументы:</h5>
            <pre><code class="python"># Параметры - это переменные в определении функции
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

# Аргументы - это значения, передаваемые при вызове
print(greet("Anna"))  # "Hello, Anna!"
print(greet("Max", "Hi"))  # "Hi, Max!"</code></pre>
        `;
    }

    getErrorHelp() {
        return `
            <h4>Поиск и исправление ошибок</h4>
            <p>Вот системный подход к отладке кода:</p>

            <h5>1. Понимание типа ошибки</h5>
            <ul>
                <li>🔴 <strong>Синтаксические ошибки</strong> - неправильный синтаксис, код не запускается</li>
                <li>🟡 <strong>Ошибки времени выполнения</strong> - код запускается, но падает при выполнении</li>
                <li>🔵 <strong>Логические ошибки</strong> - код работает, но выдает неправильный результат</li>
            </ul>

            <h5>2. Методы отладки</h5>
            <pre><code class="python"># Используйте print для отслеживания значений
def problematic_function(data):
    print(f"Входные данные: {data}")  # Отладочный вывод
    result = data * 2
    print(f"Результат: {result}")  # Проверяем вычисления
    return result</code></pre>

            <h5>3. Распространенные ошибки в Python:</h5>
            <pre><code class="python"># 1. NameError - переменная не определена
print(undefined_variable)  # Ошибка!

# 2. TypeError - несовместимые типы
"5" + 5  # Ошибка! Нельзя складывать строку и число

# 3. IndexError - выход за границы списка
my_list = [1, 2, 3]
print(my_list[5])  # Ошибка!

# 4. ZeroDivisionError - деление на ноль
10 / 0  # Ошибка!</code></pre>

            <p><strong>Совет:</strong> Внимательно читайте сообщения об ошибках - они часто содержат точное описание проблемы и номер строки.</p>
        `;
    }

    getOptimizationTips() {
        return `
            <h4>Оптимизация кода</h4>
            <p>Вот ключевые стратегии для улучшения производительности вашего кода:</p>

            <h5>1. Алгоритмическая оптимизация</h5>
            <pre><code class="python"># Медленно: O(n²)
def find_duplicates_slow(arr):
    duplicates = []
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] == arr[j]:
                duplicates.append(arr[i])
    return duplicates

# Быстро: O(n)
def find_duplicates_fast(arr):
    seen = set()
    duplicates = []
    for item in arr:
        if item in seen:
            duplicates.append(item)
        else:
            seen.add(item)
    return duplicates</code></pre>

            <h5>2. Использование встроенных функций</h5>
            <pre><code class="python"># Медленно
result = []
for item in my_list:
    result.append(item * 2)

# Быстро (list comprehension)
result = [item * 2 for item in my_list]</code></pre>

            <h5>3. Эффективная работа с памятью</h5>
            <ul>
                <li>Используйте генераторы для больших данных</li>
                <li>Избегайте ненужного копирования объектов</li>
                <li>Закрывайте файлы и соединения после использования</li>
            </ul>

            <h5>4. Профилирование кода</h5>
            <pre><code class="python">import time
import cProfile

# Измерение времени
start_time = time.time()
# ваш код
end_time = time.time()
print(f"Время выполнения: {end_time - start_time:.2f} секунд")

# Детальное профилирование
cProfile.run('your_function()')</code></pre>
        `;
    }

    getGeneralResponse() {
        const responses = [
            "Интересный вопрос! Могу подробно объяснить эту концепцию программирования.",
            "Отличный вопрос! Давайте разберем это шаг за шагом.",
            "Это важная тема в программировании. Вот что вам нужно знать:",
            "Позвольте мне объяснить это понятными примерами и аналогиями.",
            "Отличная возможность изучить новые концепции! Вот что я могу рассказать:"
        ];

        const examples = [
            "Например, рассмотрим простой код на Python:",
            "Вот практический пример, который иллюстрирует эту концепцию:",
            "Давайте посмотрим на реальный пример из практики:"
        ];

        return `
            <p>${responses[Math.floor(Math.random() * responses.length)]}</p>
            <p>${examples[Math.floor(Math.random() * examples.length)]}</p>
            
            <pre><code class="python"># Пример кода для демонстрации
def example_function():
    # Это пример хорошо структурированного кода
    data = [1, 2, 3, 4, 5]
    result = sum(x * 2 for x in data if x % 2 == 0)
    return result

print(f"Результат: {example_function()}")</code></pre>

            <p>Хотите, чтобы я углубился в какую-то конкретную часть или у вас есть другой вопрос?</p>
        `;
    }

    askQuickQuestion(type) {
        const questions = {
            'explain': 'Не могли бы вы объяснить этот код и как он работает?',
            'debug': 'Помогите найти ошибку в этом коде и исправить ее.',
            'optimize': 'Как можно оптимизировать этот код для лучшей производительности?',
            'best-practices': 'Какие лучшие практики можно применить к этому коду?'
        };

        const question = questions[type];
        if (question) {
            document.getElementById('chatInput').value = question;
            this.sendMessage();
        }
    }

    useSuggestion(suggestion) {
        document.getElementById('chatInput').value = suggestion;
    }

    async analyzeCode() {
        const code = document.getElementById('aiCodeInput').value;
        const language = document.getElementById('aiLanguageSelect').value;

        if (!code.trim()) {
            auth.showNotification('Пожалуйста, введите код для анализа', 'error');
            return;
        }

        // Показываем индикатор анализа
        this.showAnalysisIndicator();

        // Имитируем анализ кода AI
        setTimeout(() => {
            this.hideAnalysisIndicator();
            this.showCodeAnalysis(code, language);
        }, 3000);
    }

    showAnalysisIndicator() {
        const output = document.getElementById('aiCodeOutput');
        const content = document.getElementById('aiOutputContent');
        
        output.style.display = 'block';
        content.innerHTML = `
            <div class="typing-indicator">
                <span>AI анализирует код</span>
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
    }

    hideAnalysisIndicator() {
        // Уже скрывается автоматически при показе результатов
    }

    showCodeAnalysis(code, language) {
        const content = document.getElementById('aiOutputContent');
        
        // Простой анализ для демонстрации
        const hasFunctions = code.includes('def ') || code.includes('function ');
        const hasLoops = code.includes('for ') || code.includes('while ');
        const hasComments = code.includes('#') || code.includes('//');
        
        let analysis = `
            <h4>🔍 Анализ кода</h4>
            <div class="analysis-summary">
                <div class="analysis-item ${hasFunctions ? 'positive' : 'warning'}">
                    <strong>Функции:</strong> ${hasFunctions ? '✅ Обнаружены' : '⚠️ Не обнаружены'}
                </div>
                <div class="analysis-item ${hasLoops ? 'positive' : 'neutral'}">
                    <strong>Циклы:</strong> ${hasLoops ? '✅ Обнаружены' : '➖ Не обнаружены'}
                </div>
                <div class="analysis-item ${hasComments ? 'positive' : 'warning'}">
                    <strong>Комментарии:</strong> ${hasComments ? '✅ Присутствуют' : '⚠️ Отсутствуют'}
                </div>
            </div>
        `;

        // Добавляем рекомендации
        analysis += `
            <h4>💡 Рекомендации</h4>
            <ul>
                ${!hasFunctions ? '<li>🎯 Рассмотрите выделение логики в отдельные функции для улучшения читаемости</li>' : ''}
                ${!hasComments ? '<li>📝 Добавьте комментарии для объяснения сложных частей кода</li>' : ''}
                <li>⚡ Проверьте сложность алгоритмов - стремитесь к O(n) или O(log n)</li>
                <li>🔧 Используйте осмысленные имена переменных и функций</li>
                <li>📚 Следуйте стилю кодирования для ${language}</li>
            </ul>
        `;

        // Добавляем пример улучшения
        analysis += `
            <h4>🔄 Пример улучшения</h4>
            <pre><code class="${language}"># До
numbers = [1, 2, 3, 4, 5]
result = []
for i in range(len(numbers)):
    if numbers[i] % 2 == 0:
        result.append(numbers[i] * 2)

# После (более питонично)
numbers = [1, 2, 3, 4, 5]
result = [x * 2 for x in numbers if x % 2 == 0]</code></pre>
        `;

        content.innerHTML = analysis;
    }

    explainCode() {
        const code = document.getElementById('aiCodeInput').value;
        
        if (!code.trim()) {
            auth.showNotification('Пожалуйста, введите код для объяснения', 'error');
            return;
        }

        // Добавляем вопрос в чат
        this.addMessage('user', 'Объясни этот код: ' + code);
        
        // Генерируем объяснение
        setTimeout(() => {
            const explanation = this.generateCodeExplanation(code);
            this.addMessage('ai', explanation);
        }, 2000);
    }

    generateCodeExplanation(code) {
        return `
            <h4>📖 Объяснение кода</h4>
            <p>Давайте разберем ваш код по частям:</p>

            <h5>Структура кода:</h5>
            <pre><code class="python">${code}</code></pre>

            <h5>Ключевые элементы:</h5>
            <ul>
                <li><strong>Функция fibonacci</strong> - рекурсивная функция для вычисления чисел Фибоначчи</li>
                <li><strong>Базовый случай</strong> - если n ≤ 1, возвращаем n (условие выхода из рекурсии)</li>
                <li><strong>Рекурсивный вызов</strong> - функция вызывает саму себя для n-1 и n-2</li>
                <li><strong>Пример использования</strong> - вызов функции для n=10</li>
            </ul>

            <h5>Как это работает:</h5>
            <p>Функция использует рекурсию для вычисления n-ного числа Фибоначчи. Для n=10 она будет вычислять:</p>
            <pre>fib(10) = fib(9) + fib(8)
fib(9) = fib(8) + fib(7)
...
пока не дойдет до базовых случаев fib(1)=1 и fib(0)=0</pre>

            <h5>Временная сложность:</h5>
            <p>O(2ⁿ) - экспоненциальная, что неэффективно для больших n.</p>

            <h5>Улучшения:</h5>
            <pre><code class="python"># Более эффективная версия с мемоизацией
def fibonacci_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci_memo(n-1, memo) + fibonacci_memo(n-2, memo)
    return memo[n]</code></pre>
        `;
    }

    runCode() {
        const code = document.getElementById('aiCodeInput').value;
        const output = document.getElementById('aiCodeOutput');
        const content = document.getElementById('aiOutputContent');

        output.style.display = 'block';
        
        // Симуляция выполнения кода
        try {
            // В реальном приложении здесь был бы вызов к бэкенду для выполнения кода
            content.innerHTML = `
                <div style="color: var(--accent);">
                    ✅ Код выполнен успешно!
                </div>
                <div style="margin-top: var(--space-md);">
                    <strong>Вывод:</strong><br>
                    55
                </div>
                <div style="margin-top: var(--space-md); color: var(--gray-500);">
                    Время выполнения: 0.002с<br>
                    Использовано памяти: 2.1 MB
                </div>
            `;
        } catch (error) {
            content.innerHTML = `
                <div style="color: var(--danger);">
                    ❌ Ошибка выполнения!
                </div>
                <div style="margin-top: var(--space-md);">
                    <strong>Сообщение об ошибке:</strong><br>
                    ${error.message}
                </div>
            `;
        }
    }

    formatCode() {
        const codeInput = document.getElementById('aiCodeInput');
        const code = codeInput.value;
        
        // Простое форматирование для демонстрации
        const formatted = code
            .replace(/\n\s*\n/g, '\n\n') // Убираем лишние пустые строки
            .replace(/\t/g, '    ') // Заменяем табы на пробелы
            .replace(/\s+$/gm, ''); // Убираем пробелы в конце строк

        codeInput.value = formatted;
        auth.showNotification('Код отформатирован', 'success');
    }

    clearCode() {
        document.getElementById('aiCodeInput').value = '';
        document.getElementById('aiCodeOutput').style.display = 'none';
    }

    insertCodeTemplate() {
        const templates = {
            'python': `def main():\n    # Ваш код здесь\n    pass\n\nif __name__ == "__main__":\n    main()`,
            'javascript': `function main() {\n    // Ваш код здесь\n}\n\nmain();`,
            'java': `public class Main {\n    public static void main(String[] args) {\n        // Ваш код здесь\n    }\n}`,
            'cpp': `#include <iostream>\n\nint main() {\n    // Ваш код здесь\n    return 0;\n}`,
            'sql': `-- Ваш SQL запрос здесь\nSELECT * FROM table_name;`
        };

        const language = document.getElementById('aiLanguageSelect').value;
        const template = templates[language] || '// Ваш код здесь';
        
        document.getElementById('aiCodeInput').value = template;
        auth.showNotification(`Шаблон для ${language} добавлен`, 'info');
    }

    clearChat() {
        if (confirm('Вы уверены, что хотите очистить историю чата?')) {
            this.chatHistory = [];
            this.renderChatHistory();
            this.saveChatHistory();
            auth.showNotification('Чат очищен', 'success');
        }
    }

    exportChat() {
        const chatText = this.chatHistory.map(msg => 
            `${msg.type === 'user' ? 'Вы' : 'AI'}: ${msg.content}`
        ).join('\n\n');

        const blob = new Blob([chatText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ai-chat-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        auth.showNotification('Чат экспортирован', 'success');
    }

    addToRecentTopics(content) {
        const topic = {
            id: Date.now().toString(),
            title: content.length > 50 ? content.substring(0, 50) + '...' : content,
            content: content,
            timestamp: new Date().toISOString()
        };

        this.recentTopics.unshift(topic);
        if (this.recentTopics.length > 10) {
            this.recentTopics = this.recentTopics.slice(0, 10);
        }

        this.saveRecentTopics();
        this.renderRecentTopics();
    }

    saveChatHistory() {
        localStorage.setItem('aiChatHistory', JSON.stringify(this.chatHistory));
    }

    saveRecentTopics() {
        localStorage.setItem('aiRecentTopics', JSON.stringify(this.recentTopics));
    }

    saveCode() {
        const code = document.getElementById('aiCodeInput').value;
        localStorage.setItem('aiCurrentCode', code);
    }

    formatMessage(content) {
        // Простой форматировщик для демонстрации
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;

        if (diff < 60000) return 'Только что';
        if (diff < 3600000) return `${Math.floor(diff / 60000)} мин назад`;
        if (diff < 86400000) return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        
        return date.toLocaleDateString('ru-RU');
    }

    scrollToBottom() {
        const container = document.getElementById('chatMessages');
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Инициализация AI помощника
const aiHelper = new AIHelper();