"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var showScanQrPopup = function (params, callback) {
    window.Telegram.WebApp.showScanQrPopup(params, callback);
};
var closeScanQrPopup = function () {
    window.Telegram.WebApp.closeScanQrPopup();
};
/**
 * The hook provided showScanQrPopup function of the type {@link ShowScanQrPopupFunction} and closeScanQrPopup {@link CloseScanQrPopupFunction}.
 * @group Hooks
 */
var useScanQrPopup = function () { return [showScanQrPopup, closeScanQrPopup]; };
exports.default = useScanQrPopup;
