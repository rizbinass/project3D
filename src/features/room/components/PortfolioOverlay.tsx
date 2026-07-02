"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Code2, Download, ExternalLink, ImageIcon, Mail, Play, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Badge,
  Button,
  Card,
  Divider,
  FormField,
  Icon,
  IconButton,
  Input,
  Panel,
  Progress,
  Tabs,
  Textarea,
  Typography,
} from "@/components/ui";
import { Grid } from "@/components/layout";
import {
  aboutContent,
  certificatesContent,
  experienceContent,
  musicContent,
  photographyContent,
  projectsContent,
  sectionMeta,
  skillsContent,
  socialLinks,
} from "@/content/portfolio.content";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useOverlayStore } from "@/store/useOverlayStore";
import type { OverlayId } from "@/store/slices/overlay.slice";
import { useSceneStore } from "@/store/useSceneStore";

const contactSchema = z.object({
  name: z.string().min(2, "Enter your name."),
  email: z.string().email("Enter a valid email."),
  message: z.string().min(10, "Tell me a little more."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

function useClosePortfolioOverlay() {
  const closeOverlay = useOverlayStore((state) => state.closeOverlay);
  const setFocusedObjectId = useSceneStore((state) => state.setFocusedObjectId);
  const setCameraPresetId = useSceneStore((state) => state.setCameraPresetId);

  return useCallback(() => {
    closeOverlay();
    setFocusedObjectId(null);
    setCameraPresetId("idle");
  }, [closeOverlay, setCameraPresetId, setFocusedObjectId]);
}

function ProjectsSection() {
  const categories = [
    "All",
    ...Array.from(new Set(projectsContent.map((project) => project.category))),
  ];
  const [category, setCategory] = useState("All");
  const projects =
    category === "All"
      ? projectsContent
      : projectsContent.filter((project) => project.category === category);

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((item) => (
          <Button
            key={item}
            size="sm"
            variant={item === category ? "primary" : "glass"}
            onClick={() => setCategory(item)}
          >
            {item}
          </Button>
        ))}
      </div>
      <Grid columns={3}>
        {projects.map((project) => (
          <Card key={project.title} interactive className="grid gap-4">
            <div>
              <Badge tone="accent">{project.category}</Badge>
              <Typography as="h3" variant="heading-s" className="mt-4">
                {project.title}
              </Typography>
              <Typography variant="body-sm" className="mt-2">
                {project.summary}
              </Typography>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {project.gallery.map((item) => (
                <div
                  key={item}
                  className="border-border bg-surface grid aspect-[4/3] place-items-center rounded-md border"
                >
                  <Icon icon={ImageIcon} tone="accent" />
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Icon icon={Code2} size="sm" />}
                onClick={() => window.open(project.github, "_blank", "noopener,noreferrer")}
              >
                GitHub
              </Button>
              <Button
                variant="glass"
                size="sm"
                leftIcon={<Icon icon={ExternalLink} size="sm" />}
                onClick={() => window.open(project.demo, "_blank", "noopener,noreferrer")}
              >
                Live demo
              </Button>
            </div>
          </Card>
        ))}
      </Grid>
    </div>
  );
}

function SkillsSection() {
  return (
    <Tabs
      tabs={skillsContent.map((group) => ({
        id: group.category,
        label: group.category,
        content: (
          <div className="grid gap-5">
            <div className="flex items-center gap-3">
              <Icon icon={group.icon} tone="accent" />
              <Typography as="h3" variant="heading-s">
                {group.category}
              </Typography>
            </div>
            {group.skills.map((skill) => (
              <Progress key={skill.label} value={skill.value} label={skill.label} />
            ))}
          </div>
        ),
      }))}
    />
  );
}

function AboutSection() {
  return (
    <div className="grid gap-6">
      <Typography variant="body-lg">{aboutContent.intro}</Typography>
      <Grid columns={3}>
        {aboutContent.journey.map((item, index) => (
          <Card key={item}>
            <Badge tone="accent">0{index + 1}</Badge>
            <Typography variant="body-sm" className="mt-4">
              {item}
            </Typography>
          </Card>
        ))}
      </Grid>
      <Grid columns={2}>
        <Card>
          <Typography as="h3" variant="heading-s">
            Education
          </Typography>
          <ul className="text-text-secondary mt-4 grid gap-3 text-sm">
            {aboutContent.education.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <Typography as="h3" variant="heading-s">
            Goals
          </Typography>
          <ul className="text-text-secondary mt-4 grid gap-3 text-sm">
            {aboutContent.goals.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      </Grid>
    </div>
  );
}

function ExperienceSection() {
  return (
    <div className="grid gap-5">
      {experienceContent.map((item) => (
        <Card key={item.company} className="grid gap-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <Typography as="h3" variant="heading-s">
                {item.role}
              </Typography>
              <Typography variant="body-sm">{item.company}</Typography>
            </div>
            <Badge tone="info">{item.period}</Badge>
          </div>
          <Divider />
          <ul className="text-text-secondary grid gap-2 text-sm">
            {item.responsibilities.map((responsibility) => (
              <li key={responsibility}>{responsibility}</li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}

function CertificatesSection() {
  return (
    <Grid columns={3}>
      {certificatesContent.map((certificate) => (
        <Card
          key={certificate}
          interactive
          className="grid aspect-[4/3] place-items-center text-center"
        >
          <div>
            <Badge tone="success">Verified</Badge>
            <Typography as="h3" variant="heading-s" className="mt-4">
              {certificate}
            </Typography>
          </div>
        </Card>
      ))}
    </Grid>
  );
}

function PhotographySection() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <div className="grid gap-5">
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photographyContent.map((photo, index) => (
          <button
            key={photo}
            type="button"
            className="border-border bg-surface shadow-soft mb-4 grid w-full break-inside-avoid place-items-center rounded-lg border p-6 text-left transition hover:-translate-y-0.5"
            style={{ minHeight: `${index % 3 === 0 ? 220 : index % 3 === 1 ? 280 : 180}px` }}
            onClick={() => setActiveImage(photo)}
          >
            <Icon icon={ImageIcon} tone="accent" />
            <span className="text-text-secondary mt-3 text-sm">{photo}</span>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {activeImage && (
          <motion.button
            type="button"
            className="bg-overlay fixed inset-0 z-[var(--z-critical)] grid place-items-center p-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
          >
            <div className="border-border bg-card shadow-strong grid aspect-[4/3] w-[min(52rem,92vw)] place-items-center rounded-xl border">
              <Icon icon={ImageIcon} tone="accent" size="xl" />
              <span className="text-text-secondary">{activeImage}</span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function ResumeSection() {
  return (
    <Grid columns={2}>
      <Card className="grid gap-4">
        <Typography as="h3" variant="heading-s">
          Curriculum Vitae
        </Typography>
        <Typography variant="body-sm">
          A concise PDF version for recruiters and hiring teams.
        </Typography>
        <Button
          leftIcon={<Icon icon={Download} size="sm" />}
          onClick={() => window.open("/assets/documents/resume.pdf", "_blank")}
        >
          Download CV
        </Button>
      </Card>
      <Card className="grid gap-4">
        <Typography as="h3" variant="heading-s">
          Online Resume
        </Typography>
        <Typography variant="body-sm">
          View the interactive resume summary without leaving the portfolio room.
        </Typography>
        <Button
          variant="glass"
          leftIcon={<Icon icon={ExternalLink} size="sm" />}
          onClick={() => window.open("/assets/documents/resume.pdf", "_blank")}
        >
          View online
        </Button>
      </Card>
    </Grid>
  );
}

function ContactSection() {
  const [copied, setCopied] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const copyEmail = async (): Promise<void> => {
    await navigator.clipboard.writeText("hello@example.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <Grid columns={2}>
      <form
        className="grid gap-4"
        onSubmit={form.handleSubmit(() => {
          form.reset();
        })}
      >
        <FormField label="Name" htmlFor="name" error={form.formState.errors.name?.message}>
          <Input
            id="name"
            invalid={Boolean(form.formState.errors.name)}
            {...form.register("name")}
          />
        </FormField>
        <FormField label="Email" htmlFor="email" error={form.formState.errors.email?.message}>
          <Input
            id="email"
            type="email"
            invalid={Boolean(form.formState.errors.email)}
            {...form.register("email")}
          />
        </FormField>
        <FormField label="Message" htmlFor="message" error={form.formState.errors.message?.message}>
          <Textarea
            id="message"
            invalid={Boolean(form.formState.errors.message)}
            {...form.register("message")}
          />
        </FormField>
        <Button type="submit" leftIcon={<Icon icon={Mail} size="sm" />}>
          Send message
        </Button>
      </form>
      <Card className="grid content-start gap-4">
        <Typography as="h3" variant="heading-s">
          Social links
        </Typography>
        {socialLinks.map((link) => (
          <Button
            key={link.label}
            variant="outline"
            leftIcon={<Icon icon={ExternalLink} size="sm" />}
            onClick={() => window.open(link.href, "_blank", "noopener,noreferrer")}
          >
            {link.label}
          </Button>
        ))}
        <Button
          variant="glass"
          leftIcon={<Icon icon={copied ? Check : Copy} size="sm" />}
          onClick={copyEmail}
        >
          {copied ? "Copied" : "Copy email"}
        </Button>
      </Card>
    </Grid>
  );
}

function MusicSection() {
  return (
    <div className="grid gap-4">
      {musicContent.map((track) => (
        <Card key={track} className="flex items-center justify-between gap-4">
          <div>
            <Typography as="h3" variant="heading-s">
              {track}
            </Typography>
            <Typography variant="body-sm">Curated listening for calm, focused building.</Typography>
          </div>
          <IconButton icon={Play} label={`Play ${track}`} variant="glass" />
        </Card>
      ))}
    </div>
  );
}

function ActiveSection({ activeOverlay }: { activeOverlay: OverlayId }) {
  switch (activeOverlay) {
    case "projects":
      return <ProjectsSection />;
    case "skills":
      return <SkillsSection />;
    case "about":
      return <AboutSection />;
    case "experience":
      return <ExperienceSection />;
    case "certificates":
      return <CertificatesSection />;
    case "photography":
      return <PhotographySection />;
    case "resume":
      return <ResumeSection />;
    case "contact":
      return <ContactSection />;
    case "music":
      return <MusicSection />;
  }
}

export function PortfolioOverlay() {
  const activeOverlay = useOverlayStore((state) => state.activeOverlay);
  const isOverlayOpen = useOverlayStore((state) => state.isOverlayOpen);
  const close = useClosePortfolioOverlay();
  const meta = activeOverlay ? sectionMeta[activeOverlay] : null;
  const IconComponent = meta?.icon;

  useEscapeKey(isOverlayOpen, close);

  const title = useMemo(() => meta?.title ?? "", [meta?.title]);

  return (
    <AnimatePresence>
      {isOverlayOpen && activeOverlay && meta && (
        <motion.div
          className="z-overlay bg-background/35 absolute inset-0 p-4 backdrop-blur-md md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onPointerDown={close}
        >
          <motion.div
            className="ml-auto h-full w-full max-w-5xl"
            initial={{ opacity: 0, x: 42, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 24, scale: 0.98 }}
            transition={{ duration: 0.34, ease: [0.2, 0, 0, 1] }}
            onPointerDown={(event) => event.stopPropagation()}
          >
            <Panel className="shadow-glass ds-scrollbar h-full overflow-auto bg-[var(--glass-background)] p-5 backdrop-blur-[var(--glass-blur)] md:p-8">
              <div className="border-border bg-card/70 sticky top-0 z-10 -mx-5 -mt-5 mb-6 flex items-center justify-between gap-4 border-b px-5 py-4 backdrop-blur-xl md:-mx-8 md:-mt-8 md:px-8">
                <div className="flex items-center gap-3">
                  {IconComponent && <Icon icon={IconComponent} tone="accent" />}
                  <Typography as="h2" variant="heading-m">
                    {title}
                  </Typography>
                </div>
                <IconButton icon={X} label="Close panel" onClick={close} />
              </div>
              <ActiveSection activeOverlay={activeOverlay} />
            </Panel>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
