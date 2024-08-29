"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _utils = _interopRequireDefault(require("./utils.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  ReceiveSharingIntent
} = _reactNative.NativeModules;
class ReceiveSharingIntentModule {
  isIos = _reactNative.Platform.OS === 'ios';
  utils = new _utils.default();
  isClear = false;
  getReceivedFiles(handler, errorHandler, protocol = 'ShareMedia') {
    if (this.isIos) {
      _reactNative.Linking.getInitialURL().then(res => {
        if (res && res.startsWith(`${protocol}://dataUrl`) && !this.isClear) {
          this.getFileNames(handler, errorHandler, res);
        }
      }).catch(() => {});
      _reactNative.Linking.addEventListener('url', res => {
        const url = res ? res.url : '';
        if (url.startsWith(`${protocol}://dataUrl`) && !this.isClear) {
          this.getFileNames(handler, errorHandler, res.url);
        }
      });
    } else {
      _reactNative.AppState.addEventListener('change', status => {
        if (status === 'active' && !this.isClear) {
          this.getFileNames(handler, errorHandler, '');
        }
      });
      if (!this.isClear) this.getFileNames(handler, errorHandler, '');
    }
  }
  clearReceivedFiles() {
    this.isClear = true;
  }
  getFileNames(handler, errorHandler, url) {
    if (this.isIos) {
      ReceiveSharingIntent.getFileNames(url).then(data => {
        let files = this.utils.sortData(data);
        handler(files);
      }).catch(e => errorHandler(e));
    } else {
      ReceiveSharingIntent.getFileNames().then(fileObject => {
        let files = Object.keys(fileObject).map(k => fileObject[k]);
        handler(files);
      }).catch(e => errorHandler(e));
    }
  }
  getCheckboxStates(handler, errorHandler) {
    if (this.isIos) {
      _reactNative.AppState.addEventListener('change', status => {
        if (status === 'active' && !this.isClear) {
          ReceiveSharingIntent.getCheckboxStates().then(checkboxStates => {
            handler(checkboxStates);
          }).catch(e => errorHandler(e));
        }
      });
    }
  }
  clearcheckBox() {
    if (this.isIos) {
      ReceiveSharingIntent.clearCheckboxStates();
    }
  }
}
var _default = exports.default = ReceiveSharingIntentModule;
//# sourceMappingURL=ReceiveSharingIntent.js.map