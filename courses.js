// Courses Management System
class CoursesSystem {
    constructor() {
        this.courses = [];
        this.currentCourse = null;
        this.currentStep = 0;
        this.init();
    }

    init() {
        this.loadCourses();
        this.setupEventListeners();
        this.renderCourses();
    }

    loadCourses() {
        // В реальном приложении это бы приходило с бэкенда
        this.courses = [
            {
                id: 'python-beginner',
                title: 'Python для начинающих',
                description: 'Освойте основы Python через практические задания и проекты. Идеально для старта в программировании.',
                category: 'programming',
                level: 'beginner',
                duration: '24 урока',
                students: 12500,
                rating: 4.8,
                price: 'free',
                image: 'python',
                progress: 0,
                enrolled: false,
                features: ['Основы синтаксиса', 'Работа с данными', 'Функции и модули', 'Практические проекты'],
                skills: ['Переменные и типы', 'Условия и циклы', 'Функции', 'Работа с файлами']
            },
            {
                id: 'javascript-fundamentals',
                title: 'JavaScript Fundamentals',
                description: 'Изучите основы JavaScript, включая ES6+ синтаксис, асинхронное программирование и DOM манипуляции.',
                category: 'web',
                level: 'beginner',
                duration: '30 уроков',
                students: 8900,
                rating: 4.7,
                price: 'free',
                image: 'javascript',
                progress: 0,
                enrolled: false,
                features: ['ES6+ Синтаксис', 'Асинхронность', 'DOM API', 'Модули'],
                skills: ['Переменные let/const', 'Стрелочные функции', 'Промисы', 'Классы']
            },
            {
                id: 'react-pro',
                title: 'React Pro - Современная разработка',
                description: 'Погрузитесь в современную React разработку с хуками, контекстом и экосистемой.',
                category: 'web',
                level: 'intermediate',
                duration: '45 уроков',
                students: 5600,
                rating: 4.9,
                price: 'premium',
                image: 'react',
                progress: 0,
                enrolled: false,
                features: ['React Hooks', 'Context API', 'React Router', 'Тестирование'],
                skills: ['Функциональные компоненты', 'Управление состоянием', 'Маршрутизация', 'Оптимизация']
            },
            {
                id: 'data-science-python',
                title: 'Data Science с Python',
                description: 'Анализ данных, визуализация и машинное обучение с использованием Python и популярных библиотек.',
                category: 'data',
                level: 'intermediate',
                duration: '50 уроков',
                students: 3200,
                rating: 4.8,
                price: 'premium',
                image: 'data-science',
                progress: 0,
                enrolled: false,
                features: ['Pandas и NumPy', 'Визуализация', 'ML основы', 'Реальные датасеты'],
                skills: ['Анализ данных', 'Визуализация', 'Предобработка', 'ML модели']
            },
            {
                id: 'sql-master',
                title: 'SQL и базы данных',
                description: 'Полное руководство по работе с базами данных, от базовых запросов до оптимизации.',
                category: 'database',
                level: 'beginner',
                duration: '28 уроков',
                students: 7100,
                rating: 4.6,
                price: 'free',
                image: 'database',
                progress: 0,
                enrolled: false,
                features: ['SQL синтаксис', 'JOIN операции', 'Индексы', 'Транзакции'],
                skills: ['SELECT запросы', 'Агрегации', 'Подзапросы', 'Нормализация']
            },
            {
                id: 'web-project',
                title: 'Full-stack веб приложение',
                description: 'Создайте полноценное веб-приложение с фронтендом и бэкендом от идеи до деплоя.',
                category: 'project',
                level: 'advanced',
                duration: '60 уроков',
                students: 1800,
                rating: 4.9,
                price: 'premium',
                image: 'fullstack',
                progress: 0,
                enrolled: false,
                features: ['React + Node.js', 'REST API', 'Аутентификация', 'Деплой'],
                skills: ['Full-stack разработка', 'API design', 'Базы данных', 'DevOps основы']
            }
        ];

        // Загружаем прогресс пользователя
        this.loadUserProgress();
    }

    loadUserProgress() {
        if (!auth.currentUser) return;

        const userProgress = auth.currentUser.progress.courses || {};
        this.courses.forEach(course => {
            if (userProgress[course.id]) {
                course.progress = userProgress[course.id].progress || 0;
                course.enrolled = userProgress[course.id].enrolled || false;
            }
        });
    }

