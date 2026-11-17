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
| 17 | ## PROJETO BLESSED 2.0, INDEX HTML, ANÁLISE         | Processos de Arquivação do Projeto para rodar de forma correta | Nada ||

       Design interativo, com as funções de alto contraste funcionando perfeitamente, assim como ZOOM IN E ZOOM OUT (-+). Porém as funções de "Sobre Nós", "Causas", "Notícias", "Galeria", "Guia", "Voluntário", "Parceiros", "FAQ" & "Contato" não estão acessando, aparecendo uma página de "Não foi possível acessar seu arquivo, dizendo que ele pode ter sido movido, editado ou excluído"

       Visualmente está ótimo, e já estando com diferenças da primeira versão do Projeto Entrega anteriormente, com a versão 2.0 contendo mais informações sobre toda questão trabalhada em volta da problemática do projeto, em relação ao primeiro modelo.

      A estrutura está assim no entanto na hora de deixar salvo no computador, com o "blessed-site-v2" contendo o HTML de todas as partes acimas que não aparece no primeiro HTML (Talvez seja um erro facilmente corrigível após eu deslocar arquivos, poderia me dizer isso?)

       Projeto 1.0 || Visualmente similar mas com diferenças, na primeira versão já havendo a inclusão do "Sobre Nós", "Sobre Nós", "Notícias", "Contato", e também "Projetos", que já não aparenta estar mais entre a segunda versão, e todos respectivamente funcionando, perfeitamente, no Backend (redirecionando ao que cada um indica, e no "Contato", na primeira versão aparece o formulário

     ## PROJETO BLESSED 2.0, DOCS, ANÁLISE DAS DOCS.

Ao Momento, as DOCS aparentam muito bem estarem bem feitas, porém falta eu validar de fatos todos os testes, coisa que pretendo ainda amanhã!

## CONTEXTUALIZAÇÃO DO PROJETO BLESSED MAIS APROFUNDADA:

SESSÃO APENAS PARA ENVIAR ARQUIVOS A IA DO 1.0 E RÚBRICAS DO 2.0 PARA COMPARAÇÃO MAIS APROFUNDADA, E REPORTAÇÃO DE PROBLEMAS DESCRITOS ACIMAS ATRÁVES DE IMAGENS| | |

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

**Cada integrante deve conseguir explicar:** a função `validarCampo`, o uso de `preventDefault`, como o `localStorage` guarda os envios e como o alto contraste muda as variáveis CSS.
