import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0a0a0a;
    --chalk: #d9e98e;
    --cream: #ede8df;
    --copper: #b8825a;
    --copper-light: #d4a07a;
    --copper-dark: #8a5e3a;
    --muted: #8a8278;
    --border: rgba(10,10,10,0.12);
    --shadow-sm: 0 2px 12px rgba(10,10,10,0.06);
    --shadow-md: 0 8px 40px rgba(10,10,10,0.10);
    --shadow-lg: 0 24px 80px rgba(10,10,10,0.14);
  }

  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: var(--chalk); color: var(--ink); overflow-x: hidden; }

  /* NAVBAR */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px; height: 72px;
    background: rgba(247,244,239,0.88);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
    transition: all 0.3s ease;
  }
  .nav.scrolled { height: 60px; background: rgba(247,244,239,0.97); }
  .nav-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px; font-weight: 600; letter-spacing: 0.06em;
    color: var(--ink); cursor: pointer; text-decoration: none;
  }
  .nav-logo span { color: var(--copper); }
  .nav-links { display: flex; gap: 36px; list-style: none; }
  .nav-links a {
    font-size: 13px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--muted); text-decoration: none; transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--ink); }
  .nav-right { display: flex; align-items: center; gap: 20px; }
  .nav-icon { background: none; border: none; cursor: pointer; color: var(--ink); padding: 8px; display: flex; align-items: center; transition: color 0.2s; }
  .nav-icon:hover { color: var(--copper); }
  .btn-nav {
    background: var(--ink); color: var(--chalk);
    border: none; padding: 10px 24px; border-radius: 2px;
    font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer;
    transition: all 0.2s;
  }
  .btn-nav:hover { background: var(--copper); }

  /* HERO */
  .hero {
    min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr;
    padding-top: 72px; overflow: hidden;
  }
  .hero-left {
    display: flex; flex-direction: column; justify-content: center;
    padding: 80px 64px 80px 80px; position: relative;
  }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--copper); margin-bottom: 32px;
  }
  .hero-tag::before { content: ''; display: block; width: 28px; height: 1px; background: var(--copper); }
  .hero-h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(52px, 6vw, 84px); font-weight: 300; line-height: 1.06;
    color: var(--ink); margin-bottom: 28px; letter-spacing: -0.01em;
  }
  .hero-h1 em { font-style: italic; color: var(--copper); }
  .hero-desc {
    font-size: 15px; font-weight: 300; line-height: 1.7;
    color: var(--muted); max-width: 400px; margin-bottom: 48px;
  }
  .hero-actions { display: flex; align-items: center; gap: 24px; }
  .btn-primary {
    background: var(--ink); color: var(--chalk);
    border: none; padding: 16px 40px; border-radius: 2px;
    font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer;
    transition: all 0.25s; position: relative; overflow: hidden;
  }
  .btn-primary::after {
    content: ''; position: absolute; inset: 0;
    background: var(--copper); transform: translateX(-101%);
    transition: transform 0.3s ease;
  }
  .btn-primary:hover::after { transform: translateX(0); }
  .btn-primary span { position: relative; z-index: 1; }
  .btn-ghost {
    background: none; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400;
    color: var(--muted); display: flex; align-items: center; gap: 8px;
    transition: color 0.2s; padding: 0;
  }
  .btn-ghost:hover { color: var(--ink); }
  .hero-stats { display: flex; gap: 40px; margin-top: 64px; padding-top: 40px; border-top: 1px solid var(--border); }
  .stat-num { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 600; color: var(--ink); line-height: 1; }
  .stat-label { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-top: 4px; }

  .hero-right {
    position: relative; overflow: hidden; background: var(--cream);
  }
  .hero-img-grid {
    position: absolute; inset: 0;
    display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr;
    gap: 3px; padding: 3px;
  }
  .hero-img-cell {
    overflow: hidden; position: relative;
  }
  .hero-img-cell img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.6s ease;
  }
  .hero-img-cell:hover img { transform: scale(1.04); }
  .hero-badge {
    position: absolute; bottom: 32px; left: -20px;
    background: var(--chalk); padding: 16px 24px; border-radius: 2px;
    box-shadow: var(--shadow-md);
  }
  .hero-badge-title { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 4px; }
  .hero-badge-val { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600; color: var(--copper); }

  /* MARQUEE */
  .marquee-wrap { background: var(--ink); padding: 18px 0; overflow: hidden; }
  .marquee-track { display: flex; gap: 0; animation: marquee 22s linear infinite; }
  .marquee-item { 
    white-space: nowrap; padding: 0 48px;
    font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(247,244,239,0.5); display: flex; align-items: center; gap: 48px;
  }
  .marquee-dot { width: 4px; height: 4px; background: var(--copper); border-radius: 50%; flex-shrink: 0; }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  /* CATEGORIES */
  .section { padding: 100px 80px; }
  .section-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 56px; }
  .section-label { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--copper); margin-bottom: 12px; }
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 4vw, 54px); font-weight: 300; line-height: 1.1; color: var(--ink);
  }
  .section-title em { font-style: italic; }
  .btn-outline {
    background: none; border: 1px solid var(--ink); color: var(--ink);
    padding: 12px 28px; border-radius: 2px;
    font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer;
    transition: all 0.2s; white-space: nowrap;
  }
  .btn-outline:hover { background: var(--ink); color: var(--chalk); }

  .cat-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; grid-template-rows: 320px 200px; gap: 12px; }
  .cat-card {
    position: relative; overflow: hidden; border-radius: 2px; cursor: pointer;
    background: var(--cream);
  }
  .cat-card:first-child { grid-row: 1 / 3; }
  .cat-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
  .cat-card:hover img { transform: scale(1.06); }
  .cat-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(10,10,10,0.65) 0%, rgba(10,10,10,0) 50%);
    display: flex; flex-direction: column; justify-content: flex-end; padding: 28px;
    transition: all 0.3s;
  }
  .cat-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px; font-weight: 400; color: #fff; margin-bottom: 4px;
  }
  .cat-count { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.6); }
  .cat-arrow {
    position: absolute; top: 20px; right: 20px;
    width: 36px; height: 36px; background: rgba(247,244,239,0.15);
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    color: #fff; opacity: 0; transform: translateY(-8px);
    transition: all 0.3s;
  }
  .cat-card:hover .cat-arrow { opacity: 1; transform: translateY(0); }

  /* FEATURED PRODUCTS */
  .products-section { background: var(--cream); }
  .products-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
  .product-card { cursor: pointer; }
  .product-img-wrap {
    position: relative; overflow: hidden; border-radius: 2px;
    aspect-ratio: 3/4; background: var(--chalk); margin-bottom: 16px;
  }
  .product-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
  .product-card:hover .product-img-wrap img { transform: scale(1.05); }
  .product-badge {
    position: absolute; top: 12px; left: 12px;
    background: var(--copper); color: #fff;
    font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 4px 10px; border-radius: 1px;
  }
  .product-actions {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 16px; background: linear-gradient(to top, rgba(10,10,10,0.7), transparent);
    display: flex; gap: 8px; transform: translateY(100%); transition: transform 0.3s ease;
  }
  .product-card:hover .product-actions { transform: translateY(0); }
  .btn-cart {
    flex: 1; background: var(--chalk); color: var(--ink);
    border: none; padding: 10px; border-radius: 1px;
    font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer;
    transition: all 0.2s;
  }
  .btn-cart:hover { background: var(--copper); color: #fff; }
  .btn-wish { background: var(--chalk); border: none; width: 40px; border-radius: 1px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--ink); transition: all 0.2s; }
  .btn-wish:hover { background: #fee; color: #e55; }
  .product-brand { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); margin-bottom: 4px; }
  .product-name { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 400; color: var(--ink); margin-bottom: 8px; line-height: 1.3; }
  .product-price { display: flex; align-items: center; gap: 10px; }
  .price-now { font-size: 15px; font-weight: 500; color: var(--ink); }
  .price-old { font-size: 13px; color: var(--muted); text-decoration: line-through; }
  .price-save { font-size: 11px; color: var(--copper); font-weight: 500; }

  /* BANNER */
  .banner-section {
    padding: 0 80px 100px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
  }
  .banner-card {
    position: relative; overflow: hidden; border-radius: 2px;
    height: 420px; cursor: pointer;
  }
  .banner-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; }
  .banner-card:hover img { transform: scale(1.04); }
  .banner-content {
    position: absolute; inset: 0; padding: 48px;
    display: flex; flex-direction: column; justify-content: flex-end;
    background: linear-gradient(to top, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.1) 60%);
  }
  .banner-tag { font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.7); margin-bottom: 10px; }
  .banner-title { font-family: 'Cormorant Garamond', serif; font-size: 38px; font-weight: 300; color: #fff; line-height: 1.15; margin-bottom: 20px; }
  .btn-banner {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(247,244,239,0.15); backdrop-filter: blur(8px);
    border: 1px solid rgba(247,244,239,0.3); color: #fff;
    padding: 10px 22px; border-radius: 2px;
    font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
    cursor: pointer; transition: all 0.2s; width: fit-content;
  }
  .btn-banner:hover { background: rgba(247,244,239,0.28); }

  /* TESTIMONIALS */
  .testimonials-section { background: var(--ink); padding: 100px 80px; }
  .testimonials-section .section-label { color: var(--copper-light); }
  .testimonials-section .section-title { color: var(--chalk); }
  .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-top: 56px; }
  .testi-card {
    background: rgba(247,244,239,0.04); padding: 40px;
    border: 1px solid rgba(247,244,239,0.08); transition: all 0.3s;
  }
  .testi-card:hover { background: rgba(247,244,239,0.08); }
  .stars { display: flex; gap: 3px; margin-bottom: 20px; }
  .star { color: var(--copper); font-size: 14px; }
  .testi-text { font-family: 'Cormorant Garamond', serif; font-size: 19px; font-weight: 300; font-style: italic; color: rgba(247,244,239,0.85); line-height: 1.6; margin-bottom: 28px; }
  .testi-author { display: flex; align-items: center; gap: 12px; }
  .testi-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
  .testi-name { font-size: 13px; font-weight: 500; color: var(--chalk); }
  .testi-role { font-size: 11px; color: rgba(247,244,239,0.4); letter-spacing: 0.08em; }

  /* NEWSLETTER */
  .newsletter-section { padding: 100px 80px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
  .newsletter-left .section-title { margin-bottom: 16px; }
  .newsletter-desc { font-size: 14px; line-height: 1.7; color: var(--muted); }
  .newsletter-form { display: flex; gap: 0; }
  .newsletter-input {
    flex: 1; padding: 16px 20px; border: 1px solid var(--border); border-right: none;
    border-radius: 2px 0 0 2px; background: var(--chalk);
    font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--ink);
    outline: none; transition: border-color 0.2s;
  }
  .newsletter-input:focus { border-color: var(--ink); }
  .btn-subscribe {
    background: var(--ink); color: var(--chalk); border: none;
    padding: 16px 32px; border-radius: 0 2px 2px 0; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase; transition: background 0.2s;
  }
  .btn-subscribe:hover { background: var(--copper); }
  .newsletter-note { font-size: 11px; color: var(--muted); margin-top: 12px; }

  /* FOOTER */
  footer { background: var(--ink); padding: 80px 80px 40px; }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; margin-bottom: 60px; }
  .footer-logo { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 600; color: var(--chalk); margin-bottom: 16px; }
  .footer-logo span { color: var(--copper); }
  .footer-desc { font-size: 13px; line-height: 1.7; color: rgba(247,244,239,0.4); max-width: 260px; }
  .footer-socials { display: flex; gap: 12px; margin-top: 28px; }
  .social-btn {
    width: 36px; height: 36px; border-radius: 50%;
    border: 1px solid rgba(247,244,239,0.15); background: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: rgba(247,244,239,0.5); font-size: 14px; transition: all 0.2s;
  }
  .social-btn:hover { border-color: var(--copper); color: var(--copper); }
  .footer-col-title { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--chalk); margin-bottom: 24px; }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 12px; }
  .footer-links a { font-size: 13px; color: rgba(247,244,239,0.4); text-decoration: none; transition: color 0.2s; }
  .footer-links a:hover { color: var(--copper-light); }
  .footer-bottom { border-top: 1px solid rgba(247,244,239,0.08); padding-top: 32px; display: flex; justify-content: space-between; align-items: center; }
  .footer-copy { font-size: 12px; color: rgba(247,244,239,0.25); }
  .footer-payments { display: flex; gap: 10px; }
  .pay-badge {
    background: rgba(247,244,239,0.08); border-radius: 4px; padding: 6px 12px;
    font-size: 10px; letter-spacing: 0.08em; color: rgba(247,244,239,0.35); text-transform: uppercase;
  }

  /* REGISTER MODAL / PAGE */
  .page-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(10,10,10,0.6); backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; pointer-events: none; transition: opacity 0.3s;
  }
  .page-overlay.visible { opacity: 1; pointer-events: all; }
  .auth-card {
    background: var(--chalk); width: 100%; max-width: 860px; border-radius: 2px;
    display: grid; grid-template-columns: 1fr 1fr;
    box-shadow: var(--shadow-lg);
    transform: translateY(20px); transition: transform 0.3s;
    max-height: 92vh; overflow: hidden;
  }
  .page-overlay.visible .auth-card { transform: translateY(0); }

  .auth-left {
    background: var(--ink); padding: 56px 48px;
    display: flex; flex-direction: column; justify-content: space-between;
    position: relative; overflow: hidden;
  }
  .auth-left-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 30% 70%, rgba(184,130,90,0.25) 0%, transparent 60%);
    pointer-events: none;
  }
  .auth-left-logo { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 600; color: var(--chalk); position: relative; }
  .auth-left-logo span { color: var(--copper); }
  .auth-left-body { position: relative; }
  .auth-left-title { font-family: 'Cormorant Garamond', serif; font-size: 40px; font-weight: 300; color: var(--chalk); line-height: 1.2; margin-bottom: 16px; }
  .auth-left-title em { font-style: italic; color: var(--copper-light); }
  .auth-left-desc { font-size: 13px; line-height: 1.7; color: rgba(247,244,239,0.45); }
  .auth-perks { list-style: none; display: flex; flex-direction: column; gap: 14px; position: relative; }
  .auth-perk { display: flex; align-items: center; gap: 12px; font-size: 13px; color: rgba(247,244,239,0.7); }
  .perk-dot { width: 6px; height: 6px; background: var(--copper); border-radius: 50%; flex-shrink: 0; }

  .auth-right { padding: 48px 48px; overflow-y: auto; }
  .auth-toggle { display: flex; margin-bottom: 36px; border: 1px solid var(--border); border-radius: 2px; overflow: hidden; }
  .auth-toggle-btn {
    flex: 1; padding: 10px; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase; transition: all 0.2s; background: none;
    color: var(--muted);
  }
  .auth-toggle-btn.active { background: var(--ink); color: var(--chalk); }

  .auth-title { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 400; color: var(--ink); margin-bottom: 6px; }
  .auth-sub { font-size: 13px; color: var(--muted); margin-bottom: 32px; }

  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .form-group { margin-bottom: 18px; }
  .form-label { display: block; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
  .form-input {
    width: 100%; padding: 13px 16px; border: 1px solid var(--border);
    border-radius: 2px; background: #fff;
    font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--ink);
    outline: none; transition: border-color 0.2s;
  }
  .form-input:focus { border-color: var(--ink); }
  .form-input.error { border-color: #e55; }
  .form-error { font-size: 11px; color: #e55; margin-top: 4px; }
  .form-input-wrap { position: relative; }
  .input-eye { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--muted); transition: color 0.2s; }
  .input-eye:hover { color: var(--ink); }

  .form-checkbox { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 24px; }
  .form-checkbox input { width: 16px; height: 16px; margin-top: 2px; accent-color: var(--ink); cursor: pointer; flex-shrink: 0; }
  .form-checkbox label { font-size: 12px; color: var(--muted); line-height: 1.5; cursor: pointer; }
  .form-checkbox a { color: var(--copper); text-decoration: none; }

  .btn-auth {
    width: 100%; background: var(--ink); color: var(--chalk);
    border: none; padding: 15px; border-radius: 2px; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase; transition: background 0.2s;
    margin-bottom: 20px;
  }
  .btn-auth:hover { background: var(--copper); }
  .btn-auth:disabled { opacity: 0.5; cursor: not-allowed; }

  .auth-divider { text-align: center; margin: 0 0 20px; position: relative; }
  .auth-divider::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: var(--border); }
  .auth-divider span { position: relative; background: var(--chalk); padding: 0 12px; font-size: 11px; color: var(--muted); letter-spacing: 0.06em; text-transform: uppercase; }
  .social-auths { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .btn-social {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    border: 1px solid var(--border); background: #fff; padding: 11px;
    border-radius: 2px; cursor: pointer; font-family: 'DM Sans', sans-serif;
    font-size: 12px; font-weight: 500; color: var(--ink); transition: all 0.2s;
  }
  .btn-social:hover { border-color: var(--ink); }

  .auth-switch { text-align: center; font-size: 13px; color: var(--muted); margin-top: 20px; }
  .auth-switch a { color: var(--copper); text-decoration: none; cursor: pointer; font-weight: 500; }

  .close-modal {
    position: absolute; top: 30px; right: 30px; z-index: 10;
    width: 36px; height: 36px; border-radius: 50%;
    border: 1px solid var(--border); background: var(--chalk); cursor: pointer;
    display: flex; align-items: center; justify-content: center; font-size: 18px;
    color: var(--muted); transition: all 0.2s;
  }
  .close-modal:hover { background: var(--ink); color: var(--chalk); border-color: var(--ink); }

  /* SUCCESS */
  .success-view { text-align: center; padding: 40px 20px; }
  .success-icon { font-size: 56px; margin-bottom: 20px; }
  .success-title { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 400; color: var(--ink); margin-bottom: 10px; }
  .success-desc { font-size: 14px; color: var(--muted); line-height: 1.6; margin-bottom: 28px; }

  /* ANIMATIONS */
  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  .fade-up { animation: fadeUp 0.6s ease forwards; }
  .delay-1 { animation-delay: 0.1s; opacity: 0; }
  .delay-2 { animation-delay: 0.2s; opacity: 0; }
  .delay-3 { animation-delay: 0.35s; opacity: 0; }
  .delay-4 { animation-delay: 0.5s; opacity: 0; }
  .delay-5 { animation-delay: 0.65s; opacity: 0; }

  @media (max-width: 1024px) {
    .nav { padding: 0 24px; }
    .nav-links { display: none; }
    .section { padding: 60px 24px; }
    .hero { grid-template-columns: 1fr; }
    .hero-right { display: none; }
    .hero-left { padding: 60px 24px; }
    .cat-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
    .cat-card:first-child { grid-row: auto; }
    .products-grid { grid-template-columns: repeat(2, 1fr); }
    .banner-section { padding: 0 24px 60px; grid-template-columns: 1fr; }
    .testimonials-grid { grid-template-columns: 1fr; }
    .newsletter-section { grid-template-columns: 1fr; gap: 32px; padding: 60px 24px; }
    .footer { padding: 60px 24px 32px; }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
    .auth-card { grid-template-columns: 1fr; max-width: 480px; }
    .auth-left { display: none; }
    .form-row { grid-template-columns: 1fr; }
    .testimonials-section { padding: 60px 24px; }
  }
`;

const PRODUCTS = [
  { id:1, brand:"Maison", name:"Crop top Hoodie", price:289, old:380, badge:"New", img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80" },
  { id:2, brand:"Atelier", name:"Baju Serbet", price:195, old:null, badge:null, img:"https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80" },
  { id:3, brand:"Studio", name:"Celana Denim", price:165, old:220, badge:"Sale", img:"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=997&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id:4, brand:"Maison", name:"Tas GG", price:345, old:null, badge:"Popular", img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80" },
];

const TESTIMONIALS = [
  { text:"Mantap.", name:"Raina zaida", role:"Fashion Blogger", avatar:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80" },
  { text:"Keren.", name:"Reza Adiwinata", role:"Interior Designer", avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80" },
  { text:"Material bagus, harga ramah dikantong.", name:"Syifa Annisa", role:"Art Director", avatar:"https://images.unsplash.com/photo-1774101332024-753579060445?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

function StarRating() {
  return <div className="stars">{[...Array(5)].map((_,i)=><span key={i} className="star">★</span>)}</div>;
}

function RegisterModal({ visible, onClose }) {
  const [mode, setMode] = useState("register");
  const [showPass, setShowPass] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ first:"", last:"", email:"", password:"", agree:false });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (mode === "register") {
      if (!form.first.trim()) e.first = "Required";
      if (!form.last.trim()) e.last = "Required";
      if (!form.agree) e.agree = "Please accept the terms";
    }
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (form.password.length < 6) e.password = "Min 6 characters";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1400);
  };

  const reset = () => {
    setSuccess(false); setErrors({}); setLoading(false);
    setForm({ first:"", last:"", email:"", password:"", agree:false });
  };

  const handleClose = () => { reset(); onClose(); };

  return (
    <div className={`page-overlay ${visible ? "visible" : ""}`} onClick={e => e.target === e.currentTarget && handleClose()}>
      <div className="auth-card" style={{position:"relative"}}>
        <button className="close-modal" onClick={handleClose}>×</button>

        <div className="auth-left">
          <div className="auth-left-bg" />
          <div className="auth-left-logo">Zen<span>ux</span></div>
          <div className="auth-left-body">
            <div className="auth-left-title">Discover <em>curated</em> luxury fashion</div>
            <p className="auth-left-desc" style={{marginBottom:28}}>Join thousands of discerning shoppers who trust us for exceptional style.</p>
            <ul className="auth-perks">
              {["Free express shipping on first order","Early access to new collections","Exclusive member-only discounts","Personal style concierge"].map(p=>(
                <li key={p} className="auth-perk"><span className="perk-dot"/>{p}</li>
              ))}
            </ul>
          </div>
          <div style={{fontSize:11,color:"rgba(247,244,239,0.25)",letterSpacing:"0.08em"}}>© 2026 Zenux · All rights reserved</div>
        </div>

        <div className="auth-right">
          <div className="auth-toggle">
            <button className={`auth-toggle-btn ${mode==="register"?"active":""}`} onClick={()=>{setMode("register");reset();}}>Create Account</button>
            <button className={`auth-toggle-btn ${mode==="login"?"active":""}`} onClick={()=>{setMode("login");reset();}}>Sign In</button>
          </div>

          {success ? (
            <div className="success-view">
              <div className="success-icon">✨</div>
              <div className="success-title">{mode==="register" ? "Welcome to Zenux!" : "Welcome back!"}</div>
              <p className="success-desc">{mode==="register" ? "Your account has been created. Start exploring our curated collections." : "You're signed in. Continue your luxury shopping experience."}</p>
              <button className="btn-auth" onClick={handleClose}>Start Shopping</button>
            </div>
          ) : (
            <>
              <div className="auth-title">{mode==="register" ? "Create your account" : "Sign in to your account"}</div>
              <p className="auth-sub">{mode==="register" ? "Join the Zenux community today" : "Welcome back, we missed you"}</p>

              {mode==="register" && (
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input className={`form-input ${errors.first?"error":""}`} placeholder="Jane" value={form.first} onChange={e=>setForm({...form,first:e.target.value})} />
                    {errors.first && <div className="form-error">{errors.first}</div>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input className={`form-input ${errors.last?"error":""}`} placeholder="Doe" value={form.last} onChange={e=>setForm({...form,last:e.target.value})} />
                    {errors.last && <div className="form-error">{errors.last}</div>}
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className={`form-input ${errors.email?"error":""}`} type="email" placeholder="jane@example.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
                {errors.email && <div className="form-error">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="form-input-wrap">
                  <input className={`form-input ${errors.password?"error":""}`} type={showPass?"text":"password"} placeholder="Minimum 6 characters" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} style={{paddingRight:44}} />
                  <button className="input-eye" onClick={()=>setShowPass(!showPass)}>{showPass?"🙈":"👁"}</button>
                </div>
                {errors.password && <div className="form-error">{errors.password}</div>}
              </div>

              {mode==="register" && (
                <div className="form-checkbox">
                  <input type="checkbox" id="agree" checked={form.agree} onChange={e=>setForm({...form,agree:e.target.checked})} />
                  <label htmlFor="agree">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>. I'd like to receive style updates and offers.</label>
                </div>
              )}
              {errors.agree && <div className="form-error" style={{marginBottom:12}}>{errors.agree}</div>}

              {mode==="login" && <div style={{textAlign:"right",marginBottom:20}}><a href="#" style={{fontSize:12,color:"var(--copper)",textDecoration:"none"}}>Forgot password?</a></div>}

              <button className="btn-auth" onClick={handleSubmit} disabled={loading}>
                {loading ? "Please wait..." : mode==="register" ? "Create Account" : "Sign In"}
              </button>

              <div className="auth-divider"><span>or continue with</span></div>
              <div className="social-auths">
                <button className="btn-social">
                  <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Google
                </button>
                <button className="btn-social">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
                </button>
              </div>

              <div className="auth-switch">
                {mode==="register" ? <>Already have an account? <a onClick={()=>{setMode("login");reset();}}>Sign in</a></> : <>New to Zenux? <a onClick={()=>{setMode("register");reset();}}>Create account</a></>}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subDone, setSubDone] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const marqueeItems = ["Free Shipping Over $150","New Arrivals Weekly","Sustainable Luxury","Members Get 15% Off","Easy 30-Day Returns"];

  return (
    <>
      <style>{styles}</style>
      <RegisterModal visible={modalOpen} onClose={()=>setModalOpen(false)} />

      {/* NAVBAR */}
      <nav className={`nav ${scrolled?"scrolled":""}`}>
        <a className="nav-logo">Zen<span>ux</span></a>
        <ul className="nav-links">
          {["Collections","New Arrivals","Sale","About","Journal"].map(l=>(
            <li key={l}><a href="#">{l}</a></li>
          ))}
        </ul>
        <div className="nav-right">
          <button className="nav-icon" title="Search">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
          <button className="nav-icon" title="Wishlist">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <button className="nav-icon" title="Cart">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </button>
          <button className="btn-nav" onClick={()=>setModalOpen(true)}>Join Now</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-tag fade-up delay-1">New Season 2026</div>
          <h1 className="hero-h1 fade-up delay-2">
            Wear what<br/>you <em>truly</em><br/>desire
          </h1>
          <p className="hero-desc fade-up delay-3">Curated luxury fashion for the modern wardrobe. Each piece selected for its craftsmanship, sustainability, and timeless elegance.</p>
          <div className="hero-actions fade-up delay-4">
            <button className="btn-primary" onClick={()=>setModalOpen(true)}><span>Shop the Collection</span></button>
            <button className="btn-ghost">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Watch film
            </button>
          </div>
          <div className="hero-stats fade-up delay-5">
            {[["12K+","Happy Clients"],["340+","Brands"],["98%","Satisfaction"]].map(([n,l])=>(
              <div key={l}>
                <div className="stat-num">{n}</div>
                <div className="stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-img-grid">
            {[
              "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
              "https://images.unsplash.com/photo-1581044777550-4cfa20d8b450?w=400&q=80",
              "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80",
              "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400&q=80",
            ].map((src,i)=>(
              <div key={i} className="hero-img-cell"><img src={src} alt="" /></div>
            ))}
          </div>
          <div className="hero-badge">
            <div className="hero-badge-title">This Season's Pick</div>
            <div className="hero-badge-val">Silk & Cashmere</div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...marqueeItems,...marqueeItems,...marqueeItems,...marqueeItems].map((item,i)=>(
            <div key={i} className="marquee-item">
              <span className="marquee-dot"/>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="section">
        <div className="section-header">
          <div>
            <div className="section-label">Shop by Category</div>
            <h2 className="section-title">Explore our<br/><em>collections</em></h2>
          </div>
          <button className="btn-outline">View All</button>
        </div>
        <div className="cat-grid">
          {[
            { name:"Womenswear", count:"240 pieces", img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=80" },
            { name:"Accessories", count:"118 pieces", img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80" },
            { name:"Footwear", count:"95 pieces", img:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80" },
            { name:"Menswear", count:"162 pieces", img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80" },
            { name:"Jewellery", count:"73 pieces", img:"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80" },
          ].map((cat,i)=>(
            <div key={i} className="cat-card">
              <img src={cat.img} alt={cat.name} />
              <div className="cat-overlay">
                <div className="cat-name">{cat.name}</div>
                <div className="cat-count">{cat.count}</div>
              </div>
              <div className="cat-arrow">→</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section products-section">
        <div className="section-header">
          <div>
            <div className="section-label">Featured Pieces</div>
            <h2 className="section-title">Editor's <em>picks</em></h2>
          </div>
          <button className="btn-outline">All Products</button>
        </div>
        <div className="products-grid">
          {PRODUCTS.map(p=>(
            <div key={p.id} className="product-card">
              <div className="product-img-wrap">
                <img src={p.img} alt={p.name} />
                {p.badge && <div className="product-badge">{p.badge}</div>}
                <div className="product-actions">
                  <button className="btn-cart">Add to Bag</button>
                  <button className="btn-wish">♡</button>
                </div>
              </div>
              <div className="product-brand">{p.brand}</div>
              <div className="product-name">{p.name}</div>
              <div className="product-price">
                <span className="price-now">${p.price}</span>
                {p.old && <>
                  <span className="price-old">${p.old}</span>
                  <span className="price-save">Save {Math.round((1-p.price/p.old)*100)}%</span>
                </>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BANNER */}
      <div className="banner-section">
        {[
          { tag:"Summer Edit", title:"The Art of\nEffortless Style", img:"https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80" },
          { tag:"Members Only", title:"Exclusive\nPrivate Sale", img:"https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80" },
        ].map((b,i)=>(
          <div key={i} className="banner-card">
            <img src={b.img} alt={b.tag} />
            <div className="banner-content">
              <div className="banner-tag">{b.tag}</div>
              <div className="banner-title">{b.title}</div>
              <button className="btn-banner" onClick={i===1?()=>setModalOpen(true):undefined}>
                {i===1?"Join & Save":"Explore Now"} →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="section-header" style={{marginBottom:0}}>
          <div>
            <div className="section-label">What Our Clients Say</div>
            <h2 className="section-title">Loved by<br/><em>thousands</em></h2>
          </div>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t,i)=>(
            <div key={i} className="testi-card">
              <StarRating />
              <p className="testi-text">"{t.text}"</p>
              <div className="testi-author">
                <img className="testi-avatar" src={t.avatar} alt={t.name} />
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter-section">
        <div className="newsletter-left">
          <div className="section-label">Stay in the Know</div>
          <h2 className="section-title" style={{marginBottom:16}}>The style<br/><em>insider</em></h2>
          <p className="newsletter-desc">Subscribe for exclusive access to new arrivals, style guides, and member-only offers delivered to your inbox.</p>
        </div>
        <div>
          {subDone ? (
            <div style={{padding:"32px",background:"var(--cream)",borderRadius:2,textAlign:"center"}}>
              <div style={{fontSize:32,marginBottom:12}}>✉️</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,marginBottom:8}}>You're on the list!</div>
              <p style={{fontSize:13,color:"var(--muted)"}}>Welcome to the Zenux community. Check your inbox for a special welcome gift.</p>
            </div>
          ) : (
            <>
              <div className="newsletter-form">
                <input className="newsletter-input" type="email" placeholder="Your email address" value={email} onChange={e=>setEmail(e.target.value)} />
                <button className="btn-subscribe" onClick={()=>{ if(email.includes("@")) setSubDone(true); }}>Subscribe</button>
              </div>
              <p className="newsletter-note">No spam, ever. Unsubscribe anytime. By subscribing you agree to our Privacy Policy.</p>
            </>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div>
            <div className="footer-logo">Zen<span>ux</span></div>
            <p className="footer-desc">Curated luxury fashion for the modern wardrobe. Sustainable, timeless, exceptional.</p>
            <div className="footer-socials">
              {["in","tw","ig","pt"].map(s=>(
                <button key={s} className="social-btn">{s === "ig" ? "◈" : s === "in" ? "in" : s === "tw" ? "𝕏" : "𝕡"}</button>
              ))}
            </div>
          </div>
          {[
            { title:"Shop", links:["New Arrivals","Womenswear","Menswear","Accessories","Sale"] },
            { title:"Help", links:["Size Guide","Shipping Info","Returns","Contact Us","FAQ"] },
            { title:"Company", links:["About Us","Sustainability","Careers","Press","Affiliates"] },
          ].map(col=>(
            <div key={col.title}>
              <div className="footer-col-title">{col.title}</div>
              <ul className="footer-links">
                {col.links.map(l=><li key={l}><a href="#">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2026 Zenux. All rights reserved.</div>
          <div className="footer-payments">
            {["Visa","MC","Amex","PayPal","Apple Pay"].map(p=>(
              <div key={p} className="pay-badge">{p}</div>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
