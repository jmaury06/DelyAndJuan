import { useParams } from "react-router-dom";
import { useGuest } from "@/hooks/useGuest";
import InvitationContent from "@/components/wedding/InvitationContent";

const InvitationPage = () => {
  const { token } = useParams<{ token: string }>();
  const { guestData, loading, error, updateConfirmation } = useGuest(token);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center invitation-bg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto mb-4"></div>
          <p className="font-elegant text-lg text-sand-600">Cargando tu invitación...</p>
        </div>
      </div>
    );
  }

  if (error || !guestData) {
    return (
      <div className="min-h-screen flex items-center justify-center invitation-bg">
        <div className="text-center max-w-md mx-auto p-8">
          <h1 className="font-script text-5xl text-gold-600 mb-4">
            Invitación no encontrada
          </h1>
          <p className="text-sand-600 mb-6">
            {error || "No pudimos encontrar tu invitación. Por favor verifica el enlace."}
          </p>
          <p className="text-sm text-sand-500">
            Si crees que esto es un error, contacta con Delia & Juan.
          </p>
        </div>
      </div>
    );
  }

  return (
    <InvitationContent
      guestData={guestData}
      onConfirmation={updateConfirmation}
    />
  );
};

export default InvitationPage;
