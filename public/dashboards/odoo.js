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
  var obj_data = { access_token: ARGS.access_token };
  $.each(ARGS, function (key, value) {
    if (key.startsWith('var-')) {
      vars += '&' + key + '=' + value;
      obj_data[key] = value;
    }
  });
  $.ajax({
    method: 'POST',
    url: 'https://' + ARGS.endpoint + '/grafana/dashboards/' + ARGS.res_model + '/' + ARGS.res_id,
    data: obj_data,
  }).done(function (dashboard) {
    callback(dashboard);
  });
};
