// Lesson Management System
class LessonSystem {
    constructor() {
        this.course = null;
        this.lessons = [];
        this.currentLesson = null;
        this.currentLessonIndex = 0;
        this.quizAnswers = [];
        this.startTime = null;
        this.init();
    }

    async init() {
        await this.loadLessonData();
        this.setupEventListeners();
        this.renderLessonContent();
        this.startTimer();
    }

    async loadLessonData() {
        const urlParams = new URLSearchParams(window.location.search);
        const courseId = urlParams.get('course');
        const lessonId = urlParams.get('lesson');

        if (!courseId || !lessonId) {
            window.location.href = 'courses.html';
            return;
        }

        // Загружаем данные курса и уроков
        this.course = await this.fetchCourseData(courseId);
        this.lessons = await this.fetchLessons(courseId);
        
        // Находим текущий урок
        this.currentLessonIndex = this.lessons.findIndex(lesson => lesson.id === lessonId);
        this.currentLesson = this.lessons[this.currentLessonIndex];
        
        if (!this.currentLesson) {
            window.location.href = 'course-detail.html?id=' + courseId;
            return;
        }

        this.renderSidebar();
        this.updateNavigation();
    }

    async fetchCourseData(courseId) {
        // Мок данные курса
        const courses = {
            'python-beginner': {
                id: 'python-beginner',
                title: 'Python для начинающих',
                progress: 35
            }
        };
        return courses[courseId];
    }

    async fetchLessons(courseId) {
        // Мок данные уроков
        return [
            {
                id: 'python-intro',
                title: 'Введение в Python',
                duration: '15 мин',
                type: 'theory',
                completed: true,
                content: this.getTheoryContent('python-intro')
            },
            {
                id: 'python-variables',
                title: 'Переменные и типы данных',
                duration: '20 мин',
                type: 'theory',
                completed: false,
                content: this.getTheoryContent('python-variables')
            },
            {
                id: 'python-practice-1',
                title: 'Практика: Калькулятор',
                duration: '30 мин',
                type: 'practice',
                completed: false,
                content: this.getPracticeContent('python-practice-1')
            },
            {
                id: 'python-quiz-1',
                title: 'Тест: Основы Python',
                duration: '15 мин',
                type: 'quiz',
                completed: false,
                content: this.getQuizContent('python-quiz-1')
            }
        ];
    }

    getTheoryContent(lessonId) {
        const theoryContent = {
            'python-intro': {
                title: 'Введение в Python',
                sections: [
                    {
                        title: 'Что такое Python?',
                        content: `
                            <p>Python — это высокоуровневый язык программирования общего назначения, который отличается простым и понятным синтаксисом. Он был создан Гвидо ван Россумом и впервые выпущен в 1991 году.</p>
                            
                            <h3>Основные особенности Python:</h3>
                            <ul>
                                <li>📝 <strong>Простой синтаксис</strong> - легко читать и писать код</li>
                                <li>🚀 <strong>Высокоуровневый</strong> - не нужно заботиться о низкоуровневых деталях</li>
                                <li>🔧 <strong>Интерпретируемый</strong> - код выполняется построчно</li>
                                <li>📚 <strong>Большая стандартная библиотека</strong> - много готовых модулей</li>
                                <li>👥 <strong>Сообщество</strong> - активная поддержка разработчиков</li>
                            </ul>
                            
                            <div class="code-example">
                                <pre><code class="python"># Ваша первая программа на Python
print("Привет, мир!")</code></pre>
                            </div>
                            
                            <p>Эта простая программа выводит текст "Привет, мир!" в консоль. Функция <code>print()</code> используется для вывода информации.</p>
                        `
                    },
                    {
                        title: 'Области применения',
                        content: `
                            <p>Python используется в различных областях:</p>
                            
                            <h4>🌐 Веб-разработка</h4>
                            <p>Django, Flask - фреймворки для создания веб-приложений</p>
                            
                            <h4>📊 Data Science</h4>
                            <p>Анализ данных, машинное обучение, визуализация</p>
                            
                            <h4>🤖 Автоматизация</h4>
                            <p>Скрипты для автоматизации рутинных задач</p>
                            
                            <h4>🎮 Разработка игр</h4>
                            <p>Pygame, создание прототипов игр</p>
                        `
                    }
                ]
            },
            'python-variables': {
                title: 'Переменные и типы данных',
                sections: [
                    {
                        title: 'Что такое переменные?',
                        content: `
                            <p>Переменные — это именованные контейнеры для хранения данных. В Python не нужно объявлять тип переменной — он определяется автоматически.</p>
                            
                            <div class="code-example">
                                <pre><code class="python"># Создание переменных
name = "Анна"           # Строка (str)
age = 25                # Целое число (int)
height = 1.75           # Дробное число (float)
is_student = True       # Логическое значение (bool)</code></pre>
                            </div>
                        `
                    },
                    {
                        title: 'Основные типы данных',
                        content: `
                            <h4>📝 Строки (str)</h4>
                            <p>Используются для хранения текста</p>
                            
                            <div class="code-example">
                                <pre><code class="python">name = "Иван"
message = 'Привет, мир!'
multiline = """Это
многострочная
строка"""</code></pre>
                            </div>
                            
                            <h4>🔢 Числа</h4>
                            <p><strong>Целые (int):</strong> 10, -5, 1000</p>
                            <p><strong>Дробные (float):</strong> 3.14, -2.5, 0.0</p>
                            
                            <h4>✅ Логические (bool)</h4>
                            <p><code>True</code> или <code>False</code></p>
                            
                            <h4>📦 Списки (list)</h4>
                            <p>Упорядоченные коллекции элементов</p>
                            
                            <div class="code-example">
                                <pre><code class="python">fruits = ["яблоко", "банан", "апельсин"]
numbers = [1, 2, 3, 4, 5]</code></pre>
                            </div>
                        `
                    }
                ]
            }
        };

        return theoryContent[lessonId];
    }

