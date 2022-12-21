$(document).ready(function () {
	var get_list = function () {
		$.ajax('/list', {
			'success': function (list) {
				var trs = '';
				list = JSON.parse(list).list;
				for (var i = 0, len = list.length; i < len; i++) {
					var success_contents = '';
					if (list[i].complete == true) {
						success_contents = '완료! (' + list[i].contents + ')';
					} else {
						success_contents = list[i].contents;
					}

					trs += '<tr>' +
						'<td>' + (i + 1) + '</td>' +
						'<td>' + success_contents + '</td>';

					if (list[i].complete == true) {
						trs += '<td><button type="button" class="btn btn-end">완료</button></td>' +
							'<td><button type="button" class="btn btn-danger">삭제</button></td>' + '</tr>';
					} else {
						trs += '<td><button type="button" class="btn btn-success">완료</button></td>' +
							'<td><button type="button" class="btn btn-danger">삭제</button></td>' + '</tr>';
					}
				}

				$('tbody').html(trs);
			}
		});
	};

	get_list();

	$('.form-inline button').click(function () {
		$.ajax('/add', {
			'method': 'POST',
			'data': {
				'contents': $('#new_todo').val()
			},
			'success': get_list
		});
	});

	$('tbody').on('click', '.btn-success', function () {
		$.ajax('/complete', {
			'method': 'POST',
			'data': {
				'index': parseInt($(this).parent().siblings(':first').text()) - 1
			},
			'success': get_list
		});
	});

	$('tbody').on('click', '.btn-end', function () {
		$.ajax('/complete', {
			'method': 'POST',
			'data': {
				'index': parseInt($(this).parent().siblings(':first').text()) - 1
			},
			'success': get_list
		});
	});

	$('tbody').on('click', '.btn-danger', function () {
		$.ajax('/del', {
			'method': 'POST',
			'data': {
				'index': parseInt($(this).parent().siblings(':first').text()) - 1
			},
			'success': get_list
		});
	});
});