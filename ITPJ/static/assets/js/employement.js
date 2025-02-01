var options = {
		series: [
			{ name: "Sales", data: [2, 3, 3, 5, 7, 9, 4, 6, 8, 3, 4, 2] },
			{
				name: "Income",
				data: [-4, -2, -5, -3, -6, -4, -5, -8, -3, -2, -3, -2],
			},
		],
		chart: { type: "bar", height: 171, stacked: !0, toolbar: { show: !1 } },
		colors: ["#e13d4b", "#1553a3"],
		plotOptions: {
			bar: { horizontal: !1, columnWidth: "50%", borderRadius: 2 },
		},
		dataLabels: { enabled: !1 },
		stroke: { width: 2, colors: ["#e6ecf3"] },
		grid: { show: !1, padding: { top: -20, right: 0, bottom: 0, left: 0 } },
		yaxis: { show: !1 },
		legend: { show: !1 },
		tooltip: {
			shared: !1,
			x: {
				formatter: function (t) {
					return t;
				},
			},
			y: {
				formatter: function (t) {
					return Math.abs(t) + "%";
				},
			},
		},
		xaxis: { show: !1 },
	},
	chart = new ApexCharts(document.querySelector("#employement"), options);
chart.render();
