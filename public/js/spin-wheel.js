var SpinWheel = SpinWheel || {

	colors : ["#B8D430", "#3AB745", "#029990", "#3501CB",
               "#2E2C75", "#673A7E", "#CC0071", "#F80120",
               "#F35B20", "#FB9A00", "#FFCC00", "#FEF200"],


        participants : ["Michael H.", "Sean", "Urvi", "Phil",
                     "CJ", "Winston", "Adrian", "Ryan",
                     "Kenny", "Justin", "Phil", "Krishna"],
	
	startAngle : 0,
  	arc : Math.PI / 6,
	spinTimeout : null,
  
	spinArcStart : 10,
        spinTime : 0,
        spinTimeTotal : 0,
  
        ctx : null,

	draw :  function() {
			this.drawRouletteWheel();
  	}, 
        
	drawRouletteWheel: function () {
		var canvas = document.getElementById("wheelcanvas");
    		if (canvas.getContext) {
		      var outsideRadius = 200;
		      var textRadius = 160;
		      var insideRadius = 125;
		      
		      ctx = canvas.getContext("2d");
		      ctx.clearRect(0,0,500,500);
      
		      ctx.strokeStyle = "black";
		      ctx.lineWidth = 2;
      
		      ctx.font = 'bold 12px sans-serif';
      
		      for(var i = 0; i < this.participants.length; i++) {
		      	var angle = this.startAngle + i * this.arc;
		        ctx.fillStyle = this.colors[i];
        
		        ctx.beginPath();
		        ctx.arc(250, 250, outsideRadius, angle, angle + this.arc, false);
		        ctx.arc(250, 250, insideRadius, angle + this.arc, angle, true);
		        ctx.stroke();
		        ctx.fill();
	        
        		ctx.save();
		        ctx.shadowOffsetX = -1;
		        ctx.shadowOffsetY = -1;
		        ctx.shadowBlur    = 0;
		        ctx.shadowColor   = "rgb(220,220,220)";
		        ctx.fillStyle = "black";
		        ctx.translate(250 + Math.cos(angle + this.arc / 2) * textRadius, 250 + Math.sin(angle + this.arc / 2) * textRadius);
		        ctx.rotate(angle + this.arc / 2 + Math.PI / 2);
		        var text = this.participants[i];
		        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
		        ctx.restore();
		      } 
      
		      //Arrow
		      ctx.fillStyle = "black";
		      ctx.beginPath();
		      ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
		      ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
		      ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
		      ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
		      ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
		      ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
		      ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
		      ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
		      ctx.fill();
    		}
  	},
	spin : function () {
		spinAngleStart = Math.random() * 10 + 10;
		spinTime = 0;
		spinTimeTotal = Math.random() * 3 + 5 * 1000;
    		this.rotateWheel();
	},
	rotateWheel: function () {
		spinTime += 30;
		if(spinTime >= spinTimeTotal) {
			this.stopRotateWheel();
		      	return;
		}
		var spinAngle = spinAngleStart - this.easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
		this.startAngle += (spinAngle * Math.PI / 180);
		this.drawRouletteWheel();
	        spinTimeout = setTimeout('SpinWheel.rotateWheel()', 30);
	},
  
	stopRotateWheel: function () {
		clearTimeout(spinTimeout);
		var degrees = this.startAngle * 180 / Math.PI + 90;
    		var arcd = this.arc * 180 / Math.PI;
		var index = Math.floor((360 - degrees % 360) / arcd);
		ctx.save();
		ctx.font = 'bold 30px sans-serif';
		var text = this.participants[index]
		ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
		ctx.restore();
  	},
 	easeOut: function (t, b, c, d) {
		var ts = (t/=d)*t;
		var tc = ts*t;
		return b+c*(tc + -3*ts + 3*t);
  	}, 

	checkWebGLSupport: function  () {
		 if (!window.WebGLRenderingContext) {
		     alert ("Get a real Browser !!");
		     return false;
		}
		return true;
	}
}


