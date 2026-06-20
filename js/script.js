document.addEventListener('DOMContentLoaded', function () {

    // ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (themeToggle) {
        themeToggle.innerHTML = currentTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        themeToggle.addEventListener('click', function () {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            this.innerHTML = next === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });
    }

    // ===== COUNTER ANIMATION (index) =====
    const counters = document.querySelectorAll('.counter');
    const speed = 150;
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / speed;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => observer.observe(counter));

    // ===== PASSWORD TOGGLE =====
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            if (input) {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                const icon = this.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-eye');
                    icon.classList.toggle('fa-eye-slash');
                }
            }
        });
    });

    // ===== PASSWORD MATCH (signup) =====
    const password = document.getElementById('signupPassword');
    const confirm = document.getElementById('confirmPassword');
    const matchMsg = document.getElementById('matchMessage');
    if (password && confirm && matchMsg) {
        const checkMatch = () => {
            if (confirm.value.length === 0) { matchMsg.innerHTML = ''; return; }
            if (password.value === confirm.value) {
                matchMsg.innerHTML = '<i class="fas fa-check-circle text-success me-1"></i> Passwords match!';
                matchMsg.style.color = '#198754';
            } else {
                matchMsg.innerHTML = '<i class="fas fa-times-circle text-danger me-1"></i> Passwords do not match';
                matchMsg.style.color = '#dc3545';
            }
        };
        password.addEventListener('input', checkMatch);
        confirm.addEventListener('input', checkMatch);
    }

    // ===== SHOW/HIDE PHONE SECTIONS =====
    const showPhoneSignin = document.getElementById('showPhoneSignin');
    const phoneSigninSection = document.getElementById('phoneSigninSection');
    if (showPhoneSignin && phoneSigninSection) {
        showPhoneSignin.addEventListener('click', function (e) {
            e.preventDefault();
            const isHidden = phoneSigninSection.style.display === 'none';
            phoneSigninSection.style.display = isHidden ? 'block' : 'none';
            this.innerHTML = isHidden
                ? '<i class="fas fa-envelope me-2 text-muted"></i>Use email instead'
                : '<i class="fas fa-phone me-2 text-primary"></i>Sign in with Phone Number';
        });
    }
    const showPhoneSignup = document.getElementById('showPhoneSignup');
    const phoneSignupSection = document.getElementById('phoneSignupSection');
    if (showPhoneSignup && phoneSignupSection) {
        showPhoneSignup.addEventListener('click', function (e) {
            e.preventDefault();
            const isHidden = phoneSignupSection.style.display === 'none';
            phoneSignupSection.style.display = isHidden ? 'block' : 'none';
            this.innerHTML = isHidden
                ? '<i class="fas fa-envelope me-2 text-muted"></i>Use email instead'
                : '<i class="fas fa-phone me-2 text-primary"></i>Sign up with Phone Number';
        });
    }

    // ===== SHOW TOAST MESSAGE (helper) =====
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `alert alert-${type} position-fixed top-0 start-50 translate-middle-x mt-3 shadow-lg`;
        toast.style.zIndex = '9999';
        toast.style.minWidth = '300px';
        toast.style.textAlign = 'center';
        toast.innerHTML = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.transition = 'opacity 0.5s';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }, 2500);
    }

    // ===== REDIRECT WITH SUCCESS MESSAGE =====
    function signInSuccess(provider) {
        showToast(`✅ Signed in with ${provider}! Redirecting...`, 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }

    function signUpSuccess(provider) {
        showToast(`🎉 Account created with ${provider}! Redirecting...`, 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }

    // ===== SOCIAL SIGN-IN BUTTONS =====
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const text = this.textContent.trim();
            let provider = text.replace(/Sign in with /i, '').replace(/Sign up with /i, '').trim();
            if (!provider) provider = 'Social';
            
            // Check if this is sign-in or sign-up page
            const isSignUp = window.location.pathname.includes('signup.html');
            if (isSignUp) {
                signUpSuccess(provider);
            } else {
                signInSuccess(provider);
            }
        });
    });

    // ===== PHONE SIGN-IN / SIGN-UP =====
    // Send OTP
    document.querySelectorAll('#sendOtpBtn, #sendOtpSignupBtn').forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const parent = this.closest('.phone-input-group');
                const input = parent.querySelector('input[type="tel"]');
                if (input && input.value.trim().length > 5) {
                    showToast(`📱 OTP sent to ${input.value}`, 'info');
                } else {
                    showToast('⚠️ Please enter a valid phone number.', 'warning');
                }
            });
        }
    });

    // Verify OTP
    document.querySelectorAll('#verifyOtpBtn, #verifyOtpSignupBtn').forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const parent = this.closest('.otp-section');
                const input = parent.querySelector('input[type="text"]');
                if (input && input.value.trim().length === 6) {
                    const isSignUp = window.location.pathname.includes('signup.html');
                    if (isSignUp) {
                        signUpSuccess('Phone Number');
                    } else {
                        signInSuccess('Phone Number');
                    }
                } else {
                    showToast('⚠️ Please enter a 6-digit OTP.', 'warning');
                }
            });
        }
    });

    // ===== EMAIL SIGN-IN FORM =====
    const signinForm = document.getElementById('signinForm');
    if (signinForm) {
        signinForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('signinEmail').value.trim();
            const pwd = document.getElementById('signinPassword').value.trim();
            if (email && pwd) {
                signInSuccess('Email');
            } else {
                showToast('⚠️ Please fill in all fields.', 'warning');
            }
        });
    }

    // ===== EMAIL SIGN-UP FORM =====
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('signupEmail').value.trim();
            const pwd = document.getElementById('signupPassword').value.trim();
            const confirmPwd = document.getElementById('confirmPassword').value.trim();
            const terms = document.getElementById('terms').checked;

            if (!firstName || !lastName || !email || !pwd || !confirmPwd) {
                showToast('⚠️ Please fill in all fields.', 'warning');
                return;
            }
            if (pwd.length < 8) {
                showToast('⚠️ Password must be at least 8 characters.', 'warning');
                return;
            }
            if (pwd !== confirmPwd) {
                showToast('⚠️ Passwords do not match.', 'warning');
                return;
            }
            if (!terms) {
                showToast('⚠️ Please agree to the Terms of Service.', 'warning');
                return;
            }
            signUpSuccess('Email');
        });
    }

    // ===== "FORGOT PASSWORD?" LINK =====
    document.querySelectorAll('a[href="#"]').forEach(link => {
        if (link.textContent.trim() === 'Forgot password?') {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                showToast('📧 Password reset link sent to your email.', 'info');
            });
        }
    });
});