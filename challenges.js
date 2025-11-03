// Challenges and Gamification System
class ChallengesSystem {
    constructor() {
        this.challenges = [];
        this.dailyChallenges = [];
        this.userStats = {};
        this.achievements = [];
        this.init();
    }

    init() {
        this.loadChallengesData();
        this.loadUserStats();
        this.setupEventListeners();
        this.renderDailyChallenges();
        this.renderAchievements();
        this.startTimers();
    }

    loadChallengesData() {
        // Данные ежедневных челленджей
        this.dailyChallenges = [
            {
                id: 'daily-1',
                title: 'Обратная строка',
                description: 'Напишите функцию, которая принимает строку и возвращает ее в обратном порядке.',
                difficulty: 'easy',
                category: 'algorithms',
                points: 10,
                solved: false,
                tags: ['строки', 'алгоритмы'],
                stats: {
                    solved: 2341,
                    successRate: '87%'
                },
                language: 'python'
            },
            {
                id: 'daily-2',
                title: 'Поиск в отсортированном массиве',
                description: 'Реализуйте бинарный поиск в отсортированном массиве целых чисел.',
                difficulty: 'medium',
                category: 'algorithms',
                points: 20,
                solved: false,
                tags: ['массивы', 'поиск', 'бинарный поиск'],
                stats: {
                    solved: 1567,
                    successRate: '72%'
                },
                language: 'python'
            },
            {
                id: 'daily-3',
                title: 'Валидация скобок',
                description: 'Напишите функцию, которая проверяет правильность расстановки скобок в строке.',
                difficulty: 'medium',
                category: 'data-structures',
                points: 25,
                solved: true,
                tags: ['стек', 'строки', 'валидация'],
                stats: {
                    solved: 1890,
                    successRate: '65%'
                },
                language: 'python'
            }
        ];

        // Данные достижений
        this.achievements = [
            {
                id: 'first_challenge',
                name: 'Первая кровь',
                description: 'Решите ваш первый челлендж',
                xp: 50,
                unlocked: true,
                progress: 100,
                icon: 'fa-bolt'
            },
            {
                id: 'daily_streak_7',
                name: 'Неделя кода',
                description: 'Решайте челленджи 7 дней подряд',
                xp: 100,
                unlocked: false,
                progress: 4,
                maxProgress: 7,
                icon: 'fa-fire'
            },
            {
                id: 'algorithm_master',
                name: 'Мастер алгоритмов',
                description: 'Решите 50 алгоритмических задач',
                xp: 200,
                unlocked: false,
                progress: 12,
                maxProgress: 50,
                icon: 'fa-brain'
            },
            {
                id: 'speed_demon',
                name: 'Скоростной демон',
                description: 'Решите 10 задач менее чем за 5 минут',
                xp: 150,
                unlocked: false,
                progress: 3,
                maxProgress: 10,
                icon: 'fa-running'
            },
            {
                id: 'perfectionist',
                name: 'Перфекционист',
                description: 'Решите 25 задач с первой попытки',
                xp: 300,
                unlocked: false,
                progress: 8,
                maxProgress: 25,
                icon: 'fa-star'
            },
            {
                id: 'community_hero',
                name: 'Герой сообщества',
                description: 'Помогите 10 другим пользователям',
                xp: 250,
                unlocked: false,
                progress: 2,
                maxProgress: 10,
                icon: 'fa-users'
            }
        ];
    }

    loadUserStats() {
        if (!auth.currentUser) return;

        this.userStats = auth.currentUser.challengeStats || {
            rank: 'Новичок',
            score: 0,
            solvedChallenges: 0,
            position: 1542,
            dailyStreak: 4,
            joinedCompetitions: 0
        };

        this.updateUserStatsUI();
    }

    updateUserStatsUI() {
        document.getElementById('userRank').textContent = this.userStats.rank;
        document.getElementById('userScore').textContent = this.userStats.score;
        document.getElementById('solvedChallenges').textContent = this.userStats.solvedChallenges;
        document.getElementById('userPosition').textContent = `#${this.userStats.position}`;
    }

