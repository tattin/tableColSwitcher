<?php
$array = [
    ['data01', 'data12', 'data23', 'data04', 'data15'],
    ['data11', 'data22', 'data03', 'data14', 'data25'],
    ['data21', 'data02', 'data13', 'data24', 'data05'],
];
foreach ($array as $val) {
    $arrayValues[] = $val[$_REQUEST['id']];
}
$sort = ($_REQUEST['sort'] === "desc") ? SORT_DESC : SORT_ASC;
array_multisort($arrayValues, $sort, $array);
echo json_encode($array);