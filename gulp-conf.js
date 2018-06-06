const argv = require('yargs').argv;

const isString = function(value) {
    return typeof value === 'string';
};

if (argv.dev) {
    argv.dir = '../';
    argv.dirDist = 'dist-dev';
    argv.dirSrc = 'server';
} else if (argv.prod) {
    argv.dir = '../';
    argv.dirDist = 'dist';
    argv.dirSrc = 'server';
}

module.exports = function() {
    /**
     * Текущая дирректория
     */
    const dir = argv.dir || './';

    /**
     * Дирректория дистрибутива
     */
    let dirDist = isString(argv.dirDist) ? argv.dirDist : 'dist';

    /**
     * Дирректория куда положить ресурсы
     * Внимание! иначе все соберется в дирректорию сборки
     */
    let dirSrc = isString(argv.dirSrc) ? argv.dirSrc : '';

    /**
     * Флаг, отслеживания изменений серверных файлов
     * Имеент сокрщение как "w"
     */
    const watch = !!(argv.watch || argv.w);

    /**
     * Флаг, нужно ли синхронить изменения кода с браузером
     */
    const bsync = !!argv.bsync;

    dirDist = [dir, dirDist].join('');
    dirSrc = [dirDist, dirSrc].join(!!dirSrc ? '/' : '');

    return {
        dir: dir,
        dirDist: dirDist,
        dirSrc: dirSrc,
        watch: watch,
        bsync: bsync
    };
}();
