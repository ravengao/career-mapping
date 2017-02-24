<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">


<head>
  <title>Career Mapping</title>
  <script src="https://d3js.org/d3.v4.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/2.4.2/math.min.js"></script>

  <!-- CSS -->
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.0/themes/base/jquery-ui.css">  
  <link href="LillyData/bootstrap.min.css" rel="stylesheet">
  <link href="LillyData/introjs.css" rel="stylesheet">
  <link href="career_mapping_white.css" rel="stylesheet">

  <!--JS-->
  <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="text/javascript" src="LillyData/intro.js"></script>
  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.js"></script>
  <script type="text/javascript" src="js/jquery.youtubepopup.min.js"></script>
  <script src="career-mapping.js"></script>
</head>


<body>
<svg class="svgbody" id="mySVG"  version="1.1" xmlns="http://www.w3.org/2000/svg"  preserveAspectRatio="xMinYMin meet" viewBox="0 0 1480 1600" xmlns:xlink="http://www.w3.org/1999/xlink" ></svg> 
<div id="majorScatter"></div>
<!-- Video/guides

<div class="occupationVQR" id="occupationScatterplot"></div>


-->
<!--
<div class="menu">Career Mapping Visualization System
  <button class="btn btn-large btn-success" onclick="javascript:introJs().start();">Webpage Guide</button>
  <button id="opener">Video Tutorial</button>
    <div class="search" data-setp="4" data-intro="Enter keyword of major/occupation, it will show the mappping relasionship between certain major/occupation">
      <input type="search" id="majorSearch" placeholder="Enter major..">
      <input type="search" id="occupationSearch" placeholder="Enter occupation..">
      <button class="button1" onclick="searchFunction()">Search</button>
    </div>
</div>
-->

<div class="menu" style = " height: 4vh; background-color:#47464E;">
  <p > Career Mapping Visualization System
  <a style = "padding-top:0px; margin-left: 10px;" onclick="javascript:introJs().start();">Webpage Guide</a>
  <a>|</a>
  <a id="opener">Video Guide</a>
  </p>

  <div class="search" data-setp="4" data-intro="Enter keyword of major/occupation, it will show the mappping relasionship between certain major/occupation">
    <input type="search" id="majorSearch" placeholder="Enter major..">
    <input type="search" id="occupationSearch" placeholder="Enter occupation..">
    <button onclick="searchFunction()">Search</button>
  </div>
</div>

<div style="text-align:left;">
    <div class="collegeBar" style=" margin-top:9%;margin-left:19.5%;width:32vh;height:77vh; display:inline-block;" data-setp="1" data-intro="Click on college bar to expand and show all MAJORs of clicked college." data-position='right'></div>
    <div class="occupationBar" style=" margin-top:9%;margin-left:18%;width:32vh;height:77vh;display:inline-block;" data-setp="2" data-intro="Click on occupation Group bar to expand and show all JOBs of clicked occupation group." data-position='right'></div>
    <div class="occupationChar" style=" margin-top:10%;margin-left:0%;width:28vh;height:50vh;display:inline-block;" data-setp="3" data-intro="Verbal, Quantitative and Reasoning skill are requirements for selected certain major.SAT, salary, etc. also respond to selected certain major or occupation." data-position='left'></div>
</div>

<div style="text-align:left;">
    <div class="collegeBar" style=" margin-top:9%;margin-left:19.5%;width:32vh;height:77vh; display:inline-block;" data-setp="1" data-intro="Click on college bar to expand and show all MAJORs of clicked college." data-position='right'></div>
    <div class="occupationBar" style=" margin-top:9%;margin-left:18%;width:32vh;height:77vh;display:inline-block;" data-setp="2" data-intro="Click on occupation Group bar to expand and show all JOBs of clicked occupation group." data-position='right'></div>
    <div class="occupationChar" style=" margin-top:10%;margin-left:0%;width:28vh;height:50vh;display:inline-block;" data-setp="3" data-intro="Verbal, Quantitative and Reasoning skill are requirements for selected certain major.SAT, salary, etc. also respond to selected certain major or occupation." data-position='left'></div>
</div>

<div id="dialog" title="Video Tutorial">
  <p><iframe width="970" height="560" src="https://www.youtube.com/embed/paJjSti3af0" frameborder="0" allowfullscreen></iframe></p>
</div>



<!--Mordify tutorial/guides function & multi-view side-->
<script>
///////////////////////////////////////////////////////////////////////////////////////////////////////////
        var chart_name = [];
        var chart_class_name = [];
        var chart_img_id = [];
        var chart_y = [];
        var chart_subclass_name=[];
        var chart_sub_y=[];
        var chart_text_y=[];


        var str = "";
        var accordion_bar_id;
        var accordion_panel_id;
        var accordion_bar_xl = 0;
        var accordion_bar_xr = 1180;
        var accordion_bar_y = 320;
        var accordion_bar_width = 300;
        var accordion_bar_height = 30;
        var accordion_panel_xl = 0;
        var accordion_panel_xr = 1180;
        var accordion_panel_y = accordion_bar_y + accordion_bar_height;
        var accordion_panel_width = 300;
        var accordion_panel_height = 130;//180
        var chart_base_x=1050;
        var chart_base_y=accordion_bar_y + 30;//80
        var svg = d3.select("#mySVG").append("g");

        var accordion_array = d3.range(20);

        var accordion_unit = svg.selectAll(".accordion_unit")
                                .data(accordion_array)
                                .enter()
                                .append("g");

        accordion_unit.append("rect")
                      .attr("class", "accordion_bar")
                      .attr("id", function(d, i){ return "accordion_bar_" + i; })
                      .attr("x", function(d, i){ if(i < 10) return accordion_bar_xl; else return accordion_bar_xr;})
                      .attr("y", function(d, i){ if(i > 9) i-=10; return accordion_bar_y + (accordion_bar_height+5) * i; })
                      .attr("width", accordion_bar_width)
                      .attr("height", accordion_bar_height)
                      .on("click", function(d, i){ return ClickAccordion(i); });

        accordion_unit.append("text")
                      .attr("class", "accordion_name")
                      .attr("id", function(d, i){ return "accordion_name_" + i; })
                      .text(function(d, i){ return "accordion_name_" + i; }) // Will change to real name 
                      .attr("x", function(d, i){ if(i < 10) return accordion_bar_xl + 5; else return accordion_bar_xr + 5; })
                      .attr("y", function(d, i){ if(i > 9) i-=10; return accordion_bar_y + (accordion_bar_height+5) * i + 25; })
                      .on("click", function(d, i){ return ClickAccordion(i); });

        accordion_unit.append("rect")
                      .attr("class", "accordion_panel")
                      .attr("id", function(d, i){ return "accordion_panel_"+ i; })
                      .attr("x", function(d, i){ if(i < 10) return accordion_panel_xl; else return accordion_panel_xr;})
                      .attr("y", function(d, i){ if(i > 9) i-=10; return accordion_panel_y + (accordion_bar_height + 5) * i;})
                      .attr("width", accordion_panel_width)
                      .attr("height", accordion_panel_height);


////////////////////////////////////////////////////////////////////////////////////////////////////////////
  var num = 50; //number of pixels before modifying styles

  $(window).bind('scroll', function () {
      if ($(window).scrollTop() > num) {
          $('.menu').addClass('fixed');
      } else {
          $('.menu').removeClass('fixed');
      }
  });
  $( function() {
    $( "#dialog" ).dialog({
      autoOpen: false,
      width: "70%",
      show: {
        effect: "fade",
        duration: 500
      },
      hide: {
        effect: "fade",
        duration: 500
      }
    });

    $( "#opener" ).on( "click", function() {
      $( "#dialog" ).dialog( "open" );
    });
  } );

  var num = 50; //number of pixels before modifying styles

  $(window).bind('scroll', function () {
      if ($(window).scrollTop() > num) {
          $('.menu').addClass('fixed');
      } else {
          $('.menu').removeClass('fixed');
      }
  });
  $( function() {
    $( "#dialog" ).dialog({
      autoOpen: false,
      width: "70%",
      show: {
        effect: "fade",
        duration: 500
      },
      hide: {
        effect: "fade",
        duration: 500
      }
    });

    $( "#opener" ).on( "click", function() {
      $( "#dialog" ).dialog( "open" );
    });
  } );

</script>





<!-- Data preprocessing-->

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

<script>
  var url = "click_data.php";

  // initial parameters
  var college = {
    name : [],
    number : [],
    style : [],
    character: [],
    opacity : []
    };
  var major = {
    name : [],
    number : [],
    college:[],
    style : [],
    character : [],
    opacity : []
    };
  var occupation = {
    name : [],
    number : [],
    occupationGroup:[],
    style : [],
    character : [],
    opacity : []
    };

  var occupationGroup = {
    name : [],
    number : [],
    style : [],
      character : [],
    opacity : []
    };
 
  var occupationautomation = {
  name : [],
  number : [],
  style : [],
    character : [],
  opacity : []
  };

  var automation = {
  name : [],
  number : [],
  style : [],
    character : [],
  opacity : []
  };
  
  var occupationglobalization = {
  name : [],
  number : [],
  style : [],
    character : [],
  opacity : []
  };

  var globalization = {
  name : [],
  number : [],
  style : [],
    character : [],
  opacity : []
  };
  var occupationmarried = {
  name : [],
  number : [],
  style : [],
    character : [],
  opacity : []
  };
//marriedPercentAge30to50

  var married = {
  name : [],
  number : [],
  style : [],
    character : [],
  opacity : []
  };
  var occupationblackPercent = {
  name : [],
  number : [],
  style : [],
    character : [],
  opacity : []
  };

  var blackPercent = {
  name : [],
  number : [],
  style : [],
    character : [],
  opacity : []
  };
  var occupationasianPercent = {
  name : [],
  number : [],
  style : [],
    character : [],
  opacity : []
  };

  var asianPercent = {
  name : [],
  number : [],
  style : [],
    character : [],
  opacity : []
  };
