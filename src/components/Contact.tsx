import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Phone } from "lucide-react";
import { profile } from "../data/portfolio";

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative py-24 md:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[140px]" />
      </div>
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="section-heading justify-center">Contact</div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            Let's build something{" "}
            <span className="bg-gradient-to-r from-accent-soft via-accent to-accent-glow bg-clip-text text-transparent">
              thoughtful
            </span>
            .
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            I'm always open to talking about ambitious product work, founding
            teams, and interesting engineering problems. The fastest way to
            reach me is email.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-white shadow-glow transition-all hover:bg-accent-soft"
            >
              <Mail className="h-4 w-4" />
              {profile.email}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-ink transition-all hover:border-white/30"
            >
              <Phone className="h-4 w-4" />
              {profile.phone}
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <SocialLink
              href={profile.github}
              label="GitHub"
              icon={<Github className="h-4 w-4" />}
            />
            <SocialLink
              href={profile.linkedin}
              label="LinkedIn"
              icon={<Linkedin className="h-4 w-4" />}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SocialLink: React.FC<{
  href: string;
  label: string;
  icon: React.ReactNode;
}> = ({ href, label, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-ink-muted transition-all hover:border-accent/60 hover:text-ink"
  >
    {icon}
    {label}
  </a>
);
