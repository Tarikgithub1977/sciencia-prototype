// ===== Variables globales =====
let courseData = {
    level: "",
    subject: "",
    topic: "",
    format: "",
    language: "fr",
    duration: "medium",
    includeExercises: false,
    includeSummary: false,
    includeQCM: false
};

// ===== DOM Elements =====
const courseForm = document.getElementById("courseForm");
const previewSection = document.getElementById("previewSection");
const coursePreview = document.getElementById("coursePreview");
const exportBtn = document.getElementById("exportBtn");
const editBtn = document.getElementById("editBtn");
const downloadBtn = document.getElementById("downloadBtn");
const shareBtn = document.getElementById("shareBtn");
const regenerateBtn = document.getElementById("regenerateBtn");
const generateBtn = document.querySelector(".btn-generate");

// ===== Événements =====
if (courseForm) {
    courseForm.addEventListener("submit", handleFormSubmit);
}

if (exportBtn) {
    exportBtn.addEventListener("click", exportCourse);
}

if (editBtn) {
    editBtn.addEventListener("click", editCourse);
}

if (downloadBtn) {
    downloadBtn.addEventListener("click", downloadCourse);
}

if (regenerateBtn) {
    regenerateBtn.addEventListener("click", regenerateCourse);
}

// ===== Fonctions =====
function handleFormSubmit(e) {
    e.preventDefault();

    // Récupérer les données du formulaire
    courseData.level = document.getElementById("level").value;
    courseData.subject = document.querySelector('input[name="subject"]:checked').value;
    courseData.topic = document.getElementById("topic").value;
    courseData.format = document.getElementById("format").value;
    courseData.language = document.getElementById("language").value;
    courseData.duration = document.getElementById("duration").value;
    courseData.includeExercises = document.getElementById("includeExercises").checked;
    courseData.includeSummary = document.getElementById("includeSummary").checked;
    courseData.includeQCM = document.getElementById("includeQCM").checked;

    // Afficher le loading
    generateBtn.classList.add("loading");

    // Simuler un appel à l'IA (remplacer par un vrai appel API plus tard)
    setTimeout(() => {
        generateCourseWithAI();
        generateBtn.classList.remove("loading");
    }, 1500);
}

function generateCourseWithAI() {
    // Ici, vous appelerez une vraie API d'IA (ex: Mistral AI, Hugging Face, ou votre propre backend).
    // Pour ce prototype, on simule une réponse.

    const subjectNames = {
        maths: "Mathématiques",
        physique: "Physique",
        chimie: "Chimie",
        biologie: "Biologie"
    };

    const levelNames = {
        college: "Collège",
        lycee: "Lycée",
        universite: "Université",
        "formation-pro": "Formation Professionnelle"
    };

    // Générer un cours fictif (à remplacer par un vrai appel API)
    const courseContent = generateMockCourse(
        courseData.subject,
        courseData.topic,
        courseData.level,
        courseData.language,
        courseData.duration,
        courseData.includeExercises,
        courseData.includeSummary,
        courseData.includeQCM
    );

    // Afficher l'aperçu
    coursePreview.innerHTML = courseContent;
    previewSection.style.display = "block";

    // Stocker les données pour la page de résultat
    localStorage.setItem("courseData", JSON.stringify(courseData));
    localStorage.setItem("courseContent", courseContent);
}

