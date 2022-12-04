const users = JSON.parse(sessionStorage.getItem('DATA')).users;

var state = {
	'querySet': users,

	'page': 1,
	'rows': 5,
	'window': 7,
};

buildTable();

function pagination(querySet, page, rows) {

	var trimStart = (page - 1) * rows;
	var trimEnd = trimStart + rows;

	var trimmedData = querySet.slice(trimStart, trimEnd);

	var pages = Math.round(querySet.length / rows);

	return {
		'querySet': trimmedData,
		'pages': pages,
	};
}

function pageButtons(pages) {
	var wrapper = document.getElementById('pagination-wrapper');

	wrapper.innerHTML = ``;
	console.log('Pages:', pages);

	var maxLeft = (state.page - Math.floor(state.window / 2));
	var maxRight = (state.page + Math.floor(state.window / 2));

	if (maxLeft < 1) {
		maxLeft = 1;
		maxRight = state.window;
	}

	if (maxRight > pages) {
		maxLeft = pages - (state.window - 1);

		if (maxLeft < 1) {
			maxLeft = 1;
		}
		maxRight = pages;
	}



	for (var page = maxLeft; page <= maxRight; page++) {
		if (state.page != page) {
			wrapper.innerHTML += `<button value=${page} class="page btn rounded-circle btn-info uncur_pag_style">${page}</button>`;
		}
		else {
			wrapper.innerHTML += `<button value=${page} class="page btn rounded-circle btn-info cur_pag_style">${page}</button>`;
		}

	}

	if (state.page != 1) {
		wrapper.innerHTML = `<button value=${1} class="page btn rounded-circle btn-info uncur_pag_style">&#171;</button>` + wrapper.innerHTML;
	}

	if (state.page != pages) {
		wrapper.innerHTML += `<button value=${pages} class="page btn rounded-circle btn-info uncur_pag_style">&#187;</button>`;
	}

	$('.page').on('click', function () {
		$('#table-personnel').empty();

		state.page = Number($(this).val());

		buildTable();
	});

}


function buildTable() {
	var table = $('#table-personnel');

	var data = pagination(state.querySet, state.page, state.rows);
	var myList = data.querySet;

	for (var i = 0; i < myList.length; i++) {
		var row1 = `<tr> <td class="pt-4"><img src="${myList[i].avatar}" alt="" class="row-avatar"> ${myList[i].id}</td>`;

		var row2 = `
          <td class="pt-4">${myList[i].role}</td>
          <td class="pt-4">${myList[i].fullname}</td>
          <td class="pt-4">${myList[i].email}</td>
          <td class="pt-4">${myList[i].phonenumber}</td>
          <td> 
            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#editModal"><i class="fa-solid fa-edit"></i></button>
            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#deleteModal"><i class="fa-solid fa-trash"></i></button>
          </td>
        </tr>`;
		var row = row1 + row2;
		table.append(row);
	}

	pageButtons(data.pages);
}