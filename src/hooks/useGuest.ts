import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface GuestData {
  id: number;
  token: string;
  nombre: string;
  apellido: string;
  cupos: number;
  mesa: number | null;
  confirma: boolean | null;
}

// Datos mock para desarrollo - simulando tokens UUID de Supabase
const mockGuests: GuestData[] = [
  {
    id: 1,
    token: '550e8400-e29b-41d4-a716-446655440001',
    nombre: 'María',
    apellido: 'González',
    cupos: 2,
    mesa: 1,
    confirma: null
  },
  {
    id: 2,
    token: '550e8400-e29b-41d4-a716-446655440002',
    nombre: 'Carlos',
    apellido: 'Rodríguez',
    cupos: 1,
    mesa: 2,
    confirma: null
  },
  {
    id: 3,
    token: '550e8400-e29b-41d4-a716-446655440003',
    nombre: 'Ana',
    apellido: 'Martínez',
    cupos: 4,
    mesa: 3,
    confirma: null
  },
  {
    id: 4,
    token: '550e8400-e29b-41d4-a716-446655440004',
    nombre: 'Luis',
    apellido: 'López',
    cupos: 2,
    mesa: 1,
    confirma: null
  },
  {
    id: 5,
    token: '550e8400-e29b-41d4-a716-446655440005',
    nombre: 'Carmen',
    apellido: 'Hernández',
    cupos: 3,
    mesa: 4,
    confirma: null
  },
  {
    id: 6,
    token: 'demo-token-test',
    nombre: 'Invitado',
    apellido: 'Demo',
    cupos: 1,
    mesa: 5,
    confirma: null
  }
];

export const useGuest = (token: string | undefined) => {
  const [guestData, setGuestData] = useState<GuestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuestData = async () => {
      if (!token) {
        setError("Token de invitación no válido");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Buscar invitado por token en Supabase
        const { data: guest, error: supabaseError } = await supabase
          .from('invitados')
          .select('*')
          .eq('token', token)
          .single();

        if (supabaseError) {
          // Fallback a datos mock si Supabase falla
          const mockGuest = mockGuests.find(g => g.token === token);
          if (mockGuest) {
            setGuestData(mockGuest);
          } else {
            setError("Invitación no encontrada");
            setGuestData(null);
          }
        } else if (!guest) {
          setError("Invitación no encontrada");
          setGuestData(null);
        } else {
          setGuestData(guest);
        }
      } catch (err) {
        // Fallback a datos mock en caso de error
        const mockGuest = mockGuests.find(g => g.token === token);
        if (mockGuest) {
          setGuestData(mockGuest);
        } else {
          setError("Invitación no encontrada");
          setGuestData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGuestData();
  }, [token]);

  const updateConfirmation = async (confirma: boolean) => {
    if (!guestData) {
      return false;
    }

    const originalConfirmation = guestData.confirma;

    try {
      // Actualizar estado local inmediatamente para UX optimista
      setGuestData(prev => prev ? { ...prev, confirma } : null);
      
      // Actualizar en Supabase usando el ID (más confiable que el token)
      const { data, error: supabaseError } = await supabase
        .from('invitados')
        .update({ confirma })
        .eq('id', guestData.id)
        .select();

      if (supabaseError) {
        // Revertir el cambio local si hay error
        setGuestData(prev => prev ? { ...prev, confirma: originalConfirmation } : null);
        return false;
      }
      
      if (data && data.length > 0) {
        // Actualizar con los datos reales de la BD
        setGuestData(data[0]);
        return true;
      } else {
        setGuestData(prev => prev ? { ...prev, confirma: originalConfirmation } : null);
        return false;
      }
      
    } catch (err) {
      // Revertir el cambio local si hay error
      setGuestData(prev => prev ? { ...prev, confirma: originalConfirmation } : null);
      return false;
    }
  };

  return {
    guestData,
    loading,
    error,
    updateConfirmation
  };
};
