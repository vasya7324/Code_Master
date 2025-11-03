// Authentication System - FIXED VERSION
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.users = this.loadUsers();
        this.init();
    }

    init() {
        this.loadCurrentUser();
        this.setupEventListeners();
        this.updateUI();
    }

    // Load users from localStorage
    loadUsers() {
        const users = JSON.parse(localStorage.getItem('codeMasterUsers')) || [];
        
        // Add demo user if no users exist
        if (users.length === 0) {
            const demoUser = {
                id: 'demo-user-1',
                firstName: 'Демо',
                lastName: 'Пользователь',
                email: 'demo@example.com',
                password: this.hashPassword('demopass'),
                createdAt: new Date().toISOString(),
                profile: {
                    level: 3,
                    xp: 250,
                    streak: 5,
                    lastActive: new Date().toISOString(),
                    bio: 'Люблю изучать новые технологии и языки программирования!',
                    avatar: null
                },
                progress: {
                    totalTasks: 15,
                    completedCourses: 2,
                    learningTime: 1200,
                    languages: {
                        'Python': 65,
                        'JavaScript': 40,
                        'Java': 20
                    },
                    courses: {}
                },
                achievements: [
                    'first_login',
                    'first_task',
                    'python_beginner'
                ],
                courses: [
                    'python-beginner'
                ],
                settings: {
                    emailNotifications: true,
                    courseUpdates: true,
                    achievementAlerts: true,
                    newsletter: true
                },
                challengeStats: {
                    rank: 'Новичок',
                    score: 150,
                    solvedChallenges: 3,
                    position: 1542,
                    dailyStreak: 4,
                    joinedCompetitions: 2
                }
            };
            users.push(demoUser);
            this.saveUsers(users);
        }
        
        return users;
    }

    // Save users to localStorage
    saveUsers(users) {
        localStorage.setItem('codeMasterUsers', JSON.stringify(users));
    }

    // Load current user from localStorage
    loadCurrentUser() {
        const userData = localStorage.getItem('codeMasterCurrentUser');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        }
    }

    // Save current user to localStorage
    saveCurrentUser() {
        if (this.currentUser) {
            localStorage.setItem('codeMasterCurrentUser', JSON.stringify(this.currentUser));
        } else {
            localStorage.removeItem('codeMasterCurrentUser');
        }
    }

    // Register new user
    async register(userData) {
        return new Promise((resolve, reject) => {
            try {
                // Validate input
                if (!this.validateEmail(userData.email)) {
                    throw new Error('Некорректный email адрес');
                }

                if (!this.validatePassword(userData.password)) {
                    throw new Error('Пароль должен содержать минимум 8 символов, включая буквы и цифры');
                }

                if (userData.password !== userData.confirmPassword) {
                    throw new Error('Пароли не совпадают');
                }

                // Check if user already exists
                if (this.users.find(user => user.email === userData.email)) {
                    throw new Error('Пользователь с таким email уже существует');
                }

                // Create new user
                const newUser = {
                    id: this.generateId(),
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    password: this.hashPassword(userData.password),
                    createdAt: new Date().toISOString(),
                    profile: {
                        level: 1,
                        xp: 0,
                        streak: 0,
                        lastActive: new Date().toISOString(),
                        bio: '',
                        avatar: null
                    },
                    progress: {
                        totalTasks: 0,
                        completedCourses: 0,
                        learningTime: 0,
                        languages: {},
                        courses: {}
                    },
                    achievements: ['first_login'],
                    courses: [],
                    settings: {
                        emailNotifications: true,
                        courseUpdates: true,
                        achievementAlerts: true,
                        newsletter: userData.newsletter || false
                    },
                    challengeStats: {
                        rank: 'Новичок',
                        score: 0,
                        solvedChallenges: 0,
                        position: 0,
                        dailyStreak: 0,
                        joinedCompetitions: 0
                    }
                };

                this.users.push(newUser);
                this.saveUsers(this.users);

                // Auto-login after registration
                this.currentUser = newUser;
                this.saveCurrentUser();

                // Add first login achievement
                this.addAchievement('first_login');

                resolve(newUser);
            } catch (error) {
                reject(error);
            }
        });
    }

    // Login user
    async login(email, password, rememberMe = false) {
        return new Promise((resolve, reject) => {
            try {
                const user = this.users.find(u => u.email === email);
                
                if (!user) {
                    throw new Error('Пользователь с таким email не найден');
                }

                if (user.password !== this.hashPassword(password)) {
                    throw new Error('Неверный пароль');
                }

                // Update last active
                user.profile.lastActive = new Date().toISOString();
                
                // Update user in users array
                const userIndex = this.users.findIndex(u => u.id === user.id);
                if (userIndex !== -1) {
                    this.users[userIndex] = user;
                    this.saveUsers(this.users);
                }

                this.currentUser = user;
                this.saveCurrentUser();

                resolve(user);
            } catch (error) {
                reject(error);
            }
        });
    }

    // Logout user
    logout() {
        this.currentUser = null;
        this.saveCurrentUser();
        this.updateUI();
        
        // Redirect to home page
        if (window.location.pathname.includes('profile.html') || 
            window.location.pathname.includes('ai-helper.html') ||
            window.location.pathname.includes('challenges.html')) {
            window.location.href = 'index.html';
        }
    }

    // Update user profile
    async updateProfile(profileData) {
        return new Promise((resolve, reject) => {
            try {
                if (!this.currentUser) {
                    throw new Error('Пользователь не авторизован');
                }

                // Merge profile data
                Object.assign(this.currentUser, profileData);
                this.saveCurrentUser();

                // Update in users array
                const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
                if (userIndex !== -1) {
                    this.users[userIndex] = this.currentUser;
                    this.saveUsers(this.users);
                }

                resolve(this.currentUser);
            } catch (error) {
                reject(error);
            }
        });
    }

    // Change password
    async changePassword(currentPassword, newPassword) {
        return new Promise((resolve, reject) => {
            try {
                if (!this.currentUser) {
                    throw new Error('Пользователь не авторизован');
                }

                if (this.currentUser.password !== this.hashPassword(currentPassword)) {
                    throw new Error('Текущий пароль неверен');
                }

                if (!this.validatePassword(newPassword)) {
                    throw new Error('Новый пароль должен содержать минимум 8 символов, включая буквы и цифры');
                }

                this.currentUser.password = this.hashPassword(newPassword);
                this.saveCurrentUser();

                // Update in users array
                const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
                if (userIndex !== -1) {
                    this.users[userIndex] = this.currentUser;
                    this.saveUsers(this.users);
                }

                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    // Add achievement
    addAchievement(achievementId) {
        if (!this.currentUser) return false;

        if (!this.currentUser.achievements.includes(achievementId)) {
            this.currentUser.achievements.push(achievementId);
            
            // Add XP for achievement
            this.addXP(50);
            
            this.saveCurrentUser();

            // Update in users array
            const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
            if (userIndex !== -1) {
                this.users[userIndex] = this.currentUser;
                this.saveUsers(this.users);
            }

            this.showNotification(`🎉 Получено достижение: ${this.getAchievementName(achievementId)}`, 'success');
            return true;
        }
        return false;
    }

    // Add XP
    addXP(amount) {
        if (!this.currentUser) return;

        this.currentUser.profile.xp += amount;
        
        // Check level up
        const newLevel = Math.floor(this.currentUser.profile.xp / 100) + 1;
        if (newLevel > this.currentUser.profile.level) {
            this.currentUser.profile.level = newLevel;
            this.addAchievement(`level_${newLevel}`);
            this.showNotification(`🎯 Новый уровень! Теперь вы ${newLevel} уровня`, 'success');
        }

        this.saveCurrentUser();
    }

    // Update streak
    updateStreak() {
        if (!this.currentUser) return;

        const lastActive = new Date(this.currentUser.profile.lastActive);
        const today = new Date();
        const diffTime = Math.abs(today - lastActive);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            this.currentUser.profile.streak++;
            this.showNotification(`🔥 Серия обучения: ${this.currentUser.profile.streak} дней`, 'info');
        } else if (diffDays > 1) {
            this.currentUser.profile.streak = 1;
        }

        this.currentUser.profile.lastActive = today.toISOString();
        this.saveCurrentUser();

        // Check streak achievements
        if (this.currentUser.profile.streak === 7) {
            this.addAchievement('streak_7');
        } else if (this.currentUser.profile.streak === 30) {
            this.addAchievement('streak_30');
        }
    }

    // Helper methods
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePassword(password) {
        return password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
    }

    hashPassword(password) {
        // Simple hash for demo purposes
        return btoa(unescape(encodeURIComponent(password)));
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    getAchievementName(achievementId) {
        const achievements = {
            'first_login': 'Первое посещение',
            'first_task': 'Первая задача',
            'streak_7': 'Неделя обучения',
            'streak_30': 'Месяц обучения',
            'level_5': 'Уровень 5',
            'level_10': 'Уровень 10',
            'python_beginner': 'Python: Начальный уровень',
            'javascript_beginner': 'JavaScript: Начальный уровень'
        };
        return achievements[achievementId] || achievementId;
    }

    // UI Updates
    updateUI() {
        this.updateNavigation();
        this.updateHeroSection();
        this.updateDashboard();
    }

    updateNavigation() {
        const navActions = document.getElementById('navActions');
        if (!navActions) return;

        if (this.currentUser) {
            navActions.innerHTML = `
                <div class="user-menu">
                    <button class="btn-user" id="userMenuButton">
                        <div class="user-avatar">
                            <span>${this.getUserInitials()}</span>
                        </div>
                        <span>${this.currentUser.firstName}</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="user-dropdown" id="userDropdown">
                        <a href="profile.html" class="dropdown-item">
                            <i class="fas fa-user"></i>
                            Профиль
                        </a>
                        <a href="profile.html#settings" class="dropdown-item">
                            <i class="fas fa-cog"></i>
                            Настройки
                        </a>
                        <div class="dropdown-divider"></div>
                        <button class="dropdown-item logout" onclick="auth.logout()">
                            <i class="fas fa-sign-out-alt"></i>
                            Выйти
                        </button>
                    </div>
                </div>
            `;

            // Setup user menu toggle
            const userMenuButton = document.getElementById('userMenuButton');
            const userDropdown = document.getElementById('userDropdown');

            if (userMenuButton && userDropdown) {
                userMenuButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    userDropdown.classList.toggle('show');
                });

                // Close dropdown when clicking outside
                document.addEventListener('click', () => {
                    userDropdown.classList.remove('show');
                });
            }
        } else {
            navActions.innerHTML = `
                <button class="btn-login" onclick="window.location.href='login.html'">Войти</button>
                <button class="btn-signup" onclick="window.location.href='register.html'">Регистрация</button>
            `;
        }
    }

    updateHeroSection() {
        const heroActions = document.getElementById('heroActions');
        if (!heroActions) return;

        if (this.currentUser) {
            heroActions.innerHTML = `
                <button class="btn-primary" onclick="window.location.href='#languages'">
                    Продолжить обучение
                </button>
                <button class="btn-outline" onclick="window.location.href='profile.html'">
                    Мой прогресс
                </button>
            `;
        } else {
            heroActions.innerHTML = `
                <button class="btn-primary" onclick="window.location.href='register.html'">
                    Начать бесплатно
                </button>
                <button class="btn-outline" onclick="window.location.href='login.html'">
                    Уже есть аккаунт
                </button>
            `;
        }
    }

    updateDashboard() {
        const userDashboard = document.getElementById('userDashboard');
        if (!userDashboard) return;

        if (this.currentUser) {
            userDashboard.style.display = 'block';
            this.updateDashboardContent();
        } else {
            userDashboard.style.display = 'none';
        }
    }

    updateDashboardContent() {
        if (!this.currentUser) return;

        // Update today's tasks
        const todayTasks = document.getElementById('todayTasks');
        if (todayTasks) {
            todayTasks.textContent = this.getTodayTasks();
        }

        // Update streak
        const currentStreak = document.getElementById('currentStreak');
        if (currentStreak) {
            currentStreak.textContent = this.currentUser.profile.streak;
        }

        // Update total tasks
        const totalTasks = document.getElementById('totalTasks');
        if (totalTasks) {
            totalTasks.textContent = this.currentUser.progress.totalTasks;
        }

        // Update completed courses
        const completedCourses = document.getElementById('completedCourses');
        if (completedCourses) {
            completedCourses.textContent = this.currentUser.progress.completedCourses;
        }

        // Update recent achievements
        this.updateRecentAchievements();
    }

    updateRecentAchievements() {
        const recentAchievements = document.getElementById('recentAchievements');
        if (!recentAchievements) return;

        const achievements = this.getRecentAchievements(3);
        if (achievements.length === 0) {
            recentAchievements.innerHTML = '<p style="color: var(--gray-500);">Достижений пока нет</p>';
            return;
        }

        recentAchievements.innerHTML = achievements.map(achievement => `
            <div class="achievement-item">
                <i class="fas fa-trophy"></i>
                <span>${achievement.name}</span>
            </div>
        `).join('');
    }

    getTodayTasks() {
        // This would normally come from backend
        return Math.floor(Math.random() * 5);
    }

    getRecentAchievements(limit = 3) {
        const allAchievements = this.getAchievementsData();
        return this.currentUser.achievements
            .slice(-limit)
            .map(achievementId => allAchievements.find(a => a.id === achievementId))
            .filter(Boolean);
    }

    getAchievementsData() {
        return [
            { id: 'first_login', name: 'Первое посещение' },
            { id: 'first_task', name: 'Первая задача' },
            { id: 'streak_7', name: 'Неделя обучения' },
            { id: 'streak_30', name: 'Месяц обучения' },
            { id: 'level_5', name: 'Уровень 5' },
            { id: 'level_10', name: 'Уровень 10' },
            { id: 'python_beginner', name: 'Python: Начальный уровень' },
            { id: 'javascript_beginner', name: 'JavaScript: Начальный уровень' }
        ];
    }

    getUserInitials() {
        if (!this.currentUser) return 'U';
        return (this.currentUser.firstName[0] + this.currentUser.lastName[0]).toUpperCase();
    }

    // Event listeners for auth pages
    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Register form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister();
            });

            // Password strength indicator
            const passwordInput = document.getElementById('regPassword');
            if (passwordInput) {
                passwordInput.addEventListener('input', (e) => {
                    this.updatePasswordStrength(e.target.value);
                });
            }
        }

        // Toggle password visibility
        document.querySelectorAll('.toggle-password').forEach(button => {
            button.addEventListener('click', (e) => {
                this.togglePasswordVisibility(e.target.closest('.toggle-password'));
            });
        });
    }

    async handleLogin() {
        const form = document.getElementById('loginForm');
        const submitButton = form.querySelector('.btn-auth');
        const email = form.email.value;
        const password = form.password.value;
        const rememberMe = form.remember?.checked || false;

        try {
            // Show loading
            this.setButtonLoading(submitButton, true);

            await this.login(email, password, rememberMe);
            
            // Show success message
            this.showNotification('Успешный вход!', 'success');
            
            // Redirect to home page
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);

        } catch (error) {
            this.showError(form, error.message);
        } finally {
            this.setButtonLoading(submitButton, false);
        }
    }

    async handleRegister() {
        const form = document.getElementById('registerForm');
        const submitButton = form.querySelector('.btn-auth');
        const formData = new FormData(form);

        const userData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            newsletter: formData.get('newsletter') === 'on'
        };

        try {
            // Show loading
            this.setButtonLoading(submitButton, true);

            await this.register(userData);
            
            // Show success message
            this.showNotification('Регистрация успешна! Добро пожаловать!', 'success');
            
            // Redirect to home page
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);

        } catch (error) {
            this.showError(form, error.message);
        } finally {
            this.setButtonLoading(submitButton, false);
        }
    }

    updatePasswordStrength(password) {
        const strengthBar = document.querySelector('.strength-bar');
        const strengthText = document.querySelector('.strength-text');

        if (!strengthBar || !strengthText) return;

        let strength = 'weak';
        let text = 'Слабый пароль';
        let width = 0;

        if (password.length >= 12) {
            strength = 'strong';
            text = 'Сильный пароль';
            width = 100;
        } else if (password.length >= 8) {
            strength = 'medium';
            text = 'Средний пароль';
            width = 66;
        } else if (password.length > 0) {
            width = 33;
        }

        strengthBar.className = `strength-bar ${strength}`;
        strengthBar.style.width = width + '%';
        strengthText.textContent = text;
    }

    togglePasswordVisibility(button) {
        const input = button.parentElement.querySelector('input');
        const icon = button.querySelector('i');

        if (input.type === 'password') {
            input.type = 'text';
            icon.className = 'fas fa-eye-slash';
        } else {
            input.type = 'password';
            icon.className = 'fas fa-eye';
        }
    }

    setButtonLoading(button, isLoading) {
        if (isLoading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }

    showError(form, message) {
        // Remove existing errors
        const existingError = form.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }

        // Show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            background: var(--danger);
            color: white;
            padding: var(--space-md);
            border-radius: var(--radius-lg);
            margin-bottom: var(--space-lg);
            text-align: center;
            font-weight: 500;
        `;

        form.insertBefore(errorDiv, form.firstChild);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.global-notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `global-notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add styles if not already added
        if (!document.getElementById('notification-styles')) {
            const styles = `
                .global-notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: var(--gray-800);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: var(--radius-lg);
                    padding: var(--space-md) var(--space-lg);
                    box-shadow: var(--shadow-xl);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    gap: var(--space-md);
                    max-width: 400px;
                    transform: translateX(400px);
                    transition: transform 0.3s ease;
                }
                
                .global-notification.show {
                    transform: translateX(0);
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: var(--space-sm);
                    flex: 1;
                }
                
                .notification-success {
                    border-left: 4px solid var(--accent);
                }
                
                .notification-error {
                    border-left: 4px solid var(--danger);
                }
                
                .notification-info {
                    border-left: 4px solid var(--primary);
                }
                
                .notification-warning {
                    border-left: 4px solid var(--warning);
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: var(--gray-400);
                    cursor: pointer;
                    padding: var(--space-xs);
                    border-radius: var(--radius-sm);
                }
                
                .notification-close:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: var(--light);
                }
            `;
            const styleElement = document.createElement('style');
            styleElement.id = 'notification-styles';
            styleElement.textContent = styles;
            document.head.appendChild(styleElement);
        }

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            info: 'info-circle',
            warning: 'exclamation-triangle'
        };
        return icons[type] || 'info-circle';
    }
}

// Initialize auth system
const auth = new AuthSystem();

// Export for global access
window.auth = auth;