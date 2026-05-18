export interface Project {
  id: string;
  key: string;
  image: string;
  categoryKey: string;
  status: 'done' | 'progress';
  featured: boolean;
}

export const PROJECTS: Project[] = [
  { id: 'p1', key: 'p1', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600', categoryKey: 'contracting', status: 'done', featured: true },
  { id: 'p2', key: 'p2', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600', categoryKey: 'construction', status: 'progress', featured: true },
  { id: 'p3', key: 'p3', image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=1600', categoryKey: 'mep', status: 'done', featured: true },
  { id: 'p4', key: 'p4', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600', categoryKey: 'contracting', status: 'done', featured: false },
  { id: 'p5', key: 'p5', image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1600', categoryKey: 'excavation', status: 'progress', featured: true },
  { id: 'p6', key: 'p6', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600', categoryKey: 'construction', status: 'done', featured: false },
  { id: 'p7', key: 'p7', image: 'https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=1600', categoryKey: 'maintenance', status: 'done', featured: false },
  { id: 'p8', key: 'p8', image: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=1600', categoryKey: 'construction', status: 'progress', featured: false },
  { id: 'p9', key: 'p9', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600', categoryKey: 'services', status: 'done', featured: false },
];