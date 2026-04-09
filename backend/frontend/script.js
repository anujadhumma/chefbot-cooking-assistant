//  ChefBot Frontend Script

const chatWindow = document.getElementById('chatWindow');
const userInput  = document.getElementById('userInput');
const sendBtn    = document.getElementById('sendBtn');

const API_URL = window.location.origin + '/api/chat';
//  Send message on button click 
async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) {
    shakeInput();
    return;
  }

  appendMessage('user', text);
  userInput.value = '';
  autoResize(userInput);
  sendBtn.disabled = true;

  const typingId = showTyping();

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();

    removeTyping(typingId);

    if (!response.ok) {
      throw new Error(data.error || 'Server error');
    }

    appendMessage('bot', data.reply);

  } catch (err) {
    removeTyping(typingId);
    const errMsg = err.message.includes('Failed to fetch')
      ? '⚠️ Cannot connect to the server. Make sure the backend is running on port 3000.'
      : `⚠️ ${err.message}`;
    appendMessage('bot', errMsg, true);
  } finally {
    sendBtn.disabled = false;
    userInput.focus();
  }
}

//  Append a message bubble 
function appendMessage(role, text, isError = false) {
  const msg = document.createElement('div');
  msg.className = `message ${role === 'user' ? 'user-message' : 'bot-message'}`;

  const avatar = document.createElement('div');
  avatar.className = `avatar ${role === 'user' ? 'user-avatar' : 'bot-avatar'}`;
  avatar.textContent = role === 'user' ? '👤' : '🍳';

  const bubble = document.createElement('div');
  bubble.className = `bubble${isError ? ' error-bubble' : ''}`;
  bubble.innerHTML = formatText(text);

  msg.appendChild(avatar);
  msg.appendChild(bubble);
  chatWindow.appendChild(msg);
  scrollToBottom();
}

function formatText(text) {

  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  text = text.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
  text = text.replace(/^##\s+(.+)$/gm,  '<h3>$1</h3>');
  text = text.replace(/^#\s+(.+)$/gm,   '<h3>$1</h3>');

  text = text.replace(/^---+$/gm, '<hr>');

  text = text.replace(/^[-*]\s+(.+)$/gm, '<li>$1</li>');
  text = text.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
 
  text = text.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');

  text = text.split(/\n{2,}/).map(p => {
    if (p.startsWith('<h3>') || p.startsWith('<ul>') || p.startsWith('<ol>') || p.startsWith('<hr>') || p.startsWith('<li>')) return p;
    return `<p>${p.replace(/\n/g, '<br>')}</p>`;
  }).join('');
  return text;
}

// Typing indicator 
function showTyping() {
  const id = 'typing-' + Date.now();
  const msg = document.createElement('div');
  msg.className = 'message bot-message';
  msg.id = id;

  const avatar = document.createElement('div');
  avatar.className = 'avatar bot-avatar';
  avatar.textContent = '🍳';

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.innerHTML = `<div class="typing-bubble"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>`;

  msg.appendChild(avatar);
  msg.appendChild(bubble);
  chatWindow.appendChild(msg);
  scrollToBottom();
  return id;
}

function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

//  Helpers 
function scrollToBottom() {
  chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: 'smooth' });
}

function handleKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}

function shakeInput() {
  const wrapper = document.querySelector('.input-wrapper');
  wrapper.style.animation = 'none';
  wrapper.offsetHeight; 
  wrapper.style.animation = 'shake 0.35s ease';
}

// Add shake keyframe dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `@keyframes shake {
  0%,100% { transform: translateX(0); }
  20%      { transform: translateX(-6px); }
  40%      { transform: translateX(6px); }
  60%      { transform: translateX(-4px); }
  80%      { transform: translateX(4px); }
}`;
document.head.appendChild(shakeStyle);

// Sidebar helpers 
function appendIngredient(ingredient) {
  const current = userInput.value.trim();
  if (current === '') {
    userInput.value = 'I have ' + ingredient;
  } else if (current.endsWith(',') || current.endsWith(', ')) {
    userInput.value = current + ' ' + ingredient;
  } else {
    userInput.value = current + ', ' + ingredient;
  }
  autoResize(userInput);
  userInput.focus();
}

function sendQuick(text) {
  userInput.value = text;
  autoResize(userInput);
  sendMessage();
}

function fillInput(text) {
  userInput.value = text;
  autoResize(userInput);
  userInput.focus();
}

function clearChat() {
  chatWindow.innerHTML = '';
  const welcome = document.createElement('div');
  welcome.className = 'message bot-message welcome-msg';
  welcome.innerHTML = `
    <div class="avatar bot-avatar">🍳</div>
    <div class="bubble">
      <p>Chat cleared!. What ingredients do you have? 🍽️</p>
    </div>`;
  chatWindow.appendChild(welcome);
}
