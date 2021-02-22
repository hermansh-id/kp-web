export default [
  {
    title: 'Home',
    route: 'home',
    icon: 'HomeIcon',
  },
  {
    title: 'Pengajuan',
    icon: 'FileIcon',
    children: [
      {
        title: 'Kerja Praktek',
        route: 'kp',
        icon: 'FileIcon',
      },
    ],
  },
]
