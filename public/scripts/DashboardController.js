angular.module('MineModelUseCase')
    .controller('DashboardController', ['$rootScope', '$scope', '$localStorage','$http', function ($rootScope, $scope, $localStorage,$http) {
        
        var gasflag=0,weightflag=0,accessflag=0,tempflag=0;
        
        var socket = io();
        
        socket.on('gass', function (msg) {
        console.log("Gas Detected:"+msg);
        if(msg>0){
            document.getElementById('gascard').src="images/No Alert Blue.png";
						 document.getElementById('fancard').src="images/Fan Red.png";
							document.getElementById('buzzercard').src="images/Buzzer Red.png";
							document.getElementById("GasSpan").innerHTML="Alert!! Gas Detected.";
							flag=1,gasflag=1;
						//$( "#check1" ).attr( 'checked', true);
                        //$( "#check2" ).attr( 'checked', true );
                       $scope.$apply(function() {$scope.fn=true;}); 
                       $scope.$apply(function() {$scope.buzz=true;});
                        gasflag=1;
        }
        else{
            document.getElementById('gascard').src="images/No Alert Grey.png"
							if(gasflag==1)
							{
						   document.getElementById('fancard').src="images/Fan Grey.png";
						   document.getElementById('buzzercard').src="images/Buzzer Grey.png";
							// $( "#check1" ).attr( 'checked', false );
                           //$( "#check2" ).attr( 'checked', false );
                              $scope.$apply(function() {$scope.fn=false;}); 
                              $scope.$apply(function() {$scope.buzz=false;});
							  gasflag=0;
							}
						document.getElementById("GasSpan").innerHTML="No Alert.";
        }
      });

      socket.on('weightt', function (msg) {
        console.log("Weight:"+msg);
        if (msg>60){//changed from 50 to 60
                     document.getElementById('weightcard').src="images/Conveyor Blue.png";
					 document.getElementById('buzzercard').src="images/Buzzer Red.png";
                     //$( "#check2" ).attr( 'checked', true );
                     $scope.$apply(function() {$scope.buzz=true;});
                     weightflag=1;
                    }
        else{
            document.getElementById('weightcard').src="images/Conveyor Grey.png";
			if(weightflag==1){
                                document.getElementById('buzzercard').src="images/Buzzer Grey.png";
                                //$( "#check2" ).attr( 'checked', false );
                                $scope.$apply(function() {$scope.buzz=false;});
							    weightflag=0;
							 }
            }
        if(msg>60){//delete this if statement for old code
        document.getElementById("WeightSpan").innerHTML="Current Weight:"+msg+"t";}
        else{document.getElementById("WeightSpan").innerHTML="Current Weight:0t";}//till here
        //document.getElementById("WeightSpan").innerHTML="Current Weight:"+msg+"t";
      });

      socket.on('accesss', function (msg) {
        console.log("Access:"+msg);
        if (msg>0){
                     document.getElementById('rfidcard').src="images/Restricted Area Blue.png";
					 document.getElementById('buzzercard').src="images/Buzzer Red.png";
                     //$( "#check2" ).attr( 'checked', true );
                     $scope.$apply(function() {$scope.buzz=true;});
                     accessflag=1;
                    }
        else{
            document.getElementById('rfidcard').src="images/Restricted Area Grey.png";
			if(accessflag==1){
                                document.getElementById('buzzercard').src="images/Buzzer Grey.png";
                                //$( "#check2" ).attr( 'checked', false );
                                $scope.$apply(function() {$scope.buzz=false;});
							    accessflag=0;
							 }
			}
      });
   
      socket.on('tempp', function (msg) {
        console.log("Temperature:"+msg);
        //Start
        if(msg<20)
            {
                msg=parseInt(msg)+10;
            }//end
        if (msg>25){
                     document.getElementById('tempcard').src="images/Temperature Blue.png";
					 document.getElementById('buzzercard').src="images/Buzzer Red.png";
                     //$( "#check2" ).attr( 'checked', true );
                     $scope.$apply(function() {$scope.buzz=true;});
                     tempflag=1;
                    }
        else {
            document.getElementById('tempcard').src="images/Temperature Grey.png";
			if(tempflag==1){
                                document.getElementById('buzzercard').src="images/Buzzer Grey.png";
                                //$( "#check2" ).attr( 'checked', false );
                                $scope.$apply(function() {$scope.buzz=false;});
							    tempflag=0;
							 }
            }
            document.getElementById("TempSpan").innerHTML="Current Temperature:"+msg;
      });

      socket.on('locomotivee', function (msg) {
        console.log("Breakdown:"+msg);
        if (msg>0){
                     document.getElementById('locomotivecard').src="images/Locomotive Blue.png";
				  }
      });
      
      $scope.fan=function()
	  {
		/*var status=document.getElementById('check1');
		if(status.checked)
		{
	    	console.log("Fan:On");
           /* document.getElementById('fancard').src="images/Fan Red.png";
            $http.get('http://192.168.43.237:5000/fanon').then(function(response) {//Put PI IP
                var x=response.data;
              });
		}
		else
		{
		    console.log("Fan:Off");	
            /*document.getElementById('fancard').src="images/Fan Grey.png";
            $http.get('http://192.168.43.237/fanoff').then(function(response) {//Put PI IP
              });
        }*/
            if($scope.fn)
            {
                
                document.getElementById('fancard').src="images/Fan Red.png";
                //$scope.fn=true;
            }
            else
            {
                
                document.getElementById('fancard').src="images/Fan Grey.png";
                //$scope.fn=false;
            }
	   }
        $scope.buzzer=function()
        {
         /*var status=document.getElementById('check2');
         if(status.checked)
            {
                console.log("Buzz Checked");
            }
         else{
             console.log("Buzz Unchecked");
         }*/
            if($scope.buzz)
            {
                document.getElementById('alarmcard').src="images/Alarm Grey.png";
                document.getElementById('buzzercard').src="images/Buzzer Grey.png";
                $scope.buzz=false;
            }
            else
            {
                document.getElementById('alarmcard').src="images/Alarm Red.png";
                document.getElementById('buzzercard').src="images/Buzzer Red.png";
                $scope.buzz=true;               
            }
       }
        
        $scope.$watch('buzz', function() {
         if($scope.buzz)
            {
                console.log("Buzz Checked");
                $http.get('http://192.168.43.237:5000/buzzeron').then(function(response) {//Put PI IP
              });
            }
         else{
             console.log("Buzz Unchecked");
             $http.get('http://192.168.43.237:5000/buzzeroff').then(function(response) {//Put PI IP
              });
         }
        });

        $scope.$watch('fn', function() {
         if($scope.fn)
            {
                console.log("Fn Checked");
                //$http.get('http://127.0.0.1:5000/fanoff').then(function(response) {//Put PI IP
              //});
              $http.get('http://192.168.43.237:5000/fanon').then(function(response) {//Put PI IP
              });
            }
         else{
             console.log("Fn Unchecked");
             $http.get('http://192.168.43.237:5000/fanoff').then(function(response) {//Put PI IP
              });
         }
        });

        $scope.resetlocomotive=function(){
            document.getElementById('locomotivecard').src="images/Locomotive Grey.png";
        }

      

    }]);

