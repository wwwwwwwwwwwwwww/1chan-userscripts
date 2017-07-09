// ==UserScript==
// @name        1chan-testing
// @namespace   1chan
// @match       https://1chan.ca/*
// @match       https://*.1chan.ca/*
// @include     https://1chan.ca/*
// @include     https://*.1chan.ca/*
// @icon        http://web.archive.org/web/20170302140107/https://1chan.ca/favicon.ico
// @author      bitbucket.org/wwwwwwwwwww/
// @version     1
// @grant       none
// ==/UserScript==

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
    jQuery('<button/>')
        .attr({ 'id': btn, 'title': title })
        .html(txt)
        .click(function(){ return jQuery('#comment_form_text').text(say) })
        .appendTo(place);
}
function razmetka(string,razmetka){
    /* Добавить к стринге разметку */
    switch (razmetka) {
        case 'big':
            return string + "\n***";
        case 'big2':
            return "==" + string + "==";
        case 'bold':
            return "**" + string + "**";
        case 'bold2':
            return "<b>" + string + "</b>";
        default:
            return string;
    }
}
/* ==/UTILS== */

var say = {
    forces    : function(){ return copypaste.forces();         }
}

/* ==BUTTONS== */
function init(){
    var testPanel = jQuery('<div/>').attr({
        'id':'testPanel',
        'title':'test'
    }).appendTo(jQuery(".b-post-statistics"));
    addButton('#testPanel', 'buttonForces', say.forces,    img['jilby'],     'Добавлять форсы вниманиеблядей');
};
/* ==/BUTTONS== */

/* ==ДАННЫЕ СТРАНИЦЫ== */
var thread = {
    NUMBER  : function(){
        return jQuery('.js-post-id-link').attr('href').match(/(\/news\/res\/)(\d+)/)[2];
    },
    'last' : {
        number : function(){
            var x = jQuery(".b-comment_b-info a[name]").length>0?jQuery(".b-comment_b-info a[name]").last().text():thread.NUMBER();
            return x;
        },
        replyTo : function(){
            return '>>' + thread['last'].number() + "\n";
        }
    }
}
/* ==/ДАННЫЕ СТРАНИЦЫ== */

