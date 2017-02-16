<?php global $link; 
error_reporting(E_ERROR | E_PARSE );
ini_set('display_errors', '1');
ini_set('memory_limit', '2048M');
function mysqlconnect(){
	global $link;
	$link = new mysqli('127.0.0.1', 'lilly', 'careerpath', 'lilly');
}
mysqlconnect();
function mysqlclose(){ 
	global $link;
	mysql_close($link);
} 
?>
<?php
//find searching items
if($_REQUEST['major'] != null || $_REQUEST['occupation'] != null)
{  

   $sql = "select sum(students) as collegeStudents, major, college from MajorToOccupation_new_201606 where lower(major) like lower('%".$_REQUEST['major']."%') and lower(occupation) like lower('%".$_REQUEST['occupation']."%') group by college,major";
	$result = $link->query($sql);
	echo $result->num_rows;	
	 while($rows = mysqli_fetch_assoc($result))
    {
	    echo "*".$rows["major"].'*'.$rows["collegeStudents"].'*'.$rows["college"];
    }
	
	$sql ="select sum(students) as collegeStudents,occupation, occupationGroup from MajorToOccupation_new_201606 where lower(major) like lower('%".$_REQUEST['major']."%') and lower(occupation) like lower('%".$_REQUEST['occupation']."%') group by occupationGroup,occupation";

$result = $link->query($sql);
	echo "*".$result->num_rows;	
	 while($rows = mysqli_fetch_assoc($result))
    {
	    echo "*".$rows["occupation"].'*'.$rows["collegeStudents"].'*'.$rows["occupationGroup"];
    }

$sql = "select sum(students) as collegeStudents, occupation, major , college, occupationGroup from MajorToOccupation_new_201606 where lower(major) like lower('%".$_REQUEST['major']."%') and lower(occupation) like lower('%".$_REQUEST['occupation']."%') group by occupation, major,college, occupationGroup";
$result = $link->query($sql);
	echo "*".$result->num_rows;	
 while($rows = mysqli_fetch_assoc($result))
    {
	    echo "*".$rows["major"].'*'.$rows["occupation"].'*'.$rows["collegeStudents"];
    }
}


else if($_REQUEST['college'] == "?" && $_REQUEST['occupationGroup'] == "?" )
{  
   $sql = "select sum(students) as collegeStudents, college, occupationGroup from MajorToOccupation_new_201606 group by college, occupationGroup";
   $result = $link->query($sql);
   echo $result->num_rows;
   while($rows = mysqli_fetch_assoc($result))
   {
	    echo "*".$rows["college"].'*'.trim($rows["occupationGroup"]).'*'.$rows["collegeStudents"];
   }
}
else if($_REQUEST['college'] != "?" && $_REQUEST['occupationGroup'] == "?" )
{
    $sql = "select sum(students) as collegeStudents, major, college from MajorToOccupation_new_201606 where college = '".$_REQUEST['college']." 'group by major, college";
    $result = $link->query($sql);
    echo $result->num_rows;	 
    while($rows = mysqli_fetch_assoc($result))
   {
	    echo "*".$rows["major"].'*'.$rows["collegeStudents"];
   }
   
   $sql ="select sum(students) as collegeStudents, major, college,occupationGroup from MajorToOccupation_new_201606 where college = '".$_REQUEST['college']."' group by major, college, occupationGroup";
   $result = $link->query($sql);
   echo "*".$result->num_rows;
   while($rows = mysqli_fetch_assoc($result))
   {
	    echo "*".$rows["major"].'*'.$rows["occupationGroup"].'*'.$rows["collegeStudents"];
   }
   
}
else if($_REQUEST['college'] == "?" && $_REQUEST['occupationGroup'] != "?" )
{
	$sql ="select sum(students) as collegeStudents,occupation, occupationGroup from MajorToOccupation_new_201606 where occupationGroup = '".$_REQUEST['occupationGroup']."' group by occupation,  occupationGroup";
	 $result = $link->query($sql);
	 echo $result->num_rows;	
	  while($rows = mysqli_fetch_assoc($result))
   {
	    echo "*".$rows["occupation"].'*'.$rows["collegeStudents"];
   }
    $sql ="select sum(students) as collegeStudents,college, occupation, occupationGroup from MajorToOccupation_new_201606 where occupationGroup = '".$_REQUEST['occupationGroup']."' group by occupation, college, occupationGroup";
	$result = $link->query($sql);
	 echo "*".$result->num_rows;
	while($rows = mysqli_fetch_assoc($result))
   {
	    echo "*".$rows["college"].'*'.$rows["occupation"].'*'.$rows["collegeStudents"];
   } 
	 
}
else if( $_REQUEST['college'] != "?" && $_REQUEST['occupationGroup'] != "?" )
{
	$sql = "select sum(students) as collegeStudents, major, college from MajorToOccupation_new_201606 where college = '".$_REQUEST['college']." 'group by major, college";
	$result = $link->query($sql);
	echo $result->num_rows;	
	 while($rows = mysqli_fetch_assoc($result))
    {
	    echo "*".$rows["major"].'*'.$rows["collegeStudents"];
    }
	
	$sql ="select sum(students) as collegeStudents,occupation, occupationGroup from MajorToOccupation_new_201606 where occupationGroup = '".$_REQUEST['occupationGroup']."' group by occupation,  occupationGroup";

$result = $link->query($sql);
	echo "*".$result->num_rows;	
	 while($rows = mysqli_fetch_assoc($result))
    {
	    echo "*".$rows["occupation"].'*'.$rows["collegeStudents"];
    }

$sql = "select sum(students) as collegeStudents, occupation, major , college, occupationGroup from MajorToOccupation_new_201606 where college = '".$_REQUEST['college']."' and occupationGroup = '".$_REQUEST['occupationGroup']."' group by occupation, major,college, occupationGroup";
$result = $link->query($sql);
	echo "*".$result->num_rows;	
 while($rows = mysqli_fetch_assoc($result))
    {
	    echo "*".$rows["major"].'*'.$rows["occupation"].'*'.$rows["collegeStudents"];
    }
}
?>