    setupEventListeners() {
        // Фильтрация курсов
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                this.filterCourses(filter);
                
                // Обновляем активную кнопку
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Поиск курсов
        const searchInput = document.getElementById('coursesSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchCourses(e.target.value);
            });
        }
    }

    renderCourses() {
        const grid = document.getElementById('coursesGrid');
        if (!grid) return;

        grid.innerHTML = this.courses.map(course => this.renderCourseCard(course)).join('');
    }

    renderCourseCard(course) {
        const progressBar = course.enrolled ? `
            <div class="course-progress">
                <div class="progress-info">
                    <span>Прогресс</span>
                    <span>${course.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${course.progress}%"></div>
                </div>
            </div>
        ` : '';

        const actionButton = course.enrolled ? 
            `<button class="btn-course continue" onclick="courses.continueCourse('${course.id}')">
                ${course.progress === 100 ? 'Повторить курс' : 'Продолжить'}
            </button>` :
            `<button class="btn-course" onclick="courses.enrollCourse('${course.id}')">
                ${course.price === 'free' ? 'Начать бесплатно' : 'Начать курс'}
            </button>`;

        return `
            <div class="course-card" data-level="${course.level}" data-category="${course.category}">
                ${course.price === 'premium' ? '<div class="course-badge premium">Premium</div>' : ''}
                ${course.rating >= 4.8 ? '<div class="course-badge popular">Популярный</div>' : ''}
                
                <div class="course-image">
                    <i class="fab fa-${course.image}"></i>
                </div>
                
                <div class="course-content">
                    <div class="course-category">${this.getCategoryName(course.category)}</div>
                    <h3 class="course-title">${course.title}</h3>
                    <p class="course-description">${course.description}</p>
                    
                    <div class="course-meta">
                        <span class="course-level ${course.level}">${this.getLevelName(course.level)}</span>
                        <span>👥 ${this.formatNumber(course.students)}</span>
                        <span>⭐ ${course.rating}</span>
                        <span>⏱️ ${course.duration}</span>
                    </div>
                    
                    ${progressBar}
                    ${actionButton}
                </div>
            </div>
        `;
    }

    filterCourses(filter) {
        const courses = document.querySelectorAll('.course-card');
        
        courses.forEach(course => {
            if (filter === 'all' || course.dataset.level === filter || course.dataset.category === filter) {
                course.style.display = 'block';
            } else {
                course.style.display = 'none';
            }
        });
    }

    searchCourses(query) {
        const courses = document.querySelectorAll('.course-card');
        const searchTerm = query.toLowerCase();
        
        courses.forEach(course => {
            const title = course.querySelector('.course-title').textContent.toLowerCase();
            const description = course.querySelector('.course-description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                course.style.display = 'block';
            } else {
                course.style.display = 'none';
            }
        });
    }

    async enrollCourse(courseId) {
        if (!auth.currentUser) {
            window.location.href = 'login.html';
            return;
        }

        const course = this.courses.find(c => c.id === courseId);
        if (!course) return;

        try {
            // Обновляем прогресс пользователя
            if (!auth.currentUser.progress.courses) {
                auth.currentUser.progress.courses = {};
            }

            auth.currentUser.progress.courses[courseId] = {
                enrolled: true,
                progress: 0,
                startedAt: new Date().toISOString(),
                completedLessons: []
            };

            await auth.updateProfile({ progress: auth.currentUser.progress });
            
            // Показываем уведомление
            auth.showNotification(`Вы записались на курс "${course.title}"!`, 'success');
            
            // Обновляем UI
            course.enrolled = true;
            this.renderCourses();
            
            // Перенаправляем на страницу курса
            setTimeout(() => {
                window.location.href = `course-detail.html?id=${courseId}`;
            }, 1500);

        } catch (error) {
            auth.showNotification('Ошибка при записи на курс', 'error');
        }
    }

    continueCourse(courseId) {
        window.location.href = `course-detail.html?id=${courseId}`;
    }

    // Вспомогательные методы
    getCategoryName(category) {
        const categories = {
            'programming': 'Программирование',
            'web': 'Веб-разработка',
            'data': 'Data Science',
            'database': 'Базы данных',
            'project': 'Проекты'
        };
        return categories[category] || category;
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
}

// Career Paths System
class CareerPathsSystem {
    constructor() {
        this.paths = {
            'frontend': {
                title: 'Frontend Developer',
                description: 'Создавайте современные веб-интерфейсы',
                duration: '4-6 месяцев',
                courses: 8,
                skills: ['HTML/CSS', 'JavaScript', 'React', 'TypeScript'],
                coursesList: [
                    'html-css-basics',
                    'javascript-fundamentals',
                    'react-pro',
                    'typescript-basics',
                    'responsive-design',
                    'state-management',
                    'testing-frontend',
                    'project-frontend'
                ]
            },
            'backend': {
                title: 'Backend Developer',
                description: 'Разрабатывайте серверную логику и API',
                duration: '5-7 месяцев',
                courses: 10,
                skills: ['Node.js', 'Python', 'Базы данных', 'API Design'],
                coursesList: [
                    'python-beginner',
                    'sql-master',
                    'nodejs-basics',
                    'api-design',
                    'authentication',
                    'docker-basics',
                    'testing-backend',
                    'project-backend'
                ]
            },
            'data-science': {
                title: 'Data Scientist',
                description: 'Анализируйте данные и создавайте ML-модели',
                duration: '6-8 месяцев',
                courses: 12,
                skills: ['Python', 'Pandas', 'SQL', 'Machine Learning'],
                coursesList: [
                    'python-beginner',
                    'sql-master',
                    'data-science-python',
                    'statistics-basics',
                    'ml-fundamentals',
                    'data-visualization',
                    'deep-learning',
                    'project-data-science'
                ]
            }
        };
    }

    startCareerPath(pathId) {
        if (!auth.currentUser) {
            window.location.href = 'login.html';
            return;
        }

        const path = this.paths[pathId];
        if (!path) return;

        // Сохраняем выбранный путь
        auth.currentUser.careerPath = {
            id: pathId,
            title: path.title,
            startedAt: new Date().toISOString(),
            progress: 0,
            completedCourses: []
        };

        auth.saveCurrentUser();
        
        auth.showNotification(`Вы начали карьерный путь "${path.title}"! 🚀`, 'success');
        
        // Перенаправляем на страницу пути
        setTimeout(() => {
            window.location.href = `career-path.html?id=${pathId}`;
        }, 2000);
    }
}

// Инициализация систем
const courses = new CoursesSystem();
const careerPaths = new CareerPathsSystem();

// Глобальные функции для HTML
window.startCareerPath = (pathId) => careerPaths.startCareerPath(pathId);