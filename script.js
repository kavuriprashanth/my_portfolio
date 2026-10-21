/**
 * Portfolio Interactive JavaScript
 * Prashanth Kumar Kavuri — Software Developer Portfolio
 * Centered Top Navigation · Active Scrollspy · Grok-Ready Realistic Chatbot
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. THEME MANAGEMENT WITH LOCALSTORAGE ───────────────────── */
  const themeToggle = document.getElementById('themeToggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  const applyTheme = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  };

  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme) {
    applyTheme(savedTheme === 'dark');
  } else {
    applyTheme(prefersDarkScheme.matches);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isCurrentlyDark = document.documentElement.classList.contains('dark-mode');
      const nextIsDark = !isCurrentlyDark;
      applyTheme(nextIsDark);
      localStorage.setItem('portfolio-theme', nextIsDark ? 'dark' : 'light');
    });
  }

  /* ── 2. MOBILE TOP NAVIGATION & DROPDOWN ─────────────────────── */
  const mobileHamburger = document.getElementById('mobileHamburger');
  const navMenu = document.getElementById('navMenu');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
  const navLinks = document.querySelectorAll('.nav-link');

  const closeMobileNav = () => {
    if (navMenu) navMenu.classList.remove('open');
    if (mobileNavBackdrop) mobileNavBackdrop.classList.remove('active');
    if (mobileHamburger) mobileHamburger.setAttribute('aria-expanded', 'false');
  };

  const openMobileNav = () => {
    if (navMenu) navMenu.classList.add('open');
    if (mobileNavBackdrop) mobileNavBackdrop.classList.add('active');
    if (mobileHamburger) mobileHamburger.setAttribute('aria-expanded', 'true');
  };

  if (mobileHamburger) {
    mobileHamburger.addEventListener('click', () => {
      const isOpen = navMenu && navMenu.classList.contains('open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener('click', closeMobileNav);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileNav();
      if (chatWindow && chatWindow.classList.contains('open')) {
        closeChatWindow();
      }
    }
  });

  /* ── 3. SCROLLSPY / ACTIVE NAV LINK HIGHLIGHTER ─────────────── */
  const sections = document.querySelectorAll('.page-section[id]');
  const updateActiveSection = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    let currentId = 'home';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 130;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const linkSection = link.getAttribute('data-section');
      if (linkSection === currentId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveSection, { passive: true });
  updateActiveSection();

  /* ── 4. RESUME DOWNLOAD TRIGGER LOGGING ─────────────────────── */
  const downloadResumeBtn = document.getElementById('downloadResumeHeroBtn');
  if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', () => {
      console.log('Downloading Prashanth Kumar Kavuri resume...');
    });
  }

  /* ── 5. SUBTLE AMBIENT CANVAS PARTICLES ─────────────────────── */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.getElementById('particles-canvas');
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let W, H;
    const particles = [];
    const particleCount = 20;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const rand = (min, max) => Math.random() * (max - min) + min;
    const isDarkMode = () => document.documentElement.classList.contains('dark-mode');

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: rand(0, W),
        y: rand(0, H),
        r: rand(1.0, 2.0),
        vx: rand(-0.04, 0.04),
        vy: rand(-0.08, -0.02),
        alpha: rand(0.1, 0.25),
        dA: rand(0.002, 0.004) * (Math.random() < 0.5 ? 1 : -1)
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, W, H);
      const isDark = isDarkMode();
      const rgb = isDark ? '148, 163, 184' : '37, 99, 235';

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.dA;

        if (p.alpha <= 0.05 || p.alpha >= 0.3) p.dA *= -1;
        if (p.y < -10) { p.y = H + 5; p.x = rand(0, W); }
        if (p.x < -10) p.x = W + 5;
        if (p.x > W + 10) p.x = -5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${p.alpha * (isDark ? 0.8 : 0.4)})`;
        ctx.fill();
      });

      requestAnimationFrame(drawParticles);
    };

    drawParticles();
  }

  /* ── 6. REALISTIC CHATBOT (GROK API READY + LOCAL ENGINE) ───── */
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatWindow = document.getElementById('chatWindow');
  const chatCloseBtn = document.getElementById('chatCloseBtn');
  const chatMessages = document.getElementById('chatMessages');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const quickChips = document.querySelectorAll('.quick-chip');
  const apiConfigToggle = document.getElementById('apiConfigToggle');
  const grokApiDrawer = document.getElementById('grokApiDrawer');
  const grokApiKeyInput = document.getElementById('grokApiKeyInput');
  const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');
  const chatEngineStatus = document.getElementById('chatEngineStatus');

  // Load existing Grok API Key from localStorage
  let grokApiKey = localStorage.getItem('grok_api_key') || '';
  if (grokApiKeyInput && grokApiKey) {
    grokApiKeyInput.value = grokApiKey;
    if (chatEngineStatus) chatEngineStatus.textContent = 'Grok AI Enabled';
  }

  // Toggle API settings drawer
  if (apiConfigToggle && grokApiDrawer) {
    apiConfigToggle.addEventListener('click', () => {
      grokApiDrawer.classList.toggle('open');
    });
  }

  if (saveApiKeyBtn && grokApiKeyInput) {
    saveApiKeyBtn.addEventListener('click', () => {
      const key = grokApiKeyInput.value.trim();
      grokApiKey = key;
      if (key) {
        localStorage.setItem('grok_api_key', key);
        if (chatEngineStatus) chatEngineStatus.textContent = 'Grok AI Enabled';
        appendChatMessage("Grok API Key saved! Live AI generation is now active.", 'bot');
      } else {
        localStorage.removeItem('grok_api_key');
        if (chatEngineStatus) chatEngineStatus.textContent = 'Verified Resume Assistant';
        appendChatMessage("API Key removed. Reverted to verified local resume engine.", 'bot');
      }
      if (grokApiDrawer) grokApiDrawer.classList.remove('open');
    });
  }

  // Toggle chat window
  const openChatWindow = () => {
    if (chatWindow) chatWindow.classList.add('open');
    if (chatbotToggle) chatbotToggle.classList.add('active');
    setTimeout(() => { if (chatInput) chatInput.focus(); }, 150);
  };

  const closeChatWindow = () => {
    if (chatWindow) chatWindow.classList.remove('open');
    if (chatbotToggle) chatbotToggle.classList.remove('active');
  };

  if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
      const isOpen = chatWindow && chatWindow.classList.contains('open');
      if (isOpen) {
        closeChatWindow();
      } else {
        openChatWindow();
      }
    });
  }

  if (chatCloseBtn) {
    chatCloseBtn.addEventListener('click', closeChatWindow);
  }

  // Resume Knowledge Base exclusively focused on Prashanth Kumar Kavuri
  const RESUME_SYSTEM_PROMPT = `You are the interactive AI portfolio assistant for Prashanth Kumar Kavuri.
