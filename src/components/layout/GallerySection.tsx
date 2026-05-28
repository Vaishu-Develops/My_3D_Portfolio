import StellarCardGallerySingle from '../ui/3d-image-gallery';
import { ScrollRevealHeading } from '../ui/text-scroll-animation';
import { ScrollRevealElement } from '../ui/scroll-reveal-element';

export default function GallerySection() {
  return (
    <section id="gallery" className="py-24 w-full flex flex-col gap-12 relative z-10">
      <div className="text-center">
        <ScrollRevealHeading
          text="Project"
          highlightText="Gallery"
          gradient="from-purple-400 to-indigo-500"
          subtitle="Interactive 3D exploration of my work."
          align="center"
        />
      </div>

      <ScrollRevealElement direction="bottom" className="w-full flex-grow mx-auto px-4 lg:px-8">
        <StellarCardGallerySingle />
      </ScrollRevealElement>
    </section>
  );
}
