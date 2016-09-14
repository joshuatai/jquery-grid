<?php

// define data response code
// These definition will be used in linkgraph and geomap
define('AJAX_DATA_STATUS_ERROR', -1);
define('AJAX_DATA_STATUS_NO_DATA', 0);
define('AJAX_DATA_STATUS_NORMAL', 1);
define('AJAX_DATA_STATUS_CANNOT_DISPLAY_ALL', 2);
define('AJAX_DATA_STATUS_INCORRECT_FORMAT', 3);

// define ajax response code, should be same as tmAJAX.js
define('AJAX_STATUS_SUCCESS', 1);
define('AJAX_STATUS_USER_DATA_ERROR ', 0);
define('AJAX_STATUS_INTERNAL_SERVER_ERROR', -1);
define('AJAX_STATUS_NO_SESSION', -2);

// FIXME: not matched to tmAJAX.js
define('AJAX_STATUS_PRARMETER_FAIL', 0);
define('AJAX_STATUS_HTTP_FAIL', -1);
define('AJAX_STATUS_AUTHENTICATION_FAIL', -2);
define('AJAX_STATUS_INTERNAL_FAIL', -3);

