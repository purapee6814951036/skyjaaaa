const modal = document.querySelector('#login-modal');
const form = document.querySelector('#login-form');
const submitButton = form?.querySelector('button[type="submit"]');
const emailInput = form?.querySelector('input[type="email"]');
const passwordInput = form?.querySelector('input[type="password"]');
const registerLink = document.querySelector('.register-copy a');

if (modal && form && submitButton && emailInput && passwordInput) {
  form.onsubmit = null;
  let registerMode = false;
  let nameInput;

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
      nameInput.placeholder = 'ชื่อที่แสดง';
      nameInput.className = 'auth-name';
      const emailLabel = emailInput.closest('label');
      emailLabel?.before(Object.assign(document.createElement('label'), { textContent: 'ชื่อ' }));
      const nameLabel = emailLabel?.previousElementSibling;
      nameLabel?.appendChild(nameInput);
    }
    if (nameInput) nameInput.closest('label').hidden = !registerMode;
    submitButton.innerHTML = registerMode ? 'สมัครสมาชิก <span>→</span>' : 'เข้าสู่ระบบ <span>→</span>';
    if (registerLink) registerLink.textContent = registerMode ? 'กลับเข้าสู่ระบบ' : 'สมัครสมาชิกฟรี';
    setMessage('');
  };

  registerLink?.addEventListener('click', (event) => {
    event.preventDefault();
    setMode(!registerMode);
  });

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
      if (!response.ok) throw new Error(data.message || `ดำเนินการไม่สำเร็จ (${response.status})`);
      localStorage.setItem('rush90-token', data.token);
      modal.classList.add('hidden');
      document.querySelector('.login-trigger').textContent = `${data.user.name} ↗`;
      setMode(false);
      form.reset();
    } catch (error) {
      setMessage(error.message || 'ไม่สามารถเชื่อมต่อระบบได้');
    } finally {
      submitButton.disabled = false;
    }
  });

  const authStyle = document.createElement('style');
  authStyle.textContent = '.auth-message{margin:12px 0;color:#d94d3c;font:600 13px Kanit}.auth-name{display:block;width:100%;border:0;border-bottom:1px solid #cbd8d1;outline:0;padding:11px 0;font:500 15px Kanit}.auth-name:focus{border-color:#ff6b4a}';
  document.head.appendChild(authStyle);
}
