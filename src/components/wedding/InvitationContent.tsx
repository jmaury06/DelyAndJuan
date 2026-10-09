import HeroSection from "@/components/wedding/HeroSection";
import PersonalizedWelcome from "@/components/wedding/PersonalizedWelcome";
import CountdownTimer from "@/components/wedding/CountdownTimer";
import EventDetails from "@/components/wedding/EventDetails";
import { PreWeddingCarousel } from "@/components/wedding/PreWeddingCarousel";
import WeddingGift from "@/components/wedding/WeddingGift";
import Footer from "@/components/wedding/Footer";
import FloatingMusicButton from "@/components/wedding/FloatingMusicButton";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";
import { useGuest, GuestData } from "@/hooks/useGuest";

interface InvitationContentProps {
  guestData: GuestData;
  onConfirmation?: (confirma: boolean) => Promise<boolean>;
}

const InvitationContent = ({ guestData, onConfirmation }: InvitationContentProps) => {
  const { isPlaying, toggle } = useMusicPlayer({ autoplay: true });

  return (
    <>
      <div id="youtube-player" style={{ display: 'none' }}></div>

      <div className="min-h-screen bg-cream transition-colors duration-500 relative overflow-hidden">
          <div className="relative z-10 pb-24">
            <HeroSection />
            <CountdownTimer />
            <PersonalizedWelcome 
              guestData={guestData} 
              onConfirmation={onConfirmation || (async () => false)}
            />
            <EventDetails />
            <PreWeddingCarousel />
            <WeddingGift />
            <Footer />
          </div>
          
          <FloatingMusicButton 
            isPlaying={isPlaying}
            onToggle={toggle}
            show={true}
          />
      </div>
    </>
  );
};

export default InvitationContent;
