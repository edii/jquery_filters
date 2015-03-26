<?php
$request = (isset($_POST) and is_array($_POST) and count($_POST) > 0) ? $_POST : $_GET;
$_products = [
  [ // #1
      '_id'         => 1,
      '_category'   => 1,
      'title'       => 'title 1',
      'description' => 'description 1',
  ],
    
];


for($i = 2; $i <= 100; $i ++ ) :
    $_arr[$i] = [
        '_id' => $i,
        '_category' => $i,
        'title' => 'title '.$i,
        'description' => 'description '.$i,
    ];
endfor;
$_products = array_merge( $_products, $_arr );

// filters
//echo "<pre>";
//var_dump( $request, $request['nojson'] );
//echo "</pre>";

if(isset($request['nojson']) and $request['nojson'] == 'false') {
    header('Content-Type: application/json');
    $_data = false;
    if($request['offset'] <= count($_products)) {
        $_data = array_splice($_products, (int)$request['offset'], (int)$request['number']);
    }
    
    echo json_encode( array('result' => $_data) );
} else {    
    header('Content-Type: text/html');
    $_html = '';
    $res_html = '<div data-value="{_id}" class="mix category-{_category}">{_id}</div>';
    
    if($request['offset'] <= count($_products)) {
        $_lists = array_splice($_products, (int)$request['offset'], (int)$request['number']);
        if(is_array($_lists) and count($_lists) > 0):
            foreach($_lists as $_key => $_item) {
                $data = str_replace('{_id}', $_item['_id'], $res_html);
                $data = str_replace('{_category}', $_item['_category'], $data);
                $_html .= $data;
            }
        endif;
    }
    echo $_html;
}