var occupationhispanicPercent = {
  name : [],
  number : [],
  style : [],
    character : [],
  opacity : []
  };

  var hispanicPercent = {
  name : [],
  number : [],
  style : [],
    character : [],
  opacity : []
  };
  var occupationfemalePercent = {
  name : [],
  number : [],
  style : [],
    character : [],
  opacity : []
  };

  var femalePercent = {
  name : [],
  number : [],
  style : [],
    character : [],
  opacity : []
  };
  var occupationforeignBornPercent = {
  name : [],
  number : [],
  style : [],
    character : [],
  opacity : []
  };

  var foreignBornPercent = {
  name : [],
  number : [],
  style : [],
    character : [],
  opacity : []
  };
  
  var occupationaverageHoursOfWorkOrWeek = {
  name : [],
  number : [],
  style : [],
    character : [],
  opacity : []
  };

  var averageHoursOfWorkOrWeek = {
  name : [],
  number : [],
  style : [],
    character : [],
  opacity : []
  };
  //
  var college_style = [];
  var occupationGroup_style = []
  //
  var college_major_list = [];
  var occupationGroup_occupation_list = [];
  var occupation_occupation_list = [];
  var education_job ={
    education:[],
    job:[],
    number:[]
    };

  // character parameters 
  var major_character_requirement = [];
  var occupation_character_requirement = [];
  var college_character_range = [];
  var occupation_character_range = [];
  var occupationGroup_character_range = [];

  // store the existing fullname displayed on two sides
  var fullname_education = [];
  var fullname_job =[];

  //
  var college_click ='?';
  var major_click ='?';
  var occupationGroup_click = '?';
  var occupation_click = '?';

  //
  var education_character_applied =false; 
  var job_character_applied =false;


  var character_for_search = [];
  var character_for_nonsearch = [];
  var num_education_character =7;   
</script> 
  
  <!-- extract all the needed information for initialization--> 
  <!-- extract OccupationCha042016 information，automationSensitivity-->
  <?php
$sql = "SELECT sum(automationSensitivity*observations)/sum(observations) as occupationautomation,observations,automationSensitivity,occupationGroup from OccupationCha042016 group by occupationGroup";
$result = $link->query($sql);if ($result->num_rows <= 0) {
       echo "0 results";
     }   
while($rows = mysqli_fetch_assoc($result))
  {
    ?>
  <script>
    occupationautomation.name.push("<?php echo($rows["occupationGroup"]); ?>");
    occupationautomation.number.push(<?php echo($rows["occupationautomation"]); ?>);
    occupationautomation.style.push("<?php echo(ereg_replace(",", "", ereg_replace(" ", "", $rows["occupationGroup"])));?>");
    </script>
  <?php
 }
         ?>

 <!-- extract OccupationCha042016 information，subautomationSensitivity-->
  <?php
$sql = "SELECT observations,automationSensitivity,occupation,occupationGroup from OccupationCha042016 group by occupationGroup,occupation";
$result = $link->query($sql);if ($result->num_rows <= 0) {
       echo "0 results";
     }   
while($rows = mysqli_fetch_assoc($result))
  {
    ?>
  <script>
    automation.name.push("<?php echo($rows["occupation"]); ?>");
    automation.number.push(<?php echo($rows["automationSensitivity"]); ?>);
    automation.style.push("<?php echo(ereg_replace(",", "", ereg_replace(" ", "", $rows["occupationGroup"])));?>");
    </script>
  <?php
 }
         ?>

<!-- extract OccupationCha042016 information,occupationglobalization-->
  <?php
$sql = "SELECT sum(globalizationSensitivity*observations)/sum(observations) as occupationglobalization,observations,globalizationSensitivity,occupationGroup from OccupationCha042016 group by occupationGroup";
$result = $link->query($sql);if ($result->num_rows <= 0) {
       echo "0 results";
     }   
while($rows = mysqli_fetch_assoc($result))
  {
    ?>
  <script>
    occupationglobalization.name.push("<?php echo($rows["occupationGroup"]); ?>");
    occupationglobalization.number.push(<?php echo($rows["occupationglobalization"]); ?>);
    occupationglobalization.style.push("<?php echo(ereg_replace(",", "", ereg_replace(" ", "", $rows["occupationGroup"])));?>");
    </script>
  <?php
 }
         ?>

<!-- extract OccupationCha042016 information,suboccupationglobalization-->
  <?php
$sql = "SELECT observations,globalizationSensitivity,occupation,occupationGroup from OccupationCha042016 group by occupationGroup,occupation";
$result = $link->query($sql);if ($result->num_rows <= 0) {
       echo "0 results";
     }   
while($rows = mysqli_fetch_assoc($result))
  {
    ?>
  <script>
    globalization.name.push("<?php echo($rows["occupation"]); ?>");
    globalization.number.push(<?php echo($rows["globalizationSensitivity"]); ?>);
    globalization.style.push("<?php echo(ereg_replace(",", "", ereg_replace(" ", "", $rows["occupationGroup"])));?>");
    </script>
  <?php
 }
         ?>
<!-- extract OccupationCha042016 information,marriedPercentAge30to50-->
  <?php
$sql = "SELECT sum(marriedPercentAge30to50*observations)/sum(observations) as occupationmarried,observations,marriedPercentAge30to50,occupationGroup from OccupationCha042016 group by occupationGroup";
$result = $link->query($sql);if ($result->num_rows <= 0) {
       echo "0 results";
     }   
while($rows = mysqli_fetch_assoc($result))
  {
    ?>
  <script>
    occupationmarried.name.push("<?php echo($rows["occupationGroup"]); ?>");
    occupationmarried.number.push(<?php echo($rows["occupationmarried"]); ?>);
    occupationmarried.style.push("<?php echo(ereg_replace(",", "", ereg_replace(" ", "", $rows["occupationGroup"])));?>");
    </script>
  <?php
 }
         ?>
<!-- extract OccupationCha042016 information,submarriedPercentAge30to50-->
  <?php
$sql = "SELECT  observations,marriedPercentAge30to50,occupation,occupationGroup from OccupationCha042016 group by occupationGroup,occupation";
$result = $link->query($sql);if ($result->num_rows <= 0) {
       echo "0 results";
     }   
while($rows = mysqli_fetch_assoc($result))
  {
    ?>
  <script>
    married.name.push("<?php echo($rows["occupation"]); ?>");
    married.number.push(<?php echo($rows["marriedPercentAge30to50"]); ?>);
    married.style.push("<?php echo(ereg_replace(",", "", ereg_replace(" ", "", $rows["occupationGroup"])));?>");
    </script>
  <?php
 }
         ?>
<!-- extract OccupationCha042016 information,blackPercent-->
  <?php
$sql = "SELECT sum(blackPercent*observations)/sum(observations) as occupationblackPercent,observations,blackPercent,occupationGroup from OccupationCha042016 group by occupationGroup";
$result = $link->query($sql);if ($result->num_rows <= 0) {
       echo "0 results";
     }   
while($rows = mysqli_fetch_assoc($result))
  {
    ?>
  <script>
    occupationblackPercent.name.push("<?php echo($rows["occupationGroup"]); ?>");
    occupationblackPercent.number.push(<?php echo($rows["occupationblackPercent"]); ?>);
    occupationblackPercent.style.push("<?php echo(ereg_replace(",", "", ereg_replace(" ", "", $rows["occupationGroup"])));?>");
    </script>
  <?php
 }
         ?>
<!-- extract OccupationCha042016 information,subblackPercent-->
  <?php
$sql = "SELECT  observations,blackPercent,occupation,occupationGroup from OccupationCha042016 group by occupationGroup,occupation";
$result = $link->query($sql);if ($result->num_rows <= 0) {
       echo "0 results";
     }   
while($rows = mysqli_fetch_assoc($result))
  {
    ?>
  <script>
    blackPercent.name.push("<?php echo($rows["occupation"]); ?>");
    blackPercent.number.push(<?php echo($rows["blackPercent"]); ?>);
    blackPercent.style.push("<?php echo(ereg_replace(",", "", ereg_replace(" ", "", $rows["occupationGroup"])));?>");
    </script>
  <?php
 }
         ?>
<!-- extract OccupationCha042016 information,asianPercent-->
  <?php
$sql = "SELECT sum(asianPercent*observations)/sum(observations) as occupationasianPercent,observations,asianPercent,occupationGroup from OccupationCha042016 group by occupationGroup";
$result = $link->query($sql);if ($result->num_rows <= 0) {
       echo "0 results";
     }   
while($rows = mysqli_fetch_assoc($result))
  {
    ?>
  <script>
    occupationasianPercent.name.push("<?php echo($rows["occupationGroup"]); ?>");
    occupationasianPercent.number.push(<?php echo($rows["occupationasianPercent"]); ?>);
    occupationasianPercent.style.push("<?php echo(ereg_replace(",", "", ereg_replace(" ", "", $rows["occupationGroup"])));?>");
    </script>
  <?php
 }
         ?>
<!-- extract OccupationCha042016 information,subasianPercent-->
  <?php
$sql = "SELECT  observations,asianPercent,occupation,occupationGroup from OccupationCha042016 group by occupationGroup,occupation";
$result = $link->query($sql);if ($result->num_rows <= 0) {
       echo "0 results";
     }   
while($rows = mysqli_fetch_assoc($result))
  {
    ?>
  <script>
    asianPercent.name.push("<?php echo($rows["occupation"]); ?>");
    asianPercent.number.push(<?php echo($rows["asianPercent"]); ?>);
    asianPercent.style.push("<?php echo(ereg_replace(",", "", ereg_replace(" ", "", $rows["occupationGroup"])));?>");
    </script>
  <?php
 }
         ?>

<!-- extract OccupationCha042016 information, hispanicPercent-->
  <?php
$sql = "SELECT sum(hispanicPercent*observations)/sum(observations) as occupationhispanicPercent,observations,hispanicPercent,occupationGroup from OccupationCha042016 group by occupationGroup";
$result = $link->query($sql);if ($result->num_rows <= 0) {
       echo "0 results";
     }   
while($rows = mysqli_fetch_assoc($result))
  {
    ?>
  <script>
    occupationhispanicPercent.name.push("<?php echo($rows["occupationGroup"]); ?>");
    occupationhispanicPercent.number.push(<?php echo($rows["occupationhispanicPercent"]); ?>);
    occupationhispanicPercent.style.push("<?php echo(ereg_replace(",", "", ereg_replace(" ", "", $rows["occupationGroup"])));?>");
    </script>
  <?php
 }
         ?>
<!-- extract OccupationCha042016 information,subhispanicPercent-->
  <?php
$sql = "SELECT  observations,hispanicPercent,occupation,occupationGroup from OccupationCha042016 group by occupationGroup,occupation";
$result = $link->query($sql);if ($result->num_rows <= 0) {
       echo "0 results";
     }   
while($rows = mysqli_fetch_assoc($result))
  {
    ?>
  <script>
    hispanicPercent.name.push("<?php echo($rows["occupation"]); ?>");
    hispanicPercent.number.push(<?php echo($rows["hispanicPercent"]); ?>);
    hispanicPercent.style.push("<?php echo(ereg_replace(",", "", ereg_replace(" ", "", $rows["occupationGroup"])));?>");
    </script>
  <?php
 }
         ?>

