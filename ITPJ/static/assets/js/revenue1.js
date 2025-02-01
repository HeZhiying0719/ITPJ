// Option 1
var options1 = {
	chart: { height: 110, width: 180, type: "area", toolbar: { show: !1 } },
	dataLabels: { enabled: !1 },
	stroke: { curve: "straight", width: 2 },
	series: [{ name: "Off Shore", data: [10, 40, 15, 40, 35, 96, 69] }],
	grid: {
		borderColor: "#e0e6ed",
		strokeDashArray: 5,
		xaxis: { lines: { show: !0 } },
		yaxis: { lines: { show: !1 } },
		padding: { top: -20, right: 0, bottom: 0, left: 0 },
	},
	xaxis: { labels: { show: !1 } },
	yaxis: { labels: { show: !1 } },
	colors: ["#e13d4b"],
	markers: {
		size: 0,
		opacity: 0.3,
		colors: ["#e13d4b"],
		strokeColor: "#ffffff",
		strokeWidth: 2,
		hover: { size: 7 },
	},
	tooltip: {
		y: {
			formatter: function (e) {
				return +e + "k";
			},
		},
	},
};
(chart = new ApexCharts(document.querySelector("#revenue"), options1)).render();

// Option 2
var options2 = {
	chart: { height: 110, width: 180, type: "area", toolbar: { show: !1 } },
	dataLabels: { enabled: !1 },
	stroke: { curve: "straight", width: 2 },
	series: [{ name: "Off Shore", data: [10, 40, 15, 40, 35, 96, 69] }],
	grid: {
		borderColor: "#e0e6ed",
		strokeDashArray: 5,
		xaxis: { lines: { show: !0 } },
		yaxis: { lines: { show: !1 } },
		padding: { top: -20, right: 0, bottom: 0, left: 0 },
	},
	xaxis: { labels: { show: !1 } },
	yaxis: { labels: { show: !1 } },
	colors: ["#00acb4"],
	markers: {
		size: 0,
		opacity: 0.3,
		colors: ["#00acb4"],
		strokeColor: "#ffffff",
		strokeWidth: 2,
		hover: { size: 7 },
	},
	tooltip: {
		y: {
			formatter: function (e) {
				return +e + "k";
			},
		},
	},
};
(chart = new ApexCharts(
	document.querySelector("#revenue2"),
	options2
)).render();

// Option 3
var options3 = {
	chart: { height: 110, width: 180, type: "area", toolbar: { show: !1 } },
	dataLabels: { enabled: !1 },
	stroke: { curve: "straight", width: 2 },
	series: [{ name: "Off Shore", data: [10, 40, 15, 40, 35, 96, 69] }],
	grid: {
		borderColor: "#e0e6ed",
		strokeDashArray: 5,
		xaxis: { lines: { show: !0 } },
		yaxis: { lines: { show: !1 } },
		padding: { top: -20, right: 0, bottom: 0, left: 0 },
	},
	xaxis: { labels: { show: !1 } },
	yaxis: { labels: { show: !1 } },
	colors: ["#276dd9"],
	markers: {
		size: 0,
		opacity: 0.3,
		colors: ["#276dd9"],
		strokeColor: "#ffffff",
		strokeWidth: 2,
		hover: { size: 7 },
	},
	tooltip: {
		y: {
			formatter: function (e) {
				return +e + "k";
			},
		},
	},
};
(chart = new ApexCharts(
	document.querySelector("#revenue3"),
	options3
)).render();

// Option 4
var chart,
	options4 = {
		chart: { height: 66, type: "area", toolbar: { show: !1 } },
		dataLabels: { enabled: !1 },
		stroke: { curve: "smooth", width: 3 },
		series: [{ name: "Revenue", data: [10, 40, 15, 40, 35, 96, 69] }],
		grid: {
			borderColor: "#e0e6ed",
			strokeDashArray: 5,
			xaxis: { lines: { show: !0 } },
			yaxis: { lines: { show: !1 } },
			padding: { top: -20, right: -20, bottom: -20, left: -20 },
		},
		xaxis: { labels: { show: !1 } },
		yaxis: { labels: { show: !1 } },
		colors: ["#276dd9"],
		markers: {
			size: 0,
			opacity: 0.3,
			colors: ["#276dd9"],
			strokeColor: "#ffffff",
			strokeWidth: 5,
			hover: { size: 7 },
		},
		tooltip: {
			y: {
				formatter: function (e) {
					return +e + "k";
				},
			},
		},
	};
(chart = new ApexCharts(
	document.querySelector("#bestSeller"),
	options4
)).render();
