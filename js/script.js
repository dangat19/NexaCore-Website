// ===== COUNTER ANIMATION (from index.html) =====
document.addEventListener('DOMContentLoaded', function () {
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

    // ===== PASSWORD MATCH CHECK (signup) =====
    const password = document.getElementById('signupPassword');
    const confirm = document.getElementById('confirmPassword');
    const matchMsg = document.getElementById('matchMessage');

    if (password && confirm && matchMsg) {
        const checkMatch = () => {
            if (confirm.value.length === 0) {
                matchMsg.innerHTML = '';
                return;
            }
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

    // ===== OTP PLACEHOLDER LOGIC (just UI demo) =====
    // Send OTP buttons
    document.querySelectorAll('#sendOtpBtn, #sendOtpSignupBtn').forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const parent = this.closest('.phone-input-group');
                const input = parent.querySelector('input[type="tel"]');
                if (input && input.value.trim().length > 5) {
                    alert('📱 OTP sent to ' + input.value);
                } else {
                    alert('Please enter a valid phone number.');
                }
            });
        }
    });

    // Verify OTP buttons
    document.querySelectorAll('#verifyOtpBtn, #verifyOtpSignupBtn').forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const parent = this.closest('.otp-section');
                const input = parent.querySelector('input[type="text"]');
                if (input && input.value.trim().length === 6) {
                    alert('✅ Phone number verified successfully!');
                } else {
                    alert('Please enter a 6-digit OTP.');
                }
            });
        }
    });
});