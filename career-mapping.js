function ClickAccordion(index)
{
  var main_accordion_bar_id = "accordion_bar_" + index;
  var main_accordion_panel_id = "accordion_panel_" + index;
  var bar = document.getElementById(main_accordion_bar_id);
  var panel = document.getElementById(main_accordion_panel_id);
  var accordion_bar_id;
  var accordion_name_id;
  var accordion_panel_id;
  var bar_y;
  var text_y;
  var panel_y;

 // console.log(d3.selectAll(zzchart[2]).select("rect").attr("y"));
 // console.log(d3.selectAll(zzchart[2]).select("rect").attr("height"));
 if ($(bar).hasClass("active"))
  {
    if( chart_class_name[index] != "")
    {
      d3.selectAll(chart_class_name[index]).select("rect").attr("visibility","hidden");
    }

    if( chart_img_id[index] != "")
    {
      d3.selectAll(chart_class_name[index]).select("image").attr("visibility","hidden");
    }
    if( chart_subclass_name[index] != "")
    {
      d3.selectAll(chart_subclass_name[index]).select("rect").attr("visibility","hidden");
      d3.selectAll(chart_class_name[index]).select("text").attr("visibility","hidden");
    } 
  }
  else
  {
    if( chart_class_name[index] != "")
    {
      d3.selectAll(chart_class_name[index]).select("rect").attr("visibility","visible");
    }

    if( chart_img_id[index] != "")
    {
      d3.selectAll(chart_class_name[index]).select("image").attr("visibility","visible");
    }
    if(chart_subclass_name[index] != "")
    {
      d3.selectAll(chart_subclass_name[index]).select("rect").attr("visibility","visible");
      d3.selectAll(chart_class_name[index]).select("text").attr("visibility","visible");
    }
    
  }
  for(var i = index + 1; i < 20; i++)
  {
    if(index < 10 && i >= 10)
      break;
    accordion_bar_id = "rect[id=accordion_bar_"+i+"]";
    accordion_name_id = "text[id=accordion_name_"+i+"]";
    accordion_panel_id = "rect[id=accordion_panel_"+i+"]";
    bar_y = Number(d3.selectAll(accordion_bar_id ).attr("y"));
    name_y = Number(d3.selectAll(accordion_name_id).attr("y"));
    panel_y = Number(d3.selectAll(accordion_panel_id).attr("y"));
    if ($(bar).hasClass("active"))
    {
      d3.select(accordion_bar_id).attr("y", function(d, i){ return bar_y - accordion_panel_height; });
      d3.select(accordion_name_id).attr("y", function(d, i){ return name_y - accordion_panel_height; });
      d3.select(accordion_panel_id).attr("y", function(d, i){ return panel_y - accordion_panel_height; });


        chart_y[i]-=accordion_panel_height;
        if( chart_img_id[i] != "")
        {
          d3.selectAll(chart_class_name[i]).select("image").attr("transform","translate(0,"+chart_y[i]+")");
        }
        // console.log(chart_y[i]);
        if(chart_class_name[i] != "")
          d3.selectAll(chart_class_name[i]).select("rect").attr("transform","translate(0,"+chart_y[i]+")") ;

        if(chart_subclass_name[i] != "")
        {
          chart_sub_y[i]-=accordion_panel_height;
          // console.log(chart_sub_y[i]);
          d3.selectAll(chart_subclass_name[i]).select("rect").attr("transform","translate(0,"+chart_sub_y[i]+")") ;
          chart_text_y[i]-=accordion_panel_height;
          // console.log(chart_text_y[i]);
          d3.selectAll(chart_class_name[i]).select("text").attr("transform","translate(0,"+chart_text_y[i]+")") ;
        }
        else
        {

        }
      
    }
    else
    {
      d3.select(accordion_bar_id).attr("y", function(d, i){ return bar_y + accordion_panel_height; });
      d3.select(accordion_name_id).attr("y", function(d, i){ return name_y + accordion_panel_height; });
      d3.select(accordion_panel_id).attr("y", function(d, i){ return panel_y + accordion_panel_height; });
     
    
        chart_y[i]+=accordion_panel_height;
        if( chart_img_id[i] != "")
        {
          d3.selectAll(chart_class_name[i]).select("image").attr("transform","translate(0,"+chart_y[i]+")");
        }
        // console.log(chart_y[i]);
        if(chart_class_name[i] != "")
          d3.selectAll(chart_class_name[i]).select("rect").attr("transform","translate(0,"+chart_y[i]+")") ;

        if(chart_subclass_name[i] != "")
        {
          chart_sub_y[i]+=accordion_panel_height;
          // console.log(chart_sub_y[i]);
          d3.selectAll(chart_subclass_name[i]).select("rect").attr("transform","translate(0,"+chart_sub_y[i]+")") ;
          chart_text_y[i]+=accordion_panel_height;
          // console.log(chart_text_y[i]);
          d3.selectAll(chart_class_name[i]).select("text").attr("transform","translate(0,"+chart_text_y[i]+")") ;
        }
        else
        {

        }
    }
  } 

  bar.classList.toggle("active");
  panel.classList.toggle("show");
}

function collapseToMainbar(){
	collapseButton.select(".noresult").remove();
	current = '';
	if (this.id == 'college' && college.click!='?'){
		collegeName.selectAll("text").remove();
		collegeName.selectAll("rect").remove();
		d3.selectAll(".majorDot").transition().duration(animationTime).attr("stroke-width",0.0).style("fill-opacity",1);
		d3.selectAll(".collegeCollapseButton").attr("visibility","hidden");

		d3.selectAll(".collegeSubbar").remove();
		minn=10;
		cscale=(620-minn*college.name.length -(college.name.length-1)*gap)/math.sum(college.number);
		initX(college, collegeX, collegeWidth,cscale);	

		collegeMainbar.select("rect").transition().duration(animationTime)
			.attr("height", function (d,i) {
				return collegeWidth[i];
			})
			.attr("y", function (d,i){
				return collegeX[i];
			});
		collegeMainbar.select("rect")
			.attr("x",relevantX)
			.attr("width", 30)
			.attr("fill-opacity",1)
			.attr("stroke-width", 0);

		collegeMainbar.select("text").transition()
			.attr("y", function (d,i) {
				return collegeX[i]+collegeWidth[i]/2;					
			})
			.attr("visibility","visible")
			.attr("fill-opacity",1)
			.duration(animationTime);


		//create path
		d3.selectAll(".mainPath").transition().duration(animationTime)
			.style("opacity",0);

		college.click = '?';
		college_click = '?';
		if(college.click=='?' && occupationGroup.click =='?'){
			find_college_occupationGroup();
		}

		find_major_occupation(college.click, occupationGroup.click, 0, this.style);
		majorCharacterChange(null);

	}


	
	if (this.id == 'occupationGroup' && occupationGroup.click!='?'){
			occupationName.selectAll("text").remove();
		occupationName.selectAll("rect").remove();
		d3.selectAll(".occupationDot").transition().duration(animationTime).attr("stroke-width",0.0).style("fill-opacity",1);
		d3.selectAll(".occupationCollapseButton").attr("visibility","hidden");
		d3.selectAll(".occupationSubbar").remove();
		minn=10;
		ogscale=(620-minn*occupationGroup.name.length -(occupationGroup.name.length-1)*gap)/math.sum(occupationGroup.number);
		initX(occupationGroup, occupationGroupX, occupationGroupWidth, ogscale);
		


		occupationMainbar.select("rect").transition().duration(animationTime)
			.attr("height", function (d,i) {
				return occupationGroupWidth[i];
			})
			.attr("y", function (d,i){
				return occupationGroupX[i];
			});


		occupationMainbar.select("rect")
			.attr("x",relevantX+290)
			.attr("width", 30)
			.attr("fill-opacity",1)
			.attr("stroke-width", 0);

		occupationMainbar.select("text").transition()
			.attr("y", function (d,i) {
				return occupationGroupX[i]+occupationGroupWidth[i]/2;					
			})
			.attr("fill-opacity",1)
			.duration(animationTime);


		//create path
		d3.selectAll(".mainPath").transition().duration(animationTime)
			.style("opacity",0);

		//occupationGroup_click_buff='?';
		occupationGroup.click = '?';
		occupationGroup_click = '?';
		if(college.click=='?' && occupationGroup.click =='?'){
			find_college_occupationGroup();
		}
		find_major_occupation(college.click, occupationGroup.click, 0, this.style);
		occupationCharacterChange(null);

	}
	else if(search_click){
		d3.selectAll(".majorDot").transition().duration(animationTime).style("fill-opacity",1).attr("stroke-width",0);
		d3.selectAll(".occupationDot").transition().duration(animationTime).style("fill-opacity",1).attr("stroke-width",0);
		d3.selectAll(".collegeCollapseButton").attr("visibility","hidden");
		d3.selectAll(".occupationCollapseButton").attr("visibility","hidden");
		minn=10;
		cscale=(620-minn*college.name.length -(college.name.length-1)*gap)/math.sum(college.number);
		ogscale=(620-minn*occupationGroup.name.length -(occupationGroup.name.length-1)*gap)/math.sum(occupationGroup.number);

		d3.selectAll(".collegeSubbar").remove();
		initX(college, collegeX, collegeWidth,cscale);	

		d3.selectAll(".occupationSubbar").remove();
		initX(occupationGroup, occupationGroupX, occupationGroupWidth, ogscale);


		collegeMainbar.select("rect").transition().duration(animationTime)
		.attr("width",30)
		.attr("x",relevantX)
		.attr("height", function (d,i) {
				return collegeWidth[i];
			})
			.attr("y", function (d,i){
				return collegeX[i];
			})
		.attr("fill-opacity",1)
		.attr("stroke-width", 0);

		collegeMainbar.select("text").transition().duration(animationTime)
			.attr("y", function (d,i) {
				return collegeX[i]+collegeWidth[i]/2;					
			})
			//.attr("visibility","visible")
			.attr("fill-opacity",1)
			.style("visibility", "visible");

		occupationMainbar.select("rect").transition().duration(animationTime)
			.attr("x",relevantX+290)
			.attr("height", function (d,i) {
				return occupationGroupWidth[i];
			})
			.attr("y", function (d,i){
				return occupationGroupX[i];
			})
			.attr("width",30)
			.attr("fill-opacity",1)
			.attr("stroke-width", 0);

		occupationMainbar.select("text").transition().duration(animationTime)
			.style("visibility", "visible")
			.attr("y", function (d,i) {
				return occupationGroupX[i]+occupationGroupWidth[i]/2;					
			})
			.attr("fill-opacity",1);

		//create path
		d3.selectAll(".mainPath").transition().duration(animationTime)
			.style("opacity",0);

		//college.click = '?';
		if(college.click=='?' && occupationGroup.click =='?'){
			find_college_occupationGroup();
		}
		searchName = null;
		search_click=false;
		college.click = "?";
		occupationGroup.click ="?";
		find_major_occupation(college.click, occupationGroup.click, 0, this.style);
		majorCharacterChange(null);
		
	}
};






var college_click_buff = '?';
var occupationGroup_click_buff = '?';
var majorX = [];
var majorWidth = [];
var occupationX = [];
var occupationWidth = [];



//calculate X(actually Y) for college,major bla bla
function initX(arr, arrX, arrWidth,scale){
	for (var i = arr.number.length - 1; i >= 0; i--) {
		arrWidth[i] = arr.number[i] * scale + minn;
	};

	for (var i = 1; i < arr.number.length; i++) {
		for (var j = 0; j < i; j++) {
			arrX[i] = arrX[i-1] + arrWidth[j] + gap;

		};
	};

};
var colExpandPoint=0;
var occExpandPoint=0;

function clickOnCollegeMainbar(d,i) {
	d3.selectAll(".collegeCollapseButton").attr("visibility","visible");
	colExpandPoint = collegeX[i];
	for (var j = 0; j < collegeWidth.length; j++) {
		collegeWidth[j] = 15;
	}
	collegeWidth[i] = 470;
	for (var j = 1; j < collegeX.length; j++) {
		collegeX[j] = collegeX[j-1] + collegeWidth[j-1] + gap;
		
	}

	current = 'college';
	collegeMainbar.select("rect").transition().duration(animationTime)
		.attr("height", function (d,i) {
			return collegeWidth[i];
		})
		.attr("y", function (d,i){
			return collegeX[i];
		});
	collegeMainbar.select("rect")
		.attr("x",relevantX)//210
		.attr("width", 30)
		.attr("fill-opacity",0.5)//set opacity of other bars
		.attr("stroke-width", 0);

	var startpoint = 0;
	d3.select(this.parentNode.childNodes[0]).transition().duration(animationTime)
		.attr("x", relevantX - 4)
		.attr("width", 38)
		.attr("height", function (d) {return 470;})
		.attr("y", function (d){startpoint=collegeX[i];return collegeX[i];})
		.attr("fill-opacity",0)//change underlying color or mainbar
		.attr("stroke-width", 6)
		.attr("stroke", this.parentNode.childNodes[0].style.fill);

	college_click = true;
	idBuff=this.id;
	
	collegeMainbar.select("text").transition()
		.attr("fill-opacity",function (d){
			if(d == idBuff){
				return 0;
			}
			else
				return 0.5;
		})
		.attr("y", function (d,i) {
			return collegeX[i]+collegeWidth[i]/2;					
		})
		.duration(animationTime);

		changeScatterplot(this.id);
	//calculate VQR color for bars
	var subbarColor = calculateVQRcolor(this.id);

	//create major bar
	college.click= this.id;
	find_major_occupation(college.click, occupationGroup.click, startpoint, this.parentNode.childNodes[0].style,subbarColor);	


	//create path
	d3.selectAll(".mainPath").transition().duration(animationTime)//1000
		.style("opacity",0);

	//major of the college
	majorCharacterChange(this.id);

	//create college names and collapse space
	words = (this.id).split(/\s+/);

	collegeName.selectAll("text").remove();
	collegeName.selectAll("rect").remove();

	collegeName.append("rect")
		.attr("id","college")
		.attr("width", 290)
		.attr("height", function (d) {return 470;})
		.attr("x", relevantX - 300)
		.attr("y", function(d,i){
			return startpoint;//+200
		})
		.style("fill","#eeeeee")
		.style("fill-opacity",0.01)
		.on("click",
			collapseToMainbar);

	collegeName.selectAll(".collegeName").data(words).enter()
		.append('text')
        .text(function(d,i){
        	//console.log(d)
        	return words[i];})
        .style("fill","#cccccc")
		.style("fill-opacity",0.1)
		.style("font-family","Impact, Charcoal, sans-serif")
		.attr("font-size",60)
		.attr("x", relevantX - 300)
		.attr("y", function(d,i){
			return startpoint+100+60*i;//+200
		}).transition().duration(animationTime);


};



