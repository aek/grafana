/* global _ */

/*
 * Complex scripted dashboard
 * This script generates a dashboard object that Grafana can load. It also takes a number of user
 * supplied URL parameters (in the ARGS variable)
 *
 * Global accessible variables
 * window, document, $, jQuery, ARGS, moment
 *
 * Return a dashboard object, or a function
 *
 * For async scripts, return a function, this function must take a single callback function,
 * call this function with the dashboard object
 */

'use strict';

// accessible variables in this scope
var window, document, ARGS, $, jQuery, moment, kbn;

return function (callback) {
  var vars = '';
  $.each(ARGS, function (key, value) {
    if (key.startsWith('var-')) {
      vars += '&' + key + '=' + value;
    }
  });
  $.ajax({
    method: 'GET',
    // https://grafana.soltein.net/dashboard/script/odoo.js?endpoint=demo.soltein.net&res_model=project.project&res_id=74&access_token=7453474b-33b6-4848-8407-1c5610e2533e
    url:
      'https://' +
      ARGS.endpoint +
      '/grafana/dashboards/' +
      ARGS.res_model +
      '/' +
      ARGS.res_id +
      '?access_token=' +
      ARGS.access_token +
      vars,
  }).done(function (dashboard) {
    callback(dashboard);
  });
};
