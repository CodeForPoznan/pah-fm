<script>
import { mapActions } from 'vuex';
import * as actions from '../store/actions';

export default {
  name: 'LogoutView',
  methods: {
    ...mapActions([actions.LOGOUT]),
  },
};
</script>
