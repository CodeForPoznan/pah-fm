<template>
  <input
    type="text"
    inputmode="tel"
    maxlength="6"
    pattern="[0-9]{6}"
    class="form-control"
    onkeypress="return event.key === 'Enter' ||
        event.key === 'Backspace' ||
        (Number(event.key) >= 0 && Number(event.key) <= 9)"
    :value="value"
    @change="(e) => $emit('input', e.target.value)"
  />
</template>

<script>
export default {
  name: 'SignatureInput',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
};
</script>