function clickOnOccupationMainbar(d,i){
	d3.selectAll(".occupationCollapseButton").attr("visibility","visible");
	occExpandPoint = occupationGroupX[i];
	for (var j = 0; j < occupationGroupWidth.length; j++) {
		occupationGroupWidth[j] = 10;
	}
	occupationGroupWidth[i] = 475;
	for (var j = 1; j < occupationGroupX.length; j++) {
		occupationGroupX[j] = occupationGroupX[j-1] + occupationGroupWidth[j-1] + gap;
		
	}

	current = 'occupationGroup';
	occupationMainbar.select("rect").transition().duration(animationTime)
		.attr("height", function (d,i) {
			return occupationGroupWidth[i];
		})
		.attr("y", function (d,i){
			return occupationGroupX[i];
		});
	occupationMainbar.select("rect")
		.attr("x",relevantX + 290)
		.attr("width", 30)
		.attr("fill-opacity",0.5)
		.attr("stroke-width", 0);

	var startpoint = 0;
	d3.select(this.parentNode.childNodes[0]).transition().duration(animationTime)
		.attr("x", relevantX + 286)
		.attr("width", 38)
		.attr("height", function (d) {return 475;})
		.attr("y", function (d){startpoint=occupationGroupX[i];return occupationGroupX[i];})
		.attr("fill-opacity",0)
		.attr("stroke-width", 6)
		.attr("stroke", this.parentNode.childNodes[0].style.fill);

	occupationGroup_click = true;
	idBuff=this.id;
	occupationMainbar.select("text").transition()
		.attr("fill-opacity",function (d){
			if(d == idBuff){
				return 0;
			}
			else
				return 0.5;
		})
		.attr("y", function (d,i) {
			return occupationGroupX[i]+occupationGroupWidth[i]/2;					
		})
		.duration(animationTime)

	changeScatterplot(this.id);
	var subbarColor = calculateVQRcolor(this.id);

	//create occupation bar
	occupationGroup.click= this.id;
	find_major_occupation(college.click, occupationGroup.click, startpoint, this.parentNode.childNodes[0].style,subbarColor);		

	//create path
	d3.selectAll(".mainPath").transition().duration(animationTime)
		.style("opacity",0);

	occupationCharacterChange(this.id);

	//create occu names and collapse space
	words = (this.id).split(/\s+/);

	occupationName.selectAll("text").remove();
	occupationName.selectAll("rect").remove();

	occupationName.append("rect")
		.attr("id","occupationGroup")
		.attr("width", 290)
		.attr("height", function (d) {return 470;})
		.attr("x", relevantX + 330)
		.attr("y", function(d,i){
			return startpoint;//+200
		})
		.style("fill","#eeeeee")
		.style("fill-opacity",0.01)
		.on("click",
			collapseToMainbar);

	occupationName.selectAll(".occupationName").data(words).enter()
		.append('text')
        .text(function(d,i){
        	//console.log(d)
        	return words[i];})
        .style("fill","#cccccc")
		.style("fill-opacity",0.1)
		.style("font-family","Impact, Charcoal, sans-serif")
		.attr("font-size",60)
		/*.attr("x", relevantX + 330)
		.attr("y", function(d,i){
			return startpoint+100+60*i;//+200
		})*/
		.attr("transform",function(d,i){
			return "translate("+ (relevantX + 350)+","+(startpoint+100+60*i)+") "
		})//"rotate("+(relevantX + 330)+","+(startpoint+100)+",90)")
		.transition().duration(animationTime);
};


var majorDescription = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);
var occupationDescription = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);
    

var mainCollBarColor,mainOccuBarColor;
//create bars for major and occupation (allowing functions): 4
function create_major_bar(major,startpoint,style,subbarColor){

	d3.selectAll(".collegeSubbar").remove();
	      	
	majorX[0]=startpoint + 6;//leftover
	total=math.sum(major.number);
	mscale = (458-minn*major.name.length -(major.name.length-1)*gap)/math.sum(major.number);//how long the whole bar is

	initX(major, majorX, majorWidth,mscale);

	var collegeSubbar=svg.selectAll(".collegeSubbar")
            .data(major.name)
            .enter().append("g")
            .attr("class","collegeSubbar")
            .attr("mid","init");

        collegeSubbar.append("rect")
            .attr("class","collegeSubbar")
            .attr("x",relevantX + 2.5)
            .attr("y",function (d,i) {return colExpandPoint;})
            .attr("height",function (d,i) {return 0;})
            .attr("width",25)
            .attr("id",function (d,i) {return major.name[i];})
            .attr("cid",function(d){
			    	return "init";
		    })
            .style("fill", function(d,i) {
  				return subbarColor[i]; 
  				//return colors[i]; 
  			})//change bar color working
			.attr("stroke", "black")
            .attr("fill-opacity",0)
            .on("mouseover", mouseoverMajor)
            .on("click",clickOnMajor)
            .on("mouseout", function(d) {
            	majorDescription.transition()		
	                .duration(500)		
	                .style("opacity", 0);	
	            d3.selectAll(".majorVQRHighlightBar").remove();

				d3.select("#majorScatterplot").selectAll("circle[gid="+college.click.replace(/ /g,'').replace(/','/g,'')+"]")
					.attr("stroke-width",1)
					.attr("stroke", "black");
	        });
    
    var majorPercentage = calculatePercentage(major.number);
        collegeSubbar.append("text")
            .attr("class","collegeSubbar")
            .text( function (d,i) {return major.name[i]+"   ("+majorPercentage[i]+")";})
            .attr("x", relevantX - 9)
            .attr("y", function (d,i) {
            	return colExpandPoint;
            })
            .attr("id",function (d,i) {return major.name[i];})
            .attr("cid",function(d){
					    	return "init";
				    })
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .style("font-size", 13)
            .style("fill","white")
            .on("click",clickOnMajor)
            .on("mouseover", mouseoverMajor)
            .on("mouseout", function(d) {	
            	//d3.selectAll(".mainPath").style("fill-opacity",0.9);	
	            majorDescription.transition()		
	                .duration(500)		
	                .style("opacity", 0);
	            d3.selectAll(".majorVQRHighlightBar").remove();
	            d3.select("#majorScatterplot").selectAll("circle[gid="+college.click.replace(/ /g,'').replace(/','/g,'')+"]")
					.attr("stroke-width",1)
					.attr("stroke", "black");
	        });



        collegeSubbar.select("rect").transition()
        	.attr("y",function (d,i) {return majorX[i];})
            .attr("height",function (d,i) {return majorWidth[i];})
        	.attr("fill-opacity",1)
        	 .attr("stroke-width",0.5)
      		.duration(animationTime);//800


      	collegeSubbar.select("text").transition()
      		.attr("y", function (d,i) {
            	return majorX[i]+ majorWidth[i]/2;
            })
      		.style("fill", function(d,i) { 
      			return "black";//mainCollBarColor=style.fill;return style.fill; 
      		})
      		.duration(animationTime);
};

function create_occupation_bar(occupation,startpoint,style,subbarColor){
	
	d3.selectAll(".occupationSubbar").remove();

	occupationX[0]=startpoint + 7;//leftover
	total=math.sum(occupation.number);

	oscale = (460-minn*occupation.name.length -(occupation.name.length-1)*gap)/math.sum(occupation.number);//how long the whole bar is

	initX(occupation, occupationX, occupationWidth, oscale);

	var occupationSubbar=svg.selectAll(".occupationSubbar")
            .data(occupation.number)
            .enter().append("g")
            .attr("class","occupationSubbar");
        
        occupationSubbar.append("rect")
            .attr("class","occupationSubbar")
            .attr("x",relevantX + 292.5)
            .attr("y",function (d,i) {return occExpandPoint;})
            .attr("height",function (d,i) {return 0;})
            .attr("width",25)
            .attr("id",function (d,i) {return occupation.name[i];})
            .attr("cid",function(d){
					    	return "init";
				    })
			.attr("stroke", "black")
            .style("fill", function(d,i) {
				return subbarColor[i]; 
  				//return colors[i]; 
  			})//change bar color working
            .attr("fill-opacity",0)
            .on("mouseover", mouseoverOccupation)
            .on("click",clickOnOccupation)
            .on("mouseout", function(d) {	
            		
	            occupationDescription.transition()		
	                .duration(500)		
	                .style("opacity", 0);
	            //d3.selectAll(".mainPath").style("fill-opacity",0.9);
	            d3.selectAll(".occupationVQRHighlightBar").remove();
	            d3.select("#occupationScatterplot").selectAll("circle[gid="+occupationGroup.click.replace(/ /g,'').replace(/','/g,'')+"]")
					.attr("stroke-width",1)
					.attr("stroke", "black");
	        });

     var occupationPercentage = calculatePercentage(occupation.number);
        occupationSubbar.append("text")
            .attr("class","occupationSubbar")
            .text( function (d,i) {return "("+occupationPercentage[i]+")    "+occupation.name[i];})
            .attr("x", relevantX + 331)
            .attr("y", function (d,i) {
            	return occExpandPoint;
            })
            .attr("id",function (d,i) {return occupation.name[i];})
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            //.attr("transform", "translate(0,500) rotate(-80)")
            .style("font-size", 13)
            .style("fill","white")
            .on("click",clickOnOccupation)

            .on("mouseover", mouseoverOccupation)
            .on("mouseout", function(d) {	
            	//d3.selectAll(".mainPath").style("fill-opacity",0.9);	
	            occupationDescription.transition()		
	                .duration(500)		
	                .style("opacity", 0);
	            d3.selectAll(".occupationVQRHighlightBar").remove();
	            d3.select("#occupationScatterplot").selectAll("circle[gid="+occupationGroup.click.replace(/ /g,'').replace(/','/g,'')+"]")
					.attr("stroke-width",1)
					.attr("stroke", "black");
	        });

        

      	occupationSubbar.select("rect").transition()
      		.attr("y",function (d,i) {return occupationX[i];})
            .attr("height",function (d,i) {return occupationWidth[i];})
        	.attr("fill-opacity",1)
        	 .attr("stroke-width",0.5)
      		.style("fill", function(d,i) { return subbarColor[i]; })
      		.duration(animationTime);

      	occupationSubbar.select("text").transition()
      		.attr("y", function (d,i) {
            	return occupationX[i]+ occupationWidth[i]/2;
            })
      		.style("fill", function(d) { 
      			return "black";//mainOccuBarColor=style.fill;return style.fill; 
      		})
      		.duration(animationTime);           	
};