    getPracticeContent(lessonId) {
        const practiceContent = {
            'python-practice-1': {
                title: 'Создание простого калькулятора',
                description: 'В этом задании вы создадите простой калькулятор, который сможет выполнять основные арифметические операции.',
                task: `
                    <h3>Задача:</h3>
                    <p>Напишите программу, которая:</p>
                    <ol>
                        <li>Запрашивает у пользователя два числа</li>
                        <li>Запрашивает операцию (+, -, *, /)</li>
                        <li>Выполняет выбранную операцию и выводит результат</li>
                    </ol>
                    
                    <h3>Пример работы:</h3>
                    <div class="code-example">
                        <pre><code>Введите первое число: 10
Введите второе число: 5
Выберите операцию (+, -, *, /): *
Результат: 50</code></pre>
                    </div>
                `,
                starterCode: `# Ваш код здесь
# Запросите первое число

# Запросите второе число

# Запросите операцию

# Выполните операцию и выведите результат`,
                solution: `# Решение
num1 = float(input("Введите первое число: "))
num2 = float(input("Введите второе число: "))
operation = input("Выберите операцию (+, -, *, /): ")

if operation == '+':
    result = num1 + num2
elif operation == '-':
    result = num1 - num2
elif operation == '*':
    result = num1 * num2
elif operation == '/':
    if num2 != 0:
        result = num1 / num2
    else:
        result = "Ошибка: деление на ноль"
else:
    result = "Неверная операция"

print("Результат:", result)`,
                tests: [
                    { input: '10\n5\n*', expected: 'Результат: 50.0' },
                    { input: '15\n3\n/', expected: 'Результат: 5.0' },
                    { input: '8\n0\n/', expected: 'Ошибка: деление на ноль' }
                ]
            }
        };

        return practiceContent[lessonId];
    }

    getQuizContent(lessonId) {
        const quizContent = {
            'python-quiz-1': {
                title: 'Тест: Основы Python',
                questions: [
                    {
                        id: 1,
                        question: 'Какой символ используется для комментариев в Python?',
                        options: [
                            '//',
                            '#',
                            '--',
                            '/*'
                        ],
                        correct: 1,
                        explanation: 'В Python для однострочных комментариев используется символ #.'
                    },
                    {
                        id: 2,
                        question: 'Какой тип данных у значения 3.14?',
                        options: [
                            'int',
                            'str', 
                            'float',
                            'bool'
                        ],
                        correct: 2,
                        explanation: 'Числа с плавающей точкой имеют тип float.'
                    },
                    {
                        id: 3,
                        question: 'Какая функция используется для вывода текста в консоль?',
                        options: [
                            'console.log()',
                            'print()',
                            'echo()',
                            'output()'
                        ],
                        correct: 1,
                        explanation: 'В Python для вывода используется функция print().'
                    },
                    {
                        id: 4,
                        question: 'Как создать переменную с именем "age" и значением 25?',
                        options: [
                            'var age = 25',
                            'age = 25',
                            'let age = 25',
                            'int age = 25'
                        ],
                        correct: 1,
                        explanation: 'В Python переменные создаются простым присваиванием: имя = значение.'
                    }
                ]
            }
        };

        return quizContent[lessonId];
    }

