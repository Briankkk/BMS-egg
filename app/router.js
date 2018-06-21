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
    router.put('/authRequest/approve/:id', controller.authRequest.approve);
    router.put('/authRequest/reject/:id', controller.authRequest.reject);
    router.get('/exportFile',controller.importExport.exportFile);
    router.post('/uploadFile', controller.importExport.uploadFile);
    router.post('/importFile',controller.importExport.importFile);
    router.get('/generatePDF',controller.importExport.generatePDF);
    router.get('/printPDF',controller.importExport.printPDF);

    router.resources('cust', '/cust', controller.cust);
    router.resources('handlerLog', '/handlerLog', controller.handlerLog);
    router.resources('customer', '/customer', controller.customer);
    router.resources('staff', '/staff', controller.staff);
    router.resources('authRequest', '/authRequest', controller.authRequest);
    router.resources('role', '/role', controller.role);
    router.resources('supplier', '/supplier', controller.supplier);
    router.resources('mater', '/mater', controller.mater);
    router.resources('materType', '/materType', controller.materType);
};
