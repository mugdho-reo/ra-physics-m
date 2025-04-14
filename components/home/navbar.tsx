'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Optional: Lucide icons
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/portal', label: 'Portal' },
]

  return (
    <nav className="fixed w-full z-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-blue-600">
            <Image
                className="h-14 w-auto"
                src="/ra-logo.png" // Replace with your logo path
                priority = {true}
                alt="RA Physics Logo"
                width={1859} // Adjust width as needed
                height={1931} // Adjust height as needed
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:bg-red-400 hover:text-amber-50 bg-red-200 px-3 py-2 rounded-md text-md font-medium"
              >
                {link.label}
              </Link>
            ))}
            
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white pb-4 w-screen text-center">
        {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-700 bg-red-200 rounded-md m-1"
              >
                {link.label}
              </Link>
            ))}
        </div>
      )}
    </nav>
  );
}
