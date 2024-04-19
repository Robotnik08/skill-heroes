<?php
    $day_of_the_week = date('w') - 1;
    $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="assets/css/output.css"/>
        <title>FlexBosch</title>
    </head>
    <body>
        <div class="wrapper bg-slate-100 h-screen w-full">
            <header class="w-full h-28 bg-fb-green items-center justify-center grid">
                <object data="assets/svg/logo-flexbosch.svg" type="image/svg+xml" alt="logo" class="logo w-32"></object>
                <h1 class="text-[0px]">Flexbosch</h1> <!-- SEO purposes -->
            </header>
            <main class="mb-auto grid grid-cols-1 gap-10 p-10 lg:grid-cols-2 lg:gap-20 lg:p-20">
                <?php for ($id = 0; $id < 6; $id++) { ?>
                    <div class="shop w-full float-right">
                        <div class="shop-container w-full bg-fb-yellow flex ">
                            <div class="image-wrapper w-[50%] aspect-square">
                                <img src="<?php echo "$api_link/img/{$shop_data[$id]->image_front}"; ?>" class="front-img h-full object-cover">
                            </div>
                            <div class="text-wrapper w-[50%] aspect-square">
                                <h2 class="shop-title text-center text-3xl font-bold m-2">
                                    <?php echo $shop_data[$id]->name; ?>
                                </h2>
                                <p class="small-text text-2xl ws:text-4xl m-4">
                                    <?php echo $shop_data[$id]->small_text; ?>
                                </p>
                                <div class="more-info-button bg-fb-red text-white text-3xl w-60 text-center m-auto mb-0 cursor-pointer">
                                    View availability
                                </div>
                            </div>
                        </div>
                        <dialog class="detail w-[60%] h-[70%] z-10 absolute top-[15%] bg-transparent">
                            <div class="details-wrapper w-full h-full">
                                <div class="background w-full h-full absolute border-fb-red border-4 rounded-2xl bg-red-900"></div>
                                <div class="details-content h-full flex absolute text-white">
                                    <div class="image-wrapper w-[50%] aspect-square m-auto">
                                        <img src="<?php echo $api_link; ?>/img/industrial-grind-inside.png" class="front-img h-full object-cover">
                                    </div>
                                    <div class="text-wrapper w-[45%]">
                                        <h3 class="shop-title text-center text-4xl font-bold m-7">
                                            <?php echo $shop_data[$id]->name; ?>
                                        </h3>
                                        <p class="long-text text-sm ws:text-lg my-3">
                                            <?php echo $shop_data[$id]->big_text; ?>
                                        </p>
                                        <div class="days flex w-[93%]">
                                            <?php for ($d = 0; $d < 7; $d++) { ?>
                                                <div class="day w-full aspect-square m-auto bg-slate-300 text-center justify-center text-5xl">
                                                    <?php echo $days[($d + $day_of_the_week) % 7][0]; ?>
                                                </div>
                                                
                                            <?php } ?>
                                        </div>
                                        
                                        <?php for ($d = 0; $d < 6; $d++) { ?>
                                            <div class="day-details w-[93%] h-36 bg-slate-600 text-4xl flex">
                                                <div class="w-[50%] h-full">
                                                    <?php echo $days[($d + $day_of_the_week) % 7]; ?>
                                                    <p class="text-xl">
                                                        Spots available: <?php echo $shop_data[$id]->availability->places_available[($d + $day_of_the_week) % 7]; ?>
                                                    </p>
                                                    <p class="text-xl">
                                                        Price: &euro;<?php echo $shop_data[$id]->price; ?> 
                                                    </p>
                                                </div>
                                                <form method="post" action="<?php $realid = $id + 1; echo "$api_link/api/shops/$realid/reservation"; ?>"  class="w-[50%] h-full text-md">
                                                    <input type="test" placeholder="name" class="text-black w-48" name="name" required />
                                                    <input type="email" placeholder="email" class="text-black w-48" name="email" required/>
                                                    <input type="hidden" value="<?php echo ($d + $day_of_the_week) % 7; ?>" name="day"/>
                                                    <button class="buy-reservation-button bg-fb-red text-white text-xl w-40 text-center m-auto mb-0 cursor-pointer">
                                                        Buy reservation
                                                    </button>
                                                </form>

                                            </div>
                                        <?php } ?>
                                    </div>
                                </div>
                            </div>
                        </dialog>
                    </div>
                <?php } ?>
            </main>
            <footer class="w-full h-14 bg-fb-green items-center justify-center grid sticky mb-0">
                <h2>Neem contact op!</h2>
            </footer>
        </div>
        
        <script src="assets/js/main.js"></script>
    </body>
</html>