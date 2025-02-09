<template>
  <SandboxLayout
    :links="appLinks"
    title="Dashboard Renderer"
  >
    <div class="sandbox-container">
      <main>
        <h2>Static Dashboard</h2>
        <DashboardRenderer
          :context="context"
          :definition="staticDefinition"
        />
        <h2>Dynamic Dashboard</h2>
        <DashboardRenderer
          v-if="definition.type === ValidationResultType.Success"
          :context="context"
          :definition="definition.data"
        />
        <h2>Definition</h2>
        <textarea v-model="definitionText" />
        <pre>{{ JSON.stringify(definition) }}</pre>
      </main>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import type { DashboardDefinition, DashboardRendererContext } from '../../src'
import { ChartTypes, dashboardDefinitionSchema, DashboardRenderer } from '../../src'
import { computed, ref, inject } from 'vue'
import Ajv from 'ajv'
import { ChartMetricDisplay } from '@kong-ui-public/analytics-chart'
import type { SandboxNavigationItem } from '@kong-ui-public/sandbox-layout'
import { SandboxLayout } from '@kong-ui-public/sandbox-layout'
import '@kong-ui-public/sandbox-layout/dist/style.css'

const appLinks: SandboxNavigationItem[] = inject('app-links', [])

// Consider moving to its own package.
enum ValidationResultType {
  JsonParseError,
  ValidationError,
  Success,
}

interface JsonParseError {
  type: ValidationResultType.JsonParseError
  message: string
}

interface ValidationError {
  type: ValidationResultType.ValidationError,
  errors: any
}

interface Success {
  type: ValidationResultType.Success,
  data: DashboardDefinition
}

type ValidationResult = JsonParseError | ValidationError | Success

// Validation boilerplate.
// See https://github.com/ThomasAribart/json-schema-to-ts#validators
const ajv = new Ajv()

const validate = ajv.compile(dashboardDefinitionSchema)

const definitionText = ref(`{
  "tiles": [
    { "chart": {
      "type": "horizontal_bar"
     }, "query": {} }
   ]
}`)

const definition = computed<ValidationResult>(() => {
  let data

  try {
    data = JSON.parse(definitionText.value)
  } catch (e) {
    return {
      type: ValidationResultType.JsonParseError,
      message: `${e}`,
    }
  }

  if (!validate(data)) {
    return {
      type: ValidationResultType.ValidationError,
      errors: validate.errors,
    }
  }

  return {
    type: ValidationResultType.Success,
    data,
  }
})

const context: DashboardRendererContext = {
  filters: {},
  timeSpec: '',
}

const staticDefinition: DashboardDefinition = {
  tiles: [
    {
      title: 'Analytics chart',
      chart: {
        type: ChartTypes.HorizontalBar,
      },
      query: {},
    },
    {
      title: 'Simple chart',
      chart: {
        type: ChartTypes.Gauge,
        metricDisplay: ChartMetricDisplay.Full,
        reverseDataset: true,
        numerator: 0,
      },
      query: {},
    },
  ],
}

</script>
