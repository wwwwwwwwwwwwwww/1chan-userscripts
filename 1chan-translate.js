// ==UserScript==
// @name        1chan-translator
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

/*'use strict';*/
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
function addButton(place, btn, say, txt, title){
    /* добавить кнопку */
    jQuery('<button/>')
        .attr({ 'id': btn, 'title': title })
        .html(txt)
        .click(function(){ return jQuery('#comment_form_text').text(say) })
        .appendTo(place);
}
/* ==/UTILS== */

var say = {
    rus2ukr : function(){
        return replacer.rus2ukr();
    },
    rus2eng : function(){
        return replacer.rus2eng();
    }
}

/* ==BUTTONS== */
function init(){
    var translatePanel = jQuery('<div/>').attr({
        'id':'translatePanel',
        'title':'Переводчики',
        'style':'background-color:lightgreen;'
    }).appendTo(jQuery(".b-post-statistics"));
    addButton('#translatePanel', 'btnToHoh', say.rus2ukr, img['jovtoblakit'], 'Хiхiл');
    addButton('#translatePanel', 'btnToEng', say.rus2eng, img['englishflag'], 'Engrish');
};
/* ==/BUTTONS== */

var replacer = {
    rus2ukr : function() {
        return threadVariables['last']['comment'].clear()
        /* спрашивалки */
        .replace(/как/gi,'як')
        .replace(/так[а-я]{2}/gi,'таке')
        .replace(/что/gi,'що')
        .replace(/кто/gi,'хто')
        .replace(/(почему|зачем|отчего|нахуя)/gi,'чому')
        .replace(/откуда/gi,'звідки')
        .replace(/оттуда/gi,'звідти')
        .replace(/настолько/gi,'настільки')
        .replace(/когда/gi,'коли')
        /* частые слова */
        .replace(/сегодня/gi,'сьогодні')
        .replace(/иногда/gi,'іноді')
        .replace(/всегда/gi,'завжди')
        .replace(/сейчас/gi,'зараз')

        .replace(/это/gi,'ето')
        .replace(/ещё/gi,'ещо')
        .replace(/только/gi,'тiлькi')
        .replace(/(прет|привет|приветик|здравствуй|здравствуйте)/gi,'здоровэньки були')
        .replace(/(наверно|наверное|может быть|быть может)/gi,'мабуть')
        .replace(/много/gi,'баґато')
        .replace(/спасибо/gi,'дякую')
        .replace(/очень/gi,'дуже')
        .replace(/даже/gi,'навіть')
        .replace(/привык/gi,'звик')
        .replace(/время/gi,'час')
        .replace(/обычно/gi,'зазвичай')
        .replace(/прекрати/gi,'припини')
        .replace(/([^а-я])с([^а-я])/gi,'$1з$2 ')
        .replace(/\bс/gi,'з')
        .replace(/([^а-я])но([^а-я])/gi,'$1але$2 ')
        .replace(/([^а-я])или([^а-я])/gi,'$1або$2 ')
        .replace(/([^а-я])ведь([^а-я])/gi,'$1адже$2 ')
        .replace(/([^а-я])ору([^а-я])/gi,'$1кричу$2 ')
        .replace(/^ору([^а-я])/gi,'кричу$2 ')
        /* прилагательные */
        .replace(/проклят/gi,'клят')
        .replace(/друг[а-я]{2,3}/gi,'інш')
        .replace(/полн/gi,'повн')
        .replace(/красив/gi,'гарн')
        /* приставки */
        .replace(/([^а-я])у/gi,'$1ву')
        .replace(/([^а-я])он/gi,'$1вiн')
        .replace(/([^а-я])от/gi,'$1вiд')
        .replace(/([^а-я])под/gi,'$1пiд')
        .replace(/([^а-я])с([^аяоёуюыиэе])/gi,'$1з$2')
        /* отдельные буквы */
        .replace(/о([а-я])/gi,'i$1')
        .replace(/ё/gi,'їо')
        .replace(/э/gi,'е')
        .replace(/е/gi,'є')
        .replace(/ы/gi,'и')
        .replace(/и/gi,'і')
        .replace(/сч/gi,'щ')
    },
    rus2eng : function() {
        return threadVariables['last']['comment'].clear()
        /* спрашивалки */
        .replace(/(^|[^а-яa-z])как($|[^а-яa-z])/gi,'$1how$2')
        .replace(/(^|[^а-яa-z])кто($|[^а-яa-z])/gi,'$1who$2')
        .replace(/(^|[^а-яa-z])котор([а-я]){0,}($|[^а-яa-z])/gi,'$1who$2')
        .replace(/(^|[^а-яa-z])(ч|ш|щ)(т){0,}(а|о|ё|е|оу)($|[^а-яa-z])/gi,'$1what$5')
        .replace(/(^|[^а-яa-z])где($|[^а-яa-z])/gi,'$1where$2')
        .replace(/(^|[^а-яa-z])(почему|зачем|отчего|нахуя)($|[^а-яa-z])/gi,'$1why$3')
        .replace(/(^|[^а-яa-z])сколько($|[^а-яa-z])/gi,'$1how many$2')
        .replace(/(^|[^а-яa-z])как($|[^а-яa-z])/gi,'$1how$2')
        .replace(/(^|[^а-яa-z])кто\-(то|либо|нибудь|нить)($|[^а-яa-z])/gi,'$1anybody$2')
        .replace(/(^|[^а-яa-z])(ч|ш|щ)(т){0,}(а|о|ё|е|оу)\-(то|либо|нибудь|нить)($|[^а-яa-z])/gi,'$1anything$6')
        .replace(/(^|[^а-яa-z])где\-(то|либо|нибудь|нить)($|[^а-яa-z])/gi,'$1anywhere$2')

        /* местоимения */
        .replace(/(^|[^а-яa-z])я($|[^а-яa-z])/gi,'$1I am$2')
        .replace(/(^|[^а-яa-z])(ты|вы)($|[^а-яa-z])/gi,'$1you are$3')
        .replace(/(^|[^а-яa-z])(тво|ваш)([а-я]){0,3}($|[^а-яa-z])/gi,'$1your$4')
        .replace(/(^|[^а-яa-z])(мо)(й|ё|ём|е|ем|ему|и|я|ю|их|его|ей|ими|им)($|[^а-яa-z])/gi,'$1my$4')
        .replace(/(^|[^а-яa-z])(мне|меня|мной|мною)($|[^а-яa-z])/gi,'$1me$3')
        .replace(/(^|[^а-яa-z])(сам)(а|у|ой|ою|им|ими){0,}($|[^а-яa-z])/gi,'$1self$4')
        .replace(/(^|[^а-яa-z])с(е|о)б(е|я|ой|ою)($|[^а-яa-z])/gi,'$1self$4')
        .replace(/(^|[^а-яa-z])мы($|[^а-яa-z])/gi,'$1we are$2')
        .replace(/(^|[^а-яa-z])он($|[^а-яa-z])/gi,'$1he is$2')
        .replace(/(^|[^а-яa-z])его($|[^а-яa-z])/gi,'$1his$2')
        .replace(/(^|[^а-яa-z])её($|[^а-яa-z])/gi,'$1her$2')
        .replace(/(^|[^а-яa-z])она($|[^а-яa-z])/gi,'$1she is$2')
        .replace(/(^|[^а-яa-z])они($|[^а-яa-z])/gi,'$1they are$2')
        .replace(/(^|[^а-яa-z])(оно|это)($|[^а-яa-z])/gi,'$1it is$3')
        .replace(/(^|[^а-яa-z])(тут|тута|здесь|здеся)($|[^а-яa-z])/gi,'$1here$3')

        /* предлоги и союзы */
        .replace(/(^|[^а-яa-z])у($|[^а-яa-z])/gi,'$1at$2')
        .replace(/(^|[^а-яa-z])и($|[^а-яa-z])/gi,'$1and$2')
        .replace(/(^|[^а-яa-z])с($|[^а-яa-z])/gi,'$1with$2')

        .replace(/(^|[^а-яa-z])из($|[^а-яa-z])/gi,'$1from$2')
        .replace(/(^|[^а-яa-z])на($|[^а-яa-z])/gi,'$1on$2')
        .replace(/(^|[^а-яa-z])но($|[^а-яa-z])/gi,'$1but$2')
        .replace(/(^|[^а-яa-z])по($|[^а-яa-z])/gi,'$1by$2')
        .replace(/(^|[^а-яa-z])за($|[^а-яa-z])/gi,'$1at$2')
        .replace(/(^|[^а-яa-z])от($|[^а-яa-z])/gi,'$1of$2')
        .replace(/(^|[^а-яa-z])же($|[^а-яa-z])/gi,'$1then$2')

        .replace(/(^|[^а-яa-z])или($|[^а-яa-z])/gi,'$1or$2')
        .replace(/(^|[^а-яa-z])при($|[^а-яa-z])/gi,'$1at$2')
        .replace(/(^|[^а-яa-z])под($|[^а-яa-z])/gi,'$1below$2')
        .replace(/(^|[^а-яa-z])без($|[^а-яa-z])/gi,'$1without$2')
        .replace(/(^|[^а-яa-z])для($|[^а-яa-z])/gi,'$1for$2')

        .replace(/(^|[^а-яa-z])около($|[^а-яa-z])/gi,'$1about$2')

        .replace(/(^|[^а-яa-z])(над|сверх)($|[^а-яa-z])/gi,'$1over$3')
        .replace(/(^|[^а-яa-z])ещ(ё|е)($|[^а-яa-z])/gi,'$1yet$3')
        .replace(/(^|[^а-яa-z])(в|во)($|[^а-яa-z])/gi,'$1in$3')
        .replace(/(^|[^а-яa-z])(к|ко|до)($|[^а-яa-z])/gi,'$1to$3')
        .replace(/(^|[^а-яa-z])вс(е|ё)(х|м){0,}($|[^а-яa-z])/gi,'$1all$4')
        /* да и нет */
        .replace(/(^|[^а-яa-z])да($|[^а-яa-z])/gi,'$1yes$2')
        .replace(/(^|[^а-яa-z])нет($|[^а-яa-z])/gi,'$1no$2')
        .replace(/(^|[^а-яa-z])не($|[^а-яa-z])/gi,'$1not$2')
        /* неизменяемые слова */
        .replace(/(^|[^а-яa-z])(сейчас|теперь|и вот)($|[^а-яa-z])/gi,'$1now$3')

        /* окончания */
        .replace(/([а-я])([а-я])л(а|о|и){0,}с(я|ь)($|[^а-яa-z])/gi,'$1ed$5')
        .replace(/([а-я])ци(я|ю|е|ей|ею|ями|ям|и)($|[^а-яa-z])/gi,'$1tion$3')
        .replace(/([а-я])ци(я|ю|е|ей|ею|ями|ям|и)($|[^а-яa-z])/gi,'$1tion$3')
        .replace(/([а-я])(ы|и)($|[^а-яa-z])/gi,'$1s$3')

        /* частые слова */
        .replace(/(^|[^а-яa-z])скок($|[^а-яa-z])/gi,'$1jump$2')
        .replace(/(^|[^а-яa-z])только($|[^а-яa-z])/gi,'$1only$2')
        .replace(/(^|[^а-яa-z])рот($|[^а-яa-z])/gi,'$1mouth$2')
        .replace(/(^|[^а-яa-z])хуй($|[^а-яa-z])/gi,'$1dick$2')
        .replace(/(^|[^а-яa-z])хуй($|[^а-яa-z])/gi,'$1dick$2')
        .replace(/(^|[^а-яa-z])хуй($|[^а-яa-z])/gi,'$1dick$2')
        .replace(/(^|[^а-яa-z])хуй($|[^а-яa-z])/gi,'$1dick$2')

        .replace(/(^|[^а-яa-z])ху(я|е|ём|ем|ю|ев)/gi,'$1dick')
        .replace(/(^|[^а-яa-z])ху(и|ёв|ями|ях|ям)/gi,'$1dicks')
        .replace(/чмо(х|ш)(а|у|ой|ника|ник|ей|ею|и|ами|ам)/gi,'faggy')
        .replace(/чм([а-я]){0,2}/gi,'fag')

        /* глаголы */
        .replace(/(^|[^а-яa-z])иди($|[^а-яa-z])/gi,'$1go$2')
        .replace(/(^|[^а-яa-z])шел($|[^а-яa-z])/gi,'$1went$2')
        .replace(/(^|[^а-яa-z])соси($|[^а-яa-z])/gi,'$1suck$2')

        /* приставки */
        .replace(/(^|[^а-яa-z])вы([а-я])/gi,'$1off$2')
        .replace(/(^|[^а-яa-z])про([а-я])/gi,'$1pro$2')
        .replace(/(^|[^а-яa-z])пере([а-я])/gi,'$1over$2')
        .replace(/(^|[^а-яa-z])ко([а-я])/gi,'$1co$2')

        /* согласные в слогах */
        .replace(/([аяуюоёэеы])к/gi,'$1ck')

        /* гласные в закрытых слогах */
        .replace(/([бпвфлрмнгкхдтзсжшщчцй])а([бпвфлрмнгкхдтзсжшщчцй])/gi,'$1a$2')
        .replace(/([бпвфлрмнгкхдтзсжшщчцй])о([бпвфлрмнгкхдтзсжшщчцй])/gi,'$1o$2')
        .replace(/([бпвфлрмнгкхдтзсжшщчцй])е([бпвфлрмнгкхдтзсжшщчцй])/gi,'$1e$2')
        .replace(/([бпвфлрмнгкхдтзсжшщчцй])э([бпвфлрмнгкхдтзсжшщчцй])/gi,'$1a$2')
        .replace(/([бпвфлрмнгкхдтзсжшщчцй])и([бпвфлрмнгкхдтзсжшщчцй])/gi,'$1i$2')
        .replace(/([бпвфлрмнгкхдтзсжшщчцй])у([бпвфлрмнгкхдтзсжшщчцй])/gi,'$1oo$2')

        /* сочетания букв */
        .replace(/кс/gi,'x')
        .replace(/кв/gi,'qu')
        .replace(/гв/gi,'gu')
        .replace(/дж/gi,'j')
        .replace(/ью/gi,'ew')

        /* буквы */
        /*
        replace(/а/gi,'u').replace(/я/gi,'ya')
        replace(/э/gi,'a').replace(/е/gi,'e')
        replace(/о/gi,'o').replace(/ё/gi,'yo')
        replace(/у/gi,'ou').replace(/ю/gi,'you')
        replace(/и/gi,'i').replace(/ы/gi,'ee')
        */
        .replace(/а/gi,'a').replace(/я/gi,'ya')
        .replace(/э/gi,'e').replace(/е/gi,'e')
        .replace(/о/gi,'o').replace(/ё/gi,'yo')
        .replace(/у/gi,'u').replace(/ю/gi,'you')
        .replace(/и/gi,'i').replace(/ы/gi,'ee')

        .replace(/б/gi,'b').replace(/в/gi,'v')
        .replace(/п/gi,'p').replace(/ф/gi,'f')

        .replace(/л/gi,'l').replace(/р/gi,'r')
        .replace(/м/gi,'m').replace(/н/gi,'n')

        .replace(/г/gi,'g').replace(/к/gi,'k').replace(/х/gi,'h')

        .replace(/д/gi,'d').replace(/т/gi,'t')
        .replace(/з/gi,'z').replace(/с/gi,'s')
        .replace(/ж/gi,'j').replace(/(ш|щ)/gi,'sh')
        .replace(/ч/gi,'ch')
        .replace(/ц/gi,'c')
        .replace(/й/gi,'y')
        .replace(/(ь|ъ)/gi,'')
    }
}

