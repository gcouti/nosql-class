var map = function(){
	print("MAP");
	emit(this.color, 1);
}

var reduce = function(key, values){
	print(key);
	print(values);

	return Array.sum(values);
}

db.Colors.mapReduce(map, reduce,{out:"teste"});