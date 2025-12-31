"use client";
import React from 'react';
import Image from 'next/image';
import { ChevronDown, ArrowRight } from 'lucide-react';

/**
 * Navbar component cloned with pixel-perfect accuracy following the provided design system.
 * Implements retro-OS aesthetics with hard borders and brutalist shadows.
 */
export default function Navbar() {
  return (
    <header className="navbar_component bg-[#F1EEE9] border-b border-black sticky top-0 z-[1000] w-full h-[80px] flex items-center">
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <a href="/" className="navbar-logo relative block">
              <span className="font-sans font-black text-[24px] tracking-tighter text-black flex items-center">
                <span className="text-[28px] mr-1">◹</span>CLAYMINDAI
              </span>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <a
              href="/pals"
              className="flex items-center px-4 py-2 hover:bg-[#F7F4EF] transition-colors"
            >
              <span className="bg-[#FF6B8B] text-black text-[10px] uppercase font-bold px-1.5 py-0.5 border border-black mr-2 leading-none">
                Beta
              </span>
              <span className="font-sans font-semibold text-[14px] uppercase tracking-wide">Buddies</span>
            </a>

            {/* Learning Dropdown */}
            <div className="relative group px-4 py-2 cursor-pointer hover:bg-[#F7F4EF] transition-colors">
              <div className="flex items-center">
                <span className="font-sans font-semibold text-[14px] uppercase tracking-wide">Learning</span>
                <ChevronDown className="ml-1.5 w-4 h-4" />
              </div>
              {/* Dropdown Content */}
              <div className="absolute top-full left-0 w-64 bg-[#F7F4EF] border-2 border-black opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 mt-2 shadow-[6px_6px_0px_#000000]">
                <div className="flex flex-col">
                  <DropdownItem href="/subjects/math" label="Math" />
                  <DropdownItem href="/subjects/science" label="Science" />
                  <DropdownItem href="/subjects/history" label="History" />
                  <DropdownItem href="/subjects/coding" label="Coding" />
                </div>
              </div>
            </div>

            {/* Parents Dropdown */}
            <div className="relative group px-4 py-2 cursor-pointer hover:bg-[#F7F4EF] transition-colors">
              <div className="flex items-center">
                <span className="font-sans font-semibold text-[14px] uppercase tracking-wide">Parents</span>
                <ChevronDown className="ml-1.5 w-4 h-4" />
              </div>
              <div className="absolute top-full left-0 w-64 bg-[#F7F4EF] border-2 border-black opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 mt-2 shadow-[6px_6px_0px_#000000]">
                <div className="flex flex-col">
                  <DropdownItem href="/parents/safety" label="Safety & Privacy" />
                  <DropdownItem href="/parents/guide" label="Getting Started" />
                  <DropdownItem href="/parents/success-stories" label="Success Stories" />
                </div>
              </div>
            </div>

            <a href="/research" className="px-4 py-2 hover:bg-[#F7F4EF] transition-colors font-sans font-semibold text-[14px] uppercase tracking-wide">
              Research
            </a>
            <a href="/pricing" className="px-4 py-2 hover:bg-[#F7F4EF] transition-colors font-sans font-semibold text-[14px] uppercase tracking-wide">
              Pricing
            </a>
          </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <div className="relative group hidden sm:block">
            <a 
              href="https://platform.claymind.ai/auth/sign-in" 
              className="font-sans font-semibold text-[14px] uppercase tracking-wide px-4 py-2 border-2 border-transparent hover:border-black transition-all"
            >
              Login
            </a>
          </div>
          
          <a
            href="https://platform.claymind.ai/auth/sign-up?plan=free"
            className="bg-[#FF6B8B] border-2 border-black px-6 py-2 shadow-[6px_6px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0px_#000000] transition-all"
          >
            <span className="font-sans font-bold text-[14px] uppercase tracking-wider text-black">
              Get Started
            </span>
          </a>

          {/* Mobile Menu Icon */}
          <button className="lg:hidden flex flex-col space-y-1.5 p-2">
            <div className="w-6 h-0.5 bg-black"></div>
            <div className="w-6 h-0.5 bg-black"></div>
            <div className="w-6 h-0.5 bg-black"></div>
          </button>
        </div>
      </div>
    </header>
  );
}

function DropdownItem({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="flex items-center justify-between px-6 py-4 border-b border-black last:border-b-0 hover:bg-[#FF6B8B] transition-colors group/item"
    >
      <span className="font-sans font-semibold text-[12px] uppercase tracking-widest">{label}</span>
      <ArrowRight className="w-4 h-4 opacity-0 group-hover/item:opacity-100 transition-opacity" />
    </a>
  );
}