import { Star, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    content: "Mowglai transformed our online presence completely. Their attention to detail and creative vision exceeded all expectations. Highly recommended!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Founder, NexGen Solutions",
    content: "The team delivered a stunning e-commerce platform that boosted our sales by 200%. Their technical expertise is truly world-class.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director, Bloom Agency",
    content: "Working with Mowglai was a pleasure from start to finish. They understood our vision and brought it to life beautifully.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [sectionTop, setSectionTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const updateSectionTop = () => {
      if (sectionRef.current) {
        setSectionTop(sectionRef.current.offsetTop);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateSectionTop);
    updateSectionTop();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateSectionTop);
    };
  }, []);

  const getParallaxOffset = (index: number) => {
    const relativeScroll = scrollY - sectionTop + window.innerHeight;
    const speed = (index + 1) * 0.05;
    return relativeScroll * speed;
  };

  return (
    <section ref={sectionRef} id="testimonials" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section header with parallax */}
        <div 
          className="text-center mb-20"
          style={{ transform: `translateY(${getParallaxOffset(-1) * 0.3}px)` }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Client Testimonials
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say.
          </p>
        </div>

        {/* Testimonials grid with parallax */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="glass-card rounded-3xl p-8 relative group hover:scale-105 transition-all duration-500"
              style={{ 
                transform: `translateY(${-getParallaxOffset(i)}px)`,
                transitionProperty: 'transform, scale',
              }}
            >
              {/* Quote icon */}
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center opacity-80">
                <Quote className="w-5 h-5 text-primary-foreground" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground leading-relaxed mb-8">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                  <span className="text-lg font-display font-bold text-primary">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;