var options = {
		chart: { height: 242, type: "line", stacked: !1, toolbar: { show: !1 } },
		dataLabels: { enabled: !1 },
		plotOptions: {
			bar: { horizontal: !1, borderRadius: 3, columnWidth: "60%" },
		},
		series: [
			{
				name: "Visitors",
				type: "column",
				data: [50, 60, 70, 80, 90, 100, 100, 90, 80, 70, 60, 50],
			},
			{
				name: "Clicks",
				type: "column",
				data: [40, 50, 60, 70, 80, 90, 90, 80, 70, 60, 50, 40],
			},
		],
		stroke: { width: [0, 0] },
		grid: {
			xaxis: { lines: { show: !1 } },
			yaxis: { lines: { show: !1 } },
			padding: { top: -50, right: 0, bottom: 0, left: 10 },
		},
		colors: ["#276dd9", "#c6dcfe"],
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
		legend: { show: !1 },
		yaxis: { show: !1 },
	},
	chart = new ApexCharts(document.querySelector("#analytics"), options);
chart.render();
