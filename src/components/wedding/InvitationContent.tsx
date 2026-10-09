import HeroSection from "@/components/wedding/HeroSection";
import PersonalizedWelcome from "@/components/wedding/PersonalizedWelcome";
import CountdownTimer from "@/components/wedding/CountdownTimer";
import CoupleQuote from "@/components/wedding/CoupleQuote";
import EventDetails from "@/components/wedding/EventDetails";
import DressCode from "@/components/wedding/DressCode";
import WeddingGift from "@/components/wedding/WeddingGift";
import Footer from "@/components/wedding/Footer";
import FloatingMusicButton from "@/components/wedding/FloatingMusicButton";
import FallingPetals from "@/components/wedding/floral/FallingPetals";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";
import { GuestData } from "@/hooks/useGuest";

interface InvitationContentProps {
  guestData: GuestData;
  onConfirmation?: (confirma: boolean) => Promise<boolean>;
}

const InvitationContent = ({ guestData, onConfirmation }: InvitationContentProps) => {
  const { isPlaying, toggle } = useMusicPlayer({ autoplay: true });

  return (
    <>
      <div id="youtube-player" style={{ display: 'none' }}></div>

      <div className="invitation-bg min-h-screen relative overflow-hidden">
        <FallingPetals />

        <main className="relative z-10 mx-auto max-w-3xl pb-24">
          <HeroSection />
          <PersonalizedWelcome guestData={guestData} onConfirmation={onConfirmation} />
          <CountdownTimer />
          <CoupleQuote />
          <EventDetails />
          <DressCode />
          <WeddingGift />
          <Footer />
        </main>

        <FloatingMusicButton isPlaying={isPlaying} onToggle={toggle} show={true} />
      </div>
    </>
  );
};

export default InvitationContent;