<!-- extract OccupationCha042016 information,femalePercent-->
  <?php
$sql = "SELECT sum(femalePercent*observations)/sum(observations) as occupationfemalePercent,observations,femalePercent,occupationGroup from OccupationCha042016 group by occupationGroup";
$result = $link->query($sql);if ($result->num_rows <= 0) {
       echo "0 results";
     }   
while($rows = mysqli_fetch_assoc($result))
  {
    ?>
  <script>
    occupationfemalePercent.name.push("<?php echo($rows["occupationGroup"]); ?>");
    occupationfemalePercent.number.push(<?php echo($rows["occupationfemalePercent"]); ?>);
    occupationfemalePercent.style.push("<?php echo(ereg_replace(",", "", ereg_replace(" ", "", $rows["occupationGroup"])));?>");
    </script>
  <?php
 }
         ?>
<!-- extract OccupationCha042016 information,subfemalePercent-->
  <?php
$sql = "SELECT  observations,femalePercent,occupation,occupationGroup from OccupationCha042016 group by occupationGroup,occupation";
$result = $link->query($sql);if ($result->num_rows <= 0) {
       echo "0 results";
     }   
while($rows = mysqli_fetch_assoc($result))
  {
    ?>
  <script>
    femalePercent.name.push("<?php echo($rows["occupation"]); ?>");
    femalePercent.number.push(<?php echo($rows["femalePercent"]); ?>);
    femalePercent.style.push("<?php echo(ereg_replace(",", "", ereg_replace(" ", "", $rows["occupationGroup"])));?>");
    </script>
  <?php
 }
         ?>



  <!-- extract OccupationCha042016 information,foreignBornPercent-->
  <?php
$sql = "SELECT sum(foreignBornPercent*observations)/sum(observations) as occupationforeignBornPercent,observations,foreignBornPercent,occupationGroup from OccupationCha042016 group by occupationGroup";
$result = $link->query($sql);if ($result->num_rows <= 0) {
       echo "0 results";
     }   
while($rows = mysqli_fetch_assoc($result))
  {
    ?>
  <script>
    occupationforeignBornPercent.name.push("<?php echo($rows["occupationGroup"]); ?>");
    occupationforeignBornPercent.number.push(<?php echo($rows["occupationforeignBornPercent"]); ?>);
    occupationforeignBornPercent.style.push("<?php echo(ereg_replace(",", "", ereg_replace(" ", "", $rows["occupationGroup"])));?>");
    </script>
  <?php
 }
         ?>
<!-- extract OccupationCha042016 information,subforeignBornPercent-->
  <?php
$sql = "SELECT  observations,foreignBornPercent,occupation,occupationGroup from OccupationCha042016 group by occupationGroup,occupation";
$result = $link->query($sql);if ($result->num_rows <= 0) {
       echo "0 results";
     }   
while($rows = mysqli_fetch_assoc($result))
  {
    ?>
  <script>
    foreignBornPercent.name.push("<?php echo($rows["occupation"]); ?>");
    foreignBornPercent.number.push(<?php echo($rows["foreignBornPercent"]); ?>);
    foreignBornPercent.style.push("<?php echo(ereg_replace(",", "", ereg_replace(" ", "", $rows["occupationGroup"])));?>");
    </script>
  <?php
 }
         ?>

 <!-- extract OccupationCha042016 information,averageHoursOfWorkOrWeek-->
  <?php
$sql = "SELECT sum(averageHoursOfWorkOrWeek*observations)/sum(observations) as occupationaverageHoursOfWorkOrWeek,observations,averageHoursOfWorkOrWeek,occupationGroup from OccupationCha042016 group by occupationGroup";
$result = $link->query($sql);if ($result->num_rows <= 0) {
       echo "0 results";
     }   
while($rows = mysqli_fetch_assoc($result))
  {
    ?>
  <script>
    occupationaverageHoursOfWorkOrWeek.name.push("<?php echo($rows["occupationGroup"]); ?>");
    occupationaverageHoursOfWorkOrWeek.number.push(<?php echo($rows["occupationaverageHoursOfWorkOrWeek"]); ?>);
    occupationaverageHoursOfWorkOrWeek.style.push("<?php echo(ereg_replace(",", "", ereg_replace(" ", "", $rows["occupationGroup"])));?>");
    </script>
  <?php
 }
         ?>
<!-- extract OccupationCha042016 information,subaverageHoursOfWorkOrWeek-->
  <?php
$sql = "SELECT  observations,averageHoursOfWorkOrWeek,occupation,occupationGroup from OccupationCha042016 group by occupationGroup,occupation";
$result = $link->query($sql);if ($result->num_rows <= 0) {
       echo "0 results";
     }   
while($rows = mysqli_fetch_assoc($result))
  {
    ?>
  <script>
    averageHoursOfWorkOrWeek.name.push("<?php echo($rows["occupation"]); ?>");
    averageHoursOfWorkOrWeek.number.push(<?php echo($rows["averageHoursOfWorkOrWeek"]); ?>);
    averageHoursOfWorkOrWeek.style.push("<?php echo(ereg_replace(",", "", ereg_replace(" ", "", $rows["occupationGroup"])));?>");
    </script>
  <?php
 }
         ?>


  <!-- extract college information-->

  <?php
$sql = "SELECT sum(students) as collegeStudents, college from MajorToOccupation_new_201606 group by college";
$result = $link->query($sql);
if ($result->num_rows <= 0) {
       echo "0 results";
     }   
while($rows = mysqli_fetch_assoc($result))
  {
    ?>
  <script>
    college.name.push("<?php echo($rows["college"]); ?>");
    college.number.push(<?php echo($rows["collegeStudents"]); ?>);
    college.style.push("<?php echo(ereg_replace(" ", "", $rows["college"]));?>");
  </script>
  <?php
 }
         ?>
  <!-- extract occupationGroup information-->
  <?php
$sql = "SELECT sum(students) as collegeStudents, occupationGroup from MajorToOccupation_new_201606 group by occupationGroup";
$result = $link->query($sql);
if ($result->num_rows <= 0) {
       echo "0 results";
     }   
while($rows = mysqli_fetch_assoc($result))
  {
    ?>
  <script>
    occupationGroup.name.push("<?php echo($rows["occupationGroup"]); ?>");
    occupationGroup.number.push(<?php echo($rows["collegeStudents"]); ?>);
    occupationGroup.style.push("<?php echo(ereg_replace(",", "", ereg_replace(" ", "", $rows["occupationGroup"])));?>");
    </script>
  <?php
 }
         ?>
  <!-- extract the relationship between college and major -->
  <?php
$sql = "SELECT college,major FROM MajorToOccupation_new_201606 group by college, major";
$result = $link->query($sql);
if ($result->num_rows <= 0) {
       echo "0 results";
     }   
while($rows = mysqli_fetch_assoc($result))
  {
    ?>
  <script>
    college_major_list.push({
    college: "<?php echo($rows["college"]); ?>",
    major: "<?php echo($rows["major"]); ?>"
    });
    </script>
  <?php
 }
         ?>
  <!-- extract the relationship between occupationGroup and occupation -->
  <?php
$sql = "SELECT occupationGroup,occupation FROM MajorToOccupation_new_201606 group by occupationGroup,occupation";
$result = $link->query($sql);
if ($result->num_rows <= 0) {
       echo "0 results";
     }   
while($rows = mysqli_fetch_assoc($result))
  {
    ?>
  <script>
    occupationGroup_occupation_list.push({
    occupationGroup: "<?php echo($rows["occupationGroup"]); ?>",
    occupation: "<?php echo($rows["occupation"]); ?>"
    });
    </script>
  <?php
 }
         ?>

  <!-- extract the path information between education(college or major) and job(occupation, occupation or occupationGroup) -->
  <?php
$sql = "SELECT sum(students) as collegeStudents, college, occupationGroup from MajorToOccupation_new_201606 group by college, occupationGroup";
$result = $link->query($sql);
if ($result->num_rows <= 0) {
       echo "0 results";
     }   
while($rows = mysqli_fetch_assoc($result))
  {
    ?>
  <script>
      education_job.education.push("<?php echo($rows["college"]); ?>");
      education_job.job.push("<?php echo($rows["occupationGroup"]); ?>");
      education_job.number.push(<?php echo($rows["collegeStudents"]); ?>);

    </script>
  <?php
 }
         ?>
  <!--  extract major character requirement -->
  <?php
  $sql ="SELECT major, college, observations, verbalSkill, quantitativeSkill, reasoningSkill, percentFemale, salary10thPercentile, salary25thPercentile, salaryMedian, salary75thPercentile, salary90thPercentile, SAT10thPercentile,SAT25thPercentile, SATMedian, SAT75thPercentile, SAT90thPercentile, purdueGPA10thPercentile, purdueGPA25thPercentile, purdueGPAMedian, purdueGPA75thPercentile, purdueGPA90thPercentile, description from MajorCha042016  group by major, college";
  $result = $link->query($sql);
  if ($result->num_rows <= 0) {
       echo "0 results";
     }
   while($rows = mysqli_fetch_assoc($result))
  {
    ?>
  <script>
    major_character_requirement.push({

    major: "<?php echo($rows["major"]); ?>",
    college: "<?php echo($rows["college"]); ?>",
    observations: parseInt("<?php echo($rows["observations"]); ?>"),

      verbalSkill: parseFloat("<?php echo($rows["verbalSkill"]); ?>"),
    quantitativeSkill: parseFloat("<?php echo($rows["quantitativeSkill"]); ?>"),
    reasoningSkill: parseFloat("<?php echo($rows["reasoningSkill"]); ?>"),

    femalePercent: parseFloat("<?php echo($rows["femalePercent"]); ?> "),
    salary10: parseInt("<?php echo($rows["salary10thPercentile"]); ?>"),
    salary25: parseInt("<?php echo($rows["salary25thPercentile"]); ?>"),
    salary50: parseInt("<?php echo($rows["salaryMedian"]); ?>"),
    salary75: parseInt("<?php echo($rows["salary75thPercentile"]); ?>"),
    salary90: parseInt("<?php echo($rows["salary90thPercentile"]); ?>"),

    SAT10: parseInt("<?php echo($rows["SAT10thPercentile"]); ?>"),
    SAT25: parseInt("<?php echo($rows["SAT25thPercentile"]); ?>"),
    SAT50: parseInt("<?php echo($rows["SATMedian"]); ?>"),
    SAT75: parseInt("<?php echo($rows["SAT75thPercentile"]); ?>"),
    SAT90: parseInt("<?php echo($rows["SAT90thPercentile"]); ?>"),

    GPA10: parseFloat("<?php echo($rows["purdueGPA10thPercentile"]); ?>"),
    GPA25: parseFloat("<?php echo($rows["purdueGPA25thPercentile"]); ?>"),
    GPA50: parseFloat("<?php echo($rows["purdueGPAMedian"]); ?>"),
    GPA75: parseFloat("<?php echo($rows["purdueGPA75thPercentile"]); ?>"),
    GPA90: parseFloat("<?php echo($rows["purdueGPA90thPercentile"]); ?>"),
    
    description: "<?php echo($rows["description"]); ?>",
  
  });

    </script>
  <?php
 }
     ?>
  <!--  extract occupation character requirement -->
  <?php 
  /* extract occupation character requirement*/
  $sql ="select occupation, occupationGroup, observations, verbalSkill, quantitativeSkill, reasoningSkill, femalePercent, salary10thPercentile, salary25thPercentile, salaryMedian, salary75thPercentile, salary90thPercentile, description from  OccupationCha042016 group by occupation, occupationGroup";//OccupationCha042016
  $result = $link->query($sql);
  if ($result->num_rows <= 0) {
       echo "0 results";
     }
   while($rows = mysqli_fetch_assoc($result))
  {
    ?>
  <script>
  occupation_character_requirement.push({
  occupation: "<?php echo($rows["occupation"]); ?>",
  occupationGroup: "<?php echo($rows["occupationGroup"]); ?>",

  observations: parseInt("<?php echo($rows["observations"]); ?>"),
    verbalSkill: parseFloat("<?php echo($rows["verbalSkill"]); ?>"),
  quantitativeSkill: parseFloat("<?php echo($rows["quantitativeSkill"]); ?>"),
  reasoningSkill: parseFloat("<?php echo($rows["reasoningSkill"]); ?>"),

  femalePercent: parseFloat("<?php echo($rows["femalePercent"]*0.01); ?>"),

  salary10: parseInt("<?php echo($rows["salary10thPercentile"]); ?>"),
  salary25: parseInt("<?php echo($rows["salary25thPercentile"]); ?>"),
  salary50: parseInt("<?php echo($rows["salaryMedian"]); ?>"),
  salary75: parseInt("<?php echo($rows["salary75thPercentile"]); ?>"),
  salary90: parseInt("<?php echo($rows["salary90thPercentile"]); ?>"),
  description: "<?php echo($rows["description"]); ?>",

  });
    </script>
  <?php
 }
     ?>


