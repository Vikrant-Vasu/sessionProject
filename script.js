document.addEventListener("DOMContentLoaded", function () {

    const loginBtn = document.getElementById('login-btn');
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const userSpan = document.getElementById('user');
    const timeoutMessage = document.getElementById('timeout-message');
    const homeBtn = document.getElementById('home-btn');
    const aboutBtn = document.getElementById('about-btn');
    const contactBtn = document.getElementById('contact-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    const SESSION_DURATION = 1*60 * 1000;
    //credentials
    const VALID_USERNAME = 'admin';
    const VALID_PASSWORD = '123456';

    function startSession(username) {
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('sessionStart', Date.now());

        timeoutMessage.style.display = 'none';
        
        setTimeout(function() {
            endSession(true);
        }, SESSION_DURATION);

        // Check if the current page is the login page before redirection
        if (window.location.pathname.includes("index.html")) {
            window.location.href = "./pages/home.html";
        }
        updateUI();
    }

    function endSession(showTimeoutMessage = false) {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('sessionStart');
        if (showTimeoutMessage) {
            if (!window.location.pathname.includes("index.html")) {
                window.location.href = "index.html";
                timeoutMessage.style.display = 'block';
            }
            
        } else {
            
            timeoutMessage.style.display = 'none';
        }
        // Check if the current page is a protected page before redirection
        if (!window.location.pathname.includes("index.html")) {
            window.location.href = "../index.html";
        }
       
        
        }

    function updateUI() {
        const username = sessionStorage.getItem('username');
        if (username) {
            userSpan.textContent = username;            
        } 
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            const username = usernameInput.value;
            const password = passwordInput.value;
            if (username === VALID_USERNAME && password === VALID_PASSWORD) {
                startSession(username);
            } else {
                const error = document.getElementById("Error");
                error.textContent = "Invalid Username or Password!"
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            endSession(false);
        });
    }

    if (homeBtn) {
        homeBtn.addEventListener('click', function() {
            window.location.href = "home.html";
        });
    }

    if (aboutBtn) {
        aboutBtn.addEventListener('click', function() {
            window.location.href = "about.html";
        });
    }

    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            window.location.href = "contact.html";
        });
    }

    const sessionStart = sessionStorage.getItem('sessionStart');
    if (sessionStart && (Date.now() - sessionStart < SESSION_DURATION)) {
        setTimeout(function() {
            endSession(true);
        }, SESSION_DURATION - (Date.now() - sessionStart));
    } else {
        endSession();
    }

    updateUI();
    
});
