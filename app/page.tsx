"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Zap,
  Shield,
  BarChart3,
  Users,
  TrendingUp,
  Check,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import Image from "next/image";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center max-w-4xl mx-auto mb-16">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                <Sparkles className="w-3 h-3 mr-1" />
                Powered by AI
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Turn Your Data Into{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Intelligent Insights
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Unlock the power of AI-driven analytics. Transform raw data into
                actionable intelligence with our cutting-edge platform designed
                for modern businesses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" className="group">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="heroOutline" size="lg">
                  View Demo
                </Button>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute inset-0 bg-gradient-primary blur-3xl opacity-20 rounded-3xl" />
              <Image
                src="/hero-dashboard.png"
                alt="Dashboard Preview"
                width={1200}
                height={720}
                className="relative rounded-2xl shadow-glow border border-border/50 w-full"
                priority
              />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-background/50">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Everything you need to succeed
              </h2>
              <p className="text-lg text-muted-foreground">
                Powerful features designed to help you make data-driven
                decisions faster
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                  Advanced Analytics
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Real-time insights at your fingertips
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Our intuitive dashboard gives you instant access to critical
                  metrics and trends. Make informed decisions with confidence
                  using AI-powered recommendations.
                </p>
                <ul className="space-y-4">
                  {showcasePoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary blur-3xl opacity-20 rounded-3xl" />
                <div className="relative bg-card rounded-2xl p-8 shadow-card border border-border">
                  <div className="aspect-video bg-gradient-subtle rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-24 h-24 text-primary/20" />
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-background/50">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Trusted by industry leaders
              </h2>
              <p className="text-lg text-muted-foreground">
                See what our customers have to say about their experience
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Simple, transparent pricing
              </h2>
              <p className="text-lg text-muted-foreground">
                Choose the plan that's right for your business
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="max-w-4xl mx-auto text-center relative">
          <FadeInSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to unlock insights from your data?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of companies already using InsightAI to make better
              decisions
            </p>
            <Button variant="hero" size="lg" className="group">
              Start Now
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">InsightAI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Transforming data into intelligent insights
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#features"
                    className="hover:text-foreground transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#docs"
                    className="hover:text-foreground transition-colors"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#about"
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#privacy"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 InsightAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Animation Component
const FadeInSection = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

// Feature Card Component
const FeatureCard = ({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: any;
  title: string;
  description: string;
  index: number;
}) => {
  return (
    <FadeInSection delay={index * 0.1}>
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="p-6 h-full bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-card transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-primary-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </Card>
      </motion.div>
    </FadeInSection>
  );
};

// Testimonial Card Component
const TestimonialCard = ({
  name,
  role,
  company,
  content,
  avatar,
  index,
}: {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  index: number;
}) => {
  return (
    <FadeInSection delay={index * 0.1}>
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-card transition-all duration-300">
        <p className="text-muted-foreground mb-6 italic">"{content}"</p>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
            {avatar}
          </div>
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground">
              {role} at {company}
            </p>
          </div>
        </div>
      </Card>
    </FadeInSection>
  );
};

// Pricing Card Component
const PricingCard = ({
  name,
  price,
  period,
  features,
  highlighted,
  index,
}: {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
  index: number;
}) => {
  return (
    <FadeInSection delay={index * 0.1}>
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ duration: 0.2 }}
        className="h-full"
      >
        <Card
          className={`p-8 h-full flex flex-col ${
            highlighted
              ? "bg-gradient-primary text-primary-foreground border-primary shadow-glow"
              : "bg-card/50 backdrop-blur-sm border-border/50"
          }`}
        >
          {highlighted && (
            <Badge className="mb-4 self-start bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
              Most Popular
            </Badge>
          )}
          <h3 className="text-2xl font-bold mb-2">{name}</h3>
          <div className="mb-6">
            <span className="text-4xl font-bold">{price}</span>
            <span
              className={
                highlighted
                  ? "text-primary-foreground/70"
                  : "text-muted-foreground"
              }
            >
              /{period}
            </span>
          </div>
          <ul className="space-y-3 mb-8 flex-grow">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check
                  className={`w-5 h-5 flex-shrink-0 ${
                    highlighted ? "text-primary-foreground" : "text-primary"
                  }`}
                />
                <span
                  className={
                    highlighted
                      ? "text-primary-foreground/90"
                      : "text-muted-foreground"
                  }
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
          <Button
            variant={highlighted ? "heroOutline" : "default"}
            className={
              highlighted
                ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-0"
                : ""
            }
            size="lg"
          >
            Get Started
          </Button>
        </Card>
      </motion.div>
    </FadeInSection>
  );
};

// Data
const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Process millions of data points in seconds with our optimized analytics engine.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-level encryption and compliance with SOC 2, GDPR, and HIPAA standards.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "AI-powered insights with predictive modeling and trend analysis.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Share insights and collaborate in real-time with your entire team.",
  },
  {
    icon: TrendingUp,
    title: "Smart Predictions",
    description: "Machine learning models that improve accuracy over time.",
  },
  {
    icon: Sparkles,
    title: "Custom Dashboards",
    description:
      "Build beautiful, customized dashboards tailored to your needs.",
  },
];

const showcasePoints = [
  "Interactive visualizations that make complex data easy to understand",
  "Automated reporting and scheduled insights delivered to your inbox",
  "Custom alerts for important metrics and anomalies",
  "Seamless integration with your existing tools and workflows",
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "VP of Analytics",
    company: "TechCorp",
    content:
      "InsightAI transformed how we make decisions. The AI-powered insights are incredibly accurate.",
    avatar: "SC",
  },
  {
    name: "Michael Rodriguez",
    role: "Data Director",
    company: "FinanceHub",
    content:
      "The best analytics platform we've used. Intuitive, powerful, and saves us hours every week.",
    avatar: "MR",
  },
  {
    name: "Emily Watson",
    role: "CEO",
    company: "GrowthLabs",
    content:
      "Game-changing platform. We've seen a 300% improvement in decision-making speed.",
    avatar: "EW",
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "month",
    features: [
      "Up to 10,000 data points",
      "3 custom dashboards",
      "Basic analytics",
      "Email support",
      "7-day data retention",
    ],
  },
  {
    name: "Pro",
    price: "$49",
    period: "month",
    highlighted: true,
    features: [
      "Unlimited data points",
      "Unlimited dashboards",
      "Advanced AI analytics",
      "Priority support",
      "90-day data retention",
      "API access",
      "Custom integrations",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "month",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom AI models",
      "Unlimited data retention",
      "SLA guarantee",
      "On-premise deployment",
    ],
  },
];

export default Home;
