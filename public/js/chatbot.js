// Peace AI Chatbot
class PeaceChatbot {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.init();
  }

  init() {
    this.createChatbotHTML();
    this.attachEventListeners();
    this.sendWelcomeMessage();
  }

  createChatbotHTML() {
    const chatbotHTML = `
      <div class="chatbot-container">
        <button class="chatbot-button" id="chatbotToggle">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2 22l5.71-.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.38 0-2.68-.31-3.86-.86l-.28-.15-2.9.49.49-2.9-.15-.28C4.31 14.68 4 13.38 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
            <circle cx="9" cy="12" r="1.5"/>
            <circle cx="15" cy="12" r="1.5"/>
          </svg>
        </button>
        
        <div class="chatbot-window" id="chatbotWindow">
          <div class="chatbot-header">
            <div class="chatbot-header-info">
              <div class="chatbot-avatar">🕊️</div>
              <div>
                <div class="chatbot-title">Peace</div>
                <div class="chatbot-status">
                  <span class="status-dot"></span>
                  <span>Always here to help</span>
                </div>
              </div>
            </div>
            <button class="chatbot-close" id="chatbotClose">×</button>
          </div>
          
          <div class="chatbot-messages" id="chatbotMessages"></div>
          
          <div class="chatbot-input-container">
            <input 
              type="text" 
              class="chatbot-input" 
              id="chatbotInput" 
              placeholder="Type your message..."
              autocomplete="off"
            />
            <button class="chatbot-send" id="chatbotSend">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
  }

  attachEventListeners() {
    const toggleBtn = document.getElementById('chatbotToggle');
    const closeBtn = document.getElementById('chatbotClose');
    const sendBtn = document.getElementById('chatbotSend');
    const input = document.getElementById('chatbotInput');

    toggleBtn.addEventListener('click', () => this.toggleChatbot());
    closeBtn.addEventListener('click', () => this.toggleChatbot());
    sendBtn.addEventListener('click', () => this.sendMessage());
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }

  toggleChatbot() {
    this.isOpen = !this.isOpen;
    const window = document.getElementById('chatbotWindow');
    window.classList.toggle('active');
  }

  sendWelcomeMessage() {
    setTimeout(() => {
      this.addMessage('bot', 'Hello! 👋 I\'m Peace, your FlashData assistant. How can I help you today?', true);
    }, 500);
  }

  sendMessage() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();

    if (!message) return;

    this.addMessage('user', message);
    input.value = '';

    // Show typing indicator
    this.showTypingIndicator();

    // Simulate AI response
    setTimeout(() => {
      this.hideTypingIndicator();
      this.generateResponse(message);
    }, 1000 + Math.random() * 1000);
  }

  addMessage(sender, text, showQuickReplies = false) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const messageHTML = `
      <div class="message ${sender}">
        <div class="message-avatar">${sender === 'bot' ? '🕊️' : '👤'}</div>
        <div class="message-content">
          <div class="message-text">${text}</div>
          <div class="message-time">${time}</div>
          ${showQuickReplies ? this.getQuickReplies() : ''}
        </div>
      </div>
    `;

    messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Attach quick reply listeners
    if (showQuickReplies) {
      this.attachQuickReplyListeners();
    }
  }

  getQuickReplies() {
    return `
      <div class="quick-replies">
        <button class="quick-reply-btn" data-reply="Buy Data">📱 Buy Data</button>
        <button class="quick-reply-btn" data-reply="Check Balance">💰 Check Balance</button>
        <button class="quick-reply-btn" data-reply="Pricing">💵 Pricing</button>
        <button class="quick-reply-btn" data-reply="Support">🆘 Support</button>
      </div>
    `;
  }

  attachQuickReplyListeners() {
    const buttons = document.querySelectorAll('.quick-reply-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const reply = e.target.getAttribute('data-reply');
        document.getElementById('chatbotInput').value = reply;
        this.sendMessage();
      });
    });
  }

  showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbotMessages');
    const typingHTML = `
      <div class="message bot typing-message">
        <div class="message-avatar">🕊️</div>
        <div class="message-content">
          <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
          </div>
        </div>
      </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  hideTypingIndicator() {
    const typingMessage = document.querySelector('.typing-message');
    if (typingMessage) typingMessage.remove();
  }

  generateResponse(userMessage) {
    const message = userMessage.toLowerCase();
    let response = '';

    // AI Response Logic
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      response = 'Hello! 😊 Welcome to FlashData! How can I assist you today?';
    } else if (message.includes('buy') || message.includes('data') || message.includes('purchase')) {
      response = 'Great! 📱 You can buy data bundles for MTN, Telecel, and AirtelTigo. Would you like me to guide you to the buy data page?';
    } else if (message.includes('price') || message.includes('cost') || message.includes('pricing')) {
      response = 'Our prices vary by user level:<br><br>👤 <strong>Customer</strong>: Standard pricing<br>⭐ <strong>Agent</strong>: Discounted + 50% commission<br>🌟 <strong>Agent Pro</strong>: Best prices + 70% commission<br><br>Plus, earn 2% on all referral purchases! 💰';
    } else if (message.includes('balance') || message.includes('wallet')) {
      response = 'You can check your wallet balance on your dashboard. Would you like me to take you there?';
    } else if (message.includes('referral') || message.includes('refer')) {
      response = 'Our referral program is amazing! 🎉 Share your unique referral link and earn 2% on every purchase your referrals make. Find your link on the dashboard!';
    } else if (message.includes('commission') || message.includes('earn')) {
      response = 'You can earn commissions by becoming an Agent or Agent Pro:<br><br>⭐ <strong>Agent</strong>: 50% of savings<br>🌟 <strong>Agent Pro</strong>: 70% of savings<br><br>Plus referral bonuses! 💸';
    } else if (message.includes('network')) {
      response = 'We support all major networks in Ghana:<br>📱 MTN<br>📱 Telecel<br>📱 AirtelTigo<br><br>Instant delivery guaranteed! ⚡';
    } else if (message.includes('help') || message.includes('support')) {
      response = 'I\'m here to help! 🆘 You can:<br>• Buy data instantly<br>• Check your wallet<br>• View transactions<br>• Manage referrals<br>• Top up via Paystack<br><br>What would you like to do?';
    } else if (message.includes('whatsapp') || message.includes('community')) {
      response = 'Join our WhatsApp community for updates, tips, and exclusive offers! 🎉<br><br><a href="https://whatsapp.com/channel/0029Vb7J40MF6sn5kUuhDO27" target="_blank" style="color: #667eea; font-weight: 600;">Click here to join now! →</a>';
    } else if (message.includes('register') || message.includes('sign up') || message.includes('account')) {
      response = 'Creating an account is easy! 🚀 Just click the "Get Started" button and fill in your details. You\'ll get instant access to all features!';
    } else if (message.includes('payment') || message.includes('paystack') || message.includes('pay')) {
      response = 'We use Paystack for secure payments. 🔒 You can top up your wallet instantly using:<br>• Debit/Credit Cards<br>• Bank Transfer<br>• Mobile Money<br><br>All transactions are 100% secure!';
    } else if (message.includes('thank')) {
      response = 'You\'re welcome! 😊 Is there anything else I can help you with?';
    } else if (message.includes('bye') || message.includes('goodbye')) {
      response = 'Goodbye! 👋 Feel free to reach out anytime. Have a great day! ✨';
    } else {
      response = 'I\'m here to help! 🕊️ You can ask me about:<br>• Buying data<br>• Pricing & commissions<br>• Referral program<br>• Wallet & payments<br>• Networks we support<br><br>What would you like to know?';
    }

    this.addMessage('bot', response);
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PeaceChatbot();
});
