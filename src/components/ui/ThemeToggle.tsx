import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useThemeStore } from '@/stores/themeStore'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useThemeStore()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 shadow-lg"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {isDarkMode ? (
          <Moon className="w-5 h-5 text-indigo-600 dark:text-yellow-400" />
        ) : (
          <Sun className="w-5 h-5 text-yellow-600" />
        )}
      </motion.div>
    </Button>
  )
}
