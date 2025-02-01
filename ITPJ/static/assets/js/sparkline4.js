var options1 = {
		chart: {
			type: "line",
			height: 80,
			sparkline: { enabled: !0 },
			toolbar: { show: !1 },
			zoom: { enabled: !1 },
		},
		dataLabels: { enabled: !1 },
		series: [{ name: "Visitors", data: [10, 40, 20, 50, 30, 60] }],
		stroke: { width: [7] },
		xaxis: {
			categories: [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
			],
		},
		legend: { position: "bottom", offsetY: 0 },
		yaxis: { show: !1 },
		colors: ["#684af6", "#44c1f0", "#ff7e8"],
		grid: { padding: { top: 0, right: 0, bottom: -15, left: -10 } },
		tooltip: {
			y: {
				formatter: function (e) {
					return e + "K";
				},
			},
		},
	},
	chart1 = new ApexCharts(document.querySelector("#sparkline1"), options1);
chart1.render();
var options2 = {
		series: [{ name: "Clicks", data: [1, 2, 3, 4, 1, 2, 3] }],
		chart: { type: "bar", height: 80, sparkline: { enabled: !0 } },
		plotOptions: { bar: { columnWidth: "70%", distributed: !0 } },
		colors: ["#1553a3", "#245fae", "#4477bc", "#c6d9f2"],
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
	chart2 = new ApexCharts(document.querySelector("#sparkline2"), options2);
chart2.render();
var options3 = {
		series: [85],
		chart: {
			type: "radialBar",
			width: 79,
			height: 79,
			sparkline: { enabled: !0 },
		},
		dataLabels: { enabled: !1 },
		plotOptions: {
			radialBar: {
				hollow: { margin: 0, size: "50%" },
				track: { margin: 0, background: "#e6ecf3" },
				dataLabels: { show: !1 },
			},
		},
		colors: ["#ff723b", "#d5cdff"],
	},
	chart3 = new ApexCharts(document.querySelector("#sparkline3"), options3);
chart3.render();
var options4 = {
		chart: {
			type: "area",
			height: 80,
			sparkline: { enabled: !0 },
			toolbar: { show: !1 },
			zoom: { enabled: !1 },
		},
		dataLabels: { enabled: !1 },
		series: [{ name: "Bounce Rate", data: [10, 40, 20, 50, 30, 60] }],
		stroke: { width: [7] },
		xaxis: {
			categories: [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
			],
		},
		legend: { position: "bottom", offsetY: 0 },
		yaxis: { show: !1 },
		colors: ["#0eaeee", "#44c1f0", "#ff7e8"],
		grid: { padding: { top: 0, right: 0, bottom: -15, left: -10 } },
		tooltip: {
			y: {
				formatter: function (e) {
					return e + "%";
				},
			},
		},
	},
	chart4 = new ApexCharts(document.querySelector("#sparkline4"), options4);
chart4.render();
var options5 = {
		series: [{ name: "Clicks", data: [1, 2, 3, 4, 1, 2, 3] }],
		chart: { type: "bar", height: 80, sparkline: { enabled: !0 } },
		plotOptions: { bar: { columnWidth: "70%", distributed: !0 } },
		colors: ["#158c7f", "#2c998d", "#4baa9f", "#e13d4b"],
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
var options6 = {
		chart: {
			type: "line",
			height: 56,
			sparkline: { enabled: !0 },
			toolbar: { show: !1 },
			zoom: { enabled: !1 },
		},
		dataLabels: { enabled: !1 },
		series: [{ name: "Visitors", data: [10, 20, 30, 20, 30, 40] }],
		stroke: { width: [7] },
		xaxis: {
			categories: [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
			],
		},
		legend: { position: "bottom", offsetY: 0 },
		yaxis: { show: !1 },
		colors: ["#158c7f", "#44c1f0", "#ff7e8"],
		grid: { padding: { top: 0, right: 0, bottom: -15, left: -10 } },
		tooltip: {
			y: {
				formatter: function (e) {
					return e + "K";
				},
			},
		},
	},
	chart6 = new ApexCharts(document.querySelector("#sparkline6"), options6);
chart6.render();
var options7 = {
		series: [{ data: [30, 70, 40, 65, 25, 40] }],
		chart: { type: "line", height: 35, sparkline: { enabled: !0 } },
		stroke: { curve: "smooth", width: 3 },
		colors: ["#e13d4b"],
		tooltip: {
			fixed: { enabled: !1 },
			x: { show: !1 },
			y: {
				title: {
					formatter: function (e) {
						return "";
					},
				},
			},
			marker: { show: !1 },
		},
	},
	chart7 = new ApexCharts(document.querySelector("#sparkline7"), options7);
chart7.render();
var options8 = {
		series: [{ data: [30, 70, 40, 65, 25, 40] }],
		chart: { type: "line", height: 35, sparkline: { enabled: !0 } },
		stroke: { curve: "smooth", width: 3 },
		colors: ["#7920d1"],
		tooltip: {
			fixed: { enabled: !1 },
			x: { show: !1 },
			y: {
				title: {
					formatter: function (e) {
						return "";
					},
				},
			},
			marker: { show: !1 },
		},
	},
	chart8 = new ApexCharts(document.querySelector("#sparkline8"), options8);
chart8.render();
var options9 = {
		series: [70],
		chart: {
			type: "radialBar",
			width: 60,
			height: 60,
			sparkline: { enabled: !0 },
		},
		dataLabels: { enabled: !1 },
		plotOptions: {
			radialBar: {
				hollow: { margin: 0, size: "50%" },
				track: { margin: 0, background: "#e6ecf3" },
				dataLabels: { show: !1 },
			},
		},
		colors: ["#fda901", "#d5cdff"],
	},
	chart9 = new ApexCharts(document.querySelector("#sparkline9"), options9);
chart9.render();
var options10 = {
		series: [75],
		chart: {
			type: "radialBar",
			width: 60,
			height: 60,
			sparkline: { enabled: !0 },
		},
		dataLabels: { enabled: !1 },
		plotOptions: {
			radialBar: {
				hollow: { margin: 0, size: "50%" },
				track: { margin: 0, background: "#e6ecf3" },
				dataLabels: { show: !1 },
			},
		},
		colors: ["#7920d1"],
	},
	chart10 = new ApexCharts(document.querySelector("#sparkline10"), options10);
chart10.render();
var options11 = {
		series: [80],
		chart: {
			type: "radialBar",
			width: 60,
			height: 60,
			sparkline: { enabled: !0 },
		},
		dataLabels: { enabled: !1 },
		plotOptions: {
			radialBar: {
				hollow: { margin: 0, size: "50%" },
				track: { margin: 0, background: "#e6ecf3" },
				dataLabels: { show: !1 },
			},
		},
		colors: ["#e13d4b"],
	},
	chart11 = new ApexCharts(document.querySelector("#sparkline11"), options11);
chart11.render();
var options12 = {
		series: [85],
		chart: {
			type: "radialBar",
			width: 60,
			height: 60,
			sparkline: { enabled: !0 },
		},
		dataLabels: { enabled: !1 },
		plotOptions: {
			radialBar: {
				hollow: { margin: 0, size: "50%" },
				track: { margin: 0, background: "#e6ecf3" },
				dataLabels: { show: !1 },
			},
		},
		colors: ["#ff723b"],
	},
	chart12 = new ApexCharts(document.querySelector("#sparkline12"), options12);
chart12.render();
