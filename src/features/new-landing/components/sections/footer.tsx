import { Link } from 'react-router-dom';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  category: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    category: 'COMPANY',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Safety First', href: '/safety' },
      { label: 'Parent Guide', href: '/parents' },
    ],
  },
  {
    category: 'RESOURCES',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Curriculum', href: '/curriculum' },
      { label: 'Learning Guide', href: '/guide' },
      { label: 'Activities', href: '/activities' },
    ],
  },
  {
    category: 'BUDDIES',
    links: [
      { label: 'Noah (Math)', href: '/buddies/noah' },
      { label: 'Dominic (History)', href: '/buddies/dominic' },
      { label: 'Ashley (Science)', href: '/buddies/ashley' },
      { label: 'Charlie (Coding)', href: '/buddies/charlie' },
      { label: 'Chloe (Art)', href: '/buddies/chloe' },
    ],
  },
  {
    category: 'RESEARCH',
    links: [
      { label: 'AI in Education', href: '/research/ai-edu' },
      { label: 'Child Safety', href: '/research/safety' },
      { label: 'Adaptive Learning', href: '/research/adaptive' },
      { label: 'See all research', href: '/research' },
    ],
  },
  {
    category: 'SOCIALS',
    links: [
      { label: 'LinkedIn', href: 'https://linkedin.com/company/claymind', external: true },
      { label: 'X', href: 'https://x.com/claymind', external: true },
      { label: 'Instagram', href: 'https://instagram.com/claymind', external: true },
    ],
  },
  {
    category: 'LEGAL',
    links: [
      { label: 'Privacy policy', href: '/privacy' },
      { label: 'Terms of service', href: '/terms' },
      { label: 'Safety Policy', href: '/safety-policy' },
    ],
  },
  {
    category: 'SUPPORT',
    links: [
      { label: 'Discord', href: '/discord' },
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: 'mailto:hello@claymind.ai', external: true },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="w-full bg-[#F1EEE9] font-sans">
      {/* Sitemap Grid Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 border-t border-black">
        {footerLinks.map((item) => (
          <div 
            key={item.category} 
            className="border-r border-black last:border-r-0 border-b lg:border-b-0 border-black min-h-[220px]"
          >
            {/* Category Header */}
            <div className="bg-black py-2 px-3 flex items-center gap-2">
              <div className="w-3 h-3 bg-white" />
              <span className="text-white font-mono text-[10px] tracking-wider uppercase font-bold">
                {item.category}
              </span>
            </div>
            
            {/* Links List */}
            <ul className="p-4 space-y-2">
              {item.links.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] text-black hover:underline block leading-tight"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-[13px] text-black hover:underline block leading-tight"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Large Pink Banner */}
        <div className="bg-[#FF6B8B] w-full h-[160px] lg:h-[200px] flex items-end p-6 lg:p-10 border-t border-black relative overflow-hidden">
          <div className="flex items-center gap-3">
            {/* Logo Icon and Text */}
            <div className="flex items-center">
              <span className="text-black font-black text-5xl lg:text-[100px] tracking-tighter leading-none flex items-center">
                <span className="text-[1.2em] -mt-2">◹</span>CLAYMINDAI
              </span>
            </div>
          </div>
        </div>

      {/* Copyright Bar */}
      <div className="bg-[#F1EEE9] border-t border-black py-4 px-6 text-center">
        <p className="text-[10px] font-mono tracking-widest uppercase text-black">
          © 2025 CLAYMINDAI | AI EDUCATION FOR KIDS | ALL RIGHTS RESERVED
        </p>
      </div>
    </footer>
  );
};

export default Footer;