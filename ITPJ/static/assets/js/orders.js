var options = {
		chart: { height: 312, type: "radialBar", toolbar: { show: !1 } },
		plotOptions: {
			radialBar: {
				dataLabels: {
					name: { fontSize: "12px", fontColor: "black" },
					value: { fontSize: "21px" },
					total: {
						show: !0,
						label: "Total",
						formatter: function (e) {
							return "250";
						},
					},
				},
				track: { background: "#e6ecf3" },
			},
		},
		series: [80, 70, 10],
		labels: ["New", "Delivered", "Pending"],
		colors: ["#00b477", "#fda901", "#e13d4b", "#276dd9", "#684af6", "#f58354"],
	},
	chart = new ApexCharts(document.querySelector("#orders"), options);
chart.render();
