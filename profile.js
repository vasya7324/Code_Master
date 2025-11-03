// Profile Management System
class ProfileSystem {
    constructor() {
        this.currentTab = 'overview';
        this.init();
    }

    init() {
        this.loadProfileData();
        this.setupTabNavigation();
        this.setupEventListeners();
        this.updateProgressCharts();
    }

    loadProfileData() {
        if (!auth.currentUser) {
            window.location.href = 'login.html';
            return;
        }

        this.updateProfileHeader();
        this.updateOverviewTab();
        this.updateProgressTab();
        this.updateAchievementsTab();
        this.updateCoursesTab();
        this.updateSettingsTab();
    }

    updateProfileHeader() {
        const user = auth.currentUser;
        
        // Avatar
        const avatarImage = document.getElementById('avatarImage');
        const avatarInitials = document.getElementById('avatarInitials');
        
        if (user.profile.avatar) {
            avatarImage.src = user.profile.avatar;
            avatarImage.style.display = 'block';
            avatarInitials.style.display = 'none';
        } else {
            avatarImage.style.display = 'none';
            avatarInitials.style.display = 'flex';
            avatarInitials.textContent = auth.getUserInitials();
        }

        // Name and email
        document.getElementById('profileName').textContent = `${user.firstName} ${user.lastName}`;
        document.getElementById('profileEmail').textContent = user.email;
        
        // Level
        document.getElementById('userLevel').textContent = user.profile.level;
    }

    updateOverviewTab() {
        const user = auth.currentUser;
        
        // Stats
        document.getElementById('streakDays').textContent = user.profile.streak;
        document.getElementById('solvedTasks').textContent = user.progress.totalTasks;
        document.getElementById('learningTime').textContent = Math.floor(user.progress.learningTime / 60); // Convert to hours
        document.getElementById('userXP').textContent = user.profile.xp;

        // Languages progress
        this.updateLanguagesProgress();

        // Recent activity
        this.updateRecentActivity();
    }

    updateLanguagesProgress() {
        const container = document.getElementById('languagesProgress');
        if (!container) return;

        const languages = auth.languagesData || [];
        const userProgress = auth.currentUser.progress.languages;

        container.innerHTML = languages.map(language => {
            const progress = userProgress[language.name] || 0;
            
            return `
                <div class="language-progress-item">
                    <div class="language-progress-header">
                        <span class="language-name">${language.name}</span>
                        <span class="progress-percent">${progress}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                </div>
            `;
        }).join('');
    }

