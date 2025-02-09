
# TargetsList.vue

A table component for targets. Includes target create/edit form modal out of the box.

- [Requirements](#requirements)
- [Usage](#usage)
  - [Install](#install)
  - [Props](#props)
  - [Slots](#slots)
  - [Events](#events)
  - [Usage example](#usage-example)
- [TypeScript interfaces](#typescript-interfaces)

## Requirements

- `vue` and `vue-router` must be initialized in the host application
- `@kong/kongponents` must be added as a `dependency` in the host application, globally available via the Vue Plugin installation, and the package's style imports must be added in the app entry file. [See here for instructions on installing Kongponents](https://kongponents.konghq.com/#globally-install-all-kongponents).
- `@kong-ui-public/i18n` must be available as a `dependency` in the host application.
- `axios` must be installed as a `dependency` in the host application.

## Usage

### Install

[See instructions for installing the `@kong-ui-public/entities-upstreams-targets` package.](../README.md#install)

### Props

#### `config`

- type: `Object as PropType<KonnectTargetsListConfig | KongManagerTargetsListConfig>`
- required: `true`
- default: `undefined`
- properties:
  - `app`:
    - type: `'konnect' | 'kongManager'`
    - required: `true`
    - default: `undefined`
    - App name.

  - `apiBaseUrl`:
    - type: `string`
    - required: `true`
    - default: `undefined`
    - Base URL for API requests.

  - `requestHeaders`:
    - type: `RawAxiosRequestHeaders | AxiosHeaders`
    - required: `false`
    - default: `undefined`
    - Additional headers to send with all Axios requests.

  - `createRoute`:
    - type: `RouteLocationRaw`
    - required: `false`
    - default: `undefined`
    - Route for creating a target.
    - Optional because a form could open in a modal or in a new page.

  - `workspace`:
    - type: `string`
    - required: `true`
    - default: `undefined`
    - *Specific to Kong Manager*. Name of the current workspace.

  - `controlPlaneId`:
    - type: `string`
    - required: `true`
    - default: `undefined`
    - *Specific to Konnect*. Name of the current control plane.

  - `upstreamId`:
    - type: `string`
    - required: `true`
    - default: `undefined`
    - Upstream ID.

  - `canMarkHealthy`:
    - type: `booldean`
    - required: `true`
    - default: `undefined`
    - *Specific to Kong Manager*. Whether the *Mark Healthy* action is available.

  - `canMarkUnhealthy`:
    - type: `booldean`
    - required: `true`
    - default: `undefined`
    - *Specific to Kong Manager*. Whether the *Mark Unhealthy* action is available.

  - `disableSorting`:
    - type: `boolean`
    - required: `false`
    - default: `undefined`
    - *Specific to Kong Manager*. Whether to disable table sorting.

The base `konnect` or `kongManger` config.

#### `cacheIdentifier`

- type: `String`
- required: `false`
- default: `''`

Used to override the default unique identifier for the table's entry in the cache. This should be unique across the Vue App.
Note: the default value is usually sufficient unless the app needs to support multiple separate instances of the table.

#### `canCreate`

- type: `Function as PropType<() => boolean | Promise<boolean>>`
- required: `false`
- default: `async () => true`

A synchronous or asynchronous function, that returns a boolean, that evaluates if the user can create a new entity.

#### `canDelete`

- type: `Function as PropType<(row: object) => boolean | Promise<boolean>>`
- required: `false`
- default: `async () => true`

A synchronous or asynchronous function, that returns a boolean, that evaluates if the user can delete a given entity.

#### `canEdit`

- type: `Function as PropType<(row: object) => boolean | Promise<boolean>>`
- required: `false`
- default: `async () => true`

A synchronous or asynchronous function, that returns a boolean, that evaluates if the user can edit a given entity.

### Slots

#### form-info

Slot for content above the input fields in target form modal.

### Events

#### error

An `@error` event is emitted when the table fails to fetch targets or delete a target. The event payload is the response error.

#### copy:success

A `@copy:success` event is emitted when a target ID or the entity JSON is successfully copied to clipboard. The event payload shape is CopyEventPayload.

#### copy:error

A `@copy:error` event is emitted when an error occurs when trying to copy a target ID or the entity JSON. The event payload shape is CopyEventPayload.

#### delete:success

A `@delete:success` event is emitted when a target is successfully deleted. The event payload is the target item data object.

#### health-actions:healthy

A `@health-actions:healthy` event is emitted when a user clicks on Mark Unhealthy dropdown item. The event payload is the target item data object.

#### health-actions:unhealthy

A `@health-actions:unhealthy` event is emitted when a user clicks on Mark Unhealthy dropdown item. The event payload is the target item data object.

#### create:target

A `@create:target` event is emitted when a new target is created. The event payload is the target item data object.

#### update:target

A `@update:target` event is emitted when a target has been updated. The event payload is the target item data object.

### Usage example

Please refer to the [sandbox](../sandbox/pages/TargetsListPage.vue).

## TypeScript interfaces

TypeScript interfaces [are available here](../src/types/index.ts) and can be directly imported into your host application. The following type interfaces are available for import:

```ts
import type {
  BaseTargetsListConfig,
  KonnectTargetsListConfig,
  KongManagerTargetsListConfig,
  EntityRow,
} from '@kong-ui-public/entities-upstreams-targets'
```
