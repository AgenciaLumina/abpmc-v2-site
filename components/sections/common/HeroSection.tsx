interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  height?: string;
  className?: string;
}

export default function HeroSection({
  title,
  subtitle,
  backgroundImage = '/images_estrutura/header_internas.jpg',
  height = 'h-[420px]',
  className = ''
}: HeroSectionProps) {
  return (
    <section 
      className={`relative ${height} bg-cover bg-right-top bg-no-repeat ${className}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20"></div>
      <div className="relative z-10 max-w-[1280px] mx-auto h-full flex flex-col justify-end pb-12 px-6">
        <div className="max-w-4xl">
          <h1 className="text-white font-semibold text-[clamp(32px,6vw,64px)] leading-[1.1] mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-white/90 text-lg md:text-xl max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