function mouseoverMajor(){
	d3.select(this).style("cursor", "pointer");
	var pathID=this.id.replace(/\s/g,'').replace(/\//g,'').replace(/ /g,'').replace(/','/g,'');
	d3.selectAll(".mainPath").style("fill-opacity",0.4);
	//d3.selectAll("polygon#"+pathID).style("fill-opacity",0.9);
	d3.selectAll("polygon[cid="+pathID+"]").style("fill-opacity",1.0);//0.9
	d3.select("#majorScatterplot").selectAll("circle[id="+pathID+"]").style("fill-opacity",1)
		.attr("stroke-width",3)
		.attr("stroke", "red");

	for (var i = 0; i < major_character_requirement.length; i++) {
	    //calculate average of college
	    if(major_character_requirement[i].major == this.id){
	    	var majorVQRBuff=[];
	    	majorVQRBuff.push(major_character_requirement[i].verbalSkill, major_character_requirement[i].quantitativeSkill, major_character_requirement[i].reasoningSkill);

			name = major_character_requirement[i].major;
			description = major_character_requirement[i].description;


            majorDescription.html(name.bold().fontsize(3)+"\r\n"+description)	
                .style("left", (d3.event.pageX-280) + "px")		
                .style("top", (d3.event.pageY + 10) + "px");

			majorDescription.transition()		
                .duration(200)		
                .style("opacity", .9);	

			var majorSAT = [];
			var majorGPA = [];
			var majorSalary = [];

			var majorSAT10=0;
			var majorSAT25=0;
			var majorSAT50=0;
			var majorSAT75=0;
			var majorSAT90=0;

			var majorGPA10=0;
			var majorGPA25=0;
			var majorGPA50=0;
			var majorGPA75=0;
			var majorGPA90=0;

			var majorSalary10=0;
			var majorSalary25=0;
			var majorSalary50=0;
			var majorSalary75=0;
			var majorSalary90=0;


			majorSAT10=(major_character_requirement[i].SAT10==0?major_character_requirement[i].SAT25-(initmajorSAT[1]-initmajorSAT[0]):major_character_requirement[i].SAT10);		    				
			majorSAT25=major_character_requirement[i].SAT25;
			majorSAT50=major_character_requirement[i].SAT50;
			majorSAT75=major_character_requirement[i].SAT75;
			majorSAT90=(major_character_requirement[i].SAT90==0?major_character_requirement[i].SAT75+(initmajorSAT[4]-initmajorSAT[3]):major_character_requirement[i].SAT90);

			majorGPA10=(major_character_requirement[i].GPA10==0?major_character_requirement[i].GPA25-(initmajorGPA[1]-initmajorGPA[0]):major_character_requirement[i].GPA10);
			majorGPA25=major_character_requirement[i].GPA25;
			majorGPA50=major_character_requirement[i].GPA50;
			majorGPA75=major_character_requirement[i].GPA75;
			majorGPA90=(major_character_requirement[i].GPA90==0?major_character_requirement[i].GPA75+(initmajorGPA[4]-initmajorGPA[3]):major_character_requirement[i].GPA90);

			majorSalary10=(major_character_requirement[i].salary10==0?major_character_requirement[i].salary25-(initmajorSalary[1]-initmajorSalary[0]):major_character_requirement[i].salary10);
			majorSalary25=major_character_requirement[i].salary25;
			majorSalary50=major_character_requirement[i].salary50;
			majorSalary75=major_character_requirement[i].salary75;
			majorSalary90=(major_character_requirement[i].salary90==0?major_character_requirement[i].salary75+(initmajorSalary[4]-initmajorSalary[3]):major_character_requirement[i].salary90);


			majorSAT.push(majorSAT10,majorSAT25, majorSAT50, majorSAT75,majorSAT90);
			majorGPA.push(majorGPA10,majorGPA25, majorGPA50, majorGPA75,majorGPA90);
			majorSalary.push(majorSalary10,majorSalary25, majorSalary50, majorSalary75,majorSalary90);

			majorSATbar.select("rect").transition().duration(200)
				.attr("x",function(d,i){return SAT_relevantX+33+ (majorSAT[i]-800)*0.265;})
				.attr("width",function(d,i){return (majorSAT[i+1]-majorSAT[i])*0.265;});

			majorGPAbar.select("rect").transition().duration(200)
				.attr("x",function(d,i){return GPA_relevantX+33+ (majorGPA[i]-2.0)*90;})
				.attr("width",function(d,i){return (majorGPA[i+1]-majorGPA[i])*90;});

			majorSalarybar.select("rect").transition().duration(200)
				.attr("x",function(d,i){return MSalary_relevantX+33+ (majorSalary[i]-10000)*0.0023;})
				.attr("width",function(d,i){return (majorSalary[i+1]-majorSalary[i])*0.0023;});
	    }
	}
};

function mouseoverOccupation(){
	d3.select(this).style("cursor", "pointer");
	var pathID=this.id.replace(/\s/g,'').replace(/\//g,'').replace(/ /g,'').replace(/','/g,'');
	d3.selectAll(".mainPath").style("fill-opacity",0.4);
	d3.selectAll("polygon[oid="+pathID+"]").style("fill-opacity",1);
	d3.select("#occupationScatterplot").selectAll("circle[id="+pathID+"]").style("fill-opacity",1)
		.attr("stroke-width",3)
		.attr("stroke", "red");

	for (var i = 0; i < occupation_character_requirement.length; i++) {
	    if(occupation_character_requirement[i].occupation == this.id){
	    	var occupatioinVQRBuff=[];
	    	occupatioinVQRBuff.push(occupation_character_requirement[i].verbalSkill, occupation_character_requirement[i].quantitativeSkill, occupation_character_requirement[i].reasoningSkill);
		
		name = occupation_character_requirement[i].occupation;
		description = occupation_character_requirement[i].description;

			var occupationSalary=[];
			var occupationSalary10=0;
			var occupationSalary25=0;
			var occupationSalary50=0;
			var occupationSalary75=0;
			var occupationSalary90=0;
			var occupationLength=0;

			occupationSalary10=(occupation_character_requirement[i].salary10==0?occupation_character_requirement[i].salary25-(initoccupationSalary[1]-initoccupationSalary[0]):occupation_character_requirement[i].salary10);
			occupationSalary25=occupation_character_requirement[i].salary25;
			occupationSalary50=occupation_character_requirement[i].salary50;
			occupationSalary75=occupation_character_requirement[i].salary75;
			occupationSalary90=(occupation_character_requirement[i].salary90==0?occupation_character_requirement[i].salary75+(initoccupationSalary[4]-initoccupationSalary[3]):occupation_character_requirement[i].salary90);

			occupationSalary.push(occupationSalary10,occupationSalary25, occupationSalary50, occupationSalary75,occupationSalary90);

			occupationSalarybar.select("rect").transition().duration(200)
				.attr("x",function(d,i){return OSalary_relevantX+33+(occupationSalary[i]-10000)*0.0023;})
				.attr("width",function(d,i){return (occupationSalary[i+1]-occupationSalary[i])*0.0023;});

	    }
	}
};

var markOrder = 0;
var markList = [0,0];
var majorVQRHighlightBar0, majorVQRHighlightBar1;
function clickOnMajor(){
	d3.selectAll(".collegeSubbar").select("rect").transition().duration(500)					
		.attr("stroke-width", 0.5)
		.attr("stroke","black");
	var pathID=this.id.replace(/\s/g,'').replace(/','/g,'');
	d3.selectAll(".mainPath").style("fill-opacity",0.1);
	d3.selectAll("polygon[cid="+pathID+"]").style("fill-opacity",0.9);
	d3.select(this.parentNode.childNodes[0]).transition().duration(500)					
		.attr("stroke-width", 4)
		.attr("stroke","red");

	/*
	if (markOrder>1)
		markOrder=0;
	if(markOrder<2){

		var pathID=this.id.replace(/\s/g,'').replace(/','/g,'');
		d3.selectAll(".mainPath").style("fill-opacity",0.3);
		d3.selectAll("polygon[cid="+pathID+"]").style("fill-opacity",0.9);
		
		//d3.selectAll("rect[markOrder=0]").style("fill-opacity",0.1);
		d3.select(this.parentNode.childNodes[0]).transition().duration(500)					
			.attr("stroke-width", 4)
			.attr("stroke", function(){
				if(markOrder==0){
					d3.selectAll(".collegeSubbar").selectAll("rect[cid=zero]").attr("cid","init");
					d3.select(this.parentNode.childNodes[0]).attr("cid","zero");
					return "#FA8072";}	
				if(markOrder==1){
					d3.selectAll(".collegeSubbar").selectAll("rect[cid=one]").attr("cid","init");
					d3.select(this.parentNode.childNodes[0]).attr("cid","one");
					return "#82CAFA";}
			});
			
		d3.select(this.parentNode.childNodes[1]).transition().duration(500)
			.style("fill", function(){
				if(markOrder==0){
					
					d3.selectAll(".collegeSubbar").selectAll("text[cid=zero]").attr("cid","init");
					d3.select(this.parentNode.childNodes[1]).attr("cid","zero");
					return "#FA8072";}	
				if(markOrder==1){
					d3.selectAll(".collegeSubbar").selectAll("text[cid=one]").attr("cid","init");
					d3.select(this.parentNode.childNodes[1]).attr("cid","one");
					return "#82CAFA";}
			});	

		d3.selectAll(".collegeSubbar").selectAll("rect[cid=init]").attr("stroke-width", 0);
		d3.selectAll(".collegeSubbar").selectAll("text[cid=init]").style("fill", mainCollBarColor);
		
		for (var i = 0; i < major_character_requirement.length; i++) {
		    //calculate average of college
		    if(major_character_requirement[i].major == this.id){
		    	var majorVQRBuff=[];
		    	majorVQRBuff.push(major_character_requirement[i].verbalSkill, major_character_requirement[i].quantitativeSkill, major_character_requirement[i].reasoningSkill);

				name = major_character_requirement[i].major;
				description = major_character_requirement[i].description;

				if(markOrder==0){
	            majorDescription.html(name.bold().fontsize(3)+"\r\n"+description)	
	                .style("left", (d3.event.pageX-280) + "px")		
	                .style("top", (d3.event.pageY + 10) + "px");

				majorDescription.transition()		
	                .duration(200)		
	                .style("opacity", .9);	
			    
				d3.selectAll(".majorVQRHighlightBar0").remove();


				var majorSAT = [];
				var majorGPA = [];
				var majorSalary = [];

				var majorSAT10=0;
				var majorSAT25=0;
				var majorSAT50=0;
				var majorSAT75=0;
				var majorSAT90=0;

				var majorGPA10=0;
				var majorGPA25=0;
				var majorGPA50=0;
				var majorGPA75=0;
				var majorGPA90=0;

				var majorSalary10=0;
				var majorSalary25=0;
				var majorSalary50=0;
				var majorSalary75=0;
				var majorSalary90=0;


				majorSAT10=(major_character_requirement[i].SAT10==0?major_character_requirement[i].SAT25-(initmajorSAT[1]-initmajorSAT[0]):major_character_requirement[i].SAT10);		    				
				majorSAT25=major_character_requirement[i].SAT25;
				majorSAT50=major_character_requirement[i].SAT50;
				majorSAT75=major_character_requirement[i].SAT75;
				majorSAT90=(major_character_requirement[i].SAT90==0?major_character_requirement[i].SAT75+(initmajorSAT[4]-initmajorSAT[3]):major_character_requirement[i].SAT90);

				majorGPA10=(major_character_requirement[i].GPA10==0?major_character_requirement[i].GPA25-(initmajorGPA[1]-initmajorGPA[0]):major_character_requirement[i].GPA10);
				majorGPA25=major_character_requirement[i].GPA25;
				majorGPA50=major_character_requirement[i].GPA50;
				majorGPA75=major_character_requirement[i].GPA75;
				majorGPA90=(major_character_requirement[i].GPA90==0?major_character_requirement[i].GPA75+(initmajorGPA[4]-initmajorGPA[3]):major_character_requirement[i].GPA90);

				majorSalary10=(major_character_requirement[i].salary10==0?major_character_requirement[i].salary25-(initmajorSalary[1]-initmajorSalary[0]):major_character_requirement[i].salary10);
				majorSalary25=major_character_requirement[i].salary25;
				majorSalary50=major_character_requirement[i].salary50;
				majorSalary75=major_character_requirement[i].salary75;
				majorSalary90=(major_character_requirement[i].salary90==0?major_character_requirement[i].salary75+(initmajorSalary[4]-initmajorSalary[3]):major_character_requirement[i].salary90);


				majorSAT.push(majorSAT10,majorSAT25, majorSAT50, majorSAT75,majorSAT90);
				majorGPA.push(majorGPA10,majorGPA25, majorGPA50, majorGPA75,majorGPA90);
				majorSalary.push(majorSalary10,majorSalary25, majorSalary50, majorSalary75,majorSalary90);

				majorSATbar.select("rect").transition().duration(200)
					.attr("x",function(d,i){return -67+ (majorSAT[i]-800)*0.265;})
					.attr("width",function(d,i){return (majorSAT[i+1]-majorSAT[i])*0.265;});

				majorGPAbar.select("rect").transition().duration(200)
					.attr("x",function(d,i){return -67+ (majorGPA[i]-2.0)*90;})
					.attr("width",function(d,i){return (majorGPA[i+1]-majorGPA[i])*90;});

				majorSalarybar.select("rect").transition().duration(200)
					.attr("x",function(d,i){return -67+ (majorSalary[i]-10000)*0.0023;})
					.attr("width",function(d,i){return (majorSalary[i+1]-majorSalary[i])*0.0023;});
				}if (markOrder==1) {
					//create new bars
					majorDescription.html(name.bold().fontsize(3)+"\r\n"+description)	
	                .style("left", (d3.event.pageX-280) + "px")		
	                .style("top", (d3.event.pageY + 10) + "px");

				majorDescription.transition()		
	                .duration(200)		
	                .style("opacity", .9);	
			    d3.selectAll(".majorVQRHighlightBar1").remove();
				}
		    }
		}
		markOrder++;
}*/

};

var omarkOrder = 0;
var omarkList = [0,0];
var occupationVQRHighlightBar0, occupationVQRHighlightBar1;
function clickOnOccupation(){
	d3.selectAll(".occupationSubbar").select("rect").transition().duration(500)					
		.attr("stroke-width", 0.5)
		.attr("stroke","black");
	var pathID=this.id.replace(/\s/g,'').replace(/\//g,'').replace(/','/g,'');
	d3.selectAll(".mainPath").style("fill-opacity",0.1);
	d3.selectAll("polygon[oid="+pathID+"]").style("fill-opacity",0.9);
	d3.select(this.parentNode.childNodes[0]).transition().duration(500)					
		.attr("stroke-width", 4)
		.attr("stroke","red");
	/*
	if (omarkOrder>1)
		omarkOrder=0;
	if(omarkOrder<2){

		var pathID=this.id.replace(/\s/g,'').replace(/\//g,'').replace(/','/g,'');
		d3.selectAll(".mainPath").style("fill-opacity",0.4);
		d3.selectAll("polygon[oid="+pathID+"]").style("fill-opacity",0.9);
		
		
		d3.select(this.parentNode.childNodes[0]).transition().duration(500)					
			.attr("stroke-width", 4)
			.attr("stroke", function(){
				if(omarkOrder==0){
					d3.selectAll(".occupationSubbar").selectAll("rect[cid=zero]").attr("cid","init");
					d3.select(this.parentNode.childNodes[0]).attr("cid","zero");
					return "#FA8072";}	
				if(omarkOrder==1){
					d3.selectAll(".occupationSubbar").selectAll("rect[cid=one]").attr("cid","init");
					d3.select(this.parentNode.childNodes[0]).attr("cid","one");
					return "#82CAFA";}
			});
			
		d3.select(this.parentNode.childNodes[1]).transition().duration(500)
			.style("fill", function(){
				if(omarkOrder==0){
					
					d3.selectAll(".occupationSubbar").selectAll("text[cid=zero]").attr("cid","init");
					d3.select(this.parentNode.childNodes[1]).attr("cid","zero");
					return "#FA8072";}	
				if(omarkOrder==1){
					d3.selectAll(".occupationSubbar").selectAll("text[cid=one]").attr("cid","init");
					d3.select(this.parentNode.childNodes[1]).attr("cid","one");
					return "#82CAFA";}
			});	

		d3.selectAll(".occupationSubbar").selectAll("rect[cid=init]").attr("stroke-width", 0);
		d3.selectAll(".occupationSubbar").selectAll("text[cid=init]").style("fill", mainOccuBarColor);
		
		for (var i = 0; i < occupation_character_requirement.length; i++) {
		    //calculate average of college
		    if(occupation_character_requirement[i].occupation == this.id){
		    	var occupationVQRBuff=[];
		    	occupationVQRBuff.push(occupation_character_requirement[i].verbalSkill, occupation_character_requirement[i].quantitativeSkill, occupation_character_requirement[i].reasoningSkill);

				name = occupation_character_requirement[i].occupation;
				description = occupation_character_requirement[i].description;

				if(omarkOrder==0){
	            occupationDescription.html(name.bold().fontsize(3)+"\r\n"+description)	
	                .style("left", (d3.event.pageX-280) + "px")		
	                .style("top", (d3.event.pageY + 10) + "px");

				occupationDescription.transition()		
	                .duration(200)		
	                .style("opacity", .9);	
			    
				d3.selectAll(".occupationVQRHighlightBar0").remove();
				// occupationVQRHighlightBar0=svg.selectAll(".occupationVQRHighlightBar0")
		  //           .data(occupationVQRBuff)
		  //           .enter().append("g")
		  //           .attr("class","occupationVQRHighlightBar0");

		  //           occupationVQRHighlightBar0.append("rect") 
		  //               .attr("x",function (d,i,j) { return 943+ d*172 - 3; })
		  //               .attr("y",function (d,i,j) { return (i * 70) + 50; })
		  //               .attr("height",function (d,i,j) { return 0;})
		  //               .attr("width",6)
		  //               .style("fill-opacity",0.9)
		  //               .style("fill", function(){
				// 			if(omarkOrder==0)
				// 				return "#FA8072";
				// 			if(omarkOrder==1)
				// 				return "#82CAFA";
				// 		});

		  //           occupationVQRHighlightBar0.selectAll("rect").transition().duration(300)
				// 		.style("opacity",0.9)
				// 		.attr("height",function (d,i,j) { return 40;});

				
				var occupationSalary=[];
				var occupationSalary10=0;
				var occupationSalary25=0;
				var occupationSalary50=0;
				var occupationSalary75=0;
				var occupationSalary90=0;
				var occupationLength=0;

				occupationSalary10=(occupation_character_requirement[i].salary10==0?occupation_character_requirement[i].salary25-(initoccupationSalary[1]-initoccupationSalary[0]):occupation_character_requirement[i].salary10);
				occupationSalary25=occupation_character_requirement[i].salary25;
				occupationSalary50=occupation_character_requirement[i].salary50;
				occupationSalary75=occupation_character_requirement[i].salary75;
				occupationSalary90=(occupation_character_requirement[i].salary90==0?occupation_character_requirement[i].salary75+(initoccupationSalary[4]-initoccupationSalary[3]):occupation_character_requirement[i].salary90);

				occupationSalary.push(occupationSalary10,occupationSalary25, occupationSalary50, occupationSalary75,occupationSalary90);

				occupationSalarybar.select("rect").transition().duration(200)
					.attr("x",function(d,i){return -67+ 1010+(occupationSalary[i]-10000)*0.0023;})
					.attr("width",function(d,i){return (occupationSalary[i+1]-occupationSalary[i])*0.0023;});
				}if (omarkOrder==1) {
					//create new bars
					occupationDescription.html(name.bold().fontsize(3)+"\r\n"+description)	
	                .style("left", (d3.event.pageX-280) + "px")		
	                .style("top", (d3.event.pageY + 10) + "px");

				occupationDescription.transition()		
	                .duration(200)		
	                .style("opacity", .9);	
			    d3.selectAll(".occupationVQRHighlightBar1").remove();
				// occupationVQRHighlightBar1=svg.selectAll(".occupationVQRHighlightBar1")
		  //           .data(occupationVQRBuff)
		  //           .enter().append("g")
		  //           .attr("class","occupationVQRHighlightBar1");

		  //           occupationVQRHighlightBar1.append("rect") 
		  //               .attr("x",function (d,i,j) { return 943+ d*172 - 3;})
		  //               .attr("y",function (d,i,j) { return (i * 70) + 50; })
		  //               .attr("height",function (d,i,j) { return 0;})
		  //               .attr("width",6)
		  //               .style("fill-opacity",0.9)
		  //               .style("fill", function(){
				// 			if(omarkOrder==0)
				// 				return "#FA8072";
				// 			if(omarkOrder==1)
				// 				return "#82CAFA";
				// 		});

		  //           occupationVQRHighlightBar1.selectAll("rect").transition().duration(300)
				// 		.style("opacity",0.9)
				// 		.attr("height",function (d,i,j) { return 40;});
				}
		    }
		}
		omarkOrder++;
	}
*/
};









//characteristics

function majorCharacterChange(ID){
	var majorVQRBuff=[];
	
	var majorSAT = [];
	var majorGPA = [];
	var majorSalary = [];

	var majorSAT10=0;
	var majorSAT25=0;
	var majorSAT50=0;
	var majorSAT75=0;
	var majorSAT90=0;

	var majorGPA10=0;
	var majorGPA25=0;
	var majorGPA50=0;
	var majorGPA75=0;
	var majorGPA90=0;

	var majorSalary10=0;
	var majorSalary25=0;
	var majorSalary50=0;
	var majorSalary75=0;
	var majorSalary90=0;
	var majorLength=0;

	
	if(ID != null){
	    for (var i = 0; i < major_character_requirement.length; i++) {
	    	if(major_character_requirement[i].college == ID){
	    		majorLength++;
	    		majorVQRBuff.push([major_character_requirement[i].verbalSkill, major_character_requirement[i].quantitativeSkill, major_character_requirement[i].reasoningSkill]);

	    			majorSAT10+=(major_character_requirement[i].SAT10==0?major_character_requirement[i].SAT25-(initmajorSAT[1]-initmajorSAT[0]):major_character_requirement[i].SAT10);
	    				
	    			majorSAT25+=major_character_requirement[i].SAT25;
					majorSAT50+=major_character_requirement[i].SAT50;
					majorSAT75+=major_character_requirement[i].SAT75;
					majorSAT90+=(major_character_requirement[i].SAT90==0?major_character_requirement[i].SAT75+(initmajorSAT[4]-initmajorSAT[3]):major_character_requirement[i].SAT90);

					majorGPA10+=(major_character_requirement[i].GPA10==0?major_character_requirement[i].GPA25-(initmajorGPA[1]-initmajorGPA[0]):major_character_requirement[i].GPA10);
					majorGPA25+=major_character_requirement[i].GPA25;
					majorGPA50+=major_character_requirement[i].GPA50;
					majorGPA75+=major_character_requirement[i].GPA75;
					majorGPA90+=(major_character_requirement[i].GPA90==0?major_character_requirement[i].GPA75+(initmajorGPA[4]-initmajorGPA[3]):major_character_requirement[i].GPA90);

					majorSalary10+=(major_character_requirement[i].salary10==0?major_character_requirement[i].salary25-(initmajorSalary[1]-initmajorSalary[0]):major_character_requirement[i].salary10);
					majorSalary25+=major_character_requirement[i].salary25;
					majorSalary50+=major_character_requirement[i].salary50;
					majorSalary75+=major_character_requirement[i].salary75;
					majorSalary90+=(major_character_requirement[i].salary90==0?major_character_requirement[i].salary75+(initmajorSalary[4]-initmajorSalary[3]):major_character_requirement[i].salary90);
	    	}
	    };
	    majorSAT10=parseInt(majorSAT10/majorLength);
		majorSAT25=parseInt(majorSAT25/majorLength);
		majorSAT50=parseInt(majorSAT50/majorLength);
		majorSAT75=parseInt(majorSAT75/majorLength);
		majorSAT90=parseInt(majorSAT90/majorLength);
		majorSAT.push(majorSAT10,majorSAT25, majorSAT50, majorSAT75,majorSAT90);

		majorGPA10=(majorGPA10/majorLength);
		majorGPA25=(majorGPA25/majorLength);
		majorGPA50=(majorGPA50/majorLength);
		majorGPA75=(majorGPA75/majorLength);
		majorGPA90=(majorGPA90/majorLength);
		majorGPA.push(majorGPA10,majorGPA25, majorGPA50, majorGPA75,majorGPA90);

		majorSalary10=(majorSalary10/majorLength);
		majorSalary25=(majorSalary25/majorLength);
		majorSalary50=(majorSalary50/majorLength);
		majorSalary75=(majorSalary75/majorLength);
		majorSalary90=(majorSalary90/majorLength);
		majorSalary.push(majorSalary10,majorSalary25, majorSalary50, majorSalary75,majorSalary90);

	}

	if(ID == null){
		majorVQRBuff=majorVQR;
		majorLength=0;
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
		majorSAT.push(majorSAT10,majorSAT25, majorSAT50, majorSAT75,majorSAT90);


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
		majorGPA.push(majorGPA10,majorGPA25, majorGPA50, majorGPA75,majorGPA90);


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
		majorSalary.push(majorSalary10,majorSalary25, majorSalary50, majorSalary75,majorSalary90);

	}
/*
    majorVQRBar.selectAll("rect").transition().duration(500)
    	.attr("y", function (d,i,j){return (i * 70) + 50 +30;})
		.attr("height",function (d,i,j) { return 0;});

	d3.selectAll(".majorVQRBar").remove();


	majorVQRBar=svg.selectAll(".majorVQRBar")
        .data(majorVQRBuff)
        .enter().append("g")
        .attr("class","majorVQRBar");

    majorVQRBar.selectAll("rect") // these
        .data(function (d,i,j) {return d;}) //lines;   
        .enter() //text displays normally
        .append("rect")
        .attr("x",function (d,i,j) { return 93-160+ d*172; })
        .attr("y",function (d,i,j) { return (i * 70) + 50; })
        .attr("height",function (d,i,j) { return 0;})
        .attr("width",1)
        .style("opacity",0)
        .style("fill", heatColor[0]);

    majorVQRBar.selectAll("rect").transition().duration(500)
		.style("opacity",0.9)
		.attr("height",function (d,i,j) { return 40;});*/
	majorSATbar.select("rect").transition().duration(500)
		.attr("x",function(d,i){return SAT_relevantX+33+ (majorSAT[i]-800)*0.265;})
		.attr("width",function(d,i){return (majorSAT[i+1]-majorSAT[i])*0.265;});

	majorGPAbar.select("rect").transition().duration(500)
		.attr("x",function(d,i){return GPA_relevantX+33+ (majorGPA[i]-2.0)*90;})
		.attr("width",function(d,i){return (majorGPA[i+1]-majorGPA[i])*90;});

	majorSalarybar.select("rect").transition().duration(500)
		.attr("x",function(d,i){return MSalary_relevantX +33+ (majorSalary[i]-10000)*0.0023;})
		.attr("width",function(d,i){return (majorSalary[i+1]-majorSalary[i])*0.0023;});
};

function occupationCharacterChange(ID){


	var occupationVQRBuff=[];
	var occupationSalary=[];

	var occupationSalary10=0;
	var occupationSalary25=0;
	var occupationSalary50=0;
	var occupationSalary75=0;
	var occupationSalary90=0;
	var occupationLength=0;

	if(ID !=null){
	    for (var i = 0; i < occupation_character_requirement.length; i++) {
	    	if(occupation_character_requirement[i].occupationGroup == ID){
	    		occupationLength++;
	    		occupationVQRBuff.push([occupation_character_requirement[i].verbalSkill, occupation_character_requirement[i].quantitativeSkill, occupation_character_requirement[i].reasoningSkill]);


	    			occupationSalary10+=(occupation_character_requirement[i].salary10==0?occupation_character_requirement[i].salary25-(initoccupationSalary[1]-initoccupationSalary[0]):occupation_character_requirement[i].salary10);
					occupationSalary25+=occupation_character_requirement[i].salary25;
					occupationSalary50+=occupation_character_requirement[i].salary50;
					occupationSalary75+=occupation_character_requirement[i].salary75;
					occupationSalary90+=(occupation_character_requirement[i].salary90==0?occupation_character_requirement[i].salary75+(initoccupationSalary[4]-initoccupationSalary[3]):occupation_character_requirement[i].salary90);
	    		
	    	}
	    };

	    occupationSalary10=(occupationSalary10/occupationLength);
		occupationSalary25=(occupationSalary25/occupationLength);
		occupationSalary50=(occupationSalary50/occupationLength);
		occupationSalary75=(occupationSalary75/occupationLength);
		occupationSalary90=(occupationSalary90/occupationLength);
		occupationSalary.push(occupationSalary10,occupationSalary25, occupationSalary50, occupationSalary75,occupationSalary90);

	}

	if(ID == null){
		occupationVQRBuff=occupationVQR;

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
		occupationSalary.push(occupationSalary10,occupationSalary25, occupationSalary50, occupationSalary75,occupationSalary90);
		console.log(occupationSalary)
	}

/*
    occupationVQRBar.selectAll("rect").transition().duration(500)
    	.attr("y", function (d,i,j){return (i * 70) + 50 +30;})
		.attr("height",function (d,i,j) { return 0;})
		;

	d3.selectAll(".occupationVQRBar").remove();


	occupationVQRBar=svg.selectAll(".occupationVQRBar")
        .data(occupationVQRBuff)
        .enter().append("g")
        .attr("class","occupationVQRBar");

    occupationVQRBar.selectAll("rect") // these
        .data(function (d,i,j) {return d;}) //lines;   
        .enter() //text displays normally
        .append("rect")
        .attr("x",function (d,i,j) { return 943+ d*172; })
        .attr("y",function (d,i,j) { return (i * 70) + 50; })
        .attr("height",function (d,i,j) { return 0;})
        .attr("width",1)
        .style("opacity",0)
        .style("fill", heatColor[0]);

    occupationVQRBar.selectAll("rect").transition().duration(500)
		.style("opacity",0.9)
		.attr("height",function (d,i,j) { return 40;});*/

	occupationSalarybar.select("rect").transition().duration(500)
		.attr("x",function(d,i){return OSalary_relevantX + 33+(occupationSalary[i]-10000)*0.0023;})
		.attr("width",function(d,i){return (occupationSalary[i+1]-occupationSalary[i])*0.0023;});
};

//calculate RGB color for bars, VQR:0.0~1.0
//var colorRange=["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"];

//red - blue
var colorRange=["#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4"];
var colorScale=d3.scaleQuantile().range(colorRange).domain([-1,1]);

function calculateVQRcolor(ID){
	var VQRBuff=[];
	var characters={verbal:0,quantitative:0,length:0};
	var vScore,qScore,eucliDis,BrightScale=0;
	
	if(search_click && current == "major"){
		for (var i = 0; i < ID.length; i++){
	    	for  (var j = 0; j < major_character_requirement.length; j++){
	    		if(major_character_requirement[j].major == ID[i]){
	    			vScore=major_character_requirement[j].verbalSkill;
	    			qScore=major_character_requirement[j].quantitativeSkill;
	    			eucliDis = Math.pow(Math.pow(vScore,2)+Math.pow(qScore,2),0.5);
	    			BrightScale=d3.scaleLinear().range(["#dddddd",colorScale((qScore-vScore)*10)]).domain([0,1.5]);
	    			VQRBuff.push(BrightScale(eucliDis));
	    		}
	    	}
	    }
	    current = '';
	}

	if(search_click && current == "occupation"){
		for (var i = 0; i < ID.length; i++){
	    	for  (var j = 0; j < occupation_character_requirement.length; j++){
	    		if(occupation_character_requirement[j].occupation == ID[i]){
	    			vScore=occupation_character_requirement[j].verbalSkill;
	    			qScore=occupation_character_requirement[j].quantitativeSkill;
	    			eucliDis = Math.pow(Math.pow(vScore,2)+Math.pow(qScore,2),0.5);
	    			BrightScale=d3.scaleLinear().range(["#dddddd",colorScale((qScore-vScore)*10)]).domain([0,1.5]);
	    			VQRBuff.push(BrightScale(eucliDis));
	    		}
	    	}
	    }
	    current = '';
	}

	//initial color calculation
	if (ID != null && current == null) {
		if (ifCollege) {		
			for (var i = 0; i < major_character_requirement.length; i++) {
		    	if(major_character_requirement[i].college == ID){
		    		characters.verbal += major_character_requirement[i].verbalSkill;
		    		characters.quantitative += major_character_requirement[i].quantitativeSkill;
		    		characters.length += 1;
		    	}
		    }
		}
		
		if(!ifCollege){
			for (var i = 0; i < occupation_character_requirement.length; i++) {
		    	if(occupation_character_requirement[i].occupationGroup == ID){
		    		characters.verbal += occupation_character_requirement[i].verbalSkill;
		    		characters.quantitative += occupation_character_requirement[i].quantitativeSkill;
		    		characters.length += 1;
		    	}

		    }
		}

		vScore = characters.verbal/characters.length;
		qScore = characters.quantitative/characters.length;
	    eucliDis = Math.pow(Math.pow(vScore,2)+Math.pow(qScore,2),0.5);
	    BrightScale=d3.scaleLinear().range(["#dddddd",colorScale((qScore-vScore)*10)]).domain([0,1]);
	    VQRBuff = BrightScale(eucliDis);
	    //VQRBuff.push(colorScale((qScore-vScore)*4));
	}

	if(ID != null && current =='college'){
	    for (var i = 0; i < major_character_requirement.length; i++) {
	    	if(major_character_requirement[i].college == ID){

	    		vScore=major_character_requirement[i].verbalSkill;
	    		qScore=major_character_requirement[i].quantitativeSkill;

	    		eucliDis = Math.pow(Math.pow(vScore,2)+Math.pow(qScore,2),0.5);
	    		BrightScale=d3.scaleLinear().range(["#dddddd",colorScale((qScore-vScore)*10)]).domain([0,1.5]);


	    		VQRBuff.push(BrightScale(eucliDis));
	    		//VQRBuff.push(colorScale((qScore-vScore)*4));

	    	}
	    }


	}

	
	if(ID != null && current =='occupationGroup'){
	    for (var i = 0; i < occupation_character_requirement.length; i++) {
	    	if(occupation_character_requirement[i].occupationGroup == ID){
	    		var vScore=occupation_character_requirement[i].verbalSkill;
	    		var qScore=occupation_character_requirement[i].quantitativeSkill;

	    		var eucliDis = Math.pow(Math.pow(vScore,2)+Math.pow(qScore,2),0.5);
	    		var BrightScale=d3.scaleLinear().range(["#dddddd",colorScale((qScore-vScore)*10)]).domain([0,1.5]);


	    		VQRBuff.push(BrightScale(eucliDis));
	    		//VQRBuff.push(colorScale((qScore-vScore)*4));
	    	}
	    }
	}


/*
	if(search_click){
		for (var i = 0; i < occupation_character_requirement.length; i++) {
	    	if(occupation_character_requirement[i].occupationGroup == ID){
	    		var vScore=occupation_character_requirement[i].verbalSkill;
	    		var qScore=occupation_character_requirement[i].quantitativeSkill;

	    		var eucliDis = Math.pow(Math.pow(vScore,2)+Math.pow(qScore,2),0.5);
	    		var BrightScale=d3.scaleLinear().range(["#ffffff",colorScale((qScore-vScore)*10)]).domain([0,1.5]);


	    		VQRBuff.push(BrightScale(eucliDis));
	    		//VQRBuff.push(colorScale((qScore-vScore)*4));
	    	}
	    }
	}*/
	return VQRBuff;
}












//mapping(main part)

function draw_path(left, right, number, left_list, left_number, left_x, left_y, left_length, right_list, right_number, right_x, right_y, right_length, color_style){

	d3.selectAll(".mainPath").remove();
	var VQRcolor;
	if (current != '') {
		VQRcolor = calculateVQRcolor(this.idBuff);
	}
	else{
		if(college_click == '?' && occupationGroup_click == '?'){
			VQRcolor=collegeColor;
		}

		if(college_click==true){
			current='college';
			VQRcolor=calculateVQRcolor(college.click);
		}
		else if(occupationGroup_click==true){
			current='occupationGroup';
			VQRcolor=calculateVQRcolor(occupationGroup.click);
		}
		if(search_click){
			current ="major";
			VQRcolor=calculateVQRcolor(major.name);
		}
	}

	var test=[0];
	var mainPath = svg.selectAll(".mainPath")
		.data(test)
		.enter().append("g")
		.attr("class","mainPath");


	minn = (searchName!=null)?5:10;
	gap=2;
	height=40;


	path_left_name_list = [];
	path_right_name_list = [];
	path_left_name_list = left_list;
	path_right_name_list = right_list;
	
	var right_current = [];
	var right_width = [];
	var left_width = [];
	var left_current = [];

	
	//calculating the right width and right current
	var total=1; //avoid the final total equals to 0
	for(var i=0;i< right_number.length;i++)
	     total=total+right_number[i];
	var scale=(right_length-minn*right_number.length -(right_number.length-1)*gap)/total;
	
	for (var i=0;i< right_list.length;i++)
	{
		right_width[i]= minn + scale*right_number[i];
		if(i == 0)
		 {   right_current[i] = right_y;}
		else
		  {  right_current[i]=right_current[i-1]+gap+right_width[i-1];}
	}
	// calculating the left width and left current
    total=1; //avoid the final total equals to 0
	for(var i=0;i< left_number.length;i++)
	    total=total+left_number[i];
    scale=(left_length-minn*left_number.length -(left_number.length-1)*gap)/total;
	
    for (var i=0;i< left_list.length;i++)
	{
		left_width[i]= minn + scale*left_number[i];
		if(i == 0 )
		 {   left_current[i]=left_y; }
		else
		{    left_current[i]=left_current[i-1]+gap+left_width[i-1];}
	}

	//draw path



	for(var i=0;i< left_list.length;i++){
		for(var j=0;j< right_list.length;j++){
			first_y=left_current[i];
			first_x=left_x+height;

			
			
			left_right_num=0;
			for(var k=0;k< left.length;k++){
				if(left[k] == left_list[i] && right[k] == right_list[j]){
					left_right_num = number[k];
					break;
				}
			}
			if (left_right_num > 0){
				left_current[i]=left_current[i]+left_right_num*left_width[i]/left_number[i];
				fourth_y=left_current[i];
				fourth_x=left_x+height;
				
				second_y=right_current[j];
				second_x=right_x;
				
				right_current[j]=right_current[j]+left_right_num*right_width[j]/right_number[j];
				third_y=right_current[j];
				third_x=right_x;


				poly = [first_x,first_y,second_x,second_y,third_x,third_y,fourth_x,fourth_y];


				var color;
				if(i<10)
					color=collegeColor[i];
				else{
					var num=Math.floor((Math.random() * 5) + 5);
					color=collegeColor[num];
				}
				
				
				mainPath.append("polygon")
					.attr("points",function (d){return poly;})
				    .style("fill",function (d){

				    	if (current =='') {
				    		if(college_click){
				    			return VQRcolor[i];
				    		}

				    		
				    	}
				    	else {
				    		if (current == 'college') {
				    			return VQRcolor[i];
				    		}
				    		if (current == 'occupationGroup') {
				    			return VQRcolor[j];
				    		}
				    	}
				    		
				    })
				    .attr("id",function(d){
				    	if(!search_click && college.click == "?" && occupationGroup.click == "?")
				    		return college.name[i].replace(/\s/g, '').replace(/ /g,'').replace(/','/g,'');
				    		
				    })
				    .attr("ogid",function(d){
				    	if(!search_click && college.click == "?" && occupationGroup.click == "?")
				    		return occupationGroup.name[j].replace(/\s/g, '').replace(/ /g,'').replace(/','/g,'');
				    		
				    })
				    .attr("cid",function(d){
				    	if(college.click != "?" || search_click)
					    	return major.name[i].replace(/\s/g, '').replace(/','/g,'').replace(/ /g,'');
				    })
				    .attr("oid",function(d){
				    	if(occupationGroup.click != "?" || search_click)
				    		return occupation.name[j].replace(/\s/g, '').replace(/\//g,'').replace(/ /g,'').replace(/','/g,'');
				    })
				    .attr("textnum",function(d){
				    	return left_right_num;
				    })
				    /*
				    .on("mouseover", function(d) {
			            d3.selectAll(".mainPath").style("fill-opacity",0.4); 
			            d3.select(this).style("fill-opacity",0.9);
			            textY=(this.points[0].y+this.points[2].y)/2;

			            mainPath.append("circle")
			            	.attr("cx", (first_x+second_x)/2)
	                       .attr("cy", textY-5)
	                       .attr("r", 30)
	                       .style("fill", "white")
	                       .style("fill-opacity",0.4);

			            mainPath.append("text")
			            	.text(d3.select(this).attr("textnum"))
			            	.style("fill","white")
			            	.style("font-size",20)
							.style("font-weight","bold")						            	
			            	.style("stroke","black")
			            	.style("stroke-width",1)
			            	.style("fill-opacity",1)
			            	.attr("x",(first_x+second_x)/2-15)
			            	.attr("y",textY);
			        })
			        .on("mouseout", function(d) {
			            
			            mainPath.selectAll("text").remove();
			            mainPath.selectAll("circle").remove();
			            d3.selectAll(".mainPath").style("fill-opacity",0.4); 
			        })*/
				    .style("fill-opacity",0)
				    .attr("class","mainPath");

				mainPath.append("text").text("");


			
			}
		}
	};

	d3.selectAll(".mainPath").transition().duration(animationTime)//1000
		.style("fill-opacity",0.4);     
};


//Draw edges functions: 2
//draw main edges
function find_college_occupationGroup(){
	college_click = '?';
	occupationGroup_click = '?';

	var hr = new XMLHttpRequest();
	hr.open("POST", url, true);
	hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	hr.send("college="+college_click +"&occupationGroup="+occupationGroup_click);

    hr.onreadystatechange = function() {
	    if(hr.readyState == 4 && hr.status == 200) {
			///
			
			var x=hr.responseText.split("*");
            var num1= parseInt(x[0]);
			
			education_job.education = [];
			education_job.job = [];
			education_job.number = [];
			var k =1 ;
			for (var i=0;i < num1;i++)
			{
		        education_job.education.push(x[k]);
				k=k+1;
				education_job.job.push(x[k]);
				k=k+1;
				education_job.number.push(parseInt(x[k]));
				k=k+1;
			}

			draw_path(education_job.education,education_job.job, education_job.number,
				      college.name,college.number, relevantX - 10, collegeX[0],  620, 
 					  occupationGroup.name,occupationGroup.number, relevantX + 290 ,occupationGroupX[0],620,
 					  college.style);


		}
	}
};

//draw different hierachical edges
function find_major_occupation(college_click, occupationGroup_click, startpoint,style,subbarColor){
			
	college_click=college_click;
	occupationGroup_click=occupationGroup_click;

	if(!college_click)
		college_click='?';
	if(!occupationGroup_click)
		occupationGroup_click='?';

	var hr = new XMLHttpRequest();
	hr.open("POST", url, true);
	hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    hr.onreadystatechange = function() {
	    if(hr.readyState == 4 && hr.status == 200) {
			///
			var x=hr.responseText.split("*");
			
			var num1= parseInt(x[0]);
			var num2= parseInt(x[num1*2+1]);
			var num3= parseInt(x[num1*2+1+num2*2+1]);

			major.name = [];
			major.number = [];
			major.style = [];
			major.opacity = [];
			major.character = [];
			major.college = [];

			occupation.name = [];
			occupation.number = [];
			occupation.style = [];
			occupation.opacity = [];
			occupation.character = [];
			occupation.occupationGroup = [];
			
			education_job.education = [];
			education_job.job = [];
			education_job.number = [];

			
			

			//judge the conditions of college,major to occupationGroup,occupation
			if(college_click!='?' && occupationGroup_click=='?'){			
				var k=1;
				k=calculateMajor(num1,x,k,college_click);

				k=k+1;
				k=calculateMajorToOccupation(num2,x,k,college_click,occupationGroup_click);
			}
			else if(college_click=='?' && occupationGroup_click!='?'){			
				var k=1;
				k=calculateOccupation(num1,x,k,college_click);

				k=k+1;
				k=calculateMajorToOccupation(num2,x,k,college_click,occupationGroup_click);
				
			}
			else if(college_click!='?' && occupationGroup_click!='?'){			
				var k=1;
				k=calculateMajor(num1,x,k,college_click);

				k+=1;
				k=calculateOccupation(num2,x,k,college_click);

				k=k+1;
				k=calculateMajorToOccupation(num3,x,k,college_click,occupationGroup_click);
			}

			
			if(college_click != college_click_buff){
				create_major_bar(major,startpoint, style,subbarColor);	
				college_click_buff=college_click; 
			}			  	
			if (occupationGroup_click != occupationGroup_click_buff){
				create_occupation_bar(occupation,startpoint,style,subbarColor);	
				 occupationGroup_click_buff=occupationGroup_click;

			}


			//major to occupationGroup
			if(college_click!='?' && occupationGroup_click=='?'){
				draw_path(education_job.education,education_job.job, education_job.number,
			        major.name, major.number, relevantX - 12.5, majorX[0],  458, 
					    occupationGroup.name,occupationGroup.number, relevantX + 289.5 ,occupationGroupX[0],620,
					    college.style);
				}

				//college to occupation
			if(college_click=='?' && occupationGroup_click!='?'){
				draw_path(education_job.education,education_job.job, education_job.number,
			        college.name, college.number, relevantX - 10, collegeX[0],  620, 
					    occupation.name,occupation.number, relevantX + 292.5 ,occupationX[0],460,
					    college.style);
			}

			//major to occupation
			if(college_click!='?' && occupationGroup_click!='?'){
				draw_path(education_job.education,education_job.job, education_job.number,
			        major.name, major.number, relevantX - 12.5, majorX[0],  458, 
					    occupation.name,occupation.number, relevantX + 292.5 ,occupationX[0],460,
					    college.style);
			}
	    }
	}
	hr.send("college="+college_click +"&occupationGroup="+occupationGroup_click);
	//hr.send("major="+null+"&occupation="+null);	
	switch(occupationGroup.click)
	{
		case("Agriculture"):min=0;max=3;maini=0;break;
		case("Business"):min=4;max=31;maini=1;break;
		case("Communication"):min=32;max=41;maini=2;break;
		case("Computer"):min=42;max=50;maini=3;break;
		case("Construction"):min=51;max=54;maini=4;break;
		case("Education"):min=55;max=61;maini=5;break;
		case("Engineering"):min=62;max=75;maini=6;break;
		case("Healthcare"):min=76;max=82;maini=7;break;
		case("Manufacturing"):min=83;max=87;maini=8;break;
		case("Sales"):min=88;max=96;maini=9;break;
		case("Science"):min=97;max=104;maini=10;break;
		case("Services"):min=105;max=113;maini=11;break;
		case("Social Services"):min=114;max=116;maini=12;break;
	};
	if(occupationGroup.click!='?')
	{
	//OSA
	for (var i = 0; i < 13; i++) {
		if (i <maini) {
			d3.selectAll(".OA")
			.select("rect[id=occupationautomationid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.style("fill",function(d,i) {
						return colors[color[i]];
				   })
			.attr("y", function(d) {
				   		return chart_base_y - (d * 1)
				   		})
			.attr("height", function(d) {
				   		return d * 1;
				   })
			.attr("x",chart_base_x+w / 80*i)
			.attr("width", w / 80 - 1);
			}
		if (i == maini) {
			d3.selectAll(".OA")
			.select("rect[id=occupationautomationid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			//.delay(500) 
			.style("fill","red")
			.attr("y", function(d) {
				   		return chart_base_y ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   })
			.attr("x",chart_base_x+w/2)
			.attr("width", w / 80 - 1);
			}
		if (i >maini) {
			d3.selectAll(".OA")
			.select("rect[id=occupationautomationid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			//.delay(500) 
			.style("fill",function(d,i) {
						return colors[color[i]];
				   }) 
			.attr("y", function(d) {
				   		return chart_base_y - (d * 1)
				   		})
			.attr("height", function(d) {
				   		return d * 1;
				   })	
			.attr("x",chart_base_x+w-(12-maini)*w / 80+(i-maini)*w / 80)
			.attr("width", w / 80 - 1);
			}
		
		
	};
	for (var i = 0; i < 117; i++) {
		if (i <= max&& min <= i) {
			d3.selectAll(".OSA")
			.select("rect[id=occupationsubautomationid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.attr("fill", function() {

				return subbarColor[i-min];

				   })
			.attr("x",chart_base_x+w/2-(max-min+1)/2* (w-w / 80*26) / 28+(i-min) * (w-w / 80*26) / 28)
			.attr("width", (w-w / 80*26) / 28 - 1)
			.attr("y", function(d) {
				   		return chart_base_y - (d * 1)
				   		})
			.attr("height", function(d) {
				   		return d * 1;
				   });
			}
		if(i < min){
			d3.selectAll(".OSA")
			.select("rect[id=occupationsubautomationid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			//.delay(500) 
			.attr("x",chart_base_x+i*((14-(max-min)/2)*(w / 28) / min))
			.attr("width", w / automation.number.length - 1)
			.attr("y", function(d) {
				   		return chart_base_y ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   });
			}

		if(i > max){
			d3.selectAll(".OSA")
			.select("rect[id=occupationsubautomationid"+i+"]")
			.transition(200000)
		    .duration(animationTime)
			//.delay(500) 
			.attr("x",chart_base_x)
			.attr("width", w / automation.number.length - 1)
			.attr("y", function(d) {
				   		return chart_base_y ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   });
			}
		}
		//OSG
		for (var i = 0; i < 13; i++) {
		if (i <maini) {
			d3.selectAll(".OG")
			.select("rect[id=occupationglobalizationid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.style("fill",function(d,i) {
						return colors[color[i]];
				   })
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*1-40;
				   		return chart_base_y+40*1-40 - (d * 0.5)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-0.5);
				   		return d * 0.5;
				   })	
			.attr("x",chart_base_x+w / 80*i)
			.attr("width", w / 80 - 1);
			}
		if (i == maini) {
			d3.selectAll(".OG")
			.select("rect[id=occupationglobalizationid"+i+"]")
			.transition(200000) 
		    .duration(animationTime)
			.delay(500) 
			.style("fill","red")
			.attr("y", function(d) {
				   		return chart_base_y+40*1-40 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   })
			.attr("x",chart_base_x+w/2)
			.attr("width", w / 80 - 1);
			}
		if (i >maini) {
			d3.selectAll(".OG")
			.select("rect[id=occupationglobalizationid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.style("fill",function(d,i) {
						return colors[color[i]];
				   }) 
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*1-40;
				   		return chart_base_y+40*1-40 - (d * 0.5)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-0.5);
				   		return d * 0.5;
			})	
			.attr("x",chart_base_x+w-(12-maini)*w / 80+(i-maini)*w / 80)
			.attr("width", w / 80 - 1);
			}
		}
		for (var i = 0; i < 117; i++) {
		if (i <= max&& min <= i) {
			d3.selectAll(".OSG")
			.select("rect[id=occupationsubglobalizationid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.attr("fill", function() {

				return subbarColor[i-min];

				   })
			.attr("x",chart_base_x+w/2-(max-min+1)/2* (w-w / 80*26) / 28+(i-min) * (w-w / 80*26) / 28)
			.attr("width", (w-w / 80*26) / 28 - 1)
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*1-40;
				   		return chart_base_y+40*1-40 - (d * 0.5)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-0.5);
				   		return d * 0.5;
				   })	
			}
		
		if(i < min){
			d3.selectAll(".OSG")
			.select("rect[id=occupationsubglobalizationid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.attr("x",chart_base_x+i*((14-(max-min)/2)*(w / 28) / min))
			.attr("width", w / automation.number.length - 1)
			.attr("y", function(d) {
				   		return chart_base_y+40*1-40 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   });
			}

		if(i > max){
			d3.selectAll(".OSG")
			.select("rect[id=occupationsubglobalizationid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.attr("x",chart_base_x)
			.attr("width", w / automation.number.length - 1)
			.attr("y", function(d) {
				   		return chart_base_y+40*1-40 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   });
			}
		}
			//OSM
		for (var i = 0; i < 13; i++) {
		if (i <maini) {
			d3.selectAll(".OM")
			.select("rect[id=occupationmarriedid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.style("fill",function(d,i) {
						return colors[color[i]];
				   })
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*2;
				   		return chart_base_y+40*2 - (d * 0.5)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-0.5);
				   		return d * 0.5;
				   })	
			.attr("x",chart_base_x+w / 80*i)
			.attr("width", w / 80 - 1);
			}
		if (i == maini) {
			d3.selectAll(".OM")
			.select("rect[id=occupationmarriedid"+i+"]")
			.transition(200000) 
		    .duration(animationTime)
			.delay(500) 
			.style("fill","red")
			.attr("y", function(d) {
				   		return chart_base_y+40*2 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   })
			.attr("x",chart_base_x+w/2)
			.attr("width", w / 80 - 1);
			}
		if (i >maini) {
			d3.selectAll(".OM")
			.select("rect[id=occupationmarriedid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.style("fill",function(d,i) {
						return colors[color[i]];
				   }) 
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*2;
				   		return chart_base_y+40*2 - (d * 0.5)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-0.5);
				   		return d * 0.5;
			})	
			.attr("x",chart_base_x+w-(12-maini)*w / 80+(i-maini)*w / 80)
			.attr("width", w / 80 - 1);
			}

		}
		for (var i = 0; i < 117; i++) {
		if (i <= max&& min <= i) {
			d3.selectAll(".OSM")
			.select("rect[id=occupationsubmairredid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.attr("fill", function() {
				
				return subbarColor[i-min];

				   })
			.attr("x",chart_base_x+w/2-(max-min+1)/2* (w-w / 80*26) / 28+(i-min) * (w-w / 80*26) / 28)
			.attr("width", (w-w / 80*26) / 28 - 1)
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*2;
				   		return chart_base_y+40*2 - (d * 0.5)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-0.5);
				   		return d *0.5;
				   })	
			}
		
		if(i < min){
			d3.selectAll(".OSM")
			.select("rect[id=occupationsubmairredid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.attr("x",chart_base_x+i*((14-(max-min)/2)*(w / 28) / min))
			.attr("width", w / automation.number.length - 1)
			.attr("y", function(d) {
				   		return chart_base_y+40*2 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   });
			}

		if(i > max){
			d3.selectAll(".OSM")
			.select("rect[id=occupationsubmairredid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.attr("x",chart_base_x)
			.attr("width", w / automation.number.length - 1)
			.attr("y", function(d) {
				   		return chart_base_y+40*2 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   });
			}
		}
		//OSblack
		for (var i = 0; i < 13; i++) {
		if (i <maini) {
			d3.selectAll(".Oblack")
			.select("rect[id=occupationblackPercentid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.style("fill",function(d,i) {
						return colors[color[i]];
				   })
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*3;
				   		return chart_base_y+40*3 - (d * 2)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-2);
				   		return d * 2;
				   })	
			.attr("x",chart_base_x+w / 80*i)
			.attr("width", w / 80 - 1);
			}
		if (i == maini) {
			d3.selectAll(".Oblack")
			.select("rect[id=occupationblackPercentid"+i+"]")
			.transition(200000) 
		    .duration(animationTime)
			.delay(500) 
			.style("fill","red")
			.attr("y", function(d) {
				   		return chart_base_y+40*3 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   })
			.attr("x",chart_base_x+w/2)
			.attr("width", w / 80 - 1);
			}
		if (i >maini) {
			d3.selectAll(".Oblack")
			.select("rect[id=occupationblackPercentid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.style("fill",function(d,i) {
						return colors[color[i]];
				   }) 
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*3;
				   		return chart_base_y+40*3 - (d * 2)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-2);
				   		return d * 2;
			})	
			.attr("x",chart_base_x+w-(12-maini)*w / 80+(i-maini)*w / 80)
			.attr("width", w / 80 - 1);
			}

		}
		for (var i = 0; i < 117; i++) {
		if (i <= max&& min <= i) {
			d3.selectAll(".OSblack")
			.select("rect[id=occupationsubblackPercentid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.attr("fill", function() {
				
				return subbarColor[i-min];

				   })
			.attr("x",chart_base_x+w/2-(max-min+1)/2* (w-w / 80*26) / 28+(i-min) * (w-w / 80*26) / 28)
			.attr("width", (w-w / 80*26) / 28 - 1)
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*3;
				   		return chart_base_y+40*3 - (d * 2)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-2);
				   		return d * 2;
				   })	
			}
		
		if(i < min){
			d3.selectAll(".OSblack")
			.select("rect[id=occupationsubblackPercentid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.attr("x",chart_base_x+i*((14-(max-min)/2)*(w / 28) / min))
			.attr("width", w / blackPercent.number.length - 1)
			.attr("y", function(d) {
				   		return chart_base_y+40*3 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   });
			}

		if(i > max){
			d3.selectAll(".OSblack")
			.select("rect[id=occupationsubblackPercentid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.attr("x",chart_base_x)
			.attr("width", w / blackPercent.number.length - 1)
			.attr("y", function(d) {
				   		return chart_base_y+40*3 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   });
			}
		}
		//OSasian
		for (var i = 0; i < 13; i++) {
		if (i <maini) {
			d3.selectAll(".Oasian")
			.select("rect[id=occupationasianPercentid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.style("fill",function(d,i) {
						return colors[color[i]];
				   })
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*4;
				   		return chart_base_y+40*4 - (d * 2)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-2);
				   		return d * 2;
				   })	
			.attr("x",chart_base_x+w / 80*i)
			.attr("width", w / 80 - 1);
			}
		if (i == maini) {
			d3.selectAll(".Oasian")
			.select("rect[id=occupationasianPercentid"+i+"]")
			.transition(200000) 
		    .duration(animationTime)
			.delay(500) 
			.style("fill","red")
			.attr("y", function(d) {
				   		return chart_base_y+40*4 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   })
			.attr("x",chart_base_x+w/2)
			.attr("width", w / 80 - 1);
			}
		if (i >maini) {
			d3.selectAll(".Oasian")
			.select("rect[id=occupationasianPercentid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.style("fill",function(d,i) {
						return colors[color[i]];
				   }) 
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*4;
				   		return chart_base_y+40*4 - (d * 2)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-2);
				   		return d * 2;
			})	
			.attr("x",chart_base_x+w-(12-maini)*w / 80+(i-maini)*w / 80)
			.attr("width", w / 80 - 1);
			}

		}
		for (var i = 0; i < 117; i++) {
		if (i <= max&& min <= i) {
			d3.selectAll(".OSasian")
			.select("rect[id=occupationsubasianPercentid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.attr("fill", function() {
				
				return subbarColor[i-min];

				   })
			.attr("x",chart_base_x+w/2-(max-min+1)/2* (w-w / 80*26) / 28+(i-min) * (w-w / 80*26) / 28)
			.attr("width", (w-w / 80*26) / 28 - 1)
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*4;
				   		return chart_base_y+40*4 - (d * 2)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-2);
				   		return d * 2;
				   })	
			}
		
		if(i < min){
			d3.selectAll(".OSasian")
			.select("rect[id=occupationsubasianPercentid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.attr("x",chart_base_x+i*((14-(max-min)/2)*(w / 28) / min))
			.attr("width", w / asianPercent.number.length - 1)
			.attr("y", function(d) {
				   		return chart_base_y+40*4 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   });
			}

		if(i > max){
			d3.selectAll(".OSasian")
			.select("rect[id=occupationsubasianPercentid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.attr("x",chart_base_x)
			.attr("width", w / asianPercent.number.length - 1)
			.attr("y", function(d) {
				   		return chart_base_y+40*4 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   });
			}
		}
		//OShispanic
		for (var i = 0; i < 13; i++) {
		if (i <maini) {
			d3.selectAll(".Ohispanic")
			.select("rect[id=occupationhispanicPercentid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.style("fill",function(d,i) {
						return colors[color[i]];
				   })
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*5;
				   		return chart_base_y+40*5 - (d * 2)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-2);
				   		return d * 2;
				   })	
			.attr("x",chart_base_x+w / 80*i)
			.attr("width", w / 80 - 1);
			}
		if (i == maini) {
			d3.selectAll(".Ohispanic")
			.select("rect[id=occupationhispanicPercentid"+i+"]")
			.transition(200000) 
		    .duration(animationTime)
			.delay(500) 
			.style("fill","red")
			.attr("y", function(d) {
				   		return chart_base_y+40*5 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   })
			.attr("x",chart_base_x+w/2)
			.attr("width", w / 80 - 1);
			}
		if (i >maini) {
			d3.selectAll(".Ohispanic")
			.select("rect[id=occupationhispanicPercentid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.style("fill",function(d,i) {
						return colors[color[i]];
				   }) 
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*5;
				   		return chart_base_y+40*5 - (d * 2)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-2);
				   		return d * 2;
			})	
			.attr("x",chart_base_x+w-(12-maini)*w / 80+(i-maini)*w / 80)
			.attr("width", w / 80 - 1);
			}

		}
		for (var i = 0; i < 117; i++) {
		if (i <= max&& min <= i) {
			d3.selectAll(".OShispanic")
			.select("rect[id=occupationsubhispanicPercentid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.attr("fill", function() {
				
				return subbarColor[i-min];

				   })
			.attr("x",chart_base_x+w/2-(max-min+1)/2* (w-w / 80*26) / 28+(i-min) * (w-w / 80*26) / 28)
			.attr("width", (w-w / 80*26) / 28 - 1)
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*5;
				   		return chart_base_y+40*5 - (d * 2)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-2);
				   		return d * 2;
				   })	
			}
		
		if(i < min){
			d3.selectAll(".OShispanic")
			.select("rect[id=occupationsubhispanicPercentid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.attr("x",chart_base_x+i*((14-(max-min)/2)*(w / 28) / min))
			.attr("width", w / hispanicPercent.number.length - 1)
			.attr("y", function(d) {
				   		return chart_base_y+40*5 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   });
			}

		if(i > max){
			d3.selectAll(".OShispanic")
			.select("rect[id=occupationsubhispanicPercentid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.attr("x",chart_base_x)
			.attr("width", w / hispanicPercent.number.length - 1)
			.attr("y", function(d) {
				   		return chart_base_y+40*5 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   });
			}
		}
		//OSfemale
		for (var i = 0; i < 13; i++) {
		if (i <maini) {
			d3.selectAll(".Ofemale")
			.select("rect[id=occupationfemalePercentid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.style("fill",function(d,i) {
						return colors[color[i]];
				   })
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*6;
				   		return chart_base_y+40*6 - (d * 0.5)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-0.5);
				   		return d * 0.5;
				   })	
			.attr("x",chart_base_x+w / 80*i)
			.attr("width", w / 80 - 1);
			}
		if (i == maini) {
			d3.selectAll(".Ofemale")
			.select("rect[id=occupationfemalePercentid"+i+"]")
			.transition(200000) 
		    .duration(animationTime)
			.delay(500) 
			.style("fill","red")
			.attr("y", function(d) {
				   		return chart_base_y+40*6 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   })
			.attr("x",chart_base_x+w/2)
			.attr("width", w / 80 - 1);
			}
		if (i >maini) {
			d3.selectAll(".Ofemale")
			.select("rect[id=occupationfemalePercentid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.style("fill",function(d,i) {
						return colors[color[i]];
				   }) 
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*6;
				   		return chart_base_y+40*6 - (d * 0.5)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-0.5);
				   		return d * 0.5;
			})	
			.attr("x",chart_base_x+w-(12-maini)*w / 80+(i-maini)*w / 80)
			.attr("width", w / 80 - 1);
			}

		}
		for (var i = 0; i < 117; i++) {
		if (i <= max&& min <= i) {
			d3.selectAll(".OSfemale")
			.select("rect[id=occupationsubfemalePercentid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.attr("fill", function() {
				
				return subbarColor[i-min];

				   })
			.attr("x",chart_base_x+w/2-(max-min+1)/2* (w-w / 80*26) / 28+(i-min) * (w-w / 80*26) / 28)
			.attr("width", (w-w / 80*26) / 28 - 1)
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*6;
				   		return chart_base_y+40*6 - (d * 0.5)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-0.5);
				   		return d * 0.5;
				   })	
			}
		
		if(i < min){
			d3.selectAll(".OSfemale")
			.select("rect[id=occupationsubfemalePercentid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.attr("x",chart_base_x+i*((14-(max-min)/2)*(w / 28) / min))
			.attr("width", w / femalePercent.number.length - 1)
			.attr("y", function(d) {
				   		return chart_base_y+40*6 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   });
			}

		if(i > max){
			d3.selectAll(".OSfemale")
			.select("rect[id=occupationsubfemalePercentid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.attr("x",chart_base_x)
			.attr("width", w / femalePercent.number.length - 1)
			.attr("y", function(d) {
				   		return chart_base_y+40*6 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   });
			}
		}
		//OSforeignBorn
		for (var i = 0; i < 13; i++) {
		if (i <maini) {
			d3.selectAll(".OforeignBorn")
			.select("rect[id=occupationforeignBornPercentid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.style("fill",function(d,i) {
						return colors[color[i]];
				   })
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*7;
				   		return chart_base_y+40*7 - (d * 2)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-2);
				   		return d * 2;
				   })	
			.attr("x",chart_base_x+w / 80*i)
			.attr("width", w / 80 - 1);
			}
		if (i == maini) {
			d3.selectAll(".OforeignBorn")
			.select("rect[id=occupationforeignBornPercentid"+i+"]")
			.transition(200000) 
		    .duration(animationTime)
			.delay(500) 
			.style("fill","red")
			.attr("y", function(d) {
				   		return chart_base_y+40*7 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   })
			.attr("x",chart_base_x+w/2)
			.attr("width", w / 80 - 1);
			}
		if (i >maini) {
			d3.selectAll(".OforeignBorn")
			.select("rect[id=occupationforeignBornPercentid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.style("fill",function(d,i) {
						return colors[color[i]];
				   }) 
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*7;
				   		return chart_base_y+40*7 - (d * 2)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-2);
				   		return d * 2;
			})	
			.attr("x",chart_base_x+w-(12-maini)*w / 80+(i-maini)*w / 80)
			.attr("width", w / 80 - 1);
			}

		}
		for (var i = 0; i < 117; i++) {
		if (i <= max&& min <= i) {
			d3.selectAll(".OSforeignBorn")
			.select("rect[id=occupationsubforeignBornPercentid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.attr("fill", function() {
				
				return subbarColor[i-min];

				   })
			.attr("x",chart_base_x+w/2-(max-min+1)/2* (w-w / 80*26) / 28+(i-min) * (w-w / 80*26) / 28)
			.attr("width", (w-w / 80*26) / 28 - 1)
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*7;
				   		return chart_base_y+40*7 - (d * 2)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-2);
				   		return d * 2;
				   })	
			}
		
		if(i < min){
			d3.selectAll(".OSforeignBorn")
			.select("rect[id=occupationsubforeignBornPercentid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.attr("x",chart_base_x+i*((14-(max-min)/2)*(w / 28) / min))
			.attr("width", w / foreignBornPercent.number.length - 1)
			.attr("y", function(d) {
				   		return chart_base_y+40*6 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   });
			}

		if(i > max){
			d3.selectAll(".OSforeignBorn")
			.select("rect[id=occupationsubforeignBornPercentid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.attr("x",chart_base_x)
			.attr("width", w / foreignBornPercent.number.length - 1)
			.attr("y", function(d) {
				   		return chart_base_y+40*7 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   });
			}
		}
		//OSaverageHoursOfWorkOrWeek
		for (var i = 0; i < 13; i++) {
		if (i <maini) {
			d3.selectAll(".OaverageHoursOfWorkOrWeek")
			.select("rect[id=occupationaverageHoursOfWorkOrWeekid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.style("fill",function(d,i) {
						return colors[color[i]];
				   })
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*8;
				   		return chart_base_y+40*8 - (d * 1)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-1);
				   		return d * 1;
				   })	
			.attr("x",chart_base_x+w / 80*i)
			.attr("width", w / 80 - 1);
			}
		if (i == maini) {
			d3.selectAll(".OaverageHoursOfWorkOrWeek")
			.select("rect[id=occupationaverageHoursOfWorkOrWeekid"+i+"]")
			.transition(200000) 
		    .duration(animationTime)
			.delay(500) 
			.style("fill","red")
			.attr("y", function(d) {
				   		return chart_base_y+40*8 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   })
			.attr("x",chart_base_x+w/2)
			.attr("width", w / 80 - 1);
			}
		if (i >maini) {
			d3.selectAll(".OaverageHoursOfWorkOrWeek")
			.select("rect[id=occupationaverageHoursOfWorkOrWeekid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.style("fill",function(d,i) {
						return colors[color[i]];
				   }) 
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*8;
				   		return chart_base_y+40*8 - (d * 1)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-1);
				   		return d * 1;
			})	
			.attr("x",chart_base_x+w-(12-maini)*w / 80+(i-maini)*w / 80)
			.attr("width", w / 80 - 1);
			}

		}
		for (var i = 0; i < 117; i++) {
		if (i <= max&& min <= i) {
			d3.selectAll(".OSaverageHoursOfWorkOrWeek")
			.select("rect[id=occupationsubaverageHoursOfWorkOrWeekid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.attr("fill", function() {
				
				return subbarColor[i-min];

				   })
			.attr("x",chart_base_x+w/2-(max-min+1)/2* (w-w / 80*26) / 28+(i-min) * (w-w / 80*26) / 28)
			.attr("width", (w-w / 80*26) / 28 - 1)
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*8;
				   		return chart_base_y+40*8 - (d * 1)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-1);
				   		return d * 1;
				   })	
			}
		
		if(i < min){
			d3.selectAll(".OSaverageHoursOfWorkOrWeek")
			.select("rect[id=occupationsubaverageHoursOfWorkOrWeekid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.attr("x",chart_base_x+i*((14-(max-min)/2)*(w / 28) / min))
			.attr("width", w / averageHoursOfWorkOrWeek.number.length - 1)
			.attr("y", function(d) {
				   		return chart_base_y+40*8 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   });
			}

		if(i > max){
			d3.selectAll(".OSaverageHoursOfWorkOrWeek")
			.select("rect[id=occupationsubaverageHoursOfWorkOrWeekid"+i+"]")
			.transition(200000)
			.duration(animationTime)
			.delay(500) 
			.attr("x",chart_base_x)
			.attr("width", w / averageHoursOfWorkOrWeek.number.length - 1)
			.attr("y", function(d) {
				   		return chart_base_y+40*8 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   });
			}
		}
	}
	else
	{//OSA
		for (var i = 0; i < 117; i++) {
			d3.selectAll(".OSA")
			.select("rect[id=occupationsubautomationid"+i+"]")
			.transition(20000)
			.duration(animationTime)
			.delay(500) 
			.attr("y", function(d) {
				   		return chart_base_y ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   });
		}
		for (var i = 0; i < 13; i++) {

			d3.selectAll(".OA")
			.select("rect[id=occupationautomationid"+i+"]")
			.transition(20000)
			.duration(animationTime)
			.delay(500) 
			.style("fill",function(d,i) {
						return colors[color[i]];
				   })
			.attr("y", function(d) {
				   		return chart_base_y - (d * 1)
				   		})
			.attr("height", function(d) {
				   		return d * 1;
				   })
			.attr("x",chart_base_x+i * (w / occupationautomation.number.length))
			.attr("width", w / occupationautomation.number.length - 1);
			
		}
		//OSG
		for (var i = 0; i < 117; i++) {
			d3.selectAll(".OSG")
			.select("rect[id=occupationsubglobalizationid"+i+"]")
			.transition(20000)
			.duration(animationTime)
			.delay(500) 
			.attr("y", function(d) {
				   		return chart_base_y+40*1-40 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   });
		}
		for (var i = 0; i < 13; i++) {

			d3.selectAll(".OG")
			.select("rect[id=occupationglobalizationid"+i+"]")
			.transition(20000)
			.duration(animationTime)
			.delay(500) 
			.style("fill",function(d,i) {
						return colors[color[i]];
				   })
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*1-40;
				   		return chart_base_y+40*1-40 - (d * 0.5)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-0.5);
				   		return d * 0.5;
				   })	
			.attr("x",chart_base_x+i * (w / occupationglobalization.number.length))
			.attr("width", w / occupationglobalization.number.length - 1);
			
		}
		//OSM
		for (var i = 0; i < 117; i++) {
			d3.selectAll(".OSM")
			.select("rect[id=occupationsubmairredid"+i+"]")
			.transition(20000)
			.duration(animationTime)
			.delay(500) 
			.attr("y", function(d) {
				   		return chart_base_y+40*2 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   });
		}
		for (var i = 0; i < 13; i++) {

			d3.selectAll(".OM")
			.select("rect[id=occupationmarriedid"+i+"]")
			.transition(20000)
			.duration(animationTime)
			.delay(500) 
			.style("fill",function(d,i) {
						return colors[color[i]];
				   })
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*2;
				   		return chart_base_y+40*2 - (d * 0.5)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-0.5);
				   		return d * 0.5;
				   })	
			.attr("x",chart_base_x+i * (w / occupationglobalization.number.length))
			.attr("width", w / occupationglobalization.number.length - 1);
			
		}
		//OSblack
		for (var i = 0; i < 117; i++) {
			d3.selectAll(".OSblack")
			.select("rect[id=occupationsubblackPercentid"+i+"]")
			.transition(20000)
			.duration(animationTime)
			.delay(500) 
			.attr("y", function(d) {
				   		return chart_base_y+40*3 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   });
		}
		for (var i = 0; i < 13; i++) {

			d3.selectAll(".Oblack")
			.select("rect[id=occupationblackPercentid"+i+"]")
			.transition(20000)
			.duration(animationTime)
			.delay(500) 
			.style("fill",function(d,i) {
						return colors[color[i]];
				   })
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*3;
				   		return chart_base_y+40*3 - (d * 2)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-2);
				   		return d * 2;
				   })	
			.attr("x",chart_base_x+i * (w / occupationblackPercent.number.length))
			.attr("width", w / occupationblackPercent.number.length - 1);
			
		}
		//OSasian
		for (var i = 0; i < 117; i++) {
			d3.selectAll(".OSasian")
			.select("rect[id=occupationsubasianPercentid"+i+"]")
			.transition(20000)
			.duration(animationTime)
			.delay(500) 
			.attr("y", function(d) {
				   		return chart_base_y+40*4 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   });
		}
		for (var i = 0; i < 13; i++) {

			d3.selectAll(".Oasian")
			.select("rect[id=occupationasianPercentid"+i+"]")
			.transition(20000)
			.duration(animationTime)
			.delay(500) 
			.style("fill",function(d,i) {
						return colors[color[i]];
				   })
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*4;
				   		return chart_base_y+40*4 - (d * 2)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-2);
				   		return d * 2;
				   })	
			.attr("x",chart_base_x+i * (w / occupationasianPercent.number.length))
			.attr("width", w / occupationasianPercent.number.length - 1);
			
		}
		//OShispanic
		for (var i = 0; i < 117; i++) {
			d3.selectAll(".OShispanic")
			.select("rect[id=occupationsubhispanicPercentid"+i+"]")
			.transition(20000)
			.duration(animationTime)
			.delay(500) 
			.attr("y", function(d) {
				   		return chart_base_y+40*5 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   });
		}
		for (var i = 0; i < 13; i++) {

			d3.selectAll(".Ohispanic")
			.select("rect[id=occupationhispanicPercentid"+i+"]")
			.transition(20000)
			.duration(animationTime)
			.delay(500) 
			.style("fill",function(d,i) {
						return colors[color[i]];
				   })
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*5;
				   		return chart_base_y+40*5 - (d * 2)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-2);
				   		return d * 2;
				   })	
			.attr("x",chart_base_x+i * (w / occupationhispanicPercent.number.length))
			.attr("width", w / occupationhispanicPercent.number.length - 1);
			
		}
		//OSfemale
		for (var i = 0; i < 117; i++) {
			d3.selectAll(".OSfemale")
			.select("rect[id=occupationsubfemalePercentid"+i+"]")
			.transition(20000)
			.duration(animationTime)
			.delay(500) 
			.attr("y", function(d) {
				   		return chart_base_y+40*6 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   });
		}
		for (var i = 0; i < 13; i++) {

			d3.selectAll(".Ofemale")
			.select("rect[id=occupationfemalePercentid"+i+"]")
			.transition(20000)
			.duration(animationTime)
			.delay(500) 
			.style("fill",function(d,i) {
						return colors[color[i]];
				   })
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*6;
				   		return chart_base_y+40*6 - (d * 0.5)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-0.5);
				   		return d * 0.5;
				   })	
			.attr("x",chart_base_x+i * (w / occupationfemalePercent.number.length))
			.attr("width", w / occupationfemalePercent.number.length - 1);
			
		}
		//OSforeignBorn
		for (var i = 0; i < 117; i++) {
			d3.selectAll(".OSforeignBorn")
			.select("rect[id=occupationsubforeignBornPercentid"+i+"]")
			.transition(20000)
			.duration(animationTime)
			.delay(500) 
			.attr("y", function(d) {
				   		return chart_base_y+40*7 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   });
		}
		for (var i = 0; i < 13; i++) {

			d3.selectAll(".OforeignBorn")
			.select("rect[id=occupationforeignBornPercentid"+i+"]")
			.transition(20000)
			.duration(animationTime)
			.delay(500) 
			.style("fill",function(d,i) {
						return colors[color[i]];
				   })
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*7;
				   		return chart_base_y+40*7 - (d * 2)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-2);
				   		return d * 2;
				   })	
			.attr("x",chart_base_x+i * (w / occupationforeignBornPercent.number.length))
			.attr("width", w / occupationforeignBornPercent.number.length - 1);
			
		}
		//OSaverageHoursOfWorkOrWeek
		for (var i = 0; i < 117; i++) {
			d3.selectAll(".OSaverageHoursOfWorkOrWeek")
			.select("rect[id=occupationsubaverageHoursOfWorkOrWeekid"+i+"]")
			.transition(20000)
			.duration(animationTime)
			.delay(500) 
			.attr("y", function(d) {
				   		return chart_base_y+40*8 ;
				   })
			.attr("height", function(d) {
				   		return 0;
				   });
		}
		for (var i = 0; i < 13; i++) {

			d3.selectAll(".OaverageHoursOfWorkOrWeek")
			.select("rect[id=occupationaverageHoursOfWorkOrWeekid"+i+"]")
			.transition(20000)
			.duration(animationTime)
			.delay(500) 
			.style("fill",function(d,i) {
						return colors[color[i]];
				   })
			.attr("y", function(d) {
				   		if(d<0) return chart_base_y+40*8;
				   		return chart_base_y+40*8 - (d * 1)
				   		})
			.attr("height", function(d) {
				   		if(d<0) return d * (-1);
				   		return d * 1;
				   })	
			.attr("x",chart_base_x+i * (w / occupationaverageHoursOfWorkOrWeek.number.length))
			.attr("width", w / occupationaverageHoursOfWorkOrWeek.number.length - 1);
			
		}
	}

};


