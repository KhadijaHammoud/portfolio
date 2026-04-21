import React from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Section } from "./Section";
import { education } from "../data/portfolio";

export const Education: React.FC = () => {
  return (
    <Section id="education" eyebrow="Education" title={<>Academic background.</>}>
      <div className="grid gap-5 md:grid-cols-2">
        {education.map((e, i) => (
          <motion.div
            key={e.school}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="card p-6 md:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent-soft">
                <GraduationCap className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-ink">{e.school}</h3>
                <div className="text-sm text-ink-muted">{e.period}</div>
              </div>
            </div>
            <div className="mt-5 text-base text-ink">{e.degree}</div>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {e.note}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
