<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/css/bootstrap.min.css'/>

  <link rel="stylesheet" href="index.css">
  <title>Document</title>
</head>

<body>
  <?php include("data.php"); ?>
  <header>
    <a href="/" class="logo"></a>
    <div class="header-right">
      <a class="header-btn" href="/Cart">
        <span class="cart">cart</span>
        <span class="cart-number">0</span>
      </a>
      <div class="header-btn search-wrap"><span class="search"></span></div>
      <div class="header-btn hamburger-wrap"><span class="hamburger"></span></div>
    </div>

    <!-- Search Content -->
    <!-- serch result will put here -->

    <!-- Menu -->
    <div class="menu-content-wrap" style="display: block;">
      <!-- <div class="menu-content"> -->
        <!-- <div class="content"> -->
          <!-- <div class="result"> -->
            <div class="close-wrap">
              <span class="menu-close">X</span>
            </div>
            <!-- <div class="menu-wrap"> -->
              <!-- <div class="menu"> -->
                <!-- root -->
                <div class="menu-root-wrap">
                  <!-- root: list -->
                  <div class="menulist">
                    <div class="menu-container">
                      <div class="menu-content">
                        <ul>
                          <!-- 第一層 List -->
                          <? $i=0 ?>
                          <? foreach ($data['categories'] as $category): ?>
                            <? $i++ ?>

                            <? if ($category['child']): ?>
                              <li class="menu-item js-slide" data-id="id_<?=$i?>"><?=$category['name']?> ></li>
                            <? else:?>
                              <li class="menu-item" data-id="id_<?=$i?>">
                                <a href="<?=$category['link']?>"><?=$category['name']?></a>
                              </li>
                            <? endif; ?>
                          <? endforeach; ?>
                          <!-- <li class="menu-item js-slide" data-id="id_2">新品推薦 ></li>
                          <li class="menu-item js-slide" data-id="id_3"><a href="#">品牌館</a></li> -->
                        </ul>
                      </div>

                      <!-- 第一層 SubMenu -->
                      <div class="sub-menu">
                        <? $i=0 ?>
                        <?php foreach ($data['categories'] as $category): ?>
                        <? $i++ ?>

                        <div class="menulist hide" id="id_<?=$i?>">
                          <span class="menu-back-btn">< 返回主選單</span>
                          <div class="menu-container">
                            <div class="menu-content">
                              <span class="menu-title"><?=$category['name']?></span>
                              <!-- 第二層 List-->
                              <ul>
                                <? $j = 0 ?>
                                <?php foreach ($category['child'] as $child): ?>
                                <? $j++; ?>

                                <li class="menu-item js-slide" data-id="id_<?=$i?>_<?=$j?>"><?=$child['name']?> > </li>

                                <? endforeach; ?>
                              </ul>
                              <!-- 第二層 List:END -->
                            </div>

                            <!-- 第二層 SubMenu -->
                            <div class="sub-menu">
                              <? $j = 0 ?>
                              <?php foreach ($category['child'] as $child): ?>
                              <? $j++; ?>
                              <div class="menulist hide" id="id_<?=$i?>_<?=$j?>">
                                <span class="menu-back-btn">< 返回<?=$category['name']?></span>

                                <div class="menu-container">
                                  <div class="menu-content">
                                    <span class="menu-title"><?=$child['name']?></span>
                                    <!-- 第三層 List -->
                                    <ul>
                                      <? $k = 0 ?>
                                      <?php foreach ($child['child'] as $grandchild): ?>
                                      <? $k++; ?>

                                      <li class="menu-item" data-id="id_<?=$i?>_<?=$j?>_<?=$k?>">
                                        <a href=<?=$grandchild['link']?>>
                                          <?=$grandchild['name']?>
                                        </a>
                                      </li>

                                      <? endforeach; ?>
                                    </ul>
                                    <!-- 第三層 List:END -->
                                  </div>
                                </div>
                              </div>

                              <? endforeach; ?>
                            </div>
                            <!-- 第二層 SubMenu:END -->
                          </div>
                        </div>
                        <? endforeach; ?>
                      </div>
                      <!-- 第一層 SubMenu:END -->
                    </div>
                  </div>
                </div>
              <!-- </div> -->
            <!-- </div> -->
          <!-- </div>
        </div> -->
      <!-- </div> -->
    </div>
  </header>

  <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js'></script>
  <script src="index.js"></script>
</body>
</html>