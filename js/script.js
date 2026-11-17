/* ==========================================================
   script.js – BLESSED (2ª entrega)
   Recursos: (1) alto contraste, (2) tamanho da fonte, (3) menu mobile,
   (4) validação de formulários + localStorage, (5) filtro de notícias,
   (6) checklist de hábitos do Guia.
   Todos os módulos checam se o elemento existe, pois o mesmo
   arquivo é carregado nas 11 páginas.
   ========================================================== */
'use strict';

/* Atalho seguro para localStorage: se falhar (modo privado), não quebra o site */
const store = {
  get(chave, padrao) {
    try {
      const v = localStorage.getItem(chave);
      return v === null ? padrao : JSON.parse(v);
    } catch (e) { return padrao; }
  },
  set(chave, valor) {
    try { localStorage.setItem(chave, JSON.stringify(valor)); } catch (e) { /* ignora */ }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initContraste();
  initFonte();
  initMenu();
  initFormularios();
  initFiltroNoticias();
  initHabitos();
  atualizarContadores();
});

/* ---------- 1. Alto contraste (preferência salva no localStorage) ---------- */
function initContraste() {
  const btn = document.getElementById('toggle-contrast');
  if (!btn) return;
  const aplicar = (ligado) => {
    document.body.classList.toggle('high-contrast', ligado);   // manipula o DOM
    btn.setAttribute('aria-pressed', String(ligado));           // informa leitor de tela
  };
  aplicar(store.get('blessed_contraste', false));               // lê preferência salva
  btn.addEventListener('click', () => {
    const ligado = !document.body.classList.contains('high-contrast');
    aplicar(ligado);
    store.set('blessed_contraste', ligado);
  });
}

/* ---------- 2. Tamanho da fonte (A- / A+), também salvo ---------- */
function initFonte() {
  const mais = document.getElementById('font-up');
  const menos = document.getElementById('font-down');
  if (!mais || !menos) return;
  let pct = store.get('blessed_fonte', 100);
  const aplicar = () => {
    document.documentElement.style.fontSize = pct + '%';
    store.set('blessed_fonte', pct);
  };
  aplicar();
  mais.addEventListener('click', () => { pct = Math.min(130, pct + 10); aplicar(); });
  menos.addEventListener('click', () => { pct = Math.max(90, pct - 10); aplicar(); });
}

/* ---------- 3. Menu mobile (botão hambúrguer, teclado: Esc fecha) ---------- */
function initMenu() {
  const btn = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const aberto = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(aberto));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }
  });
}

/* ---------- 4. Validação dos formulários ---------- */

/* Valida UM campo e devolve true/false. Regras por tipo/nome do campo. */
function validarCampo(campo) {
  const valor = campo.value.trim();
  let msg = '';

  if (campo.type === 'checkbox') {
    if (campo.required && !campo.checked) msg = 'É preciso aceitar para continuar.';
  } else if (campo.required && valor === '') {
    msg = 'Preencha este campo.';
  } else if (campo.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor)) {
    msg = 'Digite um e-mail válido, por exemplo nome@exemplo.com.';
  } else if (campo.name === 'mensagem' && valor.length < 10) {
    msg = 'A mensagem precisa ter pelo menos 10 caracteres.';
  } else if (valor !== '' && !campo.checkValidity()) {
    // pattern (telefone), min/max (número, data) e minlength: usa o title do campo como mensagem
    msg = campo.title || (campo.validity.tooShort ? 'Digite pelo menos ' + campo.minLength + ' caracteres.' : 'Valor inválido.');
  }

  mostrarErro(campo, msg);
  return msg === '';
}

/* Mostra/limpa a mensagem de erro e o destaque visual do campo */
function mostrarErro(campo, msg) {
  const span = document.getElementById('erro-' + campo.id);
  if (span) span.textContent = msg ? '⚠ ' + msg : '';   // ícone: não depende só da cor
  campo.classList.toggle('invalid', msg !== '');
  campo.setAttribute('aria-invalid', msg !== '' ? 'true' : 'false');
}

function initFormularios() {
  document.querySelectorAll('form[data-form]').forEach((form) => {
    const tipo = form.dataset.form;                       // "contato" ou "voluntariado"
    const status = form.querySelector('.status');
    const campos = form.querySelectorAll('input, select, textarea');

    // valida ao sair do campo (feedback imediato)
    campos.forEach((c) => c.addEventListener('blur', () => validarCampo(c)));

    form.addEventListener('submit', (evento) => {
      evento.preventDefault();                            // impede o envio padrão
      const invalidos = [...campos].filter((c) => !validarCampo(c));

      if (invalidos.length > 0) {
        status.className = 'status fail';
        status.textContent = `Corrija ${invalidos.length} campo(s) destacado(s) e envie novamente.`;
        invalidos[0].focus();                             // leva o foco ao 1º erro
        return;
      }

      // Sucesso: monta o objeto e guarda no localStorage (lista de envios)
      const dados = {};
      campos.forEach((c) => { dados[c.name] = c.type === 'checkbox' ? c.checked : c.value.trim(); });
      dados.data = new Date().toLocaleString('pt-BR');
      const lista = store.get('blessed_' + tipo, []);
      lista.push(dados);
      store.set('blessed_' + tipo, lista);

      status.className = 'status ok';
      status.textContent = `Obrigado, ${dados.nome}! Recebemos sua mensagem (salva neste navegador).`;
      form.reset();
      atualizarContadores();
    });
  });

  // botão "limpar" dos envios salvos
  document.querySelectorAll('[data-limpar]').forEach((b) => {
    b.addEventListener('click', () => {
      store.set('blessed_' + b.dataset.limpar, []);
      atualizarContadores();
    });
  });
}

/* Mostra quantos envios estão salvos (ajuda a demonstrar o localStorage) */
function atualizarContadores() {
  document.querySelectorAll('[data-contador]').forEach((el) => {
    el.textContent = store.get('blessed_' + el.dataset.contador, []).length;
  });
}

/* ---------- 5. Filtro de notícias por categoria ---------- */
function initFiltroNoticias() {
  const botoes = document.querySelectorAll('[data-filtro]');
  const itens = document.querySelectorAll('[data-cat]');
  botoes.forEach((b) => b.addEventListener('click', () => {
    const filtro = b.dataset.filtro;
    botoes.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    itens.forEach((i) => { i.hidden = !(filtro === 'todas' || i.dataset.cat === filtro); });
  }));
}

/* ---------- 6. Checklist de hábitos sustentáveis (Guia) ---------- */
function initHabitos() {
  const caixas = document.querySelectorAll('[data-habito]');
  const saida = document.getElementById('progresso-habitos');
  if (!caixas.length || !saida) return;
  const salvos = store.get('blessed_habitos', []);
  const atualizar = () => {
    const n = [...caixas].filter((c) => c.checked).length;
    saida.textContent = `${n} de ${caixas.length} hábitos adotados`;
  };
  caixas.forEach((c) => {
    c.checked = salvos.includes(c.id);
    c.addEventListener('change', () => {
      store.set('blessed_habitos', [...caixas].filter((x) => x.checked).map((x) => x.id));
      atualizar();
    });
  });
  atualizar();
}
