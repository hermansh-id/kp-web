<template>
  <b-card-code title="Detail Pembuatan Kartu Aktif Kuliah">
    <app-timeline>

      <!-- 12 INVOICES HAVE BEEN PAID -->
      <app-timeline-item
        variant="success"
        icon="FileTextIcon"
      >
        <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
          <h6>Persyaratan usulan KAK</h6>
          <small class="text-muted">{{ item.tanggal }}</small>
        </div>
        <p>Mohon cek persyaratan.</p>
        <b-row class="ml-0">
          <div
            class="mr-2"
          >
            <a
              :href="item.syarat.ombus"
              target="_blank"
            >
              <b-img
                :src="require('@/assets/images/icons/pdf.png')"
                height="auto"
                width="20"
                class="mr-1"
              />
              <span class="align-bottom">Kartu Keluarga</span>
            </a>
          </div>
          <div class="mr-5">
            <a
              :href="item.syarat.pbn"
              target="_blank"
            >
              <b-img
                :src="require('@/assets/images/icons/pdf.png')"
                height="auto"
                width="20"
                class="mr-2"
              />
              <span class="align-bottom">Kartu Tanda Mahasiswa</span>
            </a></div>
          <div class="mr-5">
            <a
              :href="item.syarat.transkrip"
              target="_blank"
            >
              <b-img
                :src="require('@/assets/images/icons/pdf.png')"
                height="auto"
                width="20"
                class="mr-2"
              />
              <span class="align-bottom">Slip Gaji</span>
            </a></div>
        </b-row>
      </app-timeline-item>

      <!-- FINANCIAL REPORT -->
      <app-timeline-item
        variant="secondary"
        icon="FileTextIcon"
      >

        <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
          <h6>Pembuatan surat KAK</h6>
          <small class="text-muted">2 hours ago</small>
        </div>
        <p>Pembuatan surat dikonfirmasi tiap tahapannya</p>
        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          size="sm"
          variant="outline-primary"
          class="mr-2"
        >
          Konfirmasi Pembuatan
        </b-button>
        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          size="sm"
          variant="outline-primary"
        >
          Konfirmasi Tanda Tangan
        </b-button>
      </app-timeline-item>

      <!-- INTERVIEW SCHEDULE -->
      <app-timeline-item
        variant="secondary"
        icon="UploadIcon"
      >
        <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
          <h6>Upload Surat Keterangan</h6>
          <small class="text-muted">03:00 PM</small>
        </div>
        <p>Mohon cek terlebih dahulu sebelum konfirmasi.</p>

        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          size="sm"
          variant="outline-primary"
        >
          Upload file
        </b-button>
      </app-timeline-item>

      <!-- INTERVIEW SCHEDULE -->
      <app-timeline-item
        variant="secondary"
        icon="CheckIcon"
      >
        <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
          <h6>Selesai</h6>
          <small class="text-muted">03:00 PM</small>
        </div>
        <p>Usulan sudah selesai</p>

        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          size="sm"
          variant="outline-danger"
        >
          Hapus usulan
        </b-button>
      </app-timeline-item>

    </app-timeline>

  </b-card-code>
</template>

<script>
import BCardCode from '@core/components/b-card-code'
import {
  BImg, BButton, VBToggle, VBTooltip, BRow,
} from 'bootstrap-vue'
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'
import Ripple from 'vue-ripple-directive'
import { ajuanCollection } from '@/firebase'
// import route from '@/router'

export default {
  components: {
    AppTimeline,
    AppTimelineItem,
    BCardCode,
    BImg,
    BButton,
    BRow,
  },
  directives: { 'b-toggle': VBToggle, 'b-tooltip': VBTooltip, Ripple },
  data() {
    return {
      item: {},
      id: this.$route.params.id,
    }
  },
  created() {
    this.$bind('item', ajuanCollection.doc(this.$route.params.id))
  },
}
</script>
