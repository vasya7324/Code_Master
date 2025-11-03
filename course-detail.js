// Course Detail Management
class CourseDetailSystem {
    constructor() {
        this.course = null;
        this.lessons = [];
        this.currentLesson = null;
        this.init();
    }

    async init() {
        await this.loadCourseData();
        this.setupEventListeners();
        this.renderCourseContent();
        this.updateProgress();
    }

    async loadCourseData() {
        // Получаем ID курса из URL
        const urlParams = new URLSearchParams(window.location.search);
        const courseId = urlParams.get('id');

        if (!courseId) {
            window.location.href = 'courses.html';
            return;
        }

        // Загружаем данные курса
        this.course = await this.fetchCourseData(courseId);
        this.lessons = await this.fetchLessons(courseId);
        
        this.renderCourseHeader();
        this.renderCurriculum();
        this.renderSkills();
    }

    async fetchCourseData(courseId) {
        // В реальном приложении здесь был бы API запрос
        const courses = {
            'python-beginner': {
                id: 'python-beginner',
                title: 'Python для начинающих',
                description: 'Освойте основы Python через практические задания и проекты.',
                fullDescription: 'Этот курс предназначен для полных новичков в программировании. Мы начнем с самых основ и постепенно перейдем к созданию реальных проектов. К концу курса вы сможете самостоятельно писать программы на Python и решать практические задачи.',
                category: 'Программирование',
                level: 'beginner',
                duration: '24 урока',
                students: 12500,
                rating: 4.8,
                price: 'free',
                skills: [
                    'Понимание основных концепций программирования',
                    'Работа с переменными и типами данных',
                    'Использование условий и циклов',
                    'Создание функций и модулей',
                    'Работа с файлами и исключениями',
                    'Основы ООП в Python'
                ],
                features: [
                    'Практические задания после каждого урока',
                    'Проекты для портфолио',
                    'Поддержка сообщества',
                    'Сертификат о завершении'
                ]
            }
        };

        return courses[courseId] || null;
    }

    async fetchLessons(courseId) {
        // Мок данные уроков
        return [
            {
                id: 'python-intro',
                title: 'Введение в Python',
                duration: '15 мин',
                type: 'video',
                free: true,
                completed: false
            },
            {
                id: 'python-variables',
                title: 'Переменные и типы данных',
                duration: '20 мин',
                type: 'lesson',
                free: true,
                completed: false
            },
            {
                id: 'python-practice-1',
                title: 'Практика: Калькулятор',
                duration: '30 мин',
                type: 'practice',
                free: true,
                completed: false
            },
            {
                id: 'python-conditions',
                title: 'Условные операторы',
                duration: '25 мин',
                type: 'lesson',
                free: true,
                completed: false
            },
            {
                id: 'python-quiz-1',
                title: 'Тест: Основы Python',
                duration: '15 мин',
                type: 'quiz',
                free: true,
                completed: false
            }
        ];
    }

    renderCourseHeader() {
        if (!this.course) return;

        document.getElementById('courseCategory').textContent = this.course.category;
        document.getElementById('courseTitle').textContent = this.course.title;
        document.getElementById('courseDescription').textContent = this.course.description;
        document.getElementById('courseFullDescription').textContent = this.course.fullDescription;
        document.getElementById('courseStudents').textContent = this.formatNumber(this.course.students) + ' студентов';
        document.getElementById('courseRating').textContent = this.course.rating + ' рейтинг';
        document.getElementById('courseDuration').textContent = this.course.duration;
        document.getElementById('courseLevel').textContent = this.getLevelName(this.course.level);
    }

