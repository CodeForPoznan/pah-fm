<template>
  <div class="jumbotron wrapper" style="margin: 10px">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <div>
            <h2>Confirmation code</h2>
            <div class="form-group">
              <input type="text" name="code" id="code" :value="code" readonly />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: 'de72sd', //TODO: Generate the code
    };
  },
  beforeRouteEnter(to, from, next) {
    //TODO: Check if code is in Vuex
    if (from.path == '/passenger') {
      return next();
    }
    return next({ path: '/passenger' });
  },
};
</script>
