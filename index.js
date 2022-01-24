let debug = false;

let pageNum = 0
let pages = {
	page1: {
		type: "page",
		element: undefined,
		learned: false,
		title: "The Log Project",
	},
	section: {
		type: "divider",
		title: "The Basics",
	},
	page2: {
		type: "page",
		element: undefined,
		learned: false,
		title: "Logarithms",
	},
	section2: {
		type: "divider",
		title: "Properties of Logarithms",
	},
	page3: {
		type: "page",
		element: undefined,
		learned: false,
		title: "Product Property",
	},
	page4: {
		type: "page",
		element: undefined,
		learned: false,
		title: "Quotient Property",
	},
	page5: {
		type: "page",
		element: undefined,
		learned: false,
		title: "Power Property",
	},
	page6: {
		type: "page",
		element: undefined,
		learned: false,
		title: "Inverse Property",
	},
	section3: {
		type: "divider",
		title: "More about log()",
	},
	page7: {
		type: "page",
		element: undefined,
		learned: false,
		title: "Change of Base",
	},
	page8: {
		type: "page",
		element: undefined,
		learned: false,
		title: "Euler's Number",
	},
};

for (let [_i, x] of Object.entries(pages)) {
	if (x.type === "page") {
		pageNum++
	}
}

if (debug) {
	localStorage.setItem("theLogProjectProgress", JSON.stringify(pages))
}

pages = localStorage.getItem("theLogProjectProgress") == undefined ? pages : JSON.parse(localStorage.getItem("theLogProjectProgress"))

let menu = document.getElementById("menu");
let iframes = document.getElementById("iframes");

for (let [i, x] of Object.entries(pages)) {
	if (x.type === "page") {
		menu.innerHTML +=
			"<button onclick=\"updatePage('" +
			i +
			'\')" class="sideBarDivLesson"><div id="' +
			i +
			'Completion"class="completion"></div><div id="sidebarLesson' +
			i +
			'" class="sideBarLessonTitle">' +
			x.title +
			"</div></button>";
		iframes.innerHTML +=
			'<iframe id="' +
			i +
			'" src="' +
			i +
			".html\"><p>Whoops. Something's gone wrong. Please reload, or try again at a later date.</p></iframe>";
		x.element = document.getElementById(i);
	} else if (x.type === "divider") {
		menu.innerHTML += '<div class="sideBarSection">' + x.title + "</div>";
	}
}

let shownPage = "page1"
shownPage = localStorage.getItem("theLogProjectCurrent") == undefined ? shownPage : JSON.parse(localStorage.getItem("theLogProjectCurrent"));
let shownPageNum = 1;
let updatePage = (page) => {

	shownPage = page;
	for (let [i, x] of Object.entries(pages)) {
        if (x.type === "page") {
            x.element = document.getElementById(i)
            x.element.style.display = "none";
			let completeBubble = document.getElementById(i + "Completion");
			completeBubble.style.backgroundColor = "#c4c4c4";
			if (x.learned === true) {
				completeBubble.style.backgroundColor = "#75C7BD";
			}
			let lessonTitle = document.getElementById("sidebarLesson" + i);
			if (i === shownPage) {
				lessonTitle.style.fontWeight = "bold";
			} else {
				lessonTitle.style.fontWeight = "normal";
			}
            
		}
	}
	shownPageNum = parseInt(shownPage.match(/\d/g).join(''), 10);

	pages[page].element.style.display = "block";

	let doneButton = document.getElementById("markDoneButton")
	if (pages[shownPage].learned) {
		doneButton.innerHTML = "Mark as Unlearned"
	}else{
		doneButton.innerHTML = "Mark as Learned"
	}

	localStorage.setItem("theLogProjectProgress", JSON.stringify(pages))
	localStorage.setItem("theLogProjectCurrent", JSON.stringify(shownPage))
};

let prevPage = () => {
	if (shownPageNum > 1) {
		shownPageNum -= 1
		shownPage = "page" + shownPageNum
		updatePage(shownPage)
	}
}

let nextPage = () => {
	if (shownPageNum < pageNum) {
		shownPageNum += 1
		shownPage = "page" + shownPageNum
		updatePage(shownPage)
	}
}

let markDone = () => {
	let doneButton = document.getElementById("markDoneButton")
	if (pages[shownPage].learned) {
		doneButton.innerHTML = "Mark as Learned"
		pages[shownPage].learned = false;
	}else{
		doneButton.innerHTML = "Mark as Unlearned"
		pages[shownPage].learned = true;
	}
	// pages[shownPage].learned = pages[shownPage].learned ? false : true;
	console.log(pages[shownPage].learned)
	updatePage(shownPage)
}

updatePage(shownPage); // Do any necessary refreshing
