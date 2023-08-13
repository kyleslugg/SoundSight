<script lang="ts">
  import { Input, type SvelteUISize } from '@svelteuidev/core';
  export let min: number;
  export let max: number;
  export let step: number = 0.01;
  export let value: number;
  export let id: string;
  export let override: { [s: string]: string | number };
  export let size: SvelteUISize = 'sm';
</script>

<Input {id} type="range" {min} {max} {step} bind:value {size} {override}
  ><slot /></Input
>
