# PRAMARC

Site institucional e catálogo de pulverizadores da **PRAMARC**, fabricante de implementos agrícolas de Pranchita (PR). O projeto apresenta a empresa, a linha de equipamentos e um canal direto de orçamento via WhatsApp.

> Há 25 anos levando praticidade, segurança, tecnologia e evolução para o campo.

---

## Sobre

A PRAMARC atua há mais de 15 anos no mercado agrícola, com foco em pulverizadores de barra hidráulica. O site é a vitrine digital da marca: institucional, catálogo técnico e captura de leads.

| | |
|---|---|
| **Empresa** | PRAMARC |
| **Sede** | Rua Leonardo Giongo, 671 ? Bairro Industrial ? Pranchita/PR ? CEP 85730-000 |
| **Telefone** | (46) 3540-1789 |
| **E-mail** | pramarc@pramarc.com.br |
| **Crédito** | FINAME / PROGER |

---

## O que o site entrega

- **Home** com hero rotativo, diferenciais da marca e detalhamento técnico
- **Empresa** com missão, visão, valores e dados institucionais
- **Catálogo** de 5 pulverizadores (600 L a 2500 L), cada um com especificações e galeria
- **Contato** com telefone, e-mail, endereço e formulário que abre o WhatsApp
- **Botão flutuante de WhatsApp** em todas as páginas, com mensagem contextual
- Layout responsivo, menu mobile, animações de scroll, carrossel e parallax

---

## catálogo

| Modelo | Página | Galeria |
|---|---|---|
| Pulverizador 600 L | [`produto-600.html`](produto-600.html) | `assets/600lts/carrossel/` |
| Pulverizador 800 L | [`produto-800.html`](produto-800.html) | `assets/800lts/carrossel/` |
| Pulverizador 1000 L | [`produto-1000.html`](produto-1000.html) | `assets/1000lts/carrossel/` |
| Pulverizador 2000 L | [`produto-2000.html`](produto-2000.html) | `assets/2000lts/carrossel/` |
| Pulverizador 2500 L | [`produto-2500.html`](produto-2500.html) | `assets/2500lts/carrossel/` |

Itens em comum na linha: barra hidráulica vertical (abertura/fechamento hidráulicos), tubulação inox com porta-bicos Bijet, comandos elétricos, agitador hidráulico, lava-frasco e incorporador Pramarc, rodas aro 24".

---

## Stack

Site **estático**. Sem framework, sem bundler, sem dependências npm.

| Camada | Tecnologia |
|---|---|
| Markup | HTML5 |
| Estilo | CSS3 (`css/style.css`) ? variáveis, grid, mobile-first a partir de 768px |
| Comportamento | JavaScript vanilla (`js/components.js`, `js/main.js`) |
| Tipografia | [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts |
| Idioma | `pt-BR` |

---

## Como rodar

Os componentes (header, footer, WhatsApp) são carregados com `fetch()`. Abrir o HTML direto no navegador (`file://`) falha nesse carregamento ? o código tem fallback embutido, mas o fluxo correto é servir via HTTP.

**Opção 1 ? Python**

```bash
python -m http.server 8080
```

**Opção 2 ? Node (npx)**

```bash
npx serve .
```

**Opção 3 ? VS Code / Cursor**

Extensão *Live Server* (ou equivalente) na raiz do projeto.

Acesse [http://localhost:8080](http://localhost:8080) (ou a porta que o servidor indicar).

---

## Estrutura

```
pramarc/
??? index.html              # Home
??? empresa.html            # Institucional
??? contato.html            # Contato + formulário
??? produto-600.html        # Ficha 600 L
??? produto-800.html        # Ficha 800 L
??? produto-1000.html       # Ficha 1000 L
??? produto-2000.html       # Ficha 2000 L
??? produto-2500.html       # Ficha 2500 L
??? components/
?   ??? header.html         # Navegação compartilhada
?   ??? footer.html         # Rodapé compartilhado
?   ??? whatsapp.html       # Botão flutuante
??? css/
?   ??? style.css           # Folha única do site
??? js/
?   ??? components.js       # Injeta header/footer/WhatsApp + fallback
?   ??? main.js             # Menu, hero, carrossel, form, animações
??? assets/
    ??? logo.png
    ??? banner1.png
    ??? Banner2.png
    ??? empresa.jpg
    ??? hero-flyer.jpeg
    ??? 600lts/ ? 2500lts/  # Foto principal + carrossel de cada modelo
```

Cada página monta o layout em três âncoras:

```html
<div id="site-header" data-page="home"></div>
<div id="site-footer"></div>
<div id="site-whatsapp" data-whatsapp-text="Ola! Tenho interesse no Pulverizador Pramarc 2000 Litros."></div>
```

`components.js` busca os HTML parciais, aplica estado (página ativa, produto ativo, texto do WhatsApp) e dispara o evento `components:loaded`. `main.js` escuta esse evento e liga os comportamentos.

Se o `fetch` falhar (por exemplo, abrir via `file://`), o próprio `components.js` injeta um markup de fallback.

---

## Comportamentos (`main.js`)

| Recurso | Detalhe |
|---|---|
| Header sticky | Classe `header--scrolled` após 60px de scroll |
| Hero | Alterna `banner1.png` / `Banner2.png` a cada 10s |
| Menu mobile | Hambúrguer + submenu de produtos abaixo de 768px |
| Scroll reveal | Intersection Observer em `[data-animate]` |
| Contadores | Animação em `[data-count]` |
| Parallax | `[data-parallax]` no banner de destaque |
| Carrossel | Setas, swipe, teclado ?/? e autoplay de 4,5s |
| Formulário | Monta mensagem e abre `wa.me` em nova aba |

---

## Customização

### Número de WhatsApp

O número atual (`5544999999999`) é placeholder. Troque em todos estes pontos:

- `js/components.js` ? fallback do botão e `configureWhatsAppState()`
- `js/main.js` ? envio do formulário (`wa.me/...`)
- `components/whatsapp.html` ? `href` do botão
- `contato.html` ? link e texto exibido na área de contato

Formato internacional, só dígitos: `55` + DDD + número. Exemplo: `554635401789`.

### Mensagem do WhatsApp por página

Ajuste o atributo `data-whatsapp-text` no `#site-whatsapp` de cada HTML.

### Identidade visual

Tokens no `:root` de `css/style.css`:

```css
--orange: #F15A24;
--black: #0A0A0A;
--font: 'Inter', ...;
--container: 1200px;
```

### Novo produto

1. Duplique um `produto-*.html` e atualize título, specs, `data-product` e `data-whatsapp-text`.
2. Crie `assets/<capacidade>lts/carrossel/` com as imagens.
3. Inclua o item no menu de `components/header.html` **e** no fallback de header em `js/components.js`.

---

## Publicação

Qualquer host de arquivos estáticos serve: Netlify, Vercel, GitHub Pages, Cloudflare Pages, S3 + CloudFront ou o servidor da própria empresa.

Não há build. Envie a pasta (exceto `data/` e `scripts/`, vazias) e aponte o document root para a raiz do projeto.

Checklist antes de ir ao ar:

- [ ] Substituir o WhatsApp placeholder pelo número oficial
- [ ] Conferir telefone, e-mail e endereço
- [ ] Garantir que as pastas de galeria de todos os modelos existam
- [ ] Testar header, menu mobile, formulário e botão flutuante em HTTP (não em `file://`)
- [ ] Validar desktop e viewport ? 768px

---

## Licença

Código do site: uso interno da PRAMARC.

Marca, fotos dos equipamentos e textos institucionais pertencem é PRAMARC. Não redistribuir sem autorização.
