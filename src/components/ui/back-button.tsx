'use client';

import { useRouter } from 'next/navigation';
import { Button } from './button';
import { ButtonHTMLAttributes } from 'react';

type BackButtonProps = {
  title: string;
  className?: string;
  variant?:
    | 'ghost'
    | 'outline'
    | 'default'
    | 'destructive'
    | 'secondary'
    | 'link'
    | null;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function BackButton({ title, className, variant, ...props }: BackButtonProps) {
  const nav = useRouter();

  return (
    <Button
      className={className}
      variant={variant}
      onClick={() => nav.back()}
      title={title}
      {...props}
    >
      {title}
    </Button>
  );
}

export default BackButton;
