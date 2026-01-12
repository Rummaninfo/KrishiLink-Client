import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-emerald-700 dark:bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold tracking-wide mb-3">KrishiLink</h2>
          <p className="text-sm text-white/80 leading-relaxed">
            Empowering farmers and buyers through transparent connections and
            fair trade. Grow. Share. Prosper.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-4">
            {[
              { Icon: Facebook, href: "#" },
              { Icon: Instagram, href: "#" },
              { Icon: Twitter, href: "#" },
            ].map(({ Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-amber-300">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-white/90">
            {[
              { name: "Home", path: "/home" },
              { name: "All Crops", path: "/all-crops" },
              { name: "Add Crops", path: "/addcrops" },
              { name: "My Profile", path: "/myprofile" },
            ].map((link, i) => (
              <li key={i}>
                <motion.div whileHover={{ x: 4 }}>
                  <Link
                    to={link.path}
                    className="hover:text-amber-300 transition"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-amber-300">
            Support
          </h3>
          <ul className="space-y-2 text-sm text-white/90">
            <li>
              <motion.div whileHover={{ x: 4 }}>
                <Link to="/about" className="hover:text-amber-300 transition">
                  About Us
                </Link>
              </motion.div>
            </li>
            <li>
              <motion.div whileHover={{ x: 4 }}>
                <Link to="/contact" className="hover:text-amber-300 transition">
                  Contact Us
                </Link>
              </motion.div>
            </li>
            <li>
              <motion.div whileHover={{ x: 4 }}>
                <Link to="/faq" className="hover:text-amber-300 transition">
                  FAQs
                </Link>
              </motion.div>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-amber-300">
            Get in Touch
          </h3>
          <ul className="space-y-2 text-sm text-white/90">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-amber-300" />{" "}
              <a href="mailto:info@krishilink.com" className="hover:underline">
                info@krishilink.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-amber-300" />{" "}
              <a href="tel:+880123456789" className="hover:underline">
                +880 1234-56789
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 py-4 text-center text-sm text-white/70">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-amber-300">KrishiLink</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
