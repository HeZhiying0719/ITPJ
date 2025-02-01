var options1 = {
		chart: {
			type: "bar",
			height: 130,
			width: "90%",
			sparkline: { enabled: !0 },
			toolbar: { show: !1 },
			zoom: { enabled: !1 },
		},
		plotOptions: {
			bar: {
				columnWidth: "70%",
				borderRadius: 5,
				distributed: !0,
				dataLabels: { position: "top" },
			},
		},
		dataLabels: { enabled: !0 },
		series: [
			{
				name: "Projects",
				data: [30, 40, 50, 65, 75, 95, 95, 75, 65, 50, 40, 30],
			},
		],
		xaxis: {
			categories: [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December",
			],
		},
		legend: { position: "bottom", offsetY: 0 },
		fill: {
			opacity: [0.85, 0.25, 1],
			gradient: {
				inverseColors: !1,
				shade: "light",
				type: "vertical",
				opacityFrom: 0.95,
				opacityTo: 0.25,
				stops: [0, 100, 100, 100],
			},
		},
		yaxis: { show: !1 },
		colors: ["#ff7e87", "#684af6", "#44c1f0"],
	},
	chart1 = new ApexCharts(document.querySelector("#sparkline1"), options1);
chart1.render();
var options2 = {
		chart: {
			type: "area",
			height: 130,
			width: "90%",
			sparkline: { enabled: !0 },
			toolbar: { show: !1 },
			zoom: { enabled: !1 },
		},
		dataLabels: { enabled: !1 },
		series: [
			{
				name: "Income",
				data: [30, 40, 30, 20, 45, 35, 65, 75, 55, 30, 70, 90],
			},
		],
		stroke: { width: [3], curve: "smooth" },
		xaxis: {
			categories: [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December",
			],
		},
		legend: { position: "bottom", offsetY: 0 },
		fill: {
			opacity: [0.85, 0.25, 1],
			gradient: {
				inverseColors: !1,
				shade: "light",
				type: "vertical",
				opacityFrom: 0.95,
				opacityTo: 0.25,
				stops: [0, 100, 100, 100],
			},
		},
		yaxis: { show: !1 },
		colors: ["#684af6", "#44c1f0", "#ff7e8"],
		grid: { padding: { top: -5, right: 10, bottom: 0, left: 10 } },
		tooltip: {
			y: {
				formatter: function (e) {
					return e + "K";
				},
			},
		},
	},
	chart2 = new ApexCharts(document.querySelector("#sparkline2"), options2);
chart2.render();
var options3 = {
		series: [{ name: "Sales", data: [1, 3, 2, 3, 2] }],
		chart: {
			type: "line",
			height: 109,
			width: "50%",
			sparkline: { enabled: !0 },
		},
		colors: ["#fda901"],
		stroke: { curve: "smooth", width: 3 },
		tooltip: { fixed: { enabled: !1 }, x: { show: !1 }, marker: { show: !1 } },
		xaxis: {
			type: "day",
			categories: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
		},
		tooltip: {
			y: {
				formatter: function (e) {
					return e + "K";
				},
			},
		},
	},
	chart3 = new ApexCharts(document.querySelector("#sparkline3"), options3);
chart3.render();
var options4 = {
		series: [{ name: "Expenses", data: [1, 2, 3, 3, 2] }],
		chart: {
			type: "area",
			height: 109,
			width: "50%",
			sparkline: { enabled: !0 },
		},
		colors: ["#158c7f"],
		stroke: { curve: "smooth", width: 3 },
		tooltip: { fixed: { enabled: !1 }, x: { show: !1 }, marker: { show: !1 } },
		xaxis: {
			type: "day",
			categories: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
		},
		tooltip: {
			y: {
				formatter: function (e) {
					return e + "K";
				},
			},
		},
	},
	chart4 = new ApexCharts(document.querySelector("#sparkline4"), options4);
chart4.render();
var options5 = {
		series: [{ name: "Income", data: [1, 2, 3, 4, 1, 2, 3] }],
		chart: {
			type: "bar",
			height: 109,
			width: "65%",
			sparkline: { enabled: !0 },
		},
		plotOptions: { bar: { columnWidth: "70%", distributed: !0 } },
		colors: ["#ffeff0", "#ff9fa6", "#ffdfe1", "#e13d4b"],
		stroke: { curve: "smooth", width: 1 },
		tooltip: { fixed: { enabled: !1 }, x: { show: !1 }, marker: { show: !1 } },
		xaxis: {
			type: "day",
			categories: [
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
				"Sunday",
			],
		},
		tooltip: {
			y: {
				formatter: function (e) {
					return e + "K";
				},
			},
		},
	},
	chart5 = new ApexCharts(document.querySelector("#sparkline5"), options5);
chart5.render();
