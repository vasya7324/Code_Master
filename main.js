// Languages data with ALL 18 programming languages
const languagesData = [
    {
        id: 1,
        name: "Python",
        description: "Высокоуровневый язык с простым синтаксисом. Идеален для начинающих и data science.",
        icon: "python",
        difficulty: "easy",
        tags: ["web", "data", "automation", "ai"],
        features: ["Простой синтаксис", "Data Science", "Веб-разработка", "Автоматизация", "AI/ML"],
        color: "#3776ab",
        popularity: 95,
        release_year: 1991,
        paradigm: ["object-oriented", "imperative", "functional"],
        job_market: "very_high"
    },
    {
        id: 2,
        name: "JavaScript",
        description: "Язык для веб-разработки. Запускается в браузере и на сервере (Node.js).",
        icon: "javascript",
        difficulty: "medium",
        tags: ["web", "frontend", "backend", "mobile"],
        features: ["Интерактивность", "Full-Stack", "Асинхронность", "ES6+", "React/Vue"],
        color: "#f7df1e",
        popularity: 98,
        release_year: 1995,
        paradigm: ["event-driven", "functional", "object-oriented"],
        job_market: "very_high"
    },
    {
        id: 3,
        name: "Java",
        description: "Объектно-ориентированный язык с кроссплатформенностью. Широко используется в enterprise.",
        icon: "java",
        difficulty: "medium",
        tags: ["backend", "mobile", "enterprise", "big-data"],
        features: ["Кроссплатформенность", "Многопоточность", "Android", "Enterprise", "Big Data"],
        color: "#007396",
        popularity: 85,
        release_year: 1995,
        paradigm: ["object-oriented", "imperative"],
        job_market: "high"
    },
    {
        id: 4,
        name: "C++",
        description: "Мощный язык для системного программирования, игр и высокопроизводительных приложений.",
        icon: "cpp",
        difficulty: "hard",
        tags: ["system", "gamedev", "performance", "embedded"],
        features: ["Высокая производительность", "Системное программирование", "Игры", "Шаблоны", "Embedded"],
        color: "#00599c",
        popularity: 75,
        release_year: 1985,
        paradigm: ["object-oriented", "procedural", "generic"],
        job_market: "high"
    },
    {
        id: 5,
        name: "Rust",
        description: "Современный язык системного программирования с гарантиями безопасности памяти.",
        icon: "rust",
        difficulty: "hard",
        tags: ["system", "safety", "performance", "webassembly"],
        features: ["Безопасность памяти", "Высокая производительность", "WebAssembly", "Системы", "Без GC"],
        color: "#000000",
        popularity: 65,
        release_year: 2010,
        paradigm: ["multi-paradigm", "concurrent"],
        job_market: "growing"
    },
    {
        id: 6,
        name: "Go",
        description: "Простой и эффективный язык от Google для параллельного программирования и веб-серверов.",
        icon: "go",
        difficulty: "medium",
        tags: ["backend", "concurrent", "cloud", "microservices"],
        features: ["Горутины", "Простой синтаксис", "Cloud Native", "Высокая производительность", "Микросервисы"],
        color: "#00add8",
        popularity: 70,
        release_year: 2009,
        paradigm: ["concurrent", "imperative"],
        job_market: "high"
    },
    {
        id: 7,
        name: "TypeScript",
        description: "Статически типизированный JavaScript с дополнительными возможностями для больших проектов.",
        icon: "typescript",
        difficulty: "medium",
        tags: ["web", "frontend", "backend", "enterprise"],
        features: ["Статическая типизация", "IDE поддержка", "Рефакторинг", "Масштабируемость", "Angular"],
        color: "#3178c6",
        popularity: 80,
        release_year: 2012,
        paradigm: ["object-oriented", "functional"],
        job_market: "very_high"
    },
    {
        id: 8,
        name: "Kotlin",
        description: "Современный язык для Android разработки и мультиплатформенных приложений.",
        icon: "kotlin",
        difficulty: "medium",
        tags: ["mobile", "backend", "android", "multiplatform"],
        features: ["Android разработка", "Null безопасность", "Короткий синтаксис", "Java совместимость", "Multiplatform"],
        color: "#7f52ff",
        popularity: 60,
        release_year: 2011,
        paradigm: ["object-oriented", "functional"],
        job_market: "growing"
    },
    {
        id: 9,
        name: "Swift",
        description: "Современный язык от Apple для разработки под iOS, macOS, watchOS и tvOS.",
        icon: "swift",
        difficulty: "medium",
        tags: ["mobile", "apple", "ios", "macos"],
        features: ["iOS/macOS разработка", "Безопасность", "Скорость", "Modern синтаксис", "Playgrounds"],
        color: "#fa7343",
        popularity: 65,
        release_year: 2014,
        paradigm: ["object-oriented", "protocol-oriented"],
        job_market: "high"
    },
    {
        id: 10,
        name: "C#",
        description: "Универсальный язык от Microsoft для разработки под Windows, игры на Unity и веб-приложений.",
        icon: "csharp",
        difficulty: "medium",
        tags: ["windows", "gamedev", "web", "enterprise"],
        features: [".NET платформа", "Unity игры", "Windows приложения", "LINQ", "ASP.NET"],
        color: "#239120",
        popularity: 75,
        release_year: 2000,
        paradigm: ["object-oriented", "imperative"],
        job_market: "high"
    },
    {
        id: 11,
        name: "PHP",
        description: "Серверный язык для веб-разработки, особенно популярен для CMS и блогов.",
        icon: "php",
        difficulty: "easy",
        tags: ["web", "backend", "cms", "wordpress"],
        features: ["Веб-разработка", "WordPress/Drupal", "Широкая распространенность", "Хостинг поддержка", "Фреймворки"],
        color: "#777bb4",
        popularity: 70,
        release_year: 1995,
        paradigm: ["imperative", "object-oriented"],
        job_market: "medium"
    },
    {
        id: 12,
        name: "Ruby",
        description: "Динамический язык с элегантным синтаксисом, известный благодаря фреймворку Ruby on Rails.",
        icon: "ruby",
        difficulty: "easy",
        tags: ["web", "backend", "startups", "prototyping"],
        features: ["Ruby on Rails", "Элегантный синтаксис", "Быстрая разработка", "Startup экосистема", "Метапрограммирование"],
        color: "#cc342d",
        popularity: 55,
        release_year: 1995,
        paradigm: ["object-oriented", "functional"],
        job_market: "medium"
    },
    {
        id: 13,
        name: "Scala",
        description: "Гибридный язык, сочетающий объектно-ориентированное и функциональное программирование на JVM.",
        icon: "scala",
        difficulty: "hard",
        tags: ["backend", "big-data", "functional", "jvm"],
        features: ["Функциональное программирование", "Big Data", "Akka", "JVM совместимость", "Выразительность"],
        color: "#dc322f",
        popularity: 45,
        release_year: 2004,
        paradigm: ["functional", "object-oriented"],
        job_market: "niche"
    },
    {
        id: 14,
        name: "R",
        description: "Язык для статистических вычислений, анализа данных и визуализации.",
        icon: "r",
        difficulty: "medium",
        tags: ["data", "statistics", "analysis", "visualization"],
        features: ["Статистический анализ", "Визуализация данных", "Data Science", "Биоинформатика", "Исследования"],
        color: "#276dc3",
        popularity: 50,
        release_year: 1993,
        paradigm: ["functional", "vectorized"],
        job_market: "specialized"
    },
    {
        id: 15,
        name: "SQL",
        description: "Язык для работы с реляционными базами данных, управления и запросов к данным.",
        icon: "database",
        difficulty: "easy",
        tags: ["database", "backend", "analytics", "reports"],
        features: ["Работа с базами данных", "Аналитика", "Отчеты", "Оптимизация запросов", "Транзакции"],
        color: "#336791",
        popularity: 90,
        release_year: 1974,
        paradigm: ["declarative"],
        job_market: "very_high"
    },
    {
        id: 16,
        name: "Dart",
        description: "Язык от Google для создания кроссплатформенных приложений с фреймворком Flutter.",
        icon: "dart",
        difficulty: "medium",
        tags: ["mobile", "crossplatform", "flutter", "web"],
        features: ["Flutter framework", "Кроссплатформенность", "Горячая перезагрузка", "Производительность", "Web/Mobile"],
        color: "#0175c2",
        popularity: 60,
        release_year: 2011,
        paradigm: ["object-oriented"],
        job_market: "growing"
    },
    {
        id: 17,
        name: "Elixir",
        description: "Функциональный язык для масштабируемых и отказоустойчивых приложений на платформе Erlang VM.",
        icon: "elixir",
        difficulty: "hard",
        tags: ["backend", "concurrent", "scalable", "functional"],
        features: ["Масштабируемость", "Отказоустойчивость", "Phoenix framework", "Concurrency", "Функциональное программирование"],
        color: "#4b275f",
        popularity: 40,
        release_year: 2011,
        paradigm: ["functional", "concurrent"],
        job_market: "niche"
    },
    {
        id: 18,
        name: "Haskell",
        description: "Чисто функциональный язык программирования с продвинутой системой типов.",
        icon: "haskell",
        difficulty: "very_hard",
        tags: ["functional", "academic", "finance", "research"],
        features: ["Функциональное программирование", "Сильная типизация", "Ленивые вычисления", "Академическое применение", "Финансы"],
        color: "#5d4f85",
        popularity: 35,
        release_year: 1990,
        paradigm: ["functional", "lazy"],
        job_market: "specialized"
    }
];

