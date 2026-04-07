import { motion } from 'framer-motion';
import StellarCardGallerySingle from '../ui/3d-image-gallery';

export default function GallerySection() {
  return (
    <section id="gallery" className="py-24 w-full flex flex-col gap-12 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Gallery</span>
        </h2>
        <p className="text-neutral-400 mt-4">Interactive 3D exploration of my work.</p>
      </motion.div>

      <div className="w-full flex-grow mx-auto px-4 lg:px-8">
        <StellarCardGallerySingle />
      </div>
    </section>
  );
}
