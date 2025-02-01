var options = {
		chart: { height: 276, type: "bar", toolbar: { show: !1 } },
		plotOptions: {
			bar: {
				columnWidth: "60%",
				borderRadius: 8,
				distributed: !0,
				dataLabels: { position: "top" },
			},
		},
		series: [{ name: "Income", data: [20, 30, 40, 50, 60, 70] }],
		legend: { show: !1 },
		xaxis: {
			categories: ["Indonesia", "Germany", "Turkey", "Brazil", "India", "Usa"],
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
		},
		tooltip: {
			y: {
				formatter: function (o) {
					return o + " million";
				},
			},
		},
		colors: ["#e13d4b", "#fda901", "#00b477", "#276dd9", "#684af6", "#f58354"],
	},
	chart = new ApexCharts(document.querySelector("#income"), options);
chart.render();
