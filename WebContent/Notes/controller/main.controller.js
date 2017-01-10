jQuery.sap.registerModulePath('signature_pad', 'resources/signature_pad');
jQuery.sap.require("signature_pad");

sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast"
], function (Controller, MessageToast) {
   "use strict";

   return Controller.extend("UI5Notes.Notes.controller.main", {
      onInit: function(){
        MessageToast.show("Hello World");
      }, 

      onAfterRendering: function(){
        debugger; 
        //new SignaturePad(canvas);
        //hier muss nur noch ein canvas erzeugt werden
      }
    
   });
});