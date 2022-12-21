var fs = require('fs');

exports.list = function (req, res) {
	fs.exists('./todo_list.json', function (exists) {
		if (exists) {
			fs.readFile('./todo_list.json', {
				'encoding': 'utf8'
			}, function (err, list) {
				res.json(list);
			});
		} else {
			var list = {
				'list': []
			};

			fs.writeFile('./todo_list.json', JSON.stringify(list), function (err) {
				res.json(list);
			});
		}
	});
};

exports.add = function (req, res) {
	fs.readFile('./todo_list.json', {
		'encoding': 'utf8'
	}, function (err, data) {
		data = JSON.parse(data);

		var todo = {
			'contents': '',
			'complete': false
		};

		todo.contents = req.body.contents;

		var blank = true;
		for (var i = 0; i < todo.contents.length; i++) {
			if (todo.contents[i] != ' ') {
				blank = false;
				break;
			}
		}

		if (!blank) {
			data.list.push(todo);

			fs.writeFile('./todo_list.json', JSON.stringify(data), function (err) {
				res.json(true);
			});
		}
	});
};

exports.complete = function (req, res) {
	fs.readFile('./todo_list.json', function (err, data) {
		data = JSON.parse(data);

		data.list[req.body.index].complete = true;

		fs.writeFile('./todo_list.json', JSON.stringify(data), function (err) {
			res.json(true);
		});
	});
};

exports.del = function (req, res) {
	fs.readFile('./todo_list.json', function (err, data) {
		data = JSON.parse(data);

		data.list[req.body.index] = null;
		data.list = data.list.filter(Boolean);

		fs.writeFile('./todo_list.json', JSON.stringify(data), function (err) {
			res.json(true);
		});
	});
};