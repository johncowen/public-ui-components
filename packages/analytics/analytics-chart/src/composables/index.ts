import useI18n from './useI18n'
import useBarChartOptions from './useBarChartOptions'
import useChartJSCommon from './useChartJSCommon'
import useChartLegendValues from './useChartLegendValues'
import useDoughnutChartOptions from './useDoughnutChartOptions'
import useLinechartOptions from './useLineChartOptions'
import useExploreResultToDatasets from './useExploreResultToDatasets'
import useExploreResultToTimeDataset from './useExploreResultToTimeDatasets'
import useReportChartDataForSynthetics from './useReportChartDataForSynthetics'

// All composables must be exported as part of the default object for Cypress test stubs
export default {
  useBarChartOptions,
  useChartJSCommon,
  useChartLegendValues,
  useExploreResultToDatasets,
  useExploreResultToTimeDataset,
  useDoughnutChartOptions,
  useLinechartOptions,
  useI18n,
  useReportChartDataForSynthetics,
}
