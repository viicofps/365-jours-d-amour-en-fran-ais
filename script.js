const correctUsername = "Elle"; // Identifiant que tu choisis
const correctPassword = "Amour2MaVie"; // Mot de passe que tu choisis
const loginForm = document.getElementById("loginForm");
const usernameField = document.getElementById("username");
const passwordField = document.getElementById("password");
const loginError = document.getElementById("loginError");
const loginSection = document.getElementById("login");
const loaderSection = document.getElementById("loader");
const contentSection = document.getElementById("content");
const countdown = document.getElementById("countdown");
const dailyMessage = document.getElementById("dailyMessage");

const startDate = new Date('February 14, 2025 03:00:00 GMT+0100').getTime(); // Début à 3h du matin heure FR
const endDate = new Date('February 13, 2026 23:59:00 GMT+0100').getTime();
const now = new Date().getTime();

// Vérifier si l'utilisateur est déjà connecté
if (localStorage.getItem("loggedIn") === "true") {
    loginSection.style.display = "none"; // Cache la page de login si connecté
    loaderSection.style.display = "block"; // Affiche le loader
    setTimeout(displayContent, 2000); // Attend 2 secondes avant d'afficher le contenu
} else {
    // Si non connecté, afficher le formulaire de login
    loginSection.style.display = "block";
}

// Événement de soumission du formulaire de connexion
loginForm.addEventListener("submit", function(e) {
    e.preventDefault(); // Empêche le rechargement de la page

    const enteredUsername = usernameField.value;
    const enteredPassword = passwordField.value;

    if (enteredUsername === correctUsername && enteredPassword === correctPassword) {
        // Si l'identifiant et le mot de passe sont corrects
        localStorage.setItem("loggedIn", "true"); // Mémorise la connexion dans le localStorage
        loginSection.style.display = "none"; // Cache la section de connexion
        loaderSection.style.display = "block"; // Affiche le loader
        setTimeout(displayContent, 2000); // Attend 2 secondes avant d'afficher le contenu
    } else {
        // Si l'identifiant ou le mot de passe est incorrect
        loginError.style.display = "block";
    }
});

// Fonction pour afficher le contenu après la connexion
function displayContent() {
    if (localStorage.getItem("loggedIn") === "true") {
        loaderSection.style.display = "none"; // Masque le loader
        contentSection.style.display = "block"; // Affiche le contenu

        // Afficher le message du jour et le compte à rebours
        const messages = [
            "💕 Chaque jour loin de toi me rappelle à quel point tu es précieuse à mes yeux. Je t'aime et je te souhaite une merveilleuse journée ! 💕",
            "💕 Défi du jour : Envoie moi 3 rêves que tu souhaiterais réaliser avec moi 💕",
            "💕 Défi du jour : Raconte moi un souvenir mignon ou drôle que tu as de nous deux et pourquoi il t’a marquée 💕",
            "💕 Poème du jour :\n Mon Amour, \nQuand je me réveille, je pense à toi \nQuand je souris, c’est grâce à toi.\nChaque jour, tu rends ma vie plus belle, \nTu es mon étoile, ma douce étincelle.💕",
            "💕 Défi du jour : Écris-nous une lettre (même courte) que nous révouvrirons dans 3 ans 💕",
            "💕 Parfois, il suffit d’un regard, d’un sourire ou d’un mot pour embellir une journée. Aujourd’hui, je veux juste te rappeler que tu es ma personne préférée au monde. 💕",
            "💕 Aujourd’hui, je voulais juste te rappeler une chose simple : tu es la plus belle coïncidence de ma vie, et je suis infiniment chanceux de t’avoir. 💕",
            "💕 Défi du jour : Ferme les yeux et pense à moi… Quelle est la première image qui te vient en tête ? Dis-moi tout ! 💕",
            "💕  💕",
            "💕  💕",
            "💕  💕",
            "💕  💕",
            "💕  💕",
            "💕  💕",
            "💕  💕",
            // Ajoute ici les 365 messages
        ];

        // Calcul du bon index de message
        const dayIndex = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
        dailyMessage.innerText = messages[dayIndex] || "Aucun message disponible.";

        // Compte à rebours
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
}

// Fonction pour mettre à jour le compte à rebours
function updateCountdown() {
    const now = new Date().getTime();
    let nextChange = new Date();
    nextChange.setHours(3, 0, 0, 0); // Prochain changement à 3h du matin

    if (now >= nextChange.getTime()) {
        nextChange.setDate(nextChange.getDate() + 1); // Passe au jour suivant
    }

    let timeLeft = nextChange.getTime() - now;

    let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    countdown.innerHTML = `Prochain message dans : ${hours}h ${minutes}m ${seconds}s`;
}
