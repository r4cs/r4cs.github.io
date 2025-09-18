export const mainMenuDialogue = [
  {'id': 'mainMenuDialogue',
  'question': 'Escolha um tema!!',
  'answers': [
                {'text': 'Entender o que é um IPO',
                'next': 'entender'},
    
                {'text': 'Como investir em um IPO?',
                'next': 'investir'},
    
                {'text': 'Regulamentação de IPO',
                'next': 'regulamentacao'}
              ]
  },
  
  {'id': 'entender',
  'question': 'Sobre o que voce quer falar?',
  'answers': [
              {'text':'O que é um IPO?',
              'next':'o-que-e-um-ipo'},
    
              {'text': 'Porque uma empresa faz IPO?',
              'next':'porque-uma-empresa-faz-ipo'},
    
              {'text': 'Como uma empresa pode se preparar para um IPO?',
              'next':'como-uma-empresa-pode-se-preparar-para-IPO'},
    
              {'text':'O que acontece durante um IPO?',
              'next':'o-que-acontece-durante-um-ipo'},
    
              {'text':'Quais são os prós e contras de um IPO?',
              'next':'pros-e-contras'},
    
              {'text':'Voltar ao menu principal',
              'next':'mainMenuDialogue'}
    
              ]
  },
  
  {'id': 'o-que-e-um-ipo',
    'question': 'IPO é a sigla para \'Initial Public Offering\' ou \'Oferta Pública Inicial\', que é quando uma empresa privada vende ações ao público em geral pela primeira vez, tornando-se uma empresa de capital aberto. Existem várias razões pelas quais uma empresa pode optar por fazer um IPO.',
    'answers': [ {'text': 'voltar', 
                'next':'entender'}]
  },
  
   {'id':'porque-uma-empresa-faz-ipo',
   'question': 'Porque uma empresa faz IPO?',
   'answers':  [
                {'text':'Levantamento de Capital',
                'next': 'levantamento-de-capital'},
     
                {'text':'Permitir que os acionistas existentes vendam suas ações no mercado de ações',
                'next': 'venda-acoes-por-acionistas'},
     
                {'text':'Aumentar a visibilidade e reputação da empresa',
                'next': 'aumentar-visibilidade-e-reputação'}, 

                {'text':'voltar',
                'next': 'entender'}
               ]
  },
  
  {'id': 'levantamento-de-capital',
   'question':'Uma das principais razões pelas quais uma empresa pode optar por fazer um IPO é levantar capital para financiar o crescimento da empresa. Ao vender ações ao público, a empresa pode arrecadar dinheiro para investir em novos projetos, expandir suas operações ou adquirir outras empresas.',
   'answers': [
               {'text':'voltar a "porque uma empresa faz ipo"?', 
                'next':'porque-uma-empresa-faz-ipo'},
     
              {'text':'voltar ao menu anterior', 
                'next':'entender'},
     
               {'text':'voltar ao menu principal',
                'next': 'mainMenuDialogue'}
              ]
  },
  
  
  { 'id':'venda-acoes-por-acionistas',
     'question':'Outra razão pela qual uma empresa pode optar por fazer um IPO é permitir que os acionistas existentes vendam suas ações. Quando uma empresa é privada, as ações geralmente são de propriedade de um pequeno grupo de investidores. Ao se tornar uma empresa de capital aberto, os acionistas podem vender suas ações no mercado de ações, tornando mais fácil para eles liquidar seus investimentos.',
     'answers': [
               {'text':'voltar a "porque uma empresa faz ipo"?', 
                'next':'porque-uma-empresa-faz-ipo'},
     
              {'text':'voltar ao menu anterior', 
                'next':'entender'},
     
               {'text':'voltar ao menu principal',
                'next': 'mainMenuDialogue'}
              ]
    },
  
    {'id':'aumentar-visibilidade-e-reputação',
    'question': 'Ao se tornar uma empresa de capital aberto, a empresa pode aumentar sua visibilidade e reputação. Isso ocorre porque a empresa agora está sujeita a escrutínio público e regulamentação. A empresa também pode ser vista como mais estável e confiável por clientes, fornecedores e parceiros de negócios.',
    'answers':[
               {'text':'voltar a "porque uma empresa faz ipo"?', 
                'next':'porque-uma-empresa-faz-ipo'},
     
              {'text':'voltar ao menu anterior', 
                'next':'entender'},
     
               {'text':'voltar ao menu principal',
                'next': 'mainMenuDialogue'}
              ]
    },
  
    {'id':'como-uma-empresa-pode-se-preparar-para-IPO',
   'question': 'Como uma empresa pode se preparar para um IPO?',
   'answers':  [
                {'text':'Selecionando os bancos de investimento que irão conduzir o IPO',
                'next': 'selecao-de-bancos-de-investimento'},
     
                {'text':'Preparando demonstrações financeiras auditadas e divulgando informações sobre a empresa',
                'next': 'demonstracoes-financeiras-auditadas'},
     
                {'text':'Desenvolvendo uma história convincente da empresa e seu potencial futuro para os investidores.',
                'next': 'narrativa-para-investidores'}
                 
               ]
  },
                
    {'id':'selecao-de-bancos-de-investimento',
    'question':'Para se preparar para um IPO, uma empresa precisa selecionar os bancos de investimento que irão conduzir o processo. Esses bancos ajudarão a empresa a determinar o valor da oferta pública, a estrutura da oferta e a estabelecer contatos com investidores institucionais.',
    'answers': [
               {'text':'voltar a "como uma empresa pode se preparar para um IPO?"', 
                'next':'como-uma-empresa-pode-se-preparar-para-IPO'},
     
              {'text':'voltar ao menu anterior', 
                'next':'entender'},
     
               {'text':'voltar ao menu principal',
                'next': 'mainMenuDialogue'}
              ]
  },
  
  {'id':'demonstracoes-financeiras-auditadas',
    'question':'A empresa deve preparar demonstrações financeiras auditadas e divulgá-las juntamente com informações sobre a empresa para potenciais investidores. Isso inclui divulgar informações sobre os produtos ou serviços oferecidos, a estrutura organizacional, a equipe de liderança, a visão estratégica da empresa e a posição de mercado da empresa.',
    'answers': [
               {'text':'voltar a "como uma empresa pode se preparar para um IPO?"', 
                'next':'como-uma-empresa-pode-se-preparar-para-IPO'},
     
              {'text':'voltar ao menu anterior', 
                'next':'entender'},
     
               {'text':'voltar ao menu principal',
                'next': 'mainMenuDialogue'}
              ]
  },
  
  {'id':'narrativa-para-investidores',
    'question':'Para atrair investidores, a empresa precisa desenvolver uma história convincente sobre sua história, sua posição no mercado e seu potencial futuro. Isso inclui apresentar os desafios que a empresa superou, as oportunidades que a empresa vê no mercado e como a empresa planeja aproveitar essas oportunidades. A empresa também deve apresentar seus planos para o futuro, incluindo seus objetivos estratégicos e como eles serão alcançados.',
    'answers': [
               {'text':'voltar a "como uma empresa pode se preparar para um IPO?"', 
                'next':'como-uma-empresa-pode-se-preparar-para-IPO'},
     
              {'text':'voltar ao menu anterior', 
                'next':'entender'},
     
               {'text':'voltar ao menu principal',
                'next': 'mainMenuDialogue'}
              ]
  },
  
      {'id':'o-que-acontece-durante-um-ipo',
   'question': 'O que acontece durante um IPO?',
   'answers':  [
                {'text':'A empresa e seus bancos de investimento realizam roadshows e apresentações a investidores em potencial',
                'next': 'roadshows-a-investidores'},
     
                {'text':'O preço das ações é determinado e as ações são alocadas aos investidores.',
                'next': 'determinacao-de-precos-e-alocacao-de-acoes'},
     
                {'text':'As ações começam a ser negociadas em uma bolsa de valores pública.',
                'next': 'venda-acoes-na-bolsa'}
                 
               ]
  },
  
  {'id': 'roadshows-a-investidores',
   'question':'Durante um IPO, a empresa e seus bancos de investimento realizam roadshows e apresentações a investidores em potencial. Isso é feito para aumentar o interesse dos investidores e divulgar informações adicionais sobre a empresa. Os roadshows geralmente envolvem apresentações em várias cidades, onde a empresa pode se encontrar com investidores institucionais e potenciais investidores individuais.',
   'answers': [
               {'text':'voltar a "o que acontece durante um IPO?"', 
                'next':'o-que-acontece-durante-um-ipo'},
     
              {'text':'voltar ao menu anterior', 
                'next':'entender'},
     
               {'text':'voltar ao menu principal',
                'next': 'mainMenuDialogue'}
              ]
  },
  
  
  {'id': 'determinacao-de-precos-e-alocacao-de-acoes',
   'question':'Durante um IPO, o preço das ações é determinado com base na oferta e demanda do mercado. Os bancos de investimento trabalham para determinar o preço justo das ações e alocá-las a investidores que desejam comprá-las. Isso pode incluir investidores institucionais, como fundos de investimento, bem como investidores individuais.',
   'answers':  [
               {'text':'voltar a "o que acontece durante um IPO?"', 
                'next':'o-que-acontece-durante-um-ipo'},
     
              {'text':'voltar ao menu anterior', 
                'next':'entender'},
     
               {'text':'voltar ao menu principal',
                'next': 'mainMenuDialogue'}
              ]
  },
  
  
    {'id': 'venda-acoes-na-bolsa',
   'question':'Após o IPO, as ações da empresa começam a ser negociadas em uma bolsa de valores pública, como a Bolsa de Valores de Nova York ou a Nasdaq. Os investidores podem então comprar e vender ações da empresa no mercado aberto. O preço das ações pode flutuar com base nas forças do mercado, incluindo as notícias da empresa, a concorrência e a economia em geral.',
   'answers':  [
               {'text':'voltar a "o que acontece durante um IPO?"', 
                'next':'o-que-acontece-durante-um-ipo'},
     
              {'text':'voltar ao menu anterior', 
                'next':'entender'},
     
               {'text':'voltar ao menu principal',
                'next': 'mainMenuDialogue'}
              ]
  },
  
  
  
  {'id':'pros-e-contras',
   'question': 'Quais são os prós e contras de um IPO?',
   'answers':  [
                {'text':'Prós',
                'next': 'pros'},
     
                {'text':'Contras',
                'next': 'contras'}
               ]
  },
  
  {'id':'pros',
   'question':'Existem vários prós de um IPO, incluindo a capacidade de levantar capital para a empresa, o que pode ser usado para financiar o crescimento, pagar dívidas ou financiar aquisições. Além disso, um IPO pode aumentar a visibilidade e a reputação da empresa, fornecer um mercado líquido para as ações e permitir que os acionistas existentes vendam suas ações no mercado aberto.',
   'answers':  [
               {'text':'voltar a "prós e contras"', 
                'next':'pros-e-contras'},
     
              {'text':'voltar ao menu anterior', 
                'next':'entender'},
     
               {'text':'voltar ao menu principal',
                'next': 'mainMenuDialogue'}
              ]
  },
  
  {'id':'contras',
   'question':'Há também alguns contras em relação ao IPO. A empresa é obrigada a divulgar detalhadamente suas informações financeiras e de negócios, o que pode afetar a privacidade e a confidencialidade. Além disso, os custos de conformidade regulatória e contábil podem ser significativos. A empresa também pode estar sob pressão adicional para relatar lucros trimestrais consistentes e atender às expectativas dos investidores. Por exemplo, a empresa XYZ teve que arcar com altos custos de auditoria e conformidade para se preparar para o IPO. Ou, ppós o IPO, a empresa XYZ sentiu a pressão para relatar lucros trimestrais consistentes e atender às expectativas dos investidores.',
   'answers':  [
               {'text':'voltar a "prós e contras"', 
                'next':'pros-e-contras'},
     
              {'text':'voltar ao menu anterior', 
                'next':'entender'},
     
               {'text':'voltar ao menu principal',
                'next': 'mainMenuDialogue'}
              ]
  }, 
  
  {'id': 'investir',
  'question': 'Sobre o que voce quer falar?',
  'answers': [
              {'text':'Como funciona o processo de investimento em IPOs??',
              'next':'como-funciona-o-processo-de-investimento-ipo'},
    
              {'text': 'Quais são as estratégias para investir em IPOs?',
              'next':'estrategias-para-investir-ipo'},
    
              {'text': 'Quais são os riscos e as oportunidades de investir em IPOs?',
              'next':'riscos-e-oportunidades'},
    
              {'text':'voltar ao menu principal',
              'next':'mainMenuDialogue'}
              ]
  }, 
  
  {'id':'como-funciona-o-processo-de-investimento-ipo',
  'question': 'Como funciona o processo de investimento em IPOs?',
  'answers':  [
               {'text':'Investidores geralmente precisam ter uma conta em uma corretora que ofereça acesso a IPOs.',
               'next': 'investidores-precisam-ter-conta-em-corretora'},
    
               {'text':'Os investidores geralmente precisam preencher um questionário para avaliar sua adequação para investir em IPOs.',
               'next': 'investidores-precisam-preencher-questionarios'},
    
               {'text':'O número de ações disponíveis para investidores individuais pode ser limitado.',
               'next': 'numero-de-acoes-limitadas'}
                
              ]
 }, 
 
 {'id': 'investidores-precisam-ter-conta-em-corretora',
 'question':'Para investir em IPOs, os investidores geralmente precisam ter uma conta em uma corretora que ofereça acesso a IPOs. As corretoras geralmente têm requisitos de investimento mínimos para participar de um IPO e podem limitar o número de ações disponíveis para investidores individuais.',
 'answers': [
               {'text':'voltar a "como funciona o processo de investimento em IPOs?"', 
                'next':'como-funciona-o-processo-de-investimento-ipo'},
     
              {'text':'voltar ao menu anterior', 
                'next':'investir'},
     
               {'text':'voltar ao menu principal',
                'next': 'mainMenuDialogue'}
              ]
},
 
{'id': 'investidores-precisam-preencher-questionarios',
 'question':'Antes de investir em um IPO, os investidores geralmente precisam preencher um questionário para avaliar sua adequação para investir em IPOs. Isso pode incluir perguntas sobre o patrimônio líquido do investidor, experiência em investimentos e tolerância ao risco. Isso ajuda a garantir que os investidores entendam os riscos envolvidos e estão financeiramente aptos a investir em um IPO.',
 'answers': [
               {'text':'voltar a "como funciona o processo de investimento em IPOs?"', 
                'next':'como-funciona-o-processo-de-investimento-ipo'},
     
              {'text':'voltar ao menu anterior', 
                'next':'investir'},
     
               {'text':'voltar ao menu principal',
                'next': 'mainMenuDialogue'}
              ]
},
{'id': 'numero-de-acoes-limitadas',
 'question':'No entanto, é importante observar que o número de ações disponíveis para investidores individuais pode ser limitado, já que a maioria das ações geralmente é alocada para grandes investidores institucionais. Isso significa que os investidores individuais podem ter dificuldade em adquirir um grande número de ações em um IPO e podem precisar esperar até que as ações comecem a ser negociadas publicamente para comprar mais ações.',
 'answers': [
               {'text':'voltar a "como funciona o processo de investimento em IPOs?"', 
                'next':'como-funciona-o-processo-de-investimento-ipo'},
     
              {'text':'voltar ao menu anterior', 
                'next':'investir'},
     
               {'text':'voltar ao menu principal',
                'next': 'mainMenuDialogue'}
              ]
},  

{'id':'estrategias-para-investir-ipo',
'question': 'Quais são as estratégias para investir em IPOs?',
'answers':  [
             {'text':'Investir em IPOs como parte de uma carteira diversificada de investimentos.',
             'next': 'investir-em-carteira-diversificada'},
  
             {'text':'Aguardar a estabilização das ações após o IPO antes de investir.',
             'next': 'aguardar-estabilizar-acoes'},
  
             {'text':'Avaliar cuidadosamente as informações financeiras e de negócios divulgadas pela empresa antes de investir.',
             'next': 'avaliar-informacoes-financeiras-das-empresas'}
              
            ]
},

{'id': 'investir-em-carteira-diversificada',
'question':'Uma estratégia comum para investir em IPOs é incluí-los como parte de uma carteira diversificada de investimentos. Isso ajuda a mitigar o risco de colocar todo o capital em um único investimento. Ao diversificar a carteira, os investidores podem reduzir a exposição a riscos específicos do setor e aumentar as chances de sucesso geral da carteira.',
'answers': [
               {'text':'voltar a "estratégias para investir em IPOs?"', 
                'next':'estrategias-para-investir-ipo'},
     
              {'text':'voltar ao menu anterior', 
                'next':'investir'},
     
               {'text':'voltar ao menu principal',
                'next': 'mainMenuDialogue'}
              ]
},
{'id': 'aguardar-estabilizar-acoes',
'question':'Outra estratégia é esperar que as ações se estabilizem após o IPO antes de investir. Isso envolve aguardar um período após o IPO para que o preço das ações se estabilize e os riscos iniciais associados ao IPO diminuam. Os investidores que aguardam a estabilização podem obter uma melhor compreensão do valor da empresa e dos possíveis riscos e oportunidades antes de decidir investir.',
'answers': [
               {'text':'voltar a "estratégias para investir em IPOs?"', 
                'next':'estrategias-para-investir-ipo'},
     
              {'text':'voltar ao menu anterior', 
                'next':'investir'},
     
               {'text':'voltar ao menu principal',
                'next': 'mainMenuDialogue'}
              ]
},
{'id': 'avaliar-informacoes-financeiras-das-empresas',
'question':'Uma terceira estratégia é avaliar cuidadosamente as informações financeiras e de negócios divulgadas pela empresa antes de investir. Os investidores devem analisar as demonstrações financeiras e outros documentos da empresa e avaliar a história da empresa, seus concorrentes e seu potencial futuro. A análise cuidadosa da empresa pode ajudar os investidores a tomar uma decisão informada sobre se devem ou não investir no IPO.',
'answers': [
               {'text':'voltar a "estratégias para investir em IPOs?"', 
                'next':'estrategias-para-investir-ipo'},
     
              {'text':'voltar ao menu anterior', 
                'next':'investir'},
     
               {'text':'voltar ao menu principal',
                'next': 'mainMenuDialogue'}
              ]
},

{'id':'riscos-e-oportunidades',
'question': 'Quais são os riscos e as oportunidades de investir em IPOs??',
'answers': [ 
            {'text':'Riscos',
             'next':'riscos'},
            
            {'text':'Oportunidades',
             'next':'oportunidades'}
            ]
},
 {'id':'riscos',
 'question': 'Investir em IPOs pode ser arriscado, pois as empresas que estão oferecendo suas ações pela primeira vez no mercado podem não ter histórico financeiro sólido ou não ter um histórico de sucesso comprovado. Além disso, pode haver uma alta expectativa dos investidores em relação ao desempenho da empresa após o IPO, o que pode não se concretizar. \nPor exemplo, se a empresa falhar após o IPO, os investidores podem perder todo o dinheiro investido nas ações. \nOu mesmo as ações podem ser superavaliadas e, em seguida, perder valor rapidamente, deixando os investidores com prejuízos significativos.',
 'answers': [
               {'text':'voltar a "riscos e oportunidades"', 
                'next':'riscos-e-oportunidades'},
     
              {'text':'voltar ao menu anterior', 
                'next':'investir'},
     
               {'text':'voltar ao menu principal',
                'next': 'mainMenuDialogue'}
              ]
 },
 {
    'id':'oportunidades',
    'question': 'Embora haja riscos em investir em IPOs, há também oportunidades. Uma das principais vantagens é a oportunidade de adquirir ações de uma empresa em crescimento a preços mais baixos do que o mercado secundário. Além disso, as empresas podem ter um potencial de crescimento significativo após o IPO, o que pode levar a um aumento no valor das ações. \nPor exemplo, se a empresa tiver sucesso após o IPO, os investidores podem obter um retorno significativo sobre o investimento em um curto período de tempo.\n Algumas empresas podem ter, tambem, uma posição de mercado única que pode levar a um crescimento significativo e aumento no valor das ações',
   'answers': [
               {'text':'voltar a "riscos e oportunidades"', 
                'next':'riscos-e-oportunidades'},
     
              {'text':'voltar ao menu anterior', 
                'next':'investir'},
     
               {'text':'voltar ao menu principal',
                'next': 'mainMenuDialogue'}
              ]
  },
  
    {'id': 'regulamentacao',
    'question': 'Sobre o que voce quer falar?',
    'answers': [
                {'text':'Quais as regulamentações de um IPO?',
                'next':'quais-regulamentos-de-um-ipo'},
      
               {'text':'voltar ao menu principal',
                'next':'mainMenuDialogue'}
      
                ]
    },

    {'id':'quais-regulamentos-de-um-ipo',
    'question': 'Quais as regulamentações de um IPO?',
    'answers':  [
                 {'text':'As empresas são regulamentadas por agências governamentais, como a Comissão de Valores Mobiliários (CVM) no Brasil e a Securities and Exchange Commission (SEC) nos Estados Unidos.',
                 'next': 'regulamentacao-por-agencias'},

                 {'text':'As empresas devem divulgar informações financeiras e de negócios precisas e completas.',
                 'next': 'divulgar-informcoes-financeiras-e-negocios'},

                 {'text':'As empresas devem cumprir todas as leis e regulamentações aplicáveis, incluindo a Lei Sarbanes-Oxley nos Estados Unidos.',
                 'next': 'empresas-devem-cumprir-leis'}
                ]
   },

   {'id': 'regulamentacao-por-agencias',
   'question':'Durante o processo de IPO, as empresas são regulamentadas por agências governamentais responsáveis por supervisionar os mercados financeiros. No Brasil, a Comissão de Valores Mobiliários (CVM) é a agência reguladora que desempenha esse papel. Nos Estados Unidos, a agência reguladora é a Securities and Exchange Commission (SEC).',
   'answers': [
               {'text':'voltar a "Quais as regulamentações de um IPO?"', 
                'next':'quais-regulamentos-de-um-ipo'},
     
              {'text':'voltar ao menu anterior', 
                'next':'investir'},
     
               {'text':'voltar ao menu principal',
                'next': 'mainMenuDialogue'}
              ]
  },
   {'id': 'divulgar-informcoes-financeiras-e-negocios',
   'question':'Durante o processo de IPO, as empresas são obrigadas a divulgar informações financeiras e de negócios precisas e completas para potenciais investidores. Essas informações incluem demonstrações financeiras auditadas, descrições detalhadas do modelo de negócios da empresa, análises de mercado e informações sobre riscos e incertezas que possam afetar o desempenho futuro da empresa.',
   'answers': [
               {'text':'voltar a "Quais as regulamentações de um IPO?"', 
                'next':'quais-regulamentos-de-um-ipo'},
     
              {'text':'voltar ao menu anterior', 
                'next':'investir'},
     
               {'text':'voltar ao menu principal',
                'next': 'mainMenuDialogue'}
              ]
  },
   {'id': 'empresas-devem-cumprir-leis',
   'question':'Durante o processo de IPO, as empresas devem cumprir todas as leis e regulamentações aplicáveis, incluindo a Lei Sarbanes-Oxley nos Estados Unidos. Essa lei foi criada em 2002 após escândalos financeiros em empresas como a Enron e a WorldCom e estabelece requisitos mais rigorosos para divulgação de informações financeiras e responsabilidade dos executivos da empresa.',
   'answers': [
               {'text':'voltar a "Quais as regulamentações de um IPO?"', 
                'next':'quais-regulamentos-de-um-ipo'},
     
              {'text':'voltar ao menu anterior', 
                'next':'investir'},
     
               {'text':'voltar ao menu principal',
                'next': 'mainMenuDialogue'}
              ]
  }
  
]