//Calculate Major/Occupation functions: 3
function calculateMajor(n,x,k, college_click){
	for(var i=0; i < n; i++)
		{
			major.name.push(x[k]);
			k=k+1;
			major.number.push(parseInt(x[k]));
			k=k+1;
			if (searchName != null) {
				major.college.push(x[k]);
				k=k+1;
			}
			
			major.style.push(college.style[college.name.indexOf(college_click)]);
			if( major_click != '?' && major_click != major.name[i])
			    major.opacity.push('0.3');
			else 
			    major.opacity.push('1');
			// for character
			var index = -1;
			for(var j=0; j < major_character_requirement.length; j++)
			{
		        if(major_character_requirement[j].major == major.name[i])
				 {
					 index = j;
					 break;
				 }
			}
			if(index == -1)
		    {
				major.character.push({
					data_available : false,
					low:[],
					high:[]
					});
			}
			else
			{
				major.character.push({
					data_available: true,
					low:[major_character_requirement[index].diversediscuss, major_character_requirement[index].groupwork, major_character_requirement[index].internships, major_character_requirement[index].foreignlanguage, major_character_requirement[index].quantitative, major_character_requirement[index].hours_work, major_character_requirement[index].hours_social],
					 high:[major_character_requirement[index].diversediscuss, major_character_requirement[index].groupwork, major_character_requirement[index].internships, major_character_requirement[index].foreignlanguage, major_character_requirement[index].quantitative, major_character_requirement[index].hours_work, major_character_requirement[index].hours_social]
					});
			}
		}
		return k;
	};

