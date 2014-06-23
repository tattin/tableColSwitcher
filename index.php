<?php
$array = [
    ['data01', 'data12', 'data23', 'data04', 'data15'],
    ['data11', 'data22', 'data03', 'data14', 'data25'],
    ['data21', 'data02', 'data13', 'data24', 'data05'],
];
foreach ($array as $val) {
    $arrayValues[] = $val[$_REQUEST['id']];
}
array_multisort($arrayValues, SORT_ASC, $array);
echo json_encode($array);