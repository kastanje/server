'use strict';

/**
 * module dependencies
 */
var http = require( 'http' );
var https = require( 'https' );

/**
 * returns a simple http/https server
 *
 * @link https://nodejs.org/dist/latest-v6.x/docs/api/http.html
 * @link https://nodejs.org/dist/latest-v6.x/docs/api/https.html
 *
 * @param {Object} [user_options]
 * @param {string} [user_options.content_type]
 * @param {boolean} [user_options.debug]
 * @param {string} [user_options.directory_index]
 * @param {string} [user_options.document_root]
 * @param {Object} [user_options.ssl]
 * @param {number} [user_options.status_code]
 *
 * @returns {net.Server|tls.Server}
 */
function createServer( user_options ) {
  var options = user_options || {};

  /**
   * @type {net.Server|tls.Server}
   */
  var Server;

  if ( options.ssl ) {
    Server = https.createServer( options.ssl );
  } else {
    Server = http.createServer();
  }

  /**
   * @type {boolean}
   */
  Server.debug = options.debug === true;

  /**
   * @type {string}
   */
  Server.directory_index = options.directory_index || 'index.html';

  /**
   * @type {string}
   */
  Server.document_root = options.document_root || 'public';

  /**
   * @type {string}
   */
  Server.content_type = options.content_type || 'application/json; utf-8';

  /**
   * @type {number}
   */
  Server.status_code = options.status_code || 200;

  /**
   * @type {
   *   {
   *     CONNECT: {},
   *     DELETE: {},
   *     GET: {},
   *     HEAD: {},
   *     OPTIONS: {},
   *     PATCH: {},
   *     POST: {},
   *     PUT: {},
   *     TRACE: {}
   *   }
   * }
   */
  Server.request_handlers = {
    'CONNECT': {},
    'DELETE': {},
    'GET': {},
    'HEAD': {},
    'OPTIONS': {},
    'PATCH': {},
    'POST': {},
    'PUT': {},
    'TRACE': {}
  };

  return Server;
}

module.exports = createServer;
