'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.post('/login', controller.home.login);
    router.post('/logout', controller.home.logout);
    router.get('/currentUser', controller.home.currentUser);

    router.resources('customer', '/customer', controller.customer);
    router.post('/upload', controller.importExport.uploadFile);
    router.post('/import',controller.importExport.importFile);
    router.get('/export',controller.importExport.exportFile);
};
