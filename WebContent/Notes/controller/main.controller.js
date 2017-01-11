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
      this.initGlobalFunctions();
    },

    onAfterRendering: function () {
      this.activate();
    },



    //activate signature pad
    activate: function () {
      var canvas = document.querySelector("#signature-pad");

      // change non-opaque pixels to white
      // var imgData = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
      // var data = imgData.data;
      // for (var i = 0; i < data.length; i += 4) {
      //   if (data[i + 3] < 255) {
      //     data[i] = 255;
      //     data[i + 1] = 255;
      //     data[i + 2] = 255;
      //     data[i + 3] = 255;
      //   }
      // }
      // canvas.getContext("2d").putImageData(imgData, 0, 0);

      try {
        this.signaturePad = new SignaturePad(canvas);
        this.signaturePad.dotSize = 1;
        this.signaturePad.minWidth = 1;
        this.signaturePad.maxWidth = 3;
        this.signaturePad.penColor = "rgb(0, 0, 0)";
        this.signaturePad.backgroundColor = "rgba(255, 255, 255)";

        //this.resizeCanvas();
      } catch (e) {
        console.log(e);
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
        case oEvent.oSource.oParent.oParent.oParent.sId + "--del":
          this.signaturePad.penColor = "rgb(255, 255, 255)";
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
      this.getView().byId("fileUploader").clear();
    },

    /**
     * onDecreaseDotSize: decrease dot size
     */
    onDecreaseDotSize: function (oEvent) {
      if (this.signaturePad.dotSize === 1) {
        MessageToast.show("reached limit");
      } else {
        this.signaturePad.dotSize = this.signaturePad.dotSize - 1;
        this.signaturePad.maxWidth = this.signaturePad.maxWidth - 1;
        this.signaturePad.minWidth = this.signaturePad.minWidth - 1;
      }
    },

    /**
     * onIncreaseDotSize: increase dot size
     */
    onIncreaseDotSize: function (oEvent) {
      if (this.signaturePad.dotSize === 10) {
        MessageToast.show("reached limit");
      } else {
        this.signaturePad.dotSize = this.signaturePad.dotSize + 1;
        this.signaturePad.maxWidth = this.signaturePad.maxWidth + 1;
        this.signaturePad.minWidth = this.signaturePad.minWidth + 1;
      }
    },

    /**
     * onExport: export image as png
     */
    onExportImage: function (oEvent) {
      //export to url
      var data = this.signaturePad.toDataURL("image/png", 1.0);
      window.open(data);
    },

    /**
     * onUploadImageComplete: import image completed
     */
    onUploadImageComplete: function (oEvent) {
      var oFile = oEvent.oSource.oFileUpload.files[0];
      var sPath = URL.createObjectURL(oFile);
      this.signaturePad.fromDataURL(sPath, 1024, 650);
    },







    /**
     * initGlobalFunctions: init global functions
     */
    initGlobalFunctions: function (oEvent) {
      //color picker
      jQuery('#defaultColorPickerInput').on('input', function () {
        alert("geht");
      });

      //prototype from dataurl
      SignaturePad.prototype.fromDataURL = function (sDataUrl, iWidth, iHeight) {
        var self = this,
          image = new Image(),
          ratio = window.devicePixelRatio || 1,
          width = iWidth,
          height = iHeight;

        this._reset();
        image.src = sDataUrl;
        image.onload = function () {
          self._ctx.drawImage(image, 0, 0, width, height);
        };
        this._isEmpty = false;
      };

    }

  });
});