    renderDailyChallenges() {
        const container = document.getElementById('dailyChallengesGrid');
        if (!container) return;

        container.innerHTML = this.dailyChallenges.map(challenge => `
            <div class="challenge-card">
                <div class="challenge-header">
                    <div>
                        <h3 class="challenge-title">${challenge.title}</h3>
                        <span class="challenge-difficulty difficulty-${challenge.difficulty}">
                            ${this.getDifficultyText(challenge.difficulty)}
                        </span>
                    </div>
                    <div class="challenge-points">${challenge.points} XP</div>
                </div>
                
                <p class="challenge-description">${challenge.description}</p>
                
                <div class="challenge-stats">
                    <span>👥 ${challenge.stats.solved} решили</span>
                    <span>✅ ${challenge.stats.successRate} успех</span>
                </div>
                
                <div class="challenge-tags">
                    ${challenge.tags.map(tag => `<span class="challenge-tag">${tag}</span>`).join('')}
                    <span class="challenge-tag">${challenge.language}</span>
                </div>
                
                <button class="btn-challenge ${challenge.solved ? 'solved' : ''}" 
                        onclick="challengesSystem.startChallenge('${challenge.id}')">
                    ${challenge.solved ? '✅ Решено' : '🎯 Начать решение'}
                </button>
            </div>
        `).join('');
    }

    renderAchievements() {
        const container = document.getElementById('achievementsGrid');
        if (!container) return;

        container.innerHTML = this.achievements.map(achievement => `
            <div class="achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}">
                <div class="achievement-icon">
                    <i class="fas ${achievement.icon}"></i>
                </div>
                
                <div class="achievement-info">
                    <div class="achievement-name">${achievement.name}</div>
                    <p class="achievement-description">${achievement.description}</p>
                    
                    ${achievement.maxProgress ? `
                        <div class="achievement-progress">
                            <div class="progress-fill" style="width: ${(achievement.progress / achievement.maxProgress) * 100}%"></div>
                        </div>
                        <div style="font-size: 0.75rem; color: var(--gray-500); margin-top: 4px;">
                            ${achievement.progress}/${achievement.maxProgress}
                        </div>
                    ` : ''}
                </div>
                
                <div class="achievement-xp">+${achievement.xp} XP</div>
            </div>
        `).join('');
    }

    startChallenge(challengeId) {
        if (!auth.currentUser) {
            window.location.href = 'login.html';
            return;
        }

        const challenge = this.dailyChallenges.find(c => c.id === challengeId);
        if (!challenge) return;

        // Открываем модальное окно с челленджем
        this.openChallengeModal(challenge);
    }

    openChallengeModal(challenge) {
        const modal = document.createElement('div');
        modal.className = 'challenge-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">${challenge.title}</h2>
                    <button class="btn-close" onclick="this.closest('.challenge-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="modal-body">
                    <div class="challenge-info">
                        <div class="challenge-meta">
                            <span class="difficulty-badge difficulty-${challenge.difficulty}">
                                ${this.getDifficultyText(challenge.difficulty)}
                            </span>
                            <span class="points-badge">${challenge.points} XP</span>
                            <span class="category-badge">${this.getCategoryName(challenge.category)}</span>
                        </div>
                        
                        <div class="challenge-description-detailed">
                            <h3>Описание задачи</h3>
                            <p>${challenge.description}</p>
                            
                            <h4>Пример:</h4>
                            <div class="code-example">
                                <pre><code># Входные данные
input_str = "hello"

# Ожидаемый результат
"olleh"</code></pre>
                            </div>
                            
                            <h4>Ограничения:</h4>
                            <ul>
                                <li>Длина строки: 1 ≤ n ≤ 1000</li>
                                <li>Строка содержит только ASCII символы</li>
                            </ul>
                        </div>
                        
                        <div class="code-editor-section">
                            <h3>Ваше решение</h3>
                            <select class="language-select" id="challengeLanguage">
                                <option value="python">Python</option>
                                <option value="javascript">JavaScript</option>
                                <option value="java">Java</option>
                            </select>
                            
                            <div class="code-editor-challenge">
                                <div class="editor-header">
                                    <span>solution.py</span>
                                    <div class="editor-actions">
                                        <button class="btn-run" onclick="challengesSystem.runChallengeCode()">
                                            <i class="fas fa-play"></i>
                                            Запустить
                                        </button>
                                        <button class="btn-submit" onclick="challengesSystem.submitChallengeSolution()">
                                            <i class="fas fa-paper-plane"></i>
                                            Отправить
                                        </button>
                                    </div>
                                </div>
                                <textarea class="code-input" id="challengeCode" placeholder="Напишите ваше решение здесь...">def reverse_string(s):
    # Ваш код здесь
    return s</textarea>
                            </div>
                            
                            <div class="output-section" id="challengeOutput" style="display: none;">
                                <h4>Результат:</h4>
                                <div class="output-content" id="challengeOutputContent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Добавляем стили для модального окна
        this.addModalStyles();
    }

