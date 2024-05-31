document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("login-btn");
  //   const loginForm = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const userSpan = document.getElementById("user");
  const timeoutMessage = document.getElementById("timeout-message");
  const homeBtn = document.getElementById("home-btn");
  const aboutBtn = document.getElementById("about-btn");
  const contactBtn = document.getElementById("contact-btn");
  const logoutBtn = document.getElementById("logout-btn");

  const SESSION_DURATION = 30 * 1000; // 30 seconds for testing

  const VALID_USERNAME = "admin";
  const VALID_PASSWORD = "123456";

  function startSession(username) {
    localStorage.setItem("username", username);
    localStorage.setItem("sessionStart", Date.now().toString());

    timeoutMessage.style.display = "none";

    const endTime = Date.now() + SESSION_DURATION;
    localStorage.setItem("sessionEndTime", endTime.toString());

    window.location.href = "./pages/home.html"; //removed the if condition becoz this function is running only once so there's no need to apply the condition
    updateUI();
  }

  function endSession(showTimeoutMessage = false) {
    localStorage.removeItem("username");
    localStorage.removeItem("sessionStart");
    localStorage.removeItem("sessionEndTime");

    if (!window.location.pathname.includes("index.html")) {
      window.location.href = "../index.html";
    }

    if (showTimeoutMessage) {
      updateUI(true)
    } else {
        
      timeoutMessage.style.display = "none";
    }

  }

  function updateUI(showTimeoutMessage=false) {
    const username = localStorage.getItem("username");
    console.log("ye chal rha hau sbse pehle upadate ui");

    if (username) {
      userSpan.textContent = username;
    }
    if (showTimeoutMessage) {
        timeoutMessage.style.display = "block";
        console.log("this should work when the session is ending and ui is updating");
      } else {
        timeoutMessage.style.display = "none";
      }
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      const username = usernameInput.value;
      const password = passwordInput.value;

      if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        startSession(username);
      } else {
        const error = document.getElementById("Error");
        if (error) error.textContent = "Invalid Username or Password!";
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      endSession(false);
    });
  }

  if (homeBtn) {
    homeBtn.addEventListener("click", function () {
      window.location.href = "home.html";
    });
  }

  if (aboutBtn) {
    aboutBtn.addEventListener("click", function () {
      window.location.href = "about.html";
    });
  }

  if (contactBtn) {
    contactBtn.addEventListener("click", function () {
      window.location.href = "contact.html";
    });
  }

  function checkSession() {
    const sessionStart = localStorage.getItem("sessionStart");
    const sessionEndTime = localStorage.getItem("sessionEndTime");

    if (sessionStart && sessionEndTime) {
      const remainingTime = sessionEndTime - Date.now();
      if (remainingTime > 0) {
        //we have to run a line of code so that if the time is left and we open another tab then the home page should open up
        if (window.location.pathname.includes("index.html")) {
          window.location.href = "./pages/home.html";
        }
        console.log("this should work");

        setTimeout(function () {
          endSession(true);
        }, remainingTime);
      }
      
      else {
        endSession(true);
        console.log(
          "else condition will work if there is no start and end time"
        );
      }
    }else{
        endSession()
    }
    
  }

  checkSession();
});
