<?php
  $data = array(
    "categories" => array(
      // level 1(root)
      array(
        "link" => 'link-to-page',
        "name" => '全站分類',
        "child" => array(
          array(
            // level2 (first sub-menu)
            "link" => 'link-to-page-1-1',
            "name" => '中文新書',
            "child" => array(
              // level3 (2nd sub-menu)
              array(
                "link" => 'link-to-page-1-1-1',
                "name" => '中文小說',
              ),
              array(
                "link" => 'link-to-page-1-1-2',
                "name" => '中文散文',
              ),
            ),
          ),
          array(
            // level2 (first sub-menu)
            "link" => 'link-to-page-1-2',
            "name" => '英文新書',
            "child" => array(
              // level3 (2nd sub-menu)
              array(
                "link" => 'link-to-page-1-2-1',
                "name" => '英文小說',
              ),
              array(
                "link" => 'link-to-page-1-2-2',
                "name" => '英文歷史',
              ),
            ),
          ),
        )
      ),
      array(
        "link" => 'link-to-page',
        "name" => '新品推薦',
        "child" => array(
          array(
            // level2 (first sub-menu)
            "link" => 'link-to-page-2-1',
            "name" => '中文新書',
            "child" => array(
              // level3 (2nd sub-menu)
              array(
                "link" => 'link-to-page-2-1-1',
                "name" => '中文小說',
              ),
              array(
                "link" => 'link-to-page-2-1-2',
                "name" => '中文歷史',
              ),
            ),
          ),
        )
      ),
      array(
        "link" => 'link-to-page',
        "name" => 'category-5',
        "child" => null
      ),
    ),
  );

?>