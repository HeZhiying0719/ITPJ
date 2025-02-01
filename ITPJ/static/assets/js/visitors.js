var options = {
		chart: { height: 272, type: "bar", toolbar: { show: !1 } },
		dataLabels: { enabled: !1 },
		stroke: { colors: "#ffffff", width: 3 },
		plotOptions: {
			bar: {
				columnWidth: "70%",
				borderRadius: 8,
				dataLabels: { position: "top" },
			},
		},
		series: [
			{ name: "Male", data: [100, 300, 500, 900, 700, 400, 200] },
			{ name: "Female", data: [100, 200, 700, 600, 500, 250, 180] },
		],
		xaxis: {
			axisBorder: { show: !1 },
			axisTicks: { show: !1 },
			labels: { show: !1 },
		},
		yaxis: { show: !1 },
		grid: {
			borderColor: "#fcb6db",
			strokeDashArray: 5,
			xaxis: { lines: { show: !0 } },
			yaxis: { lines: { show: !1 } },
		},
		colors: ["#276dd9", "#F766B3"],
		tooltip: { x: { format: "dd/MM/yy" } },
	},
	chart = new ApexCharts(document.querySelector("#visitors"), options);
chart.render();
