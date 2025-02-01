var options = {
		chart: { height: 275, type: "bar", toolbar: { show: !1 } },
		plotOptions: {
			bar: {
				columnWidth: "60%",
				borderRadius: 8,
				distributed: !0,
				dataLabels: { position: "top" },
			},
		},
		series: [{ name: "Designation", data: [52, 73, 34, 66, 82, 49] }],
		legend: { show: !1 },
		xaxis: {
			categories: [
				"Sales",
				"Operations",
				"Research",
				"Marketing",
				"Admin",
				"Management",
			],
			axisBorder: { show: !1 },
			yaxis: { show: !1 },
			tooltip: { enabled: !0 },
			labels: { show: !0, rotate: -45, rotateAlways: !0 },
		},
		grid: {
			borderColor: "#b7c6d8",
			strokeDashArray: 5,
			xaxis: { lines: { show: !0 } },
			yaxis: { lines: { show: !1 } },
			padding: { top: 0, right: 10, left: 20, bottom: -20 },
		},
		tooltip: {
			y: {
				formatter: function (e) {
					return e;
				},
			},
		},
		colors: [
			"#276dd9",
			"#337ce9",
			"#448af4",
			"#69a5ff",
			"#7db0fc",
			"#9fc6ff",
			"#b8d5ff",
			"#eaf2ff",
		],
	},
	chart = new ApexCharts(document.querySelector("#designation"), options);
chart.render();