function generateMockCourse(subject, topic, level, language, duration, includeExercises, includeSummary, includeQCM) {
    // Traductions pour les matières et niveaux
    const subjectTranslations = {
        fr: {
            maths: "Mathématiques",
            physique: "Physique",
            chimie: "Chimie",
            biologie: "Biologie"
        },
        ar: {
            maths: "رياضيات",
            physique: "فيزياء",
            chimie: "كيمياء",
            biologie: "أحياء"
        },
        en: {
            maths: "Mathematics",
            physique: "Physics",
            chimie: "Chemistry",
            biologie: "Biology"
        }
    };

    const levelTranslations = {
        fr: {
            college: "Collège",
            lycee: "Lycée",
            universite: "Université",
            "formation-pro": "Formation Professionnelle"
        },
        ar: {
            college: "المدرسة الإعدادية",
            lycee: "الثانوية",
            universite: "جامعة",
            "formation-pro": "التدريب المهني"
        },
        en: {
            college: "Middle School",
            lycee: "High School",
            universite: "University",
            "formation-pro": "Vocational Training"
        }
    };

    // Sélectionner la langue
    const subjectName = subjectTranslations[language][subject] || subjectTranslations.fr[subject];
    const levelName = levelTranslations[language][level] || levelTranslations.fr[level];

    // Contenu du cours (exemple pour les maths)
    let content = `
        <div class="course-header">
            <h2>${subjectName} - ${levelName}</h2>
            <h3>${topic}</h3>
            <p><strong>Durée estimée :</strong> ${getDurationText(duration, language)}</p>
        </div>
    `;

    // Ajouter un résumé si demandé
    if (includeSummary) {
        content += `
            <div class="course-section">
                <h3>Résumé</h3>
                <p>Ce cours traite de <strong>${topic}</strong>, un sujet fondamental en ${subjectName.toLowerCase()} pour les élèves de ${levelName.toLowerCase()}. Nous aborderons les concepts clés, des exemples concrets, et des applications pratiques.</p>
            </div>
        `;
    }

    // Contenu principal (exemple pour les maths)
    if (subject === "maths") {
        content += `
            <div class="course-section">
                <h3>1. Introduction</h3>
                <p>Les ${topic.toLowerCase()} sont un outil essentiel en ${subjectName.toLowerCase()}. Elles permettent de modéliser et résoudre des problèmes variés, allant de la géométrie à l'algèbre.</p>
                <p>Dans ce cours, nous allons explorer :</p>
                <ul>
                    <li>La définition et les propriétés des ${topic.toLowerCase()} ;</li>
                    <li>Les méthodes de résolution ;</li>
                    <li>Des exemples concrets et des exercices d'application.</li>
                </ul>
            </div>

            <div class="course-section">
                <h3>2. Définition</h3>
                <p>Une ${topic.toLowerCase().replace("les ", "")} est une équation de la forme :</p>
                <p class="formula">ax² + bx + c = 0</p>
                <p>où <em>a</em>, <em>b</em> et <em>c</em> sont des nombres réels, avec <em>a ≠ 0</em>.</p>
            </div>
        `;
    }
    // Contenu pour la physique
    else if (subject === "physique") {
        content += `
            <div class="course-section">
                <h3>1. Introduction</h3>
                <p>Le concept de <strong>${topic}</strong> est central en physique. Il permet de comprendre les lois fondamentales qui régissent notre univers.</p>
            </div>
            <div class="course-section">
                <h3>2. Définition et principes</h3>
                <p>La <strong>${topic}</strong> est définie comme suit : [Insérer définition ici].</p>
            </div>
        `;
    }
    // Contenu pour la chimie
    else if (subject === "chimie") {
        content += `
            <div class="course-section">
                <h3>1. Introduction</h3>
                <p>En chimie, <strong>${topic}</strong> joue un rôle clé dans [domaine spécifique].</p>
            </div>
        `;
    }
    // Contenu pour la biologie
    else if (subject === "biologie") {
        content += `
            <div class="course-section">
                <h3>1. Introduction</h3>
                <p>En biologie, <strong>${topic}</strong> est un processus essentiel pour [fonction biologique].</p>
            </div>
        `;
    }

    // Ajouter des exercices si demandé
    if (includeExercises) {
        content += `
            <div class="course-section">
                <h3>Exercices</h3>
                <ol>
                    <li><p><strong>Exercice 1 :</strong> Résolvez l'équation suivante : x² - 5x + 6 = 0.</p></li>
                    <li><p><strong>Exercice 2 :</strong> Trouvez les racines de l'équation 2x² + 4x - 6 = 0.</p></li>
                </ol>
            </div>
        `;
    }

    // Ajouter un QCM si demandé
    if (includeQCM) {
        content += `
            <div class="course-section">
                <h3>QCM</h3>
                <ol>
                    <li><p><strong>Question 1 :</strong> Quelle est la forme générale d'une équation du second degré ?</p>
                        <ul>
                            <li>a) ax + b = 0</li>
                            <li>b) ax² + bx + c = 0</li>
                            <li>c) ax³ + bx² + cx + d = 0</li>
                        </ul>
                    </li>
                    <li><p><strong>Question 2 :</strong> Combien de racines une équation du second degré peut-elle avoir ?</p>
                        <ul>
                            <li>a) 0</li>
                            <li>b) 1 ou 2</li>
                            <li>c) 2 ou 3</li>
                        </ul>
                    </li>
                </ol>
            </div>
        `;
    }

    // Conclusion
    content += `
        <div class="course-section">
            <h3>Conclusion</h3>
            <p>Nous avons vu dans ce cours les bases de <strong>${topic}</strong> en ${subjectName.toLowerCase()}. Pour aller plus loin, nous vous encourageons à pratiquer avec les exercices proposés et à explorer des cas concrets.</p>
        </div>
    `;

    return content;
}