// DOM Elements
const languagesGrid = document.getElementById('languagesGrid');
const filterTabs = document.querySelectorAll('.filter-tab');
const searchInput = document.getElementById('searchInput');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderLanguages(languagesData);
    setupEventListeners();
    animateStats();
    updateLanguageFilters();
});

// Render languages grid with enhanced information
function renderLanguages(languages) {
    if (!languagesGrid) return;

    languagesGrid.innerHTML = languages.map(language => `
        <div class="language-card" data-difficulty="${language.difficulty}" data-tags="${language.tags.join(',')}">
            <div class="language-header">
                <div class="language-icon ${language.icon}">${getLanguageAbbr(language.name)}</div>
                <div class="language-title-section">
                    <h3 class="language-name">${language.name}</h3>
                    <div class="language-meta">
                        <span class="difficulty ${language.difficulty}">
                            <i class="fas fa-${getDifficultyIcon(language.difficulty)}"></i>
                            ${getDifficultyText(language.difficulty)}
                        </span>
                        <span class="job-market ${language.job_market}">
                            ${getJobMarketText(language.job_market)}
                        </span>
                    </div>
                </div>
            </div>
            
            <p class="language-description">${language.description}</p>
            
            <div class="language-stats">
                <div class="language-stat">
                    <span class="stat-value">${language.popularity}%</span>
                    <span class="stat-label">Популярность</span>
                </div>
                <div class="language-stat">
                    <span class="stat-value">${language.release_year}</span>
                    <span class="stat-label">Год выхода</span>
                </div>
                <div class="language-stat">
                    <span class="stat-value">${getParadigmAbbr(language.paradigm)}</span>
                    <span class="stat-label">Парадигма</span>
                </div>
            </div>
            
            <div class="popularity-meter">
                <div class="popularity-fill popularity-${language.popularity}"></div>
            </div>
            
            <div class="language-features">
                ${language.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
            </div>
            
            <div class="language-tags">
                ${language.tags.map(tag => `<span class="language-tag">${tag}</span>`).join('')}
            </div>
            
            <div class="language-footer">
                <div class="language-info">
                    <span class="language-badge ${language.icon}">
                        <i class="${getLanguageIcon(language.name)}"></i>
                        ${getLanguageType(language.tags)}
                    </span>
                </div>
                <button class="btn-learn" onclick="selectLanguage('${language.name}')">
                    Изучать <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Helper functions
function getLanguageAbbr(name) {
    if (name === 'C++') return 'C+';
    if (name === 'C#') return 'C#';
    return name.substring(0, 2).toUpperCase();
}

function getDifficultyIcon(difficulty) {
    const icons = {
        easy: 'seedling',
        medium: 'chart-line',
        hard: 'fire',
        very_hard: 'crown'
    };
    return icons[difficulty] || 'question';
}

function getDifficultyText(difficulty) {
    const texts = {
        easy: 'Начальный',
        medium: 'Средний',
        hard: 'Продвинутый',
        very_hard: 'Экспертный'
    };
    return texts[difficulty] || 'Неизвестно';
}

function getJobMarketText(jobMarket) {
    const texts = {
        very_high: '🔥 Очень высокий',
        high: '📈 Высокий',
        medium: '📊 Средний',
        growing: '🌱 Растущий',
        specialized: '🎯 Специализированный',
        niche: '🔍 Нишевый'
    };
    return texts[jobMarket] || jobMarket;
}

function getParadigmAbbr(paradigms) {
    const abbrMap = {
        'object-oriented': 'ООП',
        'functional': 'ФП',
        'imperative': 'Имп',
        'procedural': 'Проц',
        'event-driven': 'Событ',
        'concurrent': 'Конк',
        'declarative': 'Декл',
        'generic': 'Ген',
        'multi-paradigm': 'Мульти',
        'protocol-oriented': 'Протокол',
        'lazy': 'Ленивый',
        'vectorized': 'Вектор'
    };
    
    return paradigms.map(p => abbrMap[p] || p).slice(0, 2).join(' + ');
}

function getLanguageIcon(languageName) {
    const iconMap = {
        'Python': 'fab fa-python',
        'JavaScript': 'fab fa-js',
        'Java': 'fab fa-java',
        'C++': 'fas fa-copyright',
        'Rust': 'fas fa-cog',
        'Go': 'fab fa-golang',
        'TypeScript': 'fab fa-js-square',
        'Kotlin': 'fab fa-android',
        'Swift': 'fab fa-swift',
        'C#': 'fas fa-code',
        'PHP': 'fab fa-php',
        'Ruby': 'fas fa-gem',
        'Scala': 'fas fa-chart-line',
        'R': 'fas fa-chart-bar',
        'SQL': 'fas fa-database',
        'Dart': 'fas fa-bolt',
        'Elixir': 'fas fa-magic',
        'Haskell': 'fas fa-infinity'
    };
    return iconMap[languageName] || 'fas fa-code';
}

function getLanguageType(tags) {
    if (tags.includes('web')) return 'Веб';
    if (tags.includes('mobile')) return 'Мобильный';
    if (tags.includes('data')) return 'Данные';
    if (tags.includes('system')) return 'Системный';
    if (tags.includes('backend')) return 'Бэкенд';
    if (tags.includes('frontend')) return 'Фронтенд';
    return 'Общий';
}

// Event listeners
function setupEventListeners() {
    // Filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter languages
            filterLanguages(filter);
        });
    });
    
    // Search input
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterLanguages('all', searchTerm);
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Update language filters based on available tags
function updateLanguageFilters() {
    const allTags = new Set();
    languagesData.forEach(language => {
        language.tags.forEach(tag => allTags.add(tag));
    });
    
    // You can dynamically update filter tabs here if needed
    console.log('Available tags:', Array.from(allTags));
}

// Filter languages
function filterLanguages(filter, searchTerm = '') {
    let filtered = languagesData;
    
    // Apply category filter
    if (filter !== 'all') {
        filtered = filtered.filter(lang => lang.tags.includes(filter));
    }
    
    // Apply search filter
    if (searchTerm) {
        filtered = filtered.filter(lang => 
            lang.name.toLowerCase().includes(searchTerm) ||
            lang.description.toLowerCase().includes(searchTerm) ||
            lang.features.some(feature => feature.toLowerCase().includes(searchTerm)) ||
            lang.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }
    
    renderLanguages(filtered);
    
    // Show message if no results
    if (filtered.length === 0) {
        languagesGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>Языки не найдены</h3>
                <p>Попробуйте изменить параметры поиска или фильтрации</p>
            </div>
        `;
    }
}

