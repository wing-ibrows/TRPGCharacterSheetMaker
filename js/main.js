
//--------------------------
// メイン処理
//--------------------------

$(function(){
	$(document).ready(function(){
		saveData()
		showData(false);
		updateAlertMessage();
	});
	$("#print_page").on("click", function(){
		window.print();
	});
	$("#download_data").on("click", function(){
		downloadPersonData();
	});
	$("#upload_data").on("click", function(){
		$("#upload_data_file").click();
	});
	$("#upload_data_file").on("change", function(){
		uploadPersonData();
	});
	$("#btn_roll").on("click", function(){
		decideBaseAbility();
		showBaseAbility();
		setSkillByBaseAbility();

		saveData()
		showData(false);
		updateAlertMessage();
	});
	$(".input_text").on("input", function(){
		saveData();
		showData(false);
		updateAlertMessage();
	});
	$(".input_number").on("input", function(){
		saveData();
		showData(false);
		updateAlertMessage();
	});
	$(".input_textarea").on("input", function(){
		saveData();
		showData(false);
		updateAlertMessage();
	});
});

//--------------------------
// データ
//--------------------------

// ダウンロード・読み込み対象のデータ
var person_data = {
	basic_info: {
		name: "",
		degree: "",
		from: "",
		illness: "",
		gender: "",
		age: 0,
		job_name: ""
	},
	ability: {str: 0, dex: 0, int: 0, con: 0, app: 0, pow: 0, siz: 0, edu: 0},
	val_each_max: 80,
	skill: {
		fast_talk: {job: 0, opt: 0},
		medicine: {job: 0, opt: 0},
		drive_car: {job: 0, opt: 0},
		drive: {text: "", job: 0, opt: 0},
		first_aid: {job: 0, opt: 0},
		occult: {job: 0, opt: 0},
		dodge: {job: 0, opt: 0},
		chemistry: {job: 0, opt: 0},
		locksmith: {job: 0, opt: 0},
		conceal: {job: 0, opt: 0},
		hide: {job: 0, opt: 0},
		mechanical_repair: {job: 0, opt: 0},
		listen: {job: 0, opt: 0},
		cthulhu_mythos: {job: 0, opt: 0},
		art_1: {text: "", job: 0, opt: 0},
		art_2: {text: "", job: 0, opt: 0},
		accounting: {job: 0, opt: 0},
		archaeology: {job: 0, opt: 0},
		computer_use: {job: 0, opt: 0},
		sneak: {job: 0, opt: 0},
		photography: {job: 0, opt: 0},
		operate_heavy_machine: {job: 0, opt: 0},
		ride: {job: 0, opt: 0},
		credit_rating: {job: 0, opt: 0},
		psychology: {job: 0, opt: 0},
		anthropology: {job: 0, opt: 0},
		swim: {job: 0, opt: 0},
		creator_1: {text: "", job: 0, opt: 0},
		creator_2: {text: "", job: 0, opt: 0},
		psychoanalysis: {job: 0, opt: 0},
		biology: {job: 0, opt: 0},
		persuade: {job: 0, opt: 0},
		pilot_1: {text: "", job: 0, opt: 0},
		pilot_2: {text: "", job: 0, opt: 0},
		geology: {job: 0, opt: 0},
		jump: {job: 0, opt: 0},
		track: {job: 0, opt: 0},
		electrical_repair: {job: 0, opt: 0},
		electronics: {job: 0, opt: 0},
		astronomy: {job: 0, opt: 0},
		throw: {job: 0, opt: 0},
		library_use: {job: 0, opt: 0},
		navigate: {job: 0, opt: 0},
		bargain: {job: 0, opt: 0},
		natural_history: {job: 0, opt: 0},
		physics: {job: 0, opt: 0},
		disguise: {job: 0, opt: 0},
		law: {job: 0, opt: 0},
		other_language_1: {text: "", job: 0, opt: 0},
		other_language_2: {text: "", job: 0, opt: 0},
		own_language: {job: 0, opt: 0},
		martial_arts: {job: 0, opt: 0},
		spot_hidden: {job: 0, opt: 0},
		pharmacy: {job: 0, opt: 0},
		history: {job: 0, opt: 0},
		survival: {job: 0, opt: 0},
		iai: {job: 0, opt: 0},
		military_arts: {text: "", job: 0, opt: 0},
		others_1: {text: "", job: 0, opt: 0},
		others_2: {text: "", job: 0, opt: 0},
		handgun: {job: 0, opt: 0},
		submachine_gun: {job: 0, opt: 0},
		shotgun: {job: 0, opt: 0},
		machine_gun: {job: 0, opt: 0},
		rifle: {job: 0, opt: 0},
		other_weapon: {text: "", job: 0, opt: 0},
		kick: {job: 0, opt: 0},
		grapple: {job: 0, opt: 0},
		punch: {job: 0, opt: 0},
		head_butt: {job: 0, opt: 0},
	},
	detail_info: {
		address: "",
		depiction: "",
		neibor: "",
		illness_symptoms: "",
		injured: "",
		scar: "",
		income: 0,
		cash_on_hand: 0,
		deposit: 0,
		personal_assets: "",
		real_estate: "",
		book_of_magic: "",
		items: "",
		unnatural: ""
	}
};

