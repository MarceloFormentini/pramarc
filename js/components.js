(function () {
  'use strict';

  function getFallbackComponent(filePath) {
    if (filePath === 'components/header.html') {
      return [
        '<header class="header" id="header">',
        '  <div class="header__inner container">',
        '    <a href="index.html#inicio" class="header__logo" aria-label="PRAMARC - Inicio">',
        '      <img src="assets/logo.png" alt="PRAMARC Pulverizadores" width="160" height="80">',
        '    </a>',
        '    <nav class="header__nav" id="nav" aria-label="Navegacao principal">',
        '      <a href="index.html#inicio">Inicio</a>',
        '      <a href="empresa.html" data-page-link="empresa">Empresa</a>',
        '      <div class="header__dropdown">',
        '        <button type="button" class="header__dropdown-toggle" aria-expanded="false" aria-haspopup="true">',
        '          Produto',
        '          <svg class="header__dropdown-icon" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
        '        </button>',
        '        <ul class="header__dropdown-menu" role="menu">',
        '          <li role="none"><a href="produto-600.html" role="menuitem" data-product-link="600">600 Litros</a></li>',
        '          <li role="none"><a href="produto-800.html" role="menuitem" data-product-link="800">800 Litros</a></li>',
        '          <li role="none"><a href="produto-1000.html" role="menuitem" data-product-link="1000">1000 Litros</a></li>',
        '          <li role="none"><a href="produto-2000.html" role="menuitem" data-product-link="2000">2000 Litros</a></li>',
        '          <li role="none"><a href="produto-2500.html" role="menuitem" data-product-link="2500">2500 Litros</a></li>',
        '        </ul>',
        '      </div>',
        '      <a href="contato.html" class="header__cta" data-page-link="contato">Contato</a>',
        '    </nav>',
        '    <button class="header__menu-btn" id="menuBtn" aria-label="Abrir menu" aria-expanded="false">',
        '      <span></span><span></span><span></span>',
        '    </button>',
        '  </div>',
        '</header>'
      ].join('');
    }

    if (filePath === 'components/footer.html') {
      return [
        '<footer class="footer">',
        '  <div class="container footer__inner">',
        '    <div class="footer__brand">',
        '      <img src="assets/logo.png" alt="PRAMARC Pulverizadores" width="140" height="70">',
        '    </div>',
        '    <div class="footer__links">',
        '      <a href="index.html#inicio">Inicio</a>',
        '      <a href="empresa.html">Empresa</a>',
        '      <a href="produto-2000.html">Produto</a>',
        '      <a href="contato.html">Contato</a>',
        '    </div>',
        '    <p class="footer__copy">&copy; 2026 PRAMARC. Todos os direitos reservados.</p>',
        '  </div>',
        '</footer>'
      ].join('');
    }

    if (filePath === 'components/whatsapp.html') {
      return [
        '<a href="https://wa.me/5544999999999" class="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Contato via WhatsApp">',
        '  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
        '</a>'
      ].join('');
    }

    return '';
  }

  async function loadComponent(selector, filePath) {
    const mount = document.querySelector(selector);
    if (!mount) {
      return;
    }

    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error('Falha ao carregar componente: ' + filePath);
      }

      mount.innerHTML = await response.text();
    } catch (error) {
      const fallbackMarkup = getFallbackComponent(filePath);
      if (fallbackMarkup) {
        mount.innerHTML = fallbackMarkup;
      }
      console.warn('Componente carregado em fallback local:', filePath, error);
    }
  }

  function ensureWhatsAppMount() {
    let mount = document.querySelector('#site-whatsapp');
    if (mount) {
      return mount;
    }

    mount = document.createElement('div');
    mount.id = 'site-whatsapp';
    mount.dataset.whatsappText = 'Ola! Tenho interesse nos produtos PRAMARC.';
    document.body.appendChild(mount);
    return mount;
  }

  function configureHeaderState() {
    const mount = document.querySelector('#site-header');
    if (!mount) {
      return;
    }

    const page = mount.dataset.page;
    const product = mount.dataset.product;
    const header = mount.querySelector('#header');

    if (page !== 'home') {
      header?.classList.add('header--scrolled');
    }

    if (page === 'home') {
      const logo = mount.querySelector('.header__logo');
      if (logo) {
        logo.setAttribute('href', '#inicio');
      }

      mount.querySelectorAll('.header__nav > a[href^="index.html#"]').forEach(function (link) {
        link.setAttribute('href', link.getAttribute('href').replace('index.html', ''));
      });
    }

    if (page === 'contato') {
      mount.querySelector('[data-page-link="contato"]')?.classList.add('is-active');
    }

    if (page === 'empresa') {
      mount.querySelector('[data-page-link="empresa"]')?.classList.add('is-active');
    }

    if (product) {
      mount.querySelector('[data-product-link="' + product + '"]')?.classList.add('is-active');
    }
  }

  function configureWhatsAppState() {
    const mount = document.querySelector('#site-whatsapp');
    if (!mount) {
      return;
    }

    const link = mount.querySelector('.whatsapp-float');
    if (!link) {
      return;
    }

    const rawText = mount.dataset.whatsappText || 'Ola! Tenho interesse nos produtos PRAMARC.';
    const encodedText = encodeURIComponent(rawText);
    link.setAttribute('href', 'https://wa.me/5544999999999?text=' + encodedText);
  }

  async function loadLayout() {
    ensureWhatsAppMount();

    await Promise.all([
      loadComponent('#site-header', 'components/header.html'),
      loadComponent('#site-footer', 'components/footer.html'),
      loadComponent('#site-whatsapp', 'components/whatsapp.html')
    ]);

    configureHeaderState();
    configureWhatsAppState();
    document.dispatchEvent(new CustomEvent('components:loaded'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadLayout);
  } else {
    loadLayout();
  }
})();
