var options1 = {
		series: [{ name: "Views", data: [5, 10, 30, 15, 35, 25, 45] }],
		chart: { type: "line", width: 60, height: 30, sparkline: { enabled: !0 } },
		plotOptions: { bar: { columnWidth: "70%" } },
		xaxis: { crosshairs: { width: 1 } },
		tooltip: { fixed: { enabled: !1 }, x: { show: !1 }, marker: { show: !1 } },
		grid: {
			borderColor: "#e0e6ed",
			strokeDashArray: 5,
			xaxis: { lines: { show: !1 } },
			yaxis: { lines: { show: !0 } },
			padding: { top: 0, right: 0, bottom: 0, left: 0 },
		},
		colors: ["#e13d4b"],
		xaxis: {
			categories: [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
			],
		},
		tooltip: {
			y: {
				formatter: function (e) {
					return e + " Sales";
				},
			},
		},
	},
	chart1 = new ApexCharts(document.querySelector("#sparkline1"), options1);
chart1.render();
var options2 = {
		series: [{ name: "Views", data: [5, 10, 30, 15, 35, 25, 45] }],
		chart: { type: "line", width: 60, height: 30, sparkline: { enabled: !0 } },
		plotOptions: { bar: { columnWidth: "70%" } },
		xaxis: { crosshairs: { width: 1 } },
		tooltip: { fixed: { enabled: !1 }, x: { show: !1 }, marker: { show: !1 } },
		colors: ["#276dd9"],
		xaxis: {
			categories: [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
			],
		},
		tooltip: {
			y: {
				formatter: function (e) {
					return e + " Sales";
				},
			},
		},
	},
	chart2 = new ApexCharts(document.querySelector("#sparkline2"), options2);
chart2.render();
var options3 = {
		series: [{ name: "Views", data: [5, 10, 30, 15, 35, 25, 45] }],
		chart: { type: "line", width: 60, height: 30, sparkline: { enabled: !0 } },
		plotOptions: { bar: { columnWidth: "70%" } },
		xaxis: { crosshairs: { width: 1 } },
		tooltip: { fixed: { enabled: !1 }, x: { show: !1 }, marker: { show: !1 } },
		colors: ["#fda901"],
		xaxis: {
			categories: [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
			],
		},
		tooltip: {
			y: {
				formatter: function (e) {
					return e + " Sales";
				},
			},
		},
	},
	chart3 = new ApexCharts(document.querySelector("#sparkline3"), options3);
chart3.render();
var options4 = {
		series: [45],
		chart: {
			type: "radialBar",
			width: 75,
			height: 75,
			sparkline: { enabled: !0 },
		},
		dataLabels: { enabled: !1 },
		plotOptions: {
			radialBar: {
				hollow: { margin: 0, size: "50%" },
				track: { margin: 0 },
				dataLabels: { show: !1 },
			},
		},
		colors: ["#276dd9", "#d5cdff"],
	},
	chart4 = new ApexCharts(document.querySelector("#sparkline4"), options4);
chart4.render();
var options5 = {
		series: [75],
		chart: {
			type: "radialBar",
			width: 75,
			height: 75,
			sparkline: { enabled: !0 },
		},
		dataLabels: { enabled: !1 },
		plotOptions: {
			radialBar: {
				hollow: { margin: 0, size: "50%" },
				track: { margin: 0 },
				dataLabels: { show: !1 },
			},
		},
		colors: ["#9fc6ff", "#d5cdff"],
	},
	chart5 = new ApexCharts(document.querySelector("#sparkline5"), options5);
chart5.render();
