import { NextResponse } from 'next/server';

export async function GET() {
  const blogs = [
    {
      id: 1,
      title: 'Healthcare Firms Accelerate AI & Hybrid Cloud Adoption',
      slug: 'healthcare-ai-hybrid-cloud',
      category: 'Business',
      author: 'Ellinien Loma',
      date: '28 FEB',
      image: '/assets/blogs/blog-1.png',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
    },
    {
      id: 2,
      title: 'BFSI Leaders Drive Digital Transformation with AI & Cloud',
      slug: 'bfsi-ai-cloud-digital-transformation',
      category: 'Business',
      author: 'Ellinien Loma',
      date: '28 FEB',
      image: '/assets/blogs/blog-2.png',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
    },
    {
      id: 3,
      title: 'Infrastructure Modernization and Virtual Workloads On Cloud',
      slug: 'cloud-infrastructure-workload-modernization',
      category: 'Business',
      author: 'Ellinien Loma',
      date: '28 FEB',
      image: '/assets/blogs/blog-3.png',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
    },
    {
      id: 4,
      title: 'Unstructured Data – the Unsung hero',
      slug: 'unstructured-data-hidden-business-asset',
      category: 'Business',
      author: 'Ellinien Loma',
      date: '28 FEB',
      image: '/assets/blogs/blog-4.png',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
    },
    {
      id: 5,
      title: 'Reimagining Customer Experience in the Digital Economy',
      slug: 'reimagining-digital-customer-experience',
      category: 'Business',
      author: 'Ellinien Loma',
      date: '28 FEB',
      image: '/assets/blogs/blog-5.png',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
    },
    {
      id: 6,
      title: 'Driving Digital Excellence with Google Cloud',
      slug: 'digital-excellence-google-cloud',
      category: 'Business',
      author: 'Ellinien Loma',
      date: '28 FEB',
      image: '/assets/blogs/blog-6.png',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
    },
  ];

  return NextResponse.json(blogs);
}
