document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const adminForm = document.getElementById('adminForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const accountNumber = document.getElementById('accountNumber').value;
            const password = document.getElementById('password').value;

            if (accountNumber === '1020' && password === 'a900900900') {
                localStorage.setItem('loggedInUser', 'admin');
                window.location.href = 'admin.html';
            } else if (localStorage.getItem(accountNumber) && JSON.parse(localStorage.getItem(accountNumber)).password === password) {
                localStorage.setItem('loggedInUser', accountNumber);
                window.location.href = 'account.html';
            } else {
                document.getElementById('loginMessage').innerText = 'ليس لديك حساب بالرجاء تسجيل حساب جديد';
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const union = document.getElementById('union').value;
            const phone = document.getElementById('phone').value;

            if (!localStorage.getItem(phone)) {
                const accountNumber = '10' + Math.floor(100000000 + Math.random() * 900000000).toString();
                const user = {
                    name: name,
                    union: union,
                    phone: phone,
                    accountNumber: accountNumber,
                    balance: 0,
                    password: prompt("أدخل كلمة مرور لتسجيل الدخول:")
                };
                localStorage.setItem(accountNumber, JSON.stringify(user));
                alert('تم إنشاء الحساب بنجاح. رقم حسابك هو: ' + accountNumber);
                window.location.href = 'login.html';
            } else {
                document.getElementById('registerMessage').innerText = 'رقم الهاتف مستخدم بالفعل';
            }
        });
    }

    if (window.location.pathname.endsWith('account.html')) {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser && loggedInUser !== 'admin') {
            const user = JSON.parse(localStorage.getItem(loggedInUser));
            document.getElementById('customerName').innerText = user.name;
            document.getElementById('accountBalance').innerText = user.balance.toFixed(2) + ' بيلي';
        } else {
            window.location.href = 'login.html';
        }
    }

    if (adminForm) {
        adminForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const targetAccountNumber = document.getElementById('targetAccountNumber').value;
            const amount = parseFloat(document.getElementById('amount').value);

            if (localStorage.getItem(targetAccountNumber)) {
                const user = JSON.parse(localStorage.getItem(targetAccountNumber));
                user.balance += amount;
                localStorage.setItem(targetAccountNumber, JSON.stringify(user));
                document.getElementById('adminMessage').innerText = 'تم تعديل الرصيد بنجاح';
                document.getElementById('adminMessage').className = 'success';
            } else {
                document.getElementById('adminMessage').innerText = 'رقم الحساب خطأ رجاءً أعد المحاولة';
                document.getElementById('adminMessage').className = 'error';
            }
        });
    }
});