// ダウンロード・読み込み対象外の一時データ
var person_temp_data = {
	ability: {idea: 0, luck: 0, san: 0, knld: 0, msan: 0},
	dmb: "0",
	pt_san: 0,
	pt_magic: 0,
	pt_edr: 0,
	skill: {
		fast_talk: {init: 5, sum: 0, flg_over_max: 0},
		medicine: {init: 5, sum: 0, flg_over_max: 0},
		drive_car: {init: 20, sum: 0, flg_over_max: 0},
		drive: {init: 20, sum: 0, flg_over_max: 0},
		first_aid: {init: 20, sum: 0, flg_over_max: 0},
		occult: {init: 30, sum: 0, flg_over_max: 0},
		dodge: {init: 0, sum: 0, flg_over_max: 0},
		chemistry: {init: 1, sum: 0, flg_over_max: 0},
		locksmith: {init: 1, sum: 0, flg_over_max: 0},
		conceal: {init: 15, sum: 0, flg_over_max: 0},
		hide: {init: 10, sum: 0, flg_over_max: 0},
		mechanical_repair: {init: 20, sum: 0, flg_over_max: 0},
		listen: {init: 25, sum: 0, flg_over_max: 0},
		cthulhu_mythos: {init: 0, sum: 0, flg_over_max: 0},
		art_1: {init: 5, sum: 0, flg_over_max: 0},
		art_2: {init: 5, sum: 0, flg_over_max: 0},
		accounting: {init: 10, sum: 0, flg_over_max: 0},
		archaeology: {init: 1, sum: 0, flg_over_max: 0},
		computer_use: {init: 1, sum: 0, flg_over_max: 0},
		sneak: {init: 10, sum: 0, flg_over_max: 0},
		photography: {init: 10, sum: 0, flg_over_max: 0},
		operate_heavy_machine: {init: 1, sum: 0, flg_over_max: 0},
		ride: {init: 5, sum: 0, flg_over_max: 0},
		credit_rating: {init: 15, sum: 0, flg_over_max: 0},
		psychology: {init: 5, sum: 0, flg_over_max: 0},
		anthropology: {init: 1, sum: 0, flg_over_max: 0},
		swim: {init: 25, sum: 0, flg_over_max: 0},
		creator_1: {init: 5, sum: 0, flg_over_max: 0},
		creator_2: {init: 5, sum: 0, flg_over_max: 0},
		psychoanalysis: {init: 1, sum: 0, flg_over_max: 0},
		biology: {init: 1, sum: 0, flg_over_max: 0},
		persuade: {init: 15, sum: 0, flg_over_max: 0},
		pilot_1: {init: 1, sum: 0, flg_over_max: 0},
		pilot_2: {init: 1, sum: 0, flg_over_max: 0},
		geology: {init: 1, sum: 0, flg_over_max: 0},
		jump: {init: 25, sum: 0, flg_over_max: 0},
		track: {init: 10, sum: 0, flg_over_max: 0},
		electrical_repair: {init: 10, sum: 0, flg_over_max: 0},
		electronics: {init: 1, sum: 0, flg_over_max: 0},
		astronomy: {init: 1, sum: 0, flg_over_max: 0},
		throw: {init: 40, sum: 0, flg_over_max: 0},
		library_use: {init: 25, sum: 0, flg_over_max: 0},
		navigate: {init: 10, sum: 0, flg_over_max: 0},
		bargain: {init: 5, sum: 0, flg_over_max: 0},
		natural_history: {init: 10, sum: 0, flg_over_max: 0},
		physics: {init: 1, sum: 0, flg_over_max: 0},
		disguise: {init: 1, sum: 0, flg_over_max: 0},
		law: {init: 5, sum: 0, flg_over_max: 0},
		other_language_1: {init: 1, sum: 0, flg_over_max: 0},
		other_language_2: {init: 1, sum: 0, flg_over_max: 0},
		own_language: {init: 0, sum: 0, flg_over_max: 0},
		martial_arts: {init: 1, sum: 0, flg_over_max: 0},
		spot_hidden: {init: 25, sum: 0, flg_over_max: 0},
		pharmacy: {init: 1, sum: 0, flg_over_max: 0},
		history: {init: 20, sum: 0, flg_over_max: 0},
		survival: {init: 10, sum: 0, flg_over_max: 0},
		iai: {init: 1, sum: 0, flg_over_max: 0},
		military_arts: {init: 1, sum: 0, flg_over_max: 0},
		others_1: {init: 0, sum: 0, flg_over_max: 0},
		others_2: {init: 0, sum: 0, flg_over_max: 0},
		handgun: {init: 20, sum: 0, flg_over_max: 0},
		submachine_gun: {init: 15, sum: 0, flg_over_max: 0},
		shotgun: {init: 30, sum: 0, flg_over_max: 0},
		machine_gun: {init: 15, sum: 0, flg_over_max: 0},
		rifle: {init: 25, sum: 0, flg_over_max: 0},
		other_weapon: {init: 0, sum: 0, flg_over_max: 0},
		kick: {init: 25, sum: 0, flg_over_max: 0},
		grapple: {init: 25, sum: 0, flg_over_max: 0},
		punch: {init: 50, sum: 0, flg_over_max: 0},
		head_butt: {init: 10, sum: 0, flg_over_max: 0},
	},
	val_job: {sum: 0, avail: 0},
	val_opt: {sum: 0, avail: 0},
	num_skill_over_max: 0
};

