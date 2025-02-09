<template>
  <div class="tile-boundary">
    <h2 v-if="title">
      {{ title }}
    </h2>
    <component
      :is="componentData.component"
      v-if="componentData"
      v-bind="componentData.rendererProps"
    />
  </div>
</template>
<script setup lang="ts">
import type { TileDefinition } from '../types'
import { ChartTypes } from '../types'
import type {
  Component,
} from 'vue'
import { computed } from 'vue'
import '@kong-ui-public/analytics-chart/dist/style.css'
import SimpleChartRenderer from './SimpleChartRenderer.vue'
import AnalyticsChartRenderer from './AnalyticsChartRenderer.vue'

const props = defineProps<{
  definition: TileDefinition
}>()

// TODO: Should the chart be in charge of rendering its own title?
// Analytics charts have a title, but gauge charts do not.
const title = computed(() => props.definition.title)

const rendererLookup: Record<ChartTypes, Component> = {
  [ChartTypes.HorizontalBar]: AnalyticsChartRenderer,
  [ChartTypes.VerticalBar]: AnalyticsChartRenderer,
  [ChartTypes.Gauge]: SimpleChartRenderer,
}

const componentData = computed(() => {
  // Ideally, Typescript would ensure that the prop types of the renderers match
  // the props that they're going to receive.  Unfortunately, actually doing this seems difficult.
  const component = rendererLookup[props.definition.chart.type]
  return {
    component,
    rendererProps: {
      query: props.definition.query,
      queryReady: true, // TODO: Pipelining
      chartOptions: props.definition.chart,
    },
  }
})
</script>
<style scoped lang="scss">
  .tile-boundary {
    border: 1px solid black;
    flex: 1 0 0;

    & + & {
      margin-left: 16px;
    }
  }
</style>
