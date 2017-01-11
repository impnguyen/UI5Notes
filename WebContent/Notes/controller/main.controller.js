//Core.loadLibraries('signature_pad', 'resources/signature_pad');
jQuery.sap.registerModulePath('signature_pad', 'resources/signature_pad');
jQuery.sap.require("signature_pad");

sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function (Controller, MessageToast) {
  "use strict";

  return Controller.extend("UI5Notes.Notes.controller.main", {


    onInit: function () {
      MessageToast.show("Hello World");
    },

    onAfterRendering: function () {
      this.activate();
    },



    //activate signature pad
    activate: function () {
      var canvas = document.querySelector("#signature-pad");

      try {
        this.signaturePad = new SignaturePad(canvas);
        this.signaturePad.minWidth = 1;
        this.signaturePad.maxWidth = 5;
        this.signaturePad.penColor = "rgb(0, 0, 0)";

        //this.resizeCanvas();
      } catch (e) {
        console.log(e);
      }
    },

    //resize canvas
    resizeCanvas: function resizeCanvas() {
      var canvas = document.querySelector("#signature-pad");

      if (canvas) {
        var ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
      }
    },




    /**
     * onPressRedColor: press red color
     */
    onPressColor: function (oEvent) {
      switch (oEvent.mParameters.id) {
        case oEvent.oSource.oParent.oParent.oParent.sId + "--red":
          this.signaturePad.penColor = "rgb(255, 0, 0)";
          break;
        case oEvent.oSource.oParent.oParent.oParent.sId + "--blue":
          this.signaturePad.penColor = "rgb(0, 0, 204)";
          break;
        case oEvent.oSource.oParent.oParent.oParent.sId + "--green":
          this.signaturePad.penColor = "rgb(0, 204, 0)";
          break;
        case oEvent.oSource.oParent.oParent.oParent.sId + "--yellow":
          this.signaturePad.penColor = "rgb(255, 255, 0)";
          break;
        case oEvent.oSource.oParent.oParent.oParent.sId + "--black":
          this.signaturePad.penColor = "rgb(0, 0, 0)";
          break;
        case oEvent.oSource.oParent.oParent.oParent.sId + "--white":
          this.signaturePad.penColor = "rgb(255, 255, 255)";
          break;
        case oEvent.oSource.oParent.oParent.oParent.sId + "--custom":
          //this.signaturePad.penColor = "rgb(255, 0, 0)";
          break;
        default:
          this.signaturePad.penColor = "rgb(0, 0, 0)";
          break;
      }

    },

    /**
     * onDelete: delete actual notes
     */
    onDelete: function (oEvent) {
      this.signaturePad.clear();
    },

    /**
     * onExport: export image as png
     */
    onExport: function (oEvent) {
      // Returns signature image as data URL (see https://mdn.io/todataurl for the list of possible paramters)
      this.signaturePad.toDataURL(); // save image as PNG
      this.signaturePad.toDataURL("image/png"); // save image as JPEG
    }

  });
});