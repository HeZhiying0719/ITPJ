var options = {
		chart: { height: 301, type: "area", toolbar: { show: !1 } },
		dataLabels: { enabled: !1 },
		stroke: { curve: "smooth", width: 3 },
		series: [
			{ name: "Sales", data: [10, 40, 17, 40, 20, 35, 20, 10, 46, 18, 30, 29] },
			{ name: "Revenue", data: [6, 8, 25, 20, 55, 20, 32, 10, 27, 20, 20, 45] },
		],
		grid: {
			borderColor: "#dfd6ff",
			strokeDashArray: 5,
			xaxis: { lines: { show: !0 } },
			yaxis: { lines: { show: !1 } },
		},
		xaxis: {
			categories: [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec",
			],
		},
		yaxis: { labels: { show: !1 } },
		tooltip: {
			y: {
				formatter: function (e) {
					return e + "k";
				},
			},
		},
		colors: ["#276dd9", "#b8d5ff"],
	},
	chart = new ApexCharts(document.querySelector("#salesGraph"), options);
chart.render();