<script type="text/javascript">

  var margin = { top: 130, right: 0, bottom: 100, left: 150 },
    width = 1800 - margin.left - margin.right,
    height = 2000 - margin.top - margin.bottom,
    gridSize = Math.floor(width / 57),//48
    legendElementWidth = gridSize*2,
    buckets = 9,
    colors = ["#111","#edf8b1","#c7e9b4","#afcdbb","#7fcdbb","#41b6c4","#1d91c0","#19bea8","#20a484","#258b8e"]; // alternatively colorbrewer.YlGnBu[9]
    heatColor = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]; // alternatively colorbrewer.YlGnBu[9]
      
    //for moving things around
    var relevantX = 450;

    var svg = d3.select("#mySVG").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      var color=[];
    for(var i=0; i< occupationautomation.number.length;i++)
    {
      color[i]=calculateVQRcolor(occupationGroup.name[i]);
    }

// below are the old VQR bars

  //create character bars: 1.verbal, quatitative, reasoning

  /*
    var majorVQRBarImage=svg.append("svg:image")
      .attr('x',-80)
      .attr('y',34)
      .attr('width', 200)
      .attr('height', 69)
      .attr("xlink:href","image/verbalSkill.png")
      .attr("id",'verbalSkill');
  majorVQRBarImage=svg.append("svg:image")
      .attr('x',-80)
      .attr('y',104)
      .attr('width', 200)
      .attr('height', 69)
      .attr("xlink:href","image/quantitativeSkill.png")
      .attr("id",'verbalSkill');
  majorVQRBarImage=svg.append("svg:image")
      .attr('x',-80)
      .attr('y',174)
      .attr('width', 200)
      .attr('height', 69)
      .attr("xlink:href","image/reasoningSkill.png")
      .attr("id",'verbalSkill');
  
  majorVQRBarImage=svg.append("svg:image")
      .attr('x',930)
      .attr('y',34)
      .attr('width', 200)
      .attr('height', 69)
      .attr("xlink:href","image/verbalSkill.png")
      .attr("id",'verbalSkill');
  majorVQRBarImage=svg.append("svg:image")
      .attr('x',930)
      .attr('y',104)
      .attr('width', 200)
      .attr('height', 69)
      .attr("xlink:href","image/quantitativeSkill.png")
      .attr("id",'verbalSkill');
  majorVQRBarImage=svg.append("svg:image")
      .attr('x',930)
      .attr('y',174)
      .attr('width', 200)
      .attr('height', 69)
      .attr("xlink:href","image/reasoningSkill.png")
      .attr("id",'verbalSkill');
      */
  


  var majorVQR=[];
  for (var i = 0; i < major_character_requirement.length; i++) {
    majorVQR.push([major_character_requirement[i].verbalSkill,major_character_requirement[i].quantitativeSkill,major_character_requirement[i].reasoningSkill]);
  };
  var occupationVQR=[];
  for (var i = 0; i < occupation_character_requirement.length; i++) {
    occupationVQR.push([occupation_character_requirement[i].verbalSkill,occupation_character_requirement[i].quantitativeSkill,occupation_character_requirement[i].reasoningSkill]);
  };

/*
  var majorVQRBar=svg.selectAll(".majorVQRBar")
                .data(majorVQR)
                .enter().append("g")
                .attr("class","majorVQRBar");

    majorVQRBar.selectAll("rect") // these
        .data( function (d,i,j) { return d; } ) //lines
        .enter() //text displays normally
        .append("rect")
        .attr("x",function (d,i,j) { return 93-160+ d*172; })
        .attr("y",function (d,i,j) { return (i * 70) + 50; })
        .attr("height",function (d,i,j) { return 40;})
        .attr("width",1)
        .style("fill", heatColor[0]);


  var occupationVQRBar=svg.selectAll(".occupationVQRBar")
            .data(occupationVQR)
            .enter().append("g")
            .attr("class","occupationVQRBar");

    occupationVQRBar.selectAll("rect") // these
        .data(function (d,i,j) { return d; } ) //lines
        .enter() //text displays normally
        .append("rect")
        .attr("x",function (d,i,j) { return 943+ d*172; })
        .attr("y",function (d,i,j) { return (i * 70) + 50; })
        .attr("height",function (d,i,j) { return 40;})
        .attr("width",1)
        .style("fill", heatColor[0]);
*/
//old VQR bar ends

    


  
  
  


  //create character bars: 2.sat gpa
  var barRange = [15,25,25,15]

  var initmajorSAT = [];
  var majorSAT10 = 0;
  var majorSAT25=0;
  var majorSAT50=0;
  var majorSAT75=0;
  var majorSAT90=0;
  var majorLength=0
  for (var i = 0; i < major_character_requirement.length; i++) {
    if(major_character_requirement[i].SAT10 != 0){
      majorSAT10+=major_character_requirement[i].SAT10;
      majorSAT25+=major_character_requirement[i].SAT25;
      majorSAT50+=major_character_requirement[i].SAT50;
      majorSAT75+=major_character_requirement[i].SAT75;
      majorSAT90+=major_character_requirement[i].SAT90;
      majorLength++;
    }
    
  };

  majorSAT10=parseInt(majorSAT10/majorLength);
  majorSAT25=parseInt(majorSAT25/majorLength);
  majorSAT50=parseInt(majorSAT50/majorLength);
  majorSAT75=parseInt(majorSAT75/majorLength);
  majorSAT90=parseInt(majorSAT90/majorLength);
  initmajorSAT.push(majorSAT10,majorSAT25, majorSAT50, majorSAT75,majorSAT90);


  var initmajorGPA = [];
  var majorGPA10=0;
  var majorGPA90=0;
  var majorGPA25=0;
  var majorGPA50=0;
  var majorGPA75=0;
  for (var i = 0; i < major_character_requirement.length; i++) {
    if(major_character_requirement[i].GPA10 != 0){
      majorGPA10+=major_character_requirement[i].GPA10;
      majorGPA25+=major_character_requirement[i].GPA25;
      majorGPA50+=major_character_requirement[i].GPA50;
      majorGPA75+=major_character_requirement[i].GPA75;
      majorGPA90+=major_character_requirement[i].GPA90;
    }
  };
  majorGPA10=majorGPA10/majorLength;
  majorGPA25=majorGPA25/majorLength;
  majorGPA50=majorGPA50/majorLength;
  majorGPA75=majorGPA75/majorLength;
  majorGPA90=majorGPA90/majorLength;
  initmajorGPA.push(majorGPA10,majorGPA25, majorGPA50, majorGPA75,majorGPA90);

  var initmajorSalary = [];
  var majorSalary10=0;
  var majorSalary25=0;
  var majorSalary50=0;
  var majorSalary75=0;
  var majorSalary90=0;
  for (var i = 0; i < major_character_requirement.length; i++) {
    if(major_character_requirement[i].salary10 != 0){
      majorSalary10+=major_character_requirement[i].salary10;
      majorSalary25+=major_character_requirement[i].salary25;
      majorSalary50+=major_character_requirement[i].salary50;
      majorSalary75+=major_character_requirement[i].salary75;
      majorSalary90+=major_character_requirement[i].salary90;
    }
  };
  majorSalary10=parseInt(majorSalary10/majorLength);
  majorSalary25=parseInt(majorSalary25/majorLength);
  majorSalary50=parseInt(majorSalary50/majorLength);
  majorSalary75=parseInt(majorSalary75/majorLength);
  majorSalary90=parseInt(majorSalary90/majorLength);
  initmajorSalary.push(majorSalary10,majorSalary25, majorSalary50, majorSalary75,majorSalary90);

  var initoccupationSalary = [];
  var occupationSalary10=0;
  var occupationSalary25=0;
  var occupationSalary50=0;
  var occupationSalary75=0;
  var occupationSalary90=0;
  var occupationLength=0;
  for (var i = 0; i < occupation_character_requirement.length; i++) {
    if(occupation_character_requirement[i].salary10 != 0){
      occupationSalary10+=occupation_character_requirement[i].salary10;
      occupationSalary90+=occupation_character_requirement[i].salary90;
      occupationSalary75+=occupation_character_requirement[i].salary75;
      occupationSalary25+=occupation_character_requirement[i].salary25;
      occupationSalary50+=occupation_character_requirement[i].salary50;
      occupationLength++;
    }
  };
  occupationSalary10=parseInt(occupationSalary10/occupationLength);
  occupationSalary25=parseInt(occupationSalary25/occupationLength);
  occupationSalary50=parseInt(occupationSalary50/occupationLength);
  occupationSalary75=parseInt(occupationSalary75/occupationLength);
  occupationSalary90=parseInt(occupationSalary90/occupationLength);
  initoccupationSalary.push(occupationSalary10,occupationSalary25, occupationSalary50, occupationSalary75,occupationSalary90);