function getDurationText(duration, language) {
    const durations = {
        fr: {
            short: "10-15 minutes",
            medium: "30-45 minutes",
            long: "1 heure ou plus"
        },
        ar: {
            short: "10-15 دقيقة",
            medium: "30-45 دقيقة",
            long: "ساعة أو أكثر"
        },
        en: {
            short: "10-15 minutes",
            medium: "30-45 minutes",
            long: "1 hour or more"
        }
    };
    return durations[language][duration] || durations.fr[duration];
}

function exportCourse() {
    // Récupérer le contenu du cours
    const courseContent = coursePreview.innerHTML;

    // Créer une nouvelle fenêtre pour l'export
    const exportWindow = window.open("", "_blank");
    exportWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Cours - SciencIA</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; padding: 2rem; }
                h1, h2, h3 { color: #1F2937; }
                .course-section { margin-bottom: 2rem; }
                .formula { background: #f0f0f0; padding: 0.5rem; border-radius: 0.25rem; text-align: center; }
            </style>
        </head>
        <body>
            <h1>SciencIA - Cours de ${document.querySelector('input[name="subject"]:checked').value}</h1>
            ${courseContent}
        </body>
        </html>
    `);
    exportWindow.document.close();
    exportWindow.print();
}

function editCourse() {
    // Retour à la page de génération
    window.location.href = "generate.html";
}

function downloadCourse() {
    // Récupérer les données du cours depuis localStorage
    const courseContent = localStorage.getItem("courseContent");
    const courseData = JSON.parse(localStorage.getItem("courseData"));

    // Créer un Blob avec le contenu HTML
    const blob = new Blob([`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Cours - ${courseData.topic} | SciencIA</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; padding: 2rem; max-width: 800px; margin: 0 auto; }
                h1, h2, h3 { color: #1F2937; }
                .course-section { margin-bottom: 2rem; }
                .formula { background: #f0f0f0; padding: 0.5rem; border-radius: 0.25rem; text-align: center; }
                .course-header { border-bottom: 1px solid #e5e5e5; padding-bottom: 1rem; margin-bottom: 2rem; }
            </style>
        </head>
        <body>
            <div class="course-header">
                <h1>${courseData.topic}</h1>
                <p><strong>Matière :</strong> ${document.querySelector(`input[name="subject"][value="${courseData.subject}"]`).nextElementSibling.textContent.trim()}</p>
                <p><strong>Niveau :</strong> ${document.getElementById("level").options[document.getElementById("level").selectedIndex].text}</p>
            </div>
            ${courseContent}
        </body>
        </html>
    `], { type: "text/html" });

    // Créer un lien de téléchargement
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cours_${courseData.subject}_${courseData.topic.replace(/\s+/g, "_")}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function regenerateCourse() {
    // Retour à la page de génération avec les mêmes données
    window.location.href = "generate.html";
}

// ===== Charger les données sur la page de résultat =====
if (result.html) {
    window.addEventListener("DOMContentLoaded", () => {
        const courseData = JSON.parse(localStorage.getItem("courseData"));
        const courseContent = localStorage.getItem("courseContent");

        if (courseData && courseContent) {
            // Remplir les métadonnées
            document.getElementById("resultLevel").textContent = document.getElementById("level").options.find(opt => opt.value === courseData.level).text;
            document.getElementById("resultSubject").textContent = document.querySelector(`input[name="subject"][value="${courseData.subject}"]`).nextElementSibling.textContent.trim();
            document.getElementById("resultTopic").textContent = courseData.topic;

            // Remplir le contenu du cours
            document.getElementById("courseContent").innerHTML = courseContent;
        } else {
            // Rediriger vers la page de génération si aucune donnée
            window.location.href = "generate.html";
        }
    });
}
