/* One campaign list, shared by the landing and the full listing —
   a cleaned sample of the live engine's data. */
window.CAMPAIGNS = [
  {name:'BMW X3 launch', brand:'X3 Car', status:'booked', ai:false,
   industry:'Automotive', budget:50000, duration:'2 weeks', updated:'27 Aug 2026'},
  {name:'Astro 30 anniversary', brand:'Astro', status:'draft', ai:false,
   industry:'Entertainment', budget:150000, duration:'1 week', updated:'27 Aug 2026'},
  {name:'All new X3', brand:'BMW X3', status:'draft', ai:true,
   industry:'Automotive', budget:200000, duration:'3 weeks', updated:'24 Aug 2026'},
  {name:'Summer Peach perfume 2026', brand:'Perfume', status:'draft', ai:true,
   industry:'Beauty', budget:60000, duration:'12 weeks', updated:'6 Aug 2026'},
  {name:'Samsung S28 launch', brand:'Samsung S28', status:'draft', ai:true,
   industry:'Tech & devices', budget:125000, duration:'8 weeks', updated:'4 Aug 2026'},
  {name:'Switch new product launch', brand:'Apple products', status:'draft', ai:false,
   industry:'Tech & devices', budget:90000, duration:'9 weeks', updated:'23 Jul 2026'},
  {name:'New route launch: Malaysia to Hangzhou', brand:'AirAsia X', status:'draft', ai:false,
   industry:'Tourism', budget:125000, duration:'4 weeks', updated:'29 Jun 2026'},
  {name:'Mazda 6 facelift launch', brand:'Mazda 6', status:'draft', ai:true,
   industry:'Automotive', budget:200000, duration:'8 weeks', updated:'24 Mar 2026'},
  {name:'Lancôme perfume launch', brand:'L\'Oréal', status:'draft', ai:false,
   industry:'Beauty', budget:100000, duration:'10 weeks', updated:'1 Mar 2026'},
  {name:'Toyota Vios facelift 2026', brand:'Vios', status:'booked', ai:false,
   industry:'Automotive', budget:100000, duration:'8 weeks', updated:'17 Dec 2025'}
];
window.campaignBadge = function (c) {
  if (c.status === 'booked')
    return '<span class="c-badge c-badge-success"><i class="ph-fill ph-seal-check" style="font-size:12px"></i> Booked</span>';
  if (c.status === 'completed')
    return '<span class="c-badge c-badge-neutral">Completed</span>';
  return '<span class="c-badge c-badge-neutral">Draft</span>';
};
window.rmFmt = function (n) { return 'RM ' + n.toLocaleString('en-MY'); };
