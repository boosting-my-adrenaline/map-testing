import useLocalStorage from './useLocalStorage'
import useMediaQuery from './useMediaQuery'
import useUpdateEffect from './useUpdateEffect'

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: false)'

//nithgin

interface UseDarkModeOutput {
  isDarkMode: boolean
  toggle: () => void
  enable: () => void
  disable: () => void
}

function useDarkMode(defaultValue?: boolean): UseDarkModeOutput {
  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY)
  const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
    'darkMode',
    defaultValue ?? isDarkOS ?? false
  )

  useUpdateEffect(() => {
    setDarkMode(isDarkOS)
  }, [isDarkOS])

  return {
    isDarkMode,
    toggle: () => setDarkMode((prev) => !prev),
    enable: () => setDarkMode(true),
    disable: () => setDarkMode(false),
  }
}

export default useDarkMode
