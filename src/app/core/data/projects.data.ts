export interface Project {
  id: string;
  key: string;
  image: string;
  categoryKey: string;
  status: 'done' | 'progress';
  featured: boolean;
}

export const PROJECTS: Project[] = [
  { id: 'p1', key: 'p1', image: '/images/Projects/project1.jpg', categoryKey: 'contracting', status: 'done', featured: true },
  { id: 'p2', key: 'p2', image: '/images/Projects/hero.jpg', categoryKey: 'construction', status: 'progress', featured: true },
  { id: 'p3', key: 'p3', image: '/images/Projects/project2.jpg', categoryKey: 'mep', status: 'done', featured: true },
  { id: 'p4', key: 'p4', image: '/images/Projects/project3.jpg', categoryKey: 'contracting', status: 'done', featured: false },
  { id: 'p5', key: 'p5', image: '/images/Projects/project4.jpg', categoryKey: 'excavation', status: 'progress', featured: true },
  { id: 'p6', key: 'p6', image: '/images/Projects/project5.jpg', categoryKey: 'construction', status: 'done', featured: false },
  { id: 'p7', key: 'p7', image: '/images/Projects/project6.jpg', categoryKey: 'maintenance', status: 'done', featured: false },
  { id: 'p8', key: 'p8', image: '/images/Projects/project7.jpg', categoryKey: 'construction', status: 'progress', featured: false },
  { id: 'p9', key: 'p9', image: '/images/Projects/project8.jpg', categoryKey: 'services', status: 'done', featured: false },
];