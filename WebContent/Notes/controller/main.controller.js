sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast"
], function (Controller, MessageToast) {
   "use strict";
   return Controller.extend("UI5Notes.controller.main", {
      onShowHello : function () {
         MessageToast.show("Hello World");
      }
   });
});