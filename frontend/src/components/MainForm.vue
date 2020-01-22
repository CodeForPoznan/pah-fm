<template>
  <div class="jumbotron wrapper">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <div>
            <error-list v-if="listOfErrors.length" :errors="listOfErrors" />
            <h2>{{ title }}</h2>
            <form
              @submit.prevent="$emit('submit')"
              @reset.prevent="$emit('reset')"
            >
              <slot />
              <div class="form-group">
                <button class="btn btn-primary col-xs-3">
                  {{ $t('drive_form.submit') }}
                </button>
                <input
                  type="reset"
                  class="btn btn-secondary col-xs-2"
                  :value="$t('drive_form.reset')"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorList from '../components/ErrorList.vue';

export default {
  name: 'MainForm',
  components: { ErrorList },
  props: {
    title: {
      type: String,
      required: true,
    },
    listOfErrors: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
