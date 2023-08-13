<script lang="ts">
  import Slider from '$lib/inputs/Slider.svelte';
  import { toTitleCase } from '$lib/utils/stringFormatters';
  import { RadioGroup, Title } from '@svelteuidev/core';

  //Define standard content attribute sliders

  let acousticness: number = 0;
  let danceability: number = 0;
  let energy: number = 0;
  let instrumentalness: number = 0;
  let liveness: number = 0;
  let speechiness: number = 0;
  let valence: number = 0;

  const attributes: { [s: string]: number } = {
    acousticness: acousticness,
    danceability: danceability,
    energy: energy,
    instrumentalness: instrumentalness,
    liveness: liveness,
    speechiness: speechiness,
    valence: valence
  };

  //Define inputs for other attributes
  let loudness: number = -60;
  let tempo: number = 120;
  let mode: '0' | '1' = '1';
  let time_signature: 3 | 4 | 5 | 6 | 7 = 4;

  const modeItems = [
    { label: 'major', value: '1' },
    { label: 'minor', value: '0' }
  ];
</script>

<div id="attribute-slider-panel">
  {#each Object.keys(attributes) as attribute}
    <label for={attribute}>
      <Title order={5}>{toTitleCase(attribute)}</Title>
      <div class="attribute-slider-holder">
        <Slider
          id={attribute}
          bind:value={attributes[attribute]}
          min={0}
          max={1}
          step={0.001}
          size="xs"
          override={{ 'flex-grow': 1 }}
        />
        <p class="attribute-value-label">{attributes[attribute]}</p>
      </div>
    </label>
  {/each}
</div>
<div id="special-attribute-input-panel">
  <label for="loudness">
    <Title order={5}>Loudness</Title>
    <div class="attribute-slider-holder">
      <Slider
        id="loudness"
        bind:value={loudness}
        min={-60}
        max={1}
        step={0.1}
        override={{}}
      />
      <p class="attribute-value-label">{loudness} dB</p>
    </div>
  </label>
  <label for="tempo">
    <Title order={5}>Tempo</Title>
    <div class="attribute-slider-holder">
      <Slider
        id="tempo"
        bind:value={tempo}
        min={0}
        max={300}
        step={1}
        override={{}}
      />
      <p class="attribute-value-label">{tempo} BPM</p>
    </div>
  </label>
  <label for="time-signature">
    <Title order={5}>Time Signature</Title>
    <div class="attribute-slider-holder">
      <Slider
        id="time-signature"
        bind:value={time_signature}
        min={3}
        max={7}
        step={1}
        override={{}}
      />
      <p class="attribute-value-label">{time_signature}/4</p>
    </div>
  </label>
  <label for="mode">
    <Title order={5}>Mode</Title>
    <RadioGroup bind:value={mode} items={modeItems} />
  </label>
</div>

<style>
  #attribute-slider-panel {
    width: 50%;
  }
  .attribute-slider-holder {
    display: flex;
    align-items: center;
    column-gap: 10px;
  }
  .attribute-value-label {
    display: block;
    width: 40px;
  }
</style>
