<?php
    $api_link = "http://127.0.0.1:3000";

    $shop_data = json_decode(file_get_contents("$api_link/api/shops"));

    for ($i = 0; $i < 6; $i++) {
        $shop_data[$i]->availability = json_decode($shop_data[$i]->availability);
    }

    include_once 'public/home.php';