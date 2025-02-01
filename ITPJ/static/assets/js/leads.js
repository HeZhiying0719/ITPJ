var options = {
		series: [20, 25, 30],
		chart: { height: 297, type: "polarArea" },
		labels: ["New", "InProgress", "Completed"],
		fill: { opacity: 1 },
		stroke: { width: 1, colors: void 0 },
		colors: ["#e13d4b", "#fda901", "#276dd9"],
		yaxis: { show: !1 },
		legend: { position: "bottom" },
		tooltip: {
			y: {
				formatter: function (o) {
					return "$" + o;
				},
			},
		},
		plotOptions: {
			polarArea: { rings: { strokeWidth: 0 }, spokes: { strokeWidth: 0 } },
		},
	},
	chart = new ApexCharts(document.querySelector("#leads"), options);
chart.render();
