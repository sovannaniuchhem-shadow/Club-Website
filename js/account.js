// Account and Login System
export function initializeAccount() {
    const userBtn = document.querySelector('.user-btn');
    const accountPanel = document.getElementById('accountPanel');
    const accountClose = document.querySelector('.account-close');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const toggleSignupBtn = document.getElementById('toggleSignupBtn');
    const toggleLoginBtn = document.getElementById('toggleLoginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userGreeting = document.getElementById('userGreeting');

    if (!userBtn || !accountPanel) {
        console.warn('Account UI elements not found');
        return;
    }

    // Initialize account state
    displayUserStatus();

    // Toggle account panel
    userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        accountPanel.classList.toggle('active');
    });

    // Close account panel
    accountClose?.addEventListener('click', () => {
        accountPanel.classList.remove('active');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!accountPanel.contains(e.target) && !userBtn.contains(e.target)) {
            accountPanel.classList.remove('active');
        }
    });

    // Toggle between login and signup
    toggleSignupBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    });

    toggleLoginBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    // Handle login
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        if (email && password) {
            loginUser(email, password);
            loginForm.reset();
            accountPanel.classList.remove('active');
        }
    });

    // Handle signup
    signupForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;

        if (!name || !email || !password || !confirmPassword) {
            alert('Please fill all fields');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }

        signupUser(name, email, password);
        signupForm.reset();
        accountPanel.classList.remove('active');
    });

    // Handle logout
    logoutBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        logoutUser();
        accountPanel.classList.remove('active');
        displayUserStatus();
    });
}

function loginUser(email, password) {
    // Get all registered users
    const users = getAllUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
        alert('User not found. Please sign up first.');
        return;
    }

    if (user.password !== password) {
        alert('Invalid password');
        return;
    }

    // Store current user session
    localStorage.setItem('blueStepCurrentUser', JSON.stringify({
        name: user.name,
        email: user.email,
        id: user.id,
        loginTime: new Date().toISOString()
    }));

    alert(`Welcome back, ${user.name}!`);
    displayUserStatus();
}

function signupUser(name, email, password) {
    const users = getAllUsers();

    // Check if email already exists
    if (users.find(u => u.email === email)) {
        alert('Email already registered');
        return;
    }

    // Create new user
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        registeredDate: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('blueStepUsers', JSON.stringify(users));

    // Auto-login after signup
    loginUser(email, password);
}

function logoutUser() {
    localStorage.removeItem('blueStepCurrentUser');
    alert('You have been logged out');
    displayUserStatus();
}

function getAllUsers() {
    const users = localStorage.getItem('blueStepUsers');
    return users ? JSON.parse(users) : [];
}

function getCurrentUser() {
    const user = localStorage.getItem('blueStepCurrentUser');
    return user ? JSON.parse(user) : null;
}

function displayUserStatus() {
    const currentUser = getCurrentUser();
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const userGreeting = document.getElementById('userGreeting');
    const accountActions = document.getElementById('accountActions');
    const logoutBtn = document.getElementById('logoutBtn');

    if (currentUser) {
        // User is logged in
        if (loginForm) loginForm.classList.add('hidden');
        if (signupForm) signupForm.classList.add('hidden');
        if (userGreeting) {
            userGreeting.classList.remove('hidden');
            const greetingName = userGreeting.querySelector('h3') || document.createElement('h3');
            const greetingEmail = userGreeting.querySelector('p') || document.createElement('p');
            greetingName.textContent = `Welcome, ${escapeHtml(currentUser.name)}!`;
            greetingEmail.textContent = escapeHtml(currentUser.email);
            if (!userGreeting.querySelector('h3')) userGreeting.appendChild(greetingName);
            if (!userGreeting.querySelector('p')) userGreeting.appendChild(greetingEmail);
        }
        if (accountActions) accountActions.classList.remove('hidden');
        if (logoutBtn) logoutBtn.classList.remove('hidden');
    } else {
        // User is not logged in
        if (loginForm) loginForm.classList.remove('hidden');
        if (signupForm) signupForm.classList.add('hidden');
        if (userGreeting) userGreeting.classList.add('hidden');
        if (accountActions) accountActions.classList.add('hidden');
        if (logoutBtn) logoutBtn.classList.add('hidden');
    }
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

export { getCurrentUser, getAllUsers };
