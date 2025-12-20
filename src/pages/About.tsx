import PageLayout from "@/components/PageLayout";
import AboutSection from "@/components/AboutSection";
import MissionSection from "@/components/MissionSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NextPageButton from "@/components/NextPageButton";

const About = () => {
    return (
        <PageLayout>
            <AboutSection />
            <MissionSection />
            <TestimonialsSection />
            <NextPageButton label="See Investments" to="/investment" />
        </PageLayout>
    );
};

export default About;
