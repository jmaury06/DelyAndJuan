import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useThemeStore } from '@/stores/themeStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const { isDarkMode } = useThemeStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular delay de autenticación
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = login(email, password);
    
    if (success) {
      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión correctamente.",
      });
    } else {
      toast({
        title: "Error de autenticación",
        description: "Email o contraseña incorrectos.",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-green-50/60 via-pink-50/40 to-yellow-50/60'} transition-colors duration-500`}>
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 opacity-20"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Heart className="w-16 h-16 text-pink-400" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-20 opacity-15"
          animate={{ rotate: -360, scale: [1, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <Heart className="w-20 h-20 text-green-400" />
        </motion.div>
      </div>

      <motion.div
        className="w-full max-w-md px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white/90 border-green-200'} shadow-2xl transition-colors duration-500`}>
          <CardHeader className="text-center pb-2">
            <motion.div
              className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-r from-green-400 to-pink-400"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Lock className="w-8 h-8 text-white" />
            </motion.div>
            <CardTitle className={`text-2xl font-script ${isDarkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-500`}>
              Acceso Privado
            </CardTitle>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-500`}>
              Panel de administración de boda
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Label htmlFor="email" className={`text-slate-600 transition-colors duration-500`}>
                  Email
                </Label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-500`} />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300'} transition-colors duration-500`}
                    placeholder="admin@wedding.com"
                    required
                  />
                </div>
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Label htmlFor="password" className={`text-slate-600 transition-colors duration-500`}>
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-500`} />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pl-10 pr-10 ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-300'} transition-colors duration-500`}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} transition-colors duration-200`}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-500 to-pink-500 hover:from-green-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                >
                  {isLoading ? (
                    <motion.div
                      className="flex items-center gap-2"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Verificando...
                    </motion.div>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>

        <motion.p
          className={`text-center text-sm mt-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-500`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Solo personal autorizado • Delia & Juan Wedding
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