    updateRecentActivity() {
        const container = document.getElementById('recentActivity');
        if (!container) return;

        // Mock recent activity data
        const activities = [
            { type: 'task', message: 'Решена задача "Факториал" на Python', time: '2 часа назад' },
            { type: 'course', message: 'Завершен урок "Основы JavaScript"', time: 'Вчера' },
            { type: 'achievement', message: 'Получено достижение "Первая задача"', time: '2 дня назад' },
            { type: 'streak', message: 'Серия обучения: 5 дней подряд', time: '3 дня назад' }
        ];

        container.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon ${activity.type}">
                    <i class="fas fa-${this.getActivityIcon(activity.type)}"></i>
                </div>
                <div class="activity-content">
                    <p>${activity.message}</p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            </div>
        `).join('');
    }

    getActivityIcon(type) {
        const icons = {
            task: 'check-circle',
            course: 'book',
            achievement: 'trophy',
            streak: 'fire'
        };
        return icons[type] || 'circle';
    }

    updateProgressTab() {
        // This would normally generate charts
        const container = document.getElementById('progressCharts');
        if (!container) return;

        container.innerHTML = `
            <div class="progress-placeholder">
                <i class="fas fa-chart-bar"></i>
                <h3>Детальная статистика</h3>
                <p>Здесь будут отображаться графики и диаграммы вашего прогресса</p>
            </div>
        `;
    }

    updateAchievementsTab() {
        const container = document.getElementById('achievementsGrid');
        if (!container) return;

        const allAchievements = auth.getAchievementsData();
        const userAchievements = auth.currentUser.achievements;

        container.innerHTML = allAchievements.map(achievement => {
            const isUnlocked = userAchievements.includes(achievement.id);
            
            return `
                <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}">
                    <div class="achievement-icon">
                        <i class="fas fa-${isUnlocked ? 'trophy' : 'lock'}"></i>
                    </div>
                    <div class="achievement-info">
                        <h4>${achievement.name}</h4>
                        <p>${this.getAchievementDescription(achievement.id)}</p>
                    </div>
                    ${isUnlocked ? 
                        '<div class="achievement-badge">Получено</div>' : 
                        '<div class="achievement-badge locked">Заблокировано</div>'
                    }
                </div>
            `;
        }).join('');
    }

    getAchievementDescription(achievementId) {
        const descriptions = {
            'first_login': 'Войдите в систему в первый раз',
            'first_task': 'Решите вашу первую задачу',
            'streak_7': 'Занимайтесь 7 дней подряд',
            'streak_30': 'Занимайтесь 30 дней подряд',
            'level_5': 'Достигните 5 уровня',
            'level_10': 'Достигните 10 уровня',
            'python_beginner': 'Завершите базовый курс Python',
            'javascript_beginner': 'Завершите базовый курс JavaScript'
        };
        return descriptions[achievementId] || 'Описание достижения';
    }

    updateCoursesTab() {
        const container = document.getElementById('userCourses');
        if (!container) return;

        const userCourses = auth.currentUser.courses;

        if (userCourses.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-book"></i>
                    <h3>Вы еще не записались на курсы</h3>
                    <p>Начните изучать программирование с наших курсов</p>
                    <button class="btn-primary" onclick="window.location.href='index.html#courses'">
                        Найти курсы
                    </button>
                </div>
            `;
            return;
        }

        // This would normally show actual enrolled courses
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book"></i>
                <h3>Курсы в разработке</h3>
                <p>Функциональность моих курсов скоро будет доступна</p>
            </div>
        `;
    }

    updateSettingsTab() {
        const user = auth.currentUser;

        // Profile form
        document.getElementById('editFirstName').value = user.firstName;
        document.getElementById('editLastName').value = user.lastName;
        document.getElementById('editEmail').value = user.email;
        document.getElementById('editBio').value = user.profile.bio || '';

        // Notification settings
        document.querySelector('input[name="emailNotifications"]').checked = user.settings.emailNotifications;
        document.querySelector('input[name="courseUpdates"]').checked = user.settings.courseUpdates;
        document.querySelector('input[name="achievementAlerts"]').checked = user.settings.achievementAlerts;
    }

    updateProgressCharts() {
        // This would use a charting library like Chart.js
        console.log('Updating progress charts...');
    }

    setupTabNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetTab = item.getAttribute('data-tab');
                this.switchTab(targetTab);
            });
        });
    }

    switchTab(tabName) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');

        this.currentTab = tabName;
    }

    setupEventListeners() {
        // Profile form
        const profileForm = document.getElementById('profileForm');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveProfile();
            });
        }

        // Password form
        const passwordForm = document.getElementById('passwordForm');
        if (passwordForm) {
            passwordForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.changePassword();
            });
        }

        // Notification settings
        document.querySelectorAll('.notification-settings input').forEach(input => {
            input.addEventListener('change', (e) => {
                this.saveNotificationSettings();
            });
        });
    }

    async saveProfile() {
        const form = document.getElementById('profileForm');
        const formData = new FormData(form);

        const profileData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            profile: {
                ...auth.currentUser.profile,
                bio: formData.get('bio')
            }
        };

        try {
            await auth.updateProfile(profileData);
            this.showSuccess('Профиль успешно обновлен');
            this.updateProfileHeader();
        } catch (error) {
            this.showError(error.message);
        }
    }

    async changePassword() {
        const form = document.getElementById('passwordForm');
        const formData = new FormData(form);

        const currentPassword = formData.get('currentPassword');
        const newPassword = formData.get('newPassword');
        const confirmNewPassword = formData.get('confirmNewPassword');

        if (newPassword !== confirmNewPassword) {
            this.showError('Новые пароли не совпадают');
            return;
        }

        try {
            await auth.changePassword(currentPassword, newPassword);
            this.showSuccess('Пароль успешно изменен');
            form.reset();
        } catch (error) {
            this.showError(error.message);
        }
    }

    async saveNotificationSettings() {
        const settings = {
            emailNotifications: document.querySelector('input[name="emailNotifications"]').checked,
            courseUpdates: document.querySelector('input[name="courseUpdates"]').checked,
            achievementAlerts: document.querySelector('input[name="achievementAlerts"]').checked
        };

        try {
            await auth.updateProfile({ settings });
            this.showSuccess('Настройки уведомлений сохранены');
        } catch (error) {
            this.showError(error.message);
        }
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'var(--accent)' : 'var(--danger)'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 1000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Export functions for HTML onclick handlers
function exportData() {
    if (!auth.currentUser) return;
    
    const dataStr = JSON.stringify(auth.currentUser, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `codemaster-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    auth.showNotification('Данные успешно экспортированы', 'success');
}

function deleteAccount() {
    if (!confirm('Вы уверены, что хотите удалить аккаунт? Это действие нельзя отменить.')) {
        return;
    }
    
    if (auth.currentUser) {
        auth.users = auth.users.filter(user => user.id !== auth.currentUser.id);
        auth.saveUsers();
        auth.logout();
    }
}

// Initialize profile system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProfileSystem();
});