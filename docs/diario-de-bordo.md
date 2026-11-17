# Diário de bordo – BLESSED

## Registro de decisões (preencher datas e responsáveis reais)
| Data | Decisão / atividade | Responsável | Evidência |
|---|---|---|---|
| [dd/mm] | Definição do escopo e do tema (sustentabilidade, ODS 11/12/13) | Lucas, José Samuel | Documento de Escopo |
| [dd/mm] | Entrega 1: Home com HTML semântico e CSS | Lucas, José Samuel | commit [hash] |
| 16/11 | Análise da rubrica 2.0 × MVP e plano de correções | Todos | docs/melhorias-mvp.md |
| 16/11 | Decisão: GitHub Pages (custo zero, HTTPS) | Todos | docs/orcamento.md |
| 16/11 | Decisão: ilustrações em SVG autorais em vez de fotos | Todos | assets/img |
| 17/11 | Testes (W3C, Lighthouse, teclado, celular) | José Samuel | docs/testes.md |

## Uso de IA (prompts, aceito, corrigido)
| Data | Prompt resumido | O que foi aceito | O que corrigimos / entendemos |
|---|---|---|---|
| 16/11 | Comparar rubrica 2.0 com o projeto da 1ª entrega | Lista de lacunas por critério | A ausencia de funções de CSS, JS e as 10 Paginas, além de outras funcionalidades |
| 16/11 | Gerar as 10 páginas, CSS e JS conforme a rubrica | Estrutura, validação, localStorage, menu | Nada. |
| 17/11 | ANALISE DE PROJETOS 1.0 COM 2.0 | Processos de Arquivação do Projeto para rodar de forma correta | Nada ||

 



## Rodada final de testes e validações

Nesta etapa, executei o plano de testes descrito em docs/testes.md e registrei
as evidências em docs/evidencias/. Utilizei os validadores W3C para HTML e CSS,
o Lighthouse para acessibilidade e desempenho, e o modo dispositivo do navegador
para conferir o layout em celular, tablet e desktop.

Também testei a navegação apenas por teclado, o foco visível, o formulário de
contato (com erro e com sucesso), o armazenamento em localStorage e a persistência
das opções de alto contraste e tamanho de fonte ao recarregar e trocar de página.
Por fim, conferi os 10 links do menu e confirmei que o site está online com HTTPS
pelo GitHub Pages.

Comparei o resultado final com o design planejado, ajustei o que estava diferente
e publiquei tudo no GitHub. Com isso, o projeto está concluído.


## 17/11/2026 – Estudo e explicação do JavaScript (script.js)

Nesta etapa, os dois integrantes (José Samuel e Lucas) revisaram o `script.js`
para conseguir explicar cada parte do código. O arquivo é carregado nas 10
páginas e cada módulo confere se o elemento existe antes de rodar.

### 1. Função `validarCampo`

**O que faz:** valida um único campo do formulário e devolve `true` (válido)
ou `false` (inválido).

**Como funciona:**
- Lê o valor do campo sem espaços nas pontas (`trim()`).
- Testa as regras em ordem e para na primeira que falhar: checkbox obrigatório,
  campo vazio, formato de e-mail (expressão regular), mensagem com no mínimo
  10 caracteres e regras do HTML (`pattern`, `min`, `max`, `minlength`) via
  `checkValidity()`.
- Chama `mostrarErro`, que escreve a mensagem com o ícone ⚠ (o erro não depende
  só da cor), aplica a classe `invalid` (borda em destaque) e atualiza o
  `aria-invalid` para leitores de tela.
- É chamada no `blur` (ao sair do campo) e no `submit` (ao enviar).

### 2. Uso de `preventDefault`

**O que faz:** cancela o envio padrão do formulário, que recarregaria a página.

**Por que usamos:** para validar antes de enviar.
- Com erro: mostra "Corrija N campo(s)...", leva o foco ao primeiro campo
  inválido e não salva nada.
- Sem erro: salva os dados no `localStorage`, mostra a mensagem de sucesso,
  limpa o formulário (`form.reset()`) e atualiza o contador de envios.

### 3. Como o `localStorage` guarda os envios

**O que é:** um armazenamento do navegador, em pares chave/valor de texto, que
permanece depois de recarregar ou fechar a página.

**Como usamos:**
- Um objeto auxiliar `store` (com `get` e `set`) usa `JSON.stringify` para
  guardar e `JSON.parse` para ler. Tem `try/catch`, então o site não quebra se
  o navegador bloquear o armazenamento (ex.: modo privado).
- No envio com sucesso, montamos um objeto com os campos e a data, lemos a
  lista existente (`blessed_contato` ou `blessed_voluntariado`), adicionamos o
  novo envio com `push` e salvamos a lista de novo.
- O contador de envios é atualizado por `atualizarContadores()`, e o botão
  "limpar" salva uma lista vazia.
- Os dados ficam só no navegador do usuário, sem servidor. Podem ser vistos em
  F12 → Application → Local Storage.

### 4. Alto contraste (e tamanho da fonte)

**Alto contraste:**
- Ao clicar no botão, o JavaScript liga ou desliga a classe `high-contrast` no
  `<body>` (`classList.toggle`) e atualiza o `aria-pressed`.
- O CSS aplica as cores de alto contraste quando o `body` tem essa classe, e
  assim o site inteiro muda de uma vez.
- A escolha é salva em `blessed_contraste` e reaplicada ao carregar cada página,
  por isso persiste ao recarregar e ao trocar de página.

**Tamanho da fonte (A- / A+):**
- Altera o `font-size` do `<html>` em porcentagem (mínimo 90%, máximo 130%, em
  passos de 10) e salva em `blessed_fonte`.

### Outros módulos do arquivo

- **Menu mobile:** botão hambúrguer com `aria-expanded`; a tecla Esc fecha o
  menu e devolve o foco ao botão.
- **Filtro de notícias:** mostra ou oculta itens por categoria (`hidden`).
- **Checklist de hábitos:** guarda os hábitos marcados em `blessed_habitos` e
  mostra o progresso.

### Aprendizados

- Separar validação (`validarCampo`) de exibição (`mostrarErro`) deixou o código
  mais fácil de entender e de reaproveitar.
- Mensagens de erro em texto, `aria-invalid`, foco no primeiro erro e
  `aria-pressed` ajudam o uso por leitor de tela e por teclado.
- Salvar preferências no `localStorage` melhora a experiência, mas os dados
  ficam apenas no navegador de quem usa.

**Cada integrante deve conseguir explicar:** a função `validarCampo`, o uso de `preventDefault`, como o `localStorage` guarda os envios e como o alto contraste muda as variáveis CSS.
