// Progress Tracking System
class ProgressSystem {
    constructor() {
        this.init();
    }

    init() {
        this.setupProgressTracking();
        this.updateProgressCircles();
    }

    setupProgressTracking() {
        // Track code execution
        const runButton = document.getElementById('runCode');
        if (runButton) {
            runButton.addEventListener('click', () => {
                this.trackCodeExecution();
            });
        }

        // Track course enrollment
        window.enrollCourse = (courseId) => {
            this.trackCourseEnrollment(courseId);
        };

        // Track language selection
        window.selectLanguage = (languageName) => {
            this.trackLanguageSelection(languageName);
        };
    }

    trackCodeExecution() {
        if (!auth.currentUser) return;

        // Update total tasks
        auth.currentUser.progress.totalTasks++;
        
        // Add XP
        auth.addXP(10);
        
        // Update learning time (estimate)
        auth.currentUser.progress.learningTime += 5; // 5 minutes per execution
        
        // Update streak
        auth.updateStreak();
        
        auth.saveCurrentUser();
        auth.updateUI();

        // Check for achievements
        if (auth.currentUser.progress.totalTasks === 1) {
            auth.addAchievement('first_task');
        }
    }

    trackCourseEnrollment(courseId) {
        if (!auth.currentUser) {
            window.location.href = 'login.html';
            return;
        }

        if (!auth.currentUser.courses.includes(courseId)) {
            auth.currentUser.courses.push(courseId);
            auth.saveCurrentUser();
            
            auth.showNotification('Вы успешно записались на курс!', 'success');
        } else {
            auth.showNotification('Вы уже записаны на этот курс', 'info');
        }
    }

    trackLanguageSelection(languageName) {
        if (!auth.currentUser) return;

        // Initialize language progress if not exists
        if (!auth.currentUser.progress.languages[languageName]) {
            auth.currentUser.progress.languages[languageName] = 0;
        }

        // Increment progress (in real app this would be more sophisticated)
        auth.currentUser.progress.languages[languageName] = 
            Math.min(auth.currentUser.progress.languages[languageName] + 5, 100);
        
        auth.saveCurrentUser();

        // Check for language-specific achievements
        if (languageName === 'Python' && auth.currentUser.progress.languages[languageName] >= 50) {
            auth.addAchievement('python_beginner');
        } else if (languageName === 'JavaScript' && auth.currentUser.progress.languages[languageName] >= 50) {
            auth.addAchievement('javascript_beginner');
        }
    }

    updateProgressCircles() {
        const progressCircles = document.querySelectorAll('.progress-circle');
        
        progressCircles.forEach(circle => {
            const percent = parseInt(circle.getAttribute('data-percent'));
            const valueElement = circle.querySelector('.progress-value');
            
            // Animate progress
            let currentPercent = 0;
            const duration = 1000; // 1 second
            const increment = percent / (duration / 16);
            
            const timer = setInterval(() => {
                currentPercent += increment;
                if (currentPercent >= percent) {
                    currentPercent = percent;
                    clearInterval(timer);
                }
                
                valueElement.textContent = Math.floor(currentPercent) + '%';
                circle.style.background = `conic-gradient(var(--primary) ${currentPercent}%, var(--gray-700) ${currentPercent}%)`;
            }, 16);
        });
    }
}

// Initialize progress system
document.addEventListener('DOMContentLoaded', () => {
    new ProgressSystem();
});