    renderSidebar() {
        const container = document.getElementById('lessonsList');
        if (!container || !this.course) return;

        document.getElementById('courseTitleSidebar').textContent = this.course.title;
        document.getElementById('sidebarProgress').textContent = this.course.progress + '%';
        document.getElementById('sidebarProgressBar').style.width = this.course.progress + '%';

        container.innerHTML = this.lessons.map((lesson, index) => `
            <div class="lesson-item-sidebar ${lesson.id === this.currentLesson.id ? 'active' : ''} ${lesson.completed ? 'completed' : ''} ${index > this.currentLessonIndex ? 'locked' : ''}" 
                 onclick="lessonSystem.selectLesson(${index})">
                <div class="lesson-header-sidebar">
                    <div class="lesson-icon-sidebar">
                        <i class="fas fa-${this.getLessonIcon(lesson.type)}"></i>
                    </div>
                    <div class="lesson-title-sidebar">${lesson.title}</div>
                </div>
                <div class="lesson-meta-sidebar">
                    <span>${lesson.duration}</span>
                    ${lesson.completed ? '<i class="fas fa-check"></i>' : ''}
                </div>
            </div>
        `).join('');
    }

    renderLessonContent() {
        if (!this.currentLesson) return;

        document.getElementById('lessonTitle').textContent = this.currentLesson.title;
        document.getElementById('lessonType').textContent = this.getLessonType(this.currentLesson.type);
        document.getElementById('lessonDuration').textContent = this.currentLesson.duration;
        document.getElementById('lessonNumber').textContent = `Урок ${this.currentLessonIndex + 1} из ${this.lessons.length}`;

        // Скрываем все секции
        document.getElementById('theorySection').style.display = 'none';
        document.getElementById('practiceSection').style.display = 'none';
        document.getElementById('quizSection').style.display = 'none';
        document.getElementById('completionSection').style.display = 'none';

        // Показываем соответствующую секцию
        switch (this.currentLesson.type) {
            case 'theory':
                this.renderTheoryContent();
                break;
            case 'practice':
                this.renderPracticeContent();
                break;
            case 'quiz':
                this.renderQuizContent();
                break;
        }
    }

    renderTheoryContent() {
        const section = document.getElementById('theorySection');
        const content = document.getElementById('theoryContent');
        
        if (!this.currentLesson.content) return;

        section.style.display = 'block';
        content.innerHTML = this.currentLesson.content.sections.map(section => `
            <div class="theory-section-part">
                <h3>${section.title}</h3>
                ${section.content}
            </div>
        `).join('');

        // Добавляем кнопку завершения теории
        content.innerHTML += `
            <div class="theory-completion">
                <button class="btn-primary" onclick="lessonSystem.completeLesson()">
                    <i class="fas fa-check"></i>
                    Завершить теорию
                </button>
            </div>
        `;
    }

    renderPracticeContent() {
        const section = document.getElementById('practiceSection');
        const content = document.getElementById('practiceContent');
        
        if (!this.currentLesson.content) return;

        section.style.display = 'block';
        content.innerHTML = `
            <div class="practice-task">
                <div class="task-description">
                    ${this.currentLesson.content.task}
                </div>
                
                <div class="code-editor-practice">
                    <div class="editor-header-practice">
                        <span>practice.py</span>
                        <div class="editor-actions-practice">
                            <button class="btn-run-practice" onclick="lessonSystem.runPracticeCode()">
                                <i class="fas fa-play"></i>
                                Запустить код
                            </button>
                        </div>
                    </div>
                    <textarea class="code-input-practice" id="practiceCode">${this.currentLesson.content.starterCode}</textarea>
                </div>
                
                <div class="output-practice" id="practiceOutput" style="display: none;">
                    <div class="output-header">Результат выполнения:</div>
                    <div class="output-content" id="practiceOutputContent"></div>
                </div>
                
                <div class="practice-actions">
                    <button class="btn-primary" onclick="lessonSystem.checkPracticeSolution()">
                        Проверить решение
                    </button>
                    <button class="btn-outline" onclick="lessonSystem.showPracticeSolution()">
                        Показать решение
                    </button>
                </div>
            </div>
        `;
    }

