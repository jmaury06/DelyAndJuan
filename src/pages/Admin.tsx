import { useState, useEffect } from "react";
import { Plus, Copy, Edit, Trash2, Users, Link, Check, X, LogOut, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useThemeStore } from "@/stores/themeStore";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { GuestData } from "@/hooks/useGuest";

const Admin = () => {
  const { isDarkMode } = useThemeStore();
  const { toast } = useToast();
  const { logout } = useAuth();
  const [guests, setGuests] = useState<GuestData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingGuest, setEditingGuest] = useState<GuestData | null>(null);
  const [activeTab, setActiveTab] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<"nombre" | "mesa" | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cupos: 1,
    mesa: ''
  });

  // Cargar invitados desde Supabase
  const loadGuests = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('invitados')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        toast({
          title: "Error de Base de Datos",
          description: `Error: ${error.message}`,
          variant: "destructive"
        });
        setGuests([]);
      } else {
        setGuests(data || []);
      }
    } catch (err) {
      toast({
        title: "Error de Conexión",
        description: "No se pudo conectar con Supabase.",
        variant: "destructive"
      });
      setGuests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGuests();
  }, []);

  const generateToken = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingGuest) {
        // Editar invitado existente
        const { error } = await supabase
          .from('invitados')
          .update({
            nombre: formData.nombre,
            apellido: formData.apellido,
            cupos: formData.cupos,
            mesa: formData.mesa ? parseInt(formData.mesa) : null
          })
          .eq('id', editingGuest.id);

        if (error) throw error;

        toast({
          title: "Invitado actualizado",
          description: `${formData.nombre} ${formData.apellido} ha sido actualizado exitosamente.`,
        });
      } else {
        // Crear nuevo invitado
        const { error } = await supabase
          .from('invitados')
          .insert({
            token: generateToken(),
            nombre: formData.nombre,
            apellido: formData.apellido,
            cupos: formData.cupos,
            mesa: formData.mesa ? parseInt(formData.mesa) : null,
            confirma: null
          });

        if (error) throw error;

        toast({
          title: "Invitado agregado",
          description: `${formData.nombre} ${formData.apellido} ha sido agregado exitosamente.`,
        });
      }

      // Recargar datos y resetear formulario
      await loadGuests();
      setFormData({ nombre: '', apellido: '', cupos: 1, mesa: '' });
      setShowForm(false);
      setEditingGuest(null);

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "No se pudo guardar el invitado. Intenta nuevamente.",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (guest: GuestData) => {
    setEditingGuest(guest);
    setFormData({
      nombre: guest.nombre,
      apellido: guest.apellido,
      cupos: guest.cupos,
      mesa: guest.mesa?.toString() || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (guestId: number) => {
    try {
      const { error } = await supabase
        .from('invitados')
        .delete()
        .eq('id', guestId);

      if (error) throw error;

      toast({
        title: "Invitado eliminado",
        description: "El invitado ha sido eliminado exitosamente.",
        variant: "destructive"
      });

      // Recargar datos
      await loadGuests();

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el invitado. Intenta nuevamente.",
        variant: "destructive"
      });
    }
  };

  const copyInvitationLink = (token: string, nombre: string, apellido: string) => {
    const link = `${window.location.origin}/invitacion/${token}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Enlace copiado",
      description: `Enlace de invitación para ${nombre} ${apellido} copiado al portapapeles.`,
    });
  };

  const getConfirmationStatus = (confirma: boolean | null) => {
    if (confirma === null) {
      return { text: 'Pendiente', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    } else if (confirma) {
      return { text: 'Confirmado', color: 'text-green-600', bg: 'bg-green-100' };
    } else {
      return { text: 'No asiste', color: 'text-red-600', bg: 'bg-red-100' };
    }
  };

  const getFilteredGuests = () => {
    const term = searchTerm.toLowerCase().trim();

    let filtered = guests;

    // Filtro por tab
    switch (activeTab) {
      case "pendientes":
        filtered = filtered.filter(g => g.confirma === null);
        break;
      case "confirmados":
        filtered = filtered.filter(g => g.confirma === true);
        break;
      case "no-asisten":
        filtered = filtered.filter(g => g.confirma === false);
        break;
      default:
        break;
    }

    // Filtro por búsqueda (nombre, apellido o mesa)
    if (term) {
      filtered = filtered.filter(g =>
        g.nombre.toLowerCase().includes(term) ||
        g.apellido.toLowerCase().includes(term) ||
        (g.mesa && g.mesa.toString().includes(term))
      );
    }

    // Ordenamiento
    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        let valA, valB;

        if (sortField === "nombre") {
          valA = `${a.nombre} ${a.apellido}`.toLowerCase();
          valB = `${b.nombre} ${b.apellido}`.toLowerCase();
        } else if (sortField === "mesa") {
          valA = a.mesa || 0;
          valB = b.mesa || 0;
        }

        if (valA < valB) return sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  };

  const handleSort = (field: "nombre" | "mesa") => {
    if (sortField === field) {
      // Si vuelves a hacer clic, invierte el orden
      setSortDirection(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      // Si es una nueva columna, orden ascendente por defecto
      setSortField(field);
      setSortDirection("asc");
    }
  };


  const totalConfirmedCupos = guests
    .filter(g => g.confirma === true)
    .reduce((total, g) => total + (g.cupos || 0), 0);

  const filteredGuests = getFilteredGuests();

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-green-50/40 via-pink-50/30 to-yellow-50/40'} transition-colors duration-500 flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className={`${isDarkMode ? 'text-white' : 'text-gray-700'} transition-colors duration-500`}>
            Cargando invitados...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-green-50/40 via-pink-50/30 to-yellow-50/40'} transition-colors duration-500`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2 transition-colors duration-500`}>
              Panel de Administración
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-500`}>
              Gestiona las invitaciones de boda de Delia & Juan
            </p>
          </div>
          <Button
            onClick={logout}
            variant="outline"
            className={`${isDarkMode ? 'border-slate-600 text-gray-300 hover:bg-slate-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} transition-colors duration-500`}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>

        {/* Estadísticas */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white/80 border-green-200'} transition-colors duration-500`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Users className={`w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'} transition-colors duration-500`} />
                <div>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-500`}>
                    {guests.length}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-500`}>
                    Total Invitados
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white/80 border-yellow-200'} transition-colors duration-500`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Check className={`w-8 h-8 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'} transition-colors duration-500`} />
                <div>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-500`}>
                    {guests.filter(g => g.confirma === true).length}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-500`}>
                    Confirmados
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white/80 border-red-200'} transition-colors duration-500`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <X className={`w-8 h-8 ${isDarkMode ? 'text-red-400' : 'text-red-600'} transition-colors duration-500`} />
                <div>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-500`}>
                    {guests.filter(g => g.confirma === false).length}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-500`}>
                    No Asisten
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white/80 border-pink-200'} transition-colors duration-500`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Users className={`w-8 h-8 ${isDarkMode ? 'text-pink-400' : 'text-pink-600'} transition-colors duration-500`} />
                <div>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-500`}>
                    {guests.reduce((total, guest) => total + guest.cupos, 0)}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-500`}>
                    Total Cupos
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white/80 border-blue-200'} transition-colors duration-500`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Check className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors duration-500`} />
                <div>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-500`}>
                    {totalConfirmedCupos}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-500`}>
                    Personas Confirmadas
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botón Agregar */}
        <div className="mb-6">
          <Button
            onClick={() => {
              setShowForm(true);
              setEditingGuest(null);
              setFormData({ nombre: '', apellido: '', cupos: 1, mesa: '' });
            }}
            className={`${isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white transition-colors duration-300`}
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Invitado
          </Button>
        </div>

        {/* Formulario */}
        {showForm && (
          <Card className={`mb-8 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white/90 border-green-200'} transition-colors duration-500`}>
            <CardHeader>
              <CardTitle className={`${isDarkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-500`}>
                {editingGuest ? 'Editar Invitado' : 'Agregar Nuevo Invitado'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nombre" className={`text-slate-600 transition-colors duration-500`}>
                    Nombre
                  </Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                    required
                    className={`${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300'} transition-colors duration-500`}
                  />
                </div>
                <div>
                  <Label htmlFor="apellido" className={`text-slate-600 transition-colors duration-500`}>
                    Apellido
                  </Label>
                  <Input
                    id="apellido"
                    value={formData.apellido}
                    onChange={(e) => setFormData(prev => ({ ...prev, apellido: e.target.value }))}
                    required
                    className={`${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300'} transition-colors duration-500`}
                  />
                </div>
                <div>
                  <Label htmlFor="cupos" className={`text-slate-600 transition-colors duration-500`}>
                    Cupos
                  </Label>
                  <Input
                    id="cupos"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.cupos}
                    onChange={(e) => setFormData(prev => ({ ...prev, cupos: parseInt(e.target.value) }))}
                    required
                    className={`${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300'} transition-colors duration-500`}
                  />
                </div>
                <div>
                  <Label htmlFor="mesa" className={`text-slate-600 transition-colors duration-500`}>
                    Mesa (Opcional)
                  </Label>
                  <Input
                    id="mesa"
                    type="number"
                    min="1"
                    value={formData.mesa}
                    onChange={(e) => setFormData(prev => ({ ...prev, mesa: e.target.value }))}
                    className={`${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300'} transition-colors duration-500`}
                  />
                </div>
                <div className="md:col-span-2 flex gap-2">
                  <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
                    {editingGuest ? 'Actualizar' : 'Agregar'} Invitado
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false);
                      setEditingGuest(null);
                      setFormData({ nombre: '', apellido: '', cupos: 1, mesa: '' });
                    }}
                    className={`${isDarkMode ? 'border-slate-600 text-gray-300 hover:bg-slate-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} transition-colors duration-300`}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Lista de Invitados con Tabs */}
        <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white/90 border-green-200'} transition-colors duration-500`}>
          <CardHeader>
            <CardTitle className={`${isDarkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-500`}>
              Lista de Invitados ({guests.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className={`grid w-full grid-cols-4 mb-6 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
                <TabsTrigger
                  value="todos"
                  className={`${isDarkMode ? 'data-[state=active]:bg-slate-600' : 'data-[state=active]:bg-white'} transition-colors duration-300 flex-col h-auto py-2`}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="hidden sm:inline">Todos</span>
                  </div>
                  <span className="text-xs sm:hidden">Todos</span>
                  <span className="text-xs font-semibold">({guests.length})</span>
                </TabsTrigger>
                <TabsTrigger
                  value="pendientes"
                  className={`${isDarkMode ? 'data-[state=active]:bg-slate-600' : 'data-[state=active]:bg-white'} transition-colors duration-300 flex-col h-auto py-2`}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="hidden sm:inline">Pendientes</span>
                  </div>
                  <span className="text-xs sm:hidden">Pendientes</span>
                  <span className="text-xs font-semibold">({guests.filter(g => g.confirma === null).length})</span>
                </TabsTrigger>
                <TabsTrigger
                  value="confirmados"
                  className={`${isDarkMode ? 'data-[state=active]:bg-slate-600' : 'data-[state=active]:bg-white'} transition-colors duration-300 flex-col h-auto py-2`}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <Check className="w-4 h-4" />
                    <span className="hidden sm:inline">Confirman</span>
                  </div>
                  <span className="text-xs sm:hidden">Confirman</span>
                  <span className="text-xs font-semibold">({guests.filter(g => g.confirma === true).length})</span>
                </TabsTrigger>
                <TabsTrigger
                  value="no-asisten"
                  className={`${isDarkMode ? 'data-[state=active]:bg-slate-600' : 'data-[state=active]:bg-white'} transition-colors duration-300 flex-col h-auto py-2`}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <X className="w-4 h-4" />
                    <span className="hidden sm:inline">No Asisten</span>
                  </div>
                  <span className="text-xs sm:hidden">No Asisten</span>
                  <span className="text-xs font-semibold">({guests.filter(g => g.confirma === false).length})</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                {filteredGuests.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className={`w-16 h-16 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-4 transition-colors duration-500`} />
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2 transition-colors duration-500`}>
                      {activeTab === "todos" ? "No hay invitados registrados" : "No hay invitados en esta categoría"}
                    </h3>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-4 transition-colors duration-500`}>
                      {activeTab === "todos" ? "Agrega tu primer invitado para comenzar" : "No hay invitados que cumplan con este filtro"}
                    </p>
                    {activeTab === "todos" && (
                      <Button
                        onClick={() => {
                          setShowForm(true);
                          setEditingGuest(null);
                          setFormData({ nombre: '', apellido: '', cupos: 1, mesa: '' });
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Agregar Primer Invitado
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                      <div className="flex items-center justify-between mb-4">
                        <div className="relative w-full max-w-sm">
                          <Search className={`absolute left-3 top-2.5 w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                          <Input
                            type="text"
                            placeholder="Buscar por nombre, apellido o mesa..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`pl-9 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'} transition-colors duration-500`}
                          />
                        </div>
                      </div>

                    <table className="w-full">
                      <thead>
                        <tr className={`border-b ${isDarkMode ? 'border-slate-600' : 'border-gray-200'} transition-colors duration-500`}>
                            <th onClick={() => handleSort("nombre")} className={`text-left p-3 text-slate-600 transition-colors duration-500`}><div className="flex items-center gap-1">
                              Nombre
                              {sortField === "nombre" && (
                                <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                              )}
                            </div>
                            </th>
                            <th className={`text-left p-3 text-slate-600 transition-colors duration-500`}>Cupos</th>
                            <th
                              onClick={() => handleSort("mesa")}
                              className={`text-left p-3 text-slate-600 transition-colors duration-500`}><div className="flex items-center gap-1">
                                Mesa
                                {sortField === "mesa" && (
                                  <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                                )}
                              </div></th>
                            <th className={`text-left p-3 text-slate-600 transition-colors duration-500`}>Estado</th>
                            <th className={`text-left p-3 text-slate-600 transition-colors duration-500`}>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredGuests.map((guest) => {
                          const status = getConfirmationStatus(guest.confirma);
                          return (
                            <tr key={guest.id} className={`border-b ${isDarkMode ? 'border-slate-700' : 'border-gray-100'} transition-colors duration-500`}>
                              <td className={`p-3 ${isDarkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-500`}>
                                <div>
                                  <p className="font-medium">{guest.nombre} {guest.apellido}</p>
                                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-mono transition-colors duration-500`}>
                                    {guest.token}
                                  </p>
                                </div>
                              </td>
                              <td className={`p-3 ${isDarkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-500`}>
                                {guest.cupos}
                              </td>
                              <td className={`p-3 ${isDarkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-500`}>
                                {guest.mesa || 'Sin asignar'}
                              </td>
                              <td className="p-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                                  {status.text}
                                </span>
                              </td>
                              <td className="p-3">
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => copyInvitationLink(guest.token, guest.nombre, guest.apellido)}
                                    className={`${isDarkMode ? 'border-slate-600 text-gray-300 hover:bg-slate-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} transition-colors duration-300`}
                                  >
                                    <Link className="w-4 h-4 mr-1" />
                                    <Copy className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleEdit(guest)}
                                    className={`${isDarkMode ? 'border-slate-600 text-gray-300 hover:bg-slate-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} transition-colors duration-300`}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDelete(guest.id)}
                                    className="border-red-300 text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
