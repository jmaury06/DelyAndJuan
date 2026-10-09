import InvitationContent from "@/components/wedding/InvitationContent";
import { GuestData } from "@/hooks/useGuest";

const Index = () => {
  // Datos mock para la home page
  const demoGuest: GuestData = {
    id: 0,
    token: 'demo',
    nombre: 'Invitado',
    apellido: 'Especial',
    cupos: 2,
    mesa: 1,
    confirma: null
  };

  return (
    <InvitationContent 
      guestData={demoGuest}
    />
  );
};

export default Index;