//left part start

  //SAT
  var SAT_relevantX = accordion_bar_xl-130;
  var SAT_relevantY = accordion_bar_y+23;

  
  
  var majorSATbar = svg.selectAll(".majorSATbar")
                       .data(barRange)
                       .enter().append("g")
                       .attr("class","majorSATbar");

  chart_name.push("SAT");
  chart_class_name.push(".majorSATbar");
  chart_img_id.push("SAT_image");
  chart_y.push(0);
  chart_subclass_name.push("");
  chart_sub_y.push(NaN);
  chart_text_y.push(NaN);

  majorSATbar.append("rect")
             .attr("x",function (d,i) { 
              return SAT_relevantX + (initmajorSAT[i]-800)*0.265;//0.265 is the scale of length
             })
             .attr("y",function (d,i) {
              return SAT_relevantY - d*1.5;})
             .attr("height",function (d,i) {
              return d*1.5;
             })
             .attr("width",function(d,i){
              return (initmajorSAT[i+1]-initmajorSAT[i])*0.265;
             })
             .style("fill", function (d,i) {return heatColor[i+3];})
             .attr("visibility","hidden");

 majorSATbar.append("svg:image")
            .attr('x', SAT_relevantX)
            .attr('y', function(d,i){ return SAT_relevantY - 100;})
            .attr('width', 250)
            .attr('height', 141)
            .attr("xlink:href","image/SAT.png")
            .attr("id",'SAT_image')
            .attr("visibility","hidden");


  //GPA
  var GPA_relevantX = accordion_bar_xl-130;
  var GPA_relevantY = accordion_bar_y+63;

  var majorGPAbar = svg.selectAll(".majorGPAbar")
                        .data(barRange)
                        .enter().append("g")
                        .attr("class","majorGPAbar");

  chart_name.push("GPA");
  chart_class_name.push(".majorGPAbar");
  chart_img_id.push("GPA_image");
  chart_y.push(0);
  chart_subclass_name.push("");
  chart_sub_y.push(NaN);
  chart_text_y.push(NaN);

  majorGPAbar.append("rect")
              .attr("x",function (d,i) { 
                return GPA_relevantX+ (initmajorGPA[i]-2.0)*90;//0.265 is the scale of length
              })
              .attr("y",function (d,i) {
                return GPA_relevantY -d*1.5;})
              .attr("height",function (d,i) {
                return d*1.5;
                })
              .attr("width",function(d,i){
                return (initmajorGPA[i+1]-initmajorGPA[i])*90;
              })
              .style("fill", function (d,i) {return heatColor[i+3]})
              .attr("visibility","hidden");

  majorGPAbar.append("svg:image")
              .attr('x',GPA_relevantX)
              .attr('y',function(d,i){return GPA_relevantY - 100;})
              .attr('width', 250)
              .attr('height', 141)
              .attr("xlink:href","image/GPA.png")
              .attr("id",'GPA_image')
              .attr("visibility","hidden");

  //Major Salary
  var MSalary_relevantX = accordion_bar_xl-130;
  var MSalary_relevantY = accordion_bar_y + 103;

  var majorSalarybar = svg.selectAll(".majorSalarybar")
                          .data(barRange)
                          .enter().append("g")
                          .attr("class","majorSalarybar");

  chart_name.push("Salary");
  chart_class_name.push(".majorSalarybar");
  chart_img_id.push("MSalary_image");
  chart_y.push(0);
  chart_subclass_name.push("");
  chart_sub_y.push(NaN);
  chart_text_y.push(NaN);

  majorSalarybar.append("rect")
                .attr("x",function (d,i) {
                  return MSalary_relevantX+ (initmajorSalary[i]-10000)*0.0023;//0.0023 is the scale
                })
                .attr("y",function (d,i) {
                  return MSalary_relevantY -d*1.5;;})
                .attr("height",function (d,i) {
                  return d*1.5;;})
                .attr("width",function(d,i){
                  return (initmajorSalary[i+1]-initmajorSalary[i])*0.0023;
                })
                .style("fill", function (d,i) {return heatColor[i+3]})
                .attr("visibility","hidden");

  majorSalarybar.append("svg:image")
                .attr('x',MSalary_relevantX)
                .attr('y',function(d,i){ return MSalary_relevantY - 100;})
                .attr('width', 250)
                .attr('height', 141)
                .attr("xlink:href","image/salary.png")
                .attr("id",'MSalary_image')
                .attr("visibility","hidden");


  for(var j = 3; j < 10 ; j++)
  {
    chart_name.push("");
    chart_class_name.push("");
    chart_img_id.push("");
    chart_y.push(NaN);
    chart_subclass_name.push("");
    chart_sub_y.push(NaN);
    chart_text_y.push(NaN);
    // accordion_bar.select("accordion_bar_" + i).style("visibility","hidden");
  }

//left part end

//right part start

//Occupation Salary
  var OSalary_relevantX = accordion_bar_xr - 130;
  var OSalary_relevantY = accordion_bar_y ;//+23

  var occupationSalarybar=svg.selectAll(".occupationSalarybar")
        .data(barRange)
                .enter().append("g")
                .attr("class","occupationSalarybar");

  chart_name.push("Salary");
  chart_class_name.push(".occupationSalarybar");
  chart_img_id.push("OSalary_image");
  chart_y.push(0);
  chart_subclass_name.push("");
  chart_sub_y.push(NaN);
  chart_text_y.push(NaN);

  occupationSalarybar.append("rect")
                      .attr("x",function (d,i) {
                        return OSalary_relevantX +(initoccupationSalary[i] -10000)*0.0023;;
                      })
                      .attr("y",function (d,i) {
                        return OSalary_relevantY - d*1.5;})
                      .attr("height",function (d,i) {
                        return d*1.5
                      ;})
                      .attr("width",function(d,i){
                        return (initoccupationSalary[i+1]-initoccupationSalary[i])*0.0023;
                      })
                      .style("fill", function (d,i) {return heatColor[i+3]})
                      .attr("visibility","hidden");

  occupationSalarybar.append("svg:image")
                      .attr('x',OSalary_relevantX)
                      .attr('y',function(d,i){return OSalary_relevantY - 100;})
                      .attr('width', 250)
                      .attr('height', 141)
                      .attr("xlink:href","image/salary.png")
                      .attr("id",'OSalary_image')
                      .attr("visibility","hidden");

    var collegeColor=[];
    var occupationGroupColor=[];
    var ifCollege = true;
    for (var i = 0; i < college.name.length; i++) {
      collegeColor.push(calculateVQRcolor(college.name[i]));
    }
    
    for (var i = 0; i < occupationGroup.name.length; i++) {
      ifCollege = false;
      occupationGroupColor.push(calculateVQRcolor(occupationGroup.name[i]));
    }






      //Create occupationautomation element
      var w = 250;
      var h = 100;
      var barPadding = 1;
    
      var OA = svg.selectAll(".OA")
         .data(occupationautomation.number)
         .enter().append("g")
         .attr("class","OA");

         OA.append("rect")
         .attr("id",function (d,i) {return "occupationautomationid"+i;})
         //.attr("opacity",0.0)
         .attr("visibility","hidden")
         .attr("x", function(d, i) {
            return chart_base_x+i * (w / occupationautomation.number.length);
         })
         .attr("y", function(d) {
            return chart_base_y - (d * 1);
         })
         .attr("width", w / occupationautomation.number.length - 1)
         .attr("height", function(d) {
            return d * 1;
         })
         .attr("fill", function(d,i) {
          return color[i];
         })
         .append("title")
         .text(function(d,i) {
         return occupationautomation.name[i]+":"+occupationautomation.number[i]+"%";
         })
        .on("mouseover", function() {
            d3.select(this)
              .attr("fill", "orange");
         })
         .on("mouseout", function(d,i) {
           d3.select(this)
              .transition()
              .duration(250)
            .attr("fill", color[i]);
         });
         //console.log(occupationautomation.name[1]);
         // zzchart.push(".OA");
         // zzchart_y.push(0);

         OA.append("text")
         .text("Occupation automation Sensitivity")
         .attr("visibility","hidden")
         .attr("x",  chart_base_x)
         .attr("y", chart_base_y+30)
         .attr("font-family", "sans-serif")
         .attr("font-size", "15px")
         .attr("fill", "gray");
         // zzcharttext_y.push(0);


//Create suboccupationautomation element
      var w = 250;
      var h = 100;
      var barPadding = 1;
    
      var OSA = svg.selectAll(".OSA")
         .data(automation.number)
         .enter().append("g")
         .attr("class","OSA");

         OSA.append("rect")
         .attr("id",function (d,i) {return "occupationsubautomationid"+i;})
         .attr("visibility","hidden")
         .attr("x", function(d, i) {
            return chart_base_x+i * (w / automation.number.length);
         })
         .attr("y", function(d) {
            return chart_base_y - (d * 0)
            })
         .attr("height", function(d) {
            return d * 0;
         }) 
         .append("title")
         .text(function(d,i) {
          //console.log(automation.name[i]);
         return automation.name[i]+":"+automation.number[i]+"%";
         })
         .attr("width", w / automation.number.length - 1)
         .attr("fill", function(d,i) {
          return "orange";
         });
         // zzsubchart.push(".OSA");
         // zzsubchart_y.push(0);


        chart_name.push("Automation");
        chart_class_name.push(".OA");
        chart_img_id.push("");
        chart_y.push(0);
        chart_subclass_name.push(".OSA");
        chart_sub_y.push(0);
        chart_text_y.push(0);
         

