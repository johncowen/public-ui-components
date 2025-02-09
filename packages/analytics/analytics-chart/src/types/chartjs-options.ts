import type { Ref } from 'vue'
import type { Chart, ChartType, TooltipModel } from 'chart.js'
import type { ChartTypes } from '../enums'
import type { GranularityKeys } from '@kong-ui-public/analytics-utilities'
export interface TooltipState {
  showTooltip: boolean,
  tooltipContext: string | number,
  tooltipSeries: Array<any>,
  left: string,
  top: string,
  units: string,
  offset: number,
  width: number,
  height: number
  chartType: ChartTypes,
  locked?: boolean,
}

interface BaseChartOptions {
  tooltipState: TooltipState,
  legendID: string,
  stacked: Ref<boolean>, // stacked true or false
  metricAxesTitle?: Ref<string>, // metric axes title to display
  dimensionAxesTitle?: Ref<string> // dimension axes title to display
}

export interface BarChartOptions extends BaseChartOptions {
  indexAxis: 'x' | 'y', // index axes x or y
}

export interface LineChartOptions extends BaseChartOptions {
  timeRangeSec: Ref<number | undefined>, // time range in seconds
  timeRangeMs: Ref<number | undefined>, // time range in seconds
  granularity: Ref<`${GranularityKeys}`>,
}

export interface DoughnutChartOptions {
  tooltipState: TooltipState,
  legendID: string,
}

export interface AxesTooltipState {
  show: boolean,
  left: string,
  top: string,
  text: string,
  offset: number
}

export interface ExternalTooltipContext {
  chart: Chart,
  tooltip: TooltipModel<ChartType>,
}
