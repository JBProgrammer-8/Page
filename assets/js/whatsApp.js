 let currentProtocol = 'email';

  // Alterna entre modo E-mail e WhatsApp
  function switchProtocol(mode) {
    currentProtocol = mode;
    const btnEmail = document.getElementById('btn-mode-email');
    const btnWhatsapp = document.getElementById('btn-mode-whatsapp');
    const statusBadge = document.getElementById('protocol-status-badge');
    const submitBtnLabel = document.getElementById('submit-btn-label');
    const submitBtnIcon = document.getElementById('submit-btn-icon');

    if (mode === 'email') {
      btnEmail.className = 'flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-mono font-bold transition-all bg-sky-500 text-slate-950 shadow-sm';
      btnWhatsapp.className = 'flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-mono font-medium text-slate-400 hover:text-slate-200 transition-all';
      statusBadge.textContent = 'HTTP / FORMSPREE';
      statusBadge.className = 'font-mono text-[10px] text-sky-400 bg-sky-950/60 border border-sky-500/30 px-2 py-0.5 rounded font-semibold';
      submitBtnLabel.textContent = 'Transmitir Mensagem via API';
      submitBtnIcon.textContent = 'send';
    } else {
      btnWhatsapp.className = 'flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-mono font-bold transition-all bg-emerald-500 text-slate-950 shadow-sm';
      btnEmail.className = 'flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-mono font-medium text-slate-400 hover:text-slate-200 transition-all';
      statusBadge.textContent = 'SOCKET / WHATSAPP';
      statusBadge.className = 'font-mono text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded font-semibold';
      submitBtnLabel.textContent = 'Abrir Conversa no WhatsApp';
      submitBtnIcon.textContent = 'chat';
    }
  }

  // Contador dinâmico de caracteres
  const msgInput = document.getElementById('contact-msg');
  const charCounter = document.getElementById('char-counter');
  if (msgInput && charCounter) {
    msgInput.addEventListener('input', () => {
      charCounter.textContent = `${msgInput.value.length} / 500 caracteres`;
    });
  }

  // Manipulação de Envio
  async function handleSend() {
    const name = document.getElementById('contact-name').value.trim();
    const phone = document.getElementById('contact-whatsapp').value.trim();
    const message = document.getElementById('contact-msg').value.trim();
    const statusBox = document.getElementById('status-text');
    const statusDot = document.getElementById('status-indicator-dot');
    const submitBtn = document.getElementById('submit-btn');
    const feedbackBox = document.getElementById('form-feedback');

    if (!name || !phone || !message) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (currentProtocol === 'whatsapp') {
      // Formata a mensagem com codificação URL para o WhatsApp
      const seuNumeroWhatsApp = '5562985054112'; // Substitua pelo seu DDI + DDD + Telefone real
      const textoFormatado = `*Novo Contato via Portfólio*\n\n*Nome:* ${name}\n*Contato:* ${phone}\n*Mensagem:* ${message}`;
      const urlWhatsapp = `https://wa.me/${seuNumeroWhatsApp}?text=${encodeURIComponent(textoFormatado)}`;
      window.open(urlWhatsapp, '_blank');
      return;
    }

    // Modo Formspree (E-mail assíncrono via fetch)
    statusBox.textContent = 'TRANSMITINDO DADOS... POST /api/contact';
    statusDot.className = 'inline-block w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse';
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

    try {
      // Substitua pelo seu endpoint real do Formspree (https://formspree.io/f/seu-id)
      const response = await fetch('https://formspree.io/f/seu-id-aqui', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, message })
      });

      if (response.ok) {
        statusBox.textContent = 'STATUS 200 OK // DADOS ENTREGUES';
        statusDot.className = 'inline-block w-2.5 h-2.5 rounded-full bg-emerald-400';
        feedbackBox.classList.remove('hidden');
        document.getElementById('portfolio-contact-form').reset();
        if (charCounter) charCounter.textContent = '0 / 500 caracteres';
      } else {
        throw new Error('Falha no envio');
      }
    } catch (error) {
      statusBox.textContent = 'STATUS 500 ERROR // FALHA NO ENVIO';
      statusDot.className = 'inline-block w-2.5 h-2.5 rounded-full bg-rose-500';
      alert('Erro ao enviar mensagem. Se preferir, envie diretamente pelo WhatsApp ou LinkedIn!');
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
    }
  }


console.log("Arquivo carregado");