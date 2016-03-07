$(function(){
	$.ajax({
		method:'GET',
		url:'/api/articles',
		success:function(data){
			// var hometemplate  =  $("#homeTemplate").html();
			// var template = Handlebars.compile(hometemplate);
			// var html = template(data[0]);

			// $.each(data,function(index,article){
			// 	console.log(article);
			// 	var html = template(article);
			// 	$('.row').append(html);
			// })



		$.each(data,function(index,article){
			var string = '';
			string +=	'<div class="col-md-4">';
			string +=		'<p class="text-center">';
			string +=			'<div class="img">'
			string +=				'<img src= '+ article.image +' class="img-responsive" />';
			string +=			'</div>';
			string +=			'<a href="/article/'+article.id+'">';
			string +=				article.title;
			string +=			'</a>';
			string +=		'</p>';
			string +=	'</div>';
			$('#articles').append(string);
		})
	},
	error:function(err,msg){
		console.log(err,msg);
	}
})
});