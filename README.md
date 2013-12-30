track-ip
==============

For track my raspbarry DHCP IP

*************INSTALL*************

1. CONFIG WEB SERVER. Create DB tables. see track-server\dump.sql

2. CONFIG WEB SERVER. track-server\config.php:
<?php
return array(
    'db' => array(
        'host' => '',
        'user' => '',
        'pass' => '',
        'db' => '',
    ),
    'devices' => array(
        'testTrack' => array(
            'password' => 'qwerty123456'
        ),
    ),
);


3. CONFIG CLIENT node.js\config.js:
module.exports = {
    deviceName : 'testTrack',
    password : 'qwerty123456',
    trackServer : {
        host: 'mysite.com',
        port: 80,
        path: '/'
    }
}

4. ADD NEW CRON JOB
* * * * * /opt/node/bin/node /etc/track-ip/node.js/track.js


result in browser:
Your IP: 194.**.**.**
id	ip	deviceName	timestamp	addresses
2	194.**.**.**	testTrack	2013-12-30 23:57:01	["10.10.100.102"]
3	194.**.**.**	testTrack	2013-12-30 23:58:02	["10.10.100.102"]
4	194.**.**.**	testTrack	2013-12-30 23:59:01	["10.10.100.102"]
5	194.**.**.**	testTrack	2013-12-31 00:00:01	["10.10.100.102"]
