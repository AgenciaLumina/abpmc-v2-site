import Link from 'next/link'

type ActionButtonProps = {
  href: string
  text?: string
  variant?: 'primary' | 'download' | 'view-more'
  icon?: 'download' | 'arrow' | 'eye'
  external?: boolean
}

export default function ActionButton({ 
  href, 
  text, 
  variant = 'primary',
  icon = 'arrow',
  external = false 
}: ActionButtonProps) {
  
  const defaultTexts = {
    primary: 'Clique aqui para ler mais',
    download: 'Baixar documento',
    'view-more': 'Clique aqui para ler mais'
  }

  const buttonText = text || defaultTexts[variant]

  const baseClasses = "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
  
  const variantClasses = {
    primary: "bg-[#0066FF] hover:bg-[#0052CC] text-white",
    download: "bg-[#0066FF] hover:bg-[#0052CC] text-white",
    'view-more': "bg-[#0066FF] hover:bg-[#0052CC] text-white"
  }

  const icons = {
    download: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    arrow: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    ),
    eye: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    )
  }

  const className = `${baseClasses} ${variantClasses[variant]}`

  if (external) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className={className}
      >
        {buttonText}
        {icons[icon]}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {buttonText}
      {icons[icon]}
    </Link>
  )
}