//OG
      var OG = svg.selectAll(".OG")
         .data(occupationglobalization.number)
         .enter().append("g")
         .attr("class","OG");

         OG.append("rect")
         .attr("id",function (d,i) {return "occupationglobalizationid"+i;})
         .attr("visibility","hidden")
         .attr("x", function(d, i) {
            return chart_base_x+i * (w / occupationglobalization.number.length);
         })
         .attr("y", function(d) {
          if(d<0) return chart_base_y+(accordion_bar_height+5)*1-40;
            return chart_base_y+(accordion_bar_height+5)*1-40 - (d * 0.5);
         })
         .attr("width", w / occupationglobalization.number.length - 1)
         .attr("height", function(d) {
          if(d<0) return d * (-0.5);
            return d * 0.5;
         })
         
         .attr("fill", function(d,i) {
          return color[i];
         })
         .append("title")
         .text(function(d,i) {
         return occupationglobalization.name[i]+":"+occupationglobalization.number[i]+"%";
         });
         // zzchart.push(".OG");
         // zzchart_y.push(0);

        OG.append("text")
         .text("Occupation Globalization Sensitivity")
         .attr("visibility","hidden")
         .attr("x",  chart_base_x-10)
         .attr("y", chart_base_y+1*(accordion_bar_height+5)+30)
         .attr("font-family", "sans-serif")
         .attr("font-size", "15px")
         .attr("fill", "gray");
         // zzcharttext_y.push(0);



//Create suboccupationglobalization element
      var w = 250;
      var h = 100;
      var barPadding = 1;
    
      var OSG = svg.selectAll(".OSG")
         .data(globalization.number)
         .enter().append("g")
         .attr("class","OSG");

         OSG.append("rect")
         .attr("id",function (d,i) {return "occupationsubglobalizationid"+i;})
         .attr("visibility","hidden")
         .attr("x", function(d, i) {
            return chart_base_x+i * (w / globalization.number.length);
         })
         .attr("y", function(d) {

            return chart_base_y+(accordion_bar_height+5)*1-40 ;
            })
         .attr("height", function(d) {
            
            return d * 0;
         }) 
         .attr("width", w / globalization.number.length - 1)
         
         .attr("fill", function(d,i) {
          return "orange";
         })
         .append("title")
         .text(function(d,i) {
         return globalization.name[i]+":"+globalization.number[i]+"%";
         });
         // zzsubchart.push(".OSG");
         // zzsubchart_y.push(0);
        chart_name.push("Globalization");
        chart_class_name.push(".OG");
        chart_img_id.push("");
        chart_y.push(0);
        chart_subclass_name.push(".OSG");
        chart_sub_y.push(0);
        chart_text_y.push(0);


//OM
      var OM = svg.selectAll(".OM")
         .data(occupationmarried.number)
         .enter().append("g")
         .attr("class","OM");

         OM.append("rect")
         .attr("id",function (d,i) {return "occupationmarriedid"+i;})
         .attr("visibility","hidden")
         .attr("x", function(d, i) {
            return chart_base_x+i * (w / occupationmarried.number.length);
         })
         .attr("y", function(d) {
          if(d<0) return chart_base_y+(accordion_bar_height+5)*2;
            return chart_base_y+(accordion_bar_height+5)*2 - (d * 0.5);
         })
         .attr("width", w / occupationmarried.number.length - 1)
         .attr("height", function(d) {
          if(d<0) return d * (-0.5);
            return d * 0.5;
         })
         
         .attr("fill", function(d,i) {
          return color[i];
         })
         .append("title")
         .text(function(d,i) {
         return occupationmarried.name[i]+":"+occupationmarried.number[i]+"%";
         });
         // zzchart.push(".OM");
         // zzchart_y.push(0);
        OM.append("text")
         .text("Occupation marriedPercentAge30to50")
         .attr("visibility","hidden")
         .attr("x",  chart_base_x)
         .attr("y", chart_base_y+2*(accordion_bar_height+5)+30)
         .attr("font-family", "sans-serif")
         .attr("font-size", "15px")
         .attr("fill", "gray");
         // zzcharttext_y.push(0);

//OSM
    
      var OSM = svg.selectAll(".OSM")
         .data(married.number)
         .enter().append("g")
         .attr("class","OSM");

         OSM.append("rect")
         .attr("id",function (d,i) {return "occupationsubmairredid"+i;})
         .attr("visibility","hidden")
         .attr("x", function(d, i) {
            return chart_base_x+i * (w / married.number.length);
         })
         .attr("y", function(d) {
          if(d<0) return chart_base_y+(accordion_bar_height+5)*2;
            return chart_base_y+(accordion_bar_height+5)*2 - (d * 0);
            })
         .attr("height", function(d) {
            if(d<0) return d * (-0);
            return d * 0;
         }) 
         
         .attr("fill", function(d,i) {
          return "orange";
         })
         .attr("width", w / married.number.length - 1)
         .append("title")
         .text(function(d,i) {
         return married.name[i]+":"+married.number[i]+"%";
         });
         // zzsubchart.push(".OSM");
         // zzsubchart_y.push(0);
        chart_name.push("Married Percentage");
        chart_class_name.push(".OM");
        chart_img_id.push("");
        chart_y.push(0);
        chart_subclass_name.push(".OSM");
        chart_sub_y.push(0);
        chart_text_y.push(0);

//Oblack
      var Oblack = svg.selectAll(".Oblack")
         .data(occupationblackPercent.number)
         .enter().append("g")
         .attr("class","Oblack");

         Oblack.append("rect")
         .attr("id",function (d,i) {return "occupationblackPercentid"+i;})
         .attr("visibility","hidden")
         .attr("x", function(d, i) {
            return chart_base_x+i * (w / occupationblackPercent.number.length);
         })
         .attr("y", function(d) {
          if(d<0) return chart_base_y+(accordion_bar_height+5)*3;
            return chart_base_y+(accordion_bar_height+5)*3 - (d * 2);
         })
         .attr("width", w / occupationblackPercent.number.length - 1)
         .attr("height", function(d) {
          if(d<0) return d * (-2);
            return d * 2;
         })
         
         .attr("fill", function(d,i) {
          return color[i];
         })
         .append("title")
         .text(function(d,i) {
         return occupationblackPercent.name[i]+":"+occupationblackPercent.number[i]+"%";
         });
         // zzchart.push(".Oblack");
         // zzchart_y.push(0);

          Oblack.append("text")
         .text("Occupation occupationblackPercent")
         .attr("visibility","hidden")
         .attr("x",  chart_base_x)
         .attr("y", chart_base_y+3*(accordion_bar_height+5)+30)
         .attr("font-family", "sans-serif")
         .attr("font-size", "15px")
         .attr("fill", "gray");
         // zzcharttext_y.push(0);
//OSblack
      var OSblack = svg.selectAll(".OSblack")
         .data(blackPercent.number)
         .enter().append("g")
         .attr("class","OSblack");

         OSblack.append("rect")
         .attr("id",function (d,i) {return "occupationsubblackPercentid"+i;})
         .attr("visibility","hidden")
         .attr("x", function(d, i) {
            return chart_base_x+i * (w / blackPercent.number.length);
         })
         .attr("y", function(d) {
          if(d<0) return chart_base_y+(accordion_bar_height+5)*3;
            return chart_base_y+(accordion_bar_height+5)*3 - (d * 0);
         })
         .attr("width", w / blackPercent.number.length - 1)
         .attr("height", function(d) {
          if(d<0) return d * (-0);
            return d * 0;
         })
         
         .attr("fill", function(d,i) {
          return "orange";
         })
         .append("title")
         .text(function(d,i) {
         return blackPercent.name[i]+":"+blackPercent.number[i]+"%";
         });
         // zzsubchart.push(".OSblack");
         // zzsubchart_y.push(0);

        chart_name.push("African American Percentage");
        chart_class_name.push(".Oblack");
        chart_img_id.push("");
        chart_y.push(0);
        chart_subclass_name.push(".OSblack");
        chart_sub_y.push(0);
        chart_text_y.push(0);


//Oasian
      var Oasian = svg.selectAll(".Oasian")
         .data(occupationasianPercent.number)
         .enter().append("g")
         .attr("class","Oasian");

         Oasian.append("rect")
         .attr("id",function (d,i) {return "occupationasianPercentid"+i;})
         .attr("visibility","hidden")
         .attr("x", function(d, i) {
            return chart_base_x+i * (w / occupationasianPercent.number.length);
         })
         .attr("y", function(d) {
          if(d<0) return 730;
            return chart_base_y+(accordion_bar_height+5)*4 - (d * 2);
         })
         .attr("width", w / occupationasianPercent.number.length - 1)
         .attr("height", function(d) {
          if(d<0) return d * (-2);
            return d * 2;
         })
         
         .attr("fill", function(d,i) {
          return color[i];
         })
         .append("title")
         .text(function(d,i) {
         return occupationasianPercent.name[i]+":"+occupationasianPercent.number[i]+"%";
         });
         // zzchart.push(".Oasian");
         // zzchart_y.push(0);
        Oasian.append("text")
         .text("Occupation occupationasianPercent")
         .attr("visibility","hidden")
         .attr("x",  chart_base_x)
         .attr("y", chart_base_y+4*(accordion_bar_height+5)+30)
         .attr("font-family", "sans-serif")
         .attr("font-size", "15px")
         .attr("fill", "gray");
         // zzcharttext_y.push(0);
//OSasian
      var OSasian = svg.selectAll(".OSasian")
         .data(asianPercent.number)
         .enter().append("g")
         .attr("class","OSasian");

         OSasian.append("rect")
         .attr("id",function (d,i) {return "occupationsubasianPercentid"+i;})
         .attr("visibility","hidden")
         .attr("x", function(d, i) {
            return chart_base_x+i * (w / asianPercent.number.length);
         })
         .attr("y", function(d) {
          if(d<0) return 730;
            return chart_base_y+(accordion_bar_height+5)*4 - (d * 0);
         })
         .attr("width", w / asianPercent.number.length - 1)
         .attr("height", function(d) {
          if(d<0) return d * (-0);
            return d * 0;
         })
         .attr("fill", function(d,i) {
          return "orange";
         })
         .append("title")
         .text(function(d,i) {
         return asianPercent.name[i]+":"+asianPercent+"%";
         });
 
         // zzsubchart.push(".OSasian");
         // zzsubchart_y.push(0);  

        chart_name.push("Asian Percentage");
        chart_class_name.push(".Oasian");
        chart_img_id.push("");
        chart_y.push(0);
        chart_subclass_name.push(".OSasian");
        chart_sub_y.push(0);
        chart_text_y.push(0);

