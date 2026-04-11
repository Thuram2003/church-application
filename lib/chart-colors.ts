/**
 * Get chart colors from CSS variables
 * This ensures charts use the centralized theme colors
 */
export function getChartColors() {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    // Return default colors for SSR
    return {
      chart1: '#60a5fa',
      chart2: '#34d399',
      chart3: '#fbbf24',
      chart4: '#a78bfa',
      chart5: '#f87171',
    }
  }

  const root = document.documentElement
  const styles = getComputedStyle(root)

  return {
    chart1: styles.getPropertyValue('--chart-1').trim() || '#60a5fa',
    chart2: styles.getPropertyValue('--chart-2').trim() || '#34d399',
    chart3: styles.getPropertyValue('--chart-3').trim() || '#fbbf24',
    chart4: styles.getPropertyValue('--chart-4').trim() || '#a78bfa',
    chart5: styles.getPropertyValue('--chart-5').trim() || '#f87171',
  }
}
