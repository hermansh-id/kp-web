<template>
  <b-card
    no-body
    class="card-browser-states"
  >
    <b-card-header>
      <div>
        <b-card-title>Pengajuan</b-card-title>
        <b-card-text class="font-small-2">
          per jurusan
        </b-card-text>
      </div>
    </b-card-header>

    <!-- body -->
    <b-card-body>
      <div
        class="browser-states"
      >
        <h6 class="align-self-center my-auto">
          Informatika
        </h6>
        <div class="d-flex align-items-center">
          <span class="font-weight-bold text-body-heading mr-1">{{ data.informatika }} orang</span>
        </div>
      </div>
      <div
        class="browser-states"
      >
        <h6 class="align-self-center my-auto">
          Teknik Elektro
        </h6>
        <div class="d-flex align-items-center">
          <span class="font-weight-bold text-body-heading mr-1">{{ data.elektro }} orang</span>
        </div>
      </div>
      <div
        class="browser-states"
      >
        <h6 class="align-self-center my-auto">
          Teknik Sipil
        </h6>
        <div class="d-flex align-items-center">
          <span class="font-weight-bold text-body-heading mr-1">{{ data.sipil }} orang</span>
        </div>
      </div>
    </b-card-body>
    <!--/ body -->
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardText, BCardBody,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  created() {

  },
}
</script>