Here are Prashanth's verified credentials and background:
- Role Target: Software Developer / Java Developer Fresher Roles
- Location: Hyderabad, India
- Education: Bachelor of Technology in Computer Science and Engineering (AI & ML) at Marri Laxman Reddy Institute of Technology and Management (MLRITM), Hyderabad (Sep 2023 – May 2027), CGPA 8.2 / 10.
- Honors: Appointed as a Google Student Ambassador.
- Work Experience:
  * Java Full Stack Developer Intern at Infosys Springboard – Virtual Internship 7.0 (Jun 2026 – Aug 2026).
  * Implemented Role-Based Access Control (RBAC) and JWT authentication to secure application access for over 1,000 active users.
  * Performed testing and validation across 20+ REST APIs, enhancing stability and reliability.
  * Delivered 15+ backend features and services integrating PostgreSQL.
  * Collaborated in Agile sprints using Git for version control and debugging.
- Core Technical Stack:
  * Languages: Java, Python, SQL, JavaScript
  * Frameworks & Libraries: Spring Boot, Spring Security, Spring Data JPA, React, FastAPI
  * Databases: MySQL, PostgreSQL, Redis
  * Tools & DevOps: Git, Docker, Maven, IntelliJ IDEA, VS Code
  * Concepts: DSA, OOP, REST APIs, Microservices, JWT & RBAC
