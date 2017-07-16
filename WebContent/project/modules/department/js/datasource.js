/**
 * 
 */
define(function(){
	
	var dataSource = {};
	
	var doctors = [{
		name:'特色科室',
		depts:[{
			name:'临床免疫科'
		},{
			name:'消化内科'
		},{
			name:'老年病科'
		},{
			name:'中医科'
		},{
			name:'心脏病科'
		},{
			name:'内分泌内科'
		},{
			name:'呼吸内科'
		},{
			name:'血液内科'
		},{
			name:'神经内科'
		},{
			name:'肾脏内科'
		},{
			name:'神经外科'
		},{
			name:'泌尿外科'
		},{
			name:'骨科'
		},{
			name:'儿科'
		},{
			name:'妇产科'
		},{
			name:'皮肤科'
		}]
	},{
		name:'内科',
		depts:[{
			name:'临床免疫科'
		},{
			name:'消化内科'
		},{
			name:'老年病科'
		},{
			name:'中医科'
		},{
			name:'心脏病科'
		},{
			name:'内分泌内科'
		},{
			name:'呼吸内科'
		},{
			name:'血液内科'
		},{
			name:'神经内科'
		},{
			name:'肾脏内科'
		}]
	},{
		name:'外科',
		depts:[{
			name:'胸外科'
		},{
			name:'心血管'
		},{
			name:'美容科'
		},{
			name:'神经外科'
		},{
			name:'耳鼻咽喉头颈外科'
		},{
			name:'泌尿外科'
		}]
	}];
	
	dataSource.getDepts = function(){
		return doctors;
	}
	
	return dataSource;
});