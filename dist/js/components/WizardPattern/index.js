'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatefulWizardPattern = exports.WizardPattern = undefined;

var _WizardPattern = require('./WizardPattern');

var _WizardPattern2 = _interopRequireDefault(_WizardPattern);

var _StatefulWizardPattern = require('./StatefulWizardPattern');

var _StatefulWizardPattern2 = _interopRequireDefault(_StatefulWizardPattern);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_WizardPattern2.default.Stateful = _StatefulWizardPattern2.default;

exports.WizardPattern = _WizardPattern2.default;
exports.StatefulWizardPattern = _StatefulWizardPattern2.default;