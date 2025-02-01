var options = {
		series: [
			{
				name: "Completed",
				data: [
					{
						x: "Admin Dashboard",
						y: 30,
						goals: [
							{
								name: "Expected",
								value: 35,
								strokeWidth: 1,
								strokeDashArray: 1,
								strokeColor: "#000000",
							},
						],
					},
					{
						x: "Mobile App Design",
						y: 35,
						goals: [
							{
								name: "Expected",
								value: 40,
								strokeWidth: 1,
								strokeDashArray: 1,
								strokeColor: "#000000",
							},
						],
					},
					{
						x: "UI Development",
						y: 50,
						goals: [
							{
								name: "Expected",
								value: 55,
								strokeWidth: 1,
								strokeDashArray: 1,
								strokeLineCap: "round",
								strokeColor: "#000000",
							},
						],
					},
					{
						x: "Branding",
						y: 65,
						goals: [
							{
								name: "Expected",
								value: 70,
								strokeWidth: 1,
								strokeDashArray: 1,
								strokeLineCap: "round",
								strokeColor: "#000000",
							},
						],
					},
					{
						x: "UI Kit",
						y: 90,
						goals: [
							{
								name: "Expected",
								value: 95,
								strokeWidth: 1,
								strokeDashArray: 1,
								strokeColor: "#000000",
							},
						],
					},
				],
			},
		],
		chart: { height: 236, type: "bar", toolbar: { show: !1 } },
		plotOptions: { bar: { horizontal: !0, distributed: !0 } },
		colors: ["#e13d4b", "#fda901", "#00b477", "#276dd9", "#684af6", "#f58354"],
		dataLabels: {
			formatter: function (e, o) {
				const t = o.w.config.series[o.seriesIndex].data[o.dataPointIndex].goals;
				return t && t.length ? `${e} / ${t[0].value}` : e;
			},
		},
		tooltip: {
			y: {
				formatter: function (e) {
					return e + "%";
				},
			},
		},
		legend: { show: !1 },
	},
	chart = new ApexCharts(document.querySelector("#projects"), options);
chart.render();