function calculateOccupation(n,x,k,college_click){
	for(var i=0; i < n; i++)
	{
		occupation.name.push(x[k]);
		k=k+1;
		occupation.number.push(parseInt(x[k]));
		k=k+1;
		if (searchName != null) {
			occupation.occupationGroup.push(x[k]);
			k=k+1;
		}
		
		occupation.style.push(occupationGroup.style[occupationGroup.name.indexOf(occupationGroup_click)]);
		if(occupation_click != '?' && occupation_click != occupation.name[i])
		    occupation.opacity.push('0.3');
		else
		   occupation.opacity.push('1');
		// for character
		var index = -1;
		for(var j=0; j < occupation_character_requirement.length; j++)
		{
			if (occupation_character_requirement[j].occupation == occupation.name[i])
			{
				index = j;
				break;
			}
		}
		if(index == -1)
		{
			occupation.character.push({
				data_available:false,
				low:[],
				high:[]
				});
		}
		else
		{
			occupation.character.push({
				data_available:true,
				low:[occupation_character_requirement[index].verbalPercentile, occupation_character_requirement[index].quantitativePercentile, occupation_character_requirement[index].reasoningPercentile, occupation_character_requirement[index].leadershipPercentile],
				high:[occupation_character_requirement[index].verbalPercentile, occupation_character_requirement[index].quantitativePercentile, occupation_character_requirement[index].reasoningPercentile, occupation_character_requirement[index].leadershipPercentile]
				});
		}	
	}
	return k;
};

