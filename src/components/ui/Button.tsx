import React, { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: React.ElementType;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    as,
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    children, 
    className = '', 
    disabled,
    ...props 
  }, ref) => {
    const Component: any = as || 'button';

    const baseStyles = `
      inline-flex items-center justify-center font-medium transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const variants = {
      primary: `
        bg-[#e84e1b] hover:bg-orange-600 active:bg-orange-700
        text-white border border-orange-500 hover:border-orange-600
        shadow-sm hover:shadow-md
      `,
      secondary: `
        bg-white hover:bg-gray-50 active:bg-gray-100
        text-gray-900 border border-gray-300 hover:border-gray-400
        shadow-sm hover:shadow-md
      `,
      outline: `
        bg-transparent hover:bg-orange-50 active:bg-orange-100
        text-orange-600 border border-orange-300 hover:border-orange-400
      `,
      ghost: `
        bg-transparent hover:bg-gray-100 active:bg-gray-200
        text-gray-700 border border-transparent
      `,
    };

    const sizes = {
      sm: 'px-3 py-2 text-sm rounded-md',
      md: 'px-4 py-2 text-base rounded-lg',
      lg: 'px-6 py-3 text-lg rounded-xl',
    };

    const classes = `
      ${baseStyles}
      ${variants[variant]}
      ${sizes[size]}
      ${className}
    `.replace(/\s+/g, ' ').trim();

    const isButton = Component === 'button';

    return (
      <Component
        ref={ref as any}
        className={classes}
        {...(isButton ? { disabled: disabled || isLoading } : {})}
        {...props}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </Component>
    );
  }
);

Button.displayName = 'Button';
