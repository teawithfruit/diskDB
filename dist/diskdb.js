/*
 * diskDB
 * http://arvindr21.github.io/diskDB
 *
 * Copyright (c) 2014 Arvind Ravulavaru
 * Licensed under the MIT license.
 */

'use strict';

// global modules

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _chalk = require('chalk');

var _util = require('./util');

var _collection = require('./collection');

var _collection2 = _interopRequireDefault(_collection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debug = require('debug')('diskdb');

//local modules

var DiskDB = function () {
  function DiskDB() {
    _classCallCheck(this, DiskDB);
  }

  _createClass(DiskDB, [{
    key: 'connect',
    value: function connect(path, collections) {
      if ((0, _util.isValidPath)(path)) {
        this._db = { path: path };
        debug('Successfully connected to : ' + path);
        if (collections) {
          this.loadCollections(collections);
        }
      } else {
        throw (0, _chalk.red)('The DB Path [' + path + '] does not seem to be valid. Recheck the path and try again');
      }
      return this;
    }
  }, {
    key: 'loadCollections',
    value: function loadCollections(collections) {
      var _this = this;

      if (!this._db) {
        throw (0, _chalk.red)('Initialize the DB before you add collections. Use : ', 'db.connect(\'path-to-db\');');
      }
      if (Array.isArray(collections)) {
        collections.forEach(function (collection) {
          if (!collection.includes('.json')) {
            collection = collection + '.json';
          }
          var collectionFile = (0, _path.join)(_this._db.path, collection);
          if (!(0, _util.isValidPath)(collectionFile)) {
            (0, _util.writeToFile)(collectionFile);
          }
          var collectionName = collection.replace('.json', '');
          _this[collectionName] = new _collection2.default(_this, collectionName);
        });
      } else {
        throw (0, _chalk.red)('Invalid Collections Array.', 'Expected Format : ', '[\'collection1\',\'collection2\',\'collection3\']');
      }
      return this;
    }
  }]);

  return DiskDB;
}();

exports.default = DiskDB;