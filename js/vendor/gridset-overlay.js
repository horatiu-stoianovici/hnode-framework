// Gridset Overlay JS

gs = {

	init: function () {
		
		if (window.location.href.match('gridset=show')) gs.show();
	
		gs.bind(document, 'keydown', function (e) { 
		
			if (!e) var e = window.event;
		
			if(e.metaKey || e.ctrlKey) {
				
				switch (e.which || e.keyCode) {
					case 71:
					
						var gw = document.getElementById('gridsetoverlaywrap');
					
						if (!gw) gs.show();
						else gs.remove(gw);
						
						gs.prevent(e);
						break;
						
				}
				
			}
		
		
		});
	
	},
	
	remove: function (gw) {
	
		document.body.removeChild(gw);
		
		if(window.detachEvent) window.detachEvent('onresize', gs.width);
		else window.removeEventListener('resize', gs.width, false);
	
	},
	
	width: function () {
		
		var swv = document.getElementById('gridscreenwidthval');
		if (swv) swv.innerHTML = window.innerWidth + 'px';
		
	},

	show: function () {
	
		var p = ['d','dca','t'],
			c = [12,7,8],
			w = [912,912,780],
			b = document.getElementsByTagName('body')[0],
			gw = '<div id="gridwrap"><div id="gridscreenwidthwrap"><p id="gridscreenwidth">Screen width: <strong id="gridscreenwidthval"></strong></p></div><div id="gridoverlay" class="container">',
		
			k = 0, breaks = '',
			
			styles = '<style id="gridsetoverlaystyles" type="text/css">#gridsetoverlaywrap{position:static;}#gridwrap{display:block;position:fixed;top:0;left:0;width:100%;height:100%;z-index:1000;pointer-events:none;font-family:Helvetica, Arial, sans-serif !important;}#gridoverlay{position:relative;height:100%;overflow:hidden !important;background:none !important;}#gridoverlay div{display:block;position:static;height:100%;color:#bcbcff;}#gridoverlay .gridset{position:absolute;width:100%;height:100%;top:0;left:0;opacity:0.7;}#gridoverlay .gridset div{text-align:left;font-size:10px !important;border-right:1px solid #bcbcff;border-left:1px solid #bcbcff;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;}#gridoverlay div small{width:100%;display:block;text-align:center;color:#7D80DB;font-weight:700 !important;border-bottom:1px solid #bcbcff;border-top:1px solid #bcbcff;padding-top:0 !important;background-color:rgb(240,240,255) !important;text-transform:none !important;height:22px !important;line-height:22px !important;text-style:normal !important;}#gridoverlay .gridset:nth-child(2) div{border-style:dashed;padding-top:23px;}#gridoverlay .gridset:nth-child(2) small{border-style:dashed;}#gridoverlay .gridset:nth-child(3) div{border-style:dotted;padding-top:45px;}#gridoverlay .gridset:nth-child(3) small{border-style:dotted;}#gridsetoverlaywrap .noshow{display:none;}#gridscreenwidthwrap{display:block !important;width:100% !important;position:absolute !important;bottom:0 !important;left:0 !important;height:30px !important;border-top:1px solid #7D80DB !important;opacity:0.7 !important;background-color:rgb(240,240,255) !important;}#gridscreenwidth{display:block !important;width:100% !important;text-align:center !important;font-size:12px !important;line-height:1 !important;padding-top:8px !important;font-family:Helvetica, Arial, sans-serif !important; margin: 0 !important;color:#7D80DB !important;}@media only screen and (max-width:911px) {#gridsetoverlaywrap [class*=t1],#gridsetoverlaywrap [class*=t2],#gridsetoverlaywrap [class*=t3],#gridsetoverlaywrap [class*=t4],#gridsetoverlaywrap [class*=t5],#gridsetoverlaywrap [class*=t6],#gridsetoverlaywrap [class*=t7],#gridsetoverlaywrap [class*=t8],#gridsetoverlaywrap .t-all{display:block;float:left;margin-right:-100%;}#gridsetoverlaywrap [class*=t1]{width:9.746045593834664%;margin-left:0%;}#gridsetoverlaywrap [class*=t2]{width:9.807341471943033%;margin-left:12.822968673835%;}#gridsetoverlaywrap [class*=t3]{width:9.807341471943033%;margin-left:25.707233225778%;}#gridsetoverlaywrap [class*=t4]{width:9.807341471943033%;margin-left:38.591497777721%;}#gridsetoverlaywrap [class*=t5]{width:9.807341471943033%;margin-left:51.475762329664%;}#gridsetoverlaywrap [class*=t6]{width:9.807341471943033%;margin-left:64.360026881607%;}#gridsetoverlaywrap [class*=t7]{width:9.807341471943033%;margin-left:77.24429143355%;}#gridsetoverlaywrap [class*=t8]{width:9.807341471943033%;margin-left:90.128555985493%;}#gridsetoverlaywrap .t-hide{display:none !important;}}@media only screen and (min-width:912px) {#gridsetoverlaywrap [class*=d1],#gridsetoverlaywrap [class*=d2],#gridsetoverlaywrap [class*=d3],#gridsetoverlaywrap [class*=d4],#gridsetoverlaywrap [class*=d5],#gridsetoverlaywrap [class*=d6],#gridsetoverlaywrap [class*=d7],#gridsetoverlaywrap [class*=d8],#gridsetoverlaywrap [class*=d9],#gridsetoverlaywrap [class*=d10],#gridsetoverlaywrap [class*=d11],#gridsetoverlaywrap [class*=d12],#gridsetoverlaywrap .d-all{display:block;float:left;margin-right:-100%;}#gridsetoverlaywrap [class*=d1]{width:5.92105263%;margin-left:0%;}#gridsetoverlaywrap [class*=d2]{width:5.92105263%;margin-left:8.55263158%;}#gridsetoverlaywrap [class*=d3]{width:5.92105263%;margin-left:17.10526316%;}#gridsetoverlaywrap [class*=d4]{width:5.92105263%;margin-left:25.65789474%;}#gridsetoverlaywrap [class*=d5]{width:5.92105263%;margin-left:34.21052632%;}#gridsetoverlaywrap [class*=d6]{width:5.92105263%;margin-left:42.7631579%;}#gridsetoverlaywrap [class*=d7]{width:5.92105263%;margin-left:51.31578948%;}#gridsetoverlaywrap [class*=d8]{width:5.92105263%;margin-left:59.86842106%;}#gridsetoverlaywrap [class*=d9]{width:5.92105263%;margin-left:68.42105264%;}#gridsetoverlaywrap [class*=d10]{width:5.92105263%;margin-left:76.97368422%;}#gridsetoverlaywrap [class*=d11]{width:5.92105263%;margin-left:85.5263158%;}#gridsetoverlaywrap [class*=d12]{width:5.92105263%;margin-left:94.07894738%;}#gridsetoverlaywrap .d-hide{display:none !important;}#gridsetoverlaywrap [class*=dca1],#gridsetoverlaywrap [class*=dca2],#gridsetoverlaywrap [class*=dca3],#gridsetoverlaywrap [class*=dca4],#gridsetoverlaywrap [class*=dca5],#gridsetoverlaywrap [class*=dca6],#gridsetoverlaywrap [class*=dca7],#gridsetoverlaywrap .dca-all{display:block;float:left;margin-right:-100%;}#gridsetoverlaywrap [class*=dca1]{width:20.17543859%;margin-left:0%;}#gridsetoverlaywrap [class*=dca2]{width:20.17543859%;margin-left:22.80701754%;}#gridsetoverlaywrap [class*=dca3]{width:20.17543859%;margin-left:45.61403508%;}#gridsetoverlaywrap [class*=dca4]{width:5.92105263%;margin-left:68.42105262%;}#gridsetoverlaywrap [class*=dca5]{width:5.92105263%;margin-left:76.9736842%;}#gridsetoverlaywrap [class*=dca6]{width:5.92105263%;margin-left:85.52631578%;}#gridsetoverlaywrap [class*=dca7]{width:5.92105263%;margin-left:94.07894736%;}#gridsetoverlaywrap .dca-hide{display:none !important;}}</style>';
						
		while (p[k]) {
		
			var hides = '', 
				l = 0;
		
			if (w[k] != breaks && k == 0) gw += '<div>';
			else if (w[k] != breaks) gw += '</div><div>';
		
			while (p[l]) {
		
				if (l != k && w[l] != w[k]) hides += p[l] + '-hide ';
				l++;			
		
			}
		
			gw += '<div class="gridset ' + hides + '"><div class="'+p[k]+'1"><small>'+p[k]+'1</small></div>';
		
			var i = 1;
		
			while (i++ < c[k]) gw += '<div class="'+p[k]+i+'"><small>'+p[k]+i+'</small></div>';
		
			gw += '</div>';
		
			if (k == w.length - 1) gw += '</div>';
		
			breaks = w[k];
		
			k++;
		
		}
		
		gw += '</div></div>';
		
		var newgw = document.createElement('div');
		
		newgw.id = 'gridsetoverlaywrap';
		
		newgw.innerHTML = gw + styles;
		
		b.appendChild(newgw);
		
		gs.width();
		gs.bind(window, 'resize', gs.width);
	
	},
	
	bind : function (t, e, f) {
		
		if (t.attachEvent) t.attachEvent('on' + e, f);
		else t.addEventListener(e, f, false);
	
	},
	
	prevent : function (e) {
	
		if (e.preventDefault) e.preventDefault();
		else event.returnValue = false;
	
	}


};

gs.init();