    renderQuizContent() {
        const section = document.getElementById('quizSection');
        const content = document.getElementById('quizContent');
        
        if (!this.currentLesson.content) return;

        section.style.display = 'block';
        
        const currentQuestion = this.currentLesson.content.questions[this.quizAnswers.length];
        if (!currentQuestion) {
            this.showQuizResults();
            return;
        }

        content.innerHTML = `
            <div class="quiz-question">
                <div class="question-text">
                    ${currentQuestion.question}
                </div>
                
                <div class="quiz-options">
                    ${currentQuestion.options.map((option, index) => `
                        <div class="quiz-option" onclick="lessonSystem.selectQuizOption(${index})">
                            <div class="option-indicator">${String.fromCharCode(65 + index)}</div>
                            <div class="option-text">${option}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="quiz-actions">
                    <div class="quiz-progress">
                        Вопрос ${this.quizAnswers.length + 1} из ${this.currentLesson.content.questions.length}
                    </div>
                    <button class="btn-submit-quiz" onclick="lessonSystem.submitQuizAnswer()" id="submitQuizBtn" disabled>
                        Следующий вопрос
                    </button>
                </div>
            </div>
        `;
    }

    selectLesson(index) {
        if (index > this.currentLessonIndex) return; // Нельзя перейти к заблокированным урокам
        
        this.currentLessonIndex = index;
        this.currentLesson = this.lessons[index];
        
        // Обновляем URL
        const newUrl = `lesson.html?course=${this.course.id}&lesson=${this.currentLesson.id}`;
        window.history.pushState({}, '', newUrl);
        
        this.renderSidebar();
        this.renderLessonContent();
        this.updateNavigation();
        this.startTimer();
    }

    selectQuizOption(optionIndex) {
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(option => option.classList.remove('selected'));
        options[optionIndex].classList.add('selected');
        
        document.getElementById('submitQuizBtn').disabled = false;
        this.currentQuizAnswer = optionIndex;
    }

    submitQuizAnswer() {
        if (this.currentQuizAnswer === undefined) return;

        this.quizAnswers.push(this.currentQuizAnswer);
        this.currentQuizAnswer = undefined;

        if (this.quizAnswers.length < this.currentLesson.content.questions.length) {
            this.renderQuizContent();
        } else {
            this.showQuizResults();
        }
    }

    showQuizResults() {
        const section = document.getElementById('quizSection');
        const content = document.getElementById('quizContent');
        
        let correctAnswers = 0;
        this.quizAnswers.forEach((answer, index) => {
            if (answer === this.currentLesson.content.questions[index].correct) {
                correctAnswers++;
            }
        });

        const score = Math.round((correctAnswers / this.currentLesson.content.questions.length) * 100);
        
        content.innerHTML = `
            <div class="quiz-results">
                <h3>Результаты теста</h3>
                <div class="score-circle">
                    <div class="score-value">${score}%</div>
                    <div class="score-label">Правильных ответов</div>
                </div>
                
                <div class="questions-review">
                    ${this.currentLesson.content.questions.map((question, index) => {
                        const userAnswer = this.quizAnswers[index];
                        const isCorrect = userAnswer === question.correct;
                        
                        return `
                            <div class="question-review ${isCorrect ? 'correct' : 'incorrect'}">
                                <div class="review-question">
                                    <strong>Вопрос ${index + 1}:</strong> ${question.question}
                                </div>
                                <div class="review-answer">
                                    <strong>Ваш ответ:</strong> ${question.options[userAnswer]}
                                    ${!isCorrect ? `<br><strong>Правильный ответ:</strong> ${question.options[question.correct]}` : ''}
                                </div>
                                ${question.explanation ? `<div class="review-explanation">💡 ${question.explanation}</div>` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <button class="btn-primary" onclick="lessonSystem.completeLesson()">
                    ${score >= 70 ? 'Завершить тест' : 'Попробовать снова'}
                </button>
            </div>
        `;

        if (score >= 70) {
            // Автоматически завершаем урок если прошел тест
            setTimeout(() => {
                this.completeLesson();
            }, 3000);
        }
    }

    async runPracticeCode() {
        const code = document.getElementById('practiceCode').value;
        const output = document.getElementById('practiceOutput');
        const outputContent = document.getElementById('practiceOutputContent');

        // Симуляция выполнения кода
        outputContent.textContent = 'Выполнение кода...';
        output.style.display = 'block';

        // В реальном приложении здесь был бы вызов к бэкенду для выполнения кода
        setTimeout(() => {
            // Мок результат выполнения
            outputContent.textContent = 'Код выполнен успешно!\nГотов к проверке решения.';
        }, 1000);
    }

    async checkPracticeSolution() {
        const userCode = document.getElementById('practiceCode').value;
        
        // Простая проверка (в реальном приложении была бы сложная логика)
        const hasInput = userCode.includes('input(');
        const hasPrint = userCode.includes('print(');
        
        if (hasInput && hasPrint) {
            auth.showNotification('✅ Решение верное!', 'success');
            this.completeLesson();
        } else {
            auth.showNotification('❌ Решение требует доработки', 'error');
        }
    }

    showPracticeSolution() {
        document.getElementById('practiceCode').value = this.currentLesson.content.solution;
        auth.showNotification('Решение показано. Изучите его и попробуйте понять логику.', 'info');
    }

    async completeLesson() {
        if (!auth.currentUser) return;

        // Отмечаем урок как завершенный
        this.currentLesson.completed = true;

        // Обновляем прогресс пользователя
        if (!auth.currentUser.progress.courses) {
            auth.currentUser.progress.courses = {};
        }

        if (!auth.currentUser.progress.courses[this.course.id]) {
            auth.currentUser.progress.courses[this.course.id] = {
                progress: 0,
                completedLessons: [],
                totalTime: 0
            };
        }

        // Добавляем урок в завершенные
        if (!auth.currentUser.progress.courses[this.course.id].completedLessons.includes(this.currentLesson.id)) {
            auth.currentUser.progress.courses[this.course.id].completedLessons.push(this.currentLesson.id);
        }

        // Обновляем общий прогресс
        const totalLessons = this.lessons.length;
        const completedLessons = auth.currentUser.progress.courses[this.course.id].completedLessons.length;
        const progress = Math.round((completedLessons / totalLessons) * 100);
        
        auth.currentUser.progress.courses[this.course.id].progress = progress;

        // Добавляем XP
        const earnedXP = 10;
        auth.addXP(earnedXP);

        // Сохраняем изменения
        await auth.updateProfile({ progress: auth.currentUser.progress });

        // Показываем экран завершения
        this.showCompletionScreen(earnedXP);
    }

    showCompletionScreen(earnedXP) {
        const timeSpent = Math.round((Date.now() - this.startTime) / 1000 / 60); // в минутах
        
        document.getElementById('earnedXP').textContent = earnedXP;
        document.getElementById('timeSpentLesson').textContent = timeSpent + 'м';
        document.getElementById('correctAnswers').textContent = this.quizAnswers ? 
            this.quizAnswers.filter((answer, index) => 
                answer === this.currentLesson.content.questions[index].correct
            ).length : 'N/A';
        document.getElementById('lessonScore').textContent = this.quizAnswers ?
            Math.round((this.quizAnswers.filter((answer, index) => 
                answer === this.currentLesson.content.questions[index].correct
            ).length / this.quizAnswers.length) * 100) + '%' : '100%';

        // Скрываем все секции и показываем completion
        document.getElementById('theorySection').style.display = 'none';
        document.getElementById('practiceSection').style.display = 'none';
        document.getElementById('quizSection').style.display = 'none';
        document.getElementById('completionSection').style.display = 'block';

        // Настраиваем кнопки
        document.getElementById('continueButton').onclick = () => {
            if (this.currentLessonIndex < this.lessons.length - 1) {
                this.selectLesson(this.currentLessonIndex + 1);
            } else {
                window.location.href = `course-detail.html?id=${this.course.id}`;
            }
        };

        document.getElementById('reviewButton').onclick = () => {
            this.renderLessonContent();
        };
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prevLesson');
        const nextBtn = document.getElementById('nextLesson');

        prevBtn.disabled = this.currentLessonIndex === 0;
        nextBtn.disabled = this.currentLessonIndex === this.lessons.length - 1;

        prevBtn.onclick = () => {
            if (this.currentLessonIndex > 0) {
                this.selectLesson(this.currentLessonIndex - 1);
            }
        };

        nextBtn.onclick = () => {
            if (this.currentLessonIndex < this.lessons.length - 1) {
                this.selectLesson(this.currentLessonIndex + 1);
            }
        };
    }

    startTimer() {
        this.startTime = Date.now();
    }

    // Вспомогательные методы
    getLessonIcon(type) {
        const icons = {
            'theory': 'book',
            'practice': 'code',
            'quiz': 'question-circle'
        };
        return icons[type] || 'circle';
    }

    getLessonType(type) {
        const types = {
            'theory': 'Теория',
            'practice': 'Практика',
            'quiz': 'Тест'
        };
        return types[type] || type;
    }

    setupEventListeners() {
        // Обработка клавиш
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && this.currentLessonIndex > 0) {
                this.selectLesson(this.currentLessonIndex - 1);
            } else if (e.key === 'ArrowRight' && this.currentLessonIndex < this.lessons.length - 1) {
                this.selectLesson(this.currentLessonIndex + 1);
            }
        });
    }
}

// Инициализация системы уроков
const lessonSystem = new LessonSystem();