track-ip
==============

For track my raspberry DHCP IP

## INSTALL

- Create DB tables. See track-server\dump.sql

- Confis PHP. See track-server\config.php:
```php
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
```


- CONFIG CLIENT node.js\config.js:
```js
module.exports = {
    deviceName : 'testTrack',
    password : 'qwerty123456',
    trackServer : {
        host: 'mysite.com',
        port: 80,
        path: '/'
    }
}
```

- ADD NEW CRON JOB
```
* * * * * /opt/node/bin/node /etc/track-ip/node.js/track.js
```

## Yuhhu... Result in browser:

Your IP: 194.**.**.**

| ip           | deviceName  | timestamp          | addresses |
| ------------ | -----       | -----------------  | -----    |
| 194.**.**.** | testTrack   | 2013-12-30 23:57:01 | ["10.10.100.102"] |
| 194.**.**.** | testTrack   | 2013-12-30 23:58:02 |["10.10.100.102"] |
| 194.**.**.** | testTrack   | 2013-12-30 23:59:01 |["10.10.100.102"] |
| 194.**.**.** | testTrack   | 2013-12-31 00:00:01 |["10.10.100.102"] |