function calculateMajorToOccupation(n,x,k,college_click,occupationGroup_click){

    if(college_click!='?' && occupationGroup_click =='?'){
    	for (var i=0;i < n;i++)
		{
	        education_job.education.push(x[k]);
			k=k+1;
			education_job.job.push(x[k]);
			k=k+1;
			if(major_click != '?' && major_click != education_job.education[i])
			    education_job.number.push(0);
			else
			    education_job.number.push(parseInt(x[k]));
			k=k+1;
		}
		
		for(var i=0; i < major.style.length; i++)
		    if(education_character_applied && check_character_for_education(major.character[i]))
	             major.style[i] = "characterstatisfied";
    }

    if(college_click=='?' && occupationGroup_click!='?'){
	    for (var i=0;i < n;i++)
		{
	        education_job.education.push(x[k]);
			k=k+1;
			education_job.job.push(x[k]);
			k=k+1;
			if(occupation_click != '?' && education_job.job[i] != occupation_click)
			     education_job.number.push(0);
			else
			     education_job.number.push(parseInt(x[k]));
			k=k+1;
		}
		for(var i=0; i < occupation.style.length; i++)
        {
	        if(job_character_applied && check_character_for_job(occupation.character[i]))
	             occupation.style[i] = "characterstatisfied";
         }
    }

    if((college_click!='?' && occupationGroup_click!='?')|| searchName !=null){
        for (var i=0;i < n;i++)
		{
	        education_job.education.push(x[k]);
			k=k+1;
			education_job.job.push(x[k]);
			k=k+1;
			if((major_click != '?' && major_click != education_job.education[i]) || (occupation_click !='?' && occupation_click != education_job.job[i]))
			    education_job.number.push(0);
			else
			    education_job.number.push(parseInt(x[k]));
			k=k+1;
		}
		
		for(var i=0; i < major.style.length; i++)
		    if(education_character_applied && check_character_for_education(major.character[i]))
	             major.style[i] = "characterstatisfied";
		
		for(var i=0; i < occupation.style.length; i++)
        {
	        if(job_character_applied && check_character_for_job(occupation.character[i]))
	             occupation.style[i] = "characterstatisfied";
        }
    }
    
    return k;
};












