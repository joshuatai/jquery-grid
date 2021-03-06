<?php
	header('Content-type: application/json');
	$dataRows= array();
	/*for($s=0; $s < 100000000; $s++){
	}*/
	for($i=0; $i < 31; $i++){
		$hostname = 'XXXXXXX'.($i+1);
		if (($i+1) % 4 == 0) {
			$hostname = '';
		}
		$newRow= array(
			'hostid' => 'XXX-XXX-XX'.($i+1),
			'ip' => 'XXX.XXX.XXX.XX'.($i+1),
			'hostname' => $hostname,
			'mac' => 'XXX-XXXX-XXX-XXXX',
			'version' => 'X.X',
			'location' => 'XXXX',
			'online' => true,
			'logReceiveTime' => 'XXXXXXXXX',
			'link' => 'XXXXXXXXXXXXX'
		);
		array_push($dataRows, $newRow);
	}
  
	$tmpMatchData= array();
	if(isset($_REQUEST['keyword'])){
		foreach($dataRows as $key => $value){
			$status= true;
			foreach($value as $key2 => $value2){
				//echo $value2;
				//echo $_REQUEST['keyword'];
				//echo stripos($value2, $_REQUEST['keyword'])."==".$value2."\n";
				
				$pattern = '/'.$_REQUEST['keyword'].'/i';				
				if(preg_match($pattern, $value2) && $status == true){
					$status= false;					
					array_push($tmpMatchData, $value);
				}
			}
		}
		$dataRows= $tmpMatchData;
	}
	$tmpMatchData = $dataRows;
	if (isset($_REQUEST['filter'])) {
		$filterArray = explode(',', $_REQUEST['filter']);
		for ($i = 0; $i < count($filterArray); $i++) {
			$currentFilter = explode('=', $filterArray[$i]);
			$fieldName = $currentFilter[0];
			$fieldvalue = $currentFilter[1];
			$tmpFilterData = array();			
			foreach($tmpMatchData as $key => $value){							
				foreach($value as $key2 => $value2){
					//echo $key2 . '=' . $value2 . '<br>';
					if (gettype($value2) == 'boolean') {
						if ($value2) {
							$value2 = 'true';
						} else {
							$value2 = 'false';
						}
					}
					if ($key2 == $fieldName && $value2 == $fieldvalue) {
						array_push($tmpFilterData, $value);
					}
				}
			}
			$tmpMatchData = $tmpFilterData;
		}
		$dataRows= $tmpMatchData;
	}	
	$sortName;
	$sortType;
	function descSort($a, $b){		
		if ($a[$GLOBALS["sortName"]] == $b[$GLOBALS["sortName"]]) {
			return 0;
		}
		return ($a[$GLOBALS["sortName"]] > $b[$GLOBALS["sortName"]]) ? -1 : 1;
	}
	function ascSort($a, $b){		
		if ($a[$GLOBALS["sortName"]] == $b[$GLOBALS["sortName"]]) {
			return 0;
		}
		return ($a[$GLOBALS["sortName"]] < $b[$GLOBALS["sortName"]]) ? -1 : 1;
	}
	if(isset($_REQUEST['sortName']) && isset($_REQUEST['sortType'])){
		$sortNameArr= explode(",", $_REQUEST['sortName']);
		$sortTypeArr= explode(",", $_REQUEST['sortType']);
		for($i=0; $i < count($sortNameArr); $i++){
			$sortName= $sortNameArr[$i];
			$sortType= $sortTypeArr[$i];
			if($sortType == 'desc'){
				usort($dataRows, "descSort");				
			}else{
				usort($dataRows, "ascSort");				
			}
		}		
	}
	if(isset($_REQUEST['limit']) && isset($_REQUEST['page'])){
		$start= $_REQUEST['page']*$_REQUEST['limit'];
		$resData= array_slice($dataRows, $start, $_REQUEST['limit']);
	}else{
		$resData= $dataRows;
	}
	$jsonArray= array(
		'status' => 1,
		'message' => 'error message',
		'msglevel' => 'error',
		'value' => array(
			'total' => count($dataRows),
			'lists' => $resData
		)
	);
	echo json_encode($jsonArray);
?>
