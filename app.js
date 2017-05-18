var express = require('express');
var fs = require('fs');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();

app.get('/', function(req, res, next){
	superagent.get('https://cnodejs.org/').
		end(function(err, sres){
			if(err){
				return next(err);
			}
			// console.log('sres', sres);
			var $ = cheerio.load(sres.text);
			// console.log('$', $);
			var items = [];
			var text = '';
			console.log($('#topic_list .topic_title'));
			$('#topic_list .topic_title').each(function(index, element){
				console.log(index, element);
				var $element = $(element);
				items.push({
					title: $element.attr('title'),
					href: $element.attr('href')
				});
				text += 'title: ' + $element.attr('title') + '<br>\n' + 
					'href: ' + $element.attr('href') + '<br><br>\n';
			});

			// res.send(items);
			res.send(text);

			fs.writeFile('message.txt', text, 'utf8', function(err){
				if(err){
					throw err;
				}
				console.log('This message is saved!');
			});
		});
});

app.listen(3000, function(){
	console.log('app is listening at port 3000');
});