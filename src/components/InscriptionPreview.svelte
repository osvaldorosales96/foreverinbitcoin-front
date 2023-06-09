<script lang="ts">
  import { Badge, Button } from 'flowbite-svelte';
  import { Heading } from 'flowbite-svelte';

  import {
    fileName,
    orderStatus,
    feeRate,
    orderType,
    loadingEstimateFees,
    inscriptionId,
    inscriptionNumber
  } from '../stores';
  import SeeInscriptionButton from './SeeInscriptionButton.svelte';

  $: previewFileName = $fileName
    .replace('.txt', '.html')
    .replace('.json', '.html');

  let imageSrc: string;
  let iframeSrc: string;

  $: {
    if ($orderStatus < 1) {
      imageSrc = '/tmp/' + $fileName;
      iframeSrc = '/tmp/preview/' + previewFileName;
    } else {
      imageSrc = '/content/' + $fileName;
      iframeSrc = '/content/preview/' + previewFileName;
    }
  }

  async function cancelPreview() {
    // delete request
    const requestData = {
      filename: $fileName
    };

    console.log(requestData);
    const response = await fetch('/api/preview', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData)
    });
    console.log(await response.text());

    $fileName = '';
    $feeRate = 0;
    $loadingEstimateFees = false;
  }
</script>

{#if $orderStatus != 8}
  <!-- {#if false} -->
  <Heading class="text-lg mb-1">Inscription Preview</Heading>
{:else}
  <Heading class="text-lg mb-1"
    >Inscription #{$inscriptionNumber.toLocaleString('en-US')}</Heading
  >
{/if}
<div class="p-4 bg-primary-50 rounded-lg dark:bg-gray-800 mb-4  w-full">
  <div class="flex justify-center mb-3 ">
    {#if $orderType == 'image'}
      <div class="fancy-border">
        <img src={imageSrc} class="drop-shadow-xl" alt="Not found" />
      </div>
    {:else}
      <iframe
        src={iframeSrc}
        title="Text inscription preview"
        class="w-full aspect-square drop-shado-xl fancy-border"
      />
    {/if}
  </div>

  {#if $orderStatus == 8}
    <Badge border color="purple" class="mt-2">Order complete</Badge>

    <SeeInscriptionButton />
  {/if}

  {#if $orderStatus < 1}
    <Button outline size="xs" color="purple" on:click={cancelPreview}
      >Cancel</Button
    >
  {/if}
</div>

<style>
  .fancy-border {
    position: relative;
    width: fit-content;
    border-radius: 1rem;
  }

  .fancy-border img,
  .fancy-border::after {
    border-radius: inherit;
  }

  .fancy-border img {
    display: block;
  }

  .fancy-border::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.25);
    pointer-events: none;
  }
</style>