    renderCurriculum() {
        const container = document.getElementById('curriculumList');
        if (!container) return;

        container.innerHTML = this.lessons.map((lesson, index) => `
            <div class="lesson-item ${lesson.completed ? 'completed' : ''} ${lesson.free ? 'free' : 'premium'}">
                <div class="lesson-number">${index + 1}</div>
                <div class="lesson-content">
                    <div class="lesson-header">
                        <h4 class="lesson-title">${lesson.title}</h4>
                        <span class="lesson-duration">${lesson.duration}</span>
                    </div>
                    <div class="lesson-meta">
                        <span class="lesson-type ${lesson.type}">
                            <i class="fas fa-${this.getLessonIcon(lesson.type)}"></i>
                            ${this.getLessonType(lesson.type)}
                        </span>
                        ${!lesson.free ? '<span class="premium-badge">Premium</span>' : ''}
                    </div>
                </div>
                <div class="lesson-actions">
                    ${lesson.completed ? 
                        '<i class="fas fa-check-circle completed-icon"></i>' :
                        `<button class="btn-lesson" onclick="courseDetail.startLesson('${lesson.id}')">
                            <i class="fas fa-play"></i>
                            ${lesson.type === 'quiz' ? 'Начать тест' : 'Начать урок'}
                        </button>`
                    }
                </div>
            </div>
        `).join('');
    }

    renderSkills() {
        const container = document.getElementById('skillsGrid');
        if (!container || !this.course) return;

        container.innerHTML = this.course.skills.map(skill => `
            <div class="skill-item">
                <i class="fas fa-check"></i>
                <span>${skill}</span>
            </div>
        `).join('');
    }

    startLesson(lessonId) {
        if (!auth.currentUser) {
            window.location.href = 'login.html';
            return;
        }

        const lesson = this.lessons.find(l => l.id === lessonId);
        if (!lesson) return;

        // Перенаправляем на страницу урока
        window.location.href = `lesson.html?course=${this.course.id}&lesson=${lessonId}`;
    }

    updateProgress() {
        if (!this.course || !auth.currentUser) return;

        const userProgress = auth.currentUser.progress.courses?.[this.course.id];
        if (!userProgress) return;

        const progressPercent = userProgress.progress || 0;
        const completedLessons = userProgress.completedLessons?.length || 0;
        const totalLessons = this.lessons.length;

        document.getElementById('progressPercent').textContent = progressPercent + '%';
        document.getElementById('completedLessons').textContent = `${completedLessons}/${totalLessons}`;
        
        // Анимируем прогресс круг
        const progressCircle = document.getElementById('progressCircle');
        if (progressCircle) {
            progressCircle.style.background = `conic-gradient(var(--primary) ${progressPercent}%, var(--gray-600) ${progressPercent}%)`;
        }
    }

    // Вспомогательные методы
    getLessonIcon(type) {
        const icons = {
            'video': 'play-circle',
            'lesson': 'book',
            'practice': 'code',
            'quiz': 'question-circle',
            'project': 'project-diagram'
        };
        return icons[type] || 'circle';
    }

    getLessonType(type) {
        const types = {
            'video': 'Видео',
            'lesson': 'Урок',
            'practice': 'Практика',
            'quiz': 'Тест',
            'project': 'Проект'
        };
        return types[type] || type;
    }

    getLevelName(level) {
        const levels = {
            'beginner': 'Начальный',
            'intermediate': 'Средний',
            'advanced': 'Продвинутый'
        };
        return levels[level] || level;
    }

    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    }

    setupEventListeners() {
        // Табы
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                
                // Обновляем активные табы
                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Показываем соответствующий контент
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(tabId).classList.add('active');
            });
        });

        // Кнопки действий
        const enrollBtn = document.getElementById('enrollCourseBtn');
        const startBtn = document.getElementById('startCourseBtn');

        if (enrollBtn) {
            enrollBtn.addEventListener('click', () => {
                courses.enrollCourse(this.course.id);
            });
        }

        if (startBtn) {
            startBtn.addEventListener('click', () => {
                if (this.lessons.length > 0) {
                    this.startLesson(this.lessons[0].id);
                }
            });
        }
    }
}

// Инициализация
const courseDetail = new CourseDetailSystem();