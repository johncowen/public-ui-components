<template>
  <KDropdown
    class="account-dropdown"
    :kpop-attributes="{ placement: 'bottomStart' }"
    :trigger-text="userInitials"
    :width="width"
  >
    <template #items="{ handleSelection }">
      <slot>
        <KDropdownItem
          v-for="option in options"
          :key="option.value"
          :class="{ 'has-divider': option.hasDivider }"
          :data-testid="'select-' + option.value"
          :has-divider="option.hasDivider"
          @click="handleSelection(option)"
        >
          <slot :option="option">
            {{ option.label }}
          </slot>
        </KDropdownItem>
      </slot>
    </template>
  </KDropdown>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { DropdownItem } from '@kong/kongponents'

defineProps({
  options: {
    type: Array as PropType<DropdownItem[]>,
    required: true,
  },
  width: {
    type: String,
    default: '240',
  },
  userInitials: {
    type: String,
    required: true,
    // Important: default to a string with a single empty space to force the dropdown to always be visible
    default: ' ',
  },
})

</script>

<style lang="scss" scoped>
.account-dropdown {
  display: flex;
  margin-right: $kui-space-20;

  :deep(.k-button.primary),
  :deep(.k-button.primary:hover:not(:disabled)) {
    background-color: var(--kong-ui-account-dropdown-background, #9396FC);
    border-radius: $kui-border-radius-round;
    color: var(--kong-ui-account-dropdown-color, $kui-color-text);
    font-size: $kui-font-size-20;
    height: 24px;
    justify-content: center;
    padding: $kui-space-0;
    // Prevent text selection
    user-select: none;
    width: 24px;

    &:hover,
    &:focus,
    &:active {
      background-color: var(--kong-ui-account-dropdown-background, #9396FC) !important;
    }
  }

  // Align the dropdown to the bottom of the navbar
  :deep(.k-dropdown-popover) {
    top: 11px !important;
  }
}
</style>