//Ohispanic
      var Ohispanic = svg.selectAll(".Ohispanic")
         .data(occupationhispanicPercent.number)
         .enter().append("g")
         .attr("class","Ohispanic");

         Ohispanic.append("rect")
         .attr("id",function (d,i) {return "occupationhispanicPercentid"+i;})
         .attr("visibility","hidden")
         .attr("x", function(d, i) {
            return chart_base_x+i * (w / occupationhispanicPercent.number.length);
         })
         .attr("y", function(d) {
          if(d<0) return 730;
            return chart_base_y+(accordion_bar_height+5)*5 - (d * 2);
         })
         .attr("width", w / occupationhispanicPercent.number.length - 1)
         .attr("height", function(d) {
          if(d<0) return d * (-2);
            return d * 2;
         })
         .attr("fill", function(d,i) {
          return color[i];
         })
         .append("title")
         .text(function(d,i) {
         return occupationhispanicPercent.name[i]+":"+occupationhispanicPercent.number[i]+"%";
         });
         // zzchart.push(".Oasian");
         // zzchart_y.push(0);
        Ohispanic.append("text")
         .text("Occupation occupationhispanicPercent")
         .attr("visibility","hidden")
         .attr("x",  chart_base_x)
         .attr("y", chart_base_y+5*(accordion_bar_height+5)+30)
         .attr("font-family", "sans-serif")
         .attr("font-size", "15px")
         .attr("fill", "gray");
         // zzcharttext_y.push(0);
//OShispanic
      var OShispanic = svg.selectAll(".OShispanic")
         .data(hispanicPercent.number)
         .enter().append("g")
         .attr("class","OShispanic");

         OShispanic.append("rect")
         .attr("id",function (d,i) {return "occupationsubhispanicPercentid"+i;})
         .attr("visibility","hidden")
         .attr("x", function(d, i) {
            return chart_base_x+i * (w / hispanicPercent.number.length);
         })
         .attr("y", function(d) {
          if(d<0) return 730;
            return chart_base_y+(accordion_bar_height+5)*5 - (d * 0);
         })
         .attr("width", w / hispanicPercent.number.length - 1)
         .attr("height", function(d) {
          if(d<0) return d * (-0);
            return d * 0;
         })
         .attr("fill", function(d,i) {
          return "orange";
         })
         .append("title")
         .text(function(d,i) {
         return hispanicPercent.name[i]+":"+hispanicPercent.number[i]+"%";
         });
 
         // zzsubchart.push(".OSasian");
         // zzsubchart_y.push(0);  

        chart_name.push("Hispanic Percentage");
        chart_class_name.push(".Ohispanic");
        chart_img_id.push("");
        chart_y.push(0);
        chart_subclass_name.push(".OShispanic");
        chart_sub_y.push(0);
        chart_text_y.push(0);



//Ofemale
      var Ofemale = svg.selectAll(".Ofemale")
         .data(occupationfemalePercent.number)
         .enter().append("g")
         .attr("class","Ofemale");

         Ofemale.append("rect")
         .attr("id",function (d,i) {return "occupationfemalePercentid"+i;})
         .attr("visibility","hidden")
         .attr("x", function(d, i) {
            return chart_base_x+i * (w / occupationfemalePercent.number.length);
         })
         .attr("y", function(d) {
          if(d<0) return 730;
            return chart_base_y+(accordion_bar_height+5)*6 - (d * 0.5);
         })
         .attr("width", w / occupationfemalePercent.number.length - 1)
         .attr("height", function(d) {
          if(d<0) return d * (-0.5);
            return d * 0.5;
         })
         .attr("fill", function(d,i) {
          return color[i];
         })
         .append("title")
         .text(function(d,i) {
         return occupationfemalePercent.name[i]+":"+occupationfemalePercent.number[i]+"%";
         });
         // zzchart.push(".Oasian");
         // zzchart_y.push(0);
        Ofemale.append("text")
         .text("Occupation occupationfemalePercent")
         .attr("visibility","hidden")
         .attr("x",  chart_base_x)
         .attr("y", chart_base_y+6*(accordion_bar_height+5)+30)
         .attr("font-family", "sans-serif")
         .attr("font-size", "15px")
         .attr("fill", "gray");
         // zzcharttext_y.push(0);
//OSfemale
      var OSfemale = svg.selectAll(".OSfemale")
         .data(femalePercent.number)
         .enter().append("g")
         .attr("class","OSfemale");

         OSfemale.append("rect")
         .attr("id",function (d,i) {return "occupationsubfemalePercentid"+i;})
         .attr("visibility","hidden")
         .attr("x", function(d, i) {
            return chart_base_x+i * (w / femalePercent.number.length);
         })
         .attr("y", function(d) {
          if(d<0) return 730;
            return chart_base_y+(accordion_bar_height+5)*6 - (d * 0);
         })
         .attr("width", w / femalePercent.number.length - 1)
         .attr("height", function(d) {
          if(d<0) return d * (-0);
            return d * 0;
         })
         .attr("fill", function(d,i) {
          return "orange";
         })
         .append("title")
         .text(function(d,i) {
         return femalePercent.name[i]+":"+femalePercent.number[i]+"%";
         });
 
         // zzsubchart.push(".OSasian");
         // zzsubchart_y.push(0);  

        chart_name.push("Female Percentage");
        chart_class_name.push(".Ofemale");
        chart_img_id.push("");
        chart_y.push(0);
        chart_subclass_name.push(".OSfemale");
        chart_sub_y.push(0);
        chart_text_y.push(0);

//OforeignBorn
      var OforeignBorn = svg.selectAll(".OforeignBorn")
         .data(occupationforeignBornPercent.number)
         .enter().append("g")
         .attr("class","OforeignBorn");

         OforeignBorn.append("rect")
         .attr("id",function (d,i) {return "occupationforeignBornPercentid"+i;})
         .attr("visibility","hidden")
         .attr("x", function(d, i) {
            return chart_base_x+i * (w / occupationforeignBornPercent.number.length);
         })
         .attr("y", function(d) {
          if(d<0) return 730;
            return chart_base_y+(accordion_bar_height+5)*7 - (d * 2);
         })
         .attr("width", w / occupationforeignBornPercent.number.length - 1)
         .attr("height", function(d) {
          if(d<0) return d * (-2);
            return d * 2;
         })
         .attr("fill", function(d,i) {
          return color[i];
         })
         .append("title")
         .text(function(d,i) {
         return occupationforeignBornPercent.name[i]+":"+occupationforeignBornPercent.number[i]+"%";
         });
         // zzchart.push(".Oasian");
         // zzchart_y.push(0);
        OforeignBorn.append("text")
         .text("Occupation occupationforeignBornPercent")
         .attr("visibility","hidden")
         .attr("x",  chart_base_x)
         .attr("y", chart_base_y+7*(accordion_bar_height+5)+30)
         .attr("font-family", "sans-serif")
         .attr("font-size", "15px")
         .attr("fill", "gray");
         // zzcharttext_y.push(0);
//OSforeignBorn
      var OSforeignBorn = svg.selectAll(".OSforeignBorn")
         .data(foreignBornPercent.number)
         .enter().append("g")
         .attr("class","OSforeignBorn");

         OSforeignBorn.append("rect")
         .attr("id",function (d,i) {return "occupationsubforeignBornPercentid"+i;})
         .attr("visibility","hidden")
         .attr("x", function(d, i) {
            return chart_base_x+i * (w / foreignBornPercent.number.length);
         })
         .attr("y", function(d) {
          if(d<0) return 730;
            return chart_base_y+(accordion_bar_height+5)*7 - (d * 0);
         })
         .attr("width", w / foreignBornPercent.number.length - 1)
         .attr("height", function(d) {
          if(d<0) return d * (-0);
            return d * 0;
         })
         .attr("fill", function(d,i) {
          return "orange";
         })
         .append("title")
         .text(function(d,i) {
         return foreignBornPercent.name[i]+":"+foreignBornPercent.number[i]+"%";
         });
 
         // zzsubchart.push(".OSasian");
         // zzsubchart_y.push(0);  

        chart_name.push("ForeignBorn Percentage");
        chart_class_name.push(".OforeignBorn");
        chart_img_id.push("");
        chart_y.push(0);
        chart_subclass_name.push(".OSforeignBorn");
        chart_sub_y.push(0);
        chart_text_y.push(0);