// 能力値の目安
var ABILITY_ROUGH_INDICATION = {
	str: [
		{min: 3, max: 4, text: "箸より重いものが持てない"},
		{min: 5, max: 6, text: "貧弱"},
		{min: 7, max: 8, text: "運動嫌い"},
		{min: 9, max: 12, text: "普通"},
		{min: 13, max: 14, text: "運動好き"},
		{min: 15, max: 16, text: "アスリート"},
		{min: 17, max: 18, text: "見てわかるマッチョ"}
	],
	dex: [
		{min: 3, max: 3, text: "100m走：20.5秒、手先の器用さ：触れるもの皆傷付ける"},
		{min: 4, max: 4, text: "100m走：19.7秒、手先の器用さ：触れるもの皆傷付ける"},
		{min: 5, max: 5, text: "100m走：19.0秒、手先の器用さ：料理や片付けが苦手"},
		{min: 6, max: 6, text: "100m走：18.3秒、手先の器用さ：料理や片付けが苦手"},
		{min: 7, max: 7, text: "100m走：17.6秒、手先の器用さ：美術や技術が苦手"},
		{min: 8, max: 8, text: "100m走：16.9秒、手先の器用さ：美術や技術が苦手"},
		{min: 9, max: 9, text: "100m走：16.2秒、手先の器用さ：普通"},
		{min: 10, max: 10, text: "100m走：15.5秒、手先の器用さ：普通"},
		{min: 11, max: 11, text: "100m走：14.8秒、手先の器用さ：普通"},
		{min: 12, max: 12, text: "100m走：14.1秒、手先の器用さ：普通"},
		{min: 13, max: 13, text: "100m走：13.4秒、手先の器用さ：美術や技術が得意"},
		{min: 14, max: 14, text: "100m走：12.7秒、手先の器用さ：美術や技術が得意"},
		{min: 15, max: 15, text: "100m走：12.0秒、手先の器用さ：技術職につける"},
		{min: 16, max: 16, text: "100m走：11.3秒、手先の器用さ：技術職につける"},
		{min: 17, max: 17, text: "100m走：10.6秒、手先の器用さ：ゴッドハンド"},
		{min: 18, max: 18, text: "100m走：10.0秒、手先の器用さ：ゴッドハンド"}
	],
	int: [
		{min: 8, max: 9, text: "物覚えが悪い"},
		{min: 10, max: 11, text: "頭が固い"},
		{min: 12, max: 13, text: "普通"},
		{min: 14, max: 15, text: "柔軟な発想ができる"},
		{min: 16, max: 17, text: "キレ者"},
		{min: 18, max: 18, text: "アインシュタイン"}
	],
	con: [
		{min: 3, max: 4, text: "一日の大半寝てる"},
		{min: 5, max: 6, text: "病弱"},
		{min: 7, max: 8, text: "すぐへばる"},
		{min: 9, max: 12, text: "普通"},
		{min: 13, max: 14, text: "丈夫"},
		{min: 15, max: 16, text: "病気したことない"},
		{min: 17, max: 18, text: "不眠不休で働けます"}
	],
	app: [
		{min: 3, max: 4, text: "目を背けられる"},
		{min: 5, max: 6, text: "ブス/ブサイク"},
		{min: 7, max: 8, text: "チョイブス/チョイブサイク"},
		{min: 9, max: 12, text: "普通"},
		{min: 13, max: 14, text: "チョイモテ"},
		{min: 15, max: 16, text: "同性にも好かれる"},
		{min: 17, max: 18, text: "誰もが振り返る"}
	],
	pow: [
		{min: 3, max: 3, text: "精神を病んでいる"},
		{min: 4, max: 4, text: "過去に大きなトラウマがある"},
		{min: 5, max: 6, text: "すぐパニックになる"},
		{min: 7, max: 8, text: "打たれ弱い"},
		{min: 9, max: 12, text: "普通"},
		{min: 13, max: 14, text: "打たれ強い"},
		{min: 15, max: 16, text: "強靭な精神の持ち主"},
		{min: 17, max: 17, text: "その筋の修業をしている人"},
		{min: 18, max: 18, text: "聖人"}
	],
	siz: [
		{min: 3, max: 3, text: "身長：120-125cm"},
		{min: 4, max: 4, text: "身長：125-130cm"},
		{min: 5, max: 5, text: "身長：130-135cm"},
		{min: 6, max: 6, text: "身長：135-140cm"},
		{min: 7, max: 7, text: "身長：140-145cm"},
		{min: 8, max: 8, text: "身長：145-150cm"},
		{min: 9, max: 9, text: "身長：150-155cm"},
		{min: 10, max: 10, text: "身長：155-160cm"},
		{min: 11, max: 11, text: "身長：160-165cm"},
		{min: 12, max: 12, text: "身長：165-170cm"},
		{min: 13, max: 13, text: "身長：170-175cm"},
		{min: 14, max: 14, text: "身長：175-180cm"},
		{min: 15, max: 15, text: "身長：180-185cm"},
		{min: 16, max: 16, text: "身長：185-190cm"},
		{min: 17, max: 17, text: "身長：190-195cm"},
		{min: 18, max: 18, text: "身長：195-200cm"}
	],
	edu: [
		{min: 3, max: 3, text: "中1"},
		{min: 4, max: 4, text: "中2"},
		{min: 5, max: 5, text: "中3"},
		{min: 6, max: 6, text: "高1／中卒10年以内"},
		{min: 7, max: 7, text: "高2／中卒20年以内"},
		{min: 8, max: 8, text: "高3／中卒30年以内"},
		{min: 9, max: 9, text: "大1／高卒10年以内"},
		{min: 10, max: 10, text: "大2／高卒20年以内"},
		{min: 11, max: 11, text: "大3／高卒30年以内"},
		{min: 12, max: 12, text: "大4／高卒40年以内"},
		{min: 13, max: 13, text: "院1／大卒10年以内"},
		{min: 14, max: 14, text: "院2／大卒20年以内"},
		{min: 15, max: 15, text: "院3／大卒30年以内"},
		{min: 16, max: 16, text: "院4／大卒40年以内"},
		{min: 17, max: 17, text: "院5／院卒10年以内"},
		{min: 18, max: 18, text: "院6／院卒20年以内"}
	]
};

