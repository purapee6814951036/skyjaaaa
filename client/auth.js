const modal = document.querySelector('#login-modal');
const form = document.querySelector('#login-form');
const submitButton = form?.querySelector('button[type="submit"]');
const emailInput = form?.querySelector('input[type="email"]');
const passwordInput = form?.querySelector('input[type="password"]');
const registerLink = document.querySelector('.register-copy a');
const registerCopy = document.querySelector('.register-copy');
const loginTrigger = document.querySelector('.login-trigger');
const heading = modal?.querySelector('h2');
const modalSub = modal?.querySelector('.modal-sub');

if (modal && form && submitButton && emailInput && passwordInput) {
  form.onsubmit = null;
  let registerMode = false;
  let nameInput;
  let currentUser = null;
  const initialHeading = heading.innerHTML;
  const initialModalSub = modalSub.textContent;
  const uploadPanel = document.querySelector('#upload-panel');
  const logoutButton = document.createElement('button');

  logoutButton.type = 'button';
  logoutButton.className = 'text-button logout-button';
  logoutButton.textContent = 'ออกจากระบบ';
  uploadPanel?.appendChild(logoutButton);

  const setAuthenticatedUser = (user) => {
    currentUser = user;
    loginTrigger.textContent = `${user.name} ↗`;
    heading.innerHTML = 'บัญชีของ<br/><em>คุณ</em>';
    modalSub.textContent = user.email;
    form.hidden = true;
    registerCopy.hidden = true;
    uploadPanel.classList.remove('hidden');
  };

  const clearAuthenticatedUser = () => {
    currentUser = null;
    localStorage.removeItem('rush90-token');
    loginTrigger.textContent = 'เข้าสู่ระบบ ↗';
    heading.innerHTML = initialHeading;
    modalSub.textContent = initialModalSub;
    form.hidden = false;
    registerCopy.hidden = false;
    uploadPanel.classList.add('hidden');
    form.reset();
    setMode(false);
  };

  const setMessage = (message) => {
    let messageElement = form.querySelector('.auth-message');
    if (!messageElement) {
      messageElement = document.createElement('p');
      messageElement.className = 'auth-message';
      messageElement.setAttribute('role', 'alert');
      form.appendChild(messageElement);
    }
    messageElement.textContent = message;
  };

  const setMode = (isRegistering) => {
    registerMode = isRegistering;
    if (registerMode && !nameInput) {
      nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.required = true;
      nameInput.minLength = 2;
      nameInput.maxLength = 60;
      nameInput.placeholder = 'ชื่อที่แสดง';
      nameInput.className = 'auth-name';
      const emailLabel = emailInput.closest('label');
      emailLabel?.before(Object.assign(document.createElement('label'), { textContent: 'ชื่อ' }));
      const nameLabel = emailLabel?.previousElementSibling;
      nameLabel?.appendChild(nameInput);
    }
    if (nameInput) nameInput.closest('label').hidden = !registerMode;
    passwordInput.minLength = registerMode ? 8 : 0;
    passwordInput.autocomplete = registerMode ? 'new-password' : 'current-password';
    submitButton.innerHTML = registerMode ? 'สมัครสมาชิก <span>→</span>' : 'เข้าสู่ระบบ <span>→</span>';
    if (registerLink) registerLink.textContent = registerMode ? 'กลับเข้าสู่ระบบ' : 'สมัครสมาชิกฟรี';
    setMessage('');
  };

  registerLink?.addEventListener('click', (event) => {
    event.preventDefault();
    setMode(!registerMode);
  });

  logoutButton.addEventListener('click', () => {
    clearAuthenticatedUser();
    modal.classList.add('hidden');
  });

  loginTrigger.addEventListener('click', () => modal.classList.remove('hidden'));

  const token = localStorage.getItem('rush90-token');
  if (token) {
    fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.message || 'เซสชันหมดอายุ');
        setAuthenticatedUser(data.user);
      })
      .catch(() => clearAuthenticatedUser());
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    submitButton.disabled = true;
    setMessage(registerMode ? 'กำลังสมัครสมาชิก...' : 'กำลังเข้าสู่ระบบ...');
    const body = {
      email: emailInput.value.trim(),
      password: passwordInput.value,
    };
    if (registerMode) body.name = nameInput.value.trim();

    try {
      const response = await fetch(registerMode ? '/api/auth/register' : '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        const message = response.status >= 500
          ? 'ระบบสมัครสมาชิก/เข้าสู่ระบบขัดข้อง กรุณาตรวจสอบเซิร์ฟเวอร์และฐานข้อมูล'
          : data.message || `ดำเนินการไม่สำเร็จ (${response.status})`;
        throw new Error(message);
      }
      localStorage.setItem('rush90-token', data.token);
      setAuthenticatedUser(data.user);
      modal.classList.add('hidden');
      setMode(false);
      form.reset();
    } catch (error) {
      setMessage(error instanceof TypeError
        ? 'เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ กรุณาเปิด API และตรวจสอบการตั้งค่าฐานข้อมูล'
        : error.message || 'ไม่สามารถเชื่อมต่อระบบได้');
    } finally {
      submitButton.disabled = false;
    }
  });

  const authStyle = document.createElement('style');
  authStyle.textContent = '.auth-message{margin:12px 0;color:#d94d3c;font:600 13px Kanit}.auth-name{display:block;width:100%;border:0;border-bottom:1px solid #cbd8d1;outline:0;padding:11px 0;font:500 15px Kanit}.auth-name:focus{border-color:#ff6b4a}.logout-button{margin-top:12px}.login-modal [hidden]{display:none!important}';
  document.head.appendChild(authStyle);
}