    addModalStyles() {
        if (document.getElementById('modal-styles')) return;

        const styles = `
            .challenge-meta {
                display: flex;
                gap: var(--space-md);
                margin-bottom: var(--space-lg);
                flex-wrap: wrap;
            }
            
            .difficulty-badge, .points-badge, .category-badge {
                padding: var(--space-xs) var(--space-sm);
                border-radius: var(--radius-full);
                font-size: 0.875rem;
                font-weight: 600;
            }
            
            .points-badge {
                background: rgba(245, 158, 11, 0.2);
                color: var(--warning);
            }
            
            .category-badge {
                background: rgba(37, 99, 235, 0.2);
                color: var(--primary);
            }
            
            .challenge-description-detailed h3 {
                color: var(--light);
                margin-bottom: var(--space-md);
            }
            
            .challenge-description-detailed h4 {
                color: var(--light);
                margin: var(--space-lg) 0 var(--space-md);
            }
            
            .code-editor-section {
                margin-top: var(--space-2xl);
            }
            
            .language-select {
                padding: var(--space-sm) var(--space-md);
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: var(--radius-lg);
                color: var(--light);
                margin-bottom: var(--space-lg);
            }
            
            .code-editor-challenge {
                background: var(--gray-800);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: var(--radius-lg);
                overflow: hidden;
            }
            
            .editor-header {
                background: var(--gray-700);
                padding: var(--space-md);
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .editor-actions {
                display: flex;
                gap: var(--space-sm);
            }
            
            .btn-run, .btn-submit {
                padding: var(--space-sm) var(--space-md);
                border: none;
                border-radius: var(--radius-md);
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .btn-run {
                background: var(--accent);
                color: var(--dark);
            }
            
            .btn-submit {
                background: var(--primary);
                color: white;
            }
            
            .btn-run:hover {
                background: #05c290;
            }
            
            .btn-submit:hover {
                background: var(--primary-dark);
            }
            
            .code-input {
                width: 100%;
                min-height: 300px;
                background: transparent;
                border: none;
                padding: var(--space-lg);
                color: var(--light);
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.875rem;
                line-height: 1.5;
                resize: vertical;
                outline: none;
            }
            
            .output-section {
                background: var(--gray-800);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: var(--radius-lg);
                padding: var(--space-lg);
                margin-top: var(--space-lg);
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.id = 'modal-styles';
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }

    async runChallengeCode() {
        const code = document.getElementById('challengeCode').value;
        const output = document.getElementById('challengeOutput');
        const outputContent = document.getElementById('challengeOutputContent');

        outputContent.textContent = 'Выполнение кода...';
        output.style.display = 'block';

        // Симуляция выполнения кода
        setTimeout(() => {
            // Простая проверка для демонстрации
            if (code.includes('return s[::-1]') || code.includes('".join(reversed(s))')) {
                outputContent.innerHTML = `
                    <div style="color: var(--accent);">
                        ✅ Тесты пройдены успешно!
                    </div>
                    <div style="margin-top: var(--space-md);">
                        <strong>Результат:</strong> Функция правильно возвращает обратную строку
                    </div>
                `;
            } else {
                outputContent.innerHTML = `
                    <div style="color: var(--danger);">
                        ❌ Тесты не пройдены
                    </div>
                    <div style="margin-top: var(--space-md);">
                        <strong>Ошибка:</strong> Функция не возвращает правильный результат для всех тестовых случаев
                    </div>
                `;
            }
        }, 1500);
    }

    async submitChallengeSolution() {
        const code = document.getElementById('challengeCode').value;
        
        // Симуляция проверки решения
        const isCorrect = code.includes('return s[::-1]') || code.includes('".join(reversed(s))');
        
        if (isCorrect) {
            await this.completeChallenge();
        } else {
            auth.showNotification('❌ Решение требует доработки', 'error');
        }
    }

    async completeChallenge() {
        if (!auth.currentUser) return;

        // Начисляем очки
        this.userStats.score += 25;
        this.userStats.solvedChallenges += 1;

        // Обновляем прогресс достижений
        this.updateAchievementsProgress();

        // Сохраняем статистику пользователя
        auth.currentUser.challengeStats = this.userStats;
        await auth.updateProfile({ challengeStats: this.userStats });

        // Начисляем XP
        auth.addXP(25);

        // Показываем уведомление
        auth.showNotification('🎉 Челлендж решен! +25 XP', 'success');

        // Обновляем UI
        this.updateUserStatsUI();
        this.renderDailyChallenges();

        // Закрываем модальное окно
        document.querySelector('.challenge-modal')?.remove();
    }

    updateAchievementsProgress() {
        // Обновляем прогресс достижений
        const firstChallenge = this.achievements.find(a => a.id === 'first_challenge');
        if (firstChallenge && !firstChallenge.unlocked) {
            firstChallenge.unlocked = true;
            firstChallenge.progress = 100;
        }

        const algorithmMaster = this.achievements.find(a => a.id === 'algorithm_master');
        if (algorithmMaster) {
            algorithmMaster.progress = this.userStats.solvedChallenges;
            if (algorithmMaster.progress >= algorithmMaster.maxProgress) {
                algorithmMaster.unlocked = true;
            }
        }

        this.renderAchievements();
    }

    selectCategory(category) {
        // В реальном приложении здесь была бы загрузка челленджей по категории
        auth.showNotification(`Загрузка челленджей по категории: ${this.getCategoryName(category)}`, 'info');
        
        // Перенаправляем на страницу категории
        setTimeout(() => {
            window.location.href = `challenges-category.html?category=${category}`;
        }, 1000);
    }

    joinCompetition() {
        if (!auth.currentUser) {
            window.location.href = 'login.html';
            return;
        }

        auth.showNotification('🎯 Вы присоединились к еженедельному турниру!', 'success');
        this.userStats.joinedCompetitions += 1;
        this.updateUserStatsUI();
    }

    viewLeaderboard() {
        window.location.href = 'leaderboard.html';
    }

    startTimers() {
        // Таймер для ежедневных челленджей
        this.startDailyTimer();
        
        // Таймер для еженедельного турнира
        this.startWeeklyTimer();
    }

    startDailyTimer() {
        const timerElement = document.getElementById('timerText');
        if (!timerElement) return;

        // Устанавливаем время обновления на завтра 00:00
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        const updateTimer = () => {
            const now = new Date();
            const diff = tomorrow - now;

            if (diff <= 0) {
                timerElement.textContent = 'Обновление...';
                // Здесь бы обновились ежедневные челленджи
                setTimeout(() => {
                    location.reload();
                }, 2000);
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            timerElement.textContent = `Обновление через: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        };

