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
  let localSession = false;
  const initialHeading = heading.innerHTML;
  const initialModalSub = modalSub.textContent;
  const uploadPanel = document.querySelector('#upload-panel');
  const logoutButton = document.createElement('button');

  logoutButton.type = 'button';
  logoutButton.className = 'text-button logout-button';
  logoutButton.textContent = 'ออกจากระบบ';
  logoutButton.hidden = true;
  modalSub?.after(logoutButton);

  const setAuthenticatedUser = (user, { local = false } = {}) => {
    currentUser = user;
    localSession = local;
    loginTrigger.textContent = `${user.name} ↗`;
    heading.innerHTML = 'บัญชีของ<br/><em>คุณ</em>';
    modalSub.textContent = local ? `${user.email} · บัญชีในอุปกรณ์นี้` : user.email;
    form.hidden = true;
    registerCopy.hidden = true;
    logoutButton.hidden = false;
    if (local) uploadPanel?.classList.add('hidden');
    else uploadPanel?.classList.remove('hidden');
  };

  const clearAuthenticatedUser = () => {
    currentUser = null;
    localSession = false;
    localStorage.removeItem('rush90-token');
    localStorage.removeItem('rush90-local-session');
    loginTrigger.textContent = 'เข้าสู่ระบบ ↗';
    heading.innerHTML = initialHeading;
    modalSub.textContent = initialModalSub;
    form.hidden = false;
    registerCopy.hidden = false;
    logoutButton.hidden = true;
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

  const readLocalUsers = () => JSON.parse(localStorage.getItem('rush90-local-users') || '{}');
  const hashPassword = async (password, salt) => {
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 310000, hash: 'SHA-256' }, key, 256);
    return Array.from(new Uint8Array(bits), (byte) => byte.toString(16).padStart(2, '0')).join('');
  };
  const localRegister = async ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!name || name.trim().length < 2) throw new Error('กรุณากรอกชื่ออย่างน้อย 2 ตัวอักษร');
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) throw new Error('กรุณากรอกอีเมลให้ถูกต้อง');
    if (password.length < 8) throw new Error('รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร');
    const users = readLocalUsers();
    if (users[normalizedEmail]) throw new Error('อีเมลนี้สมัครในอุปกรณ์นี้แล้ว กรุณาเข้าสู่ระบบ');
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const passwordHash = await hashPassword(password, salt);
    users[normalizedEmail] = { name: name.trim(), salt: Array.from(salt), passwordHash };
    localStorage.setItem('rush90-local-users', JSON.stringify(users));
    return { name: users[normalizedEmail].name, email: normalizedEmail };
  };
  const localLogin = async ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const account = readLocalUsers()[normalizedEmail];
    if (!account) throw new Error('ไม่พบบัญชีนี้ในอุปกรณ์นี้ กรุณาสมัครสมาชิกก่อน');
    const passwordHash = await hashPassword(password, new Uint8Array(account.salt));
    if (passwordHash !== account.passwordHash) throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    return { name: account.name, email: normalizedEmail };
  };
  const useLocalAuth = async (body, registering) => {
    const user = registering ? await localRegister(body) : await localLogin(body);
    localStorage.removeItem('rush90-token');
    localStorage.setItem('rush90-local-session', JSON.stringify(user));
    setAuthenticatedUser(user, { local: true });
    modal.classList.add('hidden');
    setMode(false);
    form.reset();
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

  const savedLocalSession = localStorage.getItem('rush90-local-session');
  const token = localStorage.getItem('rush90-token');
  if (savedLocalSession) {
    try { setAuthenticatedUser(JSON.parse(savedLocalSession), { local: true }); }
    catch { localStorage.removeItem('rush90-local-session'); }
  } else if (token) {
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
        if (response.status === 404 || response.status >= 500) {
          await useLocalAuth(body, registerMode);
          return;
        }
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
      if (error instanceof TypeError) {
        try { await useLocalAuth(body, registerMode); }
        catch (localError) { setMessage(localError.message || 'สมัครหรือเข้าสู่ระบบไม่สำเร็จ'); }
      } else setMessage(error.message || 'ไม่สามารถเชื่อมต่อระบบได้');
    } finally {
      submitButton.disabled = false;
    }
  });

  const authStyle = document.createElement('style');
  authStyle.textContent = '.auth-message{margin:12px 0;color:#d94d3c;font:600 13px Kanit}.auth-name{display:block;width:100%;border:0;border-bottom:1px solid #cbd8d1;outline:0;padding:11px 0;font:500 15px Kanit}.auth-name:focus{border-color:#ff6b4a}.logout-button{margin-top:12px}.login-modal [hidden]{display:none!important}';
  document.head.appendChild(authStyle);
}
