var options1 = {
		series: [45],
		chart: {
			type: "radialBar",
			width: 75,
			height: 75,
			sparkline: { enabled: !0 },
		},
		dataLabels: { enabled: !1 },
		plotOptions: {
			radialBar: {
				hollow: { margin: 0, size: "50%" },
				track: { margin: 0, background: "#e6ecf3" },
				dataLabels: { show: !1 },
			},
		},
		colors: ["#276dd9", "#d5cdff"],
	},
	chart1 = new ApexCharts(document.querySelector("#transactions1"), options1);
chart1.render();
var options2 = {
		series: [75],
		chart: {
			type: "radialBar",
			width: 75,
			height: 75,
			sparkline: { enabled: !0 },
		},
		dataLabels: { enabled: !1 },
		plotOptions: {
			radialBar: {
				hollow: { margin: 0, size: "50%" },
				track: { margin: 0, background: "#e6ecf3" },
				dataLabels: { show: !1 },
			},
		},
		colors: ["#e13d4b", "#d5cdff"],
	},
	chart2 = new ApexCharts(document.querySelector("#transactions2"), options2);
chart2.render();
