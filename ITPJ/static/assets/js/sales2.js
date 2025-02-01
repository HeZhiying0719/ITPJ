var options = {
		series: [
			{ name: "Income", type: "column", data: [25, 12, 20, 85, 12, 25, 19] },
			{ name: "Expenses", type: "area", data: [44, 55, 50, 40, 30, 10, 12] },
		],
		chart: { height: 217, type: "line", toolbar: { show: !1 } },
		stroke: { width: [0, 2], curve: "smooth" },
		plotOptions: {
			bar: {
				columnWidth: "70%",
				borderRadius: 8,
				distributed: !0,
				dataLabels: { position: "top" },
			},
		},
		fill: {
			opacity: [0.85, 0.25, 1],
			gradient: {
				inverseColors: !1,
				shade: "light",
				type: "vertical",
				opacityFrom: 0.85,
				opacityTo: 0.55,
				stops: [0, 100, 100, 100],
			},
		},
		markers: { size: 0 },
		xaxis: {
			categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			axisBorder: { show: !1 },
			tooltip: { enabled: !0 },
			labels: { show: !0, rotate: -45, rotateAlways: !0 },
		},
		yaxis: { show: !1 },
		legend: { show: !1 },
		grid: {
			borderColor: "#b7c6d8",
			strokeDashArray: 5,
			xaxis: { lines: { show: !0 } },
			yaxis: { lines: { show: !1 } },
			padding: { top: 0, right: 0, bottom: 10, left: 10 },
		},
		tooltip: {
			y: {
				formatter: function (o) {
					return o + " million";
				},
			},
		},
		colors: ["#f58354", "#f58354", "#684af6", "#276dd9", "#e13d4b", "#fda901"],
	},
	chart = new ApexCharts(document.querySelector("#sales"), options);
chart.render();
