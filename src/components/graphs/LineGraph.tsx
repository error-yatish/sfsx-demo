import * as React from 'react'
import * as Chart from "chart.js";

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.legend.display = false;
Chart.defaults.global.elements.line.tension = 0.4;

interface dataSets {
    label: string;
    data: Array<number>;
}

interface LineChartProps {
    labels: Array<number>;
    datasets?: Array<dataSets>;
    handleClickOnBar?: (label: number, value: number) => void;
}

export default class LineGraph extends React.Component<LineChartProps> {
    chartRef = React.createRef<HTMLCanvasElement>();

    componentDidMount() {
        this.drawChart()
    }

    componentDidUpdate(prevProps: any) {
        console.log(prevProps ,this.props)
        if (prevProps !== this.props) {
            this.drawChart()
        }
    }

    drawChart = () => {
        const myChartRef = this.chartRef.current.getContext("2d");
        const { labels, datasets } = this.props
        const { height: graphHeight } = myChartRef.canvas;

        let gradientLine = myChartRef.createLinearGradient(0, 0, 0, graphHeight);
        gradientLine.addColorStop(0, "rgb(255, 0, 110, 0.2)");
        gradientLine.addColorStop(0.5, "rgb(255, 0, 110, 0.35)");
        gradientLine.addColorStop(1, "rgb(255, 0, 110, 0.7)");

        let barChart: any = new Chart(myChartRef, {
            type: "bar",
            data: {
                labels: labels.length === datasets[0].data.length ? labels : new Array(datasets[0].data.length).fill("label"),
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        ticks: { display: true },
                        gridLines: {
                            display: false,
                            drawBorder: false
                        }
                    }],
                    yAxes: [{
                        ticks: { display: true },
                        gridLines: {
                            display: false,
                            drawBorder: false
                        }
                    }]
                },
                onClick: (evt, item) => {
                    let activePoints = barChart.getElementsAtEvent(evt);
                    if (activePoints.length) {
                        let label = barChart.data.labels[activePoints[0]._index];
                        let value = barChart.data.datasets[activePoints[0]._datasetIndex].data[activePoints[0]._index];
                        this.props.handleClickOnBar(label, value)
                    }
                }
            }
        });

    }

    render() {
        return (
            <div className={"container"}>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}