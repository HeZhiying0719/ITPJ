var options = {
		series: [
			{ name: "Target", type: "area", data: [640, 505] },
			{ name: "Income", type: "line", data: [540, 430] },
		],
		chart: {
			height: 306,
			type: "line",
			zoom: { enabled: !1 },
			toolbar: { show: !1 },
		},
		colors: ["#eaf2ff", "#276dd9"],
		stroke: { width: [0, 4], curve: "smooth" },
		tooltip: {
			y: {
				formatter: function (e) {
					return +e + "k";
				},
			},
		},
		grid: {
			borderColor: "#b7c6d8",
			strokeDashArray: 5,
			xaxis: { lines: { show: !0 } },
			yaxis: { lines: { show: !1 } },
			padding: { top: 0, right: 20, bottom: 0, left: 20 },
		},
		dataLabels: { enabled: !0, enabledOnSeries: [1] },
		labels: ["Q3", "Q4"],
		xaxis: { type: "day" },
	},
	chart = new ApexCharts(document.querySelector("#reports"), options);
chart.render();