        updateTimer();
        setInterval(updateTimer, 1000);
    }

    startWeeklyTimer() {
        const timerElement = document.getElementById('weeklyTimer');
        if (!timerElement) return;

        // Устанавливаем время окончания турнира на воскресенье 23:59
        const now = new Date();
        const endDate = new Date(now);
        const daysUntilSunday = 7 - now.getDay();
        endDate.setDate(now.getDate() + daysUntilSunday);
        endDate.setHours(23, 59, 59, 999);

        const updateTimer = () => {
            const now = new Date();
            const diff = endDate - now;

            if (diff <= 0) {
                timerElement.textContent = 'Турнир завершен';
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            timerElement.textContent = `${days}д ${hours}ч ${minutes}м`;
        };

        updateTimer();
        setInterval(updateTimer, 60000); // Обновляем каждую минуту
    }

    // Вспомогательные методы
    getDifficultyText(difficulty) {
        const difficulties = {
            'easy': 'Легкий',
            'medium': 'Средний',
            'hard': 'Сложный',
            'expert': 'Эксперт'
        };
        return difficulties[difficulty] || difficulty;
    }

    getCategoryName(category) {
        const categories = {
            'algorithms': 'Алгоритмы',
            'data-structures': 'Структуры данных',
            'sql': 'SQL',
            'system-design': 'Системный дизайн'
        };
        return categories[category] || category;
    }

    setupEventListeners() {
        // Обработка клавиш в модальных окнах
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modal = document.querySelector('.challenge-modal');
                if (modal) {
                    modal.remove();
                }
            }
        });
    }
}

// Инициализация системы челленджей
const challengesSystem = new ChallengesSystem();