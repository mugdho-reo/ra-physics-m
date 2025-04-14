import Image from 'next/image';
import Link from 'next/link';
import {Josefin_Sans} from 'next/font/google';
const josefin = Josefin_Sans({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-josefin',
  });
import {
  FaYoutube,
  FaFacebookSquare,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope
} from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <footer className={`${josefin.className} bg-white pt-8 border-t border-gray-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between gap-8 pb-8">
          {/* Logo + Tagline */}
          <div className="flex-1 text-center md:text-left">
            <Link
              href="/">
            <Image 
              src="/ra-logo.png"
              priority = {true}
              alt="RA Physics Logo"
              width={1859}
                height={1931} 
              className="mx-auto md:mx-0 w-24 h-auto"
            />
            </Link>
            
            <p className="text-sm mt-2 text-gray-700 italic">
              Best class, best exam, best result.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex-1 text-center">
            <h3 className="text-lg font-semibold mb-2">Follow us on</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center justify-center gap-2">
                <FaYoutube className="text-red-600 w-5 h-5" />
                <Link href="https://www.youtube.com/@Ratulphysics" target="_blank">YouTube</Link>
              </li>
              <li className="flex items-center justify-center gap-2">
                <FaFacebookSquare className="text-red-600 w-5 h-5" />
                <Link href="#">Ra Physics</Link>
              </li>
              <li className="flex items-center justify-center gap-2">
                <FaFacebookSquare className="text-red-600 w-5 h-5" />
                <Link href="#">Ra Physics</Link>
              </li>
              <li className="flex items-center justify-center gap-2">
                <FaGlobe className="text-red-600 w-5 h-5" />
                <Link href="http://www.raphysicsedu.com" target="_blank">
                  www.raphysicsedu.com
                </Link>
              </li>
            </ul>
          </div>

         {/* Contact Info */}
<div className="flex-1 text-center md:text-right text-sm text-gray-700 space-y-2">
  <div className="flex justify-center md:justify-end items-center gap-2">
    <span>Behind Dolphine Clinic, Boalia, Rajshahi</span>
    <FaMapMarkerAlt className="text-red-600 w-4 h-4" />
  </div>
  <div className="flex justify-center md:justify-end items-center gap-2">
    <a href="tel:+8801892254939" className="">
      01892254939
    </a>
    <FaPhoneAlt className="text-red-600 w-4 h-4" />
  </div>
  <div className="flex justify-center md:justify-end items-start gap-2">
    <a
      href="mailto:raphysicsedu@gmail.com"
      className=""
    >
      raphysicsedu@gmail.com
    </a>
    <FaEnvelope className="text-red-600 w-4 h-4 mt-1" />
  </div>
</div>

        </div>

        {/* Bottom Bar */}
        <div className="bg-red-100 text-center py-3 text-sm text-red-700">
          © {currentYear} All Right Reserved By <strong>Ra Physics</strong>. Developed by <strong>Mugdho</strong>
        </div>
      </div>
    </footer>
  );
}