// Select language
function selectLanguage(languageName) {
    const language = languagesData.find(lang => lang.name === languageName);
    if (language) {
        // Update code editor
        const languageSelect = document.getElementById('languageSelect');
        const codeInput = document.getElementById('codeInput');
        const editorTitle = document.getElementById('editorTitle');
        
        if (languageSelect && codeInput && editorTitle) {
            // Find option by language name
            for (let option of languageSelect.options) {
                if (option.text.toLowerCase() === languageName.toLowerCase()) {
                    languageSelect.value = option.value;
                    break;
                }
            }
            
            // Update editor title
            const extension = getFileExtension(languageSelect.value);
            editorTitle.textContent = `example.${extension}`;
            
            // Update code example
            codeInput.value = getCodeExample(languageSelect.value);
            
            // Scroll to playground
            document.getElementById('playground').scrollIntoView({
                behavior: 'smooth'
            });
            
            // Show notification
            showNotification(`Переключено на ${languageName}`, 'success');
        }
    }
}

// Get file extension
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

// Get code example
function getCodeExample(language) {
    const examples = {
        python: `# Добро пожаловать в Python!
# Простой пример вычисления чисел Фибоначчи

def fibonacci(n):
    """Вычисление чисел Фибоначчи"""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Вывод первых 10 чисел
print("Числа Фибоначчи:")
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")

print("🎉 Отличная работа!")`,
        
        javascript: `// Добро пожаловать в JavaScript!
// Пример работы с асинхронными функциями

async function fetchData() {
    try {
        const response = await fetch('https://api.github.com/users/octocat');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

// Использование промисов
fetchData()
    .then(data => {
        console.log('Данные пользователя:', data);
        console.log('✅ Код выполнен успешно!');
    })
    .catch(error => {
        console.error('❌ Ошибка:', error);
    });`,
        
        java: `// Добро пожаловать в Java!
// Пример объектно-ориентированного программирования

public class Main {
    public static void main(String[] args) {
        // Создание объекта
        Person person = new Person("Анна", 25);
        
        // Вызов методов
        person.greet();
        person.haveBirthday();
        person.greet();
    }
}

class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void greet() {
        System.out.println("Привет, меня зовут " + name + ", мне " + age + " лет!");
    }
    
    public void haveBirthday() {
        age++;
        System.out.println("С днем рождения! Теперь мне " + age + " лет.");
    }
}`,
        
        cpp: `// Добро пожаловать в C++!
// Пример работы с шаблонами и STL

#include <iostream>
#include <vector>
#include <algorithm>

template<typename T>
void printVector(const std::vector<T>& vec) {
    for (const auto& element : vec) {
        std::cout << element << " ";
    }
    std::cout << std::endl;
}

int main() {
    // Создание вектора
    std::vector<int> numbers = {5, 2, 8, 1, 9};
    
    std::cout << "Исходный вектор: ";
    printVector(numbers);
    
    // Сортировка
    std::sort(numbers.begin(), numbers.end());
    
    std::cout << "Отсортированный вектор: ";
    printVector(numbers);
    
    // Поиск элемента
    auto it = std::find(numbers.begin(), numbers.end(), 8);
    if (it != numbers.end()) {
        std::cout << "Найден элемент: " << *it << std::endl;
    }
    
    std::cout << "🎯 Программа завершена успешно!" << std::endl;
    return 0;
}`,
        
        rust: `// Добро пожаловать в Rust!
// Пример работы с владением и заимствованием

fn main() {
    // Создание строки
    let mut greeting = String::from("Привет, ");
    
    // Заимствование для чтения
    print_greeting(&greeting);
    
    // Изменяемое заимствование
    add_name(&mut greeting, "Rust!");
    
    // Владение передается
    let new_greeting = take_ownership(greeting);
    
    println!("{}", new_greeting);
}

fn print_greeting(greeting: &String) {
    println!("{}", greeting);
}

fn add_name(greeting: &mut String, name: &str) {
    greeting.push_str(name);
}

fn take_ownership(s: String) -> String {
    println!("Получена строка: {}", s);
    s
}`,
        
        go: `// Добро пожаловать в Go!
// Пример использования горутин и каналов

package main

import (
    "fmt"
    "time"
)

func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        fmt.Printf("Воркер %d начал задачу %d\\n", id, j)
        time.Sleep(time.Second) // Имитация работы
        results <- j * 2
        fmt.Printf("Воркер %d завершил задачу %d\\n", id, j)
    }
}

func main() {
    const numJobs = 5
    jobs := make(chan int, numJobs)
    results := make(chan int, numJobs)
    
    // Запускаем 3 воркера
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }
    
    // Отправляем задания
    for j := 1; j <= numJobs; j++ {
        jobs <- j
    }
    close(jobs)
    
    // Собираем результаты
    for a := 1; a <= numJobs; a++ {
        <-results
    }
    
    fmt.Println("✅ Все задачи завершены!")
}`,

        typescript: `// Добро пожаловать в TypeScript!
// Пример работы с типами и интерфейсами

interface User {
    id: number;
    name: string;
    email: string;
}

function getUserInfo(user: User): string {
    return \`Пользователь \${user.name} (\${user.email})\`;
}

// Использование с типами
const currentUser: User = {
    id: 1,
    name: "Анна",
    email: "anna@example.com"
};

console.log(getUserInfo(currentUser));
console.log("✅ TypeScript обеспечивает типобезопасность!");`,

        kotlin: `// Добро пожаловать в Kotlin!
// Пример работы с null safety и extension functions

data class User(val name: String, val age: Int?)

fun User.getDescription(): String {
    val ageText = if (age != null) age.toString() else "не указан"
    return "Имя: $name, Возраст: $ageText"
}

fun main() {
    val user1 = User("Максим", 25)
    val user2 = User("Анна", null)
    
    println(user1.getDescription())
    println(user2.getDescription())
    println("🎯 Kotlin - современный язык для Android!")
}`,

        swift: `// Добро пожаловать в Swift!
// Пример работы с optionals и struct

struct User {
    let name: String
    var age: Int?
    
    func describe() -> String {
        if let userAge = age {
            return "\\(name), \\(userAge) лет"
        } else {
            return "\\(name), возраст не указан"
        }
    }
}

let user1 = User(name: "Иван", age: 30)
let user2 = User(name: "Мария", age: nil)

print(user1.describe())
print(user2.describe())
print("🚀 Swift - мощный язык для Apple экосистемы!")`,

        csharp: `// Добро пожаловать в C#!
// Пример ООП и работы с LINQ

using System;
using System.Linq;
using System.Collections.Generic;

public class Program {
    public static void Main() {
        List<User> users = new List<User> {
            new User("Алексей", 25),
            new User("Светлана", 30),
            new User("Дмитрий", 22)
        };
        
        var youngUsers = users.Where(u => u.Age < 30)
                             .OrderBy(u => u.Name);
        
        foreach (var user in youngUsers) {
            Console.WriteLine(user.GetInfo());
        }
        Console.WriteLine("🎮 C# - отличный выбор для игр на Unity!");
    }
}

public class User {
    public string Name { get; set; }
    public int Age { get; set; }
    
    public User(string name, int age) {
        Name = name;
        Age = age;
    }
    
    public string GetInfo() {
        return $\"{Name}, {Age} лет\";
    }
}`,

        php: `<?php
// Добро пожаловать в PHP!
// Пример работы с массивами и функциями

class User {
    public $name;
    public $email;
    
    public function __construct($name, $email) {
        $this->name = $name;
        $this->email = $email;
    }
    
    public function getInfo() {
        return "Пользователь: {$this->name} ({$this->email})";
    }
}

$users = [
    new User("Анна", "anna@example.com"),
    new User("Петр", "petr@example.com")
];

foreach ($users as $user) {
    echo $user->getInfo() . "\\n";
}

echo "🌐 PHP - основа веб-разработки!";
?>`,

        ruby: `# Добро пожаловать в Ruby!
# Пример работы с блоками и метапрограммированием

class User
    attr_accessor :name, :age
    
    def initialize(name, age)
        @name = name
        @age = age
    end
    
    def introduce
        "Привет, меня зовут #{@name}, мне #{@age} лет"
    end
end

users = [
    User.new("Ольга", 28),
    User.new("Сергей", 32)
]

users.each do |user|
    puts user.introduce
end

puts "💎 Ruby - элегантный и выразительный язык!"`,

        sql: `-- Добро пожаловать в SQL!
-- Пример создания таблицы и запросов

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка данных
INSERT INTO users (name, email, age) VALUES
('Анна Иванова', 'anna@example.com', 25),
('Петр Сидоров', 'petr@example.com', 30),
('Мария Петрова', 'maria@example.com', 28);

-- Выборка данных
SELECT name, email, age 
FROM users 
WHERE age > 25 
ORDER BY name ASC;

-- Агрегатные функции
SELECT 
    COUNT(*) as total_users,
    AVG(age) as average_age
FROM users;

-- 🔍 SQL - основа работы с данными!`,

        dart: `// Добро пожаловать в Dart!
// Пример работы с асинхронностью и классами

class User {
    final String name;
    final int age;
    
    User(this.name, this.age);
    
    String get description => 'Имя: $name, Возраст: $age';
    
    Future<String> fetchBio() async {
        // Имитация асинхронного запроса
        await Future.delayed(Duration(seconds: 1));
        return 'Биография пользователя $name';
    }
}

void main() async {
    final user = User('Александр', 29);
    print(user.description);
    
    final bio = await user.fetchBio();
    print(bio);
    print('🎯 Dart + Flutter = кроссплатформенные приложения!');
}`
    };
    
    return examples[language] || `// Пример кода на ${language}`;
}

