// ==UserScript==
// @name         1chan-replies
// @namespace    1chan
// @version      2
// @description  автоответчики
// @author       bitbucket.org/wwwwwwwwwww/
// @match        https://1chan.ca/*
// @match        https://*.1chan.ca/*
// @include      https://1chan.ca/*
// @include      https://*.1chan.ca/*
// @icon         http://web.archive.org/web/20170302140107/https://1chan.ca/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

/* ==UTILS== */
function $R(array) {
    /* Вытащить случайный элемент из массива */
    var rnd = Math.round( Math.random() * (array.length - 1) );
    return array[rnd];
}
function capitalize(string) {
    /* делать первую букву сообщения большой */
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function addButton(btn, say, txt, title){
    /* добавить кнопку */
    /*
    var buttonImg = jQuery('<img/>').attr({'src':src});
    */
    jQuery('<button/>')
        .attr({ 'id': btn, 'title': title })
        .html(txt)
        .click(function(){ return jQuery('#comment_form_text').text(say) })
        .appendTo('#replyPanel');
}
/* ==/UTILS== */

var say = {
    Hello     : function(){  return thread.chitayut() + reply['readers'];                 },
    Minusonel : function(){  return thread['last'].replyTo() + $R(reply['minusonya']);    },
    Pidornuha : function(){  return thread['last'].replyTo() + reply.pidornuha();         },
    Moooo     : function(){  return thread['last'].replyTo() + $R(reply['moo']);          },
    Homo      : function(){  return thread['last'].replyTo() + $R(reply['homo']);         }
}

/* ==BUTTONS== */
function init(){
    var replyPanel = jQuery('<div/>').attr({'id':'replyPanel','title':'Собеседники','style':'background-color:pink;'}).appendTo(jQuery(".b-post-statistics"));
    addButton('btnHello',     say.Hello,     img['Hello'],     '');
    addButton('btnMinusonel', say.Minusonel, img['Minusonel'], 'Минусонить');
    addButton('btnPidornuha', say.Pidornuha, img['Pelmen'],    'Дрочить пидорнух');
    addButton('btnMoooo',     say.Moooo,     img['Moooo'],     'Мычать'); /* недоработано */
    addButton('btnHomo',      say.Homo,      img['Postman'],   'Приставать к мужчинам'); /* недоработано */
};
/* ==/BUTTONS== */


/* ==ДАННЫЕ== */
/* ==ДАННЫЕ СТРАНИЦЫ== */
var thread = {
    URL     : function(){
        return jQuery('.js-post-id-link').attr('href');
    },
    NUMBER  : function(){
        return jQuery('.js-post-id-link').attr('href').match(/(\/news\/res\/)(\d+)/)[2];
    },
    ADDLINK : function(){
        return thread.URL() +"add_comment/";
    },
    readings : function(){ /* сколько читают */
        return jQuery("#post_stats_reading").text();
    },
    writings : function(){ /* сколько отвечают */
        return jQuery("#post_stats_writing").text();
    },
    chitayut : function(){
        return ">Читают: " + thread.readings();
    },
    comments : function(){ /* Массив комментариев */
        return jQuery(".b-comment_b-info a[name]");
    },
    'last' : {
        number : function(){ /* Номер последнего поста вообще (ОП-пост или коммент) */
            return (thread.comments().length>0?thread['last']['comment'].number():thread.NUM);
        },
        replyTo : function(){ /* линк на последний пост */
            return '>>' + thread['last'].number() + "\n";
        },
        'comment' : {
            number : function(){ /* last-comment's number */
                return thread.comments().last().text();
            },
            id : function(){ /* last-comment's ID */
                return 'comment_' + thread['last']['comment'].number();
            },
            txt : function(){ /* last-comment's text */
                return jQuery('#'+thread['last']['comment'].id()+' > .b-comment_b-body').text();
            },
            htm : function(){ /* last-comment's HTML */
                return jQuery('#'+thread['last']['comment'].id()+' > .b-comment_b-body').html();
            },
            delTags : function(){
                return thread['last']['comment'].htm()
                    /* markup */
                    .replace(/<(\/)*(strong|h1|i|b|em|code|q)>/g,'')
                    /* reflinks */
                    .replace(/<a href="[^"]{1,}" class="js-cross-link" name="[^"]{1,}">&gt;&gt;[0-9]{1,}<\/a>/g,'')
                    /* greentext */
                    .replace(/<blockquote>\s{0,}<p>[^<]{0,}<\/p>\s{0,}<\/blockquote>/g,'')
                    /* images */
                    .replace(/<a target="_blank" class="b-image-link" href="[^"]{1,}"><img src="[^"]{1,}" alt=""><\/a>/g,'')
                    .replace(/<img[^>]>/,'')
                    /* <smile/> --> :smile: */
                    .replace(/<img src="http:\/\/1chan\.ca\/img\/([a-z0-9]{1,})\.[a-z]{1,}" alt="" height="[0-9]{1,}" width="[0-9]{1,}">/g,' :$1: ')
                    /* <spoiler> --> %%spoiler%% */
                    .replace(/<span class="b-spoiler-text">([^<]{1,})<\/span>/g,' %%$1%% ')
                    /* other */
                    .replace(/<a[^>]+?>|<\/a>|<(\/)*(br|div)>|<(\/){0,}p>/g,'');
            },
            clear : function(){
                return thread['last']['comment'].delTags()
                    /* newline, nbsp and doublespace --> space */
                    .replace(/\n|\s{2,}|&nbsp;/g,' ')
                    /* delete tabs, start-space and end-space */
                    .replace(/\u0009|^\s{1,}|\s{1,}$/g,'')
                    /*  */
                    .replace(/&amp;/g,'&');
            },
            firstSentence : function(){
                return thread['last']['comment'].clear().match(/(((:){0,}[а-яА-Яa-zA-Z][а-яА-Яa-zA-Z ])((т.п.|т.д.|пр.)|[^?!.\(]|\([^\)]*\))*([.?!$]|$))/)[0];
            }
        }
    },
    lc : function(){  /* Сокращение */
        return thread['last']['comment'].clear();
    }
}
/* ==/ДАННЫЕ СТРАНИЦЫ== */

/* ==СЛОВАРЬ== */
var reply = {
    'readers' : '\r\nСобрание фанклуба Минусонела объявляется открытым.',
    'notChmo' : 'Не хуечмо, а няшный Минусонел!',
    'minusonya' : [
        'Чат свернул куда-то не туда.\n==<b>МИНУСОНЕЛ МИНУСОНЕЛ МИНУСОНЕЛ МИНУСОНЕЛ МИНУСОНЕЛ МИНУСОНЕЛ МИНУСОНЕЛ МИНУСОНЕЛ МИНУСОНЕЛ МИНУСОНЕЛ МИНУСОНЕЛ МИНУСОНЕЛ МИНУСОНЕЛ МИНУСОНЕЛ МИНУСОНЕЛ МИНУСОНЕЛ МИНУСОНЕЛ МИНУСОНЕЛ МИНУСОНЕЛ МИНУСОНЕЛ МИНУСОНЕЛ МИНУСОНЕЛ МИНУСОНЕЛ МИНУСОНЕЛ МИНУСОНЕЛ МИНУСОНЕЛ МИНУСОНЕЛ МИНУСОНЕЛ МИНУСОНЕЛ<b>==',
        'Вот моя страничка http://vk.com/minusonel',
        '"[:adl5fmF:]":http://vk.com/minusonel',
        '[:Gd0Z8uF:] Доброе утро, Колчан. Я проснулася и покушала, планирую хорошо провести день.',
        '==<b>УСАГА МАТТЕ КУДАСАЙ</b> "[:r8rX3Cq:]":https://i.imgur.com/r8rX3Cq.gif==',
        'Няшный Минусонел!',
        '>**❤МИНУСОНЕЛ❤**',
        'Пшшшшш, велосипедик Минусонела затормозил.',
        'Ттррррр, велосипедная трещотка.',
        'Фау-фау~, обклаксонил тебя.',
        'Миу~ миу~',
        'Хейтер захлебнулся желчью.',
        'Гусеница сбита, движение невозможно.',
        'Радист контужен.',
        'танкавые вайска',
        'Наводчик ранен.',
        'Танк горит.',
        'Усагам не нужны трусы.',
        'Это бэнто такое вкусное, потому что его готовил Mинусонел.',
        'Этот горячий источник раньше был без пузырьков.',
        'Золотая неделя никак не связана с мочой.',
        'Грудь растет, если её массировать.',
        '**MAJOKKO MAJOKKO МIRAKURUN!**',
        'Я никогда не была на Фудзи.',
        'У тебя рисинка на щеке.',
        'Тебе идет юката.',
        'Вакатта.',
        'Дайжобу.',
        'Оясуми.',
        'Ты мог бы стать хорошим другом, но ты твородруг.',
        'Шафтодебил-шафтодебил...',
        'http://molchok.org - возрожденный Гипермолчок.',
        'У нас в молчке за такое банили.',
        'Ты мне ещё за молчок ответишь.',
        'Мммм, помолчал в молчок.',
        '>Я дергаю Миусонела за косички, потому что стесняюсь признаться в любви.',
        'Ты победил, у тебя больше хромосом.',
        'Вы меня утомили, закрываю вкладку.',
        'Из тебя гниль льется рекой.',
        'Очковахтер-очковахтер...',
        'Морда очковахтерская.',
        'Гнилой тут только ты.',
        'Сделаем непрямой поцелуй.',
        'Сначала я разобью арбуз, а потом твою голову.',
        'Наш клуб расформируют, если ты не вступишь.',

        '[:r8rX3Cq:] **УСАГА МАТТЕ КУДАСАЙ**',   /* [:58067089:] - 17 сентября 2014 */
        'Смотри не подавись моти, которым я тебя угостил только что.',
        'Съешь ещё этих вкусных такояк и полови золотых рыбок.',
        'Хватит вандалить мою статью на каловики.',
        'Как мне вас теперь называть, Юи-сэмпай?',
        'Не спи под котацу, а то простудишься.',
        'Поосторожнее с шампунем, перхоть.',
        'Очковахтер, хватит вайпать.',
        'Можешь фанатеть прямо тут.',
        'Привет, фанат Mинусонела.',
        'Здравствуй, друг.',
        'Сдуйся, перхоть.',
        'Скажи свой ник.',
        '**УРУСАЙ УРУСАЙ УРУСАЙ!!!**',
        'Гамбатте кудасай!',
        'Оясуми сасай.',
        'Урусай!',

        'С какой подачи ты опрокинешься, неваляшка?',
        'Дом с привидениями или мейд-кафе?',
        'Хочешь кусочек с клубничкой?',
        'Когда мы поедем в Будокан?',
        'Сколько ударов выдержишь?',
        'Давай устроим мотицуки?',
        'Ты зачем молчок убил?',
        'Куда скачут усаги?',
        'Усагу заказывали?',
        'Усагу не видел?',
        'Ты сама готовишь?',
        'Хромосомы не давят?'
    ],
    'homo' : [
        'Я хочу тебя ебать.',
        'Мне хочется полезть тебе в жопу.',
        'Открывай рот!',
        'Маленькая сучька хочет жесткого траха… ммм… ммм…',
        'Моему рту не помешал бы твой хуй.',
        'Спокойно засунул твой хуй себе в рот.',
        'Нашёл твой хуй у себя во рту.',
        '[:EhL4Mup:]',
        '*Обнял няшу.*',
        'Милашка :3',
        'Твой хуй теперь мой заложник.',
        'Какой же ты хорошенький...',
        'Сладенький ты мой!'
    ],
    'moo' : [
        'Как же вы заебали.',
        'Сраные кретины.',
        'Баттхерт жопы.',
        'НА-ХУЙ-ПО-ШЕЛ!',
        'Давно врачу показывался?',
        '>бредни чмошника\nПонятно.'
    ],
    pidornuha : function() {

        /* Обращение к пидорнухе */
        function pdr(rod, pdj) {

            /* тип склонения, основа слова */
            var pidor = {
                M : [
                    {sklon:'main',base:'аутист'},
                    {sklon:'main',base:'бичуган'},
                    {sklon:'main',base:'даун'},
                    {sklon:'main',base:'дебил'},
                    {sklon:'main',base:'деградант'},
                    {sklon:'main',base:'конфодаун'},
                    {sklon:'main',base:'мочехлёб'},
                    {sklon:'main',base:'пидорнухенсон'},
                    {sklon:'main',base:'пидорнушкенс'},
                    {sklon:'main',base:'конфопидарас'},
                    {sklon:'main',base:'хуеглот'},
                    {sklon:'main',base:'хуесос'},
                    /* слово оканчивается на шипящую согласную */
                    {sklon:'sh',base:'опущ'},
                    {sklon:'sh',base:'поскрёбыш'},
                    /* слово оканчивается на велярную согласную */
                    {sklon:'gkh',base:'пиздюк'},
                    {sklon:'gkh',base:'нищук'},
                    {sklon:'gkh',base:'петух'},
                    {sklon:'gkh',base:'энурезник'},
                    /* слово имеет суффикс "к", перед которым шипящая */
                    {sklon:'shka',base:'дегенератиш'},
                    /* основа оканчивается на мягкую согласную */
                    {sklon:'y',base:'чмондел'},
                    {sklon:'y',base:'чмоньдел'},
                    /* слово имеет окончание "ец" */
                    {sklon:'ets',base:'опущен'},
                    {sklon:'ets',base:'обоссан'}
                ],
                F : [
                    {sklon:'main',base:'гнид'},
                    {sklon:'gkh', base:'пидорнух'},
                    {sklon:'gkh', base:'чмох'},
                    {sklon:'sha', base:'хуйлуш'},
                    /* слово имеет суффикс "к" */
                    {sklon:'shka',base:'пидорнуш'},
                    {sklon:'ka',  base:'опущен'},
                    {sklon:'yka', base:'чмонь'},
                    /* основа оканчивается на мягкую согласную */
                    {sklon:'ya',  base:'ман'}
                ],
                N : [
                    {sklon:'main',base:'быдл'},
                    {sklon:'main',base:'хуйл'},
                    {sklon:'main',base:'чм'},
                    {sklon:'main',base:'хуечм'}
                ]
            }

            var badGuy = [
                {sklon:'main',base:'великовозрастн'},
                {sklon:'main',base:'пидорнут'},
                {sklon:'main',base:'опущенн'},
                {sklon:'main',base:'тупорыл'},
                {sklon:'main',base:'нагрет'},
                {sklon:'main',base:'ебан'},
                {sklon:'sh',  base:'нищ'},
                {sklon:'sh',  base:'проецирующ'}
            ];

            /* https://ru.wiktionary.org/wiki/Категория:Русские_существительные_по_типу_склонения */
            var nounPostfix = {
                main : {
                    edCh : { M : {  Im : '',  Ro : 'а',  Da : 'у'  }, F : {  Im : 'а', Ro : 'ы', Da : 'е'  }, N : {  Im : 'о', Ro : 'а',  Da : 'у'  } },
                    mnCh : { M : {  Im : 'ы', Ro : 'ов', Da : 'ам' }, F : {  Im : 'и', Ro : '',  Da : 'ам' }, N : {  Im : 'ы', Ro : 'ов', Da : 'ам' } }
                },
                sh : {
                    edCh : { M : {  Im : '',  Ro : 'а',  Da : 'у'  }, F : {  Im : 'ь', Ro : 'и',   Da : 'и'  }, N : {  Im : '', Ro : 'а',  Da : 'у'   } },
                    mnCh : { M : {  Im : 'и', Ro : 'ей', Da : 'ам' }, F : {  Im : 'и', Ro : 'ей',  Da : 'ам' }, N : {  Im : 'и', Ro : 'ей', Da : 'ам' } }
                },
                ets : {
                    edCh : { M : {  Im : 'ец', Ro : 'ца',  Da : 'цу'  } },
                    mnCh : { M : {  Im : 'цы', Ro : 'цев', Da : 'цам' } }
                },
                y : {
                    edCh : { M : {  Im : 'ь', Ro : 'я',  Da : 'ю'  } },
                    mnCh : { M : {  Im : 'и', Ro : 'ей', Da : 'ям' } }
                },
                gkh : {
                    edCh : { M : {  Im : '',  Ro : 'а',  Da : 'у'  }, F : {  Im : 'а', Ro : 'и', Da : 'е'  }, N : {  Im : 'о', Ro : 'а',  Da : 'у'  } },
                    mnCh : { M : {  Im : 'и', Ro : 'ов', Da : 'ам' }, F : {  Im : 'и', Ro : '',  Da : 'ам' }, N : {  Im : 'и', Ro : 'ов', Da : 'ам' } }
                },
                shka : {
                    edCh : { M : {  Im : 'ка', Ro : 'ки', Da : 'ке'  }, F : {  Im : 'ка', Ro : 'ки', Da : 'ке'  } },
                    mnCh : { M : {  Im : 'ки', Ro : 'ек', Da : 'кам' }, F : {  Im : 'ки', Ro : 'ек', Da : 'кам' } }
                },
                sha : {
                    edCh : { M : {  Im : 'а', Ro : 'и', Da : 'е'  }, F : {  Im : 'а', Ro : 'и', Da : 'е'  } },
                    mnCh : { M : {  Im : 'и', Ro : '',  Da : 'ам' }, F : {  Im : 'и', Ro : '',  Da : 'ам' } }
                },
                ka : {
                    edCh : { M : {  Im : 'ка', Ro : 'ки', Da : 'ке'  }, F : {  Im : 'ка', Ro : 'ки', Da : 'ке'  } },
                    mnCh : { M : {  Im : 'ки', Ro : 'ок', Da : 'кам' }, F : {  Im : 'ки', Ro : 'ок', Da : 'кам' } }
                },
                yka : {
                    edCh : { M : {  Im : 'ка', Ro : 'ки', Da : 'ке'  }, F : {  Im : 'ка', Ro : 'ки', Da : 'ке'  } },
                    mnCh : { M : {  Im : 'ки', Ro : 'ек', Da : 'кам' }, F : {  Im : 'ки', Ro : 'ек', Da : 'кам' } }
                },
                ya : {
                    edCh : { M : {  Im : 'я', Ro : 'и', Da : 'е'  }, F : {  Im : 'я', Ro : 'и', Da : 'е'  } },
                    mnCh : { M : {  Im : 'я', Ro : 'ь', Da : 'ям' }, F : {  Im : 'и', Ro : 'ь', Da : 'ям' } }
                }
            }

            /* https://ru.wiktionary.org/wiki/Категория:Русские_прилагательные_по_типу_склонения */
            var adjectivePostfix = {
                main : {
                    edCh : {
                        M : {  Im : 'ый', Ro : 'ого', Da : 'ому' },
                        F : {  Im : 'ая', Ro : 'ой',  Da : 'ой'  },
                        N : {  Im : 'ое', Ro : 'ого', Da : 'ому' }
                    },
                    mnCh : {
                        M : {  Im : 'ые', Ro : 'ых',  Da : 'ым' },
                        F : {  Im : 'ые', Ro : 'ых',  Da : 'ым' },
                        N : {  Im : 'ые', Ro : 'ых',  Da : 'ым' }
                    }
                },
                sh : {
                    edCh : {
                        M : {  Im : 'ий', Ro : 'его', Da : 'ему' },
                        F : {  Im : 'ая', Ro : 'ей',  Da : 'ей'  },
                        N : {  Im : 'ее', Ro : 'его', Da : 'ему' }
                    },
                    mnCh : {
                        M : {  Im : 'ие', Ro : 'их', Da : 'им' },
                        F : {  Im : 'ие', Ro : 'их', Da : 'им' },
                        N : {  Im : 'ие', Ro : 'их', Da : 'им' }
                    }
                }
            }

            function adjective(context,chislo,rod,padej){
                var baseword = $R(context);
                var osnova = baseword.base;
                var word = osnova + adjectivePostfix[baseword.sklon][chislo][rod][padej];
                return word;
            }

            function nounPidor(chislo,rod,padej){
                var baseword = $R(pidor[rod]);
                var osnova = baseword.base;
                var word = osnova + nounPostfix[baseword.sklon][chislo][rod][padej];
                return word;
            }

            /* Если род или падеж установлен как 'R', то выбираем рандомное значение */
            if (rod == 'R') { rod = $R([ 'M',  'F',  'N'  ]); };
            if (pdj == 'R') { pdj = $R([ 'Im', 'Ro', 'Da' ]); };

            /* Варианты сочетаний - существительное, сущ+прил, прил+сущ */
            var N  = nounPidor('edCh',rod,pdj);
            var NA = nounPidor('edCh',rod,pdj) + ' ' + adjective(badGuy,'edCh',rod,pdj);
            var AN = adjective(badGuy,'edCh',rod,pdj) + ' ' + nounPidor('edCh',rod,pdj);

            return $R([N, N, NA, AN]);
        };

        var Greeting           = [ 'Приветик', 'Привет', 'Прет', 'Здравствуй', 'Здорово', 'Здорова' ];
        var Why                = [ 'хули', 'зачем', 'почему' ];
        var WhyYou             = [ $R(Why), $R(Why)+' ты', 'ты '+$R(Why) ];
        var Nahui              = [ 'на сосач', 'на свой сосач', 'на мочан', 'на свою мочепарашу', 'под шконку', 'под шконарь', 'в конфу', 'в конфочку', 'в свою конфу' ];
        var NounTarget         = [ 'в рот', 'в ротешник', 'в ебало', 'в ухо', 'в твоё гнилое ебало' ];
        var QuoteKoKoKo        = [ '>ко-ко-ко', '>пок пок пок', '>Бульбульбуль', '>бульк', '>ко-ко-ко, кудах!', '>среньк-среньк' ];

        var VerbalNoun         = [ 'мощная проекция', 'проекции', 'оправдания', 'влажные мечты' ];
        var VerbInfinitive     = [ 'срать', 'гадить', 'бугуртить', 'выёбываться', 'проецировать', 'отмазываться' ];

        var VerbImperativeStop = [ 'хватит', 'прекрати', 'заканчивай', 'завязывай' ];
        var VerbImperative     = [ 'остудись', 'угомонись', 'сосируй', 'заткнись', 'успокойся', 'соси хуй', 'завали ебало', 'пойди подмойся', 'иди матрас суши', 'выключи уже свой проектор', 'пшел вон', 'не проецируй', 'не бугурти', 'не бомби', 'не отмазывайся', $R(VerbImperativeStop)+' '+$R(VerbInfinitive) ];
        var Uhodi              = [ 'пиздуй', 'съеби', 'вернись', 'возвращайся', 'брысь', 'уёбывай' ];

        var VerbPerfectAttackM = [ 'поссал', 'нассал', 'посрал', 'насрал', 'навалил кучу', 'спроецировал струю мочи' ];
        var VerbPerfectPissedM = [ 'обоссался', 'обсикался', 'нагрелся', 'бомбанул', 'спроецировал', 'незаметен' ];
        var VerbPerfectPissedF = [ 'обоссалась', 'обсикалась', 'нагрелась', 'бомбанула', 'спроецировала', 'незаметна' ];
        var VerbPerfectSaidM   = [ 'прокукарекал', 'прокудахтал', 'булькнул', 'попытался отосраться' ];

        var VerbImperfectSaidM = [ 'кукарекает', 'кудахчет', 'булькает', 'пытается отосраться', 'оправдывается', 'отмазывается', 'отсирается' ];

        var UhodiNahui         = [ $R(Uhodi)+' '+$R(Nahui), $R(Nahui)+' '+$R(Uhodi), $R(Uhodi)+' обратно '+$R(Nahui), $R(Uhodi)+' к себе '+$R(Nahui) ];
        var Question = [
            `${$R(WhyYou)} проецируешь свои комплексы и проблемы на других людей`,
            `${$R(WhyYou)} проецируешь`,
            `${$R(WhyYou)} тут срёшь`,
            `${$R(WhyYou)} так нагреваешься`,
            `${$R(WhyYou)} ругаешься`,
            `${$R(WhyYou)} такой мудак`,
            `не надоело ${$R(VerbInfinitive)}`,
            `тебя хоть раз пидоряли откуда-нибудь`,
            `почём проектор покупал`,
            `какой фирмы у тебя проектор`,
            `ты ещё здесь`,
            `попку бо-бо`,
            `припекло`,
            `как дела`,
            `как делишки в городе Пидорнухенсе`,
            `как ты отнесешься к тому, что я тебе нассу ${$R(NounTarget)}`,
            `дохуя сегодня параш выпилил`,
            `почему ты вылез из своей конфы`,
            `ты ведь с мочана пришёл, не так ли`,
            `тебе делать нехуй`,
            `что ты там ${$R(VerbPerfectSaidM)}`
        ];

        /* НАБОР ВАРИАНТОВ ПРЕДЛОЖЕНИЙ */
        var phrasesPidornuha = [

            /* Поприветствовать пидорнуху */
            `${$R(Greeting)}, ${pdr('R', 'Im')}.`,
            `${$R(Greeting)}, ${pdr('R', 'Im')}, ${$R(Question)}?`,

            /* Констатировать факт */
            `${pdr('R', 'Da')} **НЕПРИЯТНО**.`,
            `${$R(VerbalNoun)}.`,
            `${$R(VerbalNoun)} ${pdr('R', 'Ro')}.`,
            `Пидорнуха-пидорнуха...`,
            `Ты ${$R(VerbPerfectPissedM)}.`,
            `Ты ${$R(VerbPerfectPissedF)}, ${pdr('F', 'Im')}.`,
            `Ты ${$R(VerbPerfectPissedM)}, ${pdr('M', 'Im')}.`,
            `${pdr('F', 'Im')} ${$R(VerbPerfectPissedF)}.`,
            `${pdr('M', 'Im')} ${$R(VerbPerfectPissedM)}.`,
            `${pdr('F', 'Im')} ${$R(VerbPerfectPissedF)}, лол.`,
            `${pdr('M', 'Im')} ${$R(VerbPerfectPissedM)}, лол.`,
            `Какой же ты тупой.`,
            `Анус ${pdr('R', 'Ro')} почти выдержал, но там **ТАКОЕ** было написано.`,
            `Этот ${pdr('M', 'Im')} ещё что-то возражает.`,
            `Этот ${pdr('M', 'Im')} ещё что-то чешет тут.`,
            `${pdr('R', 'Im')}.`,

            /* Дать совет пидорнухе */
            `${$R(VerbImperative)}.`,
            `${$R(VerbImperative)}, ${pdr('R', 'Im')}.`,
            `${pdr('R', 'Im')}, ${$R(VerbImperative)}.`,
            `${pdr('R', 'Im')}, ${$R(VerbImperative)}. Поссал ${pdr('F', 'Da')} в её обвафленный ротешник.`,
            `Иди матрас суши, ${pdr('R', 'Im')}. Он прогнил весь уже, от твоей мочи.`,
            `${$R(VerbImperative)}, ${pdr('R', 'Im')}, блядь, ${pdr('R', 'Im')}.`,

            /* Прогнать пидорнуху */
            `Тут не место таким серунам. **Пшел вон!**`,
            `Иди и сри в своей конфе, ${pdr('R', 'Im')}`,
            `${$R(Nahui)}, ${pdr('R', 'Im')}.`,
            `Обоссан, ${$R(Nahui)} послан.`,
            `${$R(UhodiNahui)}, ${pdr('R', 'Im')}.`,
            `${$R(UhodiNahui)}, ${pdr('R', 'Im')}, там тебя приголубят.`,
            `${$R(UhodiNahui)}, тебе здесь не рады.`,
            `${$R(UhodiNahui)} и сри там.`,
            `Ану ${$R(UhodiNahui)}.`,
            `Ану ${$R(UhodiNahui)}, и чтобы духу твоего небыло на нашем свободном ресурсе!`,
            `Не ссы! ${$R(UhodiNahui)}!`,
            `**НСБ.**`,

            /* Обоссать пидорнуху */
            `${$R(VerbPerfectAttackM)} на тебя.`,
            `${$R(VerbPerfectAttackM)} тебе ${$R(NounTarget)}.`,
            `${$R(VerbPerfectAttackM)} тебе ${$R(NounTarget)}, ${pdr('R', 'Im')}.`,
            `${$R(VerbPerfectAttackM)} тебе, ${pdr('R', 'Im')}, ${$R(NounTarget)}.`,
            `Ебать ${pdr('R', 'Im')}, ${$R(VerbPerfectAttackM)} тебе ${$R(NounTarget)}, ${pdr('R', 'Im')}.`,
            `Я твой рот в жопу ебал.`,

            /* Спросить пидорнуху */
            `${$R(Question)}?`,
            `${$R(Question)}, ${pdr('R', 'Im')}?`,
            `${pdr('R', 'Im')}, ${$R(Question)}?`,
            `Объясни мне, ${pdr('R', 'Im')}, ${$R(WhyYou)} такой мудак?`,
            `Почему же ты такой ${pdr('M', 'Im')}, сможешь ответить мне?`,
            `Ну вот скажи мне, ${pdr('R', 'Im')}, ${$R(Question)}?`,
            `А не пора ли тебе съебать ${$R(Nahui)}?`,
            `Так значит, ты ${pdr('R', 'Im')}?`,
            `Ты что ли?`,
            `${$R(Question)}? Хотя, кого я спрашиваю. Действительно, кого? Пидорнуху, вот кого.`,
            `Опять ты себе в штаны нассал? Мамка твоя небось уже заебалась стирать.`,
            `Ой блядь, припёрлось, животное. ${capitalize($R(Question))}?`,
            `Ты ${pdr('R', 'Im')}. Опровергнешь?`,

            /* Цитировать пидорнуху */
            `${$R(QuoteKoKoKo)}`,
            `${$R(QuoteKoKoKo)}\nЯсно.`,
            `${$R(QuoteKoKoKo)}\nПонятно.`,
            `${$R(QuoteKoKoKo)}\nЧто, простите?`,
            `${$R(QuoteKoKoKo)}\n${$R(VerbImperative)}.`,
            `${$R(QuoteKoKoKo)}\nТы сначала мочу проглоти, а потом говори.`,
            `${$R(QuoteKoKoKo)}\nТы сначала мочу допей, а потом уже добавки проси.`,
            `>${pdr('M', 'Im')} ${$R(VerbPerfectSaidM)}`,
            `>${pdr('M', 'Im')} ${$R(VerbImperfectSaidM)}`,
            `>${pdr('R', 'Da')} **неприятно**`
        ];

        var text1 = $R(phrasesPidornuha);
        var text = capitalize(text1);
        return text;
    }
}
/* ==/СЛОВАРЬ== */

/* ==IMAGES== */
/* картинки 32x32 */
/* конвертер https://www.base64-image.de */
var img = {
    'Hello':'<img src="data:image/png;base64,\
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\
TkSuQmCC"/>',
    'Minusonel':'<img src="data:image/png;base64,\
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\
E70z060AAAAASUVORK5CYII="/>',
    'CafuChino':'<img src="data:image/png;base64,\
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\
YII="/>',
    'greenface':'<img src="data:image/png;base64,\
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"/>',
    'Moooo':'<img src="data:image/png;base64,\
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"/>',
    'Postman':'<img src="data:image/gif;base64,\
R0lGODdhIAAgAOf/AAEHCwMKDQUMDgQOFhwBYh4CZDMAXgsTGS8CXiIFZwoVHzEDYGEAAwwXITMFYigJbGMCBT0EZzUHZA8ZI2QDBgsbKTcJZj8HaWcHCRAfLkIKbDAR\
cxMiMGsMDUUOb0APdBQkMg8mNEcQcW0PD24QEBgnNREpNgwrPRYqPUsVdToafU4Xd3QWFBEvQRktQEoZfVAZeRQxRHcaFho0TFQefVIhhXwfHxc6Ulkjgn8iIRo9VIEk\
I1YohEwsiVMqi0gukF8oiBdCX2ApiVoriFstii5HGTBIFYosKl4wjVY0kyBJZmEyjzRMGDFPGxxOcJAyM38+AzZTGGg4ll89nIRCCJc4OTtXHGw8myZVeCFagj9cIIdJ\
DURfHWRIpqREQ0NlIpFRDnpJqGNiAy9kjUdpJWZkAH1MrDFmj5VVG0prIGlnCplYFi1rmElwJHFpApFgALFPTWxqDo1iAJNiAm5sEXBtBpVjBG1wCJNmBTdyoXNwCphm\
CItYunBzDHN1AZZqCntyEFV7KHJ1EJxpDnR2EZpsD1KAK75cXoxhwHh6FoF4GFiDJ49kw6ByCYZnyXx9D3t9Gq1uMZJnx36AHl+LLoOEGIuBIphszMZpaKp6FrN0N1yP\
MYOFI0iJvmCRLJ1w0YiJJ4mKH1CPxYyNK46PLZh72LaFI1aXx5OUMmuiNJ+C37uPLFqcy26lN5maOF2ezsOQL2ehy5+fPaKiQGyl0Hm2Pnapz+6NiqupQHir0dyZYHms\
0vCQk66tS4S/QPaVmPqZnIfETN2sSbi3VY/FTv+dn/+eoZDHWOqrb/2ior69WpjKYsC/W+e1Usa+XOe2Wum3VMTCX5zOZZrObKPPbu28X8fHavC+WqTSeNDIZvG/Y/u7\
fvPBZO7DZM3Mb/++gdfObPrIatTTddPWad3Ucv7Lbv/NcNnZe/3Rcdvecf/Vdd7hdOnffOblhuzkhuvqiu7tjvTsju3wguzwiO/zi/Tyk/vylPj2lvX5kf/3mff7k/78\
nP/+l/z/l//+nv7+pCwAAAAAIAAgAAAI/gBzdCBxhASEgxhG2GBxCFixhxAjSkyGicSOESQ6MIDAgAIFDFVIeHEoseRDXsVuychBIiOFjRA+HmHh5VcykyVvOdxhA0NG\
jgchYHhiA45NnBJRFttRRUaHlzAhdGBR5dBRpBBvFQO2IxIaTWCgiBVLZcsaXdu+qV3Lli2yb8jArHpDt66dN3b2FLpWzpzfv37LQQuHDp05beaEDYJ1t65dO6aqBS7X\
FzA6bc+elauGDlYhU40G5W2Md88zxOYoVwbsN9zmZpkKNZpdSA6eP7cbCdPG+XLh38B/d1PXqJAbRYoAHQdnyVm2eOzs5csXb5+/fOSeu7NnL148d+7i/rkBFCdRHzVx\
6LQbVm/fPev+/NU7JwsSofujoomr115cNDV6xEFIIpOIIQYn1sAjzj3x+bPPOYmoISF6iczy3nv1uDILKGr0QUccnKghxiz+eAOfP++8Uwd6cagxyjCytPPOP8NAIuF5\
hOhBiBiJiDEJPOcE2aAyvbjiCiqjKNOOOPDso4wYhNRh4B2hlGGgGGU8gss4+qwT3zzp9CMmP/LQw48++PiDix+VPEJIGVEYUkQRaRRhhBGe+LJMMMcso6c00wQqqKC+\
BKPFF1o00cQiRWgRCBNNMFGEJ4EWWgs1mGaqKTV6coFoFEwEEqkRUYh66DHUHNNKKpu2Gswm/mSQYUUbTKShBRNG3MoEE1a0guk0vkzTKqfYpPpFGmQw0QoTUdTZhhW7\
7koJqtQA+mswy1CDTRvHTENMG7ZG4YkCCsxQgQIZZKDABBPcIEoutsQb7ytYjPEuCAqcEQQHMVQQQwwAAEBuACUMEHADB7wL78KdsDEDClgAMAAHAVRM8AQBACAABwF3\
3MAAbNiycCy5sHKDEko40cIJFmeMQgYDVDwDABWXQLMCDZyysMixBIGCAjc4UUK/NAOQQQgBCABABRkEnAUKAJjQwAyn0MKKyLbkoUQWHCjggg46cLw0BwSUXUASDxDw\
gAoPFDCF2lM4UkopqnShQhJTJNHDtg8/9JAAARuo4MACBhhgARCFG+AAAit4IIEEMEiCyCeMLOGBBxrU4IMQQ1hggAciSICABAZIQEMEiSPgAA+mX0AEIrBfEgYOElxA\
AxFEaGB4CoVbMHoESBjAu+i0RyBBBFKY8QkiV1yAAAwXpICEBwYgcAUCvle/wBASaEAE6Ss83r0EOPDBiCQXFC7CAh/UsLgECzjAOwLYe4CABik4EEEEHrxgAeQaQIIU\
JDC4BaQAgA5wQEAAADs="/>',
    'Pelmen':'<img src=" data:image/false;base64,\
iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QMZAgsyU9pcZwAAB+JJ\
REFUWMPtl1uMnVUVx3/7u5zbdKbTmakz7ZQy0FJKizatiaLBBKNBI4kJEWIgGnmQ+OAF4wVITPTBRMMDmqC+YYIJMSEGL5FIQEMhiFxCC7UOtEynl6HTzsw5c+Z853yX\
fd8+DDQSRRB9MWElO1nZl6x/Vtb+r/+Cd+3/1U698tQF/+ihR6Jn//zr9LGHfhG92f2Dj97/L/fFOwm+ePJJpi/9CCfn/vJZEUXfJbBDShVXlXarK2c7WXflhhs+f8cz\
9/3kG7vHp3fOWGceu/7G2/Tr7++75w5u+dpd7xzA6eOP3rlh07bbEWwKIcIoiVSKwSBjkGXkeUmvs8LmqSn2vG8fylgEifYeL4v8zLdv/PDeW77zU3fD577ynwNYXf7r\
qaQ+PIOzhNcSboxByop8kFOWJVmvR39tjTzPyboddu25gpnLdpOmdYRIyfvF7N73XnUlQPRWARfmDwJw5sRjn866r6ikvmEmOI01BcFb4jghieskSUqjuYHgA0JE1JtN\
WsMb0ari6KHneebxR+mtLWNMQVpL9754+E9XvyWAhfmDbN/xUdrnX7hrbPOO3xElNWsqlMwoeosIp4mEQEQRCPDektZS0jQhTlO81TSaDZqtFmvdDvPHZ1FViXEVqsxv\
+rcAlk6vB19ePHRPozV2uxARViusqtDlAFWsYqseiJhAICIGPFEkiNMa4CFYgjXIrA1WksYpCIG3ivbywsX/BKDbmb3gx7Vk4vzpg6eaQ2NfhYC1Fd4ZlMwoe+dRRY+Q\
NCEECJ6AX69pAd5IrJaoqo93mpGJSWq1lEY9AQJCCLrnT10HkPwjgLGJvXQ7s8PelIedkzuHRqaJogRnJUZLrMrRRUZ/9STWWC4dncRbi/cB7x3OGrQ2GCNReUYUAo1G\
jbK3xMbxCcY2b6Veb9LPMqoq50IGOktH1it86cgjzlR979XOWm0EEHhncNbgTInRBVXRJY5SRjZfREBgvcN7gzEG5yyqzNeXynHOIISjObKBjeOTjE1MIURE1l7E6eI3\
ANG5hadxhOmVpSOVteW1puoiqBPXmog4wQePtQqrS3TVRwBS5Wy59AME5/EhoLVGSYmUEqMrtCoIziAE1NKIGoZdV+6n1mhRFH2W5w/RWSmGAaKt2z+EN/L3eN3Ie69S\
DTo0Gi2EiAneY9UAK3O0LJBlhjeS8andNIY2Ya3BWYdRinLQp+h1qPIesuxjyhJMSUzMlR+8lpHxKWRVcerQw8y9PIe3fj9AMn/4V3uSKOw35Rom7xJFdawpSdMGLjgC\
ArzDGYPwoHXBjv2fwFqHdw4lJUpWrzFaTK3epF5rEG1KGJ+YZnLbDKMTU2ipmT/yMK8en0NpQRqZEYAkjdKd1hlU2UWICOEMUZTgrcJ7AQS0qfBOY3TG1MX7IErxJmCd\
w2pJCB6jKyLhCUEzOjHF2Pg0I2NjJEmdot/nlRce4uyxl+j2NLU4JXg/AEiq1fa55uYtBKdwWuEDBO8RQRCcQasc7yzeabz3jG29Ah8E3iuMkVitUGUfgsUFxaaxScYn\
L6Jeb6CNZ3lxjoXZg7TPLtJdqYiTGsY4CL4ESC7/2K3PL88/tSjiZLq18T1Ugy6qKEmaYFSGykucs8h+m8lL3k8gwVmN0RVWKayViCimNbyRqe07qNVbGGPJel3Ozj3N\
6sIx8u6AXjvHhRhnLNZ7Iq/bF3hgtd27e+slu3/kiKiP5BjnUXmf2tAozZENICJGt1xGozGEsxprKkxV4J2h3miyYXgTtdYQIiQMBn26i0dYOTNL3l0l7+fkvRJPTCwS\
DBa0weAWLgCoN+NT9aHNSJVDVBBZT5QkRCKiPjxOFNUIwuG8xagKqxUBS2tklChKIGqS9zv02icp2ifI20uU/QFFVlJmBu9jgPVfYzTGW5I4nAVIvnfzBxDeHY3ihCRO\
SdMmZVGSNGKsKqnXm0RxHecchPVOlzSa1JNRgk8oiy7Z8t/orZwg75xD5TnlQFFWGikdGnBhnS+cc3g8wQEiHHmDIFldfOnhdKj1SS0zrM7xzhGnDdK0gYhTorhBEEBI\
cN5R9jsUnXlWz72MLHNUUVH2C3prazjrMQZ8EDjnccagrUMqjTHrdE3Qu2amt88JAFMusfjiE83xmV2Za25KVbUGTpHUhkjSBiKug0jRsiBfW6C3dIxybQlZ5KhSUVUG\
ow1ae3QlMdZCJNClQhmNdw6tLEobtDI4o/O7f/vi8IUaSFtTABVQXzz84H3Jxi3XhXRoHOpoqbGyQ949Q3b+BDLPcFphoxrOCryvEbzFOY+3DucdwjuU0ngPwWi0lGht\
kNpgdMBa8/HXM/+Gbjj/+M/C9IHPfAFg7o8//LH28dfz1VfpnjhMttxj24FrqLQnbg4RrMB58AS893hjCdaCNRglCUZjSk1lzGu9wtBfq5SPxPfvfWL+2belih+YId7x\
g29+aXX++E3PPfTklmj0ota+ay7fsmFyG9oFrLXoqqKqJEbbdXFaVXhlkFJSFJIsKyhV6HcG7v4HD5/+MsDNB7bwy8Pn37kqfuDO658aGq9dlQ8GkTUGWZQYadHaUeaS\
Ulp3vjPwS6vVc6fOlrfNVvLQp3ZP8odjy//dXPDFiwX3ngkA/PzWq9OXj85OpnEs2u2ysTYwQ/08ImlFMjSaJxdXeu5o5R3AnmbES5X/305Gt+1rvunZtw5sfnd0fNv2\
d/g7JL0iHLXAAAAAAElFTkSuQmCC"/>'
}
/* ==/IMAGES== */
/* ==/ДАННЫЕ== */

init();


})();