var testing = {
    'forces' : function() {
        var forces = {
            'force1':[
                'Город Таруса не знал пиздюлей!\nНо постучался лохматый дедуля –\nХодит и ржёт на тележке своей,\nХули ж нам хули, хули ж нам хули.',
                'Нет, ты точно пердак. Иначе какого хуя бот целится уже не в первый раз целится именно в мои посты?',
                'Не в первый раз какой-то ебанат хочет зафорсить мою опечатку.',
                'Какой мощный **БАТРУДИНОВ**, однако.',
                'Пятнадцать плюсов и я\nЗавайпаю этот анонимный новостной форум своей новой машиной.',
                'вайп\nУ меня есть програма которая обходит вашу вонючую копчу, животные.',
                'Привет, пидорнуши\n\nПокупайте на "Беруши В Уши":http://berushivushi.ru/',
                'ПИДОРНУХИ!! ВЫ ЖЕ ТАК И НЕ РАСШИФРОВАЛИ ПОСЛАНИЕ!! >>283117',
                '<b>Гoлyбoй единoрoг трaxaет рyкoпaшный ceкc :3\n[:1RPTSur:]</b>',
                '==<b>ВНИМАНИЕ! ВНИМАНИЕ!</b>==\n<br/>\n<br/>\n\n***\n"[:cJvboNN:]":https://i.imgur.com/cJvboNN.gif\n\n***\n==<b>!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</b>==',
                '<b>ЦЫП-ЦЫП-ЦЫП</b>"[:Vd2BZVx:]":https://i.imgur.com/Vd2BZVx.jpg',
                '"С":https://wiki.1chan.ca/Участник:Admin "т":https://wiki.1chan.ca/Участник:Postman "у":https://wiki.1chan.ca/Участник:Bagorn "л":https://wiki.1chan.ca/Участник:MTKB "ь":http://steamcommunity.com/id/kirimechan "ч":http://steamcommunity.com/id/yandere1337-kawaii "м":http://steamcommunity.com/profiles/76561198079142343 "о":http://steamcommunity.com/profiles/76561198376406190, перестань так мощно проецировать!',
                '==<b>ПОМНИТЕ, У ДРИСТОЧМА ЕСТЬ ТЕКСТОВИЧОК СО ВСЕМИ ВАШИМИ АЙПИ!! >>404869</b>==',
                'Ну и хулі ві тут чітаете?',
                'Годно, разрешаю форсить.',
                'Соколовский, ПНХ!',
                'Сайн байна уу!',
                'д е б\nе\nб',
                'Друзья...',
                'Ребята...',
                'Сестра...',
                'Эри...',
                'ору',
                'Я хочу тебя ебать.',
                'хочу ебаться с женщиной',
                'Хочу трахнуть минусдевочьку.',
                'Мне хочется полезть тебе в жопу.',
                'Хочу засунуть голый член в скользкую вагину.',
                'Когда-нибудь мы с тобой займемся сексом, и ты будешь в юбочке и девочковых трусиках.',
                '<b>НЕМЕДЛЕННО ЗАЙМИСЬ СО МНОЙ АНАЛЬНЫМ СЕКСОМ В ПАССИВНОЙ РОЛИ, КЕМ БЫ ТЫ НИ БЫЛ, МРАЗЬ!!!!!</b>',
                '==<b>НАЗОВИ ХОТЬ ОДНУ ПРИЧИНУ ПОЧЕМУ ТЫ НЕ ДОЛЖЕН УПАСТЬ НА КОЛЕНИ И ЛИЗАТЬ ЭТУ ПИЗДУ</b>==\n> > > > > > [:aotqtgA:]'
            ],
            'force2':[
                'Ко мне уже бабка Чапа в дверь скребе и чуди...',
                'Вы уже пофорсили <b>ПОЛОВИЧОК</b>?',
                '<b>СМОТРИ В ШОКОЛАДНЫЕ ГЛАЗА!!!</b>',
                '<b>ЗАПРЕЩЕНО ДУШИТЬ ПЕТУХА!)))</b>',
                '<b>ДРОЧИ НА СТАРЫХ ЖИДОВ!)))</b>',
                '<b>СОСИ У ЛЫСОЙ БАБЫ))))))</b>',
                '<b>ТАНЦУЙ В ЖОПЕ СЛОНА!)))</b>',
                '==<b>БАБКА ЧАПА)))))))</b>==',
                '<b>ОТПУСТИ ХУЙ!!!))))</b>',
                'Кто такой <b>САЙДАК</b>?',
                '<b>БАНАНЫ В ПИЖАМАХ</b>',
                '<b>ЧАЙ С БЕГОВНОТОМ</b>',
                '<b>КАК ПО ЕБЛУ УДОД</b>',
                '<b>ЛЕДИ-ХУЕЛЕДИ</b>',
                '<b>ЛЯРВ ОУ ЛЯРВ</b>',
                '<b>ПОЛОВИЧОК</b>',
                '<b>ПЕШТИДОР</b>',
                '<b>ТОРТ-ДЕДОВИК</b>',
                '<b>ДЕБ-ОРОВИК</b>',
                '[:oNPVhSz:] <b>ТОРТ-ДИЛДОВИК</b>',
                '<b>УЛЬЯНОВСКИЙ ПЕЛЬМЕННЫЙ ЗАВОД</b>',
                '<b>САША\nТЫ ПОСУДУ ПОМЫЛА???</b>',
                '<b>БЛЯХА-МУХА ГОЛОВА ДВА УХА</b>',
                '<b>КАЛОПАТРИОТИЧЕСКИЙ РОТ</b>',
                '<b>ЛЕМОНИТЬ ПЕСТРООНКЕНА</b>',
                '<b>ПОЛИМОНЬ ПИСТРУНКИНА</b>',
                '<b>ВАЛЬЦЕВАТЬ КАКАШЕВИЧ</b>',
                '<b>НУ И ЗАЧЕМ ТЫ ВСАСАЛ</b>',
                '<b>ДЕРЕВО-ЧЕПУШИЛЬНИК</b>',
                '<b>КАКЕВО-КАКАШИЛЬНИК</b>',
                '<b>ФЕКАЛЬНЫЙ КАНДИДАТ</b>',
                '<b>ПОНОСНАЯ МЕНСТРУХА</b>',
                '<b>ЗАДРОЧИЛ НА РОТЕШ</b>',
                '<b>ШМАТОК ПРИНЦЕССЫ</b>',
                '<b>ЭКРАННАЯ ЗАЛУПА</b>',
                '<b>ЖОПНЫЙ МАНИФЕСТ</b>',
                '<b>МРАЗОТНАЯ ШИШКА</b>',
                '<b>МРАЗОТНАЯ КИШКА</b>',
                '<b>КАЛОВЫЙ ПОПКОРН</b>',
                '<b>КЛИТОРНЫЕ ГУБЫ</b>',
                '<b>СРУЩАЯ СЕЛЕДКА</b>',
                '<b>КУСАЙ ПИЗДУ)))</b>',
                '<b>САНТЕХНОПРИНЦ</b>',
                '<b>БАЗОВОЕ ГОВНО</b>',
                '<b>ПОЧЕШИ ЗАЛУПУ</b>',
                '<b>ГОМООПУЩЕННЫЙ</b>',
                '<b>СЕКРЕТ ПИЗДЫ</b>',
                '<b>КАЛОПИЛОРАСА</b>',
                '<b>ХУЙ-ВРОТОВИК</b>',
                '<b>МАМИН ПАРИНЬ</b>',
                '<b>СТУЛЬЩЕКОТКА</b>',
                '<b>ПРОДАВЛЕННЫЙ</b>',
                '<b>ПОДПЁРДНУТЫЙ</b>',
                '<b>СРУЩИЙ ЛОПУХ</b>',
                '<b>ЭСТЕБАН СОСА</b>',
                '<b>КЛЯТИ ГОРОХ!</b>',
                '<b>ПЕРДОЗАРАНТ</b>',
                '<b>МУДАФОРСЕЛЬ</b>',
                '<b>ГОВНОВАХТЁР</b>',
                '==<b>opy.deb</b>==',
                '<b>ДВОЕПИЗДИЕ</b>',
                '<b>ШУМНЫЙ КАЛ</b>',
                '<b>ХУЙ ПРОТРИ</b>',
                '<b>ЖОСКИЙ КАЛ</b>',
                '<b>ПИЖОРНУХИ</b>',
                '<b>ПАШАРЕВОД</b>',
                '<b>ЧЛЕНИКСОН</b>',
                '<b>НОВАЙ МЕП</b>',
                '<b>ЯЙЦЕШЛЮХ</b>',
                '<b>ЩЕКУНЧИК</b>',
                '<b>ЩЕКОДЁР</b>',
                '<b>ВСРАЛСЯ</b>',
                '<b>МИНИМЕМ</b>',
                '<b>БЫМТРО</b>',
                '<b>АМЕТИЛ</b>',
                '<b>НЕ АМЕТИЛ</b>'
            ],
            tortDedovik:function() {
                var tort = [
                    'торт',       'кот',         'дед',         'хуй',
                    'внук',       'бабка',       'дядя',        'кал',
                    'мем',        'деб',
                    'гриб'
                ];
                var dedovik = [
                    'дедовик',    'хохловик',    'воротник',    'щлюховик',
                    'каловик',    'вротевик',    'бибовик',     'каловик',
                    'пердовоз',   'тортовик',    'копровик',    'дождевик',
                    'змеевик',    'сторожевик',  'биржевик',    'слизевик',
                    'грязевик',   'гребневик',   'огневик',     'броневик',
                    'гречневик',  'боевик',      'строевик',    'гиревик',
                    'большевик',  'меньшевик',   'пищевик',     'борщевик',
                    'хрящевик',   'чаевик',      'рублевик',    'дробовик',
                    'дубовик',    'правовик',    'брызговик',   'луговик',
                    'медовик',    'передовик',   'рейдовик',    'стендовик',
                    'годовик',    'городовик',   'прудовик',    'трудовик',
                    'базовик',    'газовик',     'грузовик',    'грязовик',
                    'шлаковик',   'поисковик',   'звуковик',    'еловик',
                    'половик',    'тепловик',    'горловик',    'тыловик',
                    'домовик',    'ломовик',     'штурмовик',   'шумовик',
                    'плановик',   'зерновик',    'черновик',    'сосновик',
                    'паровик',    'кадровик',    'жировик',     'боровик',
                    'споровик',   'буровик',     'лесовик',     'носовик',
                    'фронтовик',  'оптовик',     'портовик',    'крестовик',
                    'шестовик',   'чистовик',    'текстовик',   'хвостовик',
                    'мостовик',   'шрифтовик',   'почтовик',    'маховик',
                    'страховик',  'моховик',     'гороховик',   'духовик',
                    'пуховик',    'дебовик',     'оровик'
                ];
                var forsovik = $R(tort) + '-' + $R(dedovik);
                if ($R([0,1]))
                    forsovik = forsovik.toUpperCase();
                if ($R([0,1])){
                    if ($R([0,1]))
                        forsovik = razmetka(forsovik,'bold');
                    else
                        forsovik = razmetka(forsovik,'bold2');
                }
                if ($R([0,1])){
                    if ($R([0,1]))
                        forsovik = razmetka(forsovik,'big');
                    else
                        forsovik = razmetka(forsovik,'big2');
                }
                return forsovik;
            },
            'picture':{
                'pizda' : [
                    '[:aotqtgA:]','[:PwLVLkv:]','[:v5ilqXG:]','[:TVmXwVT:]',
                    '[:zmeOImZ:]','[:ucK3y2k:]','[:PH6m7ah:]','[:qm5tJIV:]',
                    '[:vlwqFUs:]','[:pHYKw1F:]','[:ZC8K4z0:]','[:0HyPYeK:]',
                    '[:oxA45TE:]','[:0Y99XMq:]','[:kzeFCFV:]','[:0fG9Svi:]',
                    '[:Jyn3g9P:]','[:SzjwWd2:]'
                ],
                'P73R':[
                    '[:PU0IsId:] СТРАШНО, ПИДОРНУХА?',
                    '[:XABbL7G:]',
                    '[:Lyr8VqN:]',
                    '[:LhghcEM:]'
                ],
                'tampun':[
                    '[:sQcglrD:] Обнимай',
                    '[:peSyT0Z:] Привет! Обними меня, не бойся (:',
                    '[:Cw0cJ6H:]',
                    '[:DpOHEHY:]',
                    '[:9rAU1F6:]',
                    /* kowo4ka */
                    '[:qAREtwu:]',
                    '[:kwrx8hS:] Кто не обнимет, тот пидор',
                    '[:KzJhaZg:] Обнимай',
                    '[:N13eK0S:]',
                    '[:dzOI1kX:]'
                ],
                'minus-anime':[
                    '[:YcE8689:]',
                    '[:VmGu3m4:]',
                    '[:ccVlycI:]',
                    '[:ulFzl6q:]',
                    '[:vOgL3Nr:]',
                    '[:PuQIbJQ:]',
                    '[:PmyrQdA:]',
                    '[:FsT5VCp:]',
                    '[:ZVEQ83Y:]',
                    '[:QNmuUmd:]',
                    '[:saPohl4:]',
                    '[:rCTznbu:]',
                    '[:R5kYuXc:]',
                    '[:4RrIAhx:]',
                    '[:p86xGPb:]',
                    '[:3TioOrE:]',
                    '[:xbtNCIY:]', /* no gif */
                    '[:T7Negf5:]', /* no gif */
                    '[:SSHfxuJ:]', /* no gif */
                    '[:R6e07DM:]'
                ],
                'china':[
                    '[:dSygSc4:]','[:2SaxDT8:]','[:K67JkjC:]','[:TtKYJMZ:]',
                    '[:ceJGIcT:]','[:YYePmLb:]','[:toctRGr:]','[:TsjvlgF:]',
                    '[:w5pi2kh:]','[:4eBrb3r:]','[:73DquS9:]','[:ByYkxX2:]',
                    '[:zDYqtye:]','[:wG04D7I:]','[:6pJlMza:]','[:moUSBOf:]',
                    '[:1KZYotn:]','[:Phz6Mku:]','[:Gch7kVg:]','[:g74vUDi:]',
                    '[:1aId3eN:]','[:UEvYQgh:]','[:9uP18Vj:]','[:5CZNZB6:]',
                    '[:Csca2hr:]','[:3zC1X70:]','[:29VIyyU:]','[:1DzUahD:]',
                    '[:XuEThnh:]','[:r6GGo9h:]','[:7p6KlK5:]','[:cJQF4rw:]',
                    '[:xee7Td1:]','[:U7Zc9oX:]','[:vfR3PaP:]','[:yTNcriA:]',
                    '[:m3h6Y1S:]','[:bU27BZo:]','[:UIXfRD3:]','[:1atvKLK:]',
                    '[:Hw64Q7q:]','[:6mnuouP:]','[:qTTGRK8:]','[:ooDEZm2:]',
                    '[:yQqT1Zh:]','[:j8QXaGI:]','[:3GPE4TU:]','[:vT6LFwP:]',
                    '[:dX2ip36:]','[:ltcOctQ:]','[:ary8WNu:]','[:xDZB7P9:]',
                    '[:1Up0lE1:]',
                    '[:WWXcpvD:]'
                ],
                'miku':[
                    '[:AGnR6WJ:]',
                    '[:HtGPW95:]',
                    '[:r4O7qNm:]',
                    '[:g623rfH:]',
                    '[:fJMrHDh:]'
                ],
                'zadrot':[
                    '[:o9uelnQ:]',
                    '[:NItJVq0:]',
                    '[:Z5EztZp:]',
                    '[:DH2U5Lm:]',
                    '[:98pZEjJ:]'
                ],
                'jlby':[
                    '[:f5LMee1:]',
                    '[:FWRsrjH:]'
                ],
                'sinoba':[ /* ??? aykudera ili kirbutu ??? */
                    '[:QCZgQex:]',
                    '[:bVX98eo:]',
                    '[:oaypRKM:]',
                    '[:DPJB75t:]',
                    '[:oD4gkOr:]'
                ],
                'uzbek':[
                    '[:huoAQiW:]',
                    '[:Vqxzwp8:] Өзбек элинин тарыхы Борбор Азиянын башка түрк элдеринин тарыхы менен тыгыз байланыш жана азыркы Өзбекстандын чегинен ары чыгат. Өзбекстандын аймагында эң алгачкы мамлекеттердин пайда болушу биздин заманга чейинки VIII-VII кылымдарга тийиштүү. Ал кезде Хорезм жана Бактрия сыяктуу мамлекеттер түзүлгөн. Заманбап Өзбекстандын аймагындагы байыркы шаарлар болуп Ташкен, Бухара, Самаркан, Хива, Шахрисабз, Карши, Термез жана Маргилан эсептелет. ᚕ ᚖ ᚠ ᚡ ᚢ ᚣ ᚤ ᚥ ᚦ ᚧ ᚨ ᚩ ᚪ ᚫ ᚬ ᚭ ᚮ ᚯ ᚰ ᚱ ᚲ ᚳ ᚴ ᚵ ᚶ ᚷ!!'
                ],
                'anime':[
                    '[:0lgpSRy:]',   /* rikka */
                    '[:9rK3eLG:]',   /* sinyaa */
                    '[:cJvboNN:]',   /* sinyaa */
                    '[:cRSK7LE:]',   /* parta */
                    '[:BmA4cNp:]',   /* chupa */
                    '[:3jFKZU4:]',   /* ice */
                    '[:R3dPQHK:]',   /* mitiru */
                    '[:JiOdE0x:]',   /* ulitka */
                    '[:LfGwg99:]',   /* chaika */
                    '[:zfwH4OA:]'    /* flanya */
                ],
                'srunka':[
                    '[:6tgbBrg:]',
                    '[:X58Nwdn:]',
                    '[:UEMhauZ:]',
                    '[:LOIGDCo:]'
                ],
                'random':[
                    '[:aTS4zSo:]',   /* spin */
                    '[:JzgJgTJ:]',   /* sosa */
                    '[:8cWYSUB:]',   /* nya */
                    '[:KR0vwpH:]',   /* zhopa */
                    '[:51nBPUL:]',   /* gonkgrow */
                    '[:sa29Tt7:]',   /* cat */
                    '[:rdJs6ZI:]',   /* logger */
                    '[:rIhLQvJ:]'    /* popka */
                ]
            }
        }
        var theme = [
            $R(forces['force1']),
            $R(forces['force2']),
            forces.tortDedovik()
        ];
        return $R(theme);
    }
}

