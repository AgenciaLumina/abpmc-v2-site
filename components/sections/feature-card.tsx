import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  link?: {
    href: string;
    text: string;
  };
}

export default function FeatureCard({
  icon,
  title,
  description,
  link
}: FeatureCardProps) {
  return (
    <Card className="text-center hover:shadow-md transition-shadow">
      {icon && (
        <div className="flex justify-center pt-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-primary-50 text-primary-500">
            {icon}
          </div>
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-neutral-500 mb-4">
          {description}
        </p>
        
        {link && (
          <a
            href={link.href}
            className="inline-flex items-center text-sm font-medium text-primary-500 hover:text-primary-700"
          >
            {link.text}
            <svg
              className="ml-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        )}
      </CardContent>
    </Card>
  );
}
