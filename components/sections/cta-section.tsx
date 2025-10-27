import * as React from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export interface CTASectionProps {
  title: string;
  description?: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  variant?: 'default' | 'primary' | 'secondary';
}

export default function CTASection({
  title,
  description,
  primaryCta,
  secondaryCta,
  variant = 'default'
}: CTASectionProps) {
  const bgColor = {
    default: 'bg-neutral-50',
    primary: 'bg-primary-900 text-white',
    secondary: 'bg-secondary-500 text-white'
  }[variant];

  const textColor = variant === 'default' ? 'text-neutral-700' : 'text-white';
  const descColor = variant === 'default' ? 'text-neutral-500' : 'text-white/90';

  return (
    <section className={`py-16 ${bgColor}`}>
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className={`font-outfit text-2xl font-medium mb-4 ${textColor}`}>
            {title}
          </h2>
          
          {description && (
            <p className={`text-lg mb-8 ${descColor}`}>
              {description}
            </p>
          )}
          
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {primaryCta && (
                <Button
                  variant={variant === 'default' ? 'primary' : 'outline'}
                  size="lg"
                  asChild
                >
                  <Link href={primaryCta.href}>
                    {primaryCta.text}
                  </Link>
                </Button>
              )}
              
              {secondaryCta && (
                <Button variant="ghost" size="lg" asChild>
                  <Link
                    href={secondaryCta.href}
                    className={variant !== 'default' ? 'text-white hover:bg-white/10' : ''}
                  >
                    {secondaryCta.text}
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
