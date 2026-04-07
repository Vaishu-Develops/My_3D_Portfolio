import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';

const certifications = [
  'Intro to AI & GenAI — Infosys',
  'AI Fundamentals — IBM',
  'Web Development — Zaalima',
  'Introduction to Data Science — Infosys',
  'Introduction to Natural Language Processing — Infosys',
  'Introduction to Deep Learning — Infosys',
  'Generative Models for Developers — Infosys',
];

export default function EducationSection() {
  return (
    <section id="education" className="py-24 w-full relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">Certifications</span>
        </h2>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 space-y-8">
        {/* Education */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 rounded-2xl hover:border-teal-500/30 transition-all duration-300"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">PPG Institute of Technology</h3>
              <p className="text-teal-300 font-medium">B.E. Computer Science & Engineering</p>
              <p className="text-gray-400 text-sm mt-1">2022 — 2026 • Coimbatore, Tamil Nadu</p>
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 rounded-2xl hover:border-purple-500/30 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Certifications</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/20 transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">{cert}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
