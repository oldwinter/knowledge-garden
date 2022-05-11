# Chart

A plugin for [Reveal.js](https://github.com/hakimel/reveal.js) allowing to easily add charts using [Chart.js](http://www.chartjs.org/).

[Check out the live demo](https://rajgoel.github.io/reveal.js-demos/chart-demo.html)

## Installation

Copy the file `plugin.js` into the plugin folder of your reveal.js presentation, i.e. `plugin/chart`.

Add the plugin and Chart.js to the dependencies in your presentation, as below.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.2.0/chart.min.js"></script>
<script src="plugin/chart/plugin.js"></script>

<script>
    Reveal.initialize({
        // ...
        plugins: [ RevealChart ],
        // ...
    });
</script>
```

## Configuration

The plugin has several parameters that you can set for your presentation by providing an `chart` option in the reveal.js initialization options. Note that all configuration parameters are optional and the defaults of Chart.js will be used for parameters that are not specified.


```javascript
Reveal.initialize({
	// ...
	chart: {
		defaults: {
			color: 'lightgray', // color of labels
			scale: {
				beginAtZero: true,
				ticks: { stepSize: 1 },
				grid: { color: "lightgray" } , // color of grid lines
			},
		},
		line: { borderColor: [ "rgba(20,220,220,.8)" , "rgba(220,120,120,.8)", "rgba(20,120,220,.8)" ], "borderDash": [ [5,10], [0,0] ] },
		bar: { backgroundColor: [ "rgba(20,220,220,.8)" , "rgba(220,120,120,.8)", "rgba(20,120,220,.8)" ]},
		pie: { backgroundColor: [ ["rgba(0,0,0,.8)" , "rgba(220,20,20,.8)", "rgba(20,220,20,.8)", "rgba(220,220,20,.8)", "rgba(20,20,220,.8)"] ]},
	},
        // ...
});
```
The `defaults` parameter  will overwrite `Chart.defaults`. Furthermore, for any chart type, e.g. line, bar, etc., the parameters for the individual datasets can be specified. Where Chart.js allows to specify a single parameter for a particular dataset, the plugin allows to specify an array of values for this parameter, which will automatically be assigned to the different datasets. Note that if there are more datasets than elements in the array, the plugin will start again with the first value in the array.



## Usage

A chart can be included in a slide by adding a `canvas` element with the `data-chart` attribute set to the desired chart type.

The chart can be configured within the canvas body by a JSON string embedded into an HTML comment.

```html
<canvas data-chart="line" >
<!--
{
 "data": {
  "labels": ["January"," February"," March"," April"," May"," June"," July"],
  "datasets":[
   {
    "data":[65,59,80,81,56,55,40],
    "label":"My first dataset","backgroundColor":"rgba(20,220,220,.8)"
   },
   {
    "data":[28,48,40,19,86,27,90],
    "label":"My second dataset","backgroundColor":"rgba(220,120,120,.8)"
   }
  ]
 }
}
-->
</canvas>
```
It is possible to provide the chart data by comma separated values and use the JSON string within the HTML comment to configure the chart layout.

```html
<canvas class="stretch" data-chart="line">
My first dataset, 65, 59, 80, 81, 56, 55, 40
<!-- This is a comment that will be ignored -->
My second dataset, 28, 48, 40, 19, 86, 27, 90
<!--
{
 "data" : {
  "labels" : ["Enero", "Febrero", "Marzo", "Avril", "Mayo", "Junio", "Julio"],
  "datasets" : [{ "borderColor": "#0f0", "borderDash": ["5","10"] }, { "borderColor": "#0ff" } ]
 }
}
-->
</canvas>
```

The layout configuration provided in `chart` parameter (see Configuration) will be used by default and only those parameters that are specified in a JSON string are used to overwrite the default values. If no JSON string is provided to configure the chart layout the default configuration is used. Note, that if no labels for the data points are provided by a JSON string, the plugin expects that the first row provides table headers.

```html
<canvas data-chart="line">
Month, January, February, March, April, May, June, July
My first dataset, 65, 59, 80, 81, 56, 55, 40
My second dataset, 28, 48, 40, 19, 86, 27, 90
</canvas>
```

The chart data can also be provided in an external CSV file. To include external data, the filename must be specified using the `data-chart-src` attribute of the `canvas` element. The CSV file is expected to only contain data values, whereas options for drawing the chart can be given as described above.

```html
<canvas data-chart="bar" data-chart-src="chart/data.csv">
<!--
{
"data" : {
"datasets" : [{ "backgroundColor": "#0f0" }, { "backgroundColor": "#0ff" } ]
},
"options": { "scales": { "x": { "stacked": true }, "y": { "stacked": true } } }
}
-->
</canvas>
```


## License

MIT licensed

Copyright (C) 2021 Asvin Goel