- Projects:
  1. SentinelCore SecureOps: Cloud Security Monitoring System using a 2-service Spring Boot and React architecture, Keycloak RBAC/JWT, PostgreSQL, Redis, PCI DSS audit logging.
  2. Quantum-Inspired Intelligent Traffic Route Optimization (In Development): Full-stack platform using React, Python, FastAPI, OpenStreetMap with Dijkstra, A*, and QIGA algorithms and XGBoost traffic prediction.
  3. SpendSense: Smart Expense Analysis Tracker built with React, Node.js, Express, Firebase Authentication, and Recharts analytics with PDF reporting.
  4. ShipTrack Pro: Shipment Tracking & Delivery Platform with React, Spring Boot, and PostgreSQL.
- Certifications:
  * NPTEL – Programming in Java (IIT Kharagpur, 2025)
  * AWS Academy Cloud Foundations (2025)
  * MongoDB Associate Developer (2025)
  * Pearson MePro (2026)
- Contact: Email: prashanthkavuri786@gmail.com, Phone: +91 8498085542, LinkedIn: linkedin.com/in/kavuriprashanth, GitHub: github.com/237y1a6697.

Answer questions conversationally, accurately, and professionally as his assistant. Keep answers concise, clear, and recruiter-focused.`;

  // Local knowledge base for instantaneous realistic fallback
  const LOCAL_KB = [
    {
      k: ['hi', 'hello', 'hey', 'who are you', 'what can you do', 'help'],
      a: "Hello! 👋 I'm Prashanth's portfolio assistant. You can ask me about his Java & Spring Boot expertise, Infosys Springboard internship, cloud security & routing projects, or education at MLRITM!"
    },
    {
      k: ['skill', 'skills', 'tech stack', 'technologies', 'programming', 'languages'],
      a: "Prashanth's technical stack includes:\n• Languages: Java, Python, SQL, JavaScript\n• Backend & Frameworks: Spring Boot, Spring Security, Spring Data JPA, React, FastAPI\n• Databases: PostgreSQL, MySQL, Redis\n• Tools: Git, Docker, Maven, IntelliJ IDEA, VS Code\n• Concepts: DSA, OOP, REST APIs, Microservices, JWT & RBAC."
    },
    {
      k: ['java', 'spring', 'spring boot', 'backend'],
      a: "Java and Spring Boot are Prashanth's primary specialties! He builds scalable enterprise services with Spring Security (RBAC/JWT), REST API architectures, and seamless PostgreSQL database persistence."
    },
    {
      k: ['experience', 'work experience', 'internship', 'infosys', 'springboard'],
      a: "Prashanth completed his internship as a Java Full Stack Developer Intern at Infosys Springboard (Jun–Aug 2026). Key highlights:\n• Implemented RBAC and JWT authentication for 1,000+ active users.\n• Tested and validated 20+ REST APIs to ensure high system stability.\n• Delivered 15+ backend features with PostgreSQL integration.\n• Collaborated in Agile sprints with Git-based version control."
    },
    {
      k: ['project', 'projects', 'featured projects', 'what projects'],
      a: "Prashanth has built 4 key projects:\n1. SentinelCore SecureOps (Cloud Security Monitoring System with Spring Boot & React)\n2. Quantum-Inspired Intelligent Traffic Route Optimization (Dijkstra, A*, QIGA, FastAPI & OSM)\n3. SpendSense (Smart Expense Tracker with React & Node.js)\n4. ShipTrack Pro (Shipment Tracking Platform)."
    },
    {
      k: ['sentinel', 'security project', 'secureops', 'cloud security', 'incident'],
      a: "SentinelCore SecureOps is a cloud security monitoring platform using a 2-service Spring Boot and React architecture. It features Keycloak RBAC with JWT authentication, 20+ secured REST APIs, and audit logging for PCI DSS compliance."
    },
    {
      k: ['traffic', 'route', 'quantum', 'optimization', 'dijkstra', 'qiga'],
      a: "Quantum-Inspired Intelligent Traffic Route Optimization is a full-stack platform using React, Python, FastAPI, and OpenStreetMap. It evaluates Dijkstra, A*, and QIGA multi-objective algorithms with XGBoost congestion prediction."
    },
    {
      k: ['spendsense', 'expense', 'finance', 'tracker'],
      a: "SpendSense is a smart personal finance tracker with interactive Recharts dashboards, CSV transaction import, budget tracking, PDF report export, and AI financial insights."
    },
    {
      k: ['education', 'college', 'degree', 'cgpa', 'university', 'btech', 'mlritm', 'branch'],
      a: "Prashanth is pursuing a B.Tech in Computer Science and Engineering (AI & ML) at Marri Laxman Reddy Institute of Technology and Management (MLRITM), Hyderabad (2023–2027) with a CGPA of 8.2 / 10."
    },
    {
      k: ['certification', 'certifications', 'nptel', 'aws', 'mongodb', 'pearson', 'certificates'],
      a: "Prashanth holds 4 verified certifications:\n1. NPTEL – Programming in Java (IIT Kharagpur, 2025)\n2. AWS Academy – Cloud Foundations (2025)\n3. MongoDB Associate Developer (2025)\n4. Pearson MePro (2026)."
    },
    {
      k: ['contact', 'email', 'phone', 'reach', 'linkedin', 'github', 'hire', 'location'],
      a: "You can reach Prashanth directly at:\n• Email: prashanthkavuri786@gmail.com\n• Phone: +91 8498085542\n• Location: Hyderabad, India\n• LinkedIn: linkedin.com/in/kavuriprashanth\n• GitHub: github.com/237y1a6697."
    },
    {
      k: ['resume', 'cv', 'download resume'],
      a: "You can download Prashanth's verified resume PDF directly using the 'Download Resume' button in the Hero section or the Contact section."
    }
  ];

  const defaultBotReply = "I can answer questions regarding Prashanth's Java backend skills, Infosys Springboard internship, cloud security & routing projects, or education at MLRITM!";

  const normalizeText = (text) => text.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();

  const getLocalBotResponse = (question) => {
    const qNorm = normalizeText(question);
    if (!qNorm) return defaultBotReply;

    let bestMatch = null;
    let highestScore = 0;

    for (const item of LOCAL_KB) {
      for (const keyword of item.k) {
        const kNorm = normalizeText(keyword);
        let score = 0;

        if (qNorm === kNorm) {
          score = 1000 + kNorm.length;
        } else if (qNorm.includes(kNorm)) {
          score = 100 + kNorm.length;
        } else {
          const qWords = qNorm.split(' ');
          const kWords = kNorm.split(' ');
          const matches = kWords.filter(w => qWords.includes(w)).length;
          if (matches === kWords.length && matches > 0) {
            score = 50 + matches * 10;
          }
        }

        if (score > highestScore) {
          highestScore = score;
          bestMatch = item.a;
        }
      }
    }

    return highestScore >= 50 ? bestMatch : defaultBotReply;
  };

  const appendChatMessage = (text, sender) => {
    if (!chatMessages) return;
    const msgEl = document.createElement('div');
    msgEl.className = `chat-msg ${sender === 'user' ? 'user-msg' : 'bot-msg'}`;
    msgEl.innerText = text;
    chatMessages.appendChild(msgEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return msgEl;
  };

  // Call xAI Grok API if key is present
  const callGrokApi = async (userPrompt) => {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${grokApiKey}`
      },
      body: JSON.stringify({
        model: 'grok-beta',
        messages: [
          { role: 'system', content: RESUME_SYSTEM_PROMPT },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3
      })
    });

    if (!response.ok) {
      throw new Error(`Grok API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || getLocalBotResponse(userPrompt);
  };

  const handleUserMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    appendChatMessage(trimmed, 'user');
    if (chatInput) chatInput.value = '';

    // Show typing status
    const typingIndicator = appendChatMessage("Typing...", 'bot');

    try {
      if (grokApiKey) {
        const grokReply = await callGrokApi(trimmed);
        if (typingIndicator) typingIndicator.remove();
        appendChatMessage(grokReply, 'bot');
      } else {
        // Fallback to local verified engine
        setTimeout(() => {
          if (typingIndicator) typingIndicator.remove();
          const localReply = getLocalBotResponse(trimmed);
          appendChatMessage(localReply, 'bot');
        }, 220);
      }
    } catch (err) {
      console.warn('Grok API invocation failed, falling back to local engine:', err);
      if (typingIndicator) typingIndicator.remove();
      const localReply = getLocalBotResponse(trimmed);
      appendChatMessage(localReply, 'bot');
    }
  };

  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (chatInput) handleUserMessage(chatInput.value);
    });
  }

  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-question');
      if (q) handleUserMessage(q);
    });
  });

});
