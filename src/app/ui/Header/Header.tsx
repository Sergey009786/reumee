import React, { useState } from 'react';
import { FileText, Menu, X, User } from 'lucide-react';
import cls from './Header.module.scss';
import { useAtomValue } from 'jotai';
import { StepFormSlice } from '@features/FirstStepForm/slice/FirstStepFormSlice';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentStep = useAtomValue(StepFormSlice.initialState.$currentResumeStep);
  const resumePhoto = useAtomValue(StepFormSlice.initialState.$resumePhoto);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Show different header styles based on step
  const isResumeEditor = currentStep === 4;
  const shouldShowNavigation = currentStep < 4;

  return (
    <header className={classNames(cls.root, {
      [cls.editorHeader]: isResumeEditor
    })}>
      <div className={cls.container}>
        {isResumeEditor ? (
          // Editor Header Design from ZIP
          <div className={cls.editorContent}>
            <div className={cls.editorLeft}>
              <a href="/" className={cls.editorLogo}>
                <img src="/div.png" alt="Logo" className={cls.editorLogoImg} />
                <span className={cls.editorLogoText}>ResumeAI</span>
              </a>
            </div>
            
            <div className={cls.editorCenter}>
              <div className={cls.progressContainer}>
                <div className={cls.progressBar}>
                  <div className={cls.progressFill}></div>
                </div>
                <span className={cls.progressText}>Resume Editor</span>
              </div>
            </div>
            
            <div className={cls.editorRight}>
              <div className={cls.userProfile}>
                {resumePhoto ? (
                  <img 
                    src={URL.createObjectURL(resumePhoto)} 
                    alt="Profile" 
                    className={cls.profileImage}
                  />
                ) : (
                  <div className={cls.profilePlaceholder}>
                    <User size={20} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Regular Header
          <div className={cls.content}>
            {/* Logo */}
            <a href="/" className={cls.logo}>
              <div>
                <img src="/div.png" alt="Logo"  className={cls.logoSvg} />
              </div>
              <span className={cls.logoText}>ResumeAI</span>
            </a>
            {shouldShowNavigation && (
              <div className={cls.navPar}>
                {/* Desktop Navigation */}
                <nav className={cls.nav}>
                  <a href="/features" className={cls.navLink}>Features</a>
                  <a href="/templates" className={cls.navLink}>Templates</a>
                  <a href="/pricing" className={cls.navLink}>Pricing</a>
                  <a href="/login" className={cls.navLink}>Login</a>
                </nav>

                {/* Desktop CTA */}
                <div className={cls.cta}>
                  <button className={cls.ctaButton}>Sign Up Free</button>
                </div>
              </div>
            )}
            {/* Mobile Menu Toggle */}
            {shouldShowNavigation && (
              <div className={cls.mobileToggle}>
                <button 
                  className={cls.mobileButton}
                  onClick={toggleMobileMenu}
                  aria-label="Toggle mobile menu"
                >
                  {isMobileMenuOpen ? (
                    <X className={cls.mobileIcon} />
                  ) : (
                    <Menu className={cls.mobileIcon} />
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu - only show for regular header */}
          <div className={cls.mobileMenu}>
            <nav className={cls.mobileNav}>
              <a href="/features" className={cls.mobileLink}>Features</a>
              <a href="/templates" className={cls.mobileLink}>Templates</a>
              <a href="/pricing" className={cls.mobileLink}>Pricing</a>
              <a href="/login" className={cls.mobileLink}>Login</a>
              <button className={cls.mobileCta}>Sign Up Free</button>
            </nav>
            </div>
        )}
      </div>
    </header>
  );
}

export { Header };