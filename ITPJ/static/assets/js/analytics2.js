var options = {
		chart: { height: 182, type: "bar", toolbar: { show: !1 } },
		dataLabels: { enabled: !1 },
		stroke: { colors: "#ffffff", width: 3 },
		plotOptions: {
			bar: {
				columnWidth: "40%",
				borderRadius: 6,
				dataLabels: { position: "top" },
			},
		},
		series: [
			{ name: "Visitors", data: [100, 300, 500, 900, 700, 400, 200] },
			{ name: "Sessions", data: [90, 200, 700, 600, 500, 250, 180] },
			{ name: "Clicks", data: [80, 150, 400, 300, 600, 150, 90] },
		],
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
			axisBorder: { show: !1 },
			axisTicks: { show: !1 },
			labels: { show: !0 },
		},
		yaxis: { show: !1 },
		grid: {
			borderColor: "#fcb6db",
			strokeDashArray: 5,
			xaxis: { lines: { show: !0 } },
			yaxis: { lines: { show: !1 } },
		},
		colors: ["#1553a3", "#e13d4b", "#158c7f"],
		tooltip: { x: { format: "dd/MM/yy" } },
	},
	chart = new ApexCharts(document.querySelector("#analytics"), options);
chart.render();