//OaverageHoursOfWorkOrWeek
      var OaverageHoursOfWorkOrWeek = svg.selectAll(".OaverageHoursOfWorkOrWeek")
         .data(occupationaverageHoursOfWorkOrWeek.number)
         .enter().append("g")
         .attr("class","OaverageHoursOfWorkOrWeek");

         OaverageHoursOfWorkOrWeek.append("rect")
         .attr("id",function (d,i) {return "occupationaverageHoursOfWorkOrWeekid"+i;})
         .attr("visibility","hidden")
         .attr("x", function(d, i) {
            return chart_base_x+i * (w / occupationaverageHoursOfWorkOrWeek.number.length);
         })
         .attr("y", function(d) {
          if(d<0) return 730;
            return chart_base_y+(accordion_bar_height+5)*8 - (d * 1);
         })
         .attr("width", w / occupationaverageHoursOfWorkOrWeek.number.length - 1)
         .attr("height", function(d) {
          if(d<0) return d * (-1);
            return d * 1;
         })
         .attr("fill", function(d,i) {
          return color[i];
         })
         .append("title")
         .text(function(d,i) {
         return occupationaverageHoursOfWorkOrWeek.name[i]+":"+occupationaverageHoursOfWorkOrWeek.number[i]+"%";
         });
         // zzchart.push(".Oasian");
         // zzchart_y.push(0);
        OaverageHoursOfWorkOrWeek.append("text")
         .text("Occupation occupationaverageHoursOfWorkOrWeek")
         .attr("visibility","hidden")
         .attr("x",  chart_base_x)
         .attr("y", chart_base_y+8*(accordion_bar_height+5)+30)
         .attr("font-family", "sans-serif")
         .attr("font-size", "15px")
         .attr("fill", "gray");
         // zzcharttext_y.push(0)//OSaverageHoursOfWorkOrWeek
      var OSaverageHoursOfWorkOrWeek = svg.selectAll(".OSaverageHoursOfWorkOrWeek")
         .data(averageHoursOfWorkOrWeek.number)
         .enter().append("g")
         .attr("class","OSaverageHoursOfWorkOrWeek");

         OSaverageHoursOfWorkOrWeek.append("rect")
         .attr("id",function (d,i) {return "occupationsubaverageHoursOfWorkOrWeekid"+i;})
         .attr("visibility","hidden")
         .attr("x", function(d, i) {
            return chart_base_x+i * (w / averageHoursOfWorkOrWeek.number.length);
         })
         .attr("y", function(d) {
          if(d<0) return 730;
            return chart_base_y+(accordion_bar_height+5)*8 - (d * 0);
         })
         .attr("width", w / averageHoursOfWorkOrWeek.number.length - 1)
         .attr("height", function(d) {
          if(d<0) return d * (-0);
            return d * 0;
         })
         .attr("fill", function(d,i) {
          return "orange";
         })
         .append("title")
         .text(function(d,i) {
         return averageHoursOfWorkOrWeek.name[i]+":"+averageHoursOfWorkOrWeek.number[i] +"%";
         });
 
         // zzsubchart.push(".OSasian");
         // zzsubchart_y.push(0);  

        chart_name.push("AverageHoursOfWorkOrWeek");
        chart_class_name.push(".OaverageHoursOfWorkOrWeek");
        chart_img_id.push("");
        chart_y.push(0);
        chart_subclass_name.push(".OSaverageHoursOfWorkOrWeek");
        chart_sub_y.push(0);
        chart_text_y.push(0);

  
    //main part construction
  var collegePercent = calculatePercentage(college.number);
  var occupationGroupPercent = calculatePercentage(occupationGroup.number);
  









  //create initial college bar
  var minn = 10;//minimum size of bar
  var collegeX = []; // in fact it's Y
  collegeX[0]=20;//leftover
  var collegeWidth = []; // actually it's height
  gap = 2;
  cscale=(620-minn*college.name.length -(college.name.length-1)*gap)/math.sum(college.number);

  initX(college, collegeX, collegeWidth,cscale);  
        
    var collegeMainbar=svg.selectAll(".collegeMainbar")
        .data(college.name)
        .enter().append("g")
        .attr("class","collegeMainbar");

    collegeMainbar.append("rect")
        .attr("x",relevantX)
        .attr("y",function (d,i) {return collegeX[i];})

        .attr("height",function (d,i) {return collegeWidth[i];})
        .attr("width",30)
        .attr("id",function (d,i) {return college.name[i];})
        .style("fill", function (d,i) {return collegeColor[i];})
        .style("opacity",1)
        .on("click", clickOnCollegeMainbar)
        .on("mouseover",function(d,i){
          var pathID=this.id.replace(/\s/g,'').replace(/','/g,'');
          d3.selectAll("polygon[id="+pathID+"]").style("fill-opacity",1.0);
          d3.select(this).style("cursor", "pointer");
        })
        .on("mouseout",function(d,i){
          var pathID=this.id.replace(/\s/g,'').replace(/','/g,'');
          d3.selectAll("polygon").style("fill-opacity",0.4);
        });


    collegeMainbar.append("text")
        .attr("class","collegeMainbar")
        .text( function (d,i) {return d+"           ("+collegePercent[i]+")";})
        .attr("id",function (d,i) {return college.name[i];})
        .attr("x", relevantX-5)
        .attr("y", function (d,i) {
          return collegeX[i] + collegeWidth[i]/2;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .style("font-size", 14)
        .attr("fill", colors[0])
        .on("click", clickOnCollegeMainbar)
        .on("mouseover",function(d,i){
          var pathID=this.id.replace(/\s/g,'').replace(/','/g,'');
      d3.selectAll("polygon[id="+pathID+"]").style("fill-opacity",1.0);
      d3.select(this).style("cursor", "pointer");
        })
        .on("mouseout",function(d,i){
          var pathID=this.id.replace(/\s/g,'').replace(/','/g,'');
          d3.selectAll("polygon").style("fill-opacity",0.4);
        });
      
      var collegeName = collegeMainbar.append("g")
          .attr("class","collegeName");


    //create initial occupation bar
  var occupationGroupX = [];
  occupationGroupX[0]=20;//leftover or upover
  var occupationGroupWidth = [];
  ogscale=(620-minn*occupationGroup.name.length -(occupationGroup.name.length-1)*gap)/math.sum(occupationGroup.number);
  initX(occupationGroup, occupationGroupX, occupationGroupWidth, ogscale);
    var occupationMainbar=svg.selectAll(".occupationMainbar")
        .data(occupationGroup.name)
        .enter().append("g")
        .attr("class","occupationMainbar");

    occupationMainbar.append("rect")
        .attr("x",relevantX + 290)
        .attr("y",function (d,i) {return occupationGroupX[i];})
        .attr("height",function (d,i) {return occupationGroupWidth[i];})
        .attr("width",30)
        .attr("id",function (d,i) {return occupationGroup.name[i];})
        .style("fill", function (d,i) {return occupationGroupColor[i];})
        .style("opacity",1)
        .on("click", clickOnOccupationMainbar)
        .on("mouseover",function(d,i){
          var pathID=this.id.replace(/\s/g,'').replace(/','/g,'');
          d3.selectAll("polygon[ogid="+pathID+"]").style("fill-opacity",1.0);
          d3.select(this).style("cursor", "pointer");
        })
        .on("mouseout",function(d,i){
          var pathID=this.id.replace(/\s/g,'').replace(/','/g,'');
      d3.selectAll("polygon").style("fill-opacity",0.4);
        });


    occupationMainbar.append("text")
        .attr("class","occupationMainbar")
        .text( function (d,i) {return "("+occupationGroupPercent[i]+")"+d;})
        .attr("x", relevantX + 327)
        .attr("y", function (d,i) {
          return occupationGroupX[i]+ occupationGroupWidth[i]/2;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .attr("id",function (d,i) {return occupationGroup.name[i];})
        .style("font-size", 13)
        .attr("fill", colors[0])
        .on("click", clickOnOccupationMainbar)
        .on("mouseover",function(d,i){
          var pathID=this.id.replace(/\s/g,'').replace(/','/g,'');
      d3.selectAll("polygon[ogid="+pathID+"]").style("fill-opacity",1.0);
      d3.select(this).style("cursor", "pointer");
        })
        .on("mouseout",function(d,i){
          var pathID=this.id.replace(/\s/g,'').replace(/','/g,'');
      d3.selectAll("polygon").style("fill-opacity",0.4);
        });
      var occupationName = occupationMainbar.append("g")
          .attr("class","occupationName");

  //Collapse option icon
  var collapseButtonData=[0,1];
  var collapseButton=svg.selectAll(".collapseButton")
    .data(collapseButtonData)
        .enter().append("g");


    var collegeCollapseButton=svg.selectAll(".collegeCollapseButton")
      .data(collapseButtonData)
      .enter().append("g");
    collegeCollapseButton.append("svg:image")
      .attr("class","collegeCollapseButton")
    .attr('x',relevantX)
    .attr('y',-20)
    .attr('width', 30)
    .attr('height', 30)
    .attr("xlink:href","image/up-arrow-circle-md.png")
    .attr("id",'college')
    .on("click", collapseToMainbar)
    .on("mouseover",function(d){d3.select(this).style("cursor", "pointer");});
  collegeCollapseButton.append("text")
        .attr("class","collegeCollapseButton")
        .text("Back")
        .attr("x", relevantX-33)
        .attr("y", -5)
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("font-size", 16)
        .attr("fill", "#AAAAAA");


  var occupationCollapseButton=svg.selectAll(".occupationCollapseButton")
      .data(collapseButtonData)
      .enter().append("g");
    occupationCollapseButton.append("svg:image")
      .attr("class","occupationCollapseButton")
    .attr('x',relevantX+290)
    .attr('y',-20)
    .attr('width', 30)
    .attr('height', 30)
    .attr("xlink:href","image/up-arrow-circle-md.png")
    .attr("id",'occupationGroup')
    .on("click", collapseToMainbar)
    .on("mouseover",function(d){d3.select(this).style("cursor", "pointer");});
  occupationCollapseButton.append("text")
        .attr("class","occupationCollapseButton")
        .text( "Back")
        .attr("x", relevantX+323)
        .attr("y", -5)
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("font-size", 16)
        .attr("fill", "#AAAAAA");

  d3.selectAll(".occupationCollapseButton").attr("visibility","hidden");
  d3.selectAll(".collegeCollapseButton").attr("visibility","hidden");

  collapseButton.append("text")
        .text( function (d,i) {return i<1 ? "College":"Occupation";;})
        .attr("x", function (d,i) {return i<1 ? relevantX-35:relevantX+250;})
        .attr("y", -40)
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .attr("font-family", "Impact, Charcoal, sans-serif")
        .attr("font-weight", "bold")
        .style("font-size", 30)//18
        .attr("fill", "#444444");
  collapseButton.append("svg:image")
      .attr('x',relevantX+100)
      .attr('y',-70)
      .attr('width', 130)
      .attr('height', 60)
      .attr("xlink:href","image/arrow.png")
      .style("opacity",0.2);


  find_college_occupationGroup();
  d3.selectAll(".mainPath").style("fill-opacity",0.4); 

  college.click='?';
  occupationGroup.click='?';
  var current = '';
  searchName = null;






  //scatter plot
  
  var plotpadding=0;
  var scatterplotWidth = 300;//parseInt(d3.select("#majorScatterplot").style("width"));
    scatterplotHeight = 230;//parseInt(d3.select("#majorScatterplot").style("height"));

  d3.select("#mySVG").append("foreignObject")
      .attr("x",0)
      .attr("y",70)
      .attr("width", 400)
      .attr("height", 300)
      .append("xhtml:div")
      .attr("id","mscatterdiv");

  var mscatter = d3.select("#mscatterdiv").append("svg")
    .attr("id","majorScatterplot")
    .style("width", 330)
    .style("height", 232);


  vqName = ["Verbal", "Quantitative"];
  mscatter.selectAll(".vqName").data(vqName).enter().append("text")
        .text(function(d,i){return (i==0)?"Quantitative":"Verbal"})
        .attr("x", function(d,i){return (i==0)?10:280})
        .attr("y", function(d,i){return (i==0)?20:200})
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("font-size", 18)
        .attr("fill", colors[0])
        .attr("class","vqName");

  d3.select("#mySVG").append("foreignObject")
      .attr("x",accordion_panel_xr)
      .attr("y",70)
      .attr("width", 400)
      .attr("height", 300)
      .append("xhtml:div")
      .attr("id","oscatterdiv");

  var oscatter = d3.select("#oscatterdiv").append("svg")
    .attr("id","occupationScatterplot")
    .style("width", 330)
    .style("height", 232);

    oscatter.selectAll(".vqName").data(vqName).enter().append("text")
        .text(function(d,i){return (i==0)?"Quantitative":"Verbal"})
        .attr("x", function(d,i){return (i==0)?10:240})
        .attr("y", function(d,i){return (i==0)?20:200})
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("font-size", 18)
        .attr("fill", colors[0]);

  createScatterplot(mscatter,major_character_requirement,true);
  createScatterplot(oscatter,occupation_character_requirement,false);


  accordion_unit.select("text").text(function(d,i){return chart_name[i]});
  var animationTime = 600;
</script>

</body>
</html>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            