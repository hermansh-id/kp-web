<template>
  <b-card
    v-if="data"
    no-body
    class="card-statistics"
  >
    <b-card-header>
      <b-card-title>Statistik Pengajuan Kerja Praktek</b-card-title>
    </b-card-header>
    <b-card-body class="statistics-body">
      <b-row>
        <b-col
          xl="3"
          sm="6"
        >
          <b-media no-body>
            <b-media-aside

              class="mr-2"
            >
              <b-avatar
                size="48"
                variant="light-warning"
              >
                <feather-icon
                  size="24"
                  icon="pieIcon"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{ data.kuantitas }} Mahasiswa
              </h4>
              <b-card-text class="font-small-3 mb-0">
                Pengajuan
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
        <b-col
          xl="3"
          sm="6"
        >
          <b-media no-body>
            <b-media-aside

              class="mr-2"
            >
              <b-avatar
                size="48"
                variant="light-danger"
              >
                <feather-icon
                  size="24"
                  icon="pieIcon"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{ data.informatika }} Mahasiswa
              </h4>
              <b-card-text class="font-small-3 mb-0">
                Informatika
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
        <b-col
          xl="3"
          sm="6"
        >
          <b-media no-body>
            <b-media-aside

              class="mr-2"
            >
              <b-avatar
                size="48"
                variant="light-primary"
              >
                <feather-icon
                  size="24"
                  icon="pieIcon"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{ data.elektro }} Mahasiswa
              </h4>
              <b-card-text class="font-small-3 mb-0">
                Teknik Elektro
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
        <b-col
          xl="3"
          sm="6"
        >
          <b-media no-body>
            <b-media-aside
              class="mr-2"
            >
              <b-avatar
                size="48"
                variant="light-success"
              >
                <feather-icon
                  size="24"
                  icon="pieIcon"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{ data.sipil }} Mahasiswa
              </h4>
              <b-card-text class="font-small-3 mb-0">
                Teknik Sipil
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardText, BCardBody, BRow, BCol, BMedia, BMediaAside, BAvatar, BMediaBody,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
