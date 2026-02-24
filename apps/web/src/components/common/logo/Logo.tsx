'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const Logo = ({
  width = 117,
  height = 30,
  className,
}: LogoProps): React.ReactElement => (
  <Link href="/" className="flex items-center">
    <Image
      src="/images/logo.svg"
      alt="Mingo Logo"
      width={width}
      height={height}
      className={className}
      priority
    />
  </Link>
);

export default Logo;
