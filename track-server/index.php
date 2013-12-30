<?php
/*
 * improve
 * http://www.developerdrive.com/2013/05/adding-a-simple-authentication-using-php-require-and-includes/
 *
 */
include "Track.php";
include "lib/table.php";
$track = new Track();

//track new device
if (isset($_POST['deviceName'])) {
    if ($track->trackNewDevice($_POST)){
        die('ok');
    }
    else {
        die("don't ok");
    }
}

$history = $track->db->getRows('SELECT  * FROM `feoktist_track`.`track`');

$cols = array_keys($history[0]);
$track->table->addRow();
foreach($cols as $colName){
    $track->table->addCell($colName, '', 'header');
}

$track->table->addCaption('Your IP: '. $track->getClientIP(), '', array('id'=> 'tblCap') );


foreach($history as $h) {
    list($name, $unit_price, $doz_price ) = $h;
    $track->table->addRow();

    foreach($h as $hh){
        $track->table->addCell($hh);
    }
}

echo $track->table->display();