// Animate statistics
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 16);
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Use auth system notification if available
    if (window.auth && auth.showNotification) {
        auth.showNotification(message, type);
        return;
    }
    
    // Fallback notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--accent)' : 'var(--primary)'};
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

// Export functions for global access
window.selectLanguage = selectLanguage;
window.showNotification = showNotification;

// Language statistics and analytics
function getLanguagesStats() {
    const stats = {
        total: languagesData.length,
        byDifficulty: {
            easy: languagesData.filter(l => l.difficulty === 'easy').length,
            medium: languagesData.filter(l => l.difficulty === 'medium').length,
            hard: languagesData.filter(l => l.difficulty === 'hard').length,
            very_hard: languagesData.filter(l => l.difficulty === 'very_hard').length
        },
        byJobMarket: {
            very_high: languagesData.filter(l => l.job_market === 'very_high').length,
            high: languagesData.filter(l => l.job_market === 'high').length,
            medium: languagesData.filter(l => l.job_market === 'medium').length,
            growing: languagesData.filter(l => l.job_market === 'growing').length,
            specialized: languagesData.filter(l => l.job_market === 'specialized').length,
            niche: languagesData.filter(l => l.job_market === 'niche').length
        },
        averagePopularity: Math.round(languagesData.reduce((sum, lang) => sum + lang.popularity, 0) / languagesData.length),
        oldestLanguage: languagesData.reduce((oldest, lang) => lang.release_year < oldest.release_year ? lang : oldest),
        newestLanguage: languagesData.reduce((newest, lang) => lang.release_year > newest.release_year ? lang : newest)
    };
    
    return stats;
}

// Initialize language statistics
console.log('Language Statistics:', getLanguagesStats());