//Searching Functions: 5

//variables for searching
var parentClassName = [];
var parentClassX = [];
var parentClassWidth = [];
var search_click = false;

function searchFunction() {
	d3.selectAll(".collegeCollapseButton").attr("visibility","visible");
	d3.selectAll(".occupationCollapseButton").attr("visibility","visible");
	college_click='?';
	occupationGroup_click='?';
	college.click = "?";
	occupationGroup.click ="?";

	search_click = true;
	var majorName = document.getElementById("majorSearch").value;
	var occupationName = document.getElementById("occupationSearch").value;
	searchName = "";
    var hr = new XMLHttpRequest();
	hr.open("POST", url, true);
	hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
	//hr.send("college="+college_click +"&occupationGroup="+occupationGroup_click );
    hr.onreadystatechange = function() {
	    if(hr.readyState == 4 && hr.status == 200) {
			///
			var x=hr.responseText.split("*");
			idunno = x;

			var num1= parseInt(x[0]);
			var num2= parseInt(x[num1*3+1]);
			var num3= parseInt(x[num1*3+1+num2*3+1]);

			major.name = [];
			major.number = [];
			major.style = [];
			major.opacity = [];
			major.character = [];
			major.college = [];
			
			occupation.name = [];
			occupation.number = [];
			occupation.style = [];
			occupation.opacity = [];
			occupation.character = [];
			occupation.occupationGroup = [];
			
			education_job.education = [];
			education_job.job = [];
			education_job.number = [];


			if(college_click!='?' && occupationGroup_click=='?'){			
				var k=1;
				k=calculateMajor(num1,x,k,college_click);

				k=k+1;
				k=calculateMajorToOccupation(num2,x,k,college_click,occupationGroup_click);
			}
			else if(college_click=='?' && occupationGroup_click!='?'){			
				var k=1;
				k=calculateOccupation(num1,x,k,college_click);

				k=k+1;
				k=calculateMajorToOccupation(num2,x,k,college_click,occupationGroup_click);
				
			}
			else if((college_click!='?' && occupationGroup_click!='?')|| majorName != null || occupationName != null){	
				var k=1;
				k=calculateMajor(num1,x,k,college_click);

				k+=1;
				k=calculateOccupation(num2,x,k,college_click);

				k+=1;
				k=calculateMajorToOccupation(num3,x,k,college_click,occupationGroup_click);		

			}
			startpoint = 15;
			search_major_bar(major,startpoint);
			search_occupation_bar(occupation,startpoint);

				draw_path(education_job.education,education_job.job, education_job.number,
			        major.name, major.number, relevantX - 12.5, majorX[0],  620, 
					    occupation.name,occupation.number, relevantX + 292.5 ,occupationX[0],620,
					    college.style);

		}
	}
	hr.send("major="+majorName+"&occupation="+occupationName);	
	//hr.send("&college="+college_click +"&occupationGroup="+occupationGroup_click);
	

};

