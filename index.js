const extract = () => {
	const extractButton = document.getElementById('extractLinks');
	const inputHtml = document.getElementById('htmlInput');
	const result = document.getElementById('result');
	const copyUrls = document.getElementById('copyUrls');
	const copySpinner = copyUrls.children[0];
	const exportBtn = document.getElementById('export');
	let urls = [];
	let csvData = [];
	
	// Parse HTML
	extractButton.addEventListener('click', () => {
		let el = document.createElement('html');
		el.innerHTML = inputHtml.value;

		result.innerHTML = '<tr><td colspan="3"><center>Empty</center></td></tr>';

		let atag = el.querySelectorAll('a');
		if (atag.length == 0) {
			alert('HTML not containst links');
			return;
		} else {
			result.innerHTML = '';
		}
		
		urls = [];
		csvData = [['URL', 'Anchor', 'Rel']];
		atag.forEach((tag) => {
			let tr = document.createElement('tr');
			tr.innerHTML = '<td>' + tag.attributes.href.value + '</td><td>' + tag.text + '</td><td>' + tag.rel + '</td>';
			result.appendChild(tr);
			urls.push(tag.attributes.href.value);
			csvData.push([tag.attributes.href.value.trim(), tag.text.trim(), tag.rel.trim()]);
		});
	});

	// Copy URLs
	copyUrls.addEventListener('click', () => {
		copySpinner.classList.remove('d-none');
		if (result.children.length == 1 && result.children[0].innerText == 'Empty') {
			alert('Nothing to copy');
			return;
		}

		let copyEl = document.createElement('textarea');
		document.body.appendChild(copyEl);
		urls.forEach((url) => {
			copyEl.innerHTML += url + "\n";
		});
		copyEl.select();

		if (document.execCommand('copy') == true) {
			copySpinner.classList.add('d-none');
			document.body.removeChild(copyEl);
		}
	});

	// Export
	exportBtn.addEventListener('click', () => {
		if (result.children.length == 1 && result.children[0].innerText == 'Empty') {
			alert('Nothing to export');
			return;
		}

		let csvContent = "data:text/csv;charset=utf-8," + csvData.map(e => e.join(";")).join("\n");
		let encodedUri = encodeURI(csvContent);
		window.open(encodedUri);
	});
}

document.addEventListener('DOMContentLoaded', extract);