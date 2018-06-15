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
    router.resources('staff', '/staff', controller.staff);
    router.resources('role', '/role', controller.role);
    router.resources('supplier', '/supplier', controller.supplier);
    router.get('/exportFile',controller.importExport.exportFile);
    router.post('/uploadFile', controller.importExport.uploadFile);
    router.post('/importFile',controller.importExport.importFile);
    router.get('/generatePDF',controller.importExport.generatePDF);
    router.get('/printPDF',controller.importExport.printPDF);

};
