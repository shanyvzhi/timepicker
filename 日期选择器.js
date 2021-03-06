		$.extend({
		    timePickerCom: function(name) {
		    	$('#app').html(`
		    		<div id="root"></div>
					<div class="picker">
						<button class="reduce"><</button>
						<div class="year"></div>
						<div class="month"></div>
						<button class="add">></button>
						<div class="week">
							<span class="red">日</span>
							<span>一</span>
							<span>二</span>
							<span>三</span>
							<span>四</span>
							<span>五</span>
							<span class="red">六</span>
						</div>
						<div class="day"></div>
						<div class="select-year">
							<select></select>
						</div>
					</div>`
		    		)

		       let data = new Array(12);
		let month;
		let year;
		let day;
		
		// 每年的数据，保存到一个数组中
		function getYearData(year=date.getFullYear()){
			for(let i=0;i<data.length;i++){
				data[i] = [];
			}
			let bigMonths = [1,3,5,7,8,10,12];
			let smallMonths = [4,6,9,11]
			for(let i=1;i<13;i++){
				if(bigMonths.indexOf(i)!==-1){
					for(let j=1;j<32;j++){
						data[i-1].push(j);
					}
				}else if(smallMonths.indexOf(i)!==-1){
					for(let j=1;j<31;j++){
						data[i-1].push(j);
					}
				}else{
					// 判断闰年
					if(year%4==0&&year%100!=0){
						for(let j=1;j<30;j++){
							data[i-1].push(j);
						}
					}else{
						for(let j=1;j<29;j++){
							data[i-1].push(j);
						}
					}
				}
			}
			// 十二个月的数据
			// console.log(data);
		}

		let date = new Date();
		function getDate(){
			// 当前月份
			month = date.getMonth();
			month += 1;
			console.log(month)
			$(".month").text(month+"月");


			// 当前年份
			year = date.getFullYear();
			// console.log(year)
			$(".year").text(year+"年");

			getYearData(year);

			// 当前日期，某天
			day = date.getDate();
		}
		getDate();


		// 选择年份
		$('.year').click(function(){
			$('.select-year').toggle("fast");
		})
		let optionText = '';
		for(let i=1900;i<=2019;i++){
			optionText += '<option>'+i+'</option>'
		}
		$('select').html(optionText);
		$('select').change(function(e){
			// console.log($('select').val(),e);
			year = e.target.value
			$(".year").text(year+"年");	
			getYearData(year);
			setDays(month);
			$('.select-year').toggle("fast");
		})

		function setDays(month=date.getMonth()+1){
			// 设置天数，数组下标需要减1
			var days = data[month-1];
			// console.log(days)
			let daysText = '';
			let weekNum = 0;
			let week = setWeek() + 1;

			for(let i=1;i<week;i++){
				month = (month-2==-1)?12:month;
				daysText += "<span class='gray before'>"+(data[month-2].length+1+i-week)+"</span>"
			}
			weekNum += setWeek();
			// console.log(year,date.getFullYear(),month==(date.getMonth()+1))
			for(let i=1;i<=data[month-1].length;i++){
				if((year==date.getFullYear())&&(month==(date.getMonth()+1))&&(i==date.getDate())){
					daysText += '<span class="blue">'+i+'</span>';
					weekNum++;
				}
				else{
					if(weekNum%7==0||weekNum%7==6){
						// console.log(weekNum)
						daysText += '<span class="red">'+i+'</span>';
						weekNum++;
					}else{
						daysText += '<span>'+i+'</span>';
						weekNum++;
					}
					if(weekNum%7==0&&weekNum!=0&&weekNum!=35){
						daysText += '<br>';				
					}
				}
			}
			for(let i=1;i<=42-weekNum;i++){
				if(weekNum%7==0&&weekNum!=0&&weekNum!=35){
					daysText += '<br>';			
				}
				daysText += "<span class='gray after'>"+i+"</span>";
			}
			$('.day').html(daysText)
		}
		setDays(month);

		// 计算星期
		function setWeek(){
			// 1900.1.1是星期一
			// 计算每个月第一天是星期几
			// console.log(year,month,day);
			var dayOne = new Date(year+'/'+month+'/1');
			var week = dayOne.getDay();
			// console.log(week)
			return week;
		}

		setWeek();

		// 设置加月份
		$('.add').click(function(){
			if(month==12){
				year += 1;
				month = 0;
			}
			month += 1;
			setDays(month);
			$(".month").text(month+"月");
			$(".year").text(year+"年");
		})
		// 设置减月份
		$('.reduce').click(function(){
			if(month==1){
				year -= 1;
				month = 13;
			}
			month -= 1;
			setDays(month);
			$(".month").text(month+"月");
			$(".year").text(year+"年");
		})
		$("#root").click(function(){
			$('.picker').toggle("slow",function(){
				reset();
			});
			
		})

		// 重置
		function reset(){
			month = date.getMonth() + 1;
			year = date.getFullYear();
			getYearData();
			setDays();
			$(".month").text(month + "月");
			$(".year").text(year + "年");
		}

		// 输出选择
		function timePicker(separator=" ",monthEsc=month){
			let yearChoose = year;
			let monthChoose = monthEsc;
			let dayChoose = day;
			$('#root').text(yearChoose+separator+monthChoose+separator+dayChoose);
			console.log(yearChoose+separator+monthChoose+separator+dayChoose);
		}

		// 最终获取所有
		$('.picker').on('click','.day span',function(e){
			// console.log(e.target.innerText,1);
			// console.log($(e.target).hasClass('before'))
			if($(e.target).hasClass('before')){
				monthEsc = month - 1;
				console.log(monthEsc)
			}else if($(e.target).hasClass('after')){
				monthEsc = month + 1;
			}else{
				monthEsc = month;
			}
			day = e.target.innerText;
			timePicker("/",monthEsc);
		})
		    }
		})
	$.timePickerCom();