//--------------------------
// 関数
//--------------------------

function getRandomInt(min, max){
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function get1dn(num){
	return getRandomInt(1, num+1);
}

function getNd6(num){
	var result = 0;
	for(var i = 0; i < num; i++){
		result += get1dn(6);
	}
	return result;
}

function decideBaseAbility(){
	person_data["ability"]["str"] = getNd6(3);
	person_data["ability"]["dex"] = getNd6(3);
	person_data["ability"]["int"] = getNd6(2) + 6;
	person_temp_data["ability"]["idea"] = person_data["ability"]["int"] * 5;
	person_data["ability"]["con"] = getNd6(3);
	person_data["ability"]["app"] = getNd6(3);
	person_data["ability"]["pow"] = getNd6(3);
	person_temp_data["ability"]["luck"] = person_data["ability"]["pow"] * 5;
	person_data["ability"]["siz"] = getNd6(2) + 6;
	person_temp_data["ability"]["san"] = person_data["ability"]["pow"] * 5;
	person_data["ability"]["edu"] = getNd6(3) + 3;
	person_temp_data["ability"]["knld"] = person_data["ability"]["edu"] * 5;
	person_temp_data["ability"]["msan"] = 99 - person_temp_data["skill"]["cthulhu_mythos"]["sum"];

	setDmb();
	setAbilityPts();
}

function setDmb(){
	let val_dmb = "";
	let val_strsiz = person_data["ability"]["str"] + person_data["ability"]["siz"];
	if(val_strsiz <= 12){
		val_dmb = "-1d6";
	}
	else if(val_strsiz <= 16){
		val_dmb = "-1d4";
	}
	else if(val_strsiz <= 24){
		val_dmb = "0";
	}
	else if(val_strsiz <= 32){
		val_dmb = "1d4";
	}
	else if(val_strsiz <= 40){
		val_dmb = "1d6";
	}
	person_temp_data["dmb"] = val_dmb;
}

function setAbilityPts(){
	person_temp_data["pt_san"] = person_temp_data["ability"]["san"];
	person_temp_data["pt_magic"] = person_data["ability"]["pow"];
	person_temp_data["pt_edr"] = Math.ceil( (person_data["ability"]["siz"] + person_data["ability"]["con"])/2 );
}

function showBaseAbility(){
	for(let key in person_data["ability"]){
		$("#val_" + key).html(person_data["ability"][key]);
	}
	for(let key in person_temp_data["ability"]){
		$("#val_" + key).html(person_temp_data["ability"][key]);
	}
	for(let key in ABILITY_ROUGH_INDICATION){
		let expl = "";
		for(const record of ABILITY_ROUGH_INDICATION[key]){
			if(record["min"] <= person_data["ability"][key] && person_data["ability"][key] <= record["max"]){
				expl = record["text"];
				break;
			}
		}
		$("#expl_" + key).html(expl);
	}
	$("#val_dmb").html(person_temp_data["dmb"]);

	for(const key of ["pt_san", "pt_magic", "pt_edr"]){
		$("#val_" + key).html(person_temp_data[key]);
	}
}

function setSkillByBaseAbility(){
	person_temp_data["val_job"]["sum"] = person_data["ability"]["edu"] * 20;
	person_temp_data["val_opt"]["sum"] = person_data["ability"]["int"] * 10;

	person_temp_data["skill"]["dodge"]["init"] = person_data["ability"]["dex"] * 2;
	person_temp_data["skill"]["own_language"]["init"] = person_data["ability"]["edu"] * 5;
}

function calcValAvail(){
	let val_used_job = 0;
	let val_used_opt = 0;
	for(let key in person_data["skill"]){
		val_used_job += person_data["skill"][key]["job"]
		val_used_opt += person_data["skill"][key]["opt"]
	}
	person_temp_data["val_job"]["avail"] = person_temp_data["val_job"]["sum"] - val_used_job;
	person_temp_data["val_opt"]["avail"] = person_temp_data["val_opt"]["sum"] - val_used_opt;
}

function saveData(){
	// save basic info
	for(let key in person_data["basic_info"]){
		if(key == "age"){
			person_data["basic_info"][key] = Number($("#person_" + key).val());
		} else{
			person_data["basic_info"][key] = $("#person_" + key).val();
		}
	}

	// save skill
	person_temp_data["val_each_max"] = Number($("#val_each_max").val());

	let num_skill_over_max = 0;
	for(let key in person_data["skill"]){
		if("text" in person_data["skill"][key]){
			person_data["skill"][key]["text"] = $("#text_" + key).val();
		}

		person_data["skill"][key]["job"] = Number($("#val_job_" + key).val());
		person_data["skill"][key]["opt"] = Number($("#val_opt_" + key).val());
		person_temp_data["skill"][key]["sum"] = person_temp_data["skill"][key]["init"] + person_data["skill"][key]["job"] + person_data["skill"][key]["opt"];

		if(person_temp_data["skill"][key]["sum"] > person_temp_data["val_each_max"]){
			// Note: if already exceeded only init skill value compared to threshold of skill sum value
			if(person_temp_data["skill"][key]["init"] > person_temp_data["val_each_max"] &&
				person_temp_data["skill"][key]["init"] == person_temp_data["skill"][key]["sum"]){
				person_temp_data["skill"][key]["flg_over_max"] = 0;
			} else {
				person_temp_data["skill"][key]["flg_over_max"] = 1;
				num_skill_over_max++;
			}
		} else{
			person_temp_data["skill"][key]["flg_over_max"] = 0;
		}
	}
	calcValAvail();
	person_temp_data["num_skill_over_max"] = num_skill_over_max;

	// save ability (msan)
	person_temp_data["ability"]["msan"] = 99 - person_temp_data["skill"]["cthulhu_mythos"]["sum"];

	// save detail info
	for(let key in person_data["detail_info"]){
		if(key == "income" || key == "cash_on_hand" || key == "deposit"){
			person_data["detail_info"][key] = Number($("#person_" + key).val());
		} else{
			person_data["detail_info"][key] = $("#person_" + key).val();
		}
	}
}

function showData(flg_update_txt){
	$("#val_msan").html(person_temp_data["ability"]["msan"]);

	$("#val_job_sum").html(person_temp_data["val_job"]["sum"]);
	$("#val_opt_sum").html(person_temp_data["val_opt"]["sum"]);
	$("#val_job_avail").html(person_temp_data["val_job"]["avail"]);
	$("#val_opt_avail").html(person_temp_data["val_opt"]["avail"]);

	for(let key in person_data["skill"]){
		$("#val_init_" + key).html(person_temp_data["skill"][key]["init"]);
		$("#val_job_" + key).val(person_data["skill"][key]["job"]);
		$("#val_opt_" + key).val(person_data["skill"][key]["opt"]);

		$("#val_" + key).html(person_temp_data["skill"][key]["sum"]);
		if(person_temp_data["skill"][key]["flg_over_max"] > 0){
			$("#val_" + key).css('color', 'red');
		} else{
			$("#val_" + key).css('color', '');
		}
	}

	if(flg_update_txt){
		for(let key in person_data["basic_info"]){
			$("#person_" + key).val(person_data["basic_info"][key]);
		}
		for(let key in person_data["detail_info"]){
			$("#person_" + key).val(person_data["detail_info"][key]);
		}
	}
}

function updateAlertMessage(){
	let message = "";
	if(person_data["ability"]["str"] == 0){
		message = "ロールして能力値を設定してください";
	}
	else if(!person_data["basic_info"]["job_name"]){
		message = "探索者の職業を設定してください";
	}
	else if(person_temp_data["val_job"]["avail"] != 0 && person_temp_data["val_opt"]["avail"] != 0){
		message = "職業技能、任意技能の残加算がゼロなるように加算してください";
	}
	else if(person_temp_data["val_job"]["avail"] != 0){
		message = "職業技能の残加算がゼロなるように加算してください";
	}
	else if(person_temp_data["val_opt"]["avail"] != 0){
		message = "任意技能の残加算がゼロなるように加算してください";
	}
	else if(person_temp_data["num_skill_over_max"] > 0){
		message = "各技能の合計値が最大値を下回るように加算してください";
	}
	$("#alert_message").html(message);
}

function downloadPersonData(){
	const date = new Date();
	const str_date = date.getFullYear()
		+ ("00" + (date.getMonth() + 1)).slice(-2)
		+ ("00" + (date.getDate())).slice(-2)
		+ ("00" + (date.getHours())).slice(-2)
		+ ("00" + (date.getMinutes())).slice(-2)
		+ ("00" + (date.getSeconds())).slice(-2);

	const jsonString = JSON.stringify(person_data); 
	const blob = new Blob([jsonString],{type:'text/plain'});

	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	document.body.appendChild(a);
	a.download = 'person_data_' + str_date + '.json';
	a.href = url;
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}

function uploadPersonData(){
	if ($("#upload_data_file").val() !== "") {
		var upload_file = $("#upload_data_file").prop('files')[0]; 
		if (!/\.(json)$/.test(upload_file.name) || !/(json)$/.test(upload_file.type)) {
			alert("JSONファイルをアップロードしてください");
		}
		else if (1048576 < upload_file.size) {
			alert("1MB以下のファイルをアップロードしてください");
		}
		else {
			if (window.FileReader){
				var file_reader = new FileReader();
				file_reader.onload = function(e) {
					person_data = JSON.parse(e.target.result);
					initPersonTempData();

					showBaseAbility();
					showData(true);
				}
				file_reader.readAsText(upload_file);
			}
			return false;
		}
	}
	$("#upload_data_file").val('');
	updateAlertMessage();
}

function initPersonTempData(){
	// set ability(except msan)
	person_temp_data["ability"]["idea"] = person_data["ability"]["int"] * 5;
	person_temp_data["ability"]["luck"] = person_data["ability"]["pow"] * 5;
	person_temp_data["ability"]["san"] = person_data["ability"]["pow"] * 5;
	person_temp_data["ability"]["knld"] = person_data["ability"]["edu"] * 5;

	// set dmb, pt_[san|magic|edr]
	setDmb();
	setAbilityPts();

	// set skill
	setSkillByBaseAbility();

	let num_skill_over_max = 0;
	for(let key in person_data["skill"]){
		person_temp_data["skill"][key]["sum"] = person_temp_data["skill"][key]["init"] + person_data["skill"][key]["job"] + person_data["skill"][key]["opt"];

		if(person_temp_data["skill"][key]["sum"] > person_temp_data["val_each_max"]){
			// Note: if already exceeded only init skill value compared to threshold of skill sum value
			if(person_temp_data["skill"][key]["init"] > person_temp_data["val_each_max"] &&
				person_temp_data["skill"][key]["init"] == person_temp_data["skill"][key]["sum"]){
				person_temp_data["skill"][key]["flg_over_max"] = 0;
			} else {
				person_temp_data["skill"][key]["flg_over_max"] = 1;
				num_skill_over_max++;
			}
		} else{
			person_temp_data["skill"][key]["flg_over_max"] = 0;
		}
	}
	calcValAvail();
	person_temp_data["num_skill_over_max"] = num_skill_over_max;

	// save ability (msan)
	person_temp_data["ability"]["msan"] = 99 - person_temp_data["skill"]["cthulhu_mythos"]["sum"];
}