//create different bars for searching functions: 2
function search_major_bar(major,startpoint){

	collegeMainbar.select("rect").transition().duration(500)
		.attr("width",0);

	collegeMainbar.select("text").transition().duration(500)
	.style("visibility", "hidden");

	current = "searchMajor";
	changeScatterplot(major.name);

	minn=5;

	d3.selectAll(".collegeSubbar").remove();
	majorX[0]=startpoint + 6;//leftover
	total=math.sum(major.number);
	mscale = (620-minn*major.name.length -(major.name.length-1)*gap)/math.sum(major.number);//how long the whole bar is

	initX(major, majorX, majorWidth,mscale);

	//calclulate the college of majors
	/*
	calculateParentClass(major.college, majorX, majorWidth);
	console.log(parentClassX,parentClassWidth)

	var collegeSearchbar=svg.selectAll(".collegeSearchbar")
        .data(parentClassName)
        .enter().append("g")
        .attr("class","collegeSearchbar");

	collegeSearchbar.append("rect")
        .attr("x",relevantX-7)
        .attr("y",function (d,i) {return parentClassX[i];})

        .attr("height",function (d,i) {return parentClassWidth[i];})
        .attr("width",37)
        .attr("id",function (d,i) {return college.name[i];})
        .style("fill", function (d,i) {return colors[i+3];})
        .style("opacity",0.8)
        .on("click", clickOnCollegeMainbar);

    collegeSearchbar.append("text")
        .attr("class","collegeMainbar")
        .text( function (d,i) {return d+"           ("+collegePercent[i]+")";})
        .attr("id",function (d,i) {return parentClassName[i];})
        .attr("x", relevantX-5)
        .attr("y", function (d,i) {
        	return parentClassX[i] + parentClassWidth[i]/2;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .style("font-size", 14)
        .attr("fill", colors[0])
        .on("click", clickOnCollegeMainbar);
*/
	var collegeSubbar=svg.selectAll(".collegeSubbar")
            .data(major.number)
            .enter().append("g")
            .attr("class","collegeSubbar");
        
        collegeSubbar.append("rect")
            .attr("class","collegeSubbar")
            .attr("x", relevantX + 2.5)
            .attr("y",function (d,i) {return majorX[i];})
            //.attr("rx",5)
            //.attr("ry",5)
            .attr("height",function (d,i) {return majorWidth[i];})
            .attr("width",25)
            .attr("id",function (d,i) {return major.name[i];})
            .attr("fill-opacity",0)
            .on("mouseover", mouseoverMajor)
            .on("mouseout", function(d) {
            	//d3.selectAll(".mainPath").style("fill-opacity",0.9);		
	            majorDescription.transition()		
	                .duration(500)		
	                .style("opacity", 0);
	            d3.selectAll(".majorVQRHighlightBar").remove();
	            d3.select("#majorScatterplot").selectAll("circle[id="+this.id.replace(/ /g,'').replace(/','/g,'')+"]")
					.attr("stroke-width",1)
					.attr("stroke", "black");
	        });

        var majorPercentage = calculatePercentage(major.number);
        collegeSubbar.append("text")
            .attr("class","collegeSubbar")
            .text( function (d,i) {return major.name[i]+"   ("+majorPercentage[i]+")";})
            .attr("x", relevantX - 9)
            .attr("y", function (d,i) {
            	return majorX[i]+ majorWidth[i]/2;
            })
            .attr("id",function (d,i) {return major.name[i];})
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .style("font-size", 12)
            .on("mouseover", mouseoverMajor)
            .on("mouseout", function(d) {	
            //d3.selectAll(".mainPath").style("fill-opacity",0.9);	
	            majorDescription.transition()		
	                .duration(500)		
	                .style("opacity", 0);
	            d3.selectAll(".majorVQRHighlightBar").remove();

	            d3.select("#majorScatterplot").selectAll("circle[id="+this.id.replace(/ /g,'').replace(/','/g,'')+"]")
					.attr("stroke-width",1)
					.attr("stroke", "black");

	        });
        current = "major";
        var majorColor = calculateVQRcolor(major.name);
        collegeSubbar.select("rect").transition()
        	.attr("fill-opacity",1)
      		.style("fill", function(d,i) {
      				return majorColor[i];

      			})//change bar color working
      		.duration(800);

      	collegeSubbar.select("text").transition()
      		.style("fill", function(d,i) { return colors[0]; })
      		.duration(800);
      	
     if(major.name.length == 0){
          collapseButton.append("text")
          	.attr("class","noresult")
            .text("NO RESULTS")
            .attr("x", relevantX+70)
            .attr("y", 80)
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .style("font-size", 35)
            .attr("fill", colors[0])
            .style("fill-opacity",0);
           collapseButton.select(".noresult").transition()
      		.style("fill-opacity", 1)
      		.duration(800);
      	}
};

function search_occupation_bar(occupation,startpoint){
	occupationMainbar.select("rect").transition().duration(500)
		.attr("width",0);

	occupationMainbar.select("text").transition().duration(500)
		.style("visibility", "hidden");

	current = "searchOccupation";
	changeScatterplot(occupation.name);

	d3.selectAll(".occupationSubbar").remove();
	minn = 5;
	occupationX[0]=startpoint + 7;//leftover
	total=math.sum(occupation.number);
	oscale = (620-minn*occupation.name.length -(occupation.name.length-1)*gap)/math.sum(occupation.number);//how long the whole bar is

	initX(occupation, occupationX, occupationWidth, oscale);



	var occupationSubbar=svg.selectAll(".occupationSubbar")
            .data(occupation.number)
            .enter().append("g")
            .attr("class","occupationSubbar");
        
        occupationSubbar.append("rect")
            .attr("class","occupationSubbar")
            .attr("x", relevantX + 292.5)
            .attr("y",function (d,i) {return occupationX[i];})
            //.attr("rx",5)
            //.attr("ry",5)
            .attr("height",function (d,i) {return occupationWidth[i];})
            .attr("width",25)
            .attr("id",function (d,i) {return occupation.name[i];})
            .attr("fill-opacity",0)
			.on("mouseover", mouseoverOccupation)
            .on("mouseout", function(d) {		
            	//d3.selectAll(".mainPath").style("fill-opacity",0.9);
	            occupationDescription.transition()		
	                .duration(500)		
	                .style("opacity", 0);
	            d3.selectAll(".occupationVQRHighlightBar").remove();

	            d3.select("#occupationScatterplot").selectAll("circle[id="+this.id.replace(/ /g,'').replace(/\//g,'').replace(/','/g,'')+"]")
					.attr("stroke-width",1)
					.attr("stroke", "black");
	        });
	
	var occupationPercentage = calculatePercentage(occupation.number);
        occupationSubbar.append("text")
            .attr("class","occupationSubbar")
            .text( function (d,i) {return "("+occupationPercentage[i]+")      "+occupation.name[i];})
            .attr("x", relevantX + 331)
            .attr("y", function (d,i) {
            	return occupationX[i]+ occupationWidth[i]/2;
            })
            .attr("id",function (d,i) {return occupation.name[i];})
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            //.attr("transform", "translate(0,500) rotate(-80)")
            .style("font-size", 12)
            .on("mouseover", mouseoverOccupation)
            .on("mouseout", function(d) {		
            	//d3.selectAll(".mainPath").style("fill-opacity",0.9);
	            occupationDescription.transition()		
	                .duration(500)		
	                .style("opacity", 0);
	            d3.selectAll(".occupationVQRHighlightBar").remove();
	            d3.select("#occupationScatterplot").selectAll("circle[id="+this.id.replace(/ /g,'').replace(/\//g,'').replace(/','/g,'')+"]")
					.attr("stroke-width",1)
					.attr("stroke", "black");
	        });
        
        current = "occupation";
        var occColor = calculateVQRcolor(occupation.name);
      	occupationSubbar.select("rect").transition()
        	.attr("fill-opacity",1)
      		.style("fill", function(d,i) {
      			return occColor[i];
      		})
      		.duration(800);

      	occupationSubbar.select("text").transition()
      		.style("fill", function(d) { return colors[0]; })
      		.duration(800);           	
};


function calculatePercentage(numArr){
	var sum = math.sum(numArr);
	var percentageArr = [];
	for (var i = 0; i < numArr.length; i++) {
		percentageArr[i] = String((numArr[i]/sum * 100).toFixed(2))+"%";
	}
	return percentageArr;
};

function calculateParentClass(subclassOrder, subclassX, subclassWidth){
	var current = 0;
	parentClassX[0] = subclassX[0];
	parentClassWidth[0] = subclassWidth[0];
	parentClassName[0] = subclassOrder[0];
	for (var i = 1; i < subclassOrder.length; i++) {

		if(subclassOrder[i]==subclassOrder[i-1]){
			parentClassWidth[current] += subclassWidth[i]+gap;
		}
		else{
			current++;
			parentClassX[current] = subclassX[i];
			pare1ntClassWidth[current] = subclassWidth[i];
			parentClassName[current] = subclassOrder[i];
		}
	}
};

function changeScatterplot(ID){
	if(current == "college"){
		ID=ID.replace(/\s/g,'').replace(/\//g,'');
		d3.selectAll(".majorDot").style("fill-opacity",0.2).attr("stroke-width",0);
			d3.select("#majorScatterplot").selectAll("circle[gid="+ID+"]").transition().duration(animationTime).style("fill-opacity",1)
		.attr("stroke-width",1)
		.attr("stroke", "black");
	}
	if(current == "occupationGroup"){
		ID=ID.replace(/\s/g,'').replace(/\//g,'');
		d3.selectAll(".occupationDot").style("fill-opacity",0.3).attr("stroke-width",0);
	d3.select("#occupationScatterplot").selectAll("circle[gid="+ID+"]").transition().duration(animationTime).style("fill-opacity",1)
		.attr("stroke-width",1)
		.attr("stroke", "black");	
	}
	if(current == "searchMajor"){
		d3.selectAll(".majorDot").style("fill-opacity",0.3).attr("stroke-width",0);
		for (var i = 0; i < ID.length; i++) {
			console.log(ID)
			d3.select("#majorScatterplot").selectAll("circle[id="+ID[i].replace(/ /g,'').replace(/','/g,'')+"]").transition().duration(animationTime)
				.style("fill-opacity",1)
				.attr("stroke-width",1)
				.attr("stroke", "black");
		}
		current = '';
	}
	if(current == "searchOccupation"){
		d3.selectAll(".occupationDot").style("fill-opacity",0.3).attr("stroke-width",0);
		for (var i = 0; i < ID.length; i++) {
			console.log(ID)
			d3.select("#occupationScatterplot").selectAll("circle[id="+ID[i].replace(/ /g,'').replace(/\//g,'').replace(/','/g,'')+"]").transition().duration(animationTime)
				.style("fill-opacity",1)
				.attr("stroke-width",1)
				.attr("stroke", "black");
		}
		current = '';
	}
};

function createScatterplot(scatter,character,ifmajor){
	var scatterplot = scatter.append("g");

	var x = d3.scaleLinear()
    	.range([0, scatterplotWidth]).nice();

	var y = d3.scaleLinear()
	    .range([scatterplotHeight, 0]).nice();

	var xLabel = "Verbal",
		yLabel = "Quantitative",
	    rLabel = "Scale";

	
	var verbalScore = [],
		quantitativeScore = []; //x and y
	for (var i = 0; i < character.length; i++) {
		verbalScore.push(character[i].verbalSkill);
		quantitativeScore.push(character[i].quantitativeSkill);
	}
	
	var xMax = d3.max(verbalScore) * 1.05,
	  xMin = d3.min(verbalScore),
	  xMin = xMin > 0 ? 0 : xMin,
	  yMax = d3.max(quantitativeScore) * 1.05,
	  yMin = d3.min(quantitativeScore),
	  yMin = yMin > 0 ? 0 : yMin;
	 

	x.domain([xMin, xMax]);
	y.domain([yMin, yMax]);

	var xAxis = d3.axisTop(x);
	var yAxis = d3.axisRight(y);

	var gX = scatter.append("g")
      .classed("xAxis", true)
      .attr("transform", "translate("+plotpadding+"," + (scatterplotHeight) + ")")
      .call(xAxis);
 //
     gX.selectAll("text").attr("fill","#70ABD0");
     gX.selectAll("line").attr("stroke", "#70ABD0");
     gX.selectAll("path").attr("stroke", "#70ABD0");
//

   	var gY = scatter.append("g")
      .classed("yAxis", true)
      .attr("transform", "translate("+plotpadding+",0)")
      .call(yAxis);

     gY.selectAll("text").attr("fill","#70ABD0");
     gY.selectAll("line").attr("stroke", "#70ABD0");
     gY.selectAll("path").attr("stroke", "#70ABD0");

	var scatterTooltip = d3.select("body").append("div")	
	    .attr("class", "tooltip")				
	    .style("opacity", 0);

	var plotChecked=false;

	var dotType = (ifmajor ? "majorDot":"occupationDot");
  	
  	scatterplot.selectAll("."+dotType)
      .data(character)
      .enter().append("circle")
      .attr("id",function(d){
      	return (ifmajor ? d.major : d.occupation).replace(/\s/g, '').replace(/\//g,'').replace(/ /g,'').replace(/','/g,'');
      })
      .attr("gid",function(d){return (ifmajor ? d.college : d.occupationGroup).replace(/\s/g, '').replace(/\//g,'').replace(/ /g,'').replace(/','/g,'');})
      .classed(dotType, true)
      .attr("r", function (d) { return Math.pow(d.observations*0.5,0.3); })
      .attr("transform", function (d) { return "translate(" + (x(d.verbalSkill)+plotpadding) + "," + y(d.quantitativeSkill) + ")";})
      .style("fill", function(d) { 
  		    vScore=d.verbalSkill;
    		qScore=d.quantitativeSkill;
    		eucliDis = Math.pow(Math.pow(vScore,2)+Math.pow(qScore,2),0.5);
    		BrightScale=d3.scaleLinear().range(["#eeeeee",colorScale((qScore-vScore)*8)]).domain([0,1.5]);
    		return BrightScale(eucliDis);


      })
      .on("mouseover", function(d){
  	    scatterTooltip.transition()		
            .duration(200)		
            .style("opacity", .9);		

        if(ifmajor){
	        scatterTooltip.html("Major: <b>"+d.major +"</b><br>College: <b>"+d.college +"</b><br><br><b>"+xLabel + "</b>: " + d.verbalSkill + "<br><b>" + yLabel + "</b>: " + d.quantitativeSkill)	
	            .style("left", (d3.event.pageX) + "px")		
	            .style("top", (d3.event.pageY) + "px");	
        }
        if(!ifmajor){
        	scatterTooltip.html("Occupation: <b>"+d.occupation+"</b><br>OccupationGroup: "+d.occupationGroup+"</b><br><br><b>"+xLabel + "</b>: " + d.verbalSkill + "<br><b>" + yLabel + "</b>: " + d.quantitativeSkill)	
            .style("left", (d3.event.pageX -260) + "px")		
            .style("top", (d3.event.pageY) + "px");	
        }

        if(d3.select(this).attr("stroke-width")==1){plotChecked = true;}else{plotChecked=false;}
        d3.select(this).attr("stroke-width", 2)
					.attr("stroke", "black");
      })
      .on("mouseout", function(d){
	       scatterTooltip.transition()		
	        .duration(200)		
	        .style("opacity", .0);

	        if(plotChecked){d3.select(this).attr("stroke-width", 1);}
	        else{d3.select(this).attr("stroke-width", 0);}
      });

	scatter.call(d3.zoom()
	    .scaleExtent([0.5, 5])//zoomscale
	    //.translateExtent([[-100, -100], [90, 100]])
	    .on("zoom", function(d){
		  scatterplot.attr("transform", d3.event.transform);
		  gX.call(xAxis.scale(d3.event.transform.rescaleX(x)));
		  gY.call(yAxis.scale(d3.event.transform.rescaleY(y)));
		}));
	
};






function showResult(str) {
  if (str.length==0) { 
    document.getElementById("livesearch").innerHTML="";
    document.getElementById("livesearch").style.border="0px";
    return;
  }
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else {  // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById("livesearch").innerHTML=xmlhttp.responseText;
      document.getElementById("livesearch").style.border="1px solid #A5ACB2";
  	document.getElementById("livesearch").text="Enter";
    }
  }
  xmlhttp.open("GET","livesearch.php?q="+str,true);
  xmlhttp.send();
};
