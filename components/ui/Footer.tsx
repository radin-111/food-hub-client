import Link from "next/link";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-200 w-full">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">FoodHub</h2>
            <p className="text-sm text-neutral-400">
              Delicious meals made with fresh ingredients. Bringing your
              favorite flavors to one place.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-white transition">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="hover:text-white transition">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="hover:text-white transition">
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link href="#" className="hover:text-white">Home</Link></li>
              <li><Link href="#" className="hover:text-white">Menu</Link></li>
              <li><Link href="#" className="hover:text-white">About Us</Link></li>
              <li><Link href="#" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Opening Hours</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>Mon – Fri: 10:00 AM – 10:00 PM</li>
              <li>Saturday: 11:00 AM – 11:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex items-center gap-2">
                <MapPin size={16} /> 123 Food Street, City
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} /> +880 1234 567 890
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} /> support@foodhub.com
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-neutral-700" />

        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} FoodHub. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