/* ==IMAGES== */
/* картинки 32x32 */
/* https://www.base64-image.de/ */
var img = {
    'karlan' :'<img src="data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAABkAAAAgCAMAAADQQiM0AAADAFBMVEUPAwkAAAAMAgMTBAMTBAkVCQQUCQkaBQQaBQkbCgQcCgofBhAaAxgcDxIbEAQcEA0iBQMiBgoj\
CgQjCwsrBwYpDAQqDAohCxMrDhIjEgsqEAQrEwwsGA0iEhAsFBIuGhQ1BwgxDgUyDAk6DwY9Dw8yDRMyEgU0EwswGQs7Ew05GAc6Gw00FBI1HBA1GRg5EhM8FRs7GhI7\
Gxk+IhQ9IhtDEwVCEw5CGwNEGwxIFQxMGgRMHAtEFhFBHBJMHBNJHBpUGQpXHBNAHCBDJA5EKQxMJAxOKwtEIhNEIxtKIxNNKhxWJgpTKQ1YIQldKQ5TIhVTJBtSKxRU\
LBpbIxJdJRpcKxRbKxxQMRtcMxpGJyBALiZKLSFPODJUJCRWLCVXKy1cKyBQMixSOilfNyBWPDFbOTNjGw1mGxZyHxFmKA1mJxZjMhxiOB5uNBVtMRx7LA50Kxh4NBpo\
KiNlMiNlNipkOiJlOi1qNCRqNS9pOiVsPC1jPTRtPzV1KiF3NiR2PjhYRTtYSjdnRjdkSj1vQDJuQDl7QSJ2QzleR0ZiR0RqUUp1WEB/VUd/UE57XU50WVaIKhqGNxuT\
PR6EKSKGOSaAPDCXLSaUPSeUPDGgPyuaRR2DRCmETCeLQiWMQiuPSyuFSDGMSjKOUDSXRSmYSjWfVy+bUjOnQR+kSCulSTOlUSypVTe2Sy20Szm5VSm2Vzi6ZTqJXVGS\
TEWbV0GAY1eAYVyNYVqXYkucdVyDcWyJcnSUfneiT0SoWUG0W0SpY0yrYlOic1O6ZUW6cEiofG7FWzrSXTzGZDvUZTvKXUPSWUHGaEjMaVHKckrJc1PVaUfVblDYdEjY\
d1XBf2HlblbkeErmd1X0fVmfhW+thHCri3/bgVnnhE3ohFnxgUz1iVrsgGHskGX3imT7lGf9mnP8onWei4m2mZOuoI+1qJq7p5W8pJvEmJDBpp/Dr53OpJTWpY3Lva/F\
vbvTtqz8tpDitqXOwL3RxcPRycDexsHdyMDfzMzd1c7j1c0AAAAAAABqU+AhAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAH\
dElNRQffARcRIiKwJIxPAAACW0lEQVQoz53TXWjTUBQH8JmsHzfg0Bub4QpFh1jqqkMUqW6V1YnKmBbXsieHiGLp1UluxQ/EZW8OwY9VI30YG0hKoS1bRPBBZAUrtXWx\
LQm0iuuoJj74KCgKwsClHd2GguB5PL+3//mfpqb/nzPUegNopZjNFxfX7L8YAEESZAugmF3296vgHCAJM0GYKUjbrR2HV+A52byOIAijkWq12/v6+nobAoymJTAAp2v3\
oYGTA3usO27U4RQkDZAkYbtv8EL/lSO9jjaL80NNaGgEwLSRcV9/fPWse6etzUZbXTr8ACaK7gSMa/DaK9TvoJkWCwAWXV6QgLB6uzu3Ih8WUIgGlBlApy7HzFboDmEu\
yCFfCPPe7dDMQLsuR0mrswtPcRw/wSGWjfXYaWhx6NIBNzh6uGRMeIqwEBES6ScHTjj267J3E4B+Dvt5XkimFUW45eUTwS5d7hMmeAlHk2GWjcQlMcyiYeQfq6VMGiyX\
8SQf8BzHvCQEPS48OnRHl9tEswmHhz133Y9YJBe6h2xen78WwU+LmcHz85KYii+UK5oiRgRZrue2b8u2cGFB1apaVS5qr8uaVi3V5fTBdpz9qH7WtFIx932mqFbLyvIV\
kCcsKmVVfSfKRTWXmcu9mV6WezdjYkaSi6XqtFTKVWZYFjVuN5lPJeNKWZke51nxgZRNNoTLK7IizmbfhgPnx+WKJDbkWaqgfKqqavlhYK4oZxJTKyWJzmbzsiRJaSEe\
5/Ho6sa9FKJJAYcQQkH0dW1Jf03wPB4ZWSL8Z4O5tFKQouhv5f4WRWOL//6B37rR41EnZGiiAAAAAElFTkSuQmCC"/>',
    'jilby'  :'<img src="data:image/png;base64,\
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"/>'
}
/* ==/IMAGES== */

init();