/* ==ДАННЫЕ== */
/* ==ДАННЫЕ СТРАНИЦЫ== */

var threadConstants = {
    URL     : function(){
        return jQuery('.js-post-id-link').attr('href');
    },
    NUMBER  : function(){
        return jQuery('.js-post-id-link').attr('href').match(/(\/news\/res\/)(\d+)/)[2];
    },
    ADDLINK : function(){
        return threadConstants.URL() +"add_comment/";
    }
}
var threadVariables = {
    readings : function(){ /* сколько читают */
        return jQuery("#post_stats_reading").text();
    },
    writings : function(){ /* сколько отвечают */
        return jQuery("#post_stats_writing").text();
    },
    chitayut : function(){
        return ">Читают: " + threadVariables.readings();
    },
    comments : function(){ /* Массив комментариев */
        return jQuery(".b-comment_b-info a[name]");
    },
    'last' : {
        number : function(){ /* Номер последнего поста вообще (ОП-пост или коммент) */
            return (threadVariables.comments().length>0?threadVariables['last']['comment'].number():threadConstants.NUM);
        },
        replyTo : function(){ /* линк на последний пост */
            return '>>' + threadVariables['last'].number() + "\n";
        },
        'comment' : {
            number : function(){ /* last-comment's number */
                return threadVariables.comments().last().text();
            },
            id : function(){ /* last-comment's ID */
                return 'comment_' + threadVariables['last']['comment'].number();
            },
            txt : function(){ /* last-comment's text */
                return jQuery('#'+threadVariables['last']['comment'].id()+' > .b-comment_b-body').text();
            },
            htm : function(){ /* last-comment's HTML */
                return jQuery('#'+threadVariables['last']['comment'].id()+' > .b-comment_b-body').html();
            },
            delTags : function(){
                return threadVariables['last']['comment'].htm()
                    /* markup */
                    .replace(/<(\/)*(strong|h1|i|b|em|code|q)>/g,'')
                    /* reflinks */
                    .replace(/<a href="[^"]{1,}" class="js-cross-link" name="[^"]{1,}">&gt;&gt;[0-9]{1,}<\/a>/g,'')
                    /* greentext */
                    .replace(/<blockquote>\s{0,}<p>[^<]{0,}<\/p>\s{0,}<\/blockquote>/g,'')
                    /* images */
                    .replace(/<a target="_blank" class="b-image-link" href="[^"]{1,}"><img src="[^"]{1,}" alt=""><\/a>/g,'')
                    .replace(/<img[^>]>/,'')
                    /* <smile/> to :smile: */
                    .replace(/<img src="http:\/\/1chan\.ca\/img\/([a-z0-9]{1,})\.[a-z]{1,}" alt="" [^"]{1,}">/g,' :$1: ')
                    /* <spoiler> to %%spoiler%% */
                    .replace(/<span class="b-spoiler-text">([^<]{1,})<\/span>/g,' %%$1%% ')
                    /* other */
                    .replace(/<a[^>]+?>|<\/a>|<(\/)*(br|div)>|<(\/){0,}p>/g,'');
            },
            clear : function(){
                return threadVariables['last']['comment'].delTags()
                    /* newline, nbsp and doublespace to space */
                    .replace(/\n|\s{2,}|&nbsp;/g,' ')
                    /* delete tabs, start-space and end-space */
                    .replace(/\u0009|^\s{1,}|\s{1,}$/g,'')
                    /*  */
                    .replace(/&amp;/g,'&');
            },
            firstSentence : function(){
                return threadVariables['last']['comment'].clear().match(/(((:){0,}[а-яА-Яa-zA-Z][а-яА-Яa-zA-Z ])((т.п.|т.д.|пр.)|[^?!.\(]|\([^\)]*\))*([.?!$]|$))/)[0];
            }
        }
    },
    lc : function(){  /* Сокращение */
        return threadVariables['last']['comment'].clear();
    }
}
/* ==/ДАННЫЕ СТРАНИЦЫ== */

/* ==IMAGES== */
var img = {
    'jovtoblakit':'<img src="data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUAQMAAACgZR+HAAAABlBMVEU6dcT53RayzM22AAAAEklEQVQI12NgIBn8////D0kEAOHoJ7uJYmEzAAAAAElFTkSuQmCC"/>',
    'englishflag':'<img src="data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAMAAADImI+JAAAAjVBMVEUAJH0OMIQPMYUQMoVYcKpieK9iea99j71+kL1/kb6Akr6erM6frM6frc6grc+suNTAyd/PFCva\
TF7bTV/bTl/bUGHbUWLcVGTcVWXgZXTmucPnipbni5bnjJfnusToj5nowMnpwMnw1tzzwsjzw8nzxsv0x8z14eb32Nz32d357vH57/H79fb8+Pn///8pdguvAAAA4ElE\
QVR42sXTyRKCMBBF0WZQAUENDogTggMo+v7/8yRpSRm0LHfe9VkknQ7FB+AaWtTmQjTBpTZrsJqJxZmWQtHI/gxtTzGAglxTEzLbMauHRI6iR3kA24DM5ifJHCKSdJ+I\
KVMNX1jEzKSjHsOe32Uu1x8XWbqugDvDcpNuL8Bt0n8CQjeGb5H4sT/Cny+jxzO5AZdtuikZ3oFqnWbFWI9H5UQ1cJqL2c5vBz66AsepSPYBD9xk3usThh3qDDXrLAXT\
WCxzSSU7L5i9r1nU0IOixGzFzIAmJcUG375CqOgDi8Q+w2/CRkgAAAAASUVORK5CYII="/>'
}
/* ==/IMAGES== */
/* ==/ДАННЫЕ== */

init();
