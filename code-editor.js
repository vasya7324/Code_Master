// Code Editor functionality
document.addEventListener('DOMContentLoaded', function() {
    const codeInput = document.getElementById('codeInput');
    const codeOutput = document.getElementById('codeOutput');
    const runButton = document.getElementById('runCode');
    const resetButton = document.getElementById('resetCode');
    const languageSelect = document.getElementById('languageSelect');
    const copyButton = document.getElementById('copyCode');
    const editorTitle = document.getElementById('editorTitle');

    // Set initial code example
    codeInput.value = getCodeExample('python');

    // Run code
    runButton.addEventListener('click', executeCode);

    // Reset code
    resetButton.addEventListener('click', function() {
        const currentLanguage = languageSelect.value;
        codeInput.value = getCodeExample(currentLanguage);
        codeOutput.innerHTML = `
            <div class="output-placeholder">
                <i class="fas fa-terminal"></i>
                <p>Результат появится здесь после запуска кода</p>
            </div>
        `;
        showNotification('Код сброшен', 'info');
    });

    // Copy code
    copyButton.addEventListener('click', function() {
        navigator.clipboard.writeText(codeInput.value).then(() => {
            showNotification('Код скопирован в буфер обмена', 'success');
        });
    });

    // Language change
    languageSelect.addEventListener('change', function() {
        const language = this.value;
        const extension = getFileExtension(language);
        editorTitle.textContent = `example.${extension}`;
        codeInput.value = getCodeExample(language);
        showNotification(`Переключено на ${this.options[this.selectedIndex].text}`, 'info');
    });

    // Execute code based on language
    function executeCode() {
        const code = codeInput.value;
        const language = languageSelect.value;
        
        // Show loading
        codeOutput.innerHTML = `
            <div class="output-placeholder">
                <div class="loading"></div>
                <p>Выполнение кода...</p>
            </div>
        `;
        
        // Simulate execution delay
        setTimeout(() => {
            try {
                const result = simulateCodeExecution(code, language);
                codeOutput.innerHTML = `<pre class="output-success">${result}</pre>`;
            } catch (error) {
                codeOutput.innerHTML = `<pre class="output-error">Ошибка: ${error.message}</pre>`;
            }
        }, 1000);
    }

    // Simulate code execution (in real app this would connect to a backend)
    function simulateCodeExecution(code, language) {
        // This is a simulation - in a real app you'd send code to a backend for execution
        const simulations = {
            python: `Привет, Программист!
Удачи в изучении! 🚀

Числа Фибоначчи:
F(0) = 0
F(1) = 1
F(2) = 1
F(3) = 2
F(4) = 3
F(5) = 5
F(6) = 8
F(7) = 13
F(8) = 21
F(9) = 34

✅ Программа завершена успешно!`,
            
            javascript: `Данные пользователя: {
  "login": "octocat",
  "id": 583231,
  "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=4",
  "name": "The Octocat"
}
✅ Код выполнен успешно!`,
            
            java: `Привет, меня зовут Анна, мне 25 лет!
С днем рождения! Теперь мне 26 лет.
Привет, меня зовут Анна, мне 26 лет!`,
            
            cpp: `Исходный вектор: 5 2 8 1 9 
Отсортированный вектор: 1 2 5 8 9 
Найден элемент: 8
🎯 Программа завершена успешно!`,
            
            rust: `Привет, 
Получена строка: Привет, Rust!
Привет, Rust!`,
            
            go: `Воркер 1 начал задачу 1
Воркер 2 начал задачу 2
Воркер 3 начал задачу 3
Воркер 1 завершил задачу 1
Воркер 1 начал задачу 4
Воркер 2 завершил задачу 2
Воркер 2 начал задачу 5
Воркер 3 завершил задачу 3
Воркер 1 завершил задачу 4
Воркер 2 завершил задачу 5
✅ Все задачи завершены!`
        };
        
        return simulations[language] || `✅ Код на ${language} выполнен успешно!\n\nРезультат:\n${code.substring(0, 200)}...`;
    }
});

// Helper function to get file extension
function getFileExtension(language) {
    const extensions = {
        python: 'py',
        javascript: 'js',
        java: 'java',
        cpp: 'cpp',
        rust: 'rs',
        go: 'go'
    };
    return extensions[language] || 'txt';
}
// Update language select options in code-editor.js
const languageSelect = document.getElementById('languageSelect');
if (languageSelect) {
    languageSelect.innerHTML = `
        <option value="python">Python</option>
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
        <option value="csharp">C#</option>
        <option value="rust">Rust</option>
        <option value="go">Go</option>
        <option value="kotlin">Kotlin</option>
        <option value="swift">Swift</option>
        <option value="php">PHP</option>
        <option value="ruby">Ruby</option>
        <option value="sql">SQL</option>
        <option value="dart">Dart</option>
    `;
}

// Update file extensions for new languages
function getFileExtension(language) {
    const extensions = {
        python: 'py',
        javascript: 'js',
        typescript: 'ts',
        java: 'java',
        cpp: 'cpp',
        csharp: 'cs',
        rust: 'rs',
        go: 'go',
        kotlin: 'kt',
        swift: 'swift',
        php: 'php',
        ruby: 'rb',
        sql: 'sql',
        dart: 'dart'
    };
    return extensions[language] || 